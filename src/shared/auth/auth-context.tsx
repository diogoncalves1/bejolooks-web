"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  getRefreshToken,
  getToken,
  removeTokens,
  saveTokens,
} from "./token";
import { getTokenExpiryMs, isTokenExpired } from "./jwt";
import { refreshAccessToken } from "./refresh";

export interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: unknown;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  /** Guarda os tokens + define o utilizador autenticado (usar após login/register com sucesso) */
  login: (accessToken: string, user: User, refreshToken?: string) => void;
  /** Remove os tokens e limpa o estado (logout local, neste separador) */
  logout: () => void;
  /** Remove os tokens em TODOS os separadores abertos */
  logoutEverywhere: () => void;
  setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Canal usado para sincronizar login/logout entre separadores da mesma origem.
const AUTH_CHANNEL_NAME = "auth-sync";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setErrorState] = useState<string | null>(null);

  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);
  // Guarda sempre a versão mais recente de scheduleRefresh, para o
  // setTimeout conseguir agendar o próximo refresh sem se auto-referenciar.
  const scheduleRefreshRef = useRef<(accessToken: string) => void>(() => {});

  const clearScheduledRefresh = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }
  }, []);

  // Agenda um refresh silencioso um pouco antes do access token expirar.
  const scheduleRefresh = useCallback(
    (accessToken: string) => {
      clearScheduledRefresh();

      const expiryMs = getTokenExpiryMs(accessToken);
      if (!expiryMs) return;

      const MARGIN_MS = 30_000; // refresca 30s antes de expirar
      const delay = Math.max(expiryMs - Date.now() - MARGIN_MS, 0);

      refreshTimeoutRef.current = setTimeout(async () => {
        const newToken = await refreshAccessToken();
        if (newToken) {
          setIsAuthenticated(true);
          scheduleRefreshRef.current(newToken);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      }, delay);
    },
    [clearScheduledRefresh]
  );

  useEffect(() => {
    scheduleRefreshRef.current = scheduleRefresh;
  }, [scheduleRefresh]);

  // Restaura a sessão ao montar a app (ex: refresh da página)
  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      setIsLoading(true);
      setErrorState(null);

      try {
        const token = getToken();

        if (token && !isTokenExpired(token)) {
          if (isMounted) {
            setIsAuthenticated(true);
            scheduleRefresh(token);
          }
          return;
        }

        // Access token ausente/expirado -> tenta renovar com o refresh token
        if (getRefreshToken()) {
          const newToken = await refreshAccessToken();
          if (newToken && isMounted) {
            setIsAuthenticated(true);
            scheduleRefresh(newToken);
            return;
          }
        }

        if (isMounted) {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        if (isMounted) {
          setErrorState(
            err instanceof Error ? err.message : "Erro ao restaurar sessão."
          );
          setUser(null);
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
      clearScheduledRefresh();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sincronização entre separadores: login/logout num tab reflete-se nos outros
  useEffect(() => {
    if (typeof window === "undefined" || !("BroadcastChannel" in window)) {
      return;
    }

    const channel = new BroadcastChannel(AUTH_CHANNEL_NAME);
    channelRef.current = channel;

    channel.onmessage = (event) => {
      if (event.data === "logout") {
        setUser(null);
        setIsAuthenticated(false);
        clearScheduledRefresh();
      }

      if (event.data === "login") {
        const token = getToken();
        if (token) {
          setIsAuthenticated(true);
          scheduleRefresh(token);
        }
      }
    };

    return () => channel.close();
  }, [clearScheduledRefresh, scheduleRefresh]);

  const login = useCallback(
    (accessToken: string, userData: User, refreshToken?: string) => {
      saveTokens(accessToken, refreshToken);
      setUser(userData);
      setIsAuthenticated(true);
      setErrorState(null);
      scheduleRefresh(accessToken);
      channelRef.current?.postMessage("login");
    },
    [scheduleRefresh]
  );

  const logout = useCallback(() => {
    removeTokens();
    setUser(null);
    setIsAuthenticated(false);
    setErrorState(null);
    clearScheduledRefresh();
    channelRef.current?.postMessage("logout");
  }, [clearScheduledRefresh]);

  // Logout "avançado": revoga a sessão no backend em todos os dispositivos.
  // NOTA (contrato assumido): POST /auth/logout-all invalida todos os
  // refresh tokens do utilizador no servidor. Ajusta ao teu backend.
  const logoutEverywhere = useCallback(() => {
    const token = getToken();
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout-all`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {
        /* mesmo que falhe no servidor, terminamos a sessão localmente */
      });
    }
    logout();
  }, [logout]);

  const setError = useCallback((err: string | null) => {
    setErrorState(err);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    logoutEverywhere,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth tem de ser usado dentro de um <AuthProvider>.");
  }

  return context;
}

import { getRefreshToken, removeTokens, saveTokens } from "./token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

let refreshPromise: Promise<string | null> | null = null;

/**
 * Troca o refresh token por um novo access token.
 *
 * NOTA (contrato assumido com o backend): POST {API_URL}/auth/refresh
 * com body { refreshToken } -> { accessToken, refreshToken? }
 * Ajusta o endpoint/payload ao contrato real da tua API.
 *
 * Faz "dedupe": se houver vários pedidos em simultâneo a apanhar um 401,
 * só é feito um único pedido de refresh, e todos esperam pelo mesmo resultado.
 */
export async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        removeTokens();
        return null;
      }

      const data = await res.json();
      if (!data.accessToken) {
        removeTokens();
        return null;
      }

      saveTokens(data.accessToken, data.refreshToken);
      return data.accessToken as string;
    } catch {
      return null;
    }
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}

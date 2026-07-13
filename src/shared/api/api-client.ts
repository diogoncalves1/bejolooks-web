"use client";

import { getToken, removeTokens } from "@/shared/auth/token";
import { refreshAccessToken } from "@/shared/auth/refresh";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiFetchOptions extends RequestInit {
  /** Se false, não injeta o Authorization header nem tenta refresh (ex: login/register) */
  auth?: boolean;
}

/**
 * Cliente HTTP central para chamadas autenticadas ao backend.
 * - Injeta automaticamente o Authorization: Bearer <token>
 * - Se a resposta for 401, tenta um refresh do token e repete o pedido UMA vez
 * - Se o refresh falhar, limpa os tokens (o AuthGuard/middleware tratam do redirect)
 */
export async function apiFetch<T = unknown>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { auth = true, headers, ...rest } = options;

  async function doFetch(): Promise<Response> {
    const token = auth ? getToken() : undefined;

    return fetch(`${API_URL}${path}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });
  }

  let res = await doFetch();

  if (res.status === 401 && auth) {
    const newToken = await refreshAccessToken();

    if (!newToken) {
      removeTokens();
      throw new ApiError("Sessão expirada. Inicia sessão novamente.", 401);
    }

    res = await doFetch();
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(body?.message || "Erro no pedido à API.", res.status, body);
  }

  // Alguns endpoints (ex: DELETE) podem não devolver corpo
  const text = await res.text();
  if (!text) return undefined as T;

  const parsed = JSON.parse(text);

  // O backend embrulha as respostas em { success, message, errors, data }.
  // Desembrulhamos automaticamente para os chamadores não terem de o fazer.
  if (
    parsed &&
    typeof parsed === "object" &&
    "success" in parsed &&
    "data" in parsed
  ) {
    return parsed.data as T;
  }

  return parsed as T;
}

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export const api = {
  get: <T = unknown>(path: string, options?: ApiFetchOptions) =>
    apiFetch<T>(path, { ...options, method: "GET" }),
  post: <T = unknown>(path: string, body?: unknown, options?: ApiFetchOptions) =>
    apiFetch<T>(path, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: <T = unknown>(path: string, body?: unknown, options?: ApiFetchOptions) =>
    apiFetch<T>(path, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: <T = unknown>(path: string, options?: ApiFetchOptions) =>
    apiFetch<T>(path, { ...options, method: "DELETE" }),
};

import { getRefreshToken, removeTokens, saveTokens } from "./token";
import type { ApiEnvelope } from "@/shared/api/envelope";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

let refreshPromise: Promise<string | null> | null = null;

/**
 * Troca o refresh token por um novo access token.
 *
 * Contrato: POST {API_URL}/auth/refresh com body { refreshToken } ->
 * { success, message, errors, data: { token, refreshToken? } }
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

      const body: ApiEnvelope<{ token: string; refreshToken?: string }> =
        await res.json();

      if (!body.success || !body.data?.token) {
        removeTokens();
        return null;
      }

      saveTokens(body.data.token, body.data.refreshToken);
      return body.data.token;
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

/**
 * Utilitários mínimos para ler a informação de um JWT no cliente,
 * SEM validar a assinatura (isso é sempre feito no backend).
 * Serve apenas para sabermos quando o access token expira, para
 * agendarmos o refresh automático.
 */
interface JwtPayload {
  exp?: number; // timestamp em segundos (padrão JWT)
  [key: string]: unknown;
}

export function decodeJwt<T extends JwtPayload = JwtPayload>(
  token: string
): T | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );

    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

/** Retorna a data (ms) de expiração do token, ou null se não conseguir ler. */
export function getTokenExpiryMs(token: string): number | null {
  const payload = decodeJwt(token);
  if (!payload?.exp) return null;
  return payload.exp * 1000;
}

/** true se o token já expirou (ou não conseguimos ler a expiração) */
export function isTokenExpired(token: string): boolean {
  const expiryMs = getTokenExpiryMs(token);
  if (expiryMs === null) return true;
  return Date.now() >= expiryMs;
}

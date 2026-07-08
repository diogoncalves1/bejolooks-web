"use client";

import { getCookie, setCookie, deleteCookie } from "cookies-next/client";
import { REFRESH_TOKEN_NAME, TOKEN_NAME } from "./constants";

// --- Access token -----------------------------------------------------

export function saveToken(token: string): void {
  setCookie(TOKEN_NAME, token, {
    maxAge: 60 * 60 * 24, // 1 dia
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function getToken(): string | undefined {
  const token = getCookie(TOKEN_NAME);
  return typeof token === "string" ? token : undefined;
}

export function removeToken(): void {
  deleteCookie(TOKEN_NAME);
}

// --- Refresh token ------------------------------------------------------
// NOTA: idealmente o refresh token seria um cookie httpOnly definido pelo
// próprio backend (mais seguro, não acessível via JS). Aqui assume-se que o
// backend o devolve no corpo da resposta do login, tal como o access token,
// e o frontend é que o guarda. Se o teu backend já define um cookie httpOnly
// para o refresh token, podes remover saveRefreshToken/getRefreshToken e
// simplesmente confiar no cookie automático em cada pedido.

export function saveRefreshToken(token: string): void {
  setCookie(REFRESH_TOKEN_NAME, token, {
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function getRefreshToken(): string | undefined {
  const token = getCookie(REFRESH_TOKEN_NAME);
  return typeof token === "string" ? token : undefined;
}

export function removeRefreshToken(): void {
  deleteCookie(REFRESH_TOKEN_NAME);
}

// --- Ambos de uma vez (conveniência) ------------------------------------

export function saveTokens(accessToken: string, refreshToken?: string): void {
  saveToken(accessToken);
  if (refreshToken) saveRefreshToken(refreshToken);
}

export function removeTokens(): void {
  removeToken();
  removeRefreshToken();
}

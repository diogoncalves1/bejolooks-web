// Fluxo assumido (o mais comum em apps Next.js + backend próprio):
// 1. O browser navega para {API_URL}/auth/{provider} (endpoint do TEU backend)
// 2. O backend redireciona para o ecrã de login da Google/Apple
// 3. A Google/Apple redireciona de volta para o backend (callback do backend)
// 4. O backend cria/atualiza o utilizador e redireciona para
//    {FRONTEND_URL}/oauth/callback?accessToken=...&refreshToken=...
// 5. A página /oauth/callback (abaixo) lê os tokens e faz login no frontend
//
// Ajusta os paths "/auth/google" e "/auth/apple" ao contrato real do teu
// backend (podem ter outro nome, ex: "/auth/oauth/google").

export type OAuthProvider = "google" | "apple";

export function getOAuthUrl(provider: OAuthProvider, origin = ""): string {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const params = new URLSearchParams({
    redirect_uri: `${origin}/oauth/callback`,
  });

  return `${API_URL}/auth/${provider}?${params.toString()}`;
}

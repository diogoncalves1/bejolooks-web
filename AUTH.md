# Autenticação — Estado atual

## Definition of Done (base) — concluído

- [x] Login via frontend
- [x] Token guardado após login
- [x] Logout
- [x] Estado de autenticação global (Context API)
- [x] Rotas protegidas (middleware + guard client-side)

## Itens antes "out of scope", agora implementados (frontend)

⚠️ **Todos dependem de endpoints no backend que ainda podem não existir.**
O frontend está pronto e a chamar os endpoints abaixo — se o backend não os
tiver (ou tiver outro contrato), estas features vão falhar em runtime.

### Registo de utilizador
- UI: `src/app/(auth)/register/page.tsx`
- Chama `POST /auth/register` com `{ name, email, password }`
- Espera `{ accessToken, refreshToken?, user }` (login automático) OU apenas
  sucesso sem tokens (nesse caso redireciona para `/login`)

### Refresh tokens
- `src/shared/auth/token.ts` — guarda `access_token` e `refresh_token` em cookies separados
- `src/shared/auth/refresh.ts` — `POST /auth/refresh` com `{ refreshToken }`, espera `{ accessToken, refreshToken? }`
- `src/shared/api/api-client.ts` — em qualquer 401, tenta 1 refresh e repete o pedido
- `src/shared/auth/auth-context.tsx` — agenda refresh automático ~30s antes do access token expirar (lê o `exp` do JWT, sem validar assinatura)

### OAuth (Google, Apple)
- `src/shared/auth/oauth.ts` — gera URL para `GET /auth/google` ou `GET /auth/apple` (redirect flow)
- `src/app/(auth)/oauth/callback/page.tsx` — espera ser chamada como `/oauth/callback?accessToken=...&refreshToken=...`, depois chama `GET /auth/me` para obter o utilizador
- **Isto é o desenho mais comum, mas tens de confirmar/ajustar com o teu backend**: nomes dos endpoints, se o backend já trata o callback da Google/Apple, e o formato exato do redirect de volta ao frontend

### Gestão avançada de sessões
- `src/shared/auth/sessions.ts` — `GET /auth/sessions`, `DELETE /auth/sessions/:id`
- `src/app/(root)/settings/sessions/page.tsx` — UI de listagem/revogação
- `logoutEverywhere()` no `AuthContext` — `POST /auth/logout-all`
- Sincronização de login/logout entre separadores da mesma origem via `BroadcastChannel` (100% frontend, não depende do backend)

### UI complexa de auth
- `src/shared/components/auth/` — `PasswordInput` (mostrar/ocultar), `PasswordStrengthMeter`, `OAuthButtons`, `AuthCard`
- Checkbox "Lembrar-me" no login (visual + enviado no payload; o backend é que decide o que fazer com isso)
- Link "Esqueci-me da password" já está na UI mas **desativado** — o fluxo de reset continua fora de scope

## Ainda fora de scope

- Recuperação de password (reset por email) — só o link existe na UI, sem funcionalidade
- Verificação de email no registo
- 2FA / MFA
- RBAC / permissões por role no `AuthGuard`
- Rate limiting / proteção brute-force no login (é backend)

## Próximos passos recomendados

1. Confirmar/ajustar os contratos de API assumidos acima com o backend real
2. Se o refresh token do backend vier como cookie `httpOnly`, simplificar `token.ts`/`refresh.ts` (não precisas de o guardar/ler no frontend)
3. Implementar o botão de logout numa UI (a função já existe, falta o botão)

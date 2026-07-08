import { api } from "@/shared/api/api-client";

// NOTA (contrato assumido com o backend):
// GET    /auth/sessions        -> Session[]
// DELETE /auth/sessions/:id    -> revoga uma sessão específica
// POST   /auth/logout-all      -> revoga todas as sessões (ver logoutEverywhere no AuthContext)
// Ajusta os endpoints/campos ao contrato real da tua API.

export interface Session {
  id: string;
  device: string;
  ip?: string;
  location?: string;
  createdAt: string;
  lastActiveAt: string;
  current: boolean;
}

export function listSessions(): Promise<Session[]> {
  return api.get<Session[]>("/auth/sessions");
}

export function revokeSession(sessionId: string): Promise<void> {
  return api.delete<void>(`/auth/sessions/${sessionId}`);
}

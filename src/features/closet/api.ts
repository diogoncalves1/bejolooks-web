import type { ClosetItem } from "./types";
import { MOCK_CLOSET_ITEMS } from "./mock-data";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Vai buscar todos os items do armário do utilizador autenticado.
 *
 * Por agora devolve dados mock (a API ainda não está pronta). A forma dos
 * dados já corresponde ao contrato esperado, por isso quando o endpoint
 * existir basta trocar o corpo desta função por:
 *
 *   import { api } from "@/shared/api/api-client";
 *
 *   export async function fetchClosetItems(): Promise<ClosetItem[]> {
 *     return api.get<ClosetItem[]>("/closet/items");
 *   }
 */
export async function fetchClosetItems(): Promise<ClosetItem[]> {
  await delay(500);
  return MOCK_CLOSET_ITEMS;
}

import type { ClosetCategory } from "./types";

/** Ordem em que as categorias aparecem nos filtros. */
export const CLOSET_CATEGORIES: ClosetCategory[] = [
  "top",
  "bottom",
  "dress",
  "outerwear",
  "shoes",
  "accessory",
  "bag",
];

export const CATEGORY_LABELS: Record<ClosetCategory, string> = {
  top: "Tops",
  bottom: "Calças",
  dress: "Vestidos",
  outerwear: "Casacos",
  shoes: "Sapatos",
  accessory: "Acessórios",
  bag: "Malas",
};

/** Quantidade de items carregados de cada vez (paginação / scroll infinito). */
export const PAGE_SIZE = 12;

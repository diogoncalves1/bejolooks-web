import type { ClosetItem } from "./types";

function seedImage(seed: string) {
  return `https://picsum.photos/seed/${seed}/400/520`;
}

/**
 * Items mock — usados enquanto o endpoint GET /closet/items não existe.
 * A forma dos objetos (id, name, category, image_url) já corresponde ao
 * contrato esperado da API real.
 */
export const MOCK_CLOSET_ITEMS: ClosetItem[] = [
  { id: "1", name: "T-shirt branca básica", category: "top", image_url: seedImage("top-1") },
  { id: "2", name: "Camisola de lã bege", category: "top", image_url: seedImage("top-2") },
  { id: "3", name: "Camisa de ganga", category: "top", image_url: seedImage("top-3") },
  { id: "4", name: "Top de alças preto", category: "top", image_url: seedImage("top-4") },
  { id: "5", name: "Polo verde-tropa", category: "top", image_url: seedImage("top-5") },

  { id: "6", name: "Calças de ganga slim", category: "bottom", image_url: seedImage("bottom-1") },
  { id: "7", name: "Calças de fato de treino", category: "bottom", image_url: seedImage("bottom-2") },
  { id: "8", name: "Saia plissada", category: "bottom", image_url: seedImage("bottom-3") },
  { id: "9", name: "Calças cargo bege", category: "bottom", image_url: seedImage("bottom-4") },

  { id: "10", name: "Vestido midi floral", category: "dress", image_url: seedImage("dress-1") },
  { id: "11", name: "Vestido preto de festa", category: "dress", image_url: seedImage("dress-2") },
  { id: "12", name: "Vestido de linho verão", category: "dress", image_url: seedImage("dress-3") },

  { id: "13", name: "Casaco de ganga", category: "outerwear", image_url: seedImage("outer-1") },
  { id: "14", name: "Blazer bege oversized", category: "outerwear", image_url: seedImage("outer-2") },
  { id: "15", name: "Corta-vento preto", category: "outerwear", image_url: seedImage("outer-3") },
  { id: "16", name: "Casaco de lã comprido", category: "outerwear", image_url: seedImage("outer-4") },

  { id: "17", name: "Ténis brancos", category: "shoes", image_url: seedImage("shoes-1") },
  { id: "18", name: "Botas Chelsea castanhas", category: "shoes", image_url: seedImage("shoes-2") },
  { id: "19", name: "Sandálias de couro", category: "shoes", image_url: seedImage("shoes-3") },
  { id: "20", name: "Sapatilhas de skate", category: "shoes", image_url: seedImage("shoes-4") },

  { id: "21", name: "Boné preto", category: "accessory", image_url: seedImage("acc-1") },
  { id: "22", name: "Óculos de sol redondos", category: "accessory", image_url: seedImage("acc-2") },
  { id: "23", name: "Cachecol xadrez", category: "accessory", image_url: seedImage("acc-3") },
  { id: "24", name: "Cinto de couro castanho", category: "accessory", image_url: seedImage("acc-4") },

  { id: "25", name: "Mala tote em lona", category: "bag", image_url: seedImage("bag-1") },
  { id: "26", name: "Mochila minimalista", category: "bag", image_url: seedImage("bag-2") },
  { id: "27", name: "Mala de tiracolo preta", category: "bag", image_url: seedImage("bag-3") },
];

export type ClosetCategory =
  | "top"
  | "bottom"
  | "dress"
  | "outerwear"
  | "shoes"
  | "accessory"
  | "bag";

export interface ClosetItem {
  id: string;
  name: string;
  category: ClosetCategory;
  image_url: string;
}

export type CategoryFilterValue = ClosetCategory | "all";

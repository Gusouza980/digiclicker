export type ItemCategory = "consumable" | "material" | "equipment" | "key" | "special";

export type ItemCatalogEntry = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  category: ItemCategory;
  stackable: boolean;
  maxStack: number;
  sellPrice: number;
  buyPrice: number;
};

export type EssenceCatalogEntry = {
  id: string;
  nameKey: string;
  digimonType: string;
};

export type EggRarity = "common" | "rare" | "reinforced" | "special" | "event";

export type EggCatalogEntry = {
  id: string;
  nameKey: string;
  digimonType: string;
  rarity: EggRarity;
};

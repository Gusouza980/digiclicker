import type { EggRarity } from "./item";

export type StackableItem = {
  itemId: string;
  quantity: number;
};

export type EssenceStack = {
  essenceId: string;
  quantity: number;
};

export type EggInstance = {
  instanceId: string;
  eggTypeId: string;
  digimonType: string;
  rarity: EggRarity;
  scanned: boolean;
  revealedDigimonId: string | null;
  insertions: number;
  maxInsertions: number;
};

export type InventoryState = {
  items: StackableItem[];
  essences: EssenceStack[];
  eggs: EggInstance[];
};

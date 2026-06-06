export type OfflineItemDrop = {
  itemId: string;
  quantity: number;
};

export type OfflineConfig = {
  minAwayMs: number;
  maxHours: number;
  battleIntervalMs: number;
  bitsPenalty: number;
  xpPenalty: number;
  itemDropChance: number;
  itemDrops: OfflineItemDrop[];
};

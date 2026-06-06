import type { EggRarity } from "./item";

export type InsertionOutcome = "success" | "fail" | "break";

export type HatchDestination = "team" | "island";

export type InsertionChances = {
  success: number;
  fail: number;
  break: number;
};

export type HatchingConfig = {
  minInsertionsToHatch: number;
  scanCostByRarity: Record<EggRarity, number>;
  essenceCostByRarity: Record<EggRarity, number>;
  insertionChances: InsertionChances[];
  qualityBaseBonus: Record<"3" | "4" | "5", number>;
};

export type HatchingFeedback = {
  messageKey: string;
  variant: "success" | "fail" | "break" | "info";
  params?: Record<string, string>;
};

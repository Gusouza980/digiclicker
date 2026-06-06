import { getCatalogEntry } from "@/catalogs/loader";
import type { SaveData } from "@/types";

export type TraitResetResult = {
  save: SaveData;
  refundedPoints: number;
};

export function resetTraitsWithRefund(save: SaveData): TraitResetResult {
  const next = structuredClone(save);
  let refundedPoints = 0;

  for (const trait of next.traits) {
    const catalog = getCatalogEntry("trait", trait.traitId);
    if (catalog) {
      refundedPoints += catalog.cost;
    }
  }

  next.traits = [];
  next.player.traitPoints += refundedPoints;

  return { save: next, refundedPoints };
}

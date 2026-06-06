import { getCatalogEntry } from "@/catalogs/loader";
import type { SaveData } from "@/types";

export type UnlockTraitResult =
  | { success: true; save: SaveData }
  | { success: false; reason: "not_found" | "already_unlocked" | "missing_prerequisites" | "insufficient_points" };

export function isTraitUnlocked(save: SaveData, traitId: string): boolean {
  return save.traits.some((trait) => trait.traitId === traitId);
}

export function canUnlockTrait(save: SaveData, traitId: string): UnlockTraitResult {
  const trait = getCatalogEntry("trait", traitId);
  if (!trait) return { success: false, reason: "not_found" };
  if (isTraitUnlocked(save, traitId)) return { success: false, reason: "already_unlocked" };

  const missingPrerequisite = trait.prerequisiteTraitIds.some(
    (prerequisiteId) => !isTraitUnlocked(save, prerequisiteId),
  );
  if (missingPrerequisite) {
    return { success: false, reason: "missing_prerequisites" };
  }

  if (save.player.traitPoints < trait.cost) {
    return { success: false, reason: "insufficient_points" };
  }

  const next = structuredClone(save);
  next.player.traitPoints -= trait.cost;
  next.traits.push({
    traitId,
    unlockedAt: new Date().toISOString(),
  });

  return { success: true, save: next };
}

export function unlockTrait(save: SaveData, traitId: string): UnlockTraitResult {
  return canUnlockTrait(save, traitId);
}

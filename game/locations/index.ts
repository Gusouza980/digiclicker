import { getAllCatalogEntries } from "@/catalogs/loader";
import { checkAllRequirementSets } from "@/game/requirements";
import type { SaveData } from "@/types";

export function syncUnlockedLocations(save: SaveData): SaveData {
  const next = structuredClone(save);
  const locations = getAllCatalogEntries("location");

  for (const location of Object.values(locations)) {
    if (next.location.unlockedLocationIds.includes(location.id)) continue;
    if (location.unlockRequirementIds.length === 0) continue;

    const result = checkAllRequirementSets(next, location.unlockRequirementIds);
    if (result.met) {
      next.location.unlockedLocationIds.push(location.id);
    }
  }

  return next;
}

export function canSelectLocation(save: SaveData, locationId: string): boolean {
  return save.location.unlockedLocationIds.includes(locationId);
}

export function selectLocation(save: SaveData, locationId: string): SaveData | null {
  if (!canSelectLocation(save, locationId)) return null;

  const next = structuredClone(save);
  next.location.currentLocationId = locationId;
  return next;
}

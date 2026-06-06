import { getAllCatalogEntries } from "@/catalogs/loader";
import { selectLocation } from "@/game/locations";
import type { SaveData } from "@/types";

export function setAutoProgressEnabled(save: SaveData, enabled: boolean): SaveData {
  const next = structuredClone(save);
  next.progression.autoProgressEnabled = enabled;
  return next;
}

export function pauseAutoProgress(save: SaveData): SaveData {
  if (!save.progression.autoProgressEnabled) return save;
  return setAutoProgressEnabled(save, false);
}

export function getNextUnlockedLocation(save: SaveData): string | null {
  const locations = Object.values(getAllCatalogEntries("location"));
  const currentIndex = locations.findIndex(
    (location) => location.id === save.location.currentLocationId,
  );

  for (let index = currentIndex + 1; index < locations.length; index += 1) {
    const location = locations[index];
    if (save.location.unlockedLocationIds.includes(location.id)) {
      return location.id;
    }
  }

  return null;
}

export function tryAutoAdvanceLocation(save: SaveData): SaveData | null {
  if (!save.progression.autoProgressEnabled) return null;

  const nextLocationId = getNextUnlockedLocation(save);
  if (!nextLocationId) return null;

  return selectLocation(save, nextLocationId);
}

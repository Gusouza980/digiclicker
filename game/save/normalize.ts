import { registerKnownForms } from "@/game/evolution/known-forms";
import type { PlayerDigimon, SaveData } from "@/types";
import { createEmptyStatBlock } from "@/types/stats";

function inferDigimonSource(
  digimon: PlayerDigimon & { source?: PlayerDigimon["source"] },
): PlayerDigimon["source"] {
  if (digimon.source) return digimon.source;
  return digimon.hatchQuality !== null ? "hatch" : "starter";
}

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function normalizeSave(save: SaveData): SaveData {
  const next = structuredClone(save);

  if (!next.island.actions) {
    next.island.actions = (next.island as { activeActions?: typeof next.island.actions }).activeActions ?? [];
  }

  if (!next.friendshipDaily) {
    next.friendshipDaily = { dateKey: getTodayKey(), clickGainUsed: 0 };
  } else if (next.friendshipDaily.dateKey !== getTodayKey()) {
    next.friendshipDaily = { dateKey: getTodayKey(), clickGainUsed: 0 };
  }

  const starterFormIds: string[] = [];

  for (const digimon of Object.values(next.digimons)) {
    digimon.source = inferDigimonSource(digimon);
    if (!digimon.cumulativeStats) {
      digimon.cumulativeStats = createEmptyStatBlock();
    }
    starterFormIds.push(digimon.catalogId);
  }

  return registerKnownForms(next, starterFormIds);
}

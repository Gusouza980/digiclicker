import { getCatalogEntry } from "@/catalogs/loader";
import { addStackableItem } from "@/game/inventory";
import { calculateLevelFromXp } from "@/game/progression/xp";
import { pickRandom, randomInt, rollChance } from "@/game/rng";
import { applyTrainerXp } from "@/game/trainer/progression";
import type { GlobalConfig, OfflineSummary, SaveData } from "@/types";

export type OfflineProgressResult = {
  save: SaveData;
  summary: OfflineSummary | null;
};

export function processOfflineProgress(
  save: SaveData,
  config: GlobalConfig,
  nowMs = Date.now(),
): OfflineProgressResult {
  const lastUpdated = new Date(save.updatedAt).getTime();
  const awayMs = Math.max(0, nowMs - lastUpdated);

  const minAwayMs = config.offline.minAwayMs;
  if (awayMs < minAwayMs) {
    return { save, summary: null };
  }

  const maxAwayMs = config.offline.maxHours * 60 * 60 * 1000;
  const effectiveAwayMs = Math.min(awayMs, maxAwayMs);
  const battlesSimulated = Math.floor(
    effectiveAwayMs / config.offline.battleIntervalMs,
  );

  if (battlesSimulated <= 0) {
    return { save, summary: null };
  }

  const location = getCatalogEntry("location", save.location.currentLocationId);
  const bitsMin = location?.victoryRewards?.bitsMin ?? 3;
  const bitsMax = location?.victoryRewards?.bitsMax ?? 8;

  let bitsGained = 0;
  let digimonXpGained = 0;
  let trainerXpGained = 0;
  const itemsDropped: Array<{ itemId: string; quantity: number }> = [];

  let next = structuredClone(save);

  for (let battle = 0; battle < battlesSimulated; battle += 1) {
    const bits = Math.floor(
      randomInt(bitsMin, bitsMax) * config.offline.bitsPenalty,
    );
    bitsGained += bits;
    next.player.bits += bits;

    const trainerXp = Math.floor(
      config.xp.trainerPerVictory * config.offline.xpPenalty,
    );
    trainerXpGained += trainerXp;
    const trainerResult = applyTrainerXp(next, trainerXp, config);
    next = trainerResult.save;

    const digimonXp = Math.floor(
      config.xp.digimonPerVictory * config.offline.xpPenalty,
    );
    for (const allyId of next.team.activeDigimonIds) {
      const digimon = next.digimons[allyId];
      if (!digimon) continue;
      const progressed = calculateLevelFromXp(
        digimon.level,
        digimon.xp + digimonXp,
        config,
      );
      digimon.level = progressed.level;
      digimon.xp = progressed.xp;
      digimonXpGained += digimonXp;
    }

    if (rollChance(config.offline.itemDropChance)) {
      const drop = pickRandom(config.offline.itemDrops);
      if (drop) {
        addStackableItem(next.inventory, drop.itemId, drop.quantity);
        const existing = itemsDropped.find((entry) => entry.itemId === drop.itemId);
        if (existing) {
          existing.quantity += drop.quantity;
        } else {
          itemsDropped.push({ itemId: drop.itemId, quantity: drop.quantity });
        }
      }
    }
  }

  next.player.battlesWon += battlesSimulated;
  next.pendingOfflineSummary = {
    awayMs: effectiveAwayMs,
    battlesSimulated,
    bitsGained,
    digimonXpGained,
    trainerXpGained,
    itemsDropped,
  };

  return {
    save: next,
    summary: next.pendingOfflineSummary,
  };
}

export function clearOfflineSummary(save: SaveData): SaveData {
  const next = structuredClone(save);
  next.pendingOfflineSummary = null;
  return next;
}

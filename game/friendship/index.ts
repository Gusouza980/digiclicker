import { getGlobalConfig } from "@/catalogs/loader";
import type { GlobalConfig, SaveData } from "@/types";

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function resetDailyIfNeeded(save: SaveData): void {
  const today = getTodayKey();
  if (!save.friendshipDaily || save.friendshipDaily.dateKey !== today) {
    save.friendshipDaily = { dateKey: today, clickGainUsed: 0 };
  }
}

export function clampFriendship(value: number, config: GlobalConfig): number {
  return Math.min(Math.max(value, 0), config.friendship.maxValue);
}

function applyGainToDigimon(
  save: SaveData,
  digimonInstanceId: string,
  amount: number,
  config: GlobalConfig,
): number {
  const digimon = save.digimons[digimonInstanceId];
  if (!digimon || amount <= 0) return 0;

  const multiplier = config.friendship.globalMultiplier;
  const effectiveGain = amount * multiplier;
  const previous = digimon.friendship;
  digimon.friendship = clampFriendship(previous + effectiveGain, config);
  return digimon.friendship - previous;
}

export function applyBattleFriendship(
  save: SaveData,
  livingAllyInstanceIds: string[],
  config: GlobalConfig = getGlobalConfig(),
): SaveData {
  const next = structuredClone(save);
  const gain = config.friendship.gainFromBattle;

  for (const instanceId of livingAllyInstanceIds) {
    applyGainToDigimon(next, instanceId, gain, config);
  }

  return next;
}

export function applyClickFriendship(
  save: SaveData,
  livingAllyInstanceIds: string[],
  config: GlobalConfig = getGlobalConfig(),
): SaveData {
  if (livingAllyInstanceIds.length === 0) return save;

  const next = structuredClone(save);
  resetDailyIfNeeded(next);

  const remainingCap =
    config.friendship.dailyClickSoftCap - next.friendshipDaily.clickGainUsed;
  if (remainingCap <= 0) return save;

  const perClickGain = Math.min(
    config.friendship.gainFromClickAssist,
    remainingCap,
  );
  const distributedGain = perClickGain / livingAllyInstanceIds.length;
  let totalApplied = 0;

  for (const instanceId of livingAllyInstanceIds) {
    totalApplied += applyGainToDigimon(next, instanceId, distributedGain, config);
  }

  next.friendshipDaily.clickGainUsed += totalApplied;
  return next;
}

export function getFriendshipPercent(friendship: number, config: GlobalConfig): number {
  return Math.round(
    (clampFriendship(friendship, config) / config.friendship.maxValue) * 100,
  );
}

import { isTraitUnlocked } from "@/game/traits/unlock";
import {
  BATTLE_SPEED_OPTIONS,
  REFERENCE_BATTLE_SPEED,
  STARTING_BATTLE_SPEED,
  type BattleSpeed,
  type SaveData,
} from "@/types";

const SPEED_TRAIT_MAP: Record<BattleSpeed, string | null> = {
  1: null,
  2: "combat_pace_2",
  3: "combat_pace_3",
  4: "combat_pace_4",
  5: "combat_pace_5",
};

export function getSpeedTraitId(speed: BattleSpeed): string | null {
  return SPEED_TRAIT_MAP[speed];
}

export function isBattleSpeedUnlocked(save: SaveData, speed: BattleSpeed): boolean {
  const traitId = SPEED_TRAIT_MAP[speed];
  if (!traitId) return true;
  return isTraitUnlocked(save, traitId);
}

export function getUnlockedBattleSpeeds(save: SaveData): BattleSpeed[] {
  return BATTLE_SPEED_OPTIONS.filter((speed) => isBattleSpeedUnlocked(save, speed));
}

export function getHighestUnlockedBattleSpeed(save: SaveData): BattleSpeed {
  const unlocked = getUnlockedBattleSpeeds(save);
  return unlocked[unlocked.length - 1] ?? STARTING_BATTLE_SPEED;
}

export function clampBattleSpeed(save: SaveData, speed: BattleSpeed): BattleSpeed {
  return isBattleSpeedUnlocked(save, speed) ? speed : getHighestUnlockedBattleSpeed(save);
}

export function getBattleTickIntervalMs(
  speed: BattleSpeed,
  baseTickMs: number,
): number {
  return Math.max(20, Math.round(baseTickMs * (REFERENCE_BATTLE_SPEED / speed)));
}

export function getVictoryDelayMs(speed: BattleSpeed, baseDelayMs: number): number {
  return Math.max(200, Math.round(baseDelayMs * (REFERENCE_BATTLE_SPEED / speed)));
}

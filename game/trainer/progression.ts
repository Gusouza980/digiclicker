import { calculateLevelFromXp } from "@/game/progression/xp";
import type { GlobalConfig, SaveData } from "@/types";

export type TrainerProgressionResult = {
  save: SaveData;
  previousLevel: number;
  newLevel: number;
  traitPointsGained: number;
  leveledUp: boolean;
};

export function applyTrainerXp(
  save: SaveData,
  amount: number,
  config: GlobalConfig,
): TrainerProgressionResult {
  const next = structuredClone(save);
  const previousLevel = next.player.trainerLevel;
  const totalXp = next.player.trainerXp + amount;
  const progressed = calculateLevelFromXp(previousLevel, totalXp, config);

  next.player.trainerLevel = progressed.level;
  next.player.trainerXp = progressed.xp;

  const levelsGained = progressed.level - previousLevel;
  const traitPointsGained = levelsGained;
  next.player.traitPoints += traitPointsGained;

  return {
    save: next,
    previousLevel,
    newLevel: progressed.level,
    traitPointsGained,
    leveledUp: levelsGained > 0,
  };
}

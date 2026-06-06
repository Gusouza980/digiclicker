import { applyBattleFriendship } from "@/game/friendship";
import { syncUnlockedLocations } from "@/game/locations";
import { updateMissionProgressOnVictory } from "@/game/missions";
import { applyRewards, resolveVictoryRewards } from "@/game/rewards";
import type { LevelUpEvent, RewardDisplayEntry } from "@/game/rewards/types";
import { applyTrainerXp } from "@/game/trainer/progression";
import { getTraitModifiers } from "@/game/traits/effects";
import type { GlobalConfig, SaveData } from "@/types";
import type { RewardGrant } from "@/game/rewards/types";

let displayCounter = 0;

function nextDisplayId(): string {
  displayCounter += 1;
  return `victory_${displayCounter}`;
}

function applyTraitModifiersToGrants(
  save: SaveData,
  grants: RewardGrant[],
): RewardGrant[] {
  const modifiers = getTraitModifiers(save);

  return grants.map((grant) => {
    if (grant.type === "bits" && modifiers.bitsPercent > 0) {
      return {
        ...grant,
        amount: Math.floor(grant.amount * (1 + modifiers.bitsPercent)),
      };
    }

    if (grant.type === "digimon_xp" && modifiers.digimonXpPercent > 0) {
      return {
        ...grant,
        amount: Math.floor(grant.amount * (1 + modifiers.digimonXpPercent)),
      };
    }

    return grant;
  });
}

export type ProcessVictoryResult = {
  save: SaveData;
  display: RewardDisplayEntry[];
  levelUps: LevelUpEvent[];
};

export function processBattleVictory(
  save: SaveData,
  config: GlobalConfig,
  locationId: string,
  defeatedEnemyIds: string[],
  livingAllyInstanceIds: string[],
): ProcessVictoryResult {
  let nextSave = structuredClone(save);
  const display: RewardDisplayEntry[] = [];
  const levelUps: LevelUpEvent[] = [];

  const baseGrants = resolveVictoryRewards(
    nextSave,
    locationId,
    defeatedEnemyIds,
    livingAllyInstanceIds,
  );
  const grants = applyTraitModifiersToGrants(nextSave, baseGrants);
  const rewardResult = applyRewards(nextSave, grants, config);
  nextSave = rewardResult.save;
  display.push(...rewardResult.display);
  levelUps.push(...rewardResult.levelUps);

  const trainerResult = applyTrainerXp(
    nextSave,
    config.xp.trainerPerVictory,
    config,
  );
  nextSave = trainerResult.save;
  display.push({
    id: nextDisplayId(),
    messageKey: "battle.reward.trainer_xp",
    amount: config.xp.trainerPerVictory,
  });

  if (trainerResult.leveledUp) {
    display.push({
      id: nextDisplayId(),
      messageKey: "battle.reward.trainer_level_up",
      amount: trainerResult.newLevel,
    });

    if (trainerResult.traitPointsGained > 0) {
      display.push({
        id: nextDisplayId(),
        messageKey: "battle.reward.trait_points",
        amount: trainerResult.traitPointsGained,
      });
    }
  }

  nextSave = applyBattleFriendship(nextSave, livingAllyInstanceIds, config);
  nextSave.player.battlesWon += 1;

  nextSave = updateMissionProgressOnVictory(nextSave, {
    locationId,
    defeatedEnemyCount: defeatedEnemyIds.length,
    defeatedBossId: null,
  });

  nextSave = syncUnlockedLocations(nextSave);

  return { save: nextSave, display, levelUps };
}

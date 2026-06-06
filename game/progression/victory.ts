import { registerBossDefeated } from "@/game/boss";
import { resolveBossVictoryRewards } from "@/game/boss/rewards";
import { applyBattleFriendship } from "@/game/friendship";
import { syncUnlockedLocations } from "@/game/locations";
import { updateMissionProgressOnVictory } from "@/game/missions";
import { consumeBattleBuffs, getXpMultiplier } from "@/game/progression/buffs";
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
  const xpMultiplier = getXpMultiplier(save);

  return grants.map((grant) => {
    if (grant.type === "bits" && modifiers.bitsPercent > 0) {
      return {
        ...grant,
        amount: Math.floor(grant.amount * (1 + modifiers.bitsPercent)),
      };
    }

    if (grant.type === "digimon_xp") {
      let amount = grant.amount;
      if (modifiers.digimonXpPercent > 0) {
        amount = Math.floor(amount * (1 + modifiers.digimonXpPercent));
      }
      if (xpMultiplier > 1) {
        amount = Math.floor(amount * xpMultiplier);
      }
      return { ...grant, amount };
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
  bossChallengeId: string | null = null,
): ProcessVictoryResult {
  let nextSave = structuredClone(save);
  const display: RewardDisplayEntry[] = [];
  const levelUps: LevelUpEvent[] = [];

  const baseGrants = bossChallengeId
    ? [
        ...resolveBossVictoryRewards(bossChallengeId),
        ...livingAllyInstanceIds
          .filter((allyId) => nextSave.digimons[allyId])
          .map((allyId) => ({
            type: "digimon_xp" as const,
            digimonInstanceId: allyId,
            amount: config.xp.digimonPerVictory,
          })),
      ]
    : resolveVictoryRewards(
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
  nextSave = consumeBattleBuffs(nextSave);

  if (bossChallengeId) {
    nextSave = registerBossDefeated(nextSave, bossChallengeId);
    display.push({
      id: nextDisplayId(),
      messageKey: "battle.reward.boss_defeated",
      amount: 1,
    });
  }

  nextSave = updateMissionProgressOnVictory(nextSave, {
    locationId,
    defeatedEnemyCount: defeatedEnemyIds.length,
    defeatedBossId: bossChallengeId,
  });

  nextSave = syncUnlockedLocations(nextSave);

  return { save: nextSave, display, levelUps };
}

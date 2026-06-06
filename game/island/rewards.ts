import { getGlobalConfig } from "@/catalogs/loader";
import { clampFriendship } from "@/game/friendship";
import type { GlobalConfig, IslandAction, SaveData, StatKey } from "@/types";

function getRewardMultiplier(action: IslandAction, config: GlobalConfig): number {
  if (!action.usedTrainingChip) return 1;
  return config.island.trainingChip.rewardMultiplier;
}

export function rollItemSearchReward(config: GlobalConfig): string | null {
  const drops = config.island.itemSearchDrops;
  const totalWeight = drops.reduce((sum, drop) => sum + drop.weight, 0);
  if (totalWeight <= 0) return null;

  let roll = Math.random() * totalWeight;
  for (const drop of drops) {
    roll -= drop.weight;
    if (roll <= 0) return drop.itemId;
  }

  return drops[drops.length - 1]?.itemId ?? null;
}

export function applyActionRewards(
  save: SaveData,
  action: IslandAction,
  config: GlobalConfig = getGlobalConfig(),
): SaveData {
  const next = structuredClone(save);
  const digimon = next.digimons[action.digimonInstanceId];
  if (!digimon) return save;

  const multiplier = getRewardMultiplier(action, config);
  const actionConfig = config.island.actions[action.actionType];

  if (action.actionType === "stat_training" && action.statTarget) {
    const gain = Math.floor((actionConfig.statGain ?? 0) * multiplier);
    const stat = action.statTarget as StatKey;
    const max = config.evolution.cumulativeMaxPerStat;
    digimon.cumulativeStats[stat] = Math.min(
      digimon.cumulativeStats[stat] + gain,
      max,
    );
  }

  if (action.actionType === "friendship_training") {
    const gain = Math.floor((actionConfig.friendshipGain ?? 0) * multiplier);
    digimon.friendship = clampFriendship(digimon.friendship + gain, config);
  }

  if (action.actionType === "type_xp" && action.typeXpTarget) {
    const gain = Math.floor((actionConfig.typeXpGain ?? 0) * multiplier);
    digimon.typeXp[action.typeXpTarget] =
      (digimon.typeXp[action.typeXpTarget] ?? 0) + gain;
  }

  if (action.actionType === "item_search") {
    const itemId = rollItemSearchReward(config);
    if (itemId) {
      const drop = config.island.itemSearchDrops.find((entry) => entry.itemId === itemId);
      const quantity = drop?.quantity ?? 1;
      const existing = next.inventory.items.find((item) => item.itemId === itemId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        next.inventory.items.push({ itemId, quantity });
      }
    }
  }

  if (action.actionType === "auto_mission" && action.missionId) {
    const mission = config.island.autoMissions.find((entry) => entry.id === action.missionId);
    if (mission) {
      next.player.bits += Math.floor(mission.rewardBits * multiplier);
    }
  }

  return next;
}

export function getCollectRewardSummary(
  action: IslandAction,
  config: GlobalConfig = getGlobalConfig(),
): Record<string, string> {
  const multiplier = getRewardMultiplier(action, config);
  const actionConfig = config.island.actions[action.actionType];

  if (action.actionType === "stat_training" && action.statTarget) {
    const gain = Math.floor((actionConfig.statGain ?? 0) * multiplier);
    return { stat: action.statTarget.toUpperCase(), amount: String(gain) };
  }

  if (action.actionType === "friendship_training") {
    const gain = Math.floor((actionConfig.friendshipGain ?? 0) * multiplier);
    return { amount: String(gain) };
  }

  if (action.actionType === "type_xp" && action.typeXpTarget) {
    const gain = Math.floor((actionConfig.typeXpGain ?? 0) * multiplier);
    return { type: action.typeXpTarget, amount: String(gain) };
  }

  if (action.actionType === "auto_mission" && action.missionId) {
    const mission = config.island.autoMissions.find((entry) => entry.id === action.missionId);
    return { amount: String(Math.floor((mission?.rewardBits ?? 0) * multiplier)) };
  }

  return {};
}

import { getGlobalConfig } from "@/catalogs/loader";
import { getDigimonLocation } from "@/game/collection";
import { consumeItem } from "@/game/inventory/operations";
import type {
  GlobalConfig,
  IslandAction,
  IslandActionFeedback,
  IslandActionType,
  SaveData,
  StatKey,
} from "@/types";
import { STAT_KEYS } from "@/types/stats";
import { createInstanceId } from "@/utils/id";

import { applyActionRewards, getCollectRewardSummary } from "./rewards";
import { isActionReady } from "./timers";

export type IslandActionResult =
  | { ok: true; save: SaveData; feedback: IslandActionFeedback }
  | { ok: false; reason: string; feedback: IslandActionFeedback };

const TYPE_XP_TARGETS = [
  "reptile",
  "bird",
  "insect",
  "vegetation",
  "aquatic",
  "holy_beast",
  "mammal",
] as const;

export function getTypeXpTargets(): readonly string[] {
  return TYPE_XP_TARGETS;
}

export function getStatTargets(): readonly StatKey[] {
  return STAT_KEYS;
}

export function getActionsByType(save: SaveData, actionType: IslandActionType): IslandAction[] {
  return save.island.actions.filter((action) => action.actionType === actionType);
}

export function getOccupiedSlots(
  save: SaveData,
  actionType: IslandActionType,
): number {
  return getActionsByType(save, actionType).length;
}

export function hasAvailableSlot(
  save: SaveData,
  actionType: IslandActionType,
  config: GlobalConfig = getGlobalConfig(),
): boolean {
  return getOccupiedSlots(save, actionType) < config.island.slotsPerAction;
}

export function isDigimonInIslandAction(save: SaveData, digimonInstanceId: string): boolean {
  return save.island.actions.some(
    (action) => action.digimonInstanceId === digimonInstanceId,
  );
}

export function getDigimonAction(
  save: SaveData,
  digimonInstanceId: string,
): IslandAction | null {
  return (
    save.island.actions.find((action) => action.digimonInstanceId === digimonInstanceId) ??
    null
  );
}

type StartActionParams = {
  digimonInstanceId: string;
  actionType: IslandActionType;
  statTarget?: StatKey;
  typeXpTarget?: string;
  missionId?: string;
  useTrainingChip?: boolean;
};

export function startIslandAction(
  save: SaveData,
  params: StartActionParams,
  config: GlobalConfig = getGlobalConfig(),
): IslandActionResult {
  const next = structuredClone(save);
  const digimon = next.digimons[params.digimonInstanceId];

  if (!digimon) {
    return {
      ok: false,
      reason: "digimon_not_found",
      feedback: { messageKey: "island.error.digimon_not_found", variant: "fail" },
    };
  }

  if (getDigimonLocation(next, params.digimonInstanceId) !== "island") {
    return {
      ok: false,
      reason: "not_on_island",
      feedback: { messageKey: "island.error.not_on_island", variant: "fail" },
    };
  }

  if (isDigimonInIslandAction(next, params.digimonInstanceId)) {
    return {
      ok: false,
      reason: "already_busy",
      feedback: { messageKey: "island.error.already_busy", variant: "fail" },
    };
  }

  if (!hasAvailableSlot(next, params.actionType, config)) {
    return {
      ok: false,
      reason: "slots_full",
      feedback: { messageKey: "island.error.slots_full", variant: "fail" },
    };
  }

  if (params.useTrainingChip) {
    if (!consumeItem(next.inventory, "training_chip", 1)) {
      return {
        ok: false,
        reason: "no_training_chip",
        feedback: { messageKey: "island.error.no_training_chip", variant: "fail" },
      };
    }
  }

  const actionConfig = config.island.actions[params.actionType];
  let durationMs = actionConfig.durationMs;

  if (params.actionType === "auto_mission") {
    if (!params.missionId) {
      return {
        ok: false,
        reason: "mission_required",
        feedback: { messageKey: "island.error.mission_required", variant: "fail" },
      };
    }
    const mission = config.island.autoMissions.find((entry) => entry.id === params.missionId);
    if (!mission) {
      return {
        ok: false,
        reason: "invalid_mission",
        feedback: { messageKey: "island.error.invalid_mission", variant: "fail" },
      };
    }
    if (digimon.level < mission.minLevel) {
      return {
        ok: false,
        reason: "level_too_low",
        feedback: {
          messageKey: "island.error.level_too_low",
          variant: "fail",
          params: { level: String(mission.minLevel) },
        },
      };
    }
    durationMs = mission.durationMs;
  }

  if (params.actionType === "stat_training") {
    if (!params.statTarget || !STAT_KEYS.includes(params.statTarget)) {
      return {
        ok: false,
        reason: "stat_required",
        feedback: { messageKey: "island.error.stat_required", variant: "fail" },
      };
    }
  }

  if (params.actionType === "type_xp") {
    if (!params.typeXpTarget || !TYPE_XP_TARGETS.includes(params.typeXpTarget as typeof TYPE_XP_TARGETS[number])) {
      return {
        ok: false,
        reason: "type_required",
        feedback: { messageKey: "island.error.type_required", variant: "fail" },
      };
    }
  }

  if (params.useTrainingChip) {
    durationMs = Math.floor(durationMs * config.island.trainingChip.durationMultiplier);
  }

  const startedAt = new Date();
  const endsAt = new Date(startedAt.getTime() + durationMs);

  const action: IslandAction = {
    id: createInstanceId("island_action"),
    actionType: params.actionType,
    digimonInstanceId: params.digimonInstanceId,
    startedAt: startedAt.toISOString(),
    endsAt: endsAt.toISOString(),
    statTarget: params.statTarget,
    typeXpTarget: params.typeXpTarget,
    missionId: params.missionId,
    usedTrainingChip: params.useTrainingChip,
  };

  next.island.actions.push(action);

  return {
    ok: true,
    save: next,
    feedback: {
      messageKey: "island.action.started",
      variant: "success",
      params: { type: params.actionType },
    },
  };
}

export function collectIslandAction(
  save: SaveData,
  actionId: string,
  config: GlobalConfig = getGlobalConfig(),
): IslandActionResult {
  const next = structuredClone(save);
  const index = next.island.actions.findIndex((action) => action.id === actionId);

  if (index < 0) {
    return {
      ok: false,
      reason: "action_not_found",
      feedback: { messageKey: "island.error.action_not_found", variant: "fail" },
    };
  }

  const action = next.island.actions[index];

  if (!isActionReady(action)) {
    return {
      ok: false,
      reason: "not_ready",
      feedback: { messageKey: "island.error.not_ready", variant: "fail" },
    };
  }

  let rewarded = applyActionRewards(next, action, config);
  rewarded.island.actions.splice(index, 1);

  const summary = getCollectRewardSummary(action, config);

  return {
    ok: true,
    save: rewarded,
    feedback: {
      messageKey: `island.collect.${action.actionType}`,
      variant: "success",
      params: summary,
    },
  };
}

export { formatRemainingMs, getActionProgress, getRemainingMs, isActionReady } from "./timers";

import { getCatalogEntry } from "@/catalogs/loader";
import type {
  PlayerDigimon,
  RequirementCheckResult,
  RequirementRule,
  SaveData,
  StatBlock,
  StatKey,
} from "@/types";

export type DigimonRequirementContext = {
  save: SaveData;
  digimon: PlayerDigimon;
  totalStats: StatBlock;
};

function evaluateWorldRule(save: SaveData, rule: RequirementRule): boolean {
  switch (rule.type) {
    case "trainer_level_min":
      return save.player.trainerLevel >= rule.value;
    case "battles_won_min":
      return save.player.battlesWon >= rule.value;
    case "boss_defeated":
      return rule.targetId
        ? save.location.defeatedBossIds.includes(rule.targetId)
        : false;
    case "mission_claimed": {
      if (!rule.targetId) return false;
      const mission = save.missions.find((entry) => entry.missionId === rule.targetId);
      return mission?.status === "claimed";
    }
    case "location_unlocked":
      return rule.targetId
        ? save.location.unlockedLocationIds.includes(rule.targetId)
        : false;
    case "bits_min":
      return save.player.bits >= rule.value;
    default:
      return false;
  }
}

function evaluateDigimonRule(
  context: DigimonRequirementContext,
  rule: RequirementRule,
): boolean {
  switch (rule.type) {
    case "digimon_level_min":
      return context.digimon.level >= rule.value;
    case "digimon_stat_min": {
      if (!rule.targetId) return false;
      const stat = rule.targetId as StatKey;
      return (context.totalStats[stat] ?? 0) >= rule.value;
    }
    case "friendship_min":
      return context.digimon.friendship >= rule.value;
    case "type_xp_min":
      return rule.targetId
        ? (context.digimon.typeXp[rule.targetId] ?? 0) >= rule.value
        : false;
    default:
      return evaluateWorldRule(context.save, rule);
  }
}

export function checkDigimonRequirementSet(
  context: DigimonRequirementContext,
  requirementId: string,
): RequirementCheckResult {
  const entry = getCatalogEntry("requirement", requirementId);
  if (!entry) {
    return { met: false, failedRules: [] };
  }

  const failedRules = entry.rules.filter(
    (rule) => !evaluateDigimonRule(context, rule),
  );
  return { met: failedRules.length === 0, failedRules };
}

export function checkDigimonRequirementSets(
  context: DigimonRequirementContext,
  requirementIds: string[],
): RequirementCheckResult {
  const failedRules: RequirementRule[] = [];

  for (const requirementId of requirementIds) {
    const result = checkDigimonRequirementSet(context, requirementId);
    if (!result.met) {
      failedRules.push(...result.failedRules);
    }
  }

  return { met: failedRules.length === 0, failedRules };
}

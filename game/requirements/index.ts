import { getCatalogEntry } from "@/catalogs/loader";
import type { RequirementCheckResult, RequirementRule, SaveData } from "@/types";

function evaluateRule(save: SaveData, rule: RequirementRule): boolean {
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

export function checkRequirementSet(
  save: SaveData,
  requirementId: string,
): RequirementCheckResult {
  const entry = getCatalogEntry("requirement", requirementId);
  if (!entry) {
    return { met: false, failedRules: [] };
  }

  const failedRules = entry.rules.filter((rule) => !evaluateRule(save, rule));
  return { met: failedRules.length === 0, failedRules };
}

export function checkAllRequirementSets(
  save: SaveData,
  requirementIds: string[],
): RequirementCheckResult {
  const failedRules: RequirementRule[] = [];

  for (const requirementId of requirementIds) {
    const result = checkRequirementSet(save, requirementId);
    if (!result.met) {
      failedRules.push(...result.failedRules);
    }
  }

  return { met: failedRules.length === 0, failedRules };
}

export function getRequirementDescriptionKey(rule: RequirementRule): string {
  return `requirement.${rule.type}`;
}

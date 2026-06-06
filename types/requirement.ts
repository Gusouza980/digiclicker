export type RequirementRuleType =
  | "trainer_level_min"
  | "battles_won_min"
  | "boss_defeated"
  | "mission_claimed"
  | "location_unlocked"
  | "bits_min"
  | "digimon_level_min"
  | "digimon_stat_min"
  | "friendship_min"
  | "type_xp_min";

export type RequirementRule = {
  type: RequirementRuleType;
  targetId?: string | null;
  value: number;
};

export type RequirementCatalogEntry = {
  id: string;
  rules: RequirementRule[];
};

export type RequirementCheckResult = {
  met: boolean;
  failedRules: RequirementRule[];
};

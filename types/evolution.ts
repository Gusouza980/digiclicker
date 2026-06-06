export type EvolutionDirection = "evolve" | "degenerate";

export type EvolutionCatalogEntry = {
  id: string;
  fromId: string;
  toId: string;
  direction: EvolutionDirection;
  requirementIds: string[];
};

export type EvolutionFeedback = {
  messageKey: string;
  variant: "success" | "fail" | "info";
  params?: Record<string, string>;
};

export type EvolutionOptionStatus = "available" | "blocked" | "unknown";

export type EvolutionOption = {
  transitionId: string;
  toId: string;
  direction: EvolutionDirection;
  status: EvolutionOptionStatus;
  failedRules: import("./requirement").RequirementRule[];
  estimatedCumulativeGain: import("./stats").StatBlock;
};

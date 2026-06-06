export type TraitBranch = "combat" | "bond" | "hatching" | "explorer" | "island";

export type TraitCatalogEntry = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  branch: TraitBranch;
  prerequisiteTraitIds: string[];
  cost: number;
  effectKey: string;
};

export type UnlockedTrait = {
  traitId: string;
  unlockedAt: string;
};

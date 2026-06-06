import type { DigimonAttribute, DigimonElement } from "./digimon";

export type CombatConfig = {
  advantageMultiplier: number;
  disadvantageMultiplier: number;
  attributeAdvantages: Partial<Record<DigimonAttribute, DigimonAttribute>>;
  elementAdvantages: Partial<Record<DigimonElement, DigimonElement>>;
};

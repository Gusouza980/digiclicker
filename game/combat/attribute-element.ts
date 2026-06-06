import type { DigimonAttribute, DigimonElement } from "@/types";
import type { CombatConfig } from "@/types/combat";

export type CombatAdvantage = "advantage" | "disadvantage" | "neutral";

export function getAttributeMultiplier(
  attacker: DigimonAttribute,
  defender: DigimonAttribute,
  config: CombatConfig,
): number {
  const advantageTarget = config.attributeAdvantages[attacker];
  if (advantageTarget && advantageTarget === defender) {
    return config.advantageMultiplier;
  }

  const defenderAdvantage = config.attributeAdvantages[defender];
  if (defenderAdvantage && defenderAdvantage === attacker) {
    return config.disadvantageMultiplier;
  }

  return 1;
}

export function getElementMultiplier(
  attacker: DigimonElement,
  defender: DigimonElement,
  config: CombatConfig,
): number {
  if (attacker === "neutral" || defender === "neutral") return 1;

  const advantageTarget = config.elementAdvantages[attacker];
  if (advantageTarget && advantageTarget === defender) {
    return config.advantageMultiplier;
  }

  const defenderAdvantage = config.elementAdvantages[defender];
  if (defenderAdvantage && defenderAdvantage === attacker) {
    return config.disadvantageMultiplier;
  }

  return 1;
}

export function getCombatMultiplier(
  attackerAttribute: DigimonAttribute,
  attackerElement: DigimonElement,
  defenderAttribute: DigimonAttribute,
  defenderElement: DigimonElement,
  config: CombatConfig,
): number {
  const attr = getAttributeMultiplier(attackerAttribute, defenderAttribute, config);
  const elem = getElementMultiplier(attackerElement, defenderElement, config);
  return attr * elem;
}

export function getCombatAdvantage(
  attackerAttribute: DigimonAttribute,
  attackerElement: DigimonElement,
  defenderAttribute: DigimonAttribute,
  defenderElement: DigimonElement,
  config: CombatConfig,
): CombatAdvantage {
  const multiplier = getCombatMultiplier(
    attackerAttribute,
    attackerElement,
    defenderAttribute,
    defenderElement,
    config,
  );

  if (multiplier > 1) return "advantage";
  if (multiplier < 1) return "disadvantage";
  return "neutral";
}

export function applyCombatMultiplier(damage: number, multiplier: number): number {
  return Math.max(1, Math.floor(damage * multiplier));
}

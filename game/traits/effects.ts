import { getCatalogEntry } from "@/catalogs/loader";
import type { SaveData } from "@/types";

export type TraitModifiers = {
  atkPercent: number;
  defPercent: number;
  digimonXpPercent: number;
  bitsPercent: number;
};

const EMPTY_MODIFIERS: TraitModifiers = {
  atkPercent: 0,
  defPercent: 0,
  digimonXpPercent: 0,
  bitsPercent: 0,
};

const EFFECT_MAP: Record<string, Partial<TraitModifiers>> = {
  combat_atk_5: { atkPercent: 0.05 },
  combat_atk_10: { atkPercent: 0.1 },
  combat_def_5: { defPercent: 0.05 },
  combat_def_10: { defPercent: 0.1 },
  bond_digimon_xp_10: { digimonXpPercent: 0.1 },
  bond_digimon_xp_15: { digimonXpPercent: 0.15 },
  explorer_bits_10: { bitsPercent: 0.1 },
  explorer_bits_15: { bitsPercent: 0.15 },
};

export function getTraitModifiers(save: SaveData): TraitModifiers {
  const modifiers = { ...EMPTY_MODIFIERS };

  for (const unlocked of save.traits) {
    const trait = getCatalogEntry("trait", unlocked.traitId);
    if (!trait) continue;

    const effect = EFFECT_MAP[trait.effectKey];
    if (!effect) continue;

    modifiers.atkPercent += effect.atkPercent ?? 0;
    modifiers.defPercent += effect.defPercent ?? 0;
    modifiers.digimonXpPercent += effect.digimonXpPercent ?? 0;
    modifiers.bitsPercent += effect.bitsPercent ?? 0;
  }

  return modifiers;
}

export function applyAtkModifier(baseAtk: number, save: SaveData): number {
  const { atkPercent } = getTraitModifiers(save);
  return Math.floor(baseAtk * (1 + atkPercent));
}

export function applyDefModifier(baseDef: number, save: SaveData): number {
  const { defPercent } = getTraitModifiers(save);
  return Math.floor(baseDef * (1 + defPercent));
}

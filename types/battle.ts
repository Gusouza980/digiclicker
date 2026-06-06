export type BattlePhase = "idle" | "fighting" | "victory" | "defeat";

export type BattleCombatant = {
  id: string;
  nameKey: string;
  currentHp: number;
  maxHp: number;
  mp: number;
  isDefeated: boolean;
};

export type BattleState = {
  phase: BattlePhase;
  locationId: string;
  enemy: BattleCombatant | null;
  allies: BattleCombatant[];
  lastDamage: number | null;
};

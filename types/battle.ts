export const BATTLE_SPEED_OPTIONS = [1, 2, 3, 4, 5] as const;

export type BattleSpeed = (typeof BATTLE_SPEED_OPTIONS)[number];

/** Velocidade de referência para o cálculo de intervalos (comportamento original do jogo). */
export const REFERENCE_BATTLE_SPEED: BattleSpeed = 5;

/** Velocidade inicial desbloqueada e selecionada por padrão. */
export const STARTING_BATTLE_SPEED: BattleSpeed = 1;

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

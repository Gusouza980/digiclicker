export function calculateAttackDamage(attackerAtk: number, defenderDef: number): number {
  return Math.max(1, Math.floor(attackerAtk - defenderDef * 0.5));
}

export function calculateClickDamage(teamTotalAtk: number, multiplier: number): number {
  return Math.max(1, Math.floor(teamTotalAtk * multiplier));
}

export function calculateSpecialDamage(
  atk: number,
  int: number,
  multiplier: number,
): number {
  return Math.max(1, Math.floor(Math.max(atk, int) * multiplier));
}

export function getAttackIntervalMs(spd: number): number {
  const safeSpd = Math.max(spd, 1);
  return Math.max(400, Math.min(4000, Math.round(12000 / safeSpd)));
}

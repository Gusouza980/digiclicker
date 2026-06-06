import { random } from "@/game/rng";
import type { InsertionChances, InsertionOutcome } from "@/types";

/** Chances da próxima inserção bem-sucedida, com base no progresso atual (falhas não avançam o tier). */
export function getInsertionChancesForSuccessfulCount(
  chancesTable: InsertionChances[],
  successfulInsertions: number,
): InsertionChances {
  const index = Math.min(Math.max(successfulInsertions, 0), chancesTable.length - 1);
  return chancesTable[index] ?? { success: 0.5, fail: 0.35, break: 0.15 };
}

export function getNextInsertionSlot(successfulInsertions: number): number {
  return successfulInsertions + 1;
}

export function rollInsertionOutcome(chances: InsertionChances): InsertionOutcome {
  const roll = random();
  if (roll < chances.success) return "success";
  if (roll < chances.success + chances.fail) return "fail";
  return "break";
}

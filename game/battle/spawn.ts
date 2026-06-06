import { getCatalogEntry } from "@/catalogs/loader";
import type { DigimonCatalogEntry } from "@/types/digimon";

const DEFAULT_ENEMY_TEAM_SIZE = { min: 1, max: 3 } as const;

export function pickRandomEnemyId(enemyPool: string[]): string | null {
  if (enemyPool.length === 0) return null;
  const index = Math.floor(Math.random() * enemyPool.length);
  return enemyPool[index] ?? null;
}

export function pickEnemyTeamSize(min: number, max: number): number {
  const safeMin = Math.max(1, min);
  const safeMax = Math.max(safeMin, max);
  return Math.floor(Math.random() * (safeMax - safeMin + 1)) + safeMin;
}

export function pickEnemyTeam(
  enemyPool: string[],
  teamSize: { min: number; max: number } = DEFAULT_ENEMY_TEAM_SIZE,
): string[] {
  if (enemyPool.length === 0) return [];

  const count = pickEnemyTeamSize(teamSize.min, teamSize.max);
  const team: string[] = [];

  for (let i = 0; i < count; i++) {
    const enemyId = pickRandomEnemyId(enemyPool);
    if (enemyId) {
      team.push(enemyId);
    }
  }

  return team;
}

export function getEnemyCatalogEntry(enemyId: string): DigimonCatalogEntry | null {
  return getCatalogEntry("digimon", enemyId);
}

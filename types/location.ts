export type LocationVictoryRewards = {
  bitsMin: number;
  bitsMax: number;
};

export type EnemyTeamSize = {
  min: number;
  max: number;
};

export type LocationCatalogEntry = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  enemyPool: string[];
  enemyTeamSize?: EnemyTeamSize;
  bossId: string | null;
  unlockRequirementIds: string[];
  victoryRewards?: LocationVictoryRewards;
};

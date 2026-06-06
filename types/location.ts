export type LocationCatalogEntry = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  enemyPool: string[];
  bossId: string | null;
  unlockRequirementIds: string[];
};

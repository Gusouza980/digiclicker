import { getAllCatalogEntries, loadCatalogRegistry } from "@/catalogs/loader";
import type { DigimonCatalogEntry, EggCatalogEntry } from "@/types";

export type CatalogValidationIssue = {
  kind: string;
  id: string;
  message: string;
};

export function validateCatalogs(): CatalogValidationIssue[] {
  loadCatalogRegistry();
  const issues: CatalogValidationIssue[] = [];

  const digimons = Object.values(
    getAllCatalogEntries("digimon"),
  ) as DigimonCatalogEntry[];

  for (const digimon of digimons) {
    if (!digimon.nameKey) {
      issues.push({
        kind: "digimon",
        id: digimon.id,
        message: "Missing nameKey",
      });
    }

    for (const key of ["hp", "mp", "atk", "def", "int", "spi", "spd"] as const) {
      if (digimon.baseStats[key] === undefined) {
        issues.push({
          kind: "digimon",
          id: digimon.id,
          message: `Missing base stat: ${key}`,
        });
      }
    }
  }

  const eggs = Object.values(getAllCatalogEntries("egg")) as EggCatalogEntry[];

  for (const egg of eggs) {
    const essenceId = `essence_${egg.digimonType}`;
    if (!getAllCatalogEntries("essence")[essenceId]) {
      issues.push({
        kind: "egg",
        id: egg.id,
        message: `Missing essence for type ${egg.digimonType}`,
      });
    }
  }

  return issues;
}

export function assertCatalogsValid(): void {
  const issues = validateCatalogs();
  if (issues.length > 0) {
    const summary = issues
      .slice(0, 10)
      .map((issue) => `${issue.kind}:${issue.id} - ${issue.message}`)
      .join("\n");
    throw new Error(`Catalog validation failed (${issues.length} issues):\n${summary}`);
  }
}

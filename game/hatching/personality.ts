import { getAllCatalogEntries } from "@/catalogs/loader";

export function rollHatchPersonalityId(): string | null {
  const personalities = Object.keys(getAllCatalogEntries("personality"));
  if (personalities.length === 0) return null;

  const index = Math.floor(Math.random() * personalities.length);
  return personalities[index] ?? null;
}

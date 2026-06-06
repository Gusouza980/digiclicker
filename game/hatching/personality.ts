import { getAllCatalogEntries } from "@/catalogs/loader";
import { pickRandom } from "@/game/rng";

export function rollHatchPersonalityId(): string | null {
  const personalities = Object.keys(getAllCatalogEntries("personality"));
  return pickRandom(personalities);
}

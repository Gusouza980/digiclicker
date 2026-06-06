import { getCatalogEntry } from "@/catalogs/loader";
import { createInstanceId } from "@/utils/id";
import type { EggInstance, EggRarity, InventoryState } from "@/types";

const EGG_MAX_INSERTIONS: Record<EggRarity, number> = {
  common: 3,
  rare: 4,
  reinforced: 5,
  special: 6,
  event: 6,
};

export function getEssenceIdForType(digimonType: string): string {
  return `essence_${digimonType}`;
}

export function addStackableItem(
  inventory: InventoryState,
  itemId: string,
  quantity: number,
): void {
  const catalog = getCatalogEntry("item", itemId);
  if (!catalog || quantity <= 0) return;

  const existing = inventory.items.find((item) => item.itemId === itemId);
  if (existing) {
    existing.quantity = Math.min(
      catalog.maxStack,
      existing.quantity + quantity,
    );
    return;
  }

  inventory.items.push({
    itemId,
    quantity: Math.min(catalog.maxStack, quantity),
  });
}

export function addEssence(
  inventory: InventoryState,
  essenceId: string,
  quantity: number,
): void {
  if (quantity <= 0) return;

  const catalog = getCatalogEntry("essence", essenceId);
  if (!catalog) return;

  const existing = inventory.essences.find((stack) => stack.essenceId === essenceId);
  if (existing) {
    existing.quantity += quantity;
    return;
  }

  inventory.essences.push({ essenceId, quantity });
}

export function createEggInstance(
  eggCatalogId: string,
  containedDigimonId: string,
): EggInstance | null {
  const catalog = getCatalogEntry("egg", eggCatalogId);
  if (!catalog) return null;

  return {
    instanceId: createInstanceId("egg"),
    eggTypeId: eggCatalogId,
    digimonType: catalog.digimonType,
    rarity: catalog.rarity,
    scanned: false,
    containedDigimonId,
    revealedDigimonId: null,
    insertions: 0,
    maxInsertions: EGG_MAX_INSERTIONS[catalog.rarity],
  };
}

export function addEgg(
  inventory: InventoryState,
  eggCatalogId: string,
  containedDigimonId: string,
): EggInstance | null {
  const egg = createEggInstance(eggCatalogId, containedDigimonId);
  if (!egg) return null;

  inventory.eggs.push(egg);
  return egg;
}

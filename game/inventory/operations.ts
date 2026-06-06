import { getCatalogEntry } from "@/catalogs/loader";
import type { EggInstance, InventoryState } from "@/types";

export function getEggById(
  inventory: InventoryState,
  eggInstanceId: string,
): EggInstance | null {
  return inventory.eggs.find((egg) => egg.instanceId === eggInstanceId) ?? null;
}

export function removeEgg(inventory: InventoryState, eggInstanceId: string): boolean {
  const index = inventory.eggs.findIndex((egg) => egg.instanceId === eggInstanceId);
  if (index < 0) return false;
  inventory.eggs.splice(index, 1);
  return true;
}

export function getItemQuantity(inventory: InventoryState, itemId: string): number {
  return inventory.items.find((item) => item.itemId === itemId)?.quantity ?? 0;
}

export function consumeItem(
  inventory: InventoryState,
  itemId: string,
  quantity: number,
): boolean {
  if (quantity <= 0) return true;

  const stack = inventory.items.find((item) => item.itemId === itemId);
  if (!stack || stack.quantity < quantity) return false;

  stack.quantity -= quantity;
  if (stack.quantity <= 0) {
    inventory.items = inventory.items.filter((item) => item.itemId !== itemId);
  }

  return true;
}

export function getEssenceQuantity(
  inventory: InventoryState,
  essenceId: string,
): number {
  return (
    inventory.essences.find((stack) => stack.essenceId === essenceId)?.quantity ?? 0
  );
}

export function consumeEssence(
  inventory: InventoryState,
  essenceId: string,
  quantity: number,
): boolean {
  if (quantity <= 0) return true;

  const stack = inventory.essences.find((entry) => entry.essenceId === essenceId);
  if (!stack || stack.quantity < quantity) return false;

  stack.quantity -= quantity;
  if (stack.quantity <= 0) {
    inventory.essences = inventory.essences.filter(
      (entry) => entry.essenceId !== essenceId,
    );
  }

  return true;
}

export function validateEggContents(egg: EggInstance): boolean {
  const digimon = getCatalogEntry("digimon", egg.containedDigimonId);
  if (!digimon) return false;
  return digimon.primaryType === egg.digimonType;
}

import { getAllCatalogEntries, getCatalogEntry } from "@/catalogs/loader";
import { addStackableItem } from "@/game/inventory";
import { consumeItem } from "@/game/inventory/operations";
import type { SaveData, ShopFeedback } from "@/types";

export type ShopResult = {
  ok: boolean;
  save: SaveData;
  feedback: ShopFeedback;
};

export function findShopByLocation(locationId: string) {
  const shops = Object.values(getAllCatalogEntries("shop"));
  return shops.find((entry) => entry.locationId === locationId) ?? null;
}

export function buyItem(save: SaveData, itemId: string, quantity = 1): ShopResult {
  const item = getCatalogEntry("item", itemId);
  if (!item) {
    return {
      ok: false,
      save,
      feedback: { messageKey: "shop.error.item_not_found", variant: "fail" },
    };
  }

  if (quantity <= 0 || !item.buyPrice) {
    return {
      ok: false,
      save,
      feedback: { messageKey: "shop.error.invalid_quantity", variant: "fail" },
    };
  }

  const totalCost = item.buyPrice * quantity;
  if (save.player.bits < totalCost) {
    return {
      ok: false,
      save,
      feedback: { messageKey: "shop.error.insufficient_bits", variant: "fail" },
    };
  }

  const next = structuredClone(save);
  next.player.bits -= totalCost;
  addStackableItem(next.inventory, itemId, quantity);

  return {
    ok: true,
    save: next,
    feedback: {
      messageKey: "shop.success.buy",
      variant: "success",
      params: { item: item.nameKey, quantity: String(quantity) },
    },
  };
}

export function sellItem(save: SaveData, itemId: string, quantity = 1): ShopResult {
  const item = getCatalogEntry("item", itemId);
  if (!item) {
    return {
      ok: false,
      save,
      feedback: { messageKey: "shop.error.item_not_found", variant: "fail" },
    };
  }

  if (quantity <= 0 || item.sellPrice <= 0) {
    return {
      ok: false,
      save,
      feedback: { messageKey: "shop.error.not_sellable", variant: "fail" },
    };
  }

  const next = structuredClone(save);
  if (!consumeItem(next.inventory, itemId, quantity)) {
    return {
      ok: false,
      save,
      feedback: { messageKey: "shop.error.insufficient_items", variant: "fail" },
    };
  }

  next.player.bits += item.sellPrice * quantity;

  return {
    ok: true,
    save: next,
    feedback: {
      messageKey: "shop.success.sell",
      variant: "success",
      params: {
        item: item.nameKey,
        quantity: String(quantity),
        bits: String(item.sellPrice * quantity),
      },
    },
  };
}

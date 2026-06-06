import { clampFriendship } from "@/game/friendship";
import { consumeItem } from "@/game/inventory/operations";
import { resetTraitsWithRefund } from "@/game/traits/reset";
import { createInstanceId } from "@/utils/id";
import type { GlobalConfig, ItemUseFeedback, SaveData } from "@/types";

export type ItemUseResult = {
  ok: boolean;
  save: SaveData;
  feedback: ItemUseFeedback;
};

export function useMeatOnDigimon(
  save: SaveData,
  digimonInstanceId: string,
  config: GlobalConfig,
): ItemUseResult {
  const digimon = save.digimons[digimonInstanceId];
  if (!digimon) {
    return {
      ok: false,
      save,
      feedback: { messageKey: "item.error.digimon_not_found", variant: "fail" },
    };
  }

  const gain = config.items.meatFriendshipGain;
  const next = structuredClone(save);
  if (!consumeItem(next.inventory, "meat", 1)) {
    return {
      ok: false,
      save,
      feedback: { messageKey: "item.error.not_in_inventory", variant: "fail" },
    };
  }
  const digimonRef = next.digimons[digimonInstanceId];
  const previous = digimonRef.friendship;
  digimonRef.friendship = clampFriendship(previous + gain, config);
  const applied = Math.round(digimonRef.friendship - previous);

  return {
    ok: true,
    save: next,
    feedback: {
      messageKey: "item.success.meat",
      variant: "success",
      params: { amount: String(applied) },
    },
  };
}

export function useXpBoost(save: SaveData, config: GlobalConfig): ItemUseResult {
  const next = structuredClone(save);
  if (!consumeItem(next.inventory, "xp_boost", 1)) {
    return {
      ok: false,
      save,
      feedback: { messageKey: "item.error.not_in_inventory", variant: "fail" },
    };
  }

  const existing = next.activeBuffs.find((buff) => buff.type === "xp_multiplier");
  if (existing) {
    existing.battlesRemaining += config.items.xpBoostBattles;
    existing.multiplier = config.items.xpBoostMultiplier;
  } else {
    next.activeBuffs.push({
      id: createInstanceId("buff"),
      type: "xp_multiplier",
      multiplier: config.items.xpBoostMultiplier,
      battlesRemaining: config.items.xpBoostBattles,
    });
  }

  return {
    ok: true,
    save: next,
    feedback: {
      messageKey: "item.success.xp_boost",
      variant: "success",
      params: {
        multiplier: String(config.items.xpBoostMultiplier),
        battles: String(config.items.xpBoostBattles),
      },
    },
  };
}

export function useTraitResetCore(save: SaveData): ItemUseResult {
  const next = structuredClone(save);
  if (!consumeItem(next.inventory, "trait_reset_core", 1)) {
    return {
      ok: false,
      save,
      feedback: { messageKey: "item.error.not_in_inventory", variant: "fail" },
    };
  }

  const reset = resetTraitsWithRefund(next);
  const refunded = reset.refundedPoints;

  return {
    ok: true,
    save: reset.save,
    feedback: {
      messageKey: "item.success.trait_reset",
      variant: "success",
      params: { points: String(refunded) },
    },
  };
}

export function usePotionInBattle(
  save: SaveData,
  allyInstanceId: string,
  healAmount: number,
): ItemUseResult {
  const next = structuredClone(save);
  if (!consumeItem(next.inventory, "potion_small", 1)) {
    return {
      ok: false,
      save,
      feedback: { messageKey: "item.error.not_in_inventory", variant: "fail" },
    };
  }

  return {
    ok: true,
    save: next,
    feedback: {
      messageKey: "item.success.potion",
      variant: "success",
      params: { amount: String(healAmount) },
    },
  };
}


import { canChallengeBoss, recordBossDailyAttempt } from "@/game/boss";
import { degenerateDigimon, evolveDigimon } from "@/game/evolution";
import { hatchEgg, insertEssence, scanEgg } from "@/game/hatching";
import { collectIslandAction, startIslandAction } from "@/game/island";
import { syncUnlockedLocations } from "@/game/locations";
import { claimMission } from "@/game/missions";
import { buyItem, sellItem } from "@/game/shop";
import type { GlobalConfig, SaveData } from "@/types";

import type { CommandResult, GameCommand, GameEvent } from "./types";

export function executeCommand(
  save: SaveData,
  command: GameCommand,
  config: GlobalConfig,
): CommandResult {
  const events: GameEvent[] = [];

  switch (command.type) {
    case "buy_item": {
      const result = buyItem(save, command.itemId, command.quantity ?? 1);
      if (!result.ok) {
        return { ok: false, save, events, feedback: result.feedback };
      }
      events.push({ type: "save_updated" });
      return { ok: true, save: result.save, events, feedback: result.feedback };
    }

    case "sell_item": {
      const result = sellItem(save, command.itemId, command.quantity ?? 1);
      if (!result.ok) {
        return { ok: false, save, events, feedback: result.feedback };
      }
      events.push({ type: "save_updated" });
      return { ok: true, save: result.save, events, feedback: result.feedback };
    }

    case "scan_egg": {
      const result = scanEgg(save, command.eggInstanceId);
      if (!result.ok) {
        return { ok: false, save, events, feedback: result.feedback };
      }
      events.push({ type: "save_updated" });
      return { ok: true, save: result.save, events, feedback: result.feedback };
    }

    case "insert_essence": {
      const result = insertEssence(save, command.eggInstanceId, command.useStabilizer);
      if (!result.ok) {
        return { ok: false, save, events, feedback: result.feedback };
      }
      events.push({ type: "save_updated" });
      return { ok: true, save: result.save, events, feedback: result.feedback };
    }

    case "hatch_egg": {
      const result = hatchEgg(save, command.eggInstanceId, command.destination);
      if (!result.ok) {
        return { ok: false, save, events, feedback: result.feedback };
      }
      events.push({ type: "save_updated" });
      if (command.destination === "team") {
        events.push({ type: "battle_reset_required" });
      }
      return { ok: true, save: result.save, events, feedback: result.feedback };
    }

    case "evolve": {
      const result = evolveDigimon(save, command.digimonInstanceId, command.transitionId);
      if (!result.ok) {
        return { ok: false, save, events, feedback: result.feedback };
      }
      events.push({ type: "save_updated" }, { type: "battle_reset_required" });
      return { ok: true, save: result.save, events, feedback: result.feedback };
    }

    case "degenerate": {
      const result = degenerateDigimon(save, command.digimonInstanceId, command.transitionId);
      if (!result.ok) {
        return { ok: false, save, events, feedback: result.feedback };
      }
      events.push({ type: "save_updated" }, { type: "battle_reset_required" });
      return { ok: true, save: result.save, events, feedback: result.feedback };
    }

    case "claim_mission": {
      const result = claimMission(save, command.missionId, config);
      if (!result) {
        return { ok: false, save, events };
      }
      const synced = syncUnlockedLocations(result.save);
      events.push({ type: "save_updated" });
      return { ok: true, save: synced, events };
    }

    case "start_island_action": {
      const result = startIslandAction(save, command, config);
      if (!result.ok) {
        return { ok: false, save, events, feedback: result.feedback };
      }
      events.push({ type: "save_updated" });
      return { ok: true, save: result.save, events, feedback: result.feedback };
    }

    case "collect_island_action": {
      const result = collectIslandAction(save, command.actionId, config);
      if (!result.ok) {
        return { ok: false, save, events, feedback: result.feedback };
      }
      events.push({ type: "save_updated" });
      return { ok: true, save: result.save, events, feedback: result.feedback };
    }

    case "challenge_boss": {
      if (!canChallengeBoss(save, command.bossId)) {
        return { ok: false, save, events };
      }
      const next = recordBossDailyAttempt(save, command.bossId);
      events.push(
        { type: "save_updated" },
        { type: "boss_battle_requested", bossId: command.bossId },
      );
      return { ok: true, save: next, events };
    }

    default:
      return { ok: false, save, events };
  }
}

import type { HatchDestination, IslandActionType, StatKey } from "@/types";

export type GameCommand =
  | { type: "buy_item"; itemId: string; quantity?: number }
  | { type: "sell_item"; itemId: string; quantity?: number }
  | { type: "hatch_egg"; eggInstanceId: string; destination: HatchDestination }
  | { type: "scan_egg"; eggInstanceId: string }
  | { type: "insert_essence"; eggInstanceId: string; useStabilizer?: boolean }
  | { type: "evolve"; digimonInstanceId: string; transitionId: string }
  | { type: "degenerate"; digimonInstanceId: string; transitionId: string }
  | { type: "claim_mission"; missionId: string }
  | {
      type: "start_island_action";
      digimonInstanceId: string;
      actionType: IslandActionType;
      statTarget?: StatKey;
      typeXpTarget?: string;
      missionId?: string;
      useTrainingChip?: boolean;
    }
  | { type: "collect_island_action"; actionId: string }
  | { type: "challenge_boss"; bossId: string };

export type GameEvent =
  | { type: "save_updated" }
  | { type: "battle_reset_required" }
  | { type: "boss_battle_requested"; bossId: string };

export type CommandResult = {
  ok: boolean;
  save: import("@/types").SaveData;
  events: GameEvent[];
  feedback?: {
    messageKey: string;
    variant: "success" | "fail" | "info" | "break";
    params?: Record<string, string>;
  };
};

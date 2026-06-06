"use client";

import { BattleScreen } from "@/components/battle/BattleScreen";
import { MapScreen } from "@/components/map/MapScreen";
import { TraitsScreen } from "@/components/traits/TraitsScreen";
import { useUiStore } from "@/stores/ui-store";

export function MainScreen() {
  const activeScreen = useUiStore((state) => state.activeScreen);

  switch (activeScreen) {
    case "map":
      return <MapScreen />;
    case "traits":
      return <TraitsScreen />;
    case "battle":
    default:
      return <BattleScreen />;
  }
}

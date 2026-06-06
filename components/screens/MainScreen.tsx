"use client";

import { BattleScreen } from "@/components/battle/BattleScreen";
import { DigimonDetailScreen } from "@/components/digimon/DigimonDetailScreen";
import { InventoryScreen } from "@/components/inventory/InventoryScreen";
import { ScannerScreen } from "@/components/scanner/ScannerScreen";
import { MapScreen } from "@/components/map/MapScreen";
import { TraitsScreen } from "@/components/traits/TraitsScreen";
import { useUiStore } from "@/stores/ui-store";

export function MainScreen() {
  const activeScreen = useUiStore((state) => state.activeScreen);
  const selectedDigimonId = useUiStore((state) => state.selectedDigimonId);
  const selectedEggId = useUiStore((state) => state.selectedEggId);

  if (selectedDigimonId) {
    return <DigimonDetailScreen />;
  }

  if (selectedEggId) {
    return <ScannerScreen />;
  }

  switch (activeScreen) {
    case "map":
      return <MapScreen />;
    case "inventory":
      return <InventoryScreen />;
    case "traits":
      return <TraitsScreen />;
    case "battle":
    default:
      return <BattleScreen />;
  }
}

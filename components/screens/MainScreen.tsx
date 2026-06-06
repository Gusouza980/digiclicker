"use client";

import { BattleScreen } from "@/components/battle/BattleScreen";
import { DigimonDetailScreen } from "@/components/digimon/DigimonDetailScreen";
import { InventoryScreen } from "@/components/inventory/InventoryScreen";
import { IslandScreen } from "@/components/island/IslandScreen";
import { ScannerScreen } from "@/components/scanner/ScannerScreen";
import { MapScreen } from "@/components/map/MapScreen";
import { BossVictoryModal } from "@/components/boss/BossVictoryModal";
import { OfflineSummaryModal } from "@/components/offline/OfflineSummaryModal";
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

  const content = (() => {
    switch (activeScreen) {
      case "map":
        return <MapScreen />;
      case "inventory":
        return <InventoryScreen />;
      case "traits":
        return <TraitsScreen />;
      case "island":
        return <IslandScreen />;
      case "battle":
      default:
        return <BattleScreen />;
    }
  })();

  return (
    <>
      {content}
      <OfflineSummaryModal />
      <BossVictoryModal />
    </>
  );
}

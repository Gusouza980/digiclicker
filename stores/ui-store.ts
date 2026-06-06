import { create } from "zustand";

import type {
  BossVictorySummary,
  CollectionFeedback,
  EvolutionFeedback,
  HatchingFeedback,
  IslandActionFeedback,
  ItemUseFeedback,
  OfflineSummary,
  ShopFeedback,
} from "@/types";

export type AppScreen = "battle" | "map" | "inventory" | "traits" | "island";

type UiStore = {
  activeScreen: AppScreen;
  selectedDigimonId: string | null;
  selectedEggId: string | null;
  hatchingFeedback: HatchingFeedback | null;
  collectionFeedback: CollectionFeedback | null;
  evolutionFeedback: EvolutionFeedback | null;
  islandActionFeedback: IslandActionFeedback | null;
  shopFeedback: ShopFeedback | null;
  itemUseFeedback: ItemUseFeedback | null;
  offlineSummary: OfflineSummary | null;
  bossVictorySummary: BossVictorySummary | null;
  shopLocationId: string | null;
  setActiveScreen: (screen: AppScreen) => void;
  setSelectedDigimonId: (digimonId: string | null) => void;
  setSelectedEggId: (eggId: string | null) => void;
  setHatchingFeedback: (feedback: HatchingFeedback | null) => void;
  setCollectionFeedback: (feedback: CollectionFeedback | null) => void;
  setEvolutionFeedback: (feedback: EvolutionFeedback | null) => void;
  setIslandActionFeedback: (feedback: IslandActionFeedback | null) => void;
  setShopFeedback: (feedback: ShopFeedback | null) => void;
  setItemUseFeedback: (feedback: ItemUseFeedback | null) => void;
  setOfflineSummary: (summary: OfflineSummary | null) => void;
  setBossVictorySummary: (summary: BossVictorySummary | null) => void;
  setShopLocationId: (locationId: string | null) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  activeScreen: "battle",
  selectedDigimonId: null,
  selectedEggId: null,
  hatchingFeedback: null,
  collectionFeedback: null,
  evolutionFeedback: null,
  islandActionFeedback: null,
  shopFeedback: null,
  itemUseFeedback: null,
  offlineSummary: null,
  bossVictorySummary: null,
  shopLocationId: null,
  setActiveScreen: (screen) =>
    set({
      activeScreen: screen,
      selectedDigimonId: null,
      selectedEggId: null,
      collectionFeedback: null,
      evolutionFeedback: null,
      islandActionFeedback: null,
      shopFeedback: null,
      itemUseFeedback: null,
    }),
  setSelectedDigimonId: (digimonId) =>
    set({ selectedDigimonId: digimonId, selectedEggId: null, evolutionFeedback: null }),
  setSelectedEggId: (eggId) => set({ selectedEggId: eggId, hatchingFeedback: null }),
  setHatchingFeedback: (feedback) => set({ hatchingFeedback: feedback }),
  setCollectionFeedback: (feedback) => set({ collectionFeedback: feedback }),
  setEvolutionFeedback: (feedback) => set({ evolutionFeedback: feedback }),
  setIslandActionFeedback: (feedback) => set({ islandActionFeedback: feedback }),
  setShopFeedback: (feedback) => set({ shopFeedback: feedback }),
  setItemUseFeedback: (feedback) => set({ itemUseFeedback: feedback }),
  setOfflineSummary: (summary) => set({ offlineSummary: summary }),
  setBossVictorySummary: (summary) => set({ bossVictorySummary: summary }),
  setShopLocationId: (locationId) => set({ shopLocationId: locationId }),
}));

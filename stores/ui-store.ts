import { create } from "zustand";

import type { HatchingFeedback } from "@/types";

export type AppScreen = "battle" | "map" | "inventory" | "traits";

type UiStore = {
  activeScreen: AppScreen;
  selectedDigimonId: string | null;
  selectedEggId: string | null;
  hatchingFeedback: HatchingFeedback | null;
  setActiveScreen: (screen: AppScreen) => void;
  setSelectedDigimonId: (digimonId: string | null) => void;
  setSelectedEggId: (eggId: string | null) => void;
  setHatchingFeedback: (feedback: HatchingFeedback | null) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  activeScreen: "battle",
  selectedDigimonId: null,
  selectedEggId: null,
  hatchingFeedback: null,
  setActiveScreen: (screen) =>
    set({ activeScreen: screen, selectedDigimonId: null, selectedEggId: null }),
  setSelectedDigimonId: (digimonId) =>
    set({ selectedDigimonId: digimonId, selectedEggId: null }),
  setSelectedEggId: (eggId) => set({ selectedEggId: eggId, hatchingFeedback: null }),
  setHatchingFeedback: (feedback) => set({ hatchingFeedback: feedback }),
}));

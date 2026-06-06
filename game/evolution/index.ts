import { getAllCatalogEntries, getCatalogEntry } from "@/catalogs/loader";
import { calculateTotalStats } from "@/game/stats/calculator";
import type {
  EvolutionCatalogEntry,
  EvolutionFeedback,
  EvolutionOption,
  EvolutionOptionStatus,
  SaveData,
} from "@/types";

import {
  calculateInheritedCumulative,
  estimateCumulativeGain,
  getFriendshipInheritPercent,
  mergeCumulativeStats,
} from "./cumulative";
import { isFormKnown, registerKnownForm } from "./known-forms";
import {
  checkDigimonRequirementSets,
  type DigimonRequirementContext,
} from "./requirements";

export type EvolutionActionResult =
  | { ok: true; save: SaveData; feedback: EvolutionFeedback }
  | { ok: false; reason: string; feedback: EvolutionFeedback };

function getTransitionsFrom(formId: string): EvolutionCatalogEntry[] {
  return Object.values(getAllCatalogEntries("evolution")).filter(
    (entry) => entry.fromId === formId,
  );
}

function buildContext(save: SaveData, instanceId: string): DigimonRequirementContext | null {
  const digimon = save.digimons[instanceId];
  if (!digimon) return null;

  const totalStats = calculateTotalStats(digimon);
  if (!totalStats) return null;

  return { save, digimon, totalStats };
}

function getOptionStatus(
  save: SaveData,
  transition: EvolutionCatalogEntry,
  context: DigimonRequirementContext,
): EvolutionOptionStatus {
  if (transition.direction === "degenerate" && !isFormKnown(save, transition.toId)) {
    return "unknown";
  }

  const check = checkDigimonRequirementSets(context, transition.requirementIds);
  return check.met ? "available" : "blocked";
}

export function getEvolutionOptions(
  save: SaveData,
  instanceId: string,
): EvolutionOption[] {
  const context = buildContext(save, instanceId);
  if (!context) return [];

  const transitions = getTransitionsFrom(context.digimon.catalogId);

  return transitions.map((transition) => {
    const status = getOptionStatus(save, transition, context);
    const check = checkDigimonRequirementSets(context, transition.requirementIds);

    return {
      transitionId: transition.id,
      toId: transition.toId,
      direction: transition.direction,
      status,
      failedRules: status === "blocked" ? check.failedRules : [],
      estimatedCumulativeGain: estimateCumulativeGain(
        context.digimon,
        context.totalStats,
      ),
    };
  });
}

export function getEvolveOptions(save: SaveData, instanceId: string): EvolutionOption[] {
  return getEvolutionOptions(save, instanceId).filter(
    (option) => option.direction === "evolve",
  );
}

export function getDegenerateOptions(
  save: SaveData,
  instanceId: string,
): EvolutionOption[] {
  return getEvolutionOptions(save, instanceId).filter(
    (option) => option.direction === "degenerate" && option.status !== "unknown",
  );
}

function applyFormChange(
  save: SaveData,
  instanceId: string,
  transition: EvolutionCatalogEntry,
): SaveData {
  const next = structuredClone(save);
  const digimon = next.digimons[instanceId];
  if (!digimon) return save;

  const totalStats = calculateTotalStats(digimon);
  if (!totalStats) return save;

  const inherited = calculateInheritedCumulative(totalStats, digimon.friendship);
  digimon.cumulativeStats = mergeCumulativeStats(digimon.cumulativeStats, inherited);
  digimon.catalogId = transition.toId;
  digimon.level = 1;
  digimon.xp = 0;
  digimon.typeXp = {};

  return registerKnownForm(next, transition.toId);
}

export function evolveDigimon(
  save: SaveData,
  instanceId: string,
  transitionId: string,
): EvolutionActionResult {
  const transition = getCatalogEntry("evolution", transitionId);
  const context = buildContext(save, instanceId);

  if (!transition || !context) {
    return {
      ok: false,
      reason: "invalid_transition",
      feedback: { messageKey: "evolution.error.invalid", variant: "fail" },
    };
  }

  if (transition.direction !== "evolve") {
    return {
      ok: false,
      reason: "not_evolution",
      feedback: { messageKey: "evolution.error.not_evolution", variant: "fail" },
    };
  }

  if (transition.fromId !== context.digimon.catalogId) {
    return {
      ok: false,
      reason: "wrong_form",
      feedback: { messageKey: "evolution.error.wrong_form", variant: "fail" },
    };
  }

  const check = checkDigimonRequirementSets(context, transition.requirementIds);
  if (!check.met) {
    return {
      ok: false,
      reason: "requirements_not_met",
      feedback: { messageKey: "evolution.error.requirements", variant: "fail" },
    };
  }

  const next = applyFormChange(save, instanceId, transition);
  const target = getCatalogEntry("digimon", transition.toId);

  return {
    ok: true,
    save: next,
    feedback: {
      messageKey: "evolution.success.evolve",
      variant: "success",
      params: { name: target?.nameKey ?? transition.toId },
    },
  };
}

export function degenerateDigimon(
  save: SaveData,
  instanceId: string,
  transitionId: string,
): EvolutionActionResult {
  const transition = getCatalogEntry("evolution", transitionId);
  const context = buildContext(save, instanceId);

  if (!transition || !context) {
    return {
      ok: false,
      reason: "invalid_transition",
      feedback: { messageKey: "evolution.error.invalid", variant: "fail" },
    };
  }

  if (transition.direction !== "degenerate") {
    return {
      ok: false,
      reason: "not_degeneration",
      feedback: { messageKey: "evolution.error.not_degeneration", variant: "fail" },
    };
  }

  if (transition.fromId !== context.digimon.catalogId) {
    return {
      ok: false,
      reason: "wrong_form",
      feedback: { messageKey: "evolution.error.wrong_form", variant: "fail" },
    };
  }

  if (!isFormKnown(save, transition.toId)) {
    return {
      ok: false,
      reason: "form_unknown",
      feedback: { messageKey: "evolution.error.form_unknown", variant: "fail" },
    };
  }

  const check = checkDigimonRequirementSets(context, transition.requirementIds);
  if (!check.met) {
    return {
      ok: false,
      reason: "requirements_not_met",
      feedback: { messageKey: "evolution.error.requirements", variant: "fail" },
    };
  }

  const next = applyFormChange(save, instanceId, transition);
  const target = getCatalogEntry("digimon", transition.toId);

  return {
    ok: true,
    save: next,
    feedback: {
      messageKey: "evolution.success.degenerate",
      variant: "success",
      params: { name: target?.nameKey ?? transition.toId },
    },
  };
}

export {
  estimateCumulativeGain,
  getFriendshipInheritPercent,
  isFormKnown,
  registerKnownForm,
};

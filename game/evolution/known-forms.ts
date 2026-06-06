import type { SaveData } from "@/types";

export function isFormKnown(save: SaveData, formId: string): boolean {
  return save.knownForms.knownFormIds.includes(formId);
}

export function registerKnownForm(save: SaveData, formId: string): SaveData {
  if (isFormKnown(save, formId)) return save;

  const next = structuredClone(save);
  next.knownForms.knownFormIds.push(formId);
  return next;
}

export function registerKnownForms(save: SaveData, formIds: string[]): SaveData {
  let next = save;
  for (const formId of formIds) {
    next = registerKnownForm(next, formId);
  }
  return next;
}

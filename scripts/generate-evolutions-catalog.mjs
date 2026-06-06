import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const digimonPath = join(__dirname, "../catalogs/data/digimon.json");
const evolutionsPath = join(__dirname, "../catalogs/data/evolutions.json");
const requirementsPath = join(__dirname, "../catalogs/data/requirements.json");

const STAGE_ORDER = [
  "baby",
  "in_training",
  "rookie",
  "champion",
  "ultimate",
  "mega",
];

const STAGE_REQ = {
  in_training: { level: 3, friendship: 0, atk: 0 },
  rookie: { level: 5, friendship: 5, atk: 0 },
  champion: { level: 15, friendship: 10, atk: 80 },
  ultimate: { level: 30, friendship: 25, atk: 150 },
  mega: { level: 45, friendship: 50, atk: 220 },
};

const digimon = JSON.parse(readFileSync(digimonPath, "utf8"));
const requirements = JSON.parse(readFileSync(requirementsPath, "utf8"));

const lines = new Map();

for (const entry of Object.values(digimon.entries)) {
  if (!entry.lineId) continue;
  if (!lines.has(entry.lineId)) lines.set(entry.lineId, []);
  lines.get(entry.lineId).push(entry);
}

for (const forms of lines.values()) {
  forms.sort(
    (a, b) => STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage),
  );
}

const evolutionEntries = {};
const requirementEntries = { ...requirements.entries };

function ensureRequirementForForm(form) {
  const reqId = `req_form_${form.id}`;
  if (requirementEntries[reqId]) return reqId;

  const params = STAGE_REQ[form.stage] ?? STAGE_REQ.rookie;
  const rules = [{ type: "digimon_level_min", value: params.level }];

  if (params.friendship > 0) {
    rules.push({ type: "friendship_min", value: params.friendship });
  }
  if (params.atk > 0) {
    rules.push({ type: "digimon_stat_min", targetId: "atk", value: params.atk });
  }

  requirementEntries[reqId] = { id: reqId, rules };
  return reqId;
}

for (const forms of lines.values()) {
  for (let i = 0; i < forms.length; i++) {
    const from = forms[i];

    if (i < forms.length - 1) {
      const to = forms[i + 1];
      const reqId = ensureRequirementForForm(to);
      const id = `evo_${from.id}_to_${to.id}`;
      evolutionEntries[id] = {
        id,
        fromId: from.id,
        toId: to.id,
        direction: "evolve",
        requirementIds: [reqId],
      };
    }

    for (let j = 0; j < i; j++) {
      const to = forms[j];
      const reqId = ensureRequirementForForm(to);
      const id = `deg_${from.id}_to_${to.id}`;
      evolutionEntries[id] = {
        id,
        fromId: from.id,
        toId: to.id,
        direction: "degenerate",
        requirementIds: [reqId],
      };
    }
  }
}

writeFileSync(
  evolutionsPath,
  `${JSON.stringify(
    {
      meta: {
        kind: "evolution",
        version: "1.0.0",
        updatedAt: "2026-06-06",
      },
      entries: evolutionEntries,
    },
    null,
    2,
  )}\n`,
);

writeFileSync(
  requirementsPath,
  `${JSON.stringify(
    {
      ...requirements,
      meta: { ...requirements.meta, version: "1.1.0", updatedAt: "2026-06-06" },
      entries: requirementEntries,
    },
    null,
    2,
  )}\n`,
);

console.log(
  `Evolutions: ${Object.keys(evolutionEntries).length}, Requirements: ${Object.keys(requirementEntries).length}`,
);

# Sprint 7 — Execução

**Status:** Concluída  
**Data:** 2026-06-06

## Resumo

Sistema completo de evolução e degeneração com catálogo de transições, requisitos por Digimon, formas conhecidas globais, cumulative persistido herdado por amizade e UI de árvore evolutiva com prévia.

## Tasks concluídas

- [x] **DG-S07-001** — Catálogo `evolutions.json` (142 transições, 8 linhas Adventure 1).
- [x] **DG-S07-002** — Requisitos por forma alvo (`req_form_*`: level, amizade, ATK).
- [x] **DG-S07-003** — `knownForms` registrado em starter, hatch, evolução e normalize.
- [x] **DG-S07-004** — `EvolutionPanel` com árvore, estados e ações.
- [x] **DG-S07-005** — Validação via `game/evolution/requirements.ts`.
- [x] **DG-S07-006** — Evolução: muda forma, level 1, mantém amizade/personality.
- [x] **DG-S07-007** — Cumulative persistido (`cumulativeStats`), herança 0/5/8/10%, cap 9999.
- [x] **DG-S07-008** — Nova forma registrada em `knownForms` após evolução.
- [x] **DG-S07-009** — Degeneração para formas conhecidas com requisitos da forma destino.
- [x] **DG-S07-010** — Prévia de requisitos pendentes e ganho cumulativo estimado.
- [x] **DG-S07-011** — `typeXp` zerado ao evoluir/degenerar.
- [x] **DG-S07-012** — Build OK; ciclo evoluir → degenerar → evoluir suportado.

## Arquivos principais

- `catalogs/data/evolutions.json` — transições evolve/degenerate
- `catalogs/data/requirements.json` — requisitos evolutivos (+45 entries)
- `scripts/generate-evolutions-catalog.mjs` — gerador de catálogo
- `game/evolution/` — evolve, degenerate, cumulative, known-forms, requirements
- `components/digimon/EvolutionPanel.tsx` — UI da árvore e ações
- `types/evolution.ts` — tipos de transição e feedback
- Save v6 — `cumulativeStats` em `PlayerDigimon`

## Regras implementadas

| Evento | Comportamento |
|--------|---------------|
| Evoluir | Valida requisitos → herda cumulative por amizade → forma alvo → level 1 → typeXp {} |
| Degenerar | Destino deve ser forma conhecida → mesmos requisitos da forma destino |
| Cumulative | `min(atual + total × %, 9999)` por stat; % = 0/5/8/10 por amizade |
| Known forms | Global no save; starters e hatch registram automaticamente |

## Próximo passo

- **Sprint 8:** treinamentos na Ilha Digital (slots, ações temporizadas).

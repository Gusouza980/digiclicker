# Execução — Sprint 4 — Inventário, Essence, eggs e catálogo Adventure 1

**Data de conclusão:** 2026-06-06
**Status:** Concluída

## Resumo

Base de coleção implementada: inventário com itens stackáveis, Essences e ovos; drops pós-batalha por tipo/raridade; catálogo Adventure 1 com 50 formas; personalities afetando crescimento; telas de inventário e detalhes do Digimon.

## Tasks concluídas

- [x] **DG-S04-001** — 11 Essences por `primaryType` em `catalogs/data/essences.json`.
- [x] **DG-S04-002** — 55 entradas de ovo (11 tipos × 5 raridades: common, rare, reinforced, special, event).
- [x] **DG-S04-003** — Catálogo de itens com categoria, stack, preços e descrições.
- [x] **DG-S04-004** — `game/inventory/` com `addStackableItem` e `addEssence`.
- [x] **DG-S04-005** — `addEgg` / `createEggInstance` com `containedDigimonId` oculto até scan.
- [x] **DG-S04-006** — Drop de Essence em `game/drops/resolve.ts` integrado a `resolveVictoryRewards`.
- [x] **DG-S04-007** — Drop de eggs com raridade ponderada e rookie aleatório do tipo.
- [x] **DG-S04-008** — `InventoryScreen` com seções Itens/Essences/Ovos e agrupamento por categoria.
- [x] **DG-S04-009** — Ovos exibem tipo e raridade; conteúdo oculto quando `scanned: false`.
- [x] **DG-S04-010** — 8 linhas Adventure 1 (Agumon, Gabumon, Biyomon, Tentomon, Palmon, Gomamon, Patamon, Gatomon).
- [x] **DG-S04-011** — Stats escalonados por estágio (baby → mega) via script gerador.
- [x] **DG-S04-012** — Attribute, Element e `primaryType` por forma; `lineId` para evolução futura.
- [x] **DG-S04-013** — 8 personalities em `catalogs/data/personalities.json`.
- [x] **DG-S04-014** — Modificadores de growth por personality em `game/stats/calculator.ts`.
- [x] **DG-S04-015** — `DigimonDetailScreen` com breakdown base/byLevel/cumulative e metadados.
- [x] **DG-S04-016** — `game/catalog/validate.ts` + `scripts/validate-catalog.ts`; build OK.

## Tasks não concluídas (se houver)

Nenhuma.

## Arquivos criados/alterados

- `catalogs/data/digimon.json` (v2.0.0, 50 entradas), `essences.json`, `eggs.json`, `items.json`, `personalities.json`, `config.json`
- `types/personality.ts`, `types/digimon.ts`, `types/inventory.ts`, `types/catalog.ts`
- `game/inventory/`, `game/drops/`, `game/catalog/validate.ts`
- `game/rewards/` — grants `essence` e `egg`
- `game/stats/calculator.ts` — growth com personality
- `components/inventory/InventoryScreen.tsx`, `components/digimon/DigimonDetailScreen.tsx`
- `stores/ui-store.ts`, `components/screens/MainScreen.tsx`, `Navigation.tsx`, `DigimonCard.tsx`
- `scripts/generate-adventure1-catalog.mjs`, `generate-egg-catalog.mjs`, `validate-catalog.ts`
- `i18n/locales/*.json`

## Decisões técnicas

- Ovos guardam `containedDigimonId` no save mas a UI só revela após scan (Sprint 5).
- Drops usam `primaryType` do inimigo; chance configurável por inimigo (`dropTable`) ou global (`config.drops`).
- Starters recebem personalities fixas (Fighter, Defender, Nimble) para demonstrar growth.
- Catálogo gerado por script para manter consistência de stats entre estágios.

## Critérios de saída — validação

- [x] Jogador coleta Essence e eggs nas vitórias (feed de recompensas + inventário).
- [x] Inventário básico navegável pela aba Inventário.
- [x] 50 Digimons com dados mínimos de batalha e evolução futura.
- [x] Validação de catálogo sem IDs quebrados.

## Playtest / QA

- `npx tsx scripts/validate-catalog.ts` — OK.
- `npm run build` — OK.

## Próximos passos

- **Sprint 5:** scanner, hatching, inserção de Essence e qualidade 3/5/4/5/5/5.

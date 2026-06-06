# Execução — Sprint 5 — Scanner e hatching

**Data de conclusão:** 2026-06-06
**Status:** Concluída

## Resumo

Sistema completo de scanner e chocagem: scan com Bits, inserção de Essence com sucesso/falha/quebra escalonados, qualidade 3/5–5/5 com bônus de stats, personality aleatória ao nascer e destino time/Ilha com limites respeitados.

## Tasks concluídas

- [x] **DG-S05-001** — Scan valida `containedDigimonId` compatível com `digimonType` do ovo.
- [x] **DG-S05-002** — Custos de scan por raridade em `config.hatching.scanCostByRarity`.
- [x] **DG-S05-003** — `scanEgg()` consome Bits e revela Digimon.
- [x] **DG-S05-004** — `ScannerScreen` acessível pelo inventário.
- [x] **DG-S05-005** — Custo de Essence por raridade em `essenceCostByRarity`.
- [x] **DG-S05-006** — `insertEssence()` consome Essence e sorteia resultado.
- [x] **DG-S05-007** — Tabela de chances para inserções 1ª–5ª (85→25% sucesso).
- [x] **DG-S05-008** — Falha preserva ovo; perde só Essence.
- [x] **DG-S05-009** — Quebra remove ovo do inventário.
- [x] **DG-S05-010** — Chocagem liberada com ≥3 inserções bem-sucedidas.
- [x] **DG-S05-011** — Bônus base +5% (4/5) e +10% (5/5) em `stats/calculator`.
- [x] **DG-S05-012** — Personality sorteada do catálogo ao chocar.
- [x] **DG-S05-013** — Destino time (máx. 3) ou Ilha (máx. 50).
- [x] **DG-S05-014** — UI exibe % de sucesso, falha e quebra da próxima inserção bem-sucedida (tier baseado em sucessos, não em tentativas).
- [x] **DG-S05-015** — Feedbacks coloridos para scan/insert/break/hatch.
- [x] **DG-S05-016** — `hatch_stabilizer` no save inicial; converte quebra em falha.
- [x] **DG-S05-017** — QA: build OK; chances escalonadas geram tensão 3/5 vs 4/5 vs 5/5.

## Tasks não concluídas (se houver)

Nenhuma.

## Arquivos criados/alterados

- `types/hatching.ts`, `types/catalog.ts`
- `catalogs/data/config.json` — seção `hatching`
- `catalogs/data/items.json` — `hatch_stabilizer`
- `game/hatching/` — scan, insert, hatch, chances, personality
- `game/inventory/operations.ts`
- `game/stats/calculator.ts` — bônus de qualidade
- `game/save/create.ts` — 1 stabilizer inicial
- `components/scanner/ScannerScreen.tsx`
- `components/inventory/InventoryScreen.tsx`, `digimon/DigimonDetailScreen.tsx`
- `stores/game-store.ts`, `stores/ui-store.ts`
- `i18n/locales/*.json`, `scripts/merge-sprint05-i18n.mjs`

## Decisões técnicas

- Qualidade máxima por raridade: common 3, rare 4, reinforced/special/event 5.
- Hatch Stabilizer opcional por inserção; consome 1 unidade ao evitar quebra.
- Chances escalonam pelo progresso de inserções bem-sucedidas (0/4 → 1ª, 1/4 → 2ª, etc.); falhas mantêm o mesmo tier.
- Digimon chocado nasce level 1 com `hatchQuality` = inserções atuais.
- Scanner fecha automaticamente se ovo quebrar ou for chocado.

## Critérios de saída — validação

- [x] Scan com Bits funcional.
- [x] Inserção de Essence com falha/quebra corretas.
- [x] Chocagem 3/5, 4/5 e 5/5 com bônus diferenciados.
- [x] Tensão risco/recompensa via chances crescentes de quebra.

## Playtest / QA

- `npm run build` — OK.
- Fluxo manual: inventário → scanner → scan → inserir → chocar time/ilha.

## Próximos passos

- **Sprint 6:** time, storage e coleção expandida.

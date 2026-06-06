# Sprint 9 — Execução

**Status:** Concluída  
**Data:** 2026-06-06

## Resumo

Loja por localização, itens utilizáveis, bosses com marcos de progressão, vantagem de attribute/element no combate, auto-progress e progresso offline limitado.

## Tasks concluídas

- [x] **DG-S09-001** — Matriz attribute/element em `config.combat`.
- [x] **DG-S09-002** — Multiplicadores aplicados em ataques, cliques e especiais.
- [x] **DG-S09-003** — Badge de vantagem/desvantagem na arena.
- [x] **DG-S09-004** — Bosses das 3 localizações (`bosses.json`).
- [x] **DG-S09-005** — Desafio de boss via mapa → batalha especial.
- [x] **DG-S09-006** — `defeatedBossIds` registrado na vitória.
- [x] **DG-S09-007** — Toggle de auto-progress no mapa.
- [x] **DG-S09-008** — Auto-progress pausa em derrota.
- [x] **DG-S09-009** — Catálogo de lojas (`shops.json`).
- [x] **DG-S09-010** — `ShopPanel` integrado no mapa.
- [x] **DG-S09-011** — Compra com Bits.
- [x] **DG-S09-012** — Venda de itens permitidos.
- [x] **DG-S09-013** — Meat aumenta amizade.
- [x] **DG-S09-014** — XP Boost (buff por batalhas).
- [x] **DG-S09-015** — Trait Reset Core.
- [x] **DG-S09-016** — Cálculo offline com limite e penalidades.
- [x] **DG-S09-017** — Modal de resumo offline.
- [x] **DG-S09-018** — Economia calibrada (preços/drops/offline penalties).

## Arquivos principais

- `game/combat/attribute-element.ts` — matriz e multiplicadores
- `catalogs/data/bosses.json`, `shops.json`
- `game/boss/`, `game/shop/`, `game/items/use.ts`, `game/offline/`
- `game/progression/auto-progress.ts`, `buffs.ts`
- `components/shop/ShopPanel.tsx`, `components/offline/OfflineSummaryModal.tsx`
- Save v8 — `progression`, `activeBuffs`, `pendingOfflineSummary`

## Parâmetros (config)

| Sistema | Valor |
|---------|-------|
| Vantagem/desvantagem | 1.25× / 0.75× |
| Offline máximo | 8h, penalidade 60% bits/XP |
| Meat | +3% amizade |
| XP Boost | 1.5× por 10 batalhas |
| Poção | 30% HP em batalha |

## Próximo passo

- **Sprint 10:** polimento, i18n, balanceamento e build do MVP local.

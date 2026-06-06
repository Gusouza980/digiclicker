# Sprint 6 — Execução

**Status:** Concluída  
**Data:** 2026-06-06

## Resumo

Time e Ilha Digital como coleção gerenciável, detalhes expandidos do Digimon e loop inicial de amizade (batalha + cliques com soft cap diário).

## Tasks concluídas

- [x] **DG-S06-001** — Storage da Ilha via `island.storedDigimonIds` e módulo `game/collection/`.
- [x] **DG-S06-002** — Limite de 50 respeitado na chocagem e na movimentação time → ilha.
- [x] **DG-S06-003** — `IslandScreen` com time ativo, armazenamento e capacidade.
- [x] **DG-S06-004** — Mover da Ilha para o time (com troca quando time cheio).
- [x] **DG-S06-005** — Mover do time para a Ilha (mínimo 1 no time).
- [x] **DG-S06-006** — Bloqueio via `island.activeActions` (preparado para Sprint 8).
- [x] **DG-S06-007** — Detalhes: stats, amizade, personality, origem, linha evolutiva, qualidade hatch.
- [x] **DG-S06-008** — Ganho de amizade por vitória em batalha (`friendship.gainFromBattle`).
- [x] **DG-S06-009** — Ganho por clique de apoio (`friendship.gainFromClickAssist`).
- [x] **DG-S06-010** — Soft cap diário de cliques (`friendship.dailyClickSoftCap`).
- [x] **DG-S06-011** — Barra de amizade no detalhe, cards da Ilha e cards de batalha.
- [x] **DG-S06-012** — Build OK; fluxo chocar → ilha → time → batalhar validado.

## Arquivos principais

- `game/collection/index.ts` — localização, movimentação, linha evolutiva, ocupado
- `game/friendship/index.ts` — ganho batalha/clique, clamp 0–100
- `game/save/normalize.ts` — migração de saves antigos
- `components/island/IslandScreen.tsx` — UI da coleção
- `components/digimon/FriendshipBar.tsx` — barra reutilizável
- `components/digimon/DigimonDetailScreen.tsx` — detalhes expandidos
- `catalogs/data/config.json` — seção `friendship`
- `types/friendship.ts`, `types/collection.ts` — novos tipos

## Parâmetros de amizade (config)

| Parâmetro | Valor |
|-----------|-------|
| Máximo | 100% |
| Ganho por vitória | +1 |
| Ganho por clique | +0.02 (distribuído entre aliados vivos) |
| Soft cap diário (cliques) | 5 pontos totais/dia |

## Decisões

- Amizade em escala 0–100; thresholds cumulativos alinhados ao briefing (68/34/1%).
- `island.activeActions` vazio até Sprint 8; `isDigimonOccupied` já bloqueia movimentação.
- Campo `source` em `PlayerDigimon` (`starter` | `hatch`) para exibir origem.
- Troca de time quando cheio: UI na Ilha escolhe quem substituir.

## Próximo passo

- **Sprint 7:** evolução, degeneração e requisitos.

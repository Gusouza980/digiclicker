# Sprint 8 — Execução

**Status:** Concluída  
**Data:** 2026-06-06

## Resumo

Ilha Digital com ações temporizadas por timestamp, 3 slots por tipo, cinco categorias de atividade, coleta manual de recompensas e Training Chip.

## Tasks concluídas

- [x] **DG-S08-001** — Modelo `IslandAction` com `startedAt`/`endsAt` persistido no save.
- [x] **DG-S08-002** — 3 slots por tipo via `config.island.slotsPerAction`.
- [x] **DG-S08-003** — `IslandActionsPanel` com abas por tipo de ação.
- [x] **DG-S08-004** — Treino de status (+cumulative por stat).
- [x] **DG-S08-005** — Treino de amizade (respeita cap 100%).
- [x] **DG-S08-006** — Treino de XP por tipo (tipo escolhido pelo jogador).
- [x] **DG-S08-007** — Busca por itens (tabela ponderada em config).
- [x] **DG-S08-008** — Missões automáticas (patrulha/exploração com bits).
- [x] **DG-S08-009** — Digimon ocupado bloqueia time, evolução e nova ação.
- [x] **DG-S08-010** — Timers e barra de progresso (`useIslandTimer`).
- [x] **DG-S08-011** — Coleta manual libera slot e aplica recompensa.
- [x] **DG-S08-012** — Training Chip: −50% duração e +25% recompensa.
- [x] **DG-S08-013** — Timers baseados em ISO timestamp (funciona com jogo fechado).

## Arquivos principais

- `types/island.ts` — tipos de ação e config
- `game/island/` — start, collect, timers, rewards
- `components/island/IslandActionsPanel.tsx` — UI de ações
- `hooks/useIslandTimer.ts` — refresh de timers
- `catalogs/data/config.json` — durações, drops, missões, chip
- Save v7 — `island.actions` substitui `activeActions`

## Parâmetros (config)

| Ação | Duração | Recompensa |
|------|---------|------------|
| Status | 5 min | +3 cumulative/stat |
| Amizade | 5 min | +5% |
| XP tipo | 6 min | +25 XP |
| Busca | 8 min | item aleatório |
| Missão | 5–10 min | 80–180 Bits |

## Próximo passo

- **Sprint 9:** loja, bosses e progresso offline.

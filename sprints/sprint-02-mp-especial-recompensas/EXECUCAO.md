# Execução — Sprint 2 — MP, especial, recompensas e feedback de progresso

**Data de conclusão:** 2026-06-06
**Status:** Concluída

## Resumo

Combate enriquecido com MP por ataque automático, especial por Digimon, sistema genérico de recompensas (bits e XP), catálogo parametrizado e feedback visual de progresso na tela de batalha.

## Tasks concluídas

- [x] **DG-S02-001** — MP inicia em 0 a cada onda (`spawnEnemyTeam`, `retry`, `resetAlliesMp`).
- [x] **DG-S02-002** — +5% MP por ataque automático via `mpGainPerAutoAttack` do config.
- [x] **DG-S02-003** — `specialReady` ativo quando MP ≥ 100%.
- [x] **DG-S02-004** — Especial: `max(ATK, INT) × specialDamageMultiplier` em `calculateSpecialDamage`.
- [x] **DG-S02-005** — MP zerado após `useSpecial`.
- [x] **DG-S02-006** — Botão de especial em `DigimonCard` (carregando/disponível).
- [x] **DG-S02-007** — Dano especial em âmbar no log e arena; clique em accent; normal em sky.
- [x] **DG-S02-008** — `game/rewards/` com `applyRewards`, `resolveVictoryRewards` e tipos genéricos.
- [x] **DG-S02-009** — Bits aplicados ao vencer (localização + inimigos derrotados).
- [x] **DG-S02-010** — XP de Digimon para aliados vivos via grants `digimon_xp`.
- [x] **DG-S02-011** — `battleRewards` no catálogo de inimigos + `victoryRewards` na localização.
- [x] **DG-S02-012** — `RecentRewards` exibe recompensas após vitória; bits no header.
- [x] **DG-S02-013** — Level up detectado em `applyRewards` com entrada destacada no feed.
- [x] **DG-S02-014** — QA programático + balanceamento inicial (XP 8/vitória, xpToNext 80+20×level).

## Tasks não concluídas (se houver)

Nenhuma.

## Arquivos criados/alterados

- `game/battle/engine.ts` — MP, especial, tracking de inimigos derrotados
- `game/battle/types.ts` — `mp`, `int`, `damageType`, rewards no snapshot
- `game/rewards/` — apply, resolve, types
- `game/progression/xp.ts` — cálculo de level por XP
- `stores/battle-store.ts` — `useSpecial`, `applyVictoryRewards`
- `stores/game-store.ts` — `replaceSave`
- `hooks/useBattleLoop.ts` — fluxo de recompensas na vitória
- `components/battle/DigimonCard.tsx` — barra MP + botão especial
- `components/battle/RecentRewards.tsx` — feed de recompensas
- `components/battle/CombatLog.tsx`, `BattleArena.tsx`, `BattleScreen.tsx`
- `catalogs/data/config.json`, `digimon.json`
- `types/digimon.ts`, `types/catalog.ts`
- `i18n/locales/*.json`

## Decisões técnicas

- Recompensas resolvidas fora do engine e aplicadas no hook de vitória antes de `continueAfterVictory`.
- Save atualizado via `replaceSave` sem reiniciar o engine (evita perder estado de vitória).
- Level up usa fórmula `xpToNextBase + level × xpToNextGrowth` no config global.
- Aliados vivos recebem XP base da vitória + XP por inimigo derrotado (catálogo).

## Critérios de saída — validação

- [x] Especial funcional com botão, MP e dano diferenciado.
- [x] Bits e XP aplicados ao vencer e persistidos no save.
- [x] Recompensas e level up visíveis na UI.
- [x] Loop gera sensação de progresso (bits no header, feed pós-vitória).

## Playtest / QA

- `npm run build` — OK.
- Script tsx: MP, especial, fórmula de dano, grants, bits e display validados.

## Próximos passos

- **Sprint 3:** mapa, missões narrativas, trainer level e traits.

# Execução — Sprint 1 — Loop de batalha mínimo

**Data de conclusão:** 2026-06-06
**Status:** Concluída

## Resumo

Implementado o primeiro loop de batalha jogável: time fixo com Agumon, Gabumon e Biyomon enfrenta inimigos da Vila dos Inícios. Motor de combate desacoplado da UI com ataques automáticos por SPD, clique para dano, HP, vitória, derrota e reinício.

## Tasks concluídas

- [x] **DG-S01-001** — Catálogo com Agumon, Gabumon, Biyomon + inimigos selvagens (Koromon, Tsunomon, Tokomon, Tanemon).
- [x] **DG-S01-002** — `village_of_beginnings` com enemy pool e recompensas simples (bits min/max no catálogo).
- [x] **DG-S01-003** — `game/stats/calculator.ts` com `total = base + byLevel + cumulative`.
- [x] **DG-S01-004** — `BattleEngine` em `game/battle/engine.ts`, independente de React.
- [x] **DG-S01-005** — Spawn aleatório via `pickRandomEnemyId` e pool da localização.
- [x] **DG-S01-006** — HP de aliados e inimigo com redução por dano e detecção de derrota.
- [x] **DG-S01-007** — Timers de ataque baseados em SPD (`getAttackIntervalMs`).
- [x] **DG-S01-008** — Inimigo ataca alvo aleatório vivo do time.
- [x] **DG-S01-009** — Digimon com 0 HP para de atacar (`isDefeated`).
- [x] **DG-S01-010** — Derrota total quando os 3 Digimons caem.
- [x] **DG-S01-011** — Click damage = ATK total do time × multiplicador do config.
- [x] **DG-S01-012** — `BattleArena` clicável com inimigo e barras de HP.
- [x] **DG-S01-013** — `DigimonCard` com avatar, nome, level, HP e stats.
- [x] **DG-S01-014** — `CombatLog` + número de dano flutuante no arena.
- [x] **DG-S01-015** — QA programático: vitória, clique, retry após derrota, stats.

## Tasks não concluídas (se houver)

Nenhuma.

## Arquivos criados/alterados

- `catalogs/data/digimon.json` — starters e inimigos
- `catalogs/data/locations.json` — enemy pool e rewards
- `game/stats/calculator.ts` — cálculo de stats
- `game/battle/` — engine, damage, spawn, types
- `game/save/starter-team.ts` — time inicial
- `game/save/create.ts`, `migrations.ts`, `constants.ts` — save v2 + starters
- `stores/battle-store.ts` — bridge UI ↔ engine
- `hooks/useBattleLoop.ts` — tick e auto-continuação após vitória
- `components/battle/` — BattleScreen, Arena, DigimonCard, CombatLog
- `i18n/locales/*.json` — chaves de batalha e Digimons
- `app/page.tsx` — tela principal = batalha
- `types/location.ts` — `victoryRewards`

## Decisões técnicas

- **BattleEngine** é classe pura TypeScript; Zustand (`battle-store`) apenas espelha snapshots.
- **Intervalo de ataque:** `12000 / SPD` ms, limitado entre 400–4000 ms.
- **Dano:** `max(1, ATK - DEF × 0.5)`; clique usa ATK total do time vivo.
- **Save v2:** migration adiciona time starter em saves antigos sem Digimons.
- **Vitória:** novo inimigo spawna automaticamente após 1,2 s; derrota exige botão retry.

## Critérios de saída — validação

- [x] Jogador entra em batalha ao abrir o jogo.
- [x] 3 Digimons atacam automaticamente por SPD.
- [x] Inimigo ataca aleatoriamente.
- [x] Clique causa dano adicional.
- [x] Vitória e derrota funcionam com reinício.
- [x] Lógica de combate isolada em `game/battle/`, UI só consome store.

## Playtest / QA

- `npm run build` — OK.
- Script tsx: time de 3, spawn inimigo, clique reduz HP, vitória em ticks, retry após derrota.
- Stats calculator validado para Digimon starter.

## Próximos passos

- **Sprint 2:** MP, especial, recompensas (bits/XP), feedback de progresso pós-vitória.

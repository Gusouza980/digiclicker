# Execução — Sprint 3 — Mapa, missões, trainer level e traits iniciais

**Data de conclusão:** 2026-06-06
**Status:** Concluída

## Resumo

Direção de progressão adicionada ao MVP: mapa com 3 localizações, linha narrativa de missões principais, XP/level de treinador com pontos de traits, árvore de traits em 5 ramos e sistema genérico de requisitos reutilizável.

## Tasks concluídas

- [x] **DG-S03-001** — `game/requirements/` com validação de trainer level, batalhas, boss, missão, localização e bits.
- [x] **DG-S03-002** — Catálogo de Village of Beginnings, File Forest e Native Forest + inimigos por região.
- [x] **DG-S03-003** — `selectLocation` no game-store; troca de área reinicia batalha na nova localização.
- [x] **DG-S03-004** — `syncUnlockedLocations` após vitórias e resgate de missão.
- [x] **DG-S03-005** — `MapScreen` com estados atual/bloqueada/desbloqueada e requisitos pendentes.
- [x] **DG-S03-006** — 3 missões principais encadeadas (`mission_awakening` → `mission_file_forest` → `mission_native_forest`).
- [x] **DG-S03-007** — Progresso por vitória (`defeat_enemies`) e por viagem (`reach_location`).
- [x] **DG-S03-008** — `ActiveMissionCard` na tela de batalha com objetivos e botão de resgate.
- [x] **DG-S03-009** — `claimMission` aplica bits/XP de treinador uma única vez e ativa próxima missão.
- [x] **DG-S03-010** — Trainer XP por vitória via `processBattleVictory`.
- [x] **DG-S03-011** — Level de treinador com fórmula compartilhada de XP (`calculateLevelFromXp`).
- [x] **DG-S03-012** — +1 ponto de trait por nível ganho de treinador.
- [x] **DG-S03-013** — 11 traits iniciais nos ramos Combat, Bond, Hatching, Explorer e Island.
- [x] **DG-S03-014** — `TraitsScreen` separada; navegação Mapa/Traits habilitada.
- [x] **DG-S03-015** — Desbloqueio com pré-requisitos e custo; efeitos ATK/DEF/XP/Bits aplicados em combate e recompensas.
- [x] **DG-S03-016** — QA: `npm run build` OK; fluxo loc 1→3 documentado abaixo.

## Tasks não concluídas (se houver)

Nenhuma.

## Arquivos criados/alterados

- `types/requirement.ts`, `types/mission.ts`, `types/save.ts`, `types/catalog.ts`
- `catalogs/data/requirements.json`, `locations.json`, `missions.json`, `traits.json`, `digimon.json`
- `catalogs/loader.ts`
- `game/requirements/`, `game/locations/`, `game/missions/`, `game/trainer/`, `game/traits/`, `game/progression/victory.ts`
- `game/battle/engine.ts` — modificadores de trait em ATK/DEF
- `game/save/create.ts`, `migrations.ts`, `constants.ts` — save v3 + `battlesWon`
- `stores/ui-store.ts`, `stores/game-store.ts`, `stores/battle-store.ts`
- `components/map/MapScreen.tsx`, `components/traits/TraitsScreen.tsx`, `components/missions/ActiveMissionCard.tsx`, `components/screens/MainScreen.tsx`
- `components/layout/Navigation.tsx`, `components/layout/Header.tsx`, `components/battle/BattleScreen.tsx`
- `app/page.tsx`, `i18n/locales/*.json`

## Decisões técnicas

- Requisitos em catálogo separado (`requirement`) referenciados por `unlockRequirementIds` nas localizações.
- Vitória consolidada em `processBattleVictory`: recompensas de batalha, trainer XP, missões e desbloqueio de mapa num único fluxo.
- Traits de Hatching/Island são placeholders visuais até sprints futuras; Combat/Bond/Explorer já modificam gameplay.
- Save migrado para v3 com `battlesWon` e missão inicial automática para saves antigos.

## Critérios de saída — validação

- [x] Mapa inicial com 3 localizações e estados visuais.
- [x] Linha de missão narrativa guiando Vila → File Forest → Native Forest.
- [x] Trainer XP, level e pontos de traits funcionam e persistem.
- [x] Localizações desbloqueadas por requisitos após missões/level.

## Playtest / QA — fluxo loc 1→3

1. **Vila dos Inícios** — missão *Despertar Digital* ativa; vencer 5 batalhas.
2. **Resgatar missão** — File Forest desbloqueia; próxima missão *Rumo à Floresta* inicia.
3. **Mapa** — viajar para File Forest; objetivo de chegada completa; derrotar 5 inimigos locais.
4. **Resgatar missão** — com trainer level ≥ 3, Native Forest desbloqueia.
5. **Native Forest** — viajar e completar 8 vitórias locais para concluir a linha inicial.
6. **Traits** — subir de level concede pontos; desbloquear traits de Combate/Explorador altera stats/recompensas.

## Próximos passos

- **Sprint 4:** inventário, Essence, eggs e catálogo expandido de Digimons.

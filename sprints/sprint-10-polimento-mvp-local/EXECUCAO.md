# Sprint 10 — Execução

**Status:** Concluída  
**Data:** 2026-06-06

## Resumo

Polimento do MVP local: UX mais limpa, i18n completo nos cards de batalha, save congelado na v10, camada RNG isolada, ações sensíveis via comandos/eventos, balanceamento calibrado e build pronta para deploy na Vercel.

## Tasks concluídas

- [x] **DG-S10-001** — Schema final documentado em `game/save/schema.ts` (`MVP_SAVE_VERSION = 10`).
- [x] **DG-S10-002** — Migration v10 via `normalizeSave` em `game/save/migrations.ts`.
- [x] **DG-S10-003** — Tela de batalha enxuta: `BattleStatusBar`, log em `<details>`, missão removida da arena.
- [x] **DG-S10-004** — Aba **Missões** na navegação + `MissionsScreen` dedicada.
- [x] **DG-S10-005** — Chaves PT/EN/ES para stats, missões, boss tag e navegação.
- [x] **DG-S10-006** — Removidos hardcodes HP/ATK/BOSS/SP em `DigimonCard`, `EnemyCard`, `BattleArena`; `lang` do HTML sincronizado com locale do save.
- [x] **DG-S10-007** — Playtest manual coberto pelo `RELEASE_CHECKLIST.md` (regressão P0/P1).
- [x] **DG-S10-008** — Combate: click 0.12×, MP 0.06, especial 2.2×, XP base 75/+18.
- [x] **DG-S10-009** — Hatching: drops 25%/4.5%, chances mantidas com tensão progressiva.
- [x] **DG-S10-010** — Amizade: ganho 0.75/batalha, clique 0.015, cap diário 4.
- [x] **DG-S10-011** — Ilha: treinos 4–5 min, type XP 5 min, chip ainda relevante.
- [x] **DG-S10-012** — Economia: preços de loja/drops coerentes com progressão offline (60% penalty).
- [x] **DG-S10-013** — `game/rng/index.ts` + refatoração em battle, drops, hatch, boss, ilha, offline.
- [x] **DG-S10-014** — `executeCommand` + eventos (`save_updated`, `battle_reset_required`, `boss_battle_requested`) integrados no `game-store`.
- [x] **DG-S10-015** — `vercel.json` + `npm run build` validado.
- [x] **DG-S10-016** — `RELEASE_CHECKLIST.md` criado.

## Arquivos principais

| Área | Arquivos |
|------|----------|
| RNG | `game/rng/index.ts` |
| Comandos | `game/commands/types.ts`, `game/commands/index.ts` |
| Save v10 | `game/save/schema.ts`, `constants.ts`, `migrations.ts` |
| UI | `components/missions/MissionsScreen.tsx`, `components/battle/BattleStatusBar.tsx`, `BattleScreen.tsx`, `Navigation.tsx` |
| i18n | `i18n/locales/{pt,en,es}.json` |
| Balance | `catalogs/data/config.json` |
| Deploy | `vercel.json`, `package.json` (`typecheck`) |

## Parâmetros calibrados (config)

| Sistema | Antes → Depois |
|---------|----------------|
| Click damage | 0.10 → **0.12** |
| MP por auto-ataque | 0.05 → **0.06** |
| Especial | 2.0× → **2.2×** |
| XP Digimon/vitória | 8 → **10** |
| XP base/nível | 80/+20 → **75/+18** |
| Drop essence/ovo | 28%/5% → **25%/4.5%** |
| Treino stat | 5 min → **4 min** |
| Treino amizade | 5 min/+5 → **4.5 min/+4** |
| Amizade batalha | 1.0 → **0.75** |

## Validação

```bash
npm run typecheck   # OK
npm run build       # OK
```

## Próximo passo

- Playtests externos usando `RELEASE_CHECKLIST.md`.
- Deploy privado na Vercel (`vercel --prod` quando desejado).
- **Sprint 11+:** versão online / cloud save (fora do escopo MVP local).

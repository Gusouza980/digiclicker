# Execução — Sprint 0 — Fundação técnica e arquitetura do MVP

**Data de conclusão:** 2026-06-06
**Status:** Concluída

## Resumo

Projeto Next.js 16 com TypeScript criado e estruturado para o Digiclicker. Implementados save local versionado (LocalStorage), catálogos JSON versionados, i18n PT/EN/ES, tipos de domínio, store Zustand e layout base com header, navegação e painel de QA do save.

## Tasks concluídas

- [x] **DG-S00-001** — Projeto Next.js 16 + TypeScript + Tailwind; `npm run dev` e `npm run build` funcionando.
- [x] **DG-S00-002** — Pastas `app`, `components`, `game`, `catalogs`, `stores`, `i18n`, `types`, `utils`.
- [x] **DG-S00-003** — ESLint (Next.js), Prettier, `eslint-config-prettier`, scripts `lint` e `format`.
- [x] **DG-S00-004** — Zustand em `stores/game-store.ts` com hydrate, locale e ações de save.
- [x] **DG-S00-005** — Contrato `SaveData` em `types/save.ts` (jogador, time, ilha, inventário, localização, missões, traits, settings).
- [x] **DG-S00-006** — `loadSave`, `createSave`, `persistSave`, `resetSave` em `game/save/`.
- [x] **DG-S00-007** — `saveVersion`, `CURRENT_SAVE_VERSION = 1`, `migrations.ts` com migration v0→v1.
- [x] **DG-S00-008** — `VersionedCatalog<T>` e JSONs em `catalogs/data/` (digimon, item, essence, egg, location, mission, trait, config).
- [x] **DG-S00-009** — Config global com battle tick, click damage, MP, XP e drops em `catalogs/data/config.json`.
- [x] **DG-S00-010** — Traduções PT/EN/ES em `i18n/locales/` + `translate()` em `i18n/index.ts`.
- [x] **DG-S00-011** — `catalogs/loader.ts` com `getCatalogEntry`, `getGlobalConfig`, `loadCatalogRegistry`.
- [x] **DG-S00-012** — Tipos de domínio em `types/` (Digimon, stats, battle, item, inventory, location, mission, trait, catalog).
- [x] **DG-S00-013** — Layout: `AppShell`, `Header`, `Navigation`, `GameProvider`, `HomeDashboard`, seletor de idioma.
- [x] **DG-S00-014** — QA: build OK, dev server responde, painel debug para persist/reset/new save, migration validada.

## Tasks não concluídas (se houver)

Nenhuma.

## Arquivos criados/alterados

- `package.json` — dependências Next.js, Zustand, Prettier
- `app/` — layout, page, globals.css
- `types/` — tipos de domínio e save
- `catalogs/` — dados versionados e loader
- `game/save/` — persistência local
- `i18n/` — sistema de tradução
- `stores/game-store.ts` — estado global
- `components/` — layout, providers, home, debug
- `.prettierrc`, `.prettierignore`, `eslint.config.mjs`

## Decisões técnicas

- **Zustand** escolhido por simplicidade para estado global do jogo.
- **LocalStorage** para save no MVP (IndexedDB reservado para volumes maiores).
- **Catálogos em JSON** importados estaticamente; loader abstrai acesso por ID.
- **Locale** persistido no save; textos da UI usam chaves i18n.
- **Navegação** com abas desabilitadas (exceto Batalha) até sprints futuras implementarem as telas.

## Critérios de saída — validação

- [x] O projeto abre no navegador — dev server em `localhost:3000`, build estático OK.
- [x] O jogo consegue criar e carregar um save local — `GameProvider` hidrata ou cria save; painel QA testa fluxo.
- [x] Existe estrutura de catálogos versionados — 8 catálogos com `meta.version`.
- [x] Existe sistema básico de idioma — PT/EN/ES com seletor no header.
- [x] Lógica de jogo separada da UI — save e catálogos em `game/` e `catalogs/`; UI consome store.

## Playtest / QA

- `npm run lint` — sem erros.
- `npm run build` — compilação e type-check OK.
- `curl localhost:3000` — HTML do Digiclicker retornado.
- Painel Save Debug: botões Persist, Novo save e Resetar save integrados ao store.
- Migration v0→v1 registrada para compatibilidade futura.

## Próximos passos

- **Sprint 1:** motor de batalha desacoplado, 3 Digimons iniciais, Village of Beginnings, loop de combate.
- Dependência satisfeita: tipos, save, catálogos e layout prontos para receber gameplay.

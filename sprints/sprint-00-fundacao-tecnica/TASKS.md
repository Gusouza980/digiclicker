# Sprint 0 — Fundação técnica e arquitetura do MVP

**Documento base:** `digiclicker_sprint_planning.md`

## Objetivo

Criar a base do projeto para que o desenvolvimento das mecânicas não vire código acoplado e difícil de evoluir.

## User stories relacionadas

- US-001 — Iniciar o jogo no navegador.
- US-002 — Criar novo save local.
- US-003 — Versionar o save local.
- US-004 — Selecionar idioma.
- US-005 — Carregar catálogos versionados.
- TS-001 — Estruturar motor de batalha desacoplado da UI.
- TS-004 — Parametrizar balanceamento.
- TS-005 — Preparar arquitetura para versão online.

## Tasks

| Status | ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|---|
| [ ] | DG-S00-001 | Setup | Criar projeto Next.js com TypeScript. | Projeto inicial executando no navegador. | P |
| [ ] | DG-S00-002 | Setup | Configurar estrutura de pastas do projeto. | Pastas separando `app`, `components`, `game`, `catalogs`, `stores`, `i18n`, `types` e `utils`. | M |
| [ ] | DG-S00-003 | Setup | Configurar ESLint, Prettier e convenções básicas. | Padrão mínimo de código consistente. | P |
| [ ] | DG-S00-004 | Setup | Configurar Zustand ou Redux Toolkit para estado global. | Store inicial disponível. | M |
| [ ] | DG-S00-005 | Save | Criar contrato inicial do save local. | Interface/type do save com versão, jogador, time, inventário, localização, missões e configurações. | M |
| [ ] | DG-S00-006 | Save | Implementar camada de LocalStorage ou IndexedDB. | Funções `loadSave`, `createSave`, `persistSave`, `resetSave`. | M |
| [ ] | DG-S00-007 | Save | Implementar versionamento inicial do save. | Campo `saveVersion` e estrutura para futuras migrations. | M |
| [ ] | DG-S00-008 | Data | Definir formato dos catálogos versionados. | Estrutura para Digimons, itens, localizações, missões, traits e configs. | M |
| [ ] | DG-S00-009 | Data | Criar catálogo mínimo de configuração global. | Configs de battle tick, click damage, MP, XP e drops centralizadas. | M |
| [ ] | DG-S00-010 | Data | Criar catálogo mínimo de traduções PT/EN/ES. | Sistema de chaves funcionando com idioma padrão. | M |
| [ ] | DG-S00-011 | Tech | Criar camada de carregamento de catálogo. | Função para carregar dados por ID e evitar hardcode. | M |
| [ ] | DG-S00-012 | Tech | Criar tipos globais do domínio. | Types de Digimon, stat, battle, item, inventory, location, mission, trait. | G |
| [ ] | DG-S00-013 | UI | Criar layout base da aplicação. | Shell inicial com área principal, header, navegação e estado carregado. | M |
| [ ] | DG-S00-014 | QA | Validar criação, persistência e reset do save. | Fluxo mínimo abrindo, salvando e recarregando. | P |

## Checklist de tasks

- [ ] **DG-S00-001** (Setup, P) — Criar projeto Next.js com TypeScript.
- [ ] **DG-S00-002** (Setup, M) — Configurar estrutura de pastas do projeto.
- [ ] **DG-S00-003** (Setup, P) — Configurar ESLint, Prettier e convenções básicas.
- [ ] **DG-S00-004** (Setup, M) — Configurar Zustand ou Redux Toolkit para estado global.
- [ ] **DG-S00-005** (Save, M) — Criar contrato inicial do save local.
- [ ] **DG-S00-006** (Save, M) — Implementar camada de LocalStorage ou IndexedDB.
- [ ] **DG-S00-007** (Save, M) — Implementar versionamento inicial do save.
- [ ] **DG-S00-008** (Data, M) — Definir formato dos catálogos versionados.
- [ ] **DG-S00-009** (Data, M) — Criar catálogo mínimo de configuração global.
- [ ] **DG-S00-010** (Data, M) — Criar catálogo mínimo de traduções PT/EN/ES.
- [ ] **DG-S00-011** (Tech, M) — Criar camada de carregamento de catálogo.
- [ ] **DG-S00-012** (Tech, G) — Criar tipos globais do domínio.
- [ ] **DG-S00-013** (UI, M) — Criar layout base da aplicação.
- [ ] **DG-S00-014** (QA, P) — Validar criação, persistência e reset do save.

## Critério de saída da sprint

- O projeto abre no navegador.
- O jogo consegue criar e carregar um save local.
- Existe estrutura de catálogos versionados.
- Existe sistema básico de idioma.
- O projeto já está separado para não misturar lógica de jogo diretamente na UI.

---

> Ao concluir a sprint, gere o arquivo `EXECUCAO.md` nesta pasta documentando tudo o que foi feito.

# Sprint 4 — Inventário, Essence, eggs e catálogo de Digimons do MVP

**Documento base:** `digiclicker_sprint_planning.md`

## Objetivo

Criar base de coleção e recursos: inventário, Essence, eggs, drops por tipo/raridade e catálogo inicial das linhas de Adventure 1.

## User stories relacionadas

- US-029 — Coletar Essence por tipo.
- US-030 — Coletar eggs por tipo e raridade.
- US-031 — Visualizar inventário.
- US-012 — Visualizar detalhes de um Digimon.
- US-014 — Aplicar personality no crescimento.
- US-015 — Limitar storage inicial da Ilha Digital.

## Tasks

| Status | ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|---|
| [x] | DG-S04-001 | Data | Criar catálogo de Essence. | Essences por tipo principal usadas no MVP. | M |
| [x] | DG-S04-002 | Data | Criar catálogo de raridades de egg. | Common, Rare, Reinforced, Special, Event. | P |
| [x] | DG-S04-003 | Data | Criar modelo de item no catálogo. | Itens com ID, tipo, stack, descrição, preço e uso futuro. | M |
| [x] | DG-S04-004 | Gameplay | Implementar inventário stackável. | Itens e Essence somam quantidade. | G |
| [x] | DG-S04-005 | Gameplay | Implementar inventário de eggs. | Eggs possuem tipo, raridade, estado e dados próprios. | G |
| [x] | DG-S04-006 | Gameplay | Implementar drop de Essence. | Inimigos dropam Essence conforme tipo. | M |
| [x] | DG-S04-007 | Gameplay | Implementar drop de eggs. | Inimigos podem dropar eggs por tipo/raridade. | M |
| [x] | DG-S04-008 | UI | Criar tela de inventário. | Itens agrupados por categoria. | G |
| [x] | DG-S04-009 | UI | Exibir eggs não escaneados. | Eggs mostram tipo/raridade, mas não o Digimon contido. | M |
| [x] | DG-S04-010 | Data | Criar catálogo das linhas de Adventure 1. | Agumon, Gabumon, Biyomon, Tentomon, Palmon, Gomamon, Patamon e Salamon/Gatomon lines. | GG |
| [x] | DG-S04-011 | Data | Definir stats base iniciais por forma. | HP, MP, ATK, DEF, INT, SPI e SPD para cada forma. | GG |
| [x] | DG-S04-012 | Data | Definir Attribute, Element e tipo principal por forma. | Dados necessários para dano e Essence. | G |
| [x] | DG-S04-013 | Data | Criar catálogo de personalities. | Personalities copiadas/adaptadas da referência definida. | M |
| [x] | DG-S04-014 | Gameplay | Aplicar personality no crescimento by level. | Growth por level alterado pela personality. | M |
| [x] | DG-S04-015 | UI | Criar tela de detalhes do Digimon. | Exibir level, stats, base/byLevel/cumulative, personality, attribute e element. | G |
| [x] | DG-S04-016 | QA | Validar se todos os Digimons do catálogo carregam corretamente. | Nenhum ID quebrado ou referência inexistente. | M |

## Checklist de tasks

- [x] **DG-S04-001** (Data, M) — Criar catálogo de Essence.
- [x] **DG-S04-002** (Data, P) — Criar catálogo de raridades de egg.
- [x] **DG-S04-003** (Data, M) — Criar modelo de item no catálogo.
- [x] **DG-S04-004** (Gameplay, G) — Implementar inventário stackável.
- [x] **DG-S04-005** (Gameplay, G) — Implementar inventário de eggs.
- [x] **DG-S04-006** (Gameplay, M) — Implementar drop de Essence.
- [x] **DG-S04-007** (Gameplay, M) — Implementar drop de eggs.
- [x] **DG-S04-008** (UI, G) — Criar tela de inventário.
- [x] **DG-S04-009** (UI, M) — Exibir eggs não escaneados.
- [x] **DG-S04-010** (Data, GG) — Criar catálogo das linhas de Adventure 1.
- [x] **DG-S04-011** (Data, GG) — Definir stats base iniciais por forma.
- [x] **DG-S04-012** (Data, G) — Definir Attribute, Element e tipo principal por forma.
- [x] **DG-S04-013** (Data, M) — Criar catálogo de personalities.
- [x] **DG-S04-014** (Gameplay, M) — Aplicar personality no crescimento by level.
- [x] **DG-S04-015** (UI, G) — Criar tela de detalhes do Digimon.
- [x] **DG-S04-016** (QA, M) — Validar se todos os Digimons do catálogo carregam corretamente.

## Critério de saída da sprint

- O jogador coleta Essence e eggs.
- O inventário básico existe.
- Os Digimons do MVP têm dados mínimos para batalha, crescimento e evolução futura.
- A coleção começa a ganhar estrutura real.

---

> Ao concluir a sprint, gere o arquivo `EXECUCAO.md` nesta pasta documentando tudo o que foi feito.

# Sprint 6 — Time, storage, detalhes e gerenciamento de coleção

**Documento base:** `digiclicker_sprint_planning.md`

## Objetivo

Permitir que o jogador gerencie seu time e Ilha Digital como coleção, movendo Digimons, vendo detalhes e preparando a base para evolução e treinamentos.

## User stories relacionadas

- US-010 — Visualizar Digimons do time ativo.
- US-011 — Gerenciar time ativo.
- US-012 — Visualizar detalhes de um Digimon.
- US-015 — Limitar storage inicial da Ilha Digital.
- US-019 — Aumentar amizade com cliques de apoio.

## Tasks

| Status | ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|---|
| [x] | DG-S06-001 | Gameplay | Implementar storage da Ilha Digital. | Lista de Digimons fora do time. | G |
| [x] | DG-S06-002 | Gameplay | Implementar limite de 50 Digimons na Ilha. | Novos Digimons respeitam capacidade. | M |
| [x] | DG-S06-003 | UI | Criar tela da Ilha Digital como storage. | Lista/cards de Digimons armazenados. | G |
| [x] | DG-S06-004 | Gameplay | Implementar mover Digimon da Ilha para o time. | Respeitar limite de 3 no time. | M |
| [x] | DG-S06-005 | Gameplay | Implementar remover Digimon do time para a Ilha. | Respeitar capacidade da Ilha. | M |
| [x] | DG-S06-006 | Gameplay | Impedir movimentação de Digimon ocupado. | Digimon em treino/ação não pode ir para o time. | M |
| [x] | DG-S06-007 | UI | Melhorar modal/tela de detalhes do Digimon. | Stats, amizade, personality, evolução, source e qualidade hatch. | G |
| [x] | DG-S06-008 | Gameplay | Implementar ganho de amizade por participação em batalha. | Ganho lento e parametrizado. | M |
| [x] | DG-S06-009 | Gameplay | Implementar ganho de amizade por clique de apoio. | Cliques contribuem lentamente com amizade. | M |
| [x] | DG-S06-010 | Gameplay | Implementar soft cap/limite de amizade. | Evitar farm abusivo por clique. | M |
| [x] | DG-S06-011 | UI | Exibir barra de amizade no detalhe e/ou card. | Jogador acompanha amizade. | M |
| [x] | DG-S06-012 | QA | Validar fluxo de coleção. | Chocar, armazenar, mover para time e batalhar. | M |

## Checklist de tasks

- [x] **DG-S06-001** (Gameplay, G) — Implementar storage da Ilha Digital.
- [x] **DG-S06-002** (Gameplay, M) — Implementar limite de 50 Digimons na Ilha.
- [x] **DG-S06-003** (UI, G) — Criar tela da Ilha Digital como storage.
- [x] **DG-S06-004** (Gameplay, M) — Implementar mover Digimon da Ilha para o time.
- [x] **DG-S06-005** (Gameplay, M) — Implementar remover Digimon do time para a Ilha.
- [x] **DG-S06-006** (Gameplay, M) — Impedir movimentação de Digimon ocupado.
- [x] **DG-S06-007** (UI, G) — Melhorar modal/tela de detalhes do Digimon.
- [x] **DG-S06-008** (Gameplay, M) — Implementar ganho de amizade por participação em batalha.
- [x] **DG-S06-009** (Gameplay, M) — Implementar ganho de amizade por clique de apoio.
- [x] **DG-S06-010** (Gameplay, M) — Implementar soft cap/limite de amizade.
- [x] **DG-S06-011** (UI, M) — Exibir barra de amizade no detalhe e/ou card.
- [x] **DG-S06-012** (QA, M) — Validar fluxo de coleção.

## Critério de saída da sprint

- O jogador consegue gerenciar time e Ilha.
- Digimons chocados entram corretamente na coleção.
- Amizade começa a fazer parte do loop.
- A tela de detalhes já serve como base para evolução.

---

> Ao concluir a sprint, gere o arquivo `EXECUCAO.md` nesta pasta documentando tudo o que foi feito.

# Sprint 1 — Loop de batalha mínimo

**Documento base:** `digiclicker_sprint_planning.md`

## Objetivo

Criar o primeiro protótipo jogável: uma localização, 3 Digimons fixos, inimigos automáticos, clique, dano, HP, derrota e vitória.

## User stories relacionadas

- US-006 — Visualizar tela principal moderna.
- US-007 — Ver informações essenciais da batalha.
- US-010 — Visualizar Digimons do time ativo.
- US-013 — Calcular stats totais.
- US-016 — Iniciar batalha contínua na localização atual.
- US-017 — Atacar automaticamente com base em SPD.
- US-018 — Causar dano por clique.
- US-020 — Inimigo atacar aleatoriamente.
- US-021 — Remover Digimon derrotado da batalha.
- US-022 — Resolver derrota total do time.
- TS-001 — Estruturar motor de batalha desacoplado da UI.

## Tasks

| Status | ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|---|
| [x] | DG-S01-001 | Data | Criar 3 Digimons iniciais fixos para teste. | Catálogo com Agumon, Gabumon e Biyomon ou equivalentes. | P |
| [x] | DG-S01-002 | Data | Criar localização inicial `Village of Beginnings`. | Localização com inimigos básicos e recompensas simples. | M |
| [x] | DG-S01-003 | Gameplay | Implementar cálculo de stats totais. | `total = base + byLevel + cumulative`. | M |
| [x] | DG-S01-004 | Gameplay | Implementar motor de batalha desacoplado da UI. | Battle engine com estado de combate independente de React. | G |
| [x] | DG-S01-005 | Gameplay | Implementar spawn de inimigo por localização. | Inimigo sorteado a partir do catálogo da localização. | M |
| [x] | DG-S01-006 | Gameplay | Implementar HP de aliados e inimigo. | Dano reduz HP e derrota é detectada. | M |
| [x] | DG-S01-007 | Gameplay | Implementar ataque automático por SPD. | Digimons atacam em intervalos baseados em SPD. | G |
| [x] | DG-S01-008 | Gameplay | Implementar ataque do inimigo em alvo aleatório vivo. | Inimigo causa dano em um Digimon vivo do time. | M |
| [x] | DG-S01-009 | Gameplay | Implementar regra de Digimon derrotado. | Digimon com 0 HP para de atacar e não pode agir. | M |
| [x] | DG-S01-010 | Gameplay | Implementar derrota total do time. | Ao perder os 3 Digimons, batalha termina como derrota. | M |
| [x] | DG-S01-011 | Gameplay | Implementar click damage. | Clique causa dano baseado no ATK total do time. | M |
| [x] | DG-S01-012 | UI | Criar área de batalha clicável. | Tela com inimigo, HP, time e área de clique. | M |
| [x] | DG-S01-013 | UI | Exibir cards dos 3 Digimons ativos. | Sprite, nome, level, HP e stats principais. | M |
| [x] | DG-S01-014 | UI | Exibir feedback simples de dano. | Dano aparece visualmente ou em log compacto. | M |
| [x] | DG-S01-015 | QA | Rodar playtest manual do loop básico. | Verificar se batalha reinicia, se derrota funciona e se clique é útil. | P |

## Checklist de tasks

- [x] **DG-S01-001** (Data, P) — Criar 3 Digimons iniciais fixos para teste.
- [x] **DG-S01-002** (Data, M) — Criar localização inicial `Village of Beginnings`.
- [x] **DG-S01-003** (Gameplay, M) — Implementar cálculo de stats totais.
- [x] **DG-S01-004** (Gameplay, G) — Implementar motor de batalha desacoplado da UI.
- [x] **DG-S01-005** (Gameplay, M) — Implementar spawn de inimigo por localização.
- [x] **DG-S01-006** (Gameplay, M) — Implementar HP de aliados e inimigo.
- [x] **DG-S01-007** (Gameplay, G) — Implementar ataque automático por SPD.
- [x] **DG-S01-008** (Gameplay, M) — Implementar ataque do inimigo em alvo aleatório vivo.
- [x] **DG-S01-009** (Gameplay, M) — Implementar regra de Digimon derrotado.
- [x] **DG-S01-010** (Gameplay, M) — Implementar derrota total do time.
- [x] **DG-S01-011** (Gameplay, M) — Implementar click damage.
- [x] **DG-S01-012** (UI, M) — Criar área de batalha clicável.
- [x] **DG-S01-013** (UI, M) — Exibir cards dos 3 Digimons ativos.
- [x] **DG-S01-014** (UI, M) — Exibir feedback simples de dano.
- [x] **DG-S01-015** (QA, P) — Rodar playtest manual do loop básico.

## Critério de saída da sprint

- O jogador consegue entrar em batalha.
- Os 3 Digimons atacam automaticamente.
- O inimigo ataca aleatoriamente.
- O jogador consegue clicar para causar dano.
- Vitória e derrota funcionam.
- A lógica principal de combate não depende diretamente da UI.

---

> Ao concluir a sprint, gere o arquivo `EXECUCAO.md` nesta pasta documentando tudo o que foi feito.

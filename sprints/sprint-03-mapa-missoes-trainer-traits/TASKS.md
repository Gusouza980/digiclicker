# Sprint 3 — Mapa, missões, trainer level e traits iniciais

**Documento base:** `digiclicker_sprint_planning.md`

## Objetivo

Adicionar direção ao jogador: mapa inicial, desbloqueio de localizações, missões narrativas, XP de treinador e primeira versão da árvore de traits.

## User stories relacionadas

- US-054 — Ganhar XP de treinador.
- US-055 — Receber pontos de traits.
- US-056 — Visualizar árvore de traits.
- US-057 — Desbloquear trait respeitando dependências.
- US-059 — Visualizar mapa do Digimundo.
- US-060 — Desbloquear localização por requisitos.
- US-061 — Jogar Village of Beginnings.
- US-062 — Jogar File Forest.
- US-063 — Jogar Native Forest.
- US-064 — Receber missão principal narrativa.
- US-065 — Acompanhar progresso de missão.
- US-066 — Receber recompensas de missão.
- TS-002 — Criar sistema genérico de requisitos.

## Tasks

| Status | ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|---|
| [x] | DG-S03-001 | Tech | Criar sistema genérico de requisitos. | Validação de level, batalhas, boss, missão, localização e recursos. | G |
| [x] | DG-S03-002 | Data | Criar catálogo das 3 localizações iniciais. | Village of Beginnings, File Forest e Native Forest. | M |
| [x] | DG-S03-003 | Gameplay | Implementar seleção de localização. | Jogador pode trocar para localização desbloqueada. | M |
| [x] | DG-S03-004 | Gameplay | Implementar desbloqueio de localização. | Requisitos são validados automaticamente. | G |
| [x] | DG-S03-005 | UI | Criar tela/menu de mapa. | Localizações atual, bloqueadas e desbloqueadas. | M |
| [x] | DG-S03-006 | Data | Criar missões principais iniciais. | Missões com objetivo, texto e recompensa. | M |
| [x] | DG-S03-007 | Gameplay | Implementar progresso de missão por batalha. | Derrotas, drops e bosses atualizam objetivos. | G |
| [x] | DG-S03-008 | UI | Exibir missão ativa na tela principal. | Card compacto com progresso atual. | M |
| [x] | DG-S03-009 | Gameplay | Implementar resgate de recompensa de missão. | Recompensas aplicadas uma única vez. | M |
| [x] | DG-S03-010 | Gameplay | Implementar XP de treinador por batalha. | Trainer XP sobe ao vencer batalhas. | M |
| [x] | DG-S03-011 | Gameplay | Implementar level de treinador. | Level sobe ao atingir XP necessário. | M |
| [x] | DG-S03-012 | Gameplay | Implementar pontos de traits por trainer level. | Pontos acumulam no save. | M |
| [x] | DG-S03-013 | Data | Criar árvore inicial de traits. | Ramos Combat, Bond, Hatching, Explorer e Island. | G |
| [x] | DG-S03-014 | UI | Criar menu de traits separado. | Traits exibidas fora da tela principal. | G |
| [x] | DG-S03-015 | Gameplay | Implementar desbloqueio de trait com dependências. | Buffs passam a modificar sistemas. | G |
| [x] | DG-S03-016 | QA | Validar progressão da primeira localização até a terceira. | Jogador entende objetivo e desbloqueios. | M |

## Checklist de tasks

- [x] **DG-S03-001** (Tech, G) — Criar sistema genérico de requisitos.
- [x] **DG-S03-002** (Data, M) — Criar catálogo das 3 localizações iniciais.
- [x] **DG-S03-003** (Gameplay, M) — Implementar seleção de localização.
- [x] **DG-S03-004** (Gameplay, G) — Implementar desbloqueio de localização.
- [x] **DG-S03-005** (UI, M) — Criar tela/menu de mapa.
- [x] **DG-S03-006** (Data, M) — Criar missões principais iniciais.
- [x] **DG-S03-007** (Gameplay, G) — Implementar progresso de missão por batalha.
- [x] **DG-S03-008** (UI, M) — Exibir missão ativa na tela principal.
- [x] **DG-S03-009** (Gameplay, M) — Implementar resgate de recompensa de missão.
- [x] **DG-S03-010** (Gameplay, M) — Implementar XP de treinador por batalha.
- [x] **DG-S03-011** (Gameplay, M) — Implementar level de treinador.
- [x] **DG-S03-012** (Gameplay, M) — Implementar pontos de traits por trainer level.
- [x] **DG-S03-013** (Data, G) — Criar árvore inicial de traits.
- [x] **DG-S03-014** (UI, G) — Criar menu de traits separado.
- [x] **DG-S03-015** (Gameplay, G) — Implementar desbloqueio de trait com dependências.
- [x] **DG-S03-016** (QA, M) — Validar progressão da primeira localização até a terceira.

## Critério de saída da sprint

- O jogador possui mapa inicial.
- Há pelo menos uma linha de missão narrativa guiando o progresso.
- Trainer XP, trainer level e traits funcionam.
- As primeiras localizações podem ser desbloqueadas por requisitos.

---

> Ao concluir a sprint, gere o arquivo `EXECUCAO.md` nesta pasta documentando tudo o que foi feito.

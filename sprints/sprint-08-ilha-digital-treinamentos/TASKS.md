# Sprint 8 — Ilha Digital, treinamentos e ações temporizadas

**Documento base:** `digiclicker_sprint_planning.md`

## Objetivo

Transformar a Ilha Digital em um sistema útil, com slots, treinos por tempo real, amizade, XP por tipo, status, busca por itens e missões automáticas iniciais.

## User stories relacionadas

- US-042 — Enviar Digimon para treinamento de status.
- US-043 — Enviar Digimon para treinamento de amizade.
- US-044 — Enviar Digimon para treinamento de XP por tipo.
- US-045 — Enviar Digimon para busca por itens.
- US-046 — Enviar Digimon para missões automáticas.
- US-047 — Respeitar 3 slots por tipo de treinamento.
- US-072 — Usar chip de treino.

## Tasks

| Status | ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|---|
| [ ] | DG-S08-001 | Gameplay | Criar modelo de ação temporizada da Ilha. | Ação com início, fim, tipo, Digimon e recompensa. | G |
| [ ] | DG-S08-002 | Gameplay | Implementar slots por tipo de ação. | 3 slots para cada tipo inicial. | G |
| [ ] | DG-S08-003 | UI | Criar painel de ações da Ilha Digital. | Tabs ou seções para treinos e atividades. | G |
| [ ] | DG-S08-004 | Gameplay | Implementar treino de status. | Digimon recebe ganho configurado ao concluir. | G |
| [ ] | DG-S08-005 | Gameplay | Implementar treino de amizade. | Amizade aumenta lentamente ao concluir. | M |
| [ ] | DG-S08-006 | Gameplay | Implementar treino de XP por tipo. | Jogador escolhe tipo de XP e Digimon recebe ao concluir. | G |
| [ ] | DG-S08-007 | Gameplay | Implementar busca por itens. | Recompensa sorteada por tabela ao concluir. | M |
| [ ] | DG-S08-008 | Gameplay | Implementar missão automática simples. | Missão valida requisito e entrega recompensa. | G |
| [ ] | DG-S08-009 | Gameplay | Bloquear Digimon em ação. | Digimon ocupado não pode ir para time, evoluir ou iniciar outra ação. | M |
| [ ] | DG-S08-010 | UI | Exibir timers e progresso das ações. | Tempo restante visível. | M |
| [ ] | DG-S08-011 | UI | Implementar coleta de ação finalizada. | Jogador coleta resultado e libera slot. | M |
| [ ] | DG-S08-012 | Gameplay | Implementar chip de treino simples. | Reduz tempo ou melhora resultado de um treino. | M |
| [ ] | DG-S08-013 | QA | Validar ações com jogo fechado/aberto. | Timers devem funcionar por timestamp, não apenas intervalo em memória. | G |

## Checklist de tasks

- [ ] **DG-S08-001** (Gameplay, G) — Criar modelo de ação temporizada da Ilha.
- [ ] **DG-S08-002** (Gameplay, G) — Implementar slots por tipo de ação.
- [ ] **DG-S08-003** (UI, G) — Criar painel de ações da Ilha Digital.
- [ ] **DG-S08-004** (Gameplay, G) — Implementar treino de status.
- [ ] **DG-S08-005** (Gameplay, M) — Implementar treino de amizade.
- [ ] **DG-S08-006** (Gameplay, G) — Implementar treino de XP por tipo.
- [ ] **DG-S08-007** (Gameplay, M) — Implementar busca por itens.
- [ ] **DG-S08-008** (Gameplay, G) — Implementar missão automática simples.
- [ ] **DG-S08-009** (Gameplay, M) — Bloquear Digimon em ação.
- [ ] **DG-S08-010** (UI, M) — Exibir timers e progresso das ações.
- [ ] **DG-S08-011** (UI, M) — Implementar coleta de ação finalizada.
- [ ] **DG-S08-012** (Gameplay, M) — Implementar chip de treino simples.
- [ ] **DG-S08-013** (QA, G) — Validar ações com jogo fechado/aberto.

## Critério de saída da sprint

- A Ilha Digital deixa de ser apenas storage.
- O jogador consegue treinar Digimons fora do time.
- Slots criam escolha real.
- XP por tipo e amizade têm fonte alternativa.
- A base para progresso offline e ações temporizadas fica pronta.

---

> Ao concluir a sprint, gere o arquivo `EXECUCAO.md` nesta pasta documentando tudo o que foi feito.

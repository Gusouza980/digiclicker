# Sprint 2 — MP, especial, recompensas e feedback de progresso

**Documento base:** `digiclicker_sprint_planning.md`

## Objetivo

Transformar o combate mínimo em um loop mais satisfatório, adicionando MP, especial, recompensas, bits, XP básico e feedback visual.

## User stories relacionadas

- US-009 — Receber feedback de ação importante.
- US-023 — Carregar MP por ataque automático.
- US-024 — Usar especial do Digimon.
- US-028 — Receber recompensas ao vencer batalha.
- US-032 — Ganhar bits.
- TS-003 — Criar sistema genérico de recompensas.
- TS-004 — Parametrizar balanceamento.

## Tasks

| Status | ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|---|
| [x] | DG-S02-001 | Gameplay | Implementar MP iniciando em 0 a cada batalha. | MP resetado corretamente no início do combate. | P |
| [x] | DG-S02-002 | Gameplay | Implementar ganho de 5% de MP por ataque automático. | MP aumenta quando o Digimon ataca. | M |
| [x] | DG-S02-003 | Gameplay | Implementar estado de especial disponível. | Botão fica ativo ao chegar em 100% de MP. | M |
| [x] | DG-S02-004 | Gameplay | Implementar dano do especial. | Especial causa `max(ATK, INT) * 2`. | M |
| [x] | DG-S02-005 | Gameplay | Resetar MP após uso do especial. | MP volta a 0 após ativação. | P |
| [x] | DG-S02-006 | UI | Criar botão de especial por Digimon. | Botões com estado carregando/disponível. | M |
| [x] | DG-S02-007 | UI | Criar feedback visual para especial. | Diferenciar visualmente dano comum e especial. | M |
| [x] | DG-S02-008 | Tech | Criar sistema genérico de recompensas. | Função capaz de aplicar bits, XP, itens e drops. | G |
| [x] | DG-S02-009 | Gameplay | Implementar bits por vitória. | Saldo de bits aumenta ao vencer. | M |
| [x] | DG-S02-010 | Gameplay | Implementar XP básico de Digimon. | Digimons vivos recebem XP configurado. | M |
| [x] | DG-S02-011 | Data | Parametrizar recompensas por inimigo/localização. | Drops e bits vindos de catálogo. | M |
| [x] | DG-S02-012 | UI | Exibir drops/recompensas recentes. | Lista compacta na tela principal. | M |
| [x] | DG-S02-013 | UI | Exibir level up de Digimon. | Feedback quando um Digimon sobe de level. | M |
| [x] | DG-S02-014 | QA | Validar ritmo do combate. | Ajustar HP, dano, SPD e recompensas iniciais. | M |

## Checklist de tasks

- [x] **DG-S02-001** (Gameplay, P) — Implementar MP iniciando em 0 a cada batalha.
- [x] **DG-S02-002** (Gameplay, M) — Implementar ganho de 5% de MP por ataque automático.
- [x] **DG-S02-003** (Gameplay, M) — Implementar estado de especial disponível.
- [x] **DG-S02-004** (Gameplay, M) — Implementar dano do especial.
- [x] **DG-S02-005** (Gameplay, P) — Resetar MP após uso do especial.
- [x] **DG-S02-006** (UI, M) — Criar botão de especial por Digimon.
- [x] **DG-S02-007** (UI, M) — Criar feedback visual para especial.
- [x] **DG-S02-008** (Tech, G) — Criar sistema genérico de recompensas.
- [x] **DG-S02-009** (Gameplay, M) — Implementar bits por vitória.
- [x] **DG-S02-010** (Gameplay, M) — Implementar XP básico de Digimon.
- [x] **DG-S02-011** (Data, M) — Parametrizar recompensas por inimigo/localização.
- [x] **DG-S02-012** (UI, M) — Exibir drops/recompensas recentes.
- [x] **DG-S02-013** (UI, M) — Exibir level up de Digimon.
- [x] **DG-S02-014** (QA, M) — Validar ritmo do combate.

## Critério de saída da sprint

- O especial está funcional.
- O jogador recebe bits e XP ao vencer.
- Recompensas aparecem na interface.
- O loop de combate já começa a gerar sensação de progresso.

---

> Ao concluir a sprint, gere o arquivo `EXECUCAO.md` nesta pasta documentando tudo o que foi feito.

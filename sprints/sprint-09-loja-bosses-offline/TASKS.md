# Sprint 9 — Loja, itens utilizáveis, bosses, attribute/element e offline progress

**Documento base:** `digiclicker_sprint_planning.md`

## Objetivo

Completar os sistemas que tornam o MVP mais redondo: loja inicial, uso de itens, bosses, vantagem de atributo/elemento, auto-progress e progresso offline limitado.

## User stories relacionadas

- US-025 — Aplicar vantagem de attribute e element.
- US-026 — Enfrentar boss de localização.
- US-027 — Ativar progressão automática.
- US-033 — Vender itens.
- US-058 — Resetar traits com item.
- US-069 — Acessar loja em cidade/localização.
- US-070 — Comprar item de amizade.
- US-071 — Usar boost de XP.
- US-073 — Calcular progresso offline limitado.
- US-074 — Exibir resumo de progresso offline.

## Tasks

| Status | ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|---|
| [ ] | DG-S09-001 | Data | Definir matriz inicial de attribute/element. | Multiplicadores de vantagem e resistência. | G |
| [ ] | DG-S09-002 | Gameplay | Aplicar attribute/element no cálculo de dano. | Dano final considera vantagem/desvantagem. | G |
| [ ] | DG-S09-003 | UI | Exibir indicação de vantagem/desvantagem. | Feedback visual simples em batalha ou detalhe. | M |
| [ ] | DG-S09-004 | Data | Criar bosses das 3 localizações. | Bosses com stats, drops e requisito de desafio. | M |
| [ ] | DG-S09-005 | Gameplay | Implementar desafio de boss. | Boss aparece conforme requisito da localização. | G |
| [ ] | DG-S09-006 | Gameplay | Registrar boss derrotado. | Progresso salvo e usado para desbloqueios. | M |
| [ ] | DG-S09-007 | Gameplay | Implementar auto-progress. | Avança para próxima localização elegível. | G |
| [ ] | DG-S09-008 | Gameplay | Pausar auto-progress em derrota. | Perda interrompe avanço automático. | M |
| [ ] | DG-S09-009 | Data | Criar catálogo da primeira loja. | Itens, preços e requisitos da loja. | M |
| [ ] | DG-S09-010 | UI | Criar interface de loja. | Comprar itens com bits. | G |
| [ ] | DG-S09-011 | Gameplay | Implementar compra de item. | Bits são consumidos e item entra no inventário. | M |
| [ ] | DG-S09-012 | Gameplay | Implementar venda de item permitido. | Item reduz e bits aumentam. | M |
| [ ] | DG-S09-013 | Gameplay | Implementar item de amizade. | Aumenta amizade respeitando limite. | M |
| [ ] | DG-S09-014 | Gameplay | Implementar boost de XP simples. | Buff temporário ou por quantidade. | M |
| [ ] | DG-S09-015 | Gameplay | Implementar Trait Reset Core. | Reseta traits e devolve pontos. | M |
| [ ] | DG-S09-016 | Gameplay | Implementar cálculo offline limitado. | Ganhos baseados em tempo ausente, limite e penalidade. | G |
| [ ] | DG-S09-017 | UI | Exibir resumo offline ao retornar. | Bits, XP e drops em resumo. | M |
| [ ] | DG-S09-018 | QA | Validar economia e risco de inflação. | Checar ganhos, preços e ritmo inicial. | G |

## Checklist de tasks

- [ ] **DG-S09-001** (Data, G) — Definir matriz inicial de attribute/element.
- [ ] **DG-S09-002** (Gameplay, G) — Aplicar attribute/element no cálculo de dano.
- [ ] **DG-S09-003** (UI, M) — Exibir indicação de vantagem/desvantagem.
- [ ] **DG-S09-004** (Data, M) — Criar bosses das 3 localizações.
- [ ] **DG-S09-005** (Gameplay, G) — Implementar desafio de boss.
- [ ] **DG-S09-006** (Gameplay, M) — Registrar boss derrotado.
- [ ] **DG-S09-007** (Gameplay, G) — Implementar auto-progress.
- [ ] **DG-S09-008** (Gameplay, M) — Pausar auto-progress em derrota.
- [ ] **DG-S09-009** (Data, M) — Criar catálogo da primeira loja.
- [ ] **DG-S09-010** (UI, G) — Criar interface de loja.
- [ ] **DG-S09-011** (Gameplay, M) — Implementar compra de item.
- [ ] **DG-S09-012** (Gameplay, M) — Implementar venda de item permitido.
- [ ] **DG-S09-013** (Gameplay, M) — Implementar item de amizade.
- [ ] **DG-S09-014** (Gameplay, M) — Implementar boost de XP simples.
- [ ] **DG-S09-015** (Gameplay, M) — Implementar Trait Reset Core.
- [ ] **DG-S09-016** (Gameplay, G) — Implementar cálculo offline limitado.
- [ ] **DG-S09-017** (UI, M) — Exibir resumo offline ao retornar.
- [ ] **DG-S09-018** (QA, G) — Validar economia e risco de inflação.

## Critério de saída da sprint

- O MVP tem loja inicial.
- Itens podem ser usados.
- Bosses criam marcos de progressão.
- Attribute/element influencia combate.
- Offline progress existe com limite.
- O jogo está praticamente completo em sistemas.

---

> Ao concluir a sprint, gere o arquivo `EXECUCAO.md` nesta pasta documentando tudo o que foi feito.

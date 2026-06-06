# Sprint 12 — Validação server-side e integridade online

**Documento base:** `digiclicker_sprint_planning.md`

## Objetivo

Mover ações sensíveis para validação no servidor, protegendo hatching, drops raros, compras, evolução e recompensas importantes.

## User stories relacionadas

- US-078 — Salvar eventos consolidados no backend.
- US-079 — Validar RNG sensível no servidor.
- US-080 — Persistir dados online em PostgreSQL.
- US-081 — Aplicar rate limit em ações sensíveis.
- US-082 — Usar Redis para cache e locks.

## Tasks

| Status | ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|---|
| [ ] | DG-S12-001 | Online | Definir contrato de eventos consolidados. | Battle result, hatch attempt, scan, evolve, train, shop, mission claim. | G |
| [ ] | DG-S12-002 | Online | Criar validação server-side de scan. | Scan online calcula resultado oficialmente. | G |
| [ ] | DG-S12-003 | Online | Criar validação server-side de hatching. | Sucesso/falha/quebra calculados no backend. | GG |
| [ ] | DG-S12-004 | Online | Criar validação server-side de compra/venda. | Bits e inventário alterados em transação. | G |
| [ ] | DG-S12-005 | Online | Criar validação server-side de evolução/degeneração. | Requisitos e cumulative validados no backend. | GG |
| [ ] | DG-S12-006 | Online | Criar validação server-side de recompensa de batalha. | Backend valida recompensas consolidadas. | GG |
| [ ] | DG-S12-007 | Online | Criar tabela/log de eventos importantes. | Histórico para auditoria leve. | M |
| [ ] | DG-S12-008 | Online | Configurar Redis para rate limit. | Limites básicos por usuário/ação. | M |
| [ ] | DG-S12-009 | Online | Implementar locks para ações críticas. | Evitar duplicação por double submit. | G |
| [ ] | DG-S12-010 | UI | Adaptar frontend para receber resultado oficial. | Cliente mostra feedback após resposta do backend. | G |
| [ ] | DG-S12-011 | QA | Testar duplicação de requests. | Não duplicar itens, bits, eggs ou recompensas. | G |
| [ ] | DG-S12-012 | QA | Testar manipulação óbvia de payload. | Backend não aceita valores não validados. | G |

## Checklist de tasks

- [ ] **DG-S12-001** (Online, G) — Definir contrato de eventos consolidados.
- [ ] **DG-S12-002** (Online, G) — Criar validação server-side de scan.
- [ ] **DG-S12-003** (Online, GG) — Criar validação server-side de hatching.
- [ ] **DG-S12-004** (Online, G) — Criar validação server-side de compra/venda.
- [ ] **DG-S12-005** (Online, GG) — Criar validação server-side de evolução/degeneração.
- [ ] **DG-S12-006** (Online, GG) — Criar validação server-side de recompensa de batalha.
- [ ] **DG-S12-007** (Online, M) — Criar tabela/log de eventos importantes.
- [ ] **DG-S12-008** (Online, M) — Configurar Redis para rate limit.
- [ ] **DG-S12-009** (Online, G) — Implementar locks para ações críticas.
- [ ] **DG-S12-010** (UI, G) — Adaptar frontend para receber resultado oficial.
- [ ] **DG-S12-011** (QA, G) — Testar duplicação de requests.
- [ ] **DG-S12-012** (QA, G) — Testar manipulação óbvia de payload.

## Critério de saída da sprint

- RNG sensível fica no backend.
- Ações críticas são transacionais.
- Não é possível duplicar recompensas por repetição simples.
- O frontend mantém sensação imediata sem comprometer integridade.

---

> Ao concluir a sprint, gere o arquivo `EXECUCAO.md` nesta pasta documentando tudo o que foi feito.

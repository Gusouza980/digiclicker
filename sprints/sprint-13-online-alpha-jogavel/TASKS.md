# Sprint 13 — Online Alpha jogável

**Documento base:** `digiclicker_sprint_planning.md`

## Objetivo

Fechar uma versão online jogável com cloud save, backend validando ações importantes, migração local e fluxo estável.

## User stories relacionadas

- US-075 a US-082.
- Preparação para US-067, US-068 e US-088.

## Tasks

| Status | ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|---|
| [ ] | DG-S13-001 | Online | Revisar schema online após uso real. | Ajustar tabelas antes de expandir. | G |
| [ ] | DG-S13-002 | Online | Criar sincronização incremental de save. | Evitar salvar estado inteiro o tempo todo. | G |
| [ ] | DG-S13-003 | Online | Criar endpoint de resumo de conta. | Trainer level, time, localização e recursos principais. | M |
| [ ] | DG-S13-004 | Online | Implementar fallback seguro para falha de rede. | UI informa erro e evita perda de ação. | G |
| [ ] | DG-S13-005 | UI | Criar indicador online/sincronizando. | Jogador entende estado do cloud save. | M |
| [ ] | DG-S13-006 | QA | Testar jogar em dois dispositivos. | Save online carrega corretamente. | G |
| [ ] | DG-S13-007 | QA | Testar conflito entre abas/dispositivos. | Definir comportamento seguro. | G |
| [ ] | DG-S13-008 | QA | Testar migração local → online em cenários diferentes. | Sem perda silenciosa de progresso. | G |
| [ ] | DG-S13-009 | Setup | Configurar CI/CD básico. | Deploy automatizado para frontend e backend. | G |
| [ ] | DG-S13-010 | QA | Release interno da Online Alpha. | Build privado pronto para teste. | M |

## Checklist de tasks

- [ ] **DG-S13-001** (Online, G) — Revisar schema online após uso real.
- [ ] **DG-S13-002** (Online, G) — Criar sincronização incremental de save.
- [ ] **DG-S13-003** (Online, M) — Criar endpoint de resumo de conta.
- [ ] **DG-S13-004** (Online, G) — Implementar fallback seguro para falha de rede.
- [ ] **DG-S13-005** (UI, M) — Criar indicador online/sincronizando.
- [ ] **DG-S13-006** (QA, G) — Testar jogar em dois dispositivos.
- [ ] **DG-S13-007** (QA, G) — Testar conflito entre abas/dispositivos.
- [ ] **DG-S13-008** (QA, G) — Testar migração local → online em cenários diferentes.
- [ ] **DG-S13-009** (Setup, G) — Configurar CI/CD básico.
- [ ] **DG-S13-010** (QA, M) — Release interno da Online Alpha.

## Critério de saída da sprint

- Existe uma Online Alpha jogável.
- Login e cloud save estão funcionais.
- PostgreSQL persiste progresso.
- Backend valida ações sensíveis.
- CI/CD básico está configurado.

---

> Ao concluir a sprint, gere o arquivo `EXECUCAO.md` nesta pasta documentando tudo o que foi feito.

# Sprint 11 — Preparação da Online Alpha

**Documento base:** `digiclicker_sprint_planning.md`

## Objetivo

Iniciar a versão online sem reescrever o MVP: backend, banco, autenticação, estrutura do cloud save e deploy separado.

## User stories relacionadas

- US-075 — Criar conta.
- US-076 — Fazer login.
- US-077 — Migrar save local para cloud save.
- US-080 — Persistir dados online em PostgreSQL.
- TS-005 — Preparar arquitetura para versão online.

## Tasks

| Status | ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|---|
| [ ] | DG-S11-001 | Online | Definir arquitetura da Online Alpha. | Decisão entre NestJS/API Node, Prisma/Drizzle e provedor de banco. | M |
| [ ] | DG-S11-002 | Online | Criar projeto backend. | API inicial separada do frontend. | M |
| [ ] | DG-S11-003 | Online | Configurar PostgreSQL. | Banco criado com ambiente local/dev. | M |
| [ ] | DG-S11-004 | Online | Configurar ORM/query builder. | Prisma ou Drizzle funcionando. | M |
| [ ] | DG-S11-005 | Online | Modelar tabelas principais. | Users, saves, player_digimons, inventory, eggs, missions, traits, known_forms, events. | GG |
| [ ] | DG-S11-006 | Online | Criar autenticação básica. | Criar conta e login. | G |
| [ ] | DG-S11-007 | Online | Criar endpoint de carregar cloud save. | Retorna save online consolidado. | G |
| [ ] | DG-S11-008 | Online | Criar endpoint de persistir cloud save. | Persiste estado validado inicial. | G |
| [ ] | DG-S11-009 | Online | Criar estratégia de migração local → online. | Usuário escolhe migrar save local. | G |
| [ ] | DG-S11-010 | UI | Criar tela de login/cadastro. | Fluxo acessível antes de carregar cloud save. | G |
| [ ] | DG-S11-011 | UI | Criar opção de migrar save local. | Confirmação e aviso de conflito. | M |
| [ ] | DG-S11-012 | Setup | Configurar deploy do backend. | Ambiente separado do frontend. | M |
| [ ] | DG-S11-013 | QA | Validar fluxo conta → cloud save. | Criar conta, logar, salvar, sair e voltar. | G |

## Checklist de tasks

- [ ] **DG-S11-001** (Online, M) — Definir arquitetura da Online Alpha.
- [ ] **DG-S11-002** (Online, M) — Criar projeto backend.
- [ ] **DG-S11-003** (Online, M) — Configurar PostgreSQL.
- [ ] **DG-S11-004** (Online, M) — Configurar ORM/query builder.
- [ ] **DG-S11-005** (Online, GG) — Modelar tabelas principais.
- [ ] **DG-S11-006** (Online, G) — Criar autenticação básica.
- [ ] **DG-S11-007** (Online, G) — Criar endpoint de carregar cloud save.
- [ ] **DG-S11-008** (Online, G) — Criar endpoint de persistir cloud save.
- [ ] **DG-S11-009** (Online, G) — Criar estratégia de migração local → online.
- [ ] **DG-S11-010** (UI, G) — Criar tela de login/cadastro.
- [ ] **DG-S11-011** (UI, M) — Criar opção de migrar save local.
- [ ] **DG-S11-012** (Setup, M) — Configurar deploy do backend.
- [ ] **DG-S11-013** (QA, G) — Validar fluxo conta → cloud save.

## Critério de saída da sprint

- O jogador consegue criar conta.
- O jogador consegue fazer login.
- Existe cloud save inicial.
- PostgreSQL armazena os dados principais.
- O save local pode começar a ser migrado.

---

> Ao concluir a sprint, gere o arquivo `EXECUCAO.md` nesta pasta documentando tudo o que foi feito.

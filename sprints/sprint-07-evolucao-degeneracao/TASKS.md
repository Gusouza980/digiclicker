# Sprint 7 — Evolução, degeneração, requisitos e formas conhecidas

**Documento base:** `digiclicker_sprint_planning.md`

## Objetivo

Implementar a principal identidade Digimon do jogo: evolução em árvore, degeneração, requisitos, formas conhecidas globais e cálculo de status cumulativo.

## User stories relacionadas

- US-048 — Visualizar árvore evolutiva.
- US-049 — Evoluir Digimon quando requisitos forem cumpridos.
- US-050 — Degenerar Digimon para forma conhecida.
- US-051 — Registrar formas conhecidas globalmente.
- US-052 — Calcular status cumulativo por amizade.
- US-053 — Validar múltiplos tipos de requisito evolutivo.
- TS-002 — Criar sistema genérico de requisitos.

## Tasks

| Status | ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|---|
| [x] | DG-S07-001 | Data | Criar catálogo de árvores evolutivas do MVP. | Relações entre Baby, Rookie, Champion, Ultimate, Mega 1. | GG |
| [x] | DG-S07-002 | Data | Definir requisitos iniciais por evolução. | Level, stats, amizade, XP por tipo, missão ou boss. | GG |
| [x] | DG-S07-003 | Gameplay | Implementar registro de formas conhecidas globais. | Forma obtida fica marcada na conta/save. | G |
| [x] | DG-S07-004 | UI | Criar visualização básica da árvore evolutiva. | Formas disponíveis, bloqueadas e conhecidas. | GG |
| [x] | DG-S07-005 | Gameplay | Validar requisitos de evolução. | Sistema informa se pode evoluir e o que falta. | G |
| [x] | DG-S07-006 | Gameplay | Implementar evolução. | Muda forma, reseta level, mantém amizade/personality, remove XP por tipo. | G |
| [x] | DG-S07-007 | Gameplay | Implementar cálculo de cumulative por amizade. | Percentuais 0%, 5%, 8%, 10%, limite 9999 por stat. | G |
| [x] | DG-S07-008 | Gameplay | Registrar forma obtida após evolução. | Nova forma entra em known forms. | M |
| [x] | DG-S07-009 | Gameplay | Implementar degeneração para forma conhecida. | Jogador escolhe destino elegível. | G |
| [x] | DG-S07-010 | UI | Exibir prévia de evolução/degeneração. | Mostrar requisitos, mudança de forma e ganho cumulative estimado. | M |
| [x] | DG-S07-011 | Gameplay | Remover XP por tipo ao evoluir/degenerar. | XP por tipo zera conforme regra. | M |
| [x] | DG-S07-012 | QA | Validar ciclo evoluir → degenerar → evoluir. | Confirmar que loop estratégico funciona. | G |

## Checklist de tasks

- [x] **DG-S07-001** (Data, GG) — Criar catálogo de árvores evolutivas do MVP.
- [x] **DG-S07-002** (Data, GG) — Definir requisitos iniciais por evolução.
- [x] **DG-S07-003** (Gameplay, G) — Implementar registro de formas conhecidas globais.
- [x] **DG-S07-004** (UI, GG) — Criar visualização básica da árvore evolutiva.
- [x] **DG-S07-005** (Gameplay, G) — Validar requisitos de evolução.
- [x] **DG-S07-006** (Gameplay, G) — Implementar evolução.
- [x] **DG-S07-007** (Gameplay, G) — Implementar cálculo de cumulative por amizade.
- [x] **DG-S07-008** (Gameplay, M) — Registrar forma obtida após evolução.
- [x] **DG-S07-009** (Gameplay, G) — Implementar degeneração para forma conhecida.
- [x] **DG-S07-010** (UI, G) — Exibir prévia de evolução/degeneração.
- [x] **DG-S07-011** (Gameplay, M) — Remover XP por tipo ao evoluir/degenerar.
- [x] **DG-S07-012** (QA, G) — Validar ciclo evoluir → degenerar → evoluir.

## Critério de saída da sprint

- O jogador consegue evoluir.
- O jogador consegue degenerar para formas conhecidas.
- Cumulative stat é calculado corretamente.
- A árvore evolutiva mostra caminhos e requisitos.
- O jogo começa a entregar a identidade principal de Digimon.

---

> Ao concluir a sprint, gere o arquivo `EXECUCAO.md` nesta pasta documentando tudo o que foi feito.

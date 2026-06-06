# Sprint 5 — Scanner e hatching

**Documento base:** `digiclicker_sprint_planning.md`

## Objetivo

Implementar o sistema de ovos com scan, inserção de Essence, falha, quebra, qualidade 3/5, 4/5 e 5/5, bônus de status base e personality ao chocar.

## User stories relacionadas

- US-034 — Escanear egg com bits.
- US-035 — Inserir Essence no egg.
- US-036 — Resolver sucesso, falha e quebra na inserção.
- US-037 — Manter egg intacto em falha.
- US-038 — Perder egg em quebra.
- US-039 — Chocar egg com 3/5, 4/5 ou 5/5.
- US-040 — Definir personality ao chocar.
- US-041 — Usar item de proteção de egg.

## Tasks

| Status | ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|---|
| [x] | DG-S05-001 | Data | Definir tabela de scan por tipo/raridade. | Cada egg pode revelar Digimon compatível. | G |
| [x] | DG-S05-002 | Data | Definir custo de scan em bits. | Custo parametrizado por raridade. | M |
| [x] | DG-S05-003 | Gameplay | Implementar ação de scan. | Bits são consumidos e Digimon contido é revelado. | G |
| [x] | DG-S05-004 | UI | Criar tela/modal de scanner. | Jogador seleciona egg, vê custo e confirma scan. | G |
| [x] | DG-S05-005 | Data | Definir custo de Essence por inserção. | Custo parametrizado por tipo, raridade ou Digimon. | G |
| [x] | DG-S05-006 | Gameplay | Implementar tentativa de inserção. | Essence é consumida e resultado é sorteado. | G |
| [x] | DG-S05-007 | Gameplay | Implementar chances por número de inserção. | 1ª até 5ª inserção com chances corretas. | M |
| [x] | DG-S05-008 | Gameplay | Implementar falha preservando egg. | Falha perde apenas Essence da tentativa. | M |
| [x] | DG-S05-009 | Gameplay | Implementar quebra destruindo egg. | Egg é removido do inventário. | M |
| [x] | DG-S05-010 | Gameplay | Implementar hatching após 3 inserções. | Jogador pode chocar a partir de 3/5. | G |
| [x] | DG-S05-011 | Gameplay | Implementar bônus 4/5 e 5/5. | Bônus de status base aplicado ao Digimon nascido. | M |
| [x] | DG-S05-012 | Gameplay | Sortear personality ao chocar. | Digimon nasce com personality fixa. | M |
| [x] | DG-S05-013 | Gameplay | Enviar Digimon chocado para time ou Ilha. | Respeitar limite de 3 no time e 50 na Ilha. | G |
| [x] | DG-S05-014 | UI | Exibir risco da próxima inserção. | Interface mostra chance de sucesso, falha e quebra. | M |
| [x] | DG-S05-015 | UI | Criar feedback de sucesso/falha/quebra/hatch. | Jogador entende claramente o resultado. | M |
| [x] | DG-S05-016 | Gameplay | Implementar item inicial de proteção de egg, se entrar no MVP. | Hatch Stabilizer ou Backup de Egg com efeito simples. | M |
| [x] | DG-S05-017 | QA | Playtestar sensação de risco/recompensa. | Verificar tensão real entre parar no 3/5 e arriscar. | M |

## Checklist de tasks

- [x] **DG-S05-001** (Data, G) — Definir tabela de scan por tipo/raridade.
- [x] **DG-S05-002** (Data, M) — Definir custo de scan em bits.
- [x] **DG-S05-003** (Gameplay, G) — Implementar ação de scan.
- [x] **DG-S05-004** (UI, G) — Criar tela/modal de scanner.
- [x] **DG-S05-005** (Data, G) — Definir custo de Essence por inserção.
- [x] **DG-S05-006** (Gameplay, G) — Implementar tentativa de inserção.
- [x] **DG-S05-007** (Gameplay, M) — Implementar chances por número de inserção.
- [x] **DG-S05-008** (Gameplay, M) — Implementar falha preservando egg.
- [x] **DG-S05-009** (Gameplay, M) — Implementar quebra destruindo egg.
- [x] **DG-S05-010** (Gameplay, G) — Implementar hatching após 3 inserções.
- [x] **DG-S05-011** (Gameplay, M) — Implementar bônus 4/5 e 5/5.
- [x] **DG-S05-012** (Gameplay, M) — Sortear personality ao chocar.
- [x] **DG-S05-013** (Gameplay, M) — Enviar Digimon chocado para time ou Ilha.
- [x] **DG-S05-014** (UI, M) — Exibir risco da próxima inserção.
- [x] **DG-S05-015** (UI, M) — Criar feedback de sucesso/falha/quebra/hatch.
- [x] **DG-S05-016** (Gameplay, M) — Implementar item inicial de proteção de egg, se entrar no MVP.
- [x] **DG-S05-017** (QA, M) — Playtestar sensação de risco/recompensa.

## Critério de saída da sprint

- O jogador consegue escanear eggs.
- O jogador consegue inserir Essence.
- Falha e quebra funcionam corretamente.
- O jogador consegue chocar Digimons 3/5, 4/5 e 5/5.
- O sistema já gera tensão de risco/recompensa.

---

> Ao concluir a sprint, gere o arquivo `EXECUCAO.md` nesta pasta documentando tudo o que foi feito.

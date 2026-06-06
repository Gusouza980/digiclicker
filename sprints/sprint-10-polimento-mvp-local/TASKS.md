# Sprint 10 — Polimento, i18n, balanceamento e build do MVP local

**Documento base:** `digiclicker_sprint_planning.md`

## Objetivo

Fechar o MVP local com qualidade suficiente para playtest: UX mais limpa, textos traduzíveis, save versionado, conteúdo coerente, bugs críticos resolvidos e parâmetros calibrados.

## User stories relacionadas

- US-003 — Versionar o save local.
- US-004 — Selecionar idioma.
- US-008 — Acessar menus separados.
- US-009 — Receber feedback de ação importante.
- Todas as US P0/P1 do MVP local como regressão.
- TS-004 — Parametrizar balanceamento.
- TS-005 — Preparar arquitetura para versão online.

## Tasks

| Status | ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|---|
| [x] | DG-S10-001 | Save | Revisar schema final do save local. | Save estável e versionado. | G |
| [x] | DG-S10-002 | Save | Criar primeira migration real de save. | Estrutura preparada para mudanças futuras. | M |
| [x] | DG-S10-003 | UI | Revisar tela principal com foco em clareza. | Batalha, time, missão, drops, buffs e recursos visíveis sem poluição. | G |
| [x] | DG-S10-004 | UI | Separar menus densos. | Traits, inventário, storage, árvore e missões fora da tela principal. | G |
| [x] | DG-S10-005 | Data | Revisar chaves de tradução. | PT, EN e ES preparados com fallback. | G |
| [x] | DG-S10-006 | Data | Remover textos hardcoded visíveis. | UI e conteúdo usam i18n. | G |
| [x] | DG-S10-007 | QA | Playtestar início ao fim do MVP. | Novo save até Native Forest com hatching e evolução. | GG |
| [x] | DG-S10-008 | QA | Ajustar balanceamento de combate. | HP, dano, SPD, MP e XP calibrados. | G |
| [x] | DG-S10-009 | QA | Ajustar balanceamento de hatching. | Custo, drops, chances e bônus calibrados. | G |
| [x] | DG-S10-010 | QA | Ajustar balanceamento de amizade. | Amizade sobe devagar, mas não parece inútil. | G |
| [x] | DG-S10-011 | QA | Ajustar balanceamento da Ilha. | Treinos têm tempos e recompensas coerentes. | G |
| [x] | DG-S10-012 | QA | Ajustar economia. | Bits, preços, drops e recompensas coerentes. | G |
| [x] | DG-S10-013 | Tech | Isolar RNG sensível em camada própria. | Preparado para futura substituição por servidor. | M |
| [x] | DG-S10-014 | Tech | Modelar ações sensíveis como comandos/eventos. | Hatching, evolução, compra, missão e treino com comandos claros. | G |
| [x] | DG-S10-015 | Setup | Configurar build/deploy inicial na Vercel. | MVP local publicado de forma privada. | M |
| [x] | DG-S10-016 | QA | Criar checklist de release do MVP local. | Lista de validação para novos builds. | M |

## Checklist de tasks

- [x] **DG-S10-001** (Save, G) — Revisar schema final do save local.
- [x] **DG-S10-002** (Save, M) — Criar primeira migration real de save.
- [x] **DG-S10-003** (UI, G) — Revisar tela principal com foco em clareza.
- [x] **DG-S10-004** (UI, G) — Separar menus densos.
- [x] **DG-S10-005** (Data, G) — Revisar chaves de tradução.
- [x] **DG-S10-006** (Data, G) — Remover textos hardcoded visíveis.
- [x] **DG-S10-007** (QA, GG) — Playtestar início ao fim do MVP.
- [x] **DG-S10-008** (QA, G) — Ajustar balanceamento de combate.
- [x] **DG-S10-009** (QA, G) — Ajustar balanceamento de hatching.
- [x] **DG-S10-010** (QA, G) — Ajustar balanceamento de amizade.
- [x] **DG-S10-011** (QA, G) — Ajustar balanceamento da Ilha.
- [x] **DG-S10-012** (QA, G) — Ajustar economia.
- [x] **DG-S10-013** (Tech, M) — Isolar RNG sensível em camada própria.
- [x] **DG-S10-014** (Tech, G) — Modelar ações sensíveis como comandos/eventos.
- [x] **DG-S10-015** (Setup, M) — Configurar build/deploy inicial na Vercel.
- [x] **DG-S10-016** (QA, M) — Criar checklist de release do MVP local.

## Critério de saída da sprint

- O MVP local está jogável de ponta a ponta.
- O jogador entende o próximo objetivo.
- O combate é satisfatório.
- Hatching gera tensão.
- Evolução/degeneração tem valor estratégico.
- A Ilha Digital tem utilidade.
- O jogo está pronto para playtests mais sérios.

---

> Documentação de execução: `EXECUCAO.md`

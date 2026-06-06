# Digiclicker — Sprint Planning & Tasks

**Versão:** 1.0  
**Data:** 06/06/2026  
**Documentos base:** `digiclicker_briefing.md` e `digiclicker_user_stories.md`  
**Produto:** Digiclicker  
**Formato:** Fan game privado, web, idle + clicker  
**Objetivo deste documento:** transformar o briefing e o backlog de user stories em um planejamento de execução por sprints, com tasks acionáveis, dependências e critérios de saída.

---

## 1. Premissas do planejamento

Este planning foi estruturado para orientar o desenvolvimento incremental do **MVP local** primeiro, validando diversão antes de avançar para backend, login, PostgreSQL e sistemas online.

### Premissas de cadência

- Cada sprint foi planejada como um ciclo sugerido de **1 a 2 semanas**.
- A duração real pode ser ajustada conforme disponibilidade.
- O planejamento evita datas fixas para não depender de calendário.
- A ordem das sprints deve ser respeitada, pois muitos sistemas dependem do motor de batalha, save, catálogos, requisitos e recompensas.

### Premissas de escopo

O foco inicial é:

- Web app jogável.
- Save local.
- Batalha idle/clicker contínua.
- 3 Digimons no time.
- Primeiras localizações.
- Drops, bits, Essence e eggs.
- Scanner e hatching.
- Ilha Digital.
- Evolução/degeneração.
- Trainer level e traits.
- Missões narrativas.
- Loja inicial.
- UI moderna e objetiva.
- Estrutura preparada para PT, EN e ES.

A versão online, com login, cloud save, PostgreSQL, backend e validações sensíveis, entra apenas após o MVP local estar divertido.

---

## 2. Visão macro das fases

| Fase | Sprints | Objetivo |
|---|---:|---|
| Fase 0 — Preparação | Sprint 0 | Estruturar projeto, arquitetura base, catálogos e padrões. |
| Fase 1 — Protótipo jogável | Sprints 1 a 2 | Validar loop de batalha, clique, MP, especial, drops e feedback visual. |
| Fase 2 — MVP local | Sprints 3 a 8 | Validar progressão, mapa, traits, hatching, coleção, evolução, ilha, loja e offline. |
| Fase 3 — Polimento e balanceamento | Sprints 9 a 10 | Ajustar experiência, UI, conteúdo, ritmo, bugs e build final do MVP. |
| Fase 4 — Online Alpha | Sprints 11 a 13 | Login, cloud save, backend, PostgreSQL, Redis e validações sensíveis. |
| Fase 5 — Pós-MVP | Sprints 14+ | Missões recorrentes, eventos, rankings, Jogress, Armor, social e expansão. |

---

## 3. Convenção de tasks

### Identificação

As tasks seguem o padrão:

```txt
DG-[SPRINT]-[NÚMERO]
```

Exemplo:

```txt
DG-S01-004
```

### Tipo

| Tipo | Significado |
|---|---|
| Setup | Configuração inicial, arquitetura, tooling ou estrutura. |
| Gameplay | Regra jogável ou mecânica central. |
| UI | Interface, feedback visual e experiência. |
| Data | Catálogos, conteúdo, balanceamento e dados. |
| Save | Persistência local ou online. |
| Tech | Sistema técnico reutilizável. |
| QA | Validação manual, ajustes e critérios de aceitação. |
| Online | Backend, autenticação, PostgreSQL, Redis ou cloud save. |

### Tamanho sugerido

| Tamanho | Interpretação |
|---|---|
| P | Pequeno, tarefa pontual. |
| M | Médio, exige implementação e integração simples. |
| G | Grande, exige integração com vários módulos. |
| GG | Muito grande, deve ser quebrado se possível. |

---

# 4. Sprint 0 — Fundação técnica e arquitetura do MVP

## Objetivo

Criar a base do projeto para que o desenvolvimento das mecânicas não vire código acoplado e difícil de evoluir.

## User stories relacionadas

- US-001 — Iniciar o jogo no navegador.
- US-002 — Criar novo save local.
- US-003 — Versionar o save local.
- US-004 — Selecionar idioma.
- US-005 — Carregar catálogos versionados.
- TS-001 — Estruturar motor de batalha desacoplado da UI.
- TS-004 — Parametrizar balanceamento.
- TS-005 — Preparar arquitetura para versão online.

## Tasks

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S00-001 | Setup | Criar projeto Next.js com TypeScript. | Projeto inicial executando no navegador. | P |
| DG-S00-002 | Setup | Configurar estrutura de pastas do projeto. | Pastas separando `app`, `components`, `game`, `catalogs`, `stores`, `i18n`, `types` e `utils`. | M |
| DG-S00-003 | Setup | Configurar ESLint, Prettier e convenções básicas. | Padrão mínimo de código consistente. | P |
| DG-S00-004 | Setup | Configurar Zustand ou Redux Toolkit para estado global. | Store inicial disponível. | M |
| DG-S00-005 | Save | Criar contrato inicial do save local. | Interface/type do save com versão, jogador, time, inventário, localização, missões e configurações. | M |
| DG-S00-006 | Save | Implementar camada de LocalStorage ou IndexedDB. | Funções `loadSave`, `createSave`, `persistSave`, `resetSave`. | M |
| DG-S00-007 | Save | Implementar versionamento inicial do save. | Campo `saveVersion` e estrutura para futuras migrations. | M |
| DG-S00-008 | Data | Definir formato dos catálogos versionados. | Estrutura para Digimons, itens, localizações, missões, traits e configs. | M |
| DG-S00-009 | Data | Criar catálogo mínimo de configuração global. | Configs de battle tick, click damage, MP, XP e drops centralizadas. | M |
| DG-S00-010 | Data | Criar catálogo mínimo de traduções PT/EN/ES. | Sistema de chaves funcionando com idioma padrão. | M |
| DG-S00-011 | Tech | Criar camada de carregamento de catálogo. | Função para carregar dados por ID e evitar hardcode. | M |
| DG-S00-012 | Tech | Criar tipos globais do domínio. | Types de Digimon, stat, battle, item, inventory, location, mission, trait. | G |
| DG-S00-013 | UI | Criar layout base da aplicação. | Shell inicial com área principal, header, navegação e estado carregado. | M |
| DG-S00-014 | QA | Validar criação, persistência e reset do save. | Fluxo mínimo abrindo, salvando e recarregando. | P |

## Critério de saída da sprint

- O projeto abre no navegador.
- O jogo consegue criar e carregar um save local.
- Existe estrutura de catálogos versionados.
- Existe sistema básico de idioma.
- O projeto já está separado para não misturar lógica de jogo diretamente na UI.

---

# 5. Sprint 1 — Loop de batalha mínimo

## Objetivo

Criar o primeiro protótipo jogável: uma localização, 3 Digimons fixos, inimigos automáticos, clique, dano, HP, derrota e vitória.

## User stories relacionadas

- US-006 — Visualizar tela principal moderna.
- US-007 — Ver informações essenciais da batalha.
- US-010 — Visualizar Digimons do time ativo.
- US-013 — Calcular stats totais.
- US-016 — Iniciar batalha contínua na localização atual.
- US-017 — Atacar automaticamente com base em SPD.
- US-018 — Causar dano por clique.
- US-020 — Inimigo atacar aleatoriamente.
- US-021 — Remover Digimon derrotado da batalha.
- US-022 — Resolver derrota total do time.
- TS-001 — Estruturar motor de batalha desacoplado da UI.

## Tasks

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S01-001 | Data | Criar 3 Digimons iniciais fixos para teste. | Catálogo com Agumon, Gabumon e Biyomon ou equivalentes. | P |
| DG-S01-002 | Data | Criar localização inicial `Village of Beginnings`. | Localização com inimigos básicos e recompensas simples. | M |
| DG-S01-003 | Gameplay | Implementar cálculo de stats totais. | `total = base + byLevel + cumulative`. | M |
| DG-S01-004 | Gameplay | Implementar motor de batalha desacoplado da UI. | Battle engine com estado de combate independente de React. | G |
| DG-S01-005 | Gameplay | Implementar spawn de inimigo por localização. | Inimigo sorteado a partir do catálogo da localização. | M |
| DG-S01-006 | Gameplay | Implementar HP de aliados e inimigo. | Dano reduz HP e derrota é detectada. | M |
| DG-S01-007 | Gameplay | Implementar ataque automático por SPD. | Digimons atacam em intervalos baseados em SPD. | G |
| DG-S01-008 | Gameplay | Implementar ataque do inimigo em alvo aleatório vivo. | Inimigo causa dano em um Digimon vivo do time. | M |
| DG-S01-009 | Gameplay | Implementar regra de Digimon derrotado. | Digimon com 0 HP para de atacar e não pode agir. | M |
| DG-S01-010 | Gameplay | Implementar derrota total do time. | Ao perder os 3 Digimons, batalha termina como derrota. | M |
| DG-S01-011 | Gameplay | Implementar click damage. | Clique causa dano baseado no ATK total do time. | M |
| DG-S01-012 | UI | Criar área de batalha clicável. | Tela com inimigo, HP, time e área de clique. | M |
| DG-S01-013 | UI | Exibir cards dos 3 Digimons ativos. | Sprite, nome, level, HP e stats principais. | M |
| DG-S01-014 | UI | Exibir feedback simples de dano. | Dano aparece visualmente ou em log compacto. | M |
| DG-S01-015 | QA | Rodar playtest manual do loop básico. | Verificar se batalha reinicia, se derrota funciona e se clique é útil. | P |

## Critério de saída da sprint

- O jogador consegue entrar em batalha.
- Os 3 Digimons atacam automaticamente.
- O inimigo ataca aleatoriamente.
- O jogador consegue clicar para causar dano.
- Vitória e derrota funcionam.
- A lógica principal de combate não depende diretamente da UI.

---

# 6. Sprint 2 — MP, especial, recompensas e feedback de progresso

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

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S02-001 | Gameplay | Implementar MP iniciando em 0 a cada batalha. | MP resetado corretamente no início do combate. | P |
| DG-S02-002 | Gameplay | Implementar ganho de 5% de MP por ataque automático. | MP aumenta quando o Digimon ataca. | M |
| DG-S02-003 | Gameplay | Implementar estado de especial disponível. | Botão fica ativo ao chegar em 100% de MP. | M |
| DG-S02-004 | Gameplay | Implementar dano do especial. | Especial causa `max(ATK, INT) * 2`. | M |
| DG-S02-005 | Gameplay | Resetar MP após uso do especial. | MP volta a 0 após ativação. | P |
| DG-S02-006 | UI | Criar botão de especial por Digimon. | Botões com estado carregando/disponível. | M |
| DG-S02-007 | UI | Criar feedback visual para especial. | Diferenciar visualmente dano comum e especial. | M |
| DG-S02-008 | Tech | Criar sistema genérico de recompensas. | Função capaz de aplicar bits, XP, itens e drops. | G |
| DG-S02-009 | Gameplay | Implementar bits por vitória. | Saldo de bits aumenta ao vencer. | M |
| DG-S02-010 | Gameplay | Implementar XP básico de Digimon. | Digimons vivos recebem XP configurado. | M |
| DG-S02-011 | Data | Parametrizar recompensas por inimigo/localização. | Drops e bits vindos de catálogo. | M |
| DG-S02-012 | UI | Exibir drops/recompensas recentes. | Lista compacta na tela principal. | M |
| DG-S02-013 | UI | Exibir level up de Digimon. | Feedback quando um Digimon sobe de level. | M |
| DG-S02-014 | QA | Validar ritmo do combate. | Ajustar HP, dano, SPD e recompensas iniciais. | M |

## Critério de saída da sprint

- O especial está funcional.
- O jogador recebe bits e XP ao vencer.
- Recompensas aparecem na interface.
- O loop de combate já começa a gerar sensação de progresso.

---

# 7. Sprint 3 — Mapa, missões, trainer level e traits iniciais

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

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S03-001 | Tech | Criar sistema genérico de requisitos. | Validação de level, batalhas, boss, missão, localização e recursos. | G |
| DG-S03-002 | Data | Criar catálogo das 3 localizações iniciais. | Village of Beginnings, File Forest e Native Forest. | M |
| DG-S03-003 | Gameplay | Implementar seleção de localização. | Jogador pode trocar para localização desbloqueada. | M |
| DG-S03-004 | Gameplay | Implementar desbloqueio de localização. | Requisitos são validados automaticamente. | G |
| DG-S03-005 | UI | Criar tela/menu de mapa. | Localizações atual, bloqueadas e desbloqueadas. | M |
| DG-S03-006 | Data | Criar missões principais iniciais. | Missões com objetivo, texto e recompensa. | M |
| DG-S03-007 | Gameplay | Implementar progresso de missão por batalha. | Derrotas, drops e bosses atualizam objetivos. | G |
| DG-S03-008 | UI | Exibir missão ativa na tela principal. | Card compacto com progresso atual. | M |
| DG-S03-009 | Gameplay | Implementar resgate de recompensa de missão. | Recompensas aplicadas uma única vez. | M |
| DG-S03-010 | Gameplay | Implementar XP de treinador por batalha. | Trainer XP sobe ao vencer batalhas. | M |
| DG-S03-011 | Gameplay | Implementar level de treinador. | Level sobe ao atingir XP necessário. | M |
| DG-S03-012 | Gameplay | Implementar pontos de traits por trainer level. | Pontos acumulam no save. | M |
| DG-S03-013 | Data | Criar árvore inicial de traits. | Ramos Combat, Bond, Hatching, Explorer e Island. | G |
| DG-S03-014 | UI | Criar menu de traits separado. | Traits exibidas fora da tela principal. | G |
| DG-S03-015 | Gameplay | Implementar desbloqueio de trait com dependências. | Buffs passam a modificar sistemas. | G |
| DG-S03-016 | QA | Validar progressão da primeira localização até a terceira. | Jogador entende objetivo e desbloqueios. | M |

## Critério de saída da sprint

- O jogador possui mapa inicial.
- Há pelo menos uma linha de missão narrativa guiando o progresso.
- Trainer XP, trainer level e traits funcionam.
- As primeiras localizações podem ser desbloqueadas por requisitos.

---

# 8. Sprint 4 — Inventário, Essence, eggs e catálogo de Digimons do MVP

## Objetivo

Criar base de coleção e recursos: inventário, Essence, eggs, drops por tipo/raridade e catálogo inicial das linhas de Adventure 1.

## User stories relacionadas

- US-029 — Coletar Essence por tipo.
- US-030 — Coletar eggs por tipo e raridade.
- US-031 — Visualizar inventário.
- US-012 — Visualizar detalhes de um Digimon.
- US-014 — Aplicar personality no crescimento.
- US-015 — Limitar storage inicial da Ilha Digital.

## Tasks

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S04-001 | Data | Criar catálogo de Essence. | Essences por tipo principal usadas no MVP. | M |
| DG-S04-002 | Data | Criar catálogo de raridades de egg. | Common, Rare, Reinforced, Special, Event. | P |
| DG-S04-003 | Data | Criar modelo de item no catálogo. | Itens com ID, tipo, stack, descrição, preço e uso futuro. | M |
| DG-S04-004 | Gameplay | Implementar inventário stackável. | Itens e Essence somam quantidade. | G |
| DG-S04-005 | Gameplay | Implementar inventário de eggs. | Eggs possuem tipo, raridade, estado e dados próprios. | G |
| DG-S04-006 | Gameplay | Implementar drop de Essence. | Inimigos dropam Essence conforme tipo. | M |
| DG-S04-007 | Gameplay | Implementar drop de eggs. | Inimigos podem dropar eggs por tipo/raridade. | M |
| DG-S04-008 | UI | Criar tela de inventário. | Itens agrupados por categoria. | G |
| DG-S04-009 | UI | Exibir eggs não escaneados. | Eggs mostram tipo/raridade, mas não o Digimon contido. | M |
| DG-S04-010 | Data | Criar catálogo das linhas de Adventure 1. | Agumon, Gabumon, Biyomon, Tentomon, Palmon, Gomamon, Patamon e Salamon/Gatomon lines. | GG |
| DG-S04-011 | Data | Definir stats base iniciais por forma. | HP, MP, ATK, DEF, INT, SPI e SPD para cada forma. | GG |
| DG-S04-012 | Data | Definir Attribute, Element e tipo principal por forma. | Dados necessários para dano e Essence. | G |
| DG-S04-013 | Data | Criar catálogo de personalities. | Personalities copiadas/adaptadas da referência definida. | M |
| DG-S04-014 | Gameplay | Aplicar personality no crescimento by level. | Growth por level alterado pela personality. | M |
| DG-S04-015 | UI | Criar tela de detalhes do Digimon. | Exibir level, stats, base/byLevel/cumulative, personality, attribute e element. | G |
| DG-S04-016 | QA | Validar se todos os Digimons do catálogo carregam corretamente. | Nenhum ID quebrado ou referência inexistente. | M |

## Critério de saída da sprint

- O jogador coleta Essence e eggs.
- O inventário básico existe.
- Os Digimons do MVP têm dados mínimos para batalha, crescimento e evolução futura.
- A coleção começa a ganhar estrutura real.

---

# 9. Sprint 5 — Scanner e hatching

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

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S05-001 | Data | Definir tabela de scan por tipo/raridade. | Cada egg pode revelar Digimon compatível. | G |
| DG-S05-002 | Data | Definir custo de scan em bits. | Custo parametrizado por raridade. | M |
| DG-S05-003 | Gameplay | Implementar ação de scan. | Bits são consumidos e Digimon contido é revelado. | G |
| DG-S05-004 | UI | Criar tela/modal de scanner. | Jogador seleciona egg, vê custo e confirma scan. | G |
| DG-S05-005 | Data | Definir custo de Essence por inserção. | Custo parametrizado por tipo, raridade ou Digimon. | G |
| DG-S05-006 | Gameplay | Implementar tentativa de inserção. | Essence é consumida e resultado é sorteado. | G |
| DG-S05-007 | Gameplay | Implementar chances por número de inserção. | 1ª até 5ª inserção com chances corretas. | M |
| DG-S05-008 | Gameplay | Implementar falha preservando egg. | Falha perde apenas Essence da tentativa. | M |
| DG-S05-009 | Gameplay | Implementar quebra destruindo egg. | Egg é removido do inventário. | M |
| DG-S05-010 | Gameplay | Implementar hatching após 3 inserções. | Jogador pode chocar a partir de 3/5. | G |
| DG-S05-011 | Gameplay | Implementar bônus 4/5 e 5/5. | Bônus de status base aplicado ao Digimon nascido. | M |
| DG-S05-012 | Gameplay | Sortear personality ao chocar. | Digimon nasce com personality fixa. | M |
| DG-S05-013 | Gameplay | Enviar Digimon chocado para time ou Ilha. | Respeitar limite de 3 no time e 50 na Ilha. | M |
| DG-S05-014 | UI | Exibir risco da próxima inserção. | Interface mostra chance de sucesso, falha e quebra. | M |
| DG-S05-015 | UI | Criar feedback de sucesso/falha/quebra/hatch. | Jogador entende claramente o resultado. | M |
| DG-S05-016 | Gameplay | Implementar item inicial de proteção de egg, se entrar no MVP. | Hatch Stabilizer ou Backup de Egg com efeito simples. | M |
| DG-S05-017 | QA | Playtestar sensação de risco/recompensa. | Verificar tensão real entre parar no 3/5 e arriscar. | M |

## Critério de saída da sprint

- O jogador consegue escanear eggs.
- O jogador consegue inserir Essence.
- Falha e quebra funcionam corretamente.
- O jogador consegue chocar Digimons 3/5, 4/5 e 5/5.
- O sistema já gera tensão de risco/recompensa.

---

# 10. Sprint 6 — Time, storage, detalhes e gerenciamento de coleção

## Objetivo

Permitir que o jogador gerencie seu time e Ilha Digital como coleção, movendo Digimons, vendo detalhes e preparando a base para evolução e treinamentos.

## User stories relacionadas

- US-010 — Visualizar Digimons do time ativo.
- US-011 — Gerenciar time ativo.
- US-012 — Visualizar detalhes de um Digimon.
- US-015 — Limitar storage inicial da Ilha Digital.
- US-019 — Aumentar amizade com cliques de apoio.

## Tasks

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S06-001 | Gameplay | Implementar storage da Ilha Digital. | Lista de Digimons fora do time. | G |
| DG-S06-002 | Gameplay | Implementar limite de 50 Digimons na Ilha. | Novos Digimons respeitam capacidade. | M |
| DG-S06-003 | UI | Criar tela da Ilha Digital como storage. | Lista/cards de Digimons armazenados. | G |
| DG-S06-004 | Gameplay | Implementar mover Digimon da Ilha para o time. | Respeitar limite de 3 no time. | M |
| DG-S06-005 | Gameplay | Implementar remover Digimon do time para a Ilha. | Respeitar capacidade da Ilha. | M |
| DG-S06-006 | Gameplay | Impedir movimentação de Digimon ocupado. | Digimon em treino/ação não pode ir para o time. | M |
| DG-S06-007 | UI | Melhorar modal/tela de detalhes do Digimon. | Stats, amizade, personality, evolução, source e qualidade hatch. | G |
| DG-S06-008 | Gameplay | Implementar ganho de amizade por participação em batalha. | Ganho lento e parametrizado. | M |
| DG-S06-009 | Gameplay | Implementar ganho de amizade por clique de apoio. | Cliques contribuem lentamente com amizade. | M |
| DG-S06-010 | Gameplay | Implementar soft cap/limite de amizade. | Evitar farm abusivo por clique. | M |
| DG-S06-011 | UI | Exibir barra de amizade no detalhe e/ou card. | Jogador acompanha amizade. | M |
| DG-S06-012 | QA | Validar fluxo de coleção. | Chocar, armazenar, mover para time e batalhar. | M |

## Critério de saída da sprint

- O jogador consegue gerenciar time e Ilha.
- Digimons chocados entram corretamente na coleção.
- Amizade começa a fazer parte do loop.
- A tela de detalhes já serve como base para evolução.

---

# 11. Sprint 7 — Evolução, degeneração, requisitos e formas conhecidas

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

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S07-001 | Data | Criar catálogo de árvores evolutivas do MVP. | Relações entre Baby, Rookie, Champion, Ultimate, Mega 1. | GG |
| DG-S07-002 | Data | Definir requisitos iniciais por evolução. | Level, stats, amizade, XP por tipo, missão ou boss. | GG |
| DG-S07-003 | Gameplay | Implementar registro de formas conhecidas globais. | Forma obtida fica marcada na conta/save. | G |
| DG-S07-004 | UI | Criar visualização básica da árvore evolutiva. | Formas disponíveis, bloqueadas e conhecidas. | GG |
| DG-S07-005 | Gameplay | Validar requisitos de evolução. | Sistema informa se pode evoluir e o que falta. | G |
| DG-S07-006 | Gameplay | Implementar evolução. | Muda forma, reseta level, mantém amizade/personality, remove XP por tipo. | G |
| DG-S07-007 | Gameplay | Implementar cálculo de cumulative por amizade. | Percentuais 0%, 5%, 8%, 10%, limite 9999 por stat. | G |
| DG-S07-008 | Gameplay | Registrar forma obtida após evolução. | Nova forma entra em known forms. | M |
| DG-S07-009 | Gameplay | Implementar degeneração para forma conhecida. | Jogador escolhe destino elegível. | G |
| DG-S07-010 | UI | Exibir prévia de evolução/degeneração. | Mostrar requisitos, mudança de forma e ganho cumulative estimado. | G |
| DG-S07-011 | Gameplay | Remover XP por tipo ao evoluir/degenerar. | XP por tipo zera conforme regra. | M |
| DG-S07-012 | QA | Validar ciclo evoluir → degenerar → evoluir. | Confirmar que loop estratégico funciona. | G |

## Critério de saída da sprint

- O jogador consegue evoluir.
- O jogador consegue degenerar para formas conhecidas.
- Cumulative stat é calculado corretamente.
- A árvore evolutiva mostra caminhos e requisitos.
- O jogo começa a entregar a identidade principal de Digimon.

---

# 12. Sprint 8 — Ilha Digital, treinamentos e ações temporizadas

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

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S08-001 | Gameplay | Criar modelo de ação temporizada da Ilha. | Ação com início, fim, tipo, Digimon e recompensa. | G |
| DG-S08-002 | Gameplay | Implementar slots por tipo de ação. | 3 slots para cada tipo inicial. | G |
| DG-S08-003 | UI | Criar painel de ações da Ilha Digital. | Tabs ou seções para treinos e atividades. | G |
| DG-S08-004 | Gameplay | Implementar treino de status. | Digimon recebe ganho configurado ao concluir. | G |
| DG-S08-005 | Gameplay | Implementar treino de amizade. | Amizade aumenta lentamente ao concluir. | M |
| DG-S08-006 | Gameplay | Implementar treino de XP por tipo. | Jogador escolhe tipo de XP e Digimon recebe ao concluir. | G |
| DG-S08-007 | Gameplay | Implementar busca por itens. | Recompensa sorteada por tabela ao concluir. | M |
| DG-S08-008 | Gameplay | Implementar missão automática simples. | Missão valida requisito e entrega recompensa. | G |
| DG-S08-009 | Gameplay | Bloquear Digimon em ação. | Digimon ocupado não pode ir para time, evoluir ou iniciar outra ação. | M |
| DG-S08-010 | UI | Exibir timers e progresso das ações. | Tempo restante visível. | M |
| DG-S08-011 | UI | Implementar coleta de ação finalizada. | Jogador coleta resultado e libera slot. | M |
| DG-S08-012 | Gameplay | Implementar chip de treino simples. | Reduz tempo ou melhora resultado de um treino. | M |
| DG-S08-013 | QA | Validar ações com jogo fechado/aberto. | Timers devem funcionar por timestamp, não apenas intervalo em memória. | G |

## Critério de saída da sprint

- A Ilha Digital deixa de ser apenas storage.
- O jogador consegue treinar Digimons fora do time.
- Slots criam escolha real.
- XP por tipo e amizade têm fonte alternativa.
- A base para progresso offline e ações temporizadas fica pronta.

---

# 13. Sprint 9 — Loja, itens utilizáveis, bosses, attribute/element e offline progress

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

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S09-001 | Data | Definir matriz inicial de attribute/element. | Multiplicadores de vantagem e resistência. | G |
| DG-S09-002 | Gameplay | Aplicar attribute/element no cálculo de dano. | Dano final considera vantagem/desvantagem. | G |
| DG-S09-003 | UI | Exibir indicação de vantagem/desvantagem. | Feedback visual simples em batalha ou detalhe. | M |
| DG-S09-004 | Data | Criar bosses das 3 localizações. | Bosses com stats, drops e requisito de desafio. | M |
| DG-S09-005 | Gameplay | Implementar desafio de boss. | Boss aparece conforme requisito da localização. | G |
| DG-S09-006 | Gameplay | Registrar boss derrotado. | Progresso salvo e usado para desbloqueios. | M |
| DG-S09-007 | Gameplay | Implementar auto-progress. | Avança para próxima localização elegível. | G |
| DG-S09-008 | Gameplay | Pausar auto-progress em derrota. | Perda interrompe avanço automático. | M |
| DG-S09-009 | Data | Criar catálogo da primeira loja. | Itens, preços e requisitos da loja. | M |
| DG-S09-010 | UI | Criar interface de loja. | Comprar itens com bits. | G |
| DG-S09-011 | Gameplay | Implementar compra de item. | Bits são consumidos e item entra no inventário. | M |
| DG-S09-012 | Gameplay | Implementar venda de item permitido. | Item reduz e bits aumentam. | M |
| DG-S09-013 | Gameplay | Implementar item de amizade. | Aumenta amizade respeitando limite. | M |
| DG-S09-014 | Gameplay | Implementar boost de XP simples. | Buff temporário ou por quantidade. | M |
| DG-S09-015 | Gameplay | Implementar Trait Reset Core. | Reseta traits e devolve pontos. | M |
| DG-S09-016 | Gameplay | Implementar cálculo offline limitado. | Ganhos baseados em tempo ausente, limite e penalidade. | G |
| DG-S09-017 | UI | Exibir resumo offline ao retornar. | Bits, XP e drops em resumo. | M |
| DG-S09-018 | QA | Validar economia e risco de inflação. | Checar ganhos, preços e ritmo inicial. | G |

## Critério de saída da sprint

- O MVP tem loja inicial.
- Itens podem ser usados.
- Bosses criam marcos de progressão.
- Attribute/element influencia combate.
- Offline progress existe com limite.
- O jogo está praticamente completo em sistemas.

---

# 14. Sprint 10 — Polimento, i18n, balanceamento e build do MVP local

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

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S10-001 | Save | Revisar schema final do save local. | Save estável e versionado. | G |
| DG-S10-002 | Save | Criar primeira migration real de save. | Estrutura preparada para mudanças futuras. | M |
| DG-S10-003 | UI | Revisar tela principal com foco em clareza. | Batalha, time, missão, drops, buffs e recursos visíveis sem poluição. | G |
| DG-S10-004 | UI | Separar menus densos. | Traits, inventário, storage, árvore e missões fora da tela principal. | G |
| DG-S10-005 | Data | Revisar chaves de tradução. | PT, EN e ES preparados com fallback. | G |
| DG-S10-006 | Data | Remover textos hardcoded visíveis. | UI e conteúdo usam i18n. | G |
| DG-S10-007 | QA | Playtestar início ao fim do MVP. | Novo save até Native Forest com hatching e evolução. | GG |
| DG-S10-008 | QA | Ajustar balanceamento de combate. | HP, dano, SPD, MP e XP calibrados. | G |
| DG-S10-009 | QA | Ajustar balanceamento de hatching. | Custo, drops, chances e bônus calibrados. | G |
| DG-S10-010 | QA | Ajustar balanceamento de amizade. | Amizade sobe devagar, mas não parece inútil. | G |
| DG-S10-011 | QA | Ajustar balanceamento da Ilha. | Treinos têm tempos e recompensas coerentes. | G |
| DG-S10-012 | QA | Ajustar economia. | Bits, preços, drops e recompensas coerentes. | G |
| DG-S10-013 | Tech | Isolar RNG sensível em camada própria. | Preparado para futura substituição por servidor. | M |
| DG-S10-014 | Tech | Modelar ações sensíveis como comandos/eventos. | Hatching, evolução, compra, missão e treino com comandos claros. | G |
| DG-S10-015 | Setup | Configurar build/deploy inicial na Vercel. | MVP local publicado de forma privada. | M |
| DG-S10-016 | QA | Criar checklist de release do MVP local. | Lista de validação para novos builds. | M |

## Critério de saída da sprint

- O MVP local está jogável de ponta a ponta.
- O jogador entende o próximo objetivo.
- O combate é satisfatório.
- Hatching gera tensão.
- Evolução/degeneração tem valor estratégico.
- A Ilha Digital tem utilidade.
- O jogo está pronto para playtests mais sérios.

---

# 15. Sprint 11 — Preparação da Online Alpha

## Objetivo

Iniciar a versão online sem reescrever o MVP: backend, banco, autenticação, estrutura do cloud save e deploy separado.

## User stories relacionadas

- US-075 — Criar conta.
- US-076 — Fazer login.
- US-077 — Migrar save local para cloud save.
- US-080 — Persistir dados online em PostgreSQL.
- TS-005 — Preparar arquitetura para versão online.

## Tasks

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S11-001 | Online | Definir arquitetura da Online Alpha. | Decisão entre NestJS/API Node, Prisma/Drizzle e provedor de banco. | M |
| DG-S11-002 | Online | Criar projeto backend. | API inicial separada do frontend. | M |
| DG-S11-003 | Online | Configurar PostgreSQL. | Banco criado com ambiente local/dev. | M |
| DG-S11-004 | Online | Configurar ORM/query builder. | Prisma ou Drizzle funcionando. | M |
| DG-S11-005 | Online | Modelar tabelas principais. | Users, saves, player_digimons, inventory, eggs, missions, traits, known_forms, events. | GG |
| DG-S11-006 | Online | Criar autenticação básica. | Criar conta e login. | G |
| DG-S11-007 | Online | Criar endpoint de carregar cloud save. | Retorna save online consolidado. | G |
| DG-S11-008 | Online | Criar endpoint de persistir cloud save. | Persiste estado validado inicial. | G |
| DG-S11-009 | Online | Criar estratégia de migração local → online. | Usuário escolhe migrar save local. | G |
| DG-S11-010 | UI | Criar tela de login/cadastro. | Fluxo acessível antes de carregar cloud save. | G |
| DG-S11-011 | UI | Criar opção de migrar save local. | Confirmação e aviso de conflito. | M |
| DG-S11-012 | Setup | Configurar deploy do backend. | Ambiente separado do frontend. | M |
| DG-S11-013 | QA | Validar fluxo conta → cloud save. | Criar conta, logar, salvar, sair e voltar. | G |

## Critério de saída da sprint

- O jogador consegue criar conta.
- O jogador consegue fazer login.
- Existe cloud save inicial.
- PostgreSQL armazena os dados principais.
- O save local pode começar a ser migrado.

---

# 16. Sprint 12 — Validação server-side e integridade online

## Objetivo

Mover ações sensíveis para validação no servidor, protegendo hatching, drops raros, compras, evolução e recompensas importantes.

## User stories relacionadas

- US-078 — Salvar eventos consolidados no backend.
- US-079 — Validar RNG sensível no servidor.
- US-080 — Persistir dados online em PostgreSQL.
- US-081 — Aplicar rate limit em ações sensíveis.
- US-082 — Usar Redis para cache e locks.

## Tasks

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S12-001 | Online | Definir contrato de eventos consolidados. | Battle result, hatch attempt, scan, evolve, train, shop, mission claim. | G |
| DG-S12-002 | Online | Criar validação server-side de scan. | Scan online calcula resultado oficialmente. | G |
| DG-S12-003 | Online | Criar validação server-side de hatching. | Sucesso/falha/quebra calculados no backend. | GG |
| DG-S12-004 | Online | Criar validação server-side de compra/venda. | Bits e inventário alterados em transação. | G |
| DG-S12-005 | Online | Criar validação server-side de evolução/degeneração. | Requisitos e cumulative validados no backend. | GG |
| DG-S12-006 | Online | Criar validação server-side de recompensa de batalha. | Backend valida recompensas consolidadas. | GG |
| DG-S12-007 | Online | Criar tabela/log de eventos importantes. | Histórico para auditoria leve. | M |
| DG-S12-008 | Online | Configurar Redis para rate limit. | Limites básicos por usuário/ação. | M |
| DG-S12-009 | Online | Implementar locks para ações críticas. | Evitar duplicação por double submit. | G |
| DG-S12-010 | UI | Adaptar frontend para receber resultado oficial. | Cliente mostra feedback após resposta do backend. | G |
| DG-S12-011 | QA | Testar duplicação de requests. | Não duplicar itens, bits, eggs ou recompensas. | G |
| DG-S12-012 | QA | Testar manipulação óbvia de payload. | Backend não aceita valores não validados. | G |

## Critério de saída da sprint

- RNG sensível fica no backend.
- Ações críticas são transacionais.
- Não é possível duplicar recompensas por repetição simples.
- O frontend mantém sensação imediata sem comprometer integridade.

---

# 17. Sprint 13 — Online Alpha jogável

## Objetivo

Fechar uma versão online jogável com cloud save, backend validando ações importantes, migração local e fluxo estável.

## User stories relacionadas

- US-075 a US-082.
- Preparação para US-067, US-068 e US-088.

## Tasks

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S13-001 | Online | Revisar schema online após uso real. | Ajustar tabelas antes de expandir. | G |
| DG-S13-002 | Online | Criar sincronização incremental de save. | Evitar salvar estado inteiro o tempo todo. | G |
| DG-S13-003 | Online | Criar endpoint de resumo de conta. | Trainer level, time, localização e recursos principais. | M |
| DG-S13-004 | Online | Implementar fallback seguro para falha de rede. | UI informa erro e evita perda de ação. | G |
| DG-S13-005 | UI | Criar indicador online/sincronizando. | Jogador entende estado do cloud save. | M |
| DG-S13-006 | QA | Testar jogar em dois dispositivos. | Save online carrega corretamente. | G |
| DG-S13-007 | QA | Testar conflito entre abas/dispositivos. | Definir comportamento seguro. | G |
| DG-S13-008 | QA | Testar migração local → online em cenários diferentes. | Sem perda silenciosa de progresso. | G |
| DG-S13-009 | Setup | Configurar CI/CD básico. | Deploy automatizado para frontend e backend. | G |
| DG-S13-010 | QA | Release interno da Online Alpha. | Build privado pronto para teste. | M |

## Critério de saída da sprint

- Existe uma Online Alpha jogável.
- Login e cloud save estão funcionais.
- PostgreSQL persiste progresso.
- Backend valida ações sensíveis.
- CI/CD básico está configurado.

---

# 18. Sprints pós-MVP e roadmap

As sprints abaixo não devem começar antes do MVP local estar divertido e da Online Alpha estar estável.

---

## Sprint 14 — Missões recorrentes, diárias e semanais

### Objetivo

Adicionar objetivos recorrentes online para aumentar retenção.

### User stories relacionadas

- US-067 — Receber missões diárias e semanais.

### Tasks principais

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S14-001 | Online | Criar calendário de missões diárias/semanais. | Geração por período. | G |
| DG-S14-002 | Data | Criar pool de missões recorrentes. | Objetivos variados e recompensas. | G |
| DG-S14-003 | Online | Persistir progresso por jogador/período. | Evitar resgate duplicado. | G |
| DG-S14-004 | UI | Criar tela de missões recorrentes. | Diárias e semanais visíveis. | M |
| DG-S14-005 | QA | Validar virada de período. | Renovação correta. | G |

---

## Sprint 15 — Missões globais e eventos temporários

### Objetivo

Adicionar objetivos coletivos e eventos dependentes de backend.

### User stories relacionadas

- US-068 — Participar de missão global.
- US-087 — Participar de eventos temporários.

### Tasks principais

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S15-001 | Online | Criar modelo de missão global. | Objetivo, período, progresso total e recompensa. | G |
| DG-S15-002 | Online | Validar contribuição individual. | Progresso global com antidupe leve. | GG |
| DG-S15-003 | Data | Criar primeiro evento temporário. | Evento simples com boost ou drops especiais. | G |
| DG-S15-004 | UI | Exibir progresso global. | Barra de progresso e recompensas. | M |
| DG-S15-005 | QA | Testar alta frequência de contribuição. | Verificar performance e consistência. | G |

---

## Sprint 16 — Rankings simples

### Objetivo

Adicionar comparação assíncrona entre jogadores.

### User stories relacionadas

- US-088 — Visualizar ranking simples.

### Tasks principais

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S16-001 | Online | Definir métricas de ranking. | Trainer level, boss, coleção, evento ou poder total. | M |
| DG-S16-002 | Online | Criar materialização/cache de ranking. | Evitar queries pesadas. | G |
| DG-S16-003 | UI | Criar tela de ranking. | Lista simples, posição do jogador e filtros. | M |
| DG-S16-004 | QA | Validar atualização e privacidade. | Dados exibidos com cuidado. | M |

---

## Sprint 17 — Jogress

### Objetivo

Adicionar primeiro sistema avançado de evolução especial.

### User stories relacionadas

- US-083 — Implementar Jogress.

### Tasks principais

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S17-001 | Data | Definir primeiras Jogress disponíveis. | Requisitos e formas resultantes. | G |
| DG-S17-002 | Gameplay | Validar múltiplos Digimons como requisito. | Sistema aceita mais de um Digimon. | GG |
| DG-S17-003 | Gameplay | Consumir Digimons usados na Jogress. | Regra confirmada aplicada com confirmação forte. | G |
| DG-S17-004 | UI | Criar fluxo especial de confirmação. | Evitar consumo acidental. | M |
| DG-S17-005 | QA | Testar impacto em coleção, forms conhecidas e save. | Sem perda indevida de dados. | G |

---

## Sprint 18 — Armor Evolution e Digi-Espírito

### Objetivo

Adicionar formas alternativas e evoluções especiais por item/missão.

### User stories relacionadas

- US-084 — Implementar Armor Evolution.
- US-085 — Implementar Digi-Espírito.

### Tasks principais

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S18-001 | Data | Definir modelo de forma alternativa. | Diferencia forma comum, Armor e Espírito. | G |
| DG-S18-002 | Gameplay | Implementar requisitos por item especial. | Digi-Egg/Spirit como requisito. | G |
| DG-S18-003 | UI | Diferenciar formas especiais na árvore. | Badges, cor ou agrupamento. | M |
| DG-S18-004 | Data | Criar primeiras formas Armor/Espírito. | Conteúdo inicial jogável. | G |
| DG-S18-005 | QA | Validar transição entre formas comuns e alternativas. | Sem quebrar evolução comum. | G |

---

## Sprint 19 — Social futuro

### Objetivo

Planejar e iniciar sistemas de interação entre jogadores, somente se fizer sentido após playtests.

### User stories relacionadas

- US-089 — Participar de guilda.
- US-090 — Realizar PvP assíncrono.
- US-091 — Usar mercado entre jogadores.

### Tasks principais

| ID | Tipo | Task | Saída esperada | Tamanho |
|---|---|---|---|---|
| DG-S19-001 | Product | Definir prioridade entre guilda, PvP e mercado. | Decisão de produto antes de desenvolvimento. | M |
| DG-S19-002 | Online | Criar modelo de guilda, se aprovado. | Guild, members, roles e missões. | GG |
| DG-S19-003 | Gameplay | Criar simulação de PvP assíncrono, se aprovado. | Combate contra snapshot de outro time. | GG |
| DG-S19-004 | Online | Criar modelo de mercado, se aprovado. | Listagens, compra e transação segura. | GG |
| DG-S19-005 | QA | Avaliar riscos de abuso econômico. | Antes de liberar mercado ou trocas. | G |

---

# 19. Ordem recomendada de implementação técnica

Esta ordem deve ser usada dentro das sprints quando houver dúvida sobre o que iniciar primeiro.

1. **Tipos e catálogos.**
2. **Save local.**
3. **Motor desacoplado.**
4. **UI simples consumindo estado.**
5. **Requisitos genéricos.**
6. **Recompensas genéricas.**
7. **Batalha.**
8. **Progressão.**
9. **Inventário.**
10. **Hatching.**
11. **Coleção/storage.**
12. **Evolução/degeneração.**
13. **Ilha Digital.**
14. **Loja/itens.**
15. **Offline progress.**
16. **Polimento e balanceamento.**
17. **Online Alpha.**

---

# 20. Dependências principais

| Sistema | Depende de | Motivo |
|---|---|---|
| Batalha | Catálogo de Digimon, stats e localização | Precisa saber quem luta, stats e inimigos disponíveis. |
| Drops | Inventário, recompensas e localização | Precisa aplicar recompensas corretamente. |
| Hatching | Inventário, eggs, Essence, Digimon catalog e RNG | Precisa consumir recursos e criar Digimon. |
| Evolução | Requisitos, stats, forms conhecidas e árvore | Precisa validar condições e registrar forma. |
| Degeneração | Evolução, forms conhecidas e cumulative | Usa regras semelhantes com destinos conhecidos. |
| Ilha Digital | Storage, timers, save e recompensas | Precisa bloquear Digimon e aplicar ganho ao concluir. |
| Traits | Trainer level, pontos e sistema de buffs | Precisa alterar fórmulas globais. |
| Offline progress | Batalha, localização, recompensas e save timestamp | Simula progresso consolidado. |
| Online Alpha | MVP local estável e ações sensíveis isoladas | Evita reescrever tudo para backend. |

---

# 21. Checklist de Definition of Ready por sprint

Antes de iniciar uma sprint, validar:

- As user stories da sprint estão claras.
- Os catálogos necessários existem ou estão definidos como task.
- As regras de falha estão descritas.
- O comportamento no save está definido.
- Os efeitos em batalha/progressão estão claros.
- As tasks P0 da sprint anterior foram finalizadas.
- Os textos visíveis já têm estratégia de i18n.
- Os pontos de balanceamento estão parametrizados.

---

# 22. Checklist de Definition of Done por sprint

Uma sprint só deve ser considerada concluída quando:

- As tasks P0/P1 planejadas foram implementadas ou conscientemente movidas.
- O fluxo pode ser usado no jogo real.
- O save local persiste corretamente o novo estado.
- A UI oferece feedback claro.
- Não há texto visível hardcoded novo.
- A funcionalidade não quebra o loop principal.
- Existe pelo menos um playtest manual do fluxo.
- Os principais parâmetros estão em catálogo/config, não espalhados pelo código.

---

# 23. Riscos de planejamento

| Risco | Impacto | Mitigação |
|---|---|---|
| Catálogo de Digimons ficar grande demais no início | Atrasa gameplay | Começar com subset funcional e expandir após motor estável. |
| Evolução virar sistema complexo demais cedo | Atrasa MVP | Implementar evolução comum primeiro, deixar especiais para roadmap. |
| UI tentar ser completa antes do jogo ser divertido | Perde tempo | Começar com UI funcional e polir depois. |
| Hatching ficar frustrante | Reduz diversão | Playtestar custos, drops e chances antes de fechar números. |
| Amizade subir rápido demais | Quebra cumulative stat | Usar soft cap, configs e playtest. |
| Offline progress gerar recursos demais | Inflação | Limitar horas, penalidade e drops raros. |
| Backend ser iniciado cedo demais | Retrabalho | Só iniciar Online Alpha após MVP local divertido. |
| Uso de sprites oficiais | Risco de IP se público | Manter privado, sem monetização e sem distribuição pública. |

---

# 24. Marcos de entrega

## Marco 1 — Battle Prototype

Entregue ao final da Sprint 2.

Critérios:

- Jogo abre no navegador.
- Save local existe.
- Time inicial luta automaticamente.
- Jogador clica para causar dano.
- MP e especial funcionam.
- Vitória entrega recompensas.

## Marco 2 — Progression Prototype

Entregue ao final da Sprint 3.

Critérios:

- Mapa inicial existe.
- Missões guiam o jogador.
- Trainer level e traits funcionam.
- Localizações são desbloqueáveis.

## Marco 3 — Collection Prototype

Entregue ao final da Sprint 5.

Critérios:

- Inventário existe.
- Essence e eggs dropam.
- Scanner funciona.
- Hatching 3/5, 4/5 e 5/5 funciona.
- Digimons chocados entram na coleção.

## Marco 4 — Digimon Identity MVP

Entregue ao final da Sprint 8.

Critérios:

- Evolução e degeneração funcionam.
- Cumulative stat por amizade funciona.
- Ilha Digital é útil.
- Coleção, treino e progressão conversam entre si.

## Marco 5 — MVP Local Playtest

Entregue ao final da Sprint 10.

Critérios:

- MVP jogável de ponta a ponta.
- UI está limpa.
- PT/EN/ES estão preparados.
- Balanceamento inicial está aceitável.
- Build privado pode ser testado.

## Marco 6 — Online Alpha

Entregue ao final da Sprint 13.

Critérios:

- Login existe.
- Cloud save existe.
- PostgreSQL persiste dados.
- Backend valida ações sensíveis.
- CI/CD básico está configurado.

---

# 25. Ordem de prioridade resumida

## Prioridade absoluta

1. Motor de batalha.
2. Save local.
3. Catálogos.
4. Stats.
5. Recompensas.
6. Mapa/missões.
7. Hatching.
8. Evolução/degeneração.
9. Ilha Digital.
10. Balanceamento.

## Só depois

1. Login.
2. Cloud save.
3. PostgreSQL.
4. Missões globais.
5. Rankings.
6. Eventos temporários.
7. Jogress.
8. Armor.
9. Guildas/PvP/mercado.

---

# 26. Notas finais para execução

O desenvolvimento deve sempre priorizar a pergunta:

> O jogo está ficando mais divertido e mais claro para o jogador?

Se uma task não melhora o loop principal, a progressão ou a clareza da experiência, ela deve ser adiada.

O MVP do Digiclicker não precisa provar complexidade técnica. Ele precisa provar que:

- Batalhar é satisfatório.
- Clicar ajuda de verdade.
- Chocar eggs é emocionante.
- Evoluir e degenerar é estratégico.
- A Ilha Digital é útil.
- O jogador sempre sabe o próximo objetivo.
- A progressão dá vontade de continuar.

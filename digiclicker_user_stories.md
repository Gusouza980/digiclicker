# Digiclicker — User Stories Backlog

**Versão:** 1.0  
**Data:** 06/06/2026  
**Documento base:** `digiclicker_briefing.md`  
**Produto:** Digiclicker  
**Formato:** Fan game privado, web, idle + clicker  
**Objetivo do documento:** transformar o briefing de produto em um backlog organizado de user stories para desenvolvimento incremental.

---

## 1. Convenções do backlog

### Formato das histórias

As histórias seguem o formato:

> **Como** [persona], **quero** [ação/capacidade], **para** [benefício/objetivo].

### Personas usadas

- **Jogador:** pessoa que joga Digiclicker.
- **Sistema:** comportamento automático necessário para manter as regras do jogo.
- **Product Owner:** responsável por configurar, balancear e evoluir o conteúdo do jogo.
- **Administrador futuro:** papel opcional para versão online, caso exista uma interface de gestão de conteúdo ou eventos.

### Prioridades

- **P0 — Essencial:** necessário para protótipo ou MVP funcionar.
- **P1 — Importante:** importante para o MVP completo ou para a experiência ficar coerente.
- **P2 — Pós-MVP:** pode entrar após a validação principal.
- **P3 — Futuro:** roadmap avançado.

### Fases

- **Fase 1 — Protótipo local:** validação do loop de batalha.
- **Fase 2 — MVP local:** validação de progressão, hatching, evolução, ilha, mapa e traits.
- **Fase 3 — Online Alpha:** login, cloud save, backend, PostgreSQL e validações sensíveis.
- **Fase 4 — Online Progression:** missões recorrentes, eventos, rankings e expansão online.
- **Fase 5 — Sistemas avançados:** Jogress, Armor, Digi-Espírito, Mega 2 e novas linhas.
- **Fase 6 — Social futuro:** guildas, PvP, mercado e sistemas comunitários.

---

## 2. Épicos do produto

| Épico | Nome | Foco |
|---|---|---|
| E01 | Fundação do jogo | App web, save local, i18n e estrutura base. |
| E02 | Tela principal e experiência de jogo | UI principal, feedback visual, navegação e menus. |
| E03 | Digimons, stats e coleção | Catálogo, stats, personalities, time e storage. |
| E04 | Sistema de batalha | Combate contínuo, clique, SPD, MP, especial, vitória e derrota. |
| E05 | Drops, inventário e economia | Bits, Essence, eggs, itens, venda e recompensas. |
| E06 | Scanner, eggs e hatching | Scan, inserções, falha, quebra, qualidade e bônus. |
| E07 | Ilha Digital | Treinos, slots, amizade, XP por tipo, busca e missões automáticas. |
| E08 | Evolução e degeneração | Árvore evolutiva, requisitos, formas conhecidas e status cumulativo. |
| E09 | Trainer level e traits | XP do treinador, pontos, árvore de buffs e reset. |
| E10 | Mapa, localizações e progressão | Regiões, desbloqueios, bosses e auto-progress. |
| E11 | Missões e narrativa | Missões principais, secundárias, diárias, semanais e globais. |
| E12 | Lojas e itens utilizáveis | Cidades, lojas, compra, uso e efeitos de itens. |
| E13 | Progressão offline | Ganhos offline limitados e cálculo consolidado. |
| E14 | Online Alpha e integridade | Login, cloud save, PostgreSQL, backend e validações. |
| E15 | Roadmap avançado | Jogress, Armor, eventos, guildas, PvP e social. |

---

# 3. User stories detalhadas

---

## E01 — Fundação do jogo

### US-001 — Iniciar o jogo no navegador

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero acessar o Digiclicker pelo navegador, para jogar sem precisar instalar nada.

**Critérios de aceite:**

- Dado que o jogador acessa a URL do jogo, quando a aplicação carrega, então a tela inicial deve ser exibida.
- Dado que a aplicação foi carregada, então o jogador deve conseguir iniciar uma nova sessão de jogo.
- Dado que o MVP é local, então o jogo não deve exigir login para começar.

---

### US-002 — Criar novo save local

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero criar um novo save local, para começar minha progressão no MVP sem depender de backend.

**Critérios de aceite:**

- Dado que o jogador inicia o jogo pela primeira vez, quando confirma o início, então um save local deve ser criado.
- Dado que o save foi criado, então ele deve armazenar time inicial, localização atual, inventário, bits, progresso de missões e configurações.
- Dado que o jogador fecha e abre o navegador, então o save deve ser carregado novamente.

---

### US-003 — Versionar o save local

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como sistema, quero versionar o save local, para permitir futuras migrações sem quebrar o progresso do jogador.

**Critérios de aceite:**

- Dado que um save é criado, então ele deve conter um campo de versão.
- Dado que a estrutura do save muda, quando o jogador abre o jogo, então o sistema deve identificar se precisa migrar o save.
- Dado que a migração falha, então o jogo deve exibir uma mensagem segura e não apagar automaticamente o progresso.

---

### US-004 — Selecionar idioma

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero escolher entre português, inglês e espanhol, para jogar no idioma que prefiro.

**Critérios de aceite:**

- Dado que o jogador acessa as configurações, quando seleciona um idioma, então a interface deve ser atualizada para o idioma escolhido.
- Dado que o idioma foi escolhido, então a preferência deve ser salva.
- Dado que textos de UI, itens, missões, localizações e mensagens aparecem no jogo, então eles devem vir de chaves de tradução, não de texto hardcoded.

---

### US-005 — Carregar catálogos versionados

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como sistema, quero carregar catálogos versionados de Digimons, itens, localizações e missões, para manter as regras do jogo organizadas e expansíveis.

**Critérios de aceite:**

- Dado que o jogo inicia, então os catálogos necessários devem ser carregados antes de iniciar a sessão.
- Dado que um Digimon, item, missão ou localização é usado no save, então deve existir um identificador único no catálogo.
- Dado que o catálogo recebe novos dados, então os saves antigos devem continuar compatíveis sempre que possível.

---

## E02 — Tela principal e experiência de jogo

### US-006 — Visualizar tela principal moderna

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero uma tela principal moderna e objetiva, para acompanhar batalha, time, mapa, recursos e progresso sem poluição visual.

**Critérios de aceite:**

- Dado que o jogador está em jogo, então a tela principal deve exibir batalha atual, time ativo, localização, bits, drops recentes e missão atual.
- Dado que um Digimon tem HP e MP, então essas informações devem ser visíveis no card do time.
- Dado que há buffs ativos, então eles devem aparecer em área visível e compacta.

---

### US-007 — Ver informações essenciais da batalha

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero ver HP do inimigo, HP/MP dos meus Digimons e dano causado, para entender se estou vencendo ou perdendo.

**Critérios de aceite:**

- Dado que uma batalha está ativa, então o HP atual e máximo do inimigo deve ser exibido.
- Dado que meus Digimons participam da batalha, então HP e MP de cada um devem ser exibidos.
- Dado que danos são causados, então deve haver feedback visual suficiente para o jogador perceber o impacto.

---

### US-008 — Acessar menus separados

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero acessar traits, inventário completo, storage, árvore evolutiva, missões e configurações por menus separados, para manter a tela principal limpa.

**Critérios de aceite:**

- Dado que o jogador abre o menu, então deve conseguir acessar as principais seções do jogo.
- Dado que o jogador fecha um menu, então deve retornar para a tela principal sem perder o estado da batalha.
- Dado que traits são uma área mais densa, então elas devem ficar fora da tela principal.

---

### US-009 — Receber feedback de ação importante

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P1  
**Story:** Como jogador, quero receber feedback quando ganho drops, subo level, concluo missão ou desbloqueio algo, para sentir progresso constante.

**Critérios de aceite:**

- Dado que uma recompensa é recebida, então ela deve aparecer em drops recentes ou notificação discreta.
- Dado que uma missão é concluída, então o jogador deve ser avisado.
- Dado que uma localização, trait ou forma é desbloqueada, então o jogo deve comunicar claramente o desbloqueio.

---

## E03 — Digimons, stats e coleção

### US-010 — Visualizar Digimons do time ativo

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero visualizar meus até 3 Digimons ativos, para acompanhar minha equipe principal de batalha.

**Critérios de aceite:**

- Dado que o jogador possui Digimons no time, então cada um deve aparecer com nome, sprite, level, HP, MP e principais stats.
- Dado que o time possui menos de 3 Digimons, então slots vazios devem ser exibidos.
- Dado que o jogador tenta adicionar mais de 3 Digimons ao time, então o sistema deve impedir a ação.

---

### US-011 — Gerenciar time ativo

**Fase:** Fase 2 — MVP local  
**Prioridade:** P0  
**Story:** Como jogador, quero mover Digimons entre o time ativo e a Ilha Digital, para montar a equipe que desejo usar em batalha.

**Critérios de aceite:**

- Dado que há espaço no time, quando o jogador escolhe um Digimon da Ilha, então ele pode ser adicionado ao time.
- Dado que o time está cheio, quando o jogador tenta adicionar outro Digimon, então deve escolher quem remover ou cancelar.
- Dado que um Digimon está em treinamento na Ilha, então ele não deve poder ser adicionado ao time sem cancelar ou concluir a ação atual.

---

### US-012 — Visualizar detalhes de um Digimon

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero abrir os detalhes de um Digimon, para analisar level, amizade, personality, attribute, element, stats e árvore evolutiva.

**Critérios de aceite:**

- Dado que o jogador seleciona um Digimon, então deve ver seus dados gerais.
- Dado que o Digimon possui stats base, by level e cumulative, então o detalhamento deve exibir os três componentes.
- Dado que o Digimon possui requisitos de evolução disponíveis, então eles devem ser consultáveis.

---

### US-013 — Calcular stats totais

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como sistema, quero calcular o status total de cada Digimon usando base, by level e cumulative, para que batalha, evolução e hatching usem valores consistentes.

**Critérios de aceite:**

- Dado que um Digimon possui stats base, by level e cumulative, então o total deve ser a soma desses componentes.
- Dado que o level muda, então o by level deve ser recalculado.
- Dado que o cumulative atinge 9999 em um stat, então ele não deve passar desse limite.

---

### US-014 — Aplicar personality no crescimento

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como sistema, quero aplicar personality no crescimento por level, para que Digimons da mesma espécie possam se desenvolver de formas diferentes.

**Critérios de aceite:**

- Dado que um Digimon possui personality, então ela deve alterar apenas o crescimento by level.
- Dado que um Digimon evolui ou degenera, então a personality deve ser mantida.
- Dado que um Digimon é chocado, então sua personality deve ser definida nesse momento.

---

### US-015 — Limitar storage inicial da Ilha Digital

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero armazenar até 50 Digimons na Ilha Digital inicialmente, para colecionar Digimons sem lotar o time ativo.

**Critérios de aceite:**

- Dado que o jogador possui menos de 50 Digimons na Ilha, então novos Digimons podem ser armazenados.
- Dado que a Ilha está cheia, então o sistema deve impedir novos armazenamentos até liberar espaço ou expandir capacidade futuramente.
- Dado que o jogador visualiza a Ilha, então a capacidade atual e usada deve ser exibida.

---

## E04 — Sistema de batalha

### US-016 — Iniciar batalha contínua na localização atual

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero que batalhas sejam iniciadas automaticamente na localização atual, para manter o loop idle/clicker funcionando continuamente.

**Critérios de aceite:**

- Dado que o jogador escolhe uma localização, então o jogo deve iniciar batalhas contra Digimons selvagens daquela localização.
- Dado que uma batalha termina em vitória, então uma nova batalha deve começar automaticamente, salvo interrupção por missão, boss ou derrota.
- Dado que não há Digimons vivos no time, então novas batalhas não devem iniciar até o estado ser resolvido.

---

### US-017 — Atacar automaticamente com base em SPD

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero que meus Digimons ataquem automaticamente com frequência baseada em SPD, para que velocidade seja um stat relevante no combate.

**Critérios de aceite:**

- Dado que um Digimon está vivo na batalha, então ele deve atacar automaticamente.
- Dado que dois Digimons possuem SPD diferentes, então o Digimon com maior SPD deve atacar com menor intervalo.
- Dado que a fórmula de SPD precisa de balanceamento, então seus parâmetros devem ser configuráveis.

---

### US-018 — Causar dano por clique

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero clicar na área de batalha para causar dano, para ajudar meus Digimons diretamente no combate.

**Critérios de aceite:**

- Dado que uma batalha está ativa, quando o jogador clica na área de combate, então o inimigo deve receber dano.
- Dado que o click damage é calculado, então ele deve considerar uma porcentagem do ATK total do time ativo.
- Dado que há buffs de traits ou itens, então eles podem modificar o click damage.

---

### US-019 — Aumentar amizade com cliques de apoio

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero que meus cliques contribuam lentamente com amizade, para sentir que estou apoiando meus Digimons durante a batalha.

**Critérios de aceite:**

- Dado que o jogador clica durante a batalha, então o sistema deve acumular progresso de amizade de forma lenta e parametrizada.
- Dado que há limite diário ou soft cap, então o ganho por clique deve respeitar esse limite.
- Dado que um Digimon está fora de batalha por ter sido derrotado, então ele não deve receber ganho por clique naquela batalha.

---

### US-020 — Inimigo atacar aleatoriamente

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero que o Digimon selvagem ataque aleatoriamente um dos meus Digimons vivos, para que a sobrevivência do time tenha variação e risco.

**Critérios de aceite:**

- Dado que o inimigo ataca, então o alvo deve ser sorteado entre Digimons vivos.
- Dado que há apenas um Digimon vivo, então ele deve ser o alvo.
- Dado que todos os Digimons estão derrotados, então o inimigo não deve continuar atacando.

---

### US-021 — Remover Digimon derrotado da batalha

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero que um Digimon derrotado fique fora da batalha até o fim, para que perder HP tenha consequência real.

**Critérios de aceite:**

- Dado que um Digimon chega a 0 HP, então ele deve parar de atacar.
- Dado que um Digimon derrotado possui MP cheio, então o especial não deve poder ser usado.
- Dado que a batalha termina, então o estado pós-batalha deve ser resolvido conforme a regra de vitória ou derrota.

---

### US-022 — Resolver derrota total do time

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero que a derrota do meu time tenha consequência clara, para entender que preciso fortalecer meus Digimons antes de avançar.

**Critérios de aceite:**

- Dado que os 3 Digimons do time chegam a 0 HP, então a batalha deve ser perdida.
- Dado que a batalha é perdida, então o jogador deve retornar para a localização anterior.
- Dado que auto-progress está ativo, então ele deve ser interrompido ou pausado após derrota.

---

### US-023 — Carregar MP por ataque automático

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero que cada Digimon carregue MP ao atacar, para liberar seu especial ao longo da batalha.

**Critérios de aceite:**

- Dado que uma batalha começa, então o MP de cada Digimon deve iniciar em 0%.
- Dado que um Digimon realiza ataque automático, então seu MP deve aumentar em 5%.
- Dado que o MP chega a 100%, então o especial deve ficar disponível para ativação.

---

### US-024 — Usar especial do Digimon

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero ativar o especial de um Digimon quando o MP estiver cheio, para causar dano alto no inimigo.

**Critérios de aceite:**

- Dado que o MP está em 100%, quando o jogador clica no especial, então o ataque especial deve ser executado.
- Dado que o especial é usado, então o dano base deve ser 200% do maior stat entre ATK total e INT total.
- Dado que o especial é usado, então o MP deve voltar para 0%.
- Dado que o especial é calculado, então attribute, element, vantagens e resistências devem ser considerados.

---

### US-025 — Aplicar vantagem de attribute e element

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero que attribute e element influenciem o dano, para montar times mais estratégicos por localização.

**Critérios de aceite:**

- Dado que um ataque é calculado, então o sistema deve considerar attribute do atacante e defensor.
- Dado que um ataque possui element, então o sistema deve considerar resistência ou fraqueza elemental.
- Dado que há vantagem ou desvantagem, então o dano final deve refletir essa diferença de forma visível ou consultável.

---

### US-026 — Enfrentar boss de localização

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero enfrentar bosses em localizações específicas, para ter marcos de progressão e desbloquear novas áreas.

**Critérios de aceite:**

- Dado que o jogador cumpre o requisito para desafiar o boss, então o boss deve ficar disponível.
- Dado que o boss é derrotado, então o progresso da localização deve ser atualizado.
- Dado que a próxima localização exige boss derrotado, então o desbloqueio deve considerar essa vitória.

---

### US-027 — Ativar progressão automática

**Fase:** Fase 2 — MVP local  
**Prioridade:** P2  
**Story:** Como jogador, quero ativar progressão automática, para avançar por localizações elegíveis sem precisar trocar manualmente toda hora.

**Critérios de aceite:**

- Dado que auto-progress está ativo, quando os requisitos da próxima localização forem cumpridos, então o jogo deve avançar automaticamente.
- Dado que o jogador perde uma batalha, então auto-progress deve ser pausado ou desligado.
- Dado que a próxima localização não está desbloqueada, então o jogador deve continuar na localização atual.

---

## E05 — Drops, inventário e economia

### US-028 — Receber recompensas ao vencer batalha

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero receber XP, bits e drops ao vencer batalhas, para progredir e alimentar os sistemas do jogo.

**Critérios de aceite:**

- Dado que o inimigo é derrotado, então o jogador deve receber as recompensas configuradas para aquele inimigo/localização.
- Dado que há chance de drop, então o sistema deve sortear itens conforme tabela configurada.
- Dado que a recompensa é recebida, então inventário, bits e XP devem ser atualizados.

---

### US-029 — Coletar Essence por tipo

**Fase:** Fase 2 — MVP local  
**Prioridade:** P0  
**Story:** Como jogador, quero coletar Essence de diferentes tipos, para usar em hatching, evolução, treinamento e missões.

**Critérios de aceite:**

- Dado que um inimigo possui tipo principal, então ele pode dropar Essence compatível.
- Dado que Essence é recebida, então ela deve ser adicionada ao inventário.
- Dado que uma ação exige Essence, então o sistema deve validar quantidade disponível antes de permitir a ação.

---

### US-030 — Coletar eggs por tipo e raridade

**Fase:** Fase 2 — MVP local  
**Prioridade:** P0  
**Story:** Como jogador, quero coletar eggs com tipo e raridade, para tentar chocar novos Digimons.

**Critérios de aceite:**

- Dado que um inimigo pode dropar egg, então o egg deve ter tipo e raridade.
- Dado que o egg é recebido, então ele deve entrar no inventário de eggs.
- Dado que o jogador visualiza eggs, então deve ver se estão escaneados ou não.

---

### US-031 — Visualizar inventário

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero visualizar meu inventário completo, para gerenciar Essence, eggs, itens de amizade, boosts e itens especiais.

**Critérios de aceite:**

- Dado que o jogador abre o inventário, então deve ver itens agrupados por categoria.
- Dado que um item possui quantidade, então a quantidade atual deve ser exibida.
- Dado que um item pode ser usado ou vendido, então as ações disponíveis devem ser indicadas.

---

### US-032 — Ganhar bits

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero ganhar bits por batalhas e missões, para usar em scanner, lojas e progressão.

**Critérios de aceite:**

- Dado que o jogador vence uma batalha, então deve receber bits conforme configuração.
- Dado que uma missão concede bits, então a recompensa deve ser adicionada ao saldo ao concluir.
- Dado que o jogador gasta bits, então o saldo deve ser reduzido corretamente.

---

### US-033 — Vender itens

**Fase:** Fase 2 — MVP local  
**Prioridade:** P2  
**Story:** Como jogador, quero vender itens permitidos, para converter excedentes em bits.

**Critérios de aceite:**

- Dado que um item é vendável, então o jogador deve ver seu valor de venda.
- Dado que o jogador confirma a venda, então a quantidade do item deve diminuir e os bits aumentar.
- Dado que um item não é vendável, então a opção de venda não deve ser exibida ou deve estar bloqueada.

---

## E06 — Scanner, eggs e hatching

### US-034 — Escanear egg com bits

**Fase:** Fase 2 — MVP local  
**Prioridade:** P0  
**Story:** Como jogador, quero escanear um egg pagando bits, para descobrir qual Digimon ele contém.

**Critérios de aceite:**

- Dado que o jogador possui um egg não escaneado e bits suficientes, quando escaneia, então o sistema deve revelar o Digimon contido.
- Dado que o jogador não possui bits suficientes, então o scan deve ser bloqueado.
- Dado que o egg foi escaneado, então ele deve manter seu resultado até ser chocado, quebrado ou descartado.

---

### US-035 — Inserir Essence no egg

**Fase:** Fase 2 — MVP local  
**Prioridade:** P0  
**Story:** Como jogador, quero inserir Essence em um egg escaneado, para avançar o processo de hatching.

**Critérios de aceite:**

- Dado que o egg está escaneado, então o jogador pode tentar inserir Essence.
- Dado que o jogador não possui Essence suficiente para a tentativa, então a inserção deve ser bloqueada.
- Dado que a tentativa acontece, então o sistema deve consumir a Essence necessária da tentativa.

---

### US-036 — Resolver sucesso, falha e quebra na inserção

**Fase:** Fase 2 — MVP local  
**Prioridade:** P0  
**Story:** Como jogador, quero que cada inserção tenha chance de acerto, falha e quebra, para sentir risco real ao tentar ovos melhores.

**Critérios de aceite:**

- Dado que a primeira inserção é tentada, então as chances devem ser 90% acerto, 9% falha e 1% quebra.
- Dado que a segunda inserção é tentada, então as chances devem ser 75% acerto, 20% falha e 5% quebra.
- Dado que a terceira inserção é tentada, então as chances devem ser 60% acerto, 32% falha e 8% quebra.
- Dado que a quarta inserção é tentada, então as chances devem ser 30% acerto, 40% falha e 30% quebra.
- Dado que a quinta inserção é tentada, então as chances devem ser 10% acerto, 50% falha e 40% quebra.

---

### US-037 — Manter egg intacto em falha

**Fase:** Fase 2 — MVP local  
**Prioridade:** P0  
**Story:** Como jogador, quero que uma falha perca apenas a Essence da tentativa, para que o risco de continuar não seja sempre perda total.

**Critérios de aceite:**

- Dado que a inserção falha, então o egg deve continuar existindo.
- Dado que a inserção falha, então as inserções bem-sucedidas anteriores devem permanecer.
- Dado que a inserção falha, então apenas a Essence daquela tentativa deve ser perdida.

---

### US-038 — Perder egg em quebra

**Fase:** Fase 2 — MVP local  
**Prioridade:** P0  
**Story:** Como jogador, quero que a quebra destrua o egg, para que tentar 4/5 e 5/5 seja uma decisão de risco/recompensa.

**Critérios de aceite:**

- Dado que a inserção resulta em quebra, então o egg deve ser removido do inventário.
- Dado que o egg quebra, então todas as Essences inseridas devem ser consideradas perdidas.
- Dado que o processo termina por quebra, então o jogador deve receber feedback claro.

---

### US-039 — Chocar egg com 3/5, 4/5 ou 5/5

**Fase:** Fase 2 — MVP local  
**Prioridade:** P0  
**Story:** Como jogador, quero chocar o egg com 3, 4 ou 5 inserções bem-sucedidas, para decidir entre segurança e bônus maior.

**Critérios de aceite:**

- Dado que o egg possui 3 inserções bem-sucedidas, então o jogador pode chocar o Digimon.
- Dado que o egg possui 4 inserções bem-sucedidas, então o Digimon deve nascer com bônus moderado de status base.
- Dado que o egg possui 5 inserções bem-sucedidas, então o Digimon deve nascer com bônus máximo de status base.

---

### US-040 — Definir personality ao chocar

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero que a personality seja definida quando o egg choca, para que cada Digimon nasça com uma característica própria.

**Critérios de aceite:**

- Dado que o egg é chocado, então o sistema deve sortear ou definir uma personality válida.
- Dado que a personality foi definida, então ela deve ser exibida nos detalhes do Digimon.
- Dado que o Digimon evolui ou degenera, então a personality deve ser mantida.

---

### US-041 — Usar item de proteção de egg

**Fase:** Fase 2 — MVP local  
**Prioridade:** P2  
**Story:** Como jogador, quero usar itens como Backup de Egg ou Hatch Stabilizer, para reduzir riscos ou proteger tentativas importantes de hatching.

**Critérios de aceite:**

- Dado que o jogador possui um item aplicável, então deve poder usá-lo antes de uma tentativa.
- Dado que o item modifica chance ou consequência, então o sistema deve aplicar a regra configurada.
- Dado que o item é usado, então ele deve ser consumido do inventário.

---

## E07 — Ilha Digital

### US-042 — Enviar Digimon para treinamento de status

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero enviar Digimons para treino de status na Ilha Digital, para fortalecê-los fora do time ativo.

**Critérios de aceite:**

- Dado que há slot disponível de treino de status, então o jogador pode iniciar o treinamento.
- Dado que o treino é iniciado, então o Digimon não deve participar do time ativo enquanto estiver treinando.
- Dado que o tempo de treino termina, então o Digimon deve receber o benefício configurado.

---

### US-043 — Enviar Digimon para treinamento de amizade

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero enviar Digimons para treino de amizade, para aumentar vínculo de forma planejada.

**Critérios de aceite:**

- Dado que há slot disponível de amizade, então o jogador pode iniciar o treino.
- Dado que o treino termina, então a amizade do Digimon deve aumentar respeitando limites e parâmetros.
- Dado que a amizade já está em 100%, então o treino não deve ultrapassar esse limite.

---

### US-044 — Enviar Digimon para treinamento de XP por tipo

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero treinar XP por tipo na Ilha Digital, para cumprir requisitos de evolução sem depender apenas de batalhas.

**Critérios de aceite:**

- Dado que o jogador escolhe um tipo de XP, então o treino deve registrar esse tipo.
- Dado que o treino termina, então o Digimon deve receber XP do tipo escolhido.
- Dado que o Digimon evolui ou degenera futuramente, então esse XP por tipo deve ser removido conforme regra do briefing.

---

### US-045 — Enviar Digimon para busca por itens

**Fase:** Fase 2 — MVP local  
**Prioridade:** P2  
**Story:** Como jogador, quero enviar Digimons para buscar itens, para obter recursos extras enquanto continuo batalhando.

**Critérios de aceite:**

- Dado que há slot disponível de busca, então o jogador pode iniciar uma busca por itens.
- Dado que a busca termina, então o sistema deve sortear recompensas conforme tabela configurada.
- Dado que o jogador coleta a busca, então os itens devem ir para o inventário.

---

### US-046 — Enviar Digimon para missões automáticas

**Fase:** Fase 2 — MVP local  
**Prioridade:** P2  
**Story:** Como jogador, quero enviar Digimons para missões automáticas, para gerar progresso alternativo e dar utilidade à Ilha Digital.

**Critérios de aceite:**

- Dado que há slot disponível, então o jogador pode iniciar uma missão automática.
- Dado que a missão exige requisitos, então o sistema deve validar Digimon, level, tipo ou stats antes de iniciar.
- Dado que a missão termina, então o jogador deve receber recompensas ou feedback de sucesso/falha conforme configuração.

---

### US-047 — Respeitar 3 slots por tipo de treinamento

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como sistema, quero limitar cada tipo de ação da Ilha Digital a 3 slots iniciais, para criar escolhas sobre onde alocar Digimons.

**Critérios de aceite:**

- Dado que 3 slots de um tipo estão ocupados, então o jogador não pode iniciar outro treino daquele tipo.
- Dado que um slot é liberado, então uma nova ação daquele tipo pode ser iniciada.
- Dado que traits ou itens futuros expandem slots, então o limite deve ser lido de parâmetro do save ou configuração.

---

## E08 — Evolução e degeneração

### US-048 — Visualizar árvore evolutiva

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero visualizar a árvore evolutiva de um Digimon, para planejar caminhos de evolução e degeneração.

**Critérios de aceite:**

- Dado que o jogador abre a árvore, então deve ver formas disponíveis, bloqueadas e conhecidas.
- Dado que uma forma possui requisitos, então o jogador deve conseguir consultar esses requisitos.
- Dado que uma forma ainda não é conhecida, então o jogo pode ocultar ou indicar parcialmente suas informações conforme design futuro.

---

### US-049 — Evoluir Digimon quando requisitos forem cumpridos

**Fase:** Fase 2 — MVP local  
**Prioridade:** P0  
**Story:** Como jogador, quero evoluir um Digimon quando cumprir os requisitos, para acessar formas mais fortes e novos caminhos de progressão.

**Critérios de aceite:**

- Dado que o Digimon cumpre todos os requisitos da forma alvo, então a evolução deve estar disponível.
- Dado que o jogador confirma a evolução, então o sistema deve calcular cumulative antes de alterar a forma.
- Dado que o Digimon evolui, então level deve voltar para 1, amizade e personality devem ser mantidas, e XP por tipo deve ser removido.

---

### US-050 — Degenerar Digimon para forma conhecida

**Fase:** Fase 2 — MVP local  
**Prioridade:** P0  
**Story:** Como jogador, quero degenerar um Digimon para uma forma conhecida, para acumular status e explorar outros caminhos evolutivos.

**Critérios de aceite:**

- Dado que a forma de destino é conhecida globalmente pela conta, então ela pode ser candidata à degeneração.
- Dado que o Digimon cumpre os requisitos da forma de destino, então a degeneração pode ser realizada.
- Dado que o Digimon degenera, então level deve voltar para 1, amizade e personality devem ser mantidas, e XP por tipo deve ser removido.

---

### US-051 — Registrar formas conhecidas globalmente

**Fase:** Fase 2 — MVP local  
**Prioridade:** P0  
**Story:** Como jogador, quero que formas obtidas sejam registradas globalmente, para que outros Digimons possam usar essas formas em evolução ou degeneração quando cumprirem requisitos.

**Critérios de aceite:**

- Dado que o jogador obtém uma forma pela primeira vez, então ela deve ser marcada como conhecida na conta.
- Dado que outro Digimon consulta uma evolução ou degeneração para essa forma, então o sistema deve considerar o desbloqueio global.
- Dado que o save é carregado, então as formas conhecidas devem persistir.

---

### US-052 — Calcular status cumulativo por amizade

**Fase:** Fase 2 — MVP local  
**Prioridade:** P0  
**Story:** Como sistema, quero calcular status cumulativo herdado com base na amizade, para recompensar vínculo antes de evoluir ou degenerar.

**Critérios de aceite:**

- Dado que a amizade é 0%, então o percentual herdado deve ser 0%.
- Dado que a amizade está entre 1% e 33%, então o percentual herdado deve ser 5%.
- Dado que a amizade está entre 34% e 67%, então o percentual herdado deve ser 8%.
- Dado que a amizade está entre 68% e 100%, então o percentual herdado deve ser 10%.
- Dado que o cumulative de um stat chegaria acima de 9999, então ele deve ser limitado a 9999.

---

### US-053 — Validar múltiplos tipos de requisito evolutivo

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como Product Owner, quero configurar requisitos variados de evolução, para criar árvores coerentes e estratégicas.

**Critérios de aceite:**

- Dado que uma forma exige level, stats, amizade, XP por tipo, item, missão, localização, boss ou forma conhecida, então o sistema deve conseguir validar esses requisitos.
- Dado que um requisito não é cumprido, então o jogador deve ver o que falta.
- Dado que novos tipos de requisitos forem adicionados no futuro, então a estrutura deve permitir extensão sem reescrever toda a árvore.

---

## E09 — Trainer level e traits

### US-054 — Ganhar XP de treinador

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero ganhar XP de treinador em batalhas e missões, para desbloquear pontos de traits.

**Critérios de aceite:**

- Dado que o jogador vence batalhas, então deve receber XP de treinador conforme configuração.
- Dado que uma missão concede XP de treinador, então a recompensa deve ser aplicada ao concluir.
- Dado que o XP atinge o necessário, então o trainer level deve subir.

---

### US-055 — Receber pontos de traits ao subir trainer level

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero receber pontos de traits ao subir meu level de treinador, para melhorar minha conta de forma permanente.

**Critérios de aceite:**

- Dado que o treinador sobe de level, então deve receber pontos conforme regra configurada.
- Dado que pontos estão disponíveis, então o jogador deve conseguir gastá-los na árvore de traits.
- Dado que pontos foram gastos, então o saldo deve ser atualizado.

---

### US-056 — Visualizar árvore de traits

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero visualizar a árvore de traits, para escolher entre buffs de combate, vínculo, hatching, exploração e Ilha Digital.

**Critérios de aceite:**

- Dado que o jogador abre o menu de traits, então deve ver os ramos disponíveis.
- Dado que uma trait tem descrição e efeito, então essas informações devem ser exibidas.
- Dado que uma trait está bloqueada por dependência, então a UI deve indicar o motivo.

---

### US-057 — Desbloquear trait respeitando dependências

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero desbloquear traits conectadas a outras já liberadas, para evoluir minha conta por uma árvore de escolhas.

**Critérios de aceite:**

- Dado que o jogador possui pontos suficientes e cumpriu dependências, então pode desbloquear a trait.
- Dado que uma dependência não foi cumprida, então a trait deve permanecer bloqueada.
- Dado que a trait é desbloqueada, então seu buff deve passar a afetar o sistema correspondente.

---

### US-058 — Resetar traits com item

**Fase:** Fase 2 — MVP local  
**Prioridade:** P2  
**Story:** Como jogador, quero resetar minha árvore de traits usando um item, para testar outras estratégias de progressão.

**Critérios de aceite:**

- Dado que o jogador possui o item de reset, então pode resetar a árvore.
- Dado que o reset é confirmado, então traits desbloqueadas devem ser removidas e pontos devolvidos.
- Dado que o reset acontece, então o item deve ser consumido.

---

## E10 — Mapa, localizações e progressão

### US-059 — Visualizar mapa do Digimundo

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero visualizar o mapa do Digimundo com regiões lineares, para entender minha progressão atual e próximas áreas.

**Critérios de aceite:**

- Dado que o jogador abre o mapa, então deve ver localizações desbloqueadas, bloqueadas e atual.
- Dado que uma localização está bloqueada, então seus requisitos devem ser exibidos quando permitido.
- Dado que uma localização está desbloqueada, então o jogador deve poder selecioná-la.

---

### US-060 — Desbloquear localização por requisitos

**Fase:** Fase 2 — MVP local  
**Prioridade:** P0  
**Story:** Como jogador, quero desbloquear localizações cumprindo requisitos, para sentir progressão pelo Digimundo.

**Critérios de aceite:**

- Dado que uma localização exige trainer level, batalhas, boss ou missão, então o sistema deve validar esses requisitos.
- Dado que todos os requisitos são cumpridos, então a localização deve ser desbloqueada.
- Dado que falta requisito, então a localização deve permanecer bloqueada.

---

### US-061 — Jogar Village of Beginnings

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como jogador, quero iniciar em Village of Beginnings, para aprender o básico de batalha, time, drops e progressão.

**Critérios de aceite:**

- Dado que o jogador começa o jogo, então Village of Beginnings deve ser a localização inicial.
- Dado que o jogador batalha nessa localização, então os inimigos devem vir da lista configurada para a área.
- Dado que a localização possui tutorial, então ele deve apresentar conceitos essenciais sem bloquear demais o jogo.

---

### US-062 — Jogar File Forest

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero desbloquear e jogar File Forest, para começar uma área real de farm com eggs e Essence.

**Critérios de aceite:**

- Dado que os requisitos de File Forest foram cumpridos, então ela deve ficar disponível no mapa.
- Dado que o jogador batalha em File Forest, então deve encontrar inimigos e drops configurados para a área.
- Dado que a área possui boss, então ele deve ser usado como marco de progressão.

---

### US-063 — Jogar Native Forest

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero desbloquear e jogar Native Forest, para enfrentar maior dificuldade e começar a usar melhor vantagens de attribute e element.

**Critérios de aceite:**

- Dado que Native Forest está bloqueada, então o jogador deve ver o que falta para acessá-la.
- Dado que a área é desbloqueada, então pode ser selecionada no mapa.
- Dado que o jogador batalha na área, então inimigos e bosses devem ser mais desafiadores que nas áreas anteriores.

---

## E11 — Missões e narrativa

### US-064 — Receber missão principal narrativa

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero receber missões principais com narrativa, para ter contexto e direção enquanto avanço no jogo.

**Critérios de aceite:**

- Dado que o jogador inicia uma etapa de progressão, então uma missão principal deve orientar o próximo objetivo.
- Dado que a missão possui texto narrativo, então ele deve usar chaves de tradução.
- Dado que a missão é concluída, então a próxima etapa ou recompensa deve ser liberada.

---

### US-065 — Acompanhar progresso de missão

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero acompanhar o progresso das missões, para saber o que falta fazer.

**Critérios de aceite:**

- Dado que uma missão exige derrotas, drops, boss ou localização, então o progresso deve ser atualizado automaticamente.
- Dado que a missão está ativa, então um resumo deve aparecer na tela principal.
- Dado que a missão tem múltiplos objetivos, então cada objetivo deve ter progresso separado.

---

### US-066 — Receber recompensas de missão

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero resgatar recompensas ao concluir missões, para sentir que objetivos narrativos valem a pena.

**Critérios de aceite:**

- Dado que a missão foi concluída, então suas recompensas devem ficar disponíveis.
- Dado que o jogador resgata a missão, então bits, itens, XP ou desbloqueios devem ser aplicados.
- Dado que a recompensa já foi resgatada, então não deve ser possível resgatá-la novamente.

---

### US-067 — Receber missões diárias e semanais

**Fase:** Fase 4 — Online Progression  
**Prioridade:** P2  
**Story:** Como jogador, quero receber missões diárias e semanais, para ter objetivos recorrentes na versão online.

**Critérios de aceite:**

- Dado que o jogador acessa a versão online, então missões diárias e semanais devem ser disponibilizadas conforme calendário.
- Dado que o período de uma missão expira, então ela deve ser renovada ou encerrada.
- Dado que a missão é concluída dentro do prazo, então a recompensa deve ser liberada uma única vez.

---

### US-068 — Participar de missão global

**Fase:** Fase 4 — Online Progression  
**Prioridade:** P2  
**Story:** Como jogador, quero contribuir com missões globais, para participar de objetivos coletivos com outros jogadores.

**Critérios de aceite:**

- Dado que uma missão global está ativa, então minhas ações elegíveis devem contribuir com o progresso total.
- Dado que o objetivo global é alcançado, então recompensas globais ou eventos devem ser liberados.
- Dado que a missão global depende de backend, então o progresso deve ser validado no servidor.

---

## E12 — Lojas e itens utilizáveis

### US-069 — Acessar loja em cidade/localização

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero acessar lojas em cidades tratadas como localizações, para comprar itens úteis com bits.

**Critérios de aceite:**

- Dado que uma localização possui loja, então o jogador deve conseguir acessá-la.
- Dado que a localização está bloqueada, então sua loja também deve estar bloqueada.
- Dado que o jogador compra um item, então bits devem ser consumidos e o item deve entrar no inventário.

---

### US-070 — Comprar item de amizade

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como jogador, quero comprar e usar itens de amizade, para acelerar de forma limitada o vínculo com meus Digimons.

**Critérios de aceite:**

- Dado que o jogador possui bits suficientes, então pode comprar o item.
- Dado que o item é usado em um Digimon, então a amizade deve aumentar conforme configuração.
- Dado que a amizade está próxima de 100%, então o ganho deve respeitar o limite máximo.

---

### US-071 — Usar boost de XP

**Fase:** Fase 2 — MVP local  
**Prioridade:** P2  
**Story:** Como jogador, quero usar boost de XP, para acelerar temporariamente o crescimento dos meus Digimons ou treinador.

**Critérios de aceite:**

- Dado que o jogador usa o boost, então o efeito deve ficar ativo por duração ou quantidade configurada.
- Dado que o efeito está ativo, então ganhos elegíveis devem ser modificados.
- Dado que o efeito expira, então o buff deve ser removido automaticamente.

---

### US-072 — Usar chip de treino

**Fase:** Fase 2 — MVP local  
**Prioridade:** P2  
**Story:** Como jogador, quero usar chips de treino, para melhorar resultados ou reduzir tempo de ações na Ilha Digital.

**Critérios de aceite:**

- Dado que o jogador possui chip aplicável, então pode usá-lo em um treino elegível.
- Dado que o chip é aplicado, então o treino deve receber o modificador configurado.
- Dado que o chip foi usado, então ele deve ser consumido.

---

## E13 — Progressão offline

### US-073 — Calcular progresso offline limitado

**Fase:** Fase 2 — MVP local  
**Prioridade:** P2  
**Story:** Como jogador, quero receber progresso offline limitado, para continuar evoluindo mesmo quando não estou com o jogo aberto.

**Critérios de aceite:**

- Dado que o jogador retorna após um período offline, então o sistema deve calcular ganhos com base no tempo ausente.
- Dado que há limite máximo de horas offline, então o cálculo deve respeitar esse limite.
- Dado que a taxa offline é menor que online, então os ganhos devem ser reduzidos conforme parâmetros.

---

### US-074 — Exibir resumo de progresso offline

**Fase:** Fase 2 — MVP local  
**Prioridade:** P2  
**Story:** Como jogador, quero ver um resumo do que ganhei offline, para entender o progresso acumulado.

**Critérios de aceite:**

- Dado que há progresso offline, então o jogo deve exibir um resumo ao retornar.
- Dado que houve ganhos de bits, XP ou drops, então eles devem aparecer separados por categoria.
- Dado que não houve progresso relevante, então o jogo deve informar de forma simples.

---

## E14 — Online Alpha e integridade

### US-075 — Criar conta

**Fase:** Fase 3 — Online Alpha  
**Prioridade:** P2  
**Story:** Como jogador, quero criar uma conta, para salvar meu progresso na nuvem.

**Critérios de aceite:**

- Dado que o jogador acessa a versão online, então deve poder criar uma conta com credenciais válidas.
- Dado que a conta é criada, então um perfil de jogador deve ser inicializado.
- Dado que há erro de validação, então o jogador deve receber mensagem clara.

---

### US-076 — Fazer login

**Fase:** Fase 3 — Online Alpha  
**Prioridade:** P2  
**Story:** Como jogador, quero fazer login, para acessar meu save online em diferentes dispositivos.

**Critérios de aceite:**

- Dado que o jogador possui conta, então deve conseguir autenticar.
- Dado que o login é bem-sucedido, então o save online deve ser carregado.
- Dado que a autenticação falha, então o jogo deve informar sem expor detalhes sensíveis.

---

### US-077 — Migrar save local para cloud save

**Fase:** Fase 3 — Online Alpha  
**Prioridade:** P2  
**Story:** Como jogador, quero migrar meu save local para a nuvem, para continuar minha progressão na versão online.

**Critérios de aceite:**

- Dado que o jogador possui save local e está logado, então deve poder iniciar migração.
- Dado que a migração é confirmada, então o backend deve validar e persistir o estado.
- Dado que há conflito entre save local e online, então o jogador deve escolher qual manter, ou o sistema deve aplicar uma regra clara.

---

### US-078 — Salvar eventos consolidados no backend

**Fase:** Fase 3 — Online Alpha  
**Prioridade:** P2  
**Story:** Como sistema, quero salvar eventos consolidados no backend, para não depender do banco como motor de cada clique ou tick.

**Critérios de aceite:**

- Dado que uma batalha termina, então o backend deve receber e validar o resultado consolidado.
- Dado que uma ação sensível ocorre, como hatching, evolução ou compra, então ela deve ser persistida como evento relevante.
- Dado que o jogador clica rapidamente, então cada clique individual não deve gerar escrita direta no banco.

---

### US-079 — Validar RNG sensível no servidor

**Fase:** Fase 3 — Online Alpha  
**Prioridade:** P2  
**Story:** Como sistema, quero que RNG sensível seja calculado no servidor, para reduzir manipulação de drops raros, hatching e recompensas importantes.

**Critérios de aceite:**

- Dado que uma inserção de egg ocorre online, então sucesso, falha ou quebra deve ser definido pelo servidor.
- Dado que um drop raro é elegível, então o servidor deve validar o sorteio.
- Dado que uma recompensa de boss é concedida, então o backend deve registrar e impedir duplicação.

---

### US-080 — Persistir dados online em PostgreSQL

**Fase:** Fase 3 — Online Alpha  
**Prioridade:** P2  
**Story:** Como sistema, quero persistir contas, saves, inventário, Digimons, missões, traits e histórico em PostgreSQL, para garantir consistência da versão online.

**Critérios de aceite:**

- Dado que o jogador possui conta online, então seus dados principais devem ser persistidos no banco.
- Dado que uma transação modifica inventário e bits, então a operação deve manter consistência.
- Dado que há erro ao salvar, então o sistema deve evitar duplicação ou perda silenciosa de recursos.

---

### US-081 — Aplicar rate limit em ações sensíveis

**Fase:** Fase 3 — Online Alpha  
**Prioridade:** P2  
**Story:** Como sistema, quero aplicar rate limit em ações sensíveis, para reduzir abuso e repetição indevida de requisições.

**Critérios de aceite:**

- Dado que uma ação sensível é chamada repetidamente em curto intervalo, então o sistema deve limitar requisições.
- Dado que o jogador excede o limite, então deve receber resposta apropriada.
- Dado que ações normais de UI acontecem, então o rate limit não deve prejudicar a experiência legítima.

---

### US-082 — Usar Redis para cache e locks

**Fase:** Fase 3 — Online Alpha  
**Prioridade:** P3  
**Story:** Como sistema, quero usar Redis para cache, locks, sessões temporárias e rate limit, para melhorar desempenho e integridade da versão online.

**Critérios de aceite:**

- Dado que uma ação crítica pode ser enviada em duplicidade, então um lock deve impedir processamento simultâneo indevido.
- Dado que dados de catálogo ou sessão são acessados com frequência, então podem ser cacheados.
- Dado que o cache expira, então o sistema deve buscar dados oficiais sem quebrar o fluxo.

---

## E15 — Roadmap avançado

### US-083 — Implementar Jogress

**Fase:** Fase 5 — Sistemas avançados  
**Prioridade:** P3  
**Story:** Como jogador, quero realizar Jogress usando Digimons específicos, para obter formas especiais mais poderosas.

**Critérios de aceite:**

- Dado que a Jogress exige dois ou mais Digimons, então o sistema deve validar todos os requisitos.
- Dado que a Jogress é confirmada, então os Digimons usados devem ser consumidos conforme regra definida.
- Dado que a nova forma é obtida, então ela deve ser registrada como conhecida globalmente.

---

### US-084 — Implementar Armor Evolution

**Fase:** Fase 5 — Sistemas avançados  
**Prioridade:** P3  
**Story:** Como jogador, quero usar Digi-Egg/Armor Evolution como forma alternativa, para expandir possibilidades evolutivas sem tratar tudo como linha comum.

**Critérios de aceite:**

- Dado que o jogador possui item ou requisito de Armor, então a forma alternativa deve ficar disponível.
- Dado que a forma alternativa é ativada, então ela deve respeitar regras próprias de evolução.
- Dado que a forma é obtida, então deve ser exibida na árvore de forma diferenciada.

---

### US-085 — Implementar Digi-Espírito

**Fase:** Fase 5 — Sistemas avançados  
**Prioridade:** P3  
**Story:** Como jogador, quero desbloquear evoluções por Digi-Espírito, para acessar formas especiais de eventos ou missões avançadas.

**Critérios de aceite:**

- Dado que uma evolução exige Digi-Espírito, então o requisito deve ser validável pela estrutura de evolução.
- Dado que o jogador obtém o espírito necessário, então a evolução deve ficar disponível se os demais requisitos forem cumpridos.
- Dado que a forma é especial, então a UI deve diferenciá-la das evoluções comuns.

---

### US-086 — Implementar Mega 2, Burst ou Ultra

**Fase:** Fase 5 — Sistemas avançados  
**Prioridade:** P3  
**Story:** Como jogador, quero alcançar formas Mega 2, Burst ou Ultra, para ter objetivos de longo prazo após Mega 1.

**Critérios de aceite:**

- Dado que uma forma Mega 2 possui requisitos altos, então eles devem ser exibidos e validados.
- Dado que o jogador alcança a forma, então ela deve ter nível evolutivo 7.
- Dado que a forma possui condição especial, então essa condição deve ser suportada pela estrutura de requisitos.

---

### US-087 — Participar de eventos temporários

**Fase:** Fase 4 — Online Progression  
**Prioridade:** P3  
**Story:** Como jogador, quero participar de eventos temporários, para ter objetivos sazonais, drops especiais e novas formas.

**Critérios de aceite:**

- Dado que um evento está ativo, então conteúdo, missões e recompensas do evento devem aparecer no jogo.
- Dado que o evento expira, então novos progressos devem ser bloqueados ou encerrados conforme regra.
- Dado que o jogador recebeu recompensas de evento, então elas devem permanecer no save conforme configuração.

---

### US-088 — Visualizar ranking simples

**Fase:** Fase 4 — Online Progression  
**Prioridade:** P3  
**Story:** Como jogador, quero visualizar rankings simples, para comparar progresso com outros jogadores na versão online.

**Critérios de aceite:**

- Dado que ranking está habilitado, então o jogador deve ver classificação por critério definido.
- Dado que o ranking é atualizado, então dados devem vir do backend.
- Dado que o jogador não quer aparecer publicamente futuramente, então deve existir uma estratégia de privacidade antes de rankings amplos.

---

### US-089 — Participar de guilda

**Fase:** Fase 6 — Social futuro  
**Prioridade:** P3  
**Story:** Como jogador, quero participar de uma guilda, para colaborar com outros jogadores em objetivos coletivos.

**Critérios de aceite:**

- Dado que guildas estão disponíveis, então o jogador pode criar ou entrar em uma guilda.
- Dado que uma missão de guilda está ativa, então membros podem contribuir.
- Dado que recompensas de guilda são distribuídas, então o backend deve validar participação.

---

### US-090 — Realizar PvP assíncrono

**Fase:** Fase 6 — Social futuro  
**Prioridade:** P3  
**Story:** Como jogador, quero disputar PvP assíncrono, para testar meu time contra times de outros jogadores sem exigir combate em tempo real.

**Critérios de aceite:**

- Dado que PvP assíncrono está disponível, então o jogador pode desafiar um time salvo de outro jogador.
- Dado que a batalha ocorre, então o sistema deve simular o combate com regras consistentes.
- Dado que há recompensa ou ranking, então o resultado deve ser validado pelo backend.

---

### US-091 — Usar mercado entre jogadores

**Fase:** Fase 6 — Social futuro  
**Prioridade:** P3  
**Story:** Como jogador, quero usar um mercado entre jogadores, para negociar itens permitidos com segurança.

**Critérios de aceite:**

- Dado que o mercado está disponível, então o jogador pode listar itens permitidos.
- Dado que outro jogador compra, então item e moeda devem ser transferidos de forma transacional.
- Dado que o item não pode ser negociado, então o sistema deve impedir a listagem.

---

## 4. Histórias técnicas de suporte ao MVP

Estas histórias não representam funcionalidades diretas do jogador, mas são necessárias para que o jogo seja sustentável e expansível.

### TS-001 — Estruturar motor de batalha desacoplado da UI

**Fase:** Fase 1 — Protótipo local  
**Prioridade:** P0  
**Story:** Como desenvolvedor, quero que o motor de batalha seja separado da interface, para facilitar balanceamento, testes manuais e futura validação no backend.

**Critérios de aceite:**

- A lógica de dano, SPD, MP, vitória e derrota não deve depender diretamente de componentes React.
- A UI deve apenas consumir o estado calculado pelo motor.
- O motor deve permitir simulação local e futura validação consolidada no servidor.

---

### TS-002 — Criar sistema genérico de requisitos

**Fase:** Fase 2 — MVP local  
**Prioridade:** P0  
**Story:** Como desenvolvedor, quero um sistema genérico de requisitos, para reutilizar validações em evolução, localização, missões, lojas e eventos.

**Critérios de aceite:**

- O sistema deve suportar requisitos como level, stats, amizade, item, missão, boss, localização, batalhas e forma conhecida.
- A UI deve conseguir exibir requisitos cumpridos e pendentes.
- Novos tipos de requisito devem poder ser adicionados sem reescrever todos os sistemas.

---

### TS-003 — Criar sistema genérico de recompensas

**Fase:** Fase 2 — MVP local  
**Prioridade:** P0  
**Story:** Como desenvolvedor, quero um sistema genérico de recompensas, para reutilizar concessões em batalhas, missões, bosses, eventos e offline progress.

**Critérios de aceite:**

- O sistema deve suportar bits, XP, Essence, eggs, itens, desbloqueios e buffs.
- Recompensas devem poder ser exibidas antes ou depois de recebidas.
- O sistema deve evitar concessão duplicada de recompensas únicas.

---

### TS-004 — Parametrizar balanceamento

**Fase:** Fase 2 — MVP local  
**Prioridade:** P1  
**Story:** Como Product Owner, quero que fórmulas e números importantes sejam parametrizados, para ajustar o jogo durante playtest sem reescrever lógica.

**Critérios de aceite:**

- Ganho de amizade, click damage, SPD, MP, drops, XP, scan, hatching e treino devem ter parâmetros configuráveis.
- O jogo deve permitir ajustes nos catálogos ou configs centrais.
- As mudanças devem ser fáceis de rastrear por versão.

---

### TS-005 — Preparar arquitetura para versão online

**Fase:** Fase 2 — MVP local  
**Prioridade:** P2  
**Story:** Como desenvolvedor, quero que o MVP local seja estruturado pensando na versão online, para reduzir retrabalho ao migrar para login, cloud save e backend.

**Critérios de aceite:**

- Ações sensíveis devem ser modeladas como eventos ou comandos claros.
- O save local deve ter estrutura próxima do futuro save online.
- RNG sensível deve estar isolado para futura substituição por RNG do servidor.

---

## 5. Ordem sugerida de implementação

### Sprint/Bloco 1 — Loop de batalha mínimo

1. US-001 — Iniciar o jogo no navegador.
2. US-002 — Criar novo save local.
3. US-005 — Carregar catálogos versionados.
4. US-006 — Visualizar tela principal moderna.
5. US-010 — Visualizar Digimons do time ativo.
6. US-013 — Calcular stats totais.
7. US-016 — Iniciar batalha contínua na localização atual.
8. US-017 — Atacar automaticamente com base em SPD.
9. US-018 — Causar dano por clique.
10. US-020 — Inimigo atacar aleatoriamente.
11. US-021 — Remover Digimon derrotado da batalha.
12. US-022 — Resolver derrota total do time.
13. US-023 — Carregar MP por ataque automático.
14. US-024 — Usar especial do Digimon.
15. US-028 — Receber recompensas ao vencer batalha.

### Sprint/Bloco 2 — Progressão básica

1. US-032 — Ganhar bits.
2. US-054 — Ganhar XP de treinador.
3. US-055 — Receber pontos de traits.
4. US-056 — Visualizar árvore de traits.
5. US-057 — Desbloquear trait respeitando dependências.
6. US-059 — Visualizar mapa do Digimundo.
7. US-060 — Desbloquear localização por requisitos.
8. US-061 — Jogar Village of Beginnings.
9. US-062 — Jogar File Forest.
10. US-063 — Jogar Native Forest.
11. US-064 — Receber missão principal narrativa.
12. US-065 — Acompanhar progresso de missão.
13. US-066 — Receber recompensas de missão.

### Sprint/Bloco 3 — Hatching e coleção

1. US-029 — Coletar Essence por tipo.
2. US-030 — Coletar eggs por tipo e raridade.
3. US-031 — Visualizar inventário.
4. US-034 — Escanear egg com bits.
5. US-035 — Inserir Essence no egg.
6. US-036 — Resolver sucesso, falha e quebra na inserção.
7. US-037 — Manter egg intacto em falha.
8. US-038 — Perder egg em quebra.
9. US-039 — Chocar egg com 3/5, 4/5 ou 5/5.
10. US-040 — Definir personality ao chocar.
11. US-014 — Aplicar personality no crescimento.
12. US-015 — Limitar storage inicial da Ilha Digital.
13. US-011 — Gerenciar time ativo.
12. US-012 — Visualizar detalhes de um Digimon.

### Sprint/Bloco 4 — Evolução, degeneração e Ilha Digital

1. US-042 — Enviar Digimon para treinamento de status.
2. US-043 — Enviar Digimon para treinamento de amizade.
3. US-044 — Enviar Digimon para treinamento de XP por tipo.
4. US-047 — Respeitar 3 slots por tipo de treinamento.
5. US-048 — Visualizar árvore evolutiva.
6. US-049 — Evoluir Digimon quando requisitos forem cumpridos.
7. US-050 — Degenerar Digimon para forma conhecida.
8. US-051 — Registrar formas conhecidas globalmente.
9. US-052 — Calcular status cumulativo por amizade.
10. US-053 — Validar múltiplos tipos de requisito evolutivo.

### Sprint/Bloco 5 — Polimento do MVP

1. US-003 — Versionar o save local.
2. US-004 — Selecionar idioma.
3. US-008 — Acessar menus separados.
4. US-009 — Receber feedback de ação importante.
5. US-019 — Aumentar amizade com cliques de apoio.
6. US-025 — Aplicar vantagem de attribute e element.
7. US-026 — Enfrentar boss de localização.
8. US-027 — Ativar progressão automática.
9. US-069 — Acessar loja em cidade/localização.
10. US-070 — Comprar item de amizade.
11. US-073 — Calcular progresso offline limitado.
12. US-074 — Exibir resumo de progresso offline.

---

## 6. Definition of Ready

Uma user story estará pronta para desenvolvimento quando:

- Tiver objetivo claro.
- Tiver critérios de aceite suficientes.
- Tiver prioridade definida.
- Tiver fase definida.
- Não depender de decisão de produto pendente.
- Possuir dados mínimos de catálogo quando necessário.
- Possuir regras de falha e bloqueio quando a ação puder ser inválida.

---

## 7. Definition of Done

Uma user story estará concluída quando:

- A funcionalidade puder ser usada no fluxo real do jogo.
- As regras descritas nos critérios de aceite forem atendidas.
- A interface apresentar feedback claro para o jogador.
- O save local for atualizado corretamente quando houver mudança de progresso.
- Textos visíveis usarem chaves de tradução.
- Fórmulas e números relevantes estiverem parametrizados quando aplicável.
- A funcionalidade não quebrar o loop principal de batalha/progressão.

---

## 8. Observações finais

Este backlog foi criado para orientar o desenvolvimento incremental do Digiclicker sem transformar o MVP em um projeto grande demais logo no início.

A prioridade deve continuar sendo validar diversão:

- O combate precisa ser gostoso de acompanhar.
- O clique precisa parecer útil.
- O hatching precisa gerar tensão.
- A evolução/degeneração precisa parecer estratégica.
- A Ilha Digital precisa ser útil.
- O jogador precisa sempre saber qual é o próximo objetivo.

Sistemas online, sociais e avançados devem ser adicionados somente depois que o loop local estiver divertido e estável.

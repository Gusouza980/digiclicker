# Digiclicker — Product Briefing

**Versão:** 1.0  
**Data:** 06/06/2026  
**Formato:** Fan game privado, web, idle + clicker  
**Status:** Briefing consolidado a partir das definições do Product Owner

---

## 1. Visão geral do produto

**Digiclicker** é um fan game privado, sem fins lucrativos, inspirado em jogos idle/clicker como PokeClicker, mas adaptado para respeitar a lógica de progressão que faz mais sentido para Digimon: evolução em árvore, degeneração, vínculo com o Digimon, treinamento fora da equipe, chocagem de ovos por inserção de materiais e progressão por regiões do Digimundo.

O objetivo principal do jogo é entregar uma experiência divertida, progressiva e viciante, em que o jogador sinta que está fortalecendo seus Digimons continuamente por meio de batalhas, cliques, treinamento, amizade, evolução, degeneração, missões e coleta de recursos.

O jogo deve evitar ser apenas uma troca visual de PokeClicker. A estrutura base pode se inspirar no modelo idle/incremental, mas o núcleo de progressão deve ser próprio e coerente com a franquia Digimon.

---

## 2. Natureza do projeto e restrições de IP

O projeto será um **fan game privado, sem fins lucrativos**, utilizando Digimons oficiais.

Por utilizar propriedade intelectual oficial de Digimon/Bandai, o projeto deve ser tratado com cautela:

- O repositório deve permanecer privado.
- O jogo não deve ser distribuído publicamente.
- Não deve haver monetização.
- Não deve haver venda de itens, assinaturas, cosméticos ou qualquer cobrança.
- Não devem ser usados logos oficiais como marca principal do projeto.
- Caso o projeto algum dia se torne público, recomenda-se substituir os Digimons oficiais por criaturas próprias inspiradas em mecânicas similares.

Referência: os termos da Bandai Namco indicam que materiais como personagens, imagens, animações, jogos e programas são protegidos por copyright e possuem restrições de uso, reprodução, edição e distribuição.

---

## 3. Plataformas e idiomas

### Plataforma inicial

- Web.
- O jogo será acessado pelo navegador.
- O MVP pode iniciar com save local.
- A versão online terá login, cloud save e persistência em backend.

### Idiomas iniciais

O jogo deverá ser multilíngue desde o início, com suporte inicial a:

- Português.
- Inglês.
- Espanhol.

### Regra de internacionalização

Nenhum texto visível ao jogador deve ficar hardcoded em componentes de interface, dados de missão, loja, localização ou mensagens de sistema.

Todo conteúdo textual deve usar chaves de tradução, por exemplo:

```ts
location.file_forest.name
mission.first_steps.description
item.dragon_essence.name
battle.special_ready
```

Essa decisão é importante porque o jogo terá missões narrativas, descrições de itens, lojas, mapas, Digimons, personalidades, traits e eventos futuros.

---

## 4. Referências de produto

### PokeClicker

PokeClicker serve como referência de gênero: jogo web idle/incremental com progressão por criaturas, regiões, quests, crescimento numérico e múltiplos sistemas paralelos.

O Digiclicker deve aproveitar essa referência apenas como inspiração de produto, não como cópia direta de estrutura, UI ou progressão.

### Digimon Masters Online

Digimon Masters Online serve como referência para o sistema de eggs, scanner, inserção de materiais, risco de falha e qualidade do Digimon chocado.

O Digiclicker usará uma versão própria desse sistema, com:

- Eggs por tipo.
- Essence por tipo.
- Scanner pago com bits.
- Inserções de Essence.
- Mínimo de 3 inserções para chocar.
- Máximo de 5 inserções para bônus máximo.
- Chance de acerto, falha e quebra.

### Digimon Story: Time Stranger

Digimon Story: Time Stranger serve como referência para:

- Personalities.
- Atributos.
- Elementos.
- Sinergia entre atributo, elemento e dano.
- Digifarm como inspiração para a Ilha Digital.
- Progressão do treinador fortalecendo os Digimons.

---

## 5. Público e experiência desejada

O jogador esperado gosta de:

- Digimon.
- Evoluções em árvore.
- Progressão de longo prazo.
- Otimização de status.
- Coleta de criaturas.
- Sistemas idle.
- Risco/recompensa.
- Farm de recursos.
- Evoluir, degenerar e testar caminhos diferentes.

A experiência deve ser construída em cima de decisões constantes, mas simples:

- Qual localização farmar?
- Qual Digimon deixar no time?
- Qual Digimon enviar para treino?
- Tentar 4/5 ou 5/5 no egg?
- Evoluir agora ou treinar mais amizade antes?
- Degenerar para acumular mais status ou avançar no mapa?
- Investir traits em dano, drop, XP, amizade, hatching ou treino?

---

## 6. Loop principal do jogo

O loop principal será:

1. O jogador escolhe uma localização no Digimundo.
2. O time de até 3 Digimons enfrenta Digimons selvagens em batalha contínua.
3. Os Digimons atacam automaticamente com base em SPD.
4. O jogador clica para causar dano adicional.
5. O jogador pode ativar especiais quando o MP dos Digimons estiver carregado.
6. O inimigo também ataca os Digimons do jogador.
7. Ao vencer batalhas, o jogador recebe XP, bits, drops, Essence, eggs e progresso de missões.
8. O jogador usa recursos para treinar, chocar ovos, evoluir, degenerar, comprar itens e liberar regiões.
9. O jogador melhora sua conta por meio de trainer level e traits.
10. O ciclo se repete com regiões, Digimons e requisitos mais difíceis.

---

## 7. Time principal e Ilha Digital

### Time ativo

O jogador poderá ter **até 3 Digimons ativos** no time.

Esses Digimons participam diretamente das batalhas e influenciam:

- Dano automático.
- Click damage.
- Velocidade de combate.
- Sobrevivência.
- Ativação de especiais.
- Progressão de amizade.

### Ilha Digital

A Ilha Digital será o local onde ficam os Digimons que não estão no time ativo.

Capacidade inicial:

- Até 50 Digimons armazenados.

Ações disponíveis na Ilha Digital no MVP:

- Treinamento de status.
- Treinamento de amizade.
- Treinamento de XP por tipo.
- Busca por itens.
- Missões automáticas.

A ação de descanso não fará parte do MVP.

### Slots de treinamento

Cada tipo de treinamento terá **3 slots iniciais**.

Exemplo:

- 3 slots para treino de status.
- 3 slots para treino de amizade.
- 3 slots para treino de XP por tipo.
- 3 slots para busca por itens.
- 3 slots para missões automáticas, se esse sistema entrar no MVP inicial.

### Regra de XP fora do time

Digimons fora do time **não ganham XP passivamente**, exceto quando estiverem especificamente em treinamento de XP.

---

## 8. Amizade

Cada Digimon individual terá amizade de **0% a 100%**.

A amizade deve subir lentamente. Ela é uma progressão de longo prazo, não um recurso fácil de maximizar.

### Fontes de amizade

A amizade poderá aumentar por:

- Participar de batalhas.
- Permanecer no time ativo.
- Receber ações específicas na Ilha Digital.
- Receber alimentação/itens de amizade.
- Treinamento de amizade.
- Cliques do treinador durante a batalha, representando o apoio direto ao Digimon.

### Regra de balanceamento

A subida de amizade deve ser parametrizada para ser lenta.

Variáveis recomendadas:

```ts
friendshipGainFromBattle
friendshipGainFromClickAssist
friendshipGainFromTraining
friendshipGainFromFood
friendshipDailySoftCap
friendshipGlobalMultiplier
```

### Amizade e status cumulativo

Ao evoluir ou degenerar, uma porcentagem do status total atual será convertida em status cumulativo da próxima forma.

Status total atual:

```txt
status_total = status_base + status_by_level + status_cumulative
```

Percentual herdado:

| Amizade | Percentual de status herdado |
|---|---:|
| 0% | 0% |
| 1% a 33% | 5% |
| 34% a 67% | 8% |
| 68% a 100% | 10% |

Observação: a faixa final foi normalizada para **68% a 100%** para evitar sobreposição com a faixa anterior.

---

## 9. Stats dos Digimons

Os Digimons terão os seguintes stats:

| Stat | Função |
|---|---|
| HP | Vida do Digimon. |
| MP | Energia usada para executar o especial. |
| ATK | Afeta dano físico causado aos inimigos. |
| DEF | Reduz dano físico recebido. |
| INT | Afeta dano mágico causado aos inimigos. |
| SPI | Reduz dano mágico recebido e influencia cura, caso skills de cura sejam adicionadas futuramente. |
| SPD | Afeta a ordem e frequência dos ataques em batalha. |

### Tipos de status

Cada stat terá três componentes:

#### 1. Base

Status natural da espécie/forma atual do Digimon.

Exemplo: Agumon, Greymon e WarGreymon terão bases diferentes.

#### 2. By level

Crescimento do status conforme o level atual do Digimon.

A fórmula poderá ser fixa no MVP, mas deve ser parametrizada para ajustes futuros.

Exemplo conceitual:

```txt
status_by_level = growth_rate_do_stat * (level - 1) * modificador_de_personality
```

#### 3. Cumulative

Status acumulado herdado por evolução e degeneração.

Esse valor representa o fortalecimento de longo prazo do Digimon por ciclos evolutivos.

Limite:

- Cada stat cumulative terá limite máximo de **9999**.
- O limite é individual por stat, não a soma total.

---

## 10. Level dos Digimons

### Level máximo

O level máximo dos Digimons será **120**.

### Reset de level

Ao evoluir ou degenerar:

- O Digimon volta para o level 1.
- Mantém amizade.
- Mantém personality.
- Não mantém XP por tipo.
- O status cumulativo é calculado antes do reset.

### XP por tipo

XP por tipo será usado como requisito de evolução e poderá ser obtido por:

- Derrotar Digimons de determinado tipo.
- Treinamento específico na Ilha Digital.
- Itens consumíveis.
- Recompensas de missão.

Ao evoluir ou degenerar, o XP por tipo não será mantido.

---

## 11. Personalities

As personalities serão copiadas/adaptadas de Digimon Story: Time Stranger.

### Regras confirmadas

- A personality será definida ao chocar o ovo.
- Não poderá ser alterada inicialmente.
- Afetará apenas o crescimento de stats por level.
- Não afetará diretamente requisitos de evolução.

### Função no Digiclicker

A personality deve tornar Digimons da mesma espécie diferentes entre si.

Exemplo:

- Um Agumon com personality focada em ATK tende a ter mais dano físico.
- Um Agumon com personality focada em DEF tende a ser mais resistente.
- Um Agumon com personality focada em INT pode ser menos ideal para uma linha física, mas útil em outra evolução alternativa.

---

## 12. Atributos, elementos e Essence

O jogo separará **Attribute** e **Element**.

### Attribute

Representa classificações como:

- Vaccine.
- Data.
- Virus.
- Free.
- Outros atributos usados em Digimon Story: Time Stranger.

### Element

Representa elementos como:

- Fire.
- Water.
- Plant.
- Earth.
- Wind.
- Electric.
- Light/Holy.
- Dark.
- Neutral.
- Outros elementos usados em Time Stranger.

### Essence

Para evitar confusão entre o atributo **Data** e o material de chocagem, os materiais dropados serão chamados de **Essence**.

Exemplos:

- Dragon Essence.
- Dark Essence.
- Holy Essence.
- Beast Essence.
- Bird Essence.
- Plant Essence.
- Machine Essence.

### Uso de Attribute, Element e Essence

Esses sistemas serão usados para:

- Cálculo de dano.
- Vantagens e desvantagens.
- Drops.
- Requisitos de evolução.
- Requisitos de hatching.
- Treinamentos específicos.
- Missões.
- Itens.

### Restrição

Cada Digimon terá apenas **um tipo principal** para fins de Essence e progressão.

---

## 13. Sistema de batalha

### Modelo de combate

O combate será um **clicker contínuo**, não um RPG por turnos tradicional.

Mesmo sendo contínuo, a ordem/frequência de ataque será influenciada por SPD.

### Participantes

- Até 3 Digimons do jogador.
- 1 Digimon selvagem por batalha no MVP.
- Bosses especiais por localização.

### Ataques automáticos

Cada Digimon do time ataca automaticamente.

A frequência de ataque será baseada em SPD:

```txt
maior SPD = menor intervalo entre ataques
```

A fórmula exata deve ser parametrizada para balanceamento.

### Ataque do inimigo

O Digimon selvagem também ataca.

Regra de alvo:

- O alvo será escolhido aleatoriamente entre os Digimons vivos do time.

### Derrota de Digimon aliado

Quando um Digimon do time chega a 0 HP:

- Ele fica fora da batalha até o fim.
- Não ataca mais.
- Não pode usar especial.
- Não recebe benefícios daquela batalha após cair, salvo regras futuras específicas.

### Derrota total

Se os 3 Digimons forem derrotados:

- O jogador perde a batalha.
- O jogador retorna para a localização anterior.
- A progressão automática deve ser interrompida.

---

## 14. Click damage

O click damage do jogador será baseado em uma porcentagem do ATK somado dos 3 Digimons ativos.

Fórmula conceitual:

```txt
click_damage = (ATK_total_do_time * percentual_base_de_click) * modificadores
```

Onde:

```txt
ATK_total_do_time = ATK_total_digimon_1 + ATK_total_digimon_2 + ATK_total_digimon_3
```

Modificadores possíveis:

- Traits do treinador.
- Itens temporários.
- Buffs de localização.
- Eventos.
- Bônus de missão.

O click damage também deve contribuir lentamente para amizade, pois representa o treinador ajudando diretamente seus Digimons na batalha.

---

## 15. MP e especial

Cada Digimon terá um especial individual em nome e apresentação, mas com mecânica base padronizada no MVP.

### Carregamento de MP

- O MP começa zerado em cada batalha.
- A cada ataque automático realizado pelo Digimon, ele carrega 5% de MP.
- Ao atingir 100%, o especial fica disponível.

### Uso do especial

- O jogador clica no especial para ativar.
- O especial não terá cooldown além da necessidade de carregar MP.
- Após usar, o MP volta para 0%.

### Dano do especial

O especial causa dano baseado em 200% do maior status ofensivo do Digimon:

```txt
special_base_damage = max(ATK_total, INT_total) * 2
```

O especial considera:

- Attribute.
- Element.
- Vantagens.
- Resistências.
- Buffs e debuffs aplicáveis.

No MVP, a diferença entre especiais será apenas:

- Nome.
- Ícone.
- Animação/efeito visual.
- Elemento usado para cálculo, caso definido por Digimon.

---

## 16. Evolução e degeneração

### Níveis evolutivos principais

O jogo terá os seguintes níveis:

| Nível | Nome |
|---:|---|
| 1 | Baby 1 |
| 2 | Baby 2 |
| 3 | Rookie |
| 4 | Champion |
| 5 | Ultimate |
| 6 | Mega 1 |
| 7 | Mega 2 |

### Mega 2

Mega 2 será usado para formas equivalentes a:

- Burst Mode.
- Ultra.
- Super Ultimate.
- Modos especiais de nível superior.

### Estrutura evolutiva

Digimons não terão evolução linear obrigatória.

Eles terão árvores de evolução com múltiplos caminhos baseados em requisitos.

Requisitos possíveis:

- Level.
- Amizade.
- Stats.
- XP por tipo.
- Quantidade de evoluções.
- Quantidade de degenerações.
- Item.
- Missão.
- Localização.
- Digimon parceiro.
- Boss derrotado.
- Forma já conhecida.

### Desbloqueio global de formas

Quando o jogador obtém uma forma, ela passa a ser conhecida globalmente pela conta.

Isso significa que:

- O desbloqueio não é apenas daquele Digimon individual.
- Outros Digimons poderão degenerar/evoluir para formas conhecidas se cumprirem os requisitos.

### Evolução

Ao evoluir:

1. O jogo verifica se a forma alvo está disponível na árvore.
2. O jogo valida os requisitos.
3. Calcula o status cumulativo herdado com base na amizade.
4. Altera a forma do Digimon.
5. Reseta o level para 1.
6. Remove XP por tipo.
7. Mantém amizade.
8. Mantém personality.
9. Registra a nova forma como conhecida, se ainda não estiver registrada.

### Degeneração

A degeneração será manual e permitirá que o jogador escolha a forma de destino.

Regras:

- O jogador só pode degenerar para formas que já conhece/obteve.
- O Digimon precisa cumprir os requisitos da forma anterior.
- Não será obrigatório degenerar apenas para a forma imediatamente anterior.

Exemplo:

Se para obter Agumon é necessário:

- Level 15.
- 200 ATK.
- 10% amizade.

Então um Greymon precisa cumprir esses requisitos para degenerar para Agumon.

### Status cumulativo na evolução/degeneração

Antes da mudança de forma, calcula-se:

```txt
status_herdado = status_total_atual * percentual_por_amizade
```

Depois:

```txt
novo_cumulative = min(cumulative_atual + status_herdado, 9999)
```

A regra final deve ser balanceada com cuidado para evitar crescimento explosivo.

---

## 17. Evoluções especiais futuras

O jogo deve ser estruturado para receber evoluções especiais aos poucos.

### Tipos previstos

- Jogress.
- Digi-Egg / Armor Evolution.
- Digi-Espírito.
- Burst Mode.
- Mode Change.
- Evoluções por item especial.
- Evoluções por missão.
- Evoluções por evento.

### Jogress

Regra definida:

- Os Digimons usados na Jogress serão consumidos.

Esse sistema não precisa entrar no MVP, mas a estrutura de evolução deve permitir requisitos envolvendo mais de um Digimon.

### Armor Evolution / Digi-Egg

Regra definida:

- Será tratada como forma alternativa.

Não será prioridade do MVP.

---

## 18. Sistema de eggs, scanner e hatching

### Obtenção de eggs

Digimons derrotados podem dropar:

- Essence do seu tipo.
- Eggs do seu tipo.
- Itens específicos.
- Bits.

Exemplos:

- Egg of Dragon.
- Egg of Dark.
- Egg of Holy.
- Dragon Essence.
- Dark Essence.
- Holy Essence.

### Scanner

O jogador deverá escanear o egg para descobrir qual Digimon ele contém.

Regras:

- O scan custará bits.
- O resultado geralmente será uma forma Rookie.
- Eggs especiais poderão vir como Baby, Champion ou formas superiores.
- O resultado dependerá do tipo e raridade do egg.

### Raridades de egg

Raridades iniciais:

- Common.
- Rare.
- Reinforced.
- Special.
- Event.

### Inserção de Essence

Após o scan, o jogador insere Essence para chocar o egg.

Regras:

- Cada egg pode exigir quantidade diferente de Essence por inserção.
- A quantidade depende de raridade, tipo e/ou Digimon específico.
- Para chocar, o egg precisa de no mínimo 3 inserções bem-sucedidas.
- O jogador pode tentar até 5 inserções.
- Quanto mais inserções bem-sucedidas, maior o bônus no status base.

### Chances de inserção

| Inserção | Acerto | Falha | Quebra |
|---:|---:|---:|---:|
| 1ª | 90% | 9% | 1% |
| 2ª | 75% | 20% | 5% |
| 3ª | 60% | 32% | 8% |
| 4ª | 30% | 40% | 30% |
| 5ª | 10% | 50% | 40% |

A 1ª inserção foi ajustada para 90/9/1 para fechar 100%.

### Falha

Ao falhar:

- O jogador perde apenas a Essence daquela tentativa.
- O egg continua intacto.
- O progresso anterior é mantido.

### Quebra

Ao quebrar:

- O egg é perdido.
- Todas as Essences inseridas são perdidas.
- O processo termina.

### Qualidade do hatch

| Qualidade | Inserções bem-sucedidas | Resultado |
|---|---:|---|
| 3/5 | 3 | Choca normalmente. |
| 4/5 | 4 | Choca com bônus moderado de status base. |
| 5/5 | 5 | Choca com bônus máximo de status base. |

### Bônus de status base recomendado para MVP

Este valor deve ser tratado como parâmetro de balanceamento inicial, não como regra definitiva:

| Qualidade | Bônus sugerido de status base |
|---|---:|
| 3/5 | 0% |
| 4/5 | +5% |
| 5/5 | +10% |

---

## 19. Trainer level e traits

### Trainer level

O treinador terá level próprio.

Fontes iniciais de XP do treinador:

- Batalhas.
- Missões.
- Missões diárias.
- Missões semanais.
- Missões globais.

### Traits

Traits serão buffs globais e fixos para a jogabilidade.

Elas serão desbloqueadas com pontos obtidos pelo level do treinador.

### Estrutura da árvore

A árvore de traits terá dependências.

Uma trait só poderá ser desbloqueada se as traits ligadas a ela também tiverem sido desbloqueadas.

### Reset

O jogador poderá resetar traits usando um item específico.

### Áreas afetadas por traits

Traits poderão afetar:

- Dano automático.
- Click damage.
- Drop rate.
- Bits obtidos.
- XP de Digimon.
- XP de treinador.
- Amizade.
- Velocidade de treinamento.
- Chance de hatching.
- Redução de chance de quebra.
- Progresso offline.
- Capacidade da Ilha Digital.
- Slots de treinamento.
- Frequência de missões automáticas.

### Estrutura inicial sugerida

A árvore pode ser dividida em ramos:

1. **Combat Training**  
   Foco em dano, SPD, especiais e sobrevivência.

2. **Digital Bond**  
   Foco em amizade, status cumulativo e crescimento por evolução.

3. **Research & Hatching**  
   Foco em scan, eggs, Essence, chance de sucesso e redução de quebra.

4. **Explorer**  
   Foco em drops, bits, busca por itens e progresso offline.

5. **Island Management**  
   Foco em slots, velocidade de treino e ações da Ilha Digital.

---

## 20. Mapa do Digimundo

### Estrutura

O mapa será dividido em regiões lineares.

Cada localização terá:

- Nome.
- Descrição.
- Digimons selvagens.
- Bosses.
- Drops.
- Eggs.
- Essence.
- Missões.
- Loja, quando aplicável.
- Requisitos de desbloqueio.

### Requisitos de desbloqueio no MVP

As localizações poderão exigir:

- Trainer level.
- Número de batalhas vencidas.
- Boss derrotado.
- Missão concluída.

A estrutura deve permitir novos requisitos no futuro.

### Progressão automática

O jogo poderá oferecer progressão automática.

Exemplo:

- O jogador ativa auto-progress.
- O jogo avança para a próxima localização elegível quando os requisitos forem cumpridos.
- Se o jogador perder uma batalha, volta para a localização anterior e auto-progress é interrompido ou pausado.

---

## 21. Localizações iniciais do MVP

As 3 localizações iniciais serão:

1. **Village of Beginnings**
2. **File Forest**
3. **Native Forest**

### Village of Beginnings

Função:

- Tutorial.
- Primeiras batalhas.
- Introdução à Ilha Digital.
- Introdução ao scanner.
- Primeira missão narrativa.

Possíveis inimigos:

- Koromon.
- Tsunomon.
- Yokomon.
- Motimon.
- Tokomon.

Boss sugerido:

- Botamon Horde ou Kunemon.

### File Forest

Função:

- Primeira área real de farm.
- Introdução a eggs e Essence.
- Primeiros requisitos de progressão.

Possíveis inimigos:

- Agumon.
- Gabumon.
- Palmon.
- Tentomon.
- Biyomon.

Boss sugerido:

- Kuwagamon.

### Native Forest

Função:

- Aumento de dificuldade.
- Introdução a vantagem de atributo/elemento.
- Primeiras missões narrativas mais longas.

Possíveis inimigos:

- Elecmon.
- Gazimon.
- Betamon.
- Gomamon.
- Patamon.

Boss sugerido:

- Devimon ou Meramon.

---

## 22. Missões

### Tipos de missão

O jogo terá:

- Missões principais.
- Missões secundárias.
- Missões diárias.
- Missões semanais.
- Missões globais.
- Missões de localização.
- Missões de desbloqueio.

### Missões narrativas

As missões terão narrativa.

Mesmo em um idle/clicker, a narrativa deve dar contexto ao progresso.

Exemplo:

```txt
A energia da File Forest está instável. Derrote Digimons corrompidos, colete Dragon Essence e investigue o surgimento de ovos danificados.
```

### Missões globais

Missões globais contarão o progresso de todos os jogadores.

Exemplo:

```txt
Global Mission: Restore the Digital Gate
Objetivo global: derrotar 1.000.000 Digimons do tipo Virus.
Recompensa: evento temporário, boost global ou item exclusivo.
```

Missões globais dependem da versão online e não devem entrar no MVP local.

---

## 23. Economia e itens

### Moeda principal

A moeda principal será **bits**.

### Fontes de bits

O jogador ganha bits por:

- Batalhas.
- Venda de itens.
- Missões.
- Eventos.
- Recompensas de boss.
- Progresso offline limitado.

### Lojas

Lojas existirão em cidades do mapa.

As cidades serão tratadas como localizações com requisitos próprios de desbloqueio.

### Itens iniciais

Itens confirmados:

- Essence.
- Eggs.
- Comida de amizade.
- Boost de XP.
- Backup de egg.
- Chip de treino.
- Itens de evolução.

### Ideias adicionais de itens

Itens sugeridos para o design:

| Item | Função |
|---|---|
| Scanner Ticket | Reduz ou remove custo de scan. |
| Essence Compressor | Converte Essence menor em Essence maior. |
| Hatch Stabilizer | Reduz chance de quebra em uma inserção. |
| Training Manual | Aumenta velocidade de treino por tempo limitado. |
| Bond Snack | Aumenta amizade lentamente. |
| Memory Fragment | Usado para desbloquear informações de formas já vistas. |
| Trait Reset Core | Reseta a árvore de traits. |
| Evolution Core | Item genérico para evoluções especiais. |
| Island Expansion Disk | Aumenta capacidade da Ilha Digital. |
| Auto-Battle Chip | Libera automações específicas. |

### Monetização

Não haverá monetização inicialmente.

Por ser fan game privado, o jogo não deve incluir loja premium, anúncios, venda de moeda ou qualquer sistema pago.

---

## 24. Digimons do MVP

O MVP deve priorizar Digimons de **Adventure 1** e suas linhas evolutivas coerentes.

### Linhas principais recomendadas

#### Agumon line

- Botamon.
- Koromon.
- Agumon.
- Greymon.
- MetalGreymon.
- WarGreymon.

#### Gabumon line

- Punimon.
- Tsunomon.
- Gabumon.
- Garurumon.
- WereGarurumon.
- MetalGarurumon.

#### Biyomon line

- Nyokimon.
- Yokomon.
- Biyomon.
- Birdramon.
- Garudamon.
- Phoenixmon.

#### Tentomon line

- Pabumon.
- Motimon.
- Tentomon.
- Kabuterimon.
- MegaKabuterimon.
- HerculesKabuterimon.

#### Palmon line

- Yuramon.
- Tanemon.
- Palmon.
- Togemon.
- Lillymon.
- Rosemon.

#### Gomamon line

- Pichimon.
- Bukamon.
- Gomamon.
- Ikkakumon.
- Zudomon.
- Vikemon.

#### Patamon line

- Poyomon.
- Tokomon.
- Patamon.
- Angemon.
- MagnaAngemon.
- Seraphimon.

#### Salamon / Gatomon line

- YukimiBotamon.
- Nyaromon.
- Salamon.
- Gatomon.
- Angewomon.
- Ophanimon.

### Linhas inimigas ou futuras dentro do tema Adventure

Podem ser usadas como inimigos, bosses ou linhas jogáveis futuras:

- DemiDevimon.
- Devimon.
- Myotismon.
- VenomMyotismon.
- Etemon.
- MetalEtemon.
- Kuwagamon.
- Meramon.
- Numemon.
- Sukamon.
- Leomon.
- Ogremon.
- Andromon.
- Seadramon.
- Shellmon.

### Digimons populares fora de Adventure

Podem entrar em roadmap pós-MVP:

- Guilmon.
- Terriermon.
- Renamon.
- Veemon.
- Impmon.
- Dorumon.
- Ryudamon.
- Hackmon.

---

## 25. Progressão offline

O jogo terá progresso offline limitado.

Regra:

- O jogador recebe apenas uma porcentagem dos ganhos que teria online.
- O progresso offline deve considerar localização atual, força do time, buffs e limites de tempo.

Variáveis recomendadas:

```ts
offlineGainRate
offlineMaxHours
offlineBattleSimulationRate
offlineDropPenalty
offlineXpPenalty
```

Sugestão de balanceamento inicial para teste:

- Ganhos offline entre 20% e 35% dos ganhos online.
- Limite inicial de 8 a 12 horas acumuladas.
- Traits podem aumentar o limite e/ou porcentagem.

Esses números devem ser calibrados durante playtest.

---

## 26. Interface e experiência visual

### Direção visual

A UI deve ser moderna, limpa e menos poluída que clickers tradicionais.

O jogo deve exibir muitas informações úteis, mas sem sobrecarregar a tela.

### Tela principal

A tela principal deve apresentar:

- Batalha atual.
- HP do inimigo.
- Time ativo.
- HP/MP dos Digimons.
- Botões de especial.
- Click area.
- Mapa/localização atual.
- Drops recentes.
- Itens importantes.
- Buffs ativos.
- Progresso de missão atual.
- Bits.
- Atalho para scanner.
- Atalho para Ilha Digital.

### Menus separados

Devem ficar em menus separados:

- Traits.
- Inventário completo.
- Digimon storage completo.
- Árvore evolutiva detalhada.
- Missões completas.
- Configurações.
- Traduções/idioma.

### Princípio de UI

O jogador deve conseguir responder rapidamente:

- Estou vencendo ou perdendo?
- Meu time está forte o suficiente?
- Qual é meu próximo objetivo?
- O que eu posso melhorar agora?
- Que item ou drop importante acabei de receber?

---

## 27. Stack recomendada

### MVP local

Para validar diversão rapidamente:

- Next.js.
- React.
- TypeScript.
- Zustand ou Redux Toolkit.
- LocalStorage/IndexedDB para save local.
- Arquivos JSON/TS versionados para catálogo de Digimons, localizações, itens e missões.
- i18n desde o início.

### Versão online

Para a versão online:

- Next.js no frontend.
- Node.js/NestJS ou API Node dedicada no backend.
- PostgreSQL como banco principal.
- Redis para cache, locks, filas leves, rate limit e sessões temporárias.
- Prisma ou Drizzle como ORM/query builder.
- Autenticação com login e cloud save.
- Deploy inicial na Vercel para frontend.
- Backend em ambiente adequado para processo persistente, se necessário.

### Por que PostgreSQL e não MongoDB?

MongoDB não é necessariamente melhor por existirem muitas ações rápidas.

O ponto correto de arquitetura é:

- Não salvar cada clique no banco.
- Não salvar cada tick de batalha no banco.
- Não tratar o banco como motor de simulação em tempo real.

O ideal é salvar eventos importantes e estados consolidados:

- Fim de batalha.
- Drop recebido.
- Egg escaneado.
- Inserção no scanner.
- Evolução.
- Degeneração.
- Treino iniciado.
- Treino finalizado.
- Missão concluída.
- Compra/venda.
- Mudança de localização.

PostgreSQL se encaixa melhor porque o jogo terá muitas relações fortes:

- Conta.
- Save.
- Digimons obtidos.
- Formas conhecidas.
- Inventário.
- Eggs.
- Missões.
- Localizações.
- Requisitos.
- Traits.
- Lojas.
- Histórico de eventos.

Catálogos flexíveis podem ser mantidos em JSON versionado ou em campos JSONB quando fizer sentido.

### Arquitetura de performance

O frontend deve entregar resposta imediata ao jogador.

O backend deve validar e persistir eventos relevantes.

Modelo recomendado:

```txt
Cliente simula feedback visual imediato
        ↓
Cliente envia ação/evento consolidado
        ↓
Backend valida regras, RNG e limites
        ↓
Backend salva estado final
        ↓
Cliente recebe resultado oficial
```

### RNG sensível

Eventos importantes devem ser calculados no servidor na versão online:

- Hatching.
- Drops raros.
- Quebra de egg.
- Recompensas de boss.
- Missões globais.

Isso reduz manipulação de save e abuso de RNG.

---

## 28. Segurança e integridade

Mesmo sendo fan game privado, a versão online deve proteger a integridade do progresso.

### Regras

- O servidor deve validar eventos importantes.
- O cliente não deve decidir drops raros na versão online.
- O cliente não deve decidir sucesso/falha/quebra de hatching na versão online.
- O cliente não deve enviar “ganhei X” sem que o backend consiga validar.
- O jogo deve ter rate limit para ações sensíveis.
- O save deve ter versionamento.
- Migrações de save devem ser planejadas.

### Anticheat leve

Não precisa de anticheat pesado no MVP.

Mas a arquitetura deve evitar abusos óbvios:

- Manipular bits.
- Manipular Essence.
- Manipular chance de hatching.
- Repetir requisições de recompensa.
- Duplicar itens.
- Simular progresso offline absurdo.

---

## 29. MVP recomendado

### Objetivo do MVP

Validar diversão.

O MVP não deve tentar provar arquitetura complexa nem servir como vitrine técnica. O foco é descobrir se o loop é gostoso de jogar.

### Escopo do MVP

O MVP deve conter:

- Web app jogável.
- Save local.
- 3 Digimons no time.
- Ilha Digital com capacidade inicial.
- 3 localizações.
- Batalha idle/clicker contínua.
- Ataque automático por SPD.
- Inimigos atacando aleatoriamente.
- Click damage.
- MP e especial.
- Drops de bits, Essence e eggs.
- Scanner.
- Hatching 3/5, 4/5 e 5/5.
- Personalities ao chocar.
- Stats base, by level e cumulative.
- Evolução e degeneração básica.
- Formas conhecidas globalmente.
- Trainer level.
- Árvore inicial de traits.
- Missões principais simples com narrativa.
- Primeira loja.
- UI moderna e objetiva.
- Português, inglês e espanhol preparados no sistema.

### Fora do MVP

Não entram no MVP:

- Login.
- Cloud save.
- PostgreSQL.
- Missões globais.
- Guildas.
- PvP.
- Mercado entre jogadores.
- Jogress.
- Armor Evolution.
- Digi-Espírito.
- Eventos temporários.
- Monetização.
- Sistema completo de cidades.
- Ranking.

Esses sistemas ficam para a versão online ou roadmap futuro.

---

## 30. Roadmap sugerido

### Fase 1 — Protótipo jogável local

Objetivo: validar loop de batalha.

Entregas:

- Tela principal.
- 3 Digimons fixos iniciais.
- 1 localização.
- Combate automático.
- Click damage.
- HP, MP e especial.
- Drops básicos.

### Fase 2 — MVP local completo

Objetivo: validar progressão.

Entregas:

- 3 localizações.
- Adventure 1 lines principais.
- Hatching.
- Scanner.
- Essence.
- Ilha Digital.
- Evolução/degeneração.
- Trainer level.
- Traits iniciais.
- Missões narrativas.
- Loja inicial.

### Fase 3 — Online Alpha

Objetivo: transformar save local em conta online.

Entregas:

- Login.
- Cloud save.
- PostgreSQL.
- Backend de validação.
- Redis para cache/rate limit.
- Migração do save local para online.
- Deploy inicial.

### Fase 4 — Progressão online

Objetivo: adicionar sistemas dependentes de backend.

Entregas:

- Missões diárias.
- Missões semanais.
- Missões globais.
- Eventos temporários.
- Rankings simples.
- Novas localizações.
- Novos eggs.
- Novas lojas.

### Fase 5 — Sistemas avançados de Digimon

Objetivo: expandir identidade Digimon.

Entregas:

- Jogress.
- Armor Evolution.
- Digi-Espírito.
- Mega 2/Burst/Ultra.
- Bosses especiais.
- Linhas de outras temporadas.
- Eventos narrativos.

### Fase 6 — Social futuro

Objetivo: adicionar interação entre jogadores.

Possíveis sistemas:

- Guildas.
- Mercado.
- PvP assíncrono.
- Ranking por evento.
- Boss global.
- Contribuição de comunidade para missões globais.

---

## 31. Critérios de sucesso do MVP

O MVP será considerado bem-sucedido se:

- O combate for simples de entender e satisfatório de acompanhar.
- O jogador sentir vontade de continuar farmando.
- O sistema de hatching gerar tensão real entre parar no 3/5 ou arriscar 4/5 e 5/5.
- Evoluir e degenerar parecer uma decisão estratégica, não apenas obrigação.
- A amizade parecer valiosa.
- O time de 3 Digimons gerar escolhas interessantes.
- A Ilha Digital parecer útil, não apenas armazenamento.
- A UI mostrar informações importantes sem ficar poluída.
- O jogador sempre souber o próximo objetivo.

---

## 32. Pontos de balanceamento para playtest

Os seguintes pontos devem ser calibrados durante testes:

- Velocidade de subida de amizade.
- Percentual de click damage.
- Intervalo de ataque por SPD.
- Ganho de MP por ataque.
- Dano dos especiais.
- HP dos inimigos.
- Dano dos inimigos.
- Drop rate de eggs.
- Drop rate de Essence.
- Quantidade de Essence por inserção.
- Bônus 4/5 e 5/5.
- XP por batalha.
- XP do treinador.
- Custo de scan.
- Custo de itens.
- Tempo de treinamento na Ilha Digital.
- Ganhos offline.
- Requisitos de evolução.
- Requisitos de desbloqueio de localização.

---

## 33. Resumo das decisões confirmadas

- Nome: Digiclicker.
- Fan game privado.
- Sem fins lucrativos.
- Digimons oficiais.
- Web.
- Multilíngue: PT, EN, ES.
- MVP com save local.
- Versão online com login e cloud save.
- Banco online: PostgreSQL.
- Time ativo com até 3 Digimons.
- Ilha Digital com até 50 Digimons inicialmente.
- 3 slots por tipo de treinamento.
- Combate clicker contínuo.
- Ataques baseados em SPD.
- Inimigo ataca aleatoriamente.
- Digimon derrotado fica fora da batalha até o fim.
- Se o time perder, volta para localização anterior.
- MP começa zerado.
- MP carrega 5% por ataque do Digimon.
- Especial causa 200% do maior stat entre ATK e INT.
- Especial considera vantagem de Attribute/Element.
- Sem cooldown de especial.
- Level máximo 120.
- Evolução/degeneração reseta level para 1.
- Amizade e personality são mantidas.
- XP por tipo não é mantido.
- Cumulative stat limitado a 9999 por stat.
- Forms conhecidas são globais da conta.
- Jogress futura consome Digimons.
- Armor/Digi-Egg será forma alternativa.
- Egg scan custa bits.
- Eggs possuem raridade.
- Hatching mínimo 3/5 e máximo 5/5.
- Falha perde Essence da tentativa.
- Quebra perde egg e Essence inserida.
- Bits são a moeda principal.
- Missões principais, diárias, semanais e globais.
- Traits em árvore, resetáveis por item.
- Mapa linear.
- Localizações iniciais: Village of Beginnings, File Forest e Native Forest.
- MVP focado em Adventure 1 e linhas evolutivas coerentes.
- UI moderna, menos poluída.
- Traits em menu separado.

---

## 34. Referências consultadas

- PokeClicker GitHub: https://github.com/pokeclicker/pokeclicker
- PokeClicker: https://www.pokeclicker.com/
- Bandai Namco Europe — Digimon Story: Time Stranger mechanics: https://en.bandainamcoent.eu/digimon/news/digimon-story-time-stranger-the-game-mechanics-explained
- GameFAQs — Digimon Story: Time Stranger Personality Guide: https://gamefaqs.gamespot.com/ps5/513530-digimon-story-time-stranger/faqs/82355/personality-guide
- Digimon Masters Online — GAMEKING hatching reference: https://dmo.gameking.com/News/NoticeView.aspx?idx=240&page=1
- DMO Wiki — Hatching: https://dmowiki.com/Hatching
- Bandai Namco Holdings — Terms of Use: https://www.bandainamco.co.jp/en/terms/index.html


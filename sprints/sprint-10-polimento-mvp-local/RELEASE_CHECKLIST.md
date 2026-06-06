# Checklist de release — MVP local

Use antes de cada build de playtest ou deploy na Vercel.

## Build e qualidade

- [ ] `npm run build` passa sem erros
- [ ] `npm run lint` sem erros críticos
- [ ] `npm run typecheck` passa
- [ ] Save migra corretamente da versão anterior (testar com save antigo no localStorage)

## Fluxo novo jogador

- [ ] Novo save inicia na Vila dos Inícios com time starter
- [ ] Batalhas automáticas e clique funcionam
- [ ] Missão principal visível na aba Missões
- [ ] Desbloqueio da Floresta de Arquivos após missão
- [ ] Scanner, hatching e evolução funcionam
- [ ] Ilha Digital aceita Digimons e treinos
- [ ] Loja e boss da Vila acessíveis no mapa
- [ ] Revanche diária de boss respeita limite

## Sistemas

- [ ] Troca de idioma (PT/EN/ES) persiste
- [ ] Progresso offline exibe resumo ao retornar
- [ ] Inventário: usar, vender e comprar itens
- [ ] Traits desbloqueáveis e Trait Reset Core
- [ ] Auto-progress pausa em derrota

## Regressão rápida

- [ ] Save version = 10 após hydrate
- [ ] Nenhum texto visível hardcoded fora de i18n
- [ ] Boss victory modal e offline modal fecham corretamente

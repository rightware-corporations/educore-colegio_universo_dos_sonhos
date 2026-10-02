# High-Fidelity Direction — Landing COLUS

> **Estado:** HIGH-FIDELITY V0.3 — EM DESENVOLVIMENTO  
> **Data:** 2026-10-01  
> **Base aprovada:** intro morph-driven + Hero final + identidade digital COLUS.
>
> Este documento transforma a direção aprovada em decisões visuais concretas. Ainda não é código.

---

## 1. Norte visual

A experiência deve parecer:

> **editorial, tecnológica, humana e proprietária.**

Não queremos um “site premium de escola”.

Queremos:

> **uma experiência digital que parece ter sido desenhada a partir do símbolo COLUS.**

A abertura deve carregar a maior intensidade visual. Depois, a landing desacelera e deixa fotografia, conteúdo e espaço respirarem.

---

# 2. Paleta de trabalho

As cores abaixo continuam provisórias até confirmação por asset oficial.

## Brand

- **COLUS Orange** — `#F18136`
- **COLUS Deep Blue** — `#0C5898`
- **COLUS Bright Blue** — `#2899EF`

## Surfaces

- **Warm Paper** — `#FFF8EF`
- **Warm White** — `#FFFCF8`
- **Deep Ink** — `#071A2A`
- **Deep Ink Soft** — `#0B2436`

## Text

- **Ink Text** — `#102231`
- **Muted Ink** — `#65727C`
- **On Dark** — `#F8FBFD`
- **On Dark Muted** — `#C7D3DB`

### Regra

Brand Orange é energia.

Brand Blue é estrutura.

Warm Paper é humanidade.

Deep Ink é cinema/tecnologia.

A landing não deve parecer dividida em “secções laranja” e “secções azuis”.

---

# 3. Tipografia de trabalho

## Decisão V0.1

### Interface / body / navegação
> **Manrope**

Características:
- contemporânea;
- legível;
- precisa;
- tecnológica sem parecer “developer UI”.

### Display editorial
> **Newsreader**

Uso controlado:
- palavras ou frases de maior carga emocional;
- Manifesto;
- algumas linhas do Hero;
- depoimentos.

### Hero

A headline deve combinar os dois sistemas.

Proposta:

```text
Juntos Tornamos          → Manrope / 700
Sonhos Em Realidade      → Newsreader / 500–600
```

Isto cria contraste entre:

> estrutura + sonho.

### Regra

Não usar serif em:
- botões;
- nav;
- labels;
- UI operacional.

---

# 4. Escala tipográfica — desktop

## Hero kicker
12–13px / uppercase / tracking 0.18–0.22em.

## Hero headline
clamp aproximado:
`64px → 108px`

Line-height:
`0.88–0.94`

## Supporting copy
18–21px.

## Section headline
48–72px.

## Editorial statement
56–86px.

## Body
16–18px.

---

# 5. Escala tipográfica — mobile

## Hero kicker
10–11px.

## Hero headline
46–60px.

## Supporting copy
15–17px.

## Section headline
36–48px.

## Body
15–17px.

---

# 6. Grid

## Desktop

- max content width: `1440px`;
- outer gutter: `clamp(24px, 4vw, 72px)`;
- 12-column conceptual grid;
- media pode romper a grelha em secções cinematográficas.

## Mobile

- gutter: 20–24px;
- conteúdo textual não encosta ao viewport;
- media pode usar full-bleed quando a narrativa justificar.

---

# 7. Intro Morph — high-fidelity

## Estado 01 — Silêncio da Marca

### Fundo
Warm Paper `#FFF8EF`.

### Mark
Símbolo isolado.

Escala:
- desktop: ~38vw, cap 600px;
- mobile: ~60vw.

### Tratamento
- sem drop shadow;
- sem glass;
- sem wordmark;
- micro breathing;
- halo quase invisível.

### Sensação
Calma antes da expansão.

---

## Estado 02 — Livro abre

As páginas do livro:

- crescem;
- afastam-se;
- rodam ligeiramente;
- deixam de ser percebidas como “logo pequeno”;
- tornam-se arquitetura visual.

### Tratamento cromático
Azul permanece sólido, mas pode ganhar um gradient muito subtil:

`#0C5898 → #1274B8`

### Fundo
Warm Paper com um vignette azul muito suave nas bordas.

---

## Estado 03 — Book Aperture

### Fundo
transição:
`#FFF8EF → #071A2A`

### Media
entra dentro da abertura.

#### Frame
- proporção desktop: entre 4:5 e 16:10 dependendo do vídeo;
- corners não devem ser genéricos;
- a mask deve manter memória da curva do livro.

### Halo
Orange + warm-white.

Não usar blur excessivo.

### Nodes
Pequenos, com borda fina ou dot sólido.

Labels só aparecem quando funcionais.

---

# 8. Hero final — Estado 04

## Composição desktop

### Left
- kicker;
- headline;
- supporting copy;
- CTA principal;
- CTA secundário.

### Right
- media dominante;
- light halo;
- radial nodes.

## Media
Não ocupar 100% da largura.

Objetivo:
> deixar existir espaço negativo.

## Headline working layout

```text
COLÉGIO UNIVERSO DOS SONHOS

Juntos Tornamos
Sonhos Em Realidade

Uma experiência de aprendizagem que desperta
curiosidade, confiança e visão de futuro.

[ Descobrir o COLUS ]   Marcar uma visita →
```

---

# 9. CTA

## Primário

Forma:
- pill moderada;
- altura 52–56px;
- padding horizontal 24–30px.

Cor:
- Orange sobre Deep Ink;
- ou Deep Ink sobre Warm Paper quando o contexto exigir.

Hover:
- deslocamento máximo 2px;
- halo muito subtil;
- arrow move 3–4px.

## Secundário

Link textual.

Sem segundo botão pesado.

---

# 10. Header

## Estado inicial

No primeiro frame:
- não existe header completo.

Durante o morph:
- mark move-se para canto superior esquerdo;
- navegação aparece progressivamente.

## Estado final

Desktop:
- mark pequeno;
- links em Manrope;
- CTA “Marcar uma visita”.

Mobile:
- mark;
- botão menu simples;
- nada de menu orbital.

## Sticky state

Ao sair do Hero:
- Warm White / 88–92% opacity;
- backdrop blur moderado;
- border inferior quase invisível;
- texto Deep Ink.

---

# 11. Radial Nodes

## Visual

Tamanho base:
- 10–14px dot;
- hit area 40–44px.

### Hover/focus desktop
```text
●
↓
● Descobrir
```

Label:
- pequena;
- sans;
- fundo transparente ou deep surface;
- animação horizontal curta.

### Não fazer
- quatro botões grandes;
- menu circular completo;
- ícones dentro dos pontos;
- ring neon.

---

# 12. Media treatment

## Vídeo

A prioridade é autenticidade.

### Grade
- contraste moderado;
- pele natural;
- highlights quentes;
- azul ligeiramente profundo;
- sem LUT cinematográfico pesado.

## Overlay
Somente localizado onde texto precisar.

## Poster
Deve funcionar como imagem independente.

---

# 13. Manifesto após Hero

A abertura é visualmente intensa.

O Manifesto deve fazer o contrário.

### Fundo
Warm White / Warm Paper.

### Layout
- muito whitespace;
- statement grande;
- close-up ou detalhe humano;
- Open Book curve residual.

### Tipografia
Newsreader pode assumir protagonismo.

---

# 14. Motion language high-fidelity

## Easing base
curvas naturais, sem bounce.

Direção:
`cubic-bezier(0.22, 1, 0.36, 1)`

## Micro
180–320ms.

## Element reveal
450–750ms.

## Scroll morph
controlado por progress, não por duração rígida.

### Regra
Motion nunca deve competir com leitura.

---

# 15. Depth

Não usar glassmorphism como linguagem principal.

Profundidade vem de:

- contraste de superfície;
- sobreposição de media;
- halo;
- mask;
- espaço negativo;
- scale.

Shadows:
- largas;
- suaves;
- baixa opacidade.

---

# 16. Mobile high-fidelity

A experiência mobile mantém o conceito, mas reduz complexidade.

### Estado 01
mark grande.

### Estado 02
book abre de forma mais curta.

### Estado 03
media vertical quase full-width.

### Estado 04
headline entra sobre/abaixo do media conforme crop.

### Nodes
máximo 2 visíveis durante transformação.

No Hero final:
- progress dots;
- ou ausência de radial navigation.

---

# 17. Acessibilidade visual

- contraste mínimo adequado;
- nenhuma informação essencial apenas por cor;
- focus visível;
- reduced motion completo;
- texto real, nunca embutido em media;
- não depender de hover para navegação essencial.

---

# 18. Teste de qualidade

A abertura high-fidelity só passa se:

1. o primeiro frame já parece COLUS;
2. o morph faz sentido sem explicação;
3. o logo não parece “desmontado por efeito”;
4. o vídeo parece nascer da marca;
5. o Hero final não parece template;
6. desktop e mobile têm força equivalente;
7. reduced motion continua bonito;
8. a experiência continua rápida.

---

# 19. Próximo artefacto

Criar um visual board high-fidelity com:

- Estado 01;
- Estado 02;
- Estado 03;
- Estado 04 / Hero final;
- mobile equivalente;
- tokens visuais;
- tipografia;
- comportamento dos nodes.

Arquivo:

`landing-colus-hifi.drawio`


---

# 20. Estado 04 — Hero Assembly detalhado

O Hero final não entra por um conjunto de fades.

Ele é **montado a partir do que já existe no morph**.

## 20.1 Estado de entrada

Ao iniciar o Estado 04:

- Book Aperture já existe à direita;
- media já está visível;
- Light Device já virou halo;
- radial nodes já ocupam posições de composição;
- fundo já está em Deep Ink;
- lado esquerdo está deliberadamente vazio.

Esse vazio é o espaço onde a interface passa a existir.

---

## 20.2 Sequência de montagem — desktop

Faixa de trabalho:

`scrollProgress ≈ 0.55 → 1.00`

### 55–64% — Axis → Kicker

O antigo eixo central do símbolo deixa de parecer parte do mark.

Ele transforma-se num pequeno traço/linha editorial que ancora:

> **COLÉGIO UNIVERSO DOS SONHOS**

A marca começa a produzir tipografia.

Não inserir kicker por fade genérico.

### 62–76% — Headline, primeira linha

> **Juntos Tornamos**

entra por uma máscara horizontal/vertical curta.

Tipografia:
- Manrope;
- peso 700;
- tracking apertado;
- branco frio.

### 70–84% — Headline, segunda linha

> **Sonhos Em Realidade**

surge com comportamento diferente.

Direção:
- Newsreader;
- weight 500–600;
- warm-white;
- reveal por clip ligado à curva do Book Device.

A segunda linha não deve parecer uma simples continuação da primeira.

Ela é o momento emocional.

### 78–88% — Supporting copy

Entra depois da headline estabilizar.

No máximo duas linhas.

Movimento:
- `y: 12–18px → 0`;
- opacity controlada;
- sem blur exagerado.

### 82–92% — CTA

Primário:
> **Descobrir o COLUS**

O botão não “salta”.

Ele aparece como continuação da baseline da copy.

Secundário:
> Marcar uma visita →

entra ligeiramente depois.

### 86–96% — Header

O header completa-se apenas quando o visitante já percebeu a cena.

Sequência:

```text
compact mark
→ links principais
→ CTA de visita
```

O mark no header não precisa ser literalmente reconstruído pelas mesmas paths que ficaram no Hero.

Pode existir como **secondary mark sincronizado**, enquanto os devices originais permanecem distribuídos pela composição.

### 92–100% — Nodes estabilizam

Os quatro nodes funcionais entram no estado final.

Sem labels permanentes.

Label aparece apenas:
- hover;
- focus;
- navegação por teclado.

---

# 21. Composição final do Hero — desktop

## Grid

### Área esquerda
aprox. 5 colunas.

Contém:
- kicker;
- headline;
- copy;
- CTA.

### Área direita
aprox. 7 colunas.

Contém:
- Book Aperture;
- media;
- halo;
- radial nodes.

### Regra

Nenhum elemento deve ficar geometricamente “perfeito demais”.

A composição deve parecer controlada, mas viva.

---

# 22. Relação headline ↔ media

A headline nunca deve competir com o rosto/ação principal do vídeo.

O crop do media deve reservar uma zona segura.

### Safe areas

No desktop:
- sujeito principal preferencialmente no centro/direita;
- lado esquerdo do vídeo com menor densidade;
- halo pode preencher negative space.

No mobile:
- sujeito principal no terço superior/central;
- headline fica abaixo ou parcialmente sobre uma área protegida.

---

# 23. Estado 04 — mobile

O mobile não reproduz o grid desktop.

## Estrutura final

```text
HEADER
mark                           menu

MEDIA / BOOK APERTURE
vertical / quase full-width

kicker

Juntos Tornamos
Sonhos Em
Realidade

supporting copy

[ Descobrir o COLUS ]

Marcar uma visita →
```

## Motion

### 58–70%
media estabiliza.

### 66–78%
header compacta.

### 70–84%
headline monta em 3–4 linhas.

### 80–90%
copy + CTA.

### 88–100%
progress dots/nodes simplificam.

### Regra

Não manter labels orbitais no mobile.

---

# 24. Saída do Hero — conceito

A transição Hero → Manifesto deve ser tão pensada quanto a abertura.

Nome interno:

> **OPEN TO MEANING**

A ideia:

```text
impacto
→ abertura
→ silêncio
→ significado
```

Não fazemos:

`Hero termina → nova secção começa`.

Fazemos:

> **o próprio Hero abre espaço para o Manifesto.**

---

# 25. Open Book Bridge

Ao continuar o scroll depois do Hero estabilizar:

## 0–25% da transição

- Book Aperture começa a perder escala;
- halo reduz;
- radial nodes recolhem/desaparecem;
- headline perde prioridade.

## 25–55%

A curva inferior do Book Device abre-se em largura.

A superfície Warm Paper entra de baixo para cima.

Não como wipe reto.

Mas como:

> **duas curvas de página a abrir.**

## 45–75%

O media do Hero reduz e muda de proporção.

De:
- grande frame cinematográfico;

para:
- painel editorial / retrato / close-up.

Preferência:
- manter o mesmo DOM/media container durante a transformação;
- alterar crop, scale e mask;
- evitar “um vídeo desaparece e outra imagem aparece” sem ligação.

## 65–90%

Header muda:

```text
transparent/dark
→ warm-white 90%
→ text Deep Ink
```

## 78–100%

O Manifesto assume o viewport.

---

# 26. Media Continuity

Esta é uma decisão importante.

O media pode criar uma ponte narrativa.

### Hero
media mostra movimento / vida / energia.

### Transição
o mesmo frame reduz.

### Manifesto
o media torna-se mais íntimo:
- rosto;
- detalhe;
- gesto;
- interação professor/aluno;
- mãos em experiência prática.

Se o material disponível não permitir continuidade real:

- usar crossfade curto dentro do mesmo container;
- nunca trocar frame por corte brusco.

---

# 27. Manifesto — composição desktop

O Manifesto deve parecer quase o oposto do Hero.

## Fundo

Warm White / Warm Paper.

## Layout

### Esquerda — 7 colunas

Small label:
> **A EXPERIÊNCIA COLUS**

Statement:

> **Aprender é descobrir o que somos capazes de transformar.**

### Direção tipográfica

Label:
- Manrope;
- 11–12px;
- uppercase;
- tracking amplo.

Statement:
- Newsreader;
- 64–86px;
- line-height apertado;
- Ink Text.

Uma pequena parte pode usar Manrope para criar contraste, mas a V0.2 assume Newsreader como linguagem dominante desta secção.

### Body

Máximo 3–4 linhas.

Não explicar tudo.

O manifesto deve deixar espaço para a próxima história.

---

# 28. Manifesto — media

### Desktop

Painel à direita:
- 34–40% da largura;
- retrato editorial;
- altura 62–72vh;
- pequeno offset vertical;
- sem card/borda grossa.

Pode manter:
- curva do Book Device numa das extremidades;
- um único node laranja como assinatura.

### Regra

Depois do morph, reduzir drasticamente os efeitos.

A fotografia volta a ser humana.

---

# 29. Manifesto — mobile

Depois do Hero:

1. Warm Paper começa a entrar;
2. media reduz para um retrato de aproximadamente `78–84vw`;
3. statement vem depois;
4. body encerra a secção.

Ordem preferida:

```text
label
statement
media
body
```

ou, se o frame for emocionalmente muito forte:

```text
media
label
statement
body
```

A escolha final depende do asset real.

---

# 30. Densidade e duração

## Hero final
deve ter pelo menos um momento curto de estabilidade antes da saída.

O utilizador precisa conseguir “ler” a composição.

### Desktop
Após morph:
aprox. `30–45vh` de scroll útil antes da transição.

### Mobile
aprox. `20–30svh`.

Não transformar o site numa animação contínua sem pausa.

---

# 31. Motion contract — Hero → Manifesto

| Elemento | Hero final | Durante bridge | Manifesto |
|---|---|---|---|
| Book | aperture/mask | abre em curvas | memória subtil |
| Light | halo | reduz | desaparece |
| Radials | nodes | recolhem | 0–1 assinatura |
| Media | cinematic | scale/crop | editorial |
| Background | Deep Ink | book wipe | Warm Paper |
| Header | dark/transparent | morph | warm sticky |
| Typography | impact | sai por prioridade | statement editorial |

---

# 32. Critério de qualidade da transição

A passagem está pronta quando:

- não parece troca de secção;
- o media tem continuidade;
- a Book curve é perceptível sem ser literal;
- o fundo claro não entra como retângulo;
- o header muda sem salto;
- o Hero tem tempo para ser lido;
- o Manifesto parece mais calmo;
- mobile mantém a mesma intenção sem excesso de motion.

---

# 33. Próximo gate

Depois desta V0.2, o próximo trabalho visual é:

> **APRENDER EM MOVIMENTO — Descobrir + Criar**

Essa secção deverá herdar apenas parte do sistema gráfico e introduzir a primeira grande narrativa de conteúdo depois do Manifesto.


---

# 34. Aprender em Movimento — direção integrada

A primeira grande narrativa depois do Manifesto passa a ser:

> **APRENDER EM MOVIMENTO**

com dois momentos:

- **01 / Descobrir**
- **02 / Criar**

A direção detalhada está em:

> `aprender-em-movimento-colus.md`

## Conceito principal

> **Learning Trail**

Um eixo vivo nasce do node laranja residual do Manifesto e conduz toda a secção.

Ele não funciona como timeline corporativa.

Funciona como:

- trajetória;
- conexão;
- progressão;
- assinatura visual;
- ponte entre media e conteúdo.

---

# 35. Desktop — comportamento

A secção usa um stage sticky aproximado de 190–230vh.

O viewport mantém:

- narrativa à esquerda;
- media stage à direita;
- Trail a atravessar a composição.

### Descobrir

Atmosfera:
- clara;
- humana;
- observacional;
- Brand Blue discreto.

Media:
- começa como uma imagem dominante;
- abre espaço para um detalhe;
- reorganiza-se sem virar galeria.

### Criar

A energia cresce.

Media:
- layered composition;
- uma peça principal;
- duas peças secundárias no máximo;
- labels contextuais pontuais.

O Trail muda de Blue para Orange na passagem.

---

# 36. Mobile — comportamento

No mobile, não usar o sticky longo do desktop.

A narrativa passa a ser vertical.

O Trail vira uma linha simples que acompanha:

> 01 Descobrir → media → detalhe → 02 Criar → media → copy

O objetivo é preservar identidade e continuidade sem transformar o scroll mobile num demo técnico.

---

# 37. Relação com os brand devices

Nesta secção:

- **Axis / Trail** → principal;
- **Radial Nodes** → pontuais;
- **Open Book** → memória discreta em masks/crops;
- **Light Device** → praticamente ausente.

Isto reduz repetição da abertura.

---

# 38. Saída para Futuro & Tecnologia

A secção Criar termina com:

- Orange mais presente;
- Bright Blue pontual;
- Trail mais energético.

No fim, o Trail alarga-se e entra no próximo plano Deep Blue.

A passagem deve parecer:

> **energia que cresce até entrar no futuro.**

Não uma troca seca de secção.

---

# 39. Gate V0.3

O high-fidelity já cobre:

- Intro Morph;
- Hero Assembly;
- Hero → Manifesto;
- Manifesto;
- Aprender em Movimento.

Próximo foco:

> **FUTURO & TECNOLOGIA — secção assinatura.**

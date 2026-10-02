# High-Fidelity Direction — Landing COLUS

> **Estado:** HIGH-FIDELITY V0.16 — CONSOLIDAÇÃO GLOBAL  
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


---

# Ficheiro canónico de design

A landing tem um único artefacto visual ativo:

> `landing-colus-master.drawio`

E esse ficheiro usa **um único canvas contínuo**.

Não existe mais uma página/tab separada por secção como estrutura principal de trabalho.

A sequência visual fica fisicamente montada no mesmo canvas:

> Abertura → Hero → Manifesto → Aprender em Movimento → Futuro & Tecnologia → Vida COLUS → restantes blocos.

O objetivo é poder abrir um único ficheiro e acompanhar a experiência completa sem trocar de tabs ou de ficheiros.

Os ficheiros multipage e versões isoladas anteriores permanecem apenas em `archive/`.

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


---

# 40. Futuro & Tecnologia — direção integrada

A secção assinatura passa a usar o conceito:

> **SIGNAL FIELD**

Headline:

> **O futuro também se aprende.**

A função desta secção é elevar novamente a intensidade visual sem cair numa grelha de funcionalidades ou numa estética tecnológica genérica.

## Estrutura

Quatro cenas editoriais:

- **01 / TIC**
- **02 / Engenharia**
- **03 / Ciência**
- **04 / Segurança Digital**

Estas cenas não aparecem como quatro cards.

Usam um único stage Deep Blue / Deep Ink com:

- Signal Field contínuo;
- Scene Window principal;
- nodes contextuais;
- progress discreto;
- transformação do mesmo media container.

## Brand devices

Nesta secção:

- Learning Trail evolui para Signal Field;
- Light Device retorna de forma controlada;
- Radial/Community nodes ganham função contextual;
- Open Book permanece apenas como memória de mask/crop.

## Desktop

Stage aproximado de 220–280vh, sticky 100vh, scroll nativo.

A sequência é:

> entrada → headline → TIC → Engenharia → Ciência → Segurança Digital → saída humanizada.

## Mobile

No mobile:

- sem sticky longo;
- quatro cenas empilhadas;
- Signal Field vertical simplificado;
- media forte;
- progressão natural por scroll.

## Saída

A última cena não termina em mais tecnologia.

O Signal Field reduz intensidade e dissolve-se em media humano para preparar:

> **VIDA COLUS**

Direção detalhada:

- `futuro-tecnologia-colus.md`
- `landing-colus-master.drawio` — bloco **Futuro & Tecnologia** no canvas contínuo

---

# 41. Gate V0.5

O high-fidelity cobre agora:

- Intro Morph;
- Hero Assembly;
- Manifesto;
- Aprender em Movimento;
- Futuro & Tecnologia.

Próximo foco:

> **VIDA COLUS — experiência editorial / fotoensaio vivo**


---

# 42. Vida COLUS — direção integrada

Depois de Futuro & Tecnologia, a intensidade tecnológica baixa e a fotografia volta a dominar.

Conceito:

> **LIVING REEL**

A secção deixa de funcionar como stage tecnológico e passa a ser um **fotoensaio vivo**.

## Estrutura

Três atos:

- **Imersão**
- **Ritmo**
- **Presença**

### Imersão
Um media grande domina 70–85% do viewport.

Objetivo:

> entrar na escola, não observá-la de fora.

### Ritmo
A composição abre para:

- 1 frame principal;
- 1 secundário;
- 1 detalhe.

Sem masonry e sem grelha simétrica.

### Presença
O movimento desacelera e uma fotografia humana forte assume protagonismo.

Essa imagem prepara emocionalmente a próxima secção:

> **PERTENCER**

## Story Markers

Os nodes residuais do Signal Field tornam-se pequenos Story Markers:

- dot laranja;
- linha curta;
- label de 2–5 palavras.

Exemplos:

- Em movimento
- Fora da sala
- Expressão
- Descoberta

Sem introduzir datas, locais ou programas específicos não confirmados.

## Brand intensity

Nesta secção:

- Orange → markers;
- Blue → pontual;
- Book → memória discreta;
- Light Device → ausente;
- mark/logo → não repetir.

A fotografia é a identidade principal.

## Mobile

No mobile:

- media full-width;
- caption;
- media vertical;
- detalhe;
- media humano de saída.

Sem masonry e sem horizontal scroll obrigatório.

## Saída

O último frame humano cresce e conduz para:

> **Crescer é uma jornada partilhada.**

Direção detalhada:

- `vida-colus.md`
- `landing-colus-master.drawio` — bloco **Vida COLUS** no canvas contínuo

---

# 43. Gate V0.6

O high-fidelity cobre agora:

- Intro Morph;
- Hero Assembly;
- Manifesto;
- Aprender em Movimento;
- Futuro & Tecnologia;
- Vida COLUS.

Próximo foco:

> **PERTENCER — Família & Comunidade**


---

# 44. Pertencer — direção integrada

Depois de Vida COLUS, a narrativa deixa de mostrar apenas momentos e passa a mostrar **relações**.

Conceito:

> **COMMUNITY RING**

O device deriva diretamente do anel superior do símbolo COLUS, entendido como figuras humanas ligadas em comunidade.

Headline:

> **Crescer é uma jornada partilhada.**

## Estrutura

A secção trabalha três relações editoriais:

- **Acompanhar**
- **Participar**
- **Crescer juntos**

Não aparecem como três cards.

São integradas numa composição humana ligada por arcos e nodes.

## Desktop

- frame humano principal;
- dois media relacionais secundários;
- Community Ring incompleto;
- headline no espaço central;
- muito negative space.

O ring não fecha totalmente.

A composição deve parecer humana, não geométrica/perfeita.

## Motion

Fluxo:

> relação → arco → comunidade → estabilidade → abertura.

Sem rotação contínua.

Sem carousel circular.

## Mobile

No mobile:

- Community Ring vira curva lateral;
- media segue narrativa vertical;
- nodes acompanham o scroll;
- sem círculo comprimido;
- sem sticky longo.

## Saída

Um dos arcos do Community Ring abre e transforma-se num eixo ascendente.

A passagem conceptual é:

> **pertencer → ganhar confiança → transformar**

Direção detalhada:

- `pertencer-colus.md`
- `landing-colus-master.drawio` — bloco **Pertencer** no canvas contínuo

---

# 45. Gate V0.7

O high-fidelity cobre agora:

- Intro Morph;
- Hero Assembly;
- Manifesto;
- Aprender em Movimento;
- Futuro & Tecnologia;
- Vida COLUS;
- Pertencer.

Próximo foco:

> **TRANSFORMAR — confiança, protagonismo e futuro**


---

# 46. Transformar — direção integrada

Depois de Pertencer, o Community Ring abre-se e deixa um eixo ascendente.

Conceito:

> **RISE FIELD**

A secção usa esse eixo como progressão de confiança e possibilidade.

Headline de trabalho:

> **Quando a confiança cresce, novos caminhos tornam-se possíveis.**

## Estrutura

Três momentos editoriais:

- **01 / Expressar**
- **02 / Construir**
- **03 / Avançar**

Não são cards nem módulos.

São estágios da mesma progressão.

## Device principal

O **Rise Axis** evolui:

> linha fina → faixa luminosa → eixo de composição → horizonte

Sem seta literal, gráfico de crescimento, foguete ou cliché de “subida”.

## Desktop

- stage Deep Ink;
- headline de grande escala;
- eixo vertical fora do centro;
- media de expressão;
- media técnico/prático;
- media humano final;
- Orange com intensidade alta mas controlada.

## Mobile

No mobile:

- eixo lateral;
- três momentos empilhados;
- um media dominante por vez;
- horizonte final full-width;
- sem sticky longo.

## Saída

O eixo abre horizontalmente e torna-se horizonte.

A intensidade baixa para preparar:

> **DEPOIMENTOS**

A passagem conceptual é:

> **possibilidade → silêncio → voz → confiança**

Direção detalhada:

- `transformar-colus.md`
- `landing-colus-master.drawio` — bloco **Transformar** no canvas contínuo

---

# 47. Gate V0.8

O high-fidelity cobre agora:

- Intro Morph;
- Hero Assembly;
- Manifesto;
- Aprender em Movimento;
- Futuro & Tecnologia;
- Vida COLUS;
- Pertencer;
- Transformar.

Próximo foco:

> **DEPOIMENTOS — confiança sem cards genéricos**


---

# 48. Depoimentos — direção integrada

Depois de Transformar, a landing desacelera e passa da possibilidade para a prova humana.

Conceito:

> **VOICE IN FOCUS**

A secção mostra uma voz de cada vez.

Não utiliza:

- cards de review;
- cinco estrelas;
- carrossel genérico;
- citações inventadas;
- métricas sociais sem fonte.

## Device principal

O horizonte herdado de Transformar permanece e passa a usar um único:

> **Horizon Node**

O node marca a voz ativa e mantém continuidade visual.

## Conteúdo

Enquanto não existirem testemunhos reais/autorizados, o demonstrador usa placeholders explícitos:

> **TESTEMUNHO REAL / AUTORIZADO — A INSERIR**

e:

> **NOME / RELAÇÃO COM A ESCOLA — A VALIDAR**

Nenhuma quote deve ser fabricada.

## Desktop

- Deep Ink;
- quote grande;
- media/retrato opcional;
- identificação discreta;
- progressão 01 / 02 / 03 quando houver várias vozes.

## Mobile

- vozes em sequência vertical;
- sem slider obrigatório;
- sem auto-rotation;
- media opcional;
- leitura confortável.

## Saída

O Horizon Node chega ao extremo, deixa um halo subtil e prepara:

> **Venha conhecer de perto o Universo dos Sonhos.**

A passagem é:

> **confiança → proximidade → convite**

Direção detalhada:

- `depoimentos-colus.md`
- `landing-colus-master.drawio` — bloco **Depoimentos** no canvas contínuo

---

# 49. Gate V0.9

O high-fidelity cobre agora:

- Intro Morph;
- Hero Assembly;
- Manifesto;
- Aprender em Movimento;
- Futuro & Tecnologia;
- Vida COLUS;
- Pertencer;
- Transformar;
- Depoimentos.

Próximo foco:

> **CONVITE FINAL + FOOTER**


---

# 50. Convite Final — direção integrada

O fecho da landing usa o conceito:

> **RETURN TO LIGHT**

A experiência volta a concentrar-se em luz, marca e convite, sem reconstruir um Hero nem um banner comercial.

Headline:

> **Venha conhecer de perto o Universo dos Sonhos.**

CTAs:

- **Marcar uma visita**
- **Falar connosco →**

## Device principal

O Horizon Node vindo de Depoimentos expande-se e transforma-se num halo.

O Light Device regressa pela última vez:

- abertura → revelação;
- Futuro & Tecnologia → conexão;
- Convite Final → proximidade.

O mark pode reaparecer de forma pequena/mediana, integrado na luz.

## Composição

Desktop:

- Warm Paper / Warm White;
- mark subtil;
- halo amplo;
- headline central;
- supporting copy curta;
- CTA principal + link secundário;
- Open Book memory na base;
- sem media pesado.

Mobile:

- mark;
- headline;
- copy;
- CTA quase full-width;
- link secundário;
- Open Book memory;
- muito espaço.

## Footer

O Convite Final termina **antes do Footer**.

O Footer não foi redesenhado nem reinterpretado neste bloco.

Foi deixada apenas a fronteira de passagem, para integrar posteriormente a definição já existente do utilizador.

Direção detalhada:

- `convite-final-colus.md`
- `landing-colus-master.drawio` — bloco **Convite Final** no canvas contínuo

---

# 51. Gate V0.10

O high-fidelity cobre agora:

- Intro Morph;
- Hero Assembly;
- Manifesto;
- Aprender em Movimento;
- Futuro & Tecnologia;
- Vida COLUS;
- Pertencer;
- Transformar;
- Depoimentos;
- Convite Final.

Único bloco público ainda por integrar:

> **FOOTER — usar definição já existente, sem reinventar**


---

# 52. Footer — padrão EduCore / RIGHTWARE integrado

O Footer não foi reinventado.

Foi integrado a partir da definição visual fornecida pelo utilizador.

Padrão reutilizável documentado em:

> `../../../educore/design/footer-standard.md`

## Estrutura preservada

- EduCore logo;
- tagline:
  **Integrated school management for stronger institutions.**
- PLATFORM;
- SOLUTIONS;
- SUPPORT;
- COMPANY;
- RIGHTWARE Product lockup;
- LinkedIn / YouTube / X / Instagram;
- copyright institucional do cliente;
- product attribution EduCore / RIGHTWARE;
- Privacy Policy;
- Terms of Service;
- Cookie Policy;
- System Status.

## Variante usada na landing COLUS

> **DARK FOOTER**

A razão é composicional: o Convite Final termina claro / Warm Paper, por isso a variante dark cria uma fronteira terminal limpa.

A variante Light permanece válida no sistema EduCore.

## Regra

O Footer é global do produto EduCore / RIGHTWARE.

Não deve ser redesenhado por escola.

A implementação COLUS apenas o integra no contexto da landing.

---

# 53. Gate V0.11 — Landing pública completa

A narrativa visual da landing está agora definida de ponta a ponta:

- Intro Morph;
- Hero Assembly;
- Manifesto;
- Aprender em Movimento;
- Futuro & Tecnologia;
- Vida COLUS;
- Pertencer;
- Transformar;
- Depoimentos;
- Convite Final;
- Footer EduCore / RIGHTWARE.

O próximo passo já não é inventar novas secções.

É:

> **REVISÃO GLOBAL DO MASTER + CONSOLIDAÇÃO HIGH-FIDELITY ANTES DE IMPLEMENTAÇÃO**


## Regra de copyright e assinatura de marca

Na landing COLUS, a linha legal final é:

> **© 2026 Colégio Universo dos Sonhos. Todos os direitos reservados.**  
> **Powered by EduCore · A RIGHTWARE Product**

Além disso, os **logos EduCore e RIGHTWARE permanecem obrigatórios no Footer**.

A marca COLUS não substitui a assinatura de produto da RIGHTWARE.


---

# 54. Motion Hierarchy global

Foi fechada a hierarquia de motion da landing.

Direção:

> **2 signature moments + 3 narrative blocks + 4 subtle blocks + Footer static.**

## Signature

- Intro Morph;
- Futuro & Tecnologia.

## Narrative

- Hero → Manifesto;
- Aprender em Movimento;
- Transformar.

## Subtle

- Vida COLUS;
- Pertencer;
- Depoimentos;
- Convite Final.

## Static / Utility

- Footer.

## Primitives globais

A implementação deve reduzir os vários devices conceptuais a:

- **Path**
- **Node**
- **Mask**
- **Light / Halo**
- **Media Window**

O objetivo é que Learning Trail, Signal Field, Community Ring, Rise Axis e Horizon pareçam evoluções do mesmo sistema — não efeitos independentes.

## Regra de simultaneidade

Por viewport:

> **1 movimento dominante + 1 secundário + 1 micro-interação.**

## Handoffs

Cada secção entrega um elemento à seguinte:

> Book/Light → Hero → Book curve/media → Node → Learning Trail → Signal Field → Story Marker → Community Ring → Rise Axis → Horizon Node → Halo → Footer estático.

## Mobile

A intensidade de motion deve cair para aproximadamente 50–60% do desktop, preservando narrativa e eliminando pinning longo.

## Reduced motion

A experiência continua integral com states finais, sem morph longo, sem parallax e sem dependência da animação.

Direção detalhada:

- `motion-hierarchy-colus.md`
- `landing-colus-master.drawio` — painel **Motion Hierarchy — Consolidação Global V0.1**

---

# 55. Gate V0.12

Motion Hierarchy global consolidada.

Próximo passo:

> **HEADER + ANCHORS GLOBAL SYSTEM**


---

# 56. Header + Anchors global system

Foi fechado o comportamento global do Header público.

## Navegação

- **O Colégio** → `#o-colegio` → Manifesto
- **Experiência** → `#experiencia` → Aprender em Movimento
- **Futuro** → `#futuro` → Futuro & Tecnologia
- **Comunidade** → `#comunidade` → Pertencer
- **Contactos** → `#contactos` → Convite Final
- **Marcar uma visita** → `#contactos`

Vida COLUS, Transformar e Depoimentos continuam narrativos e não aumentam a densidade da navegação.

## Estados do Header

> **H0 Intro hidden → H1 Assembly → H2 Hero transparent/dark → H3 Light Sticky → H4 Dark Sticky → H5 Footer Exit**

O Header nasce do próprio Intro Morph.

Não existe Header completo sobre o Splash inicial.

## Theme switching

Cada secção declara explicitamente:

- hidden;
- transparent;
- light;
- dark.

O Header não tenta inferir contraste a partir dos pixels do media.

## Auto-hide

Depois do Hero:

- scroll down → recolhe;
- scroll up → regressa;
- permanece visível com foco, menu aberto ou interação com CTA.

## Mobile

- mark + menu;
- altura 60–64px;
- overlay/sheet simples;
- cinco anchors;
- CTA;
- sem Portal/Login.

## Implementação

- anchors reais/deep-linkáveis;
- `scroll-margin-top`;
- IntersectionObserver;
- focus visible;
- `aria-current='location'`;
- reduced motion;
- Header desaparece antes do Footer.

Direção detalhada:

- `header-anchors-colus.md`
- `landing-colus-master.drawio` — painel **Header + Anchors — Global System V0.1**

---

# 57. Gate V0.13

Header + Anchors global consolidado.

Próximo passo:

> **SCROLL BUDGET GLOBAL**


---

# 58. Scroll Budget global

Foi fechado o budget de scroll da landing para evitar uma experiência excessivamente longa.

## Desktop

Faixa preferida da narrativa, sem Footer:

> **~1430–1490vh**

Footer:

> **altura natural / auto**

Referência por bloco:

- Intro Morph → **200vh**
- Hero + Manifesto → **170vh**
- Aprender em Movimento → **185vh**
- Futuro & Tecnologia → **230vh**
- Vida COLUS → **155vh**
- Pertencer → **130vh**
- Transformar → **165vh**
- Depoimentos → **100–160vh**, conforme 1–3 vozes
- Convite Final → **95vh**

## Sticky contract

### Forte
- Intro Morph
- Futuro & Tecnologia

### Moderado
- Aprender em Movimento
- Transformar

### Natural / partial
- Hero + Manifesto
- Vida COLUS
- Pertencer

### Natural
- Depoimentos
- Convite Final
- Footer

## Mobile

Faixa de trabalho:

> **~1150–1350svh + Footer natural**

Mobile não replica o pinning desktop.

## Fast-scroll

- sem scroll-jacking;
- sem snap obrigatório;
- states interpolam diretamente;
- nenhuma animação bloqueia input;
- anchors aterram em states estáveis.

## Reduced motion

Reduced motion também reduz o comprimento das secções que reservavam espaço apenas para animação.

Direção detalhada:

- `scroll-budget-colus.md`
- `landing-colus-master.drawio` — painel **Scroll Budget — Global V0.1**

---

# 59. Gate V0.14

Scroll Budget global consolidado.

Próximo passo:

> **COPY STATUS — LOCKED / WORKING / PLACEHOLDER**


---

# 60. Copy Status global

Foi classificada toda a copy da landing em três estados:

- **LOCKED**
- **WORKING**
- **PLACEHOLDER**

Também foi separado um quarto estado técnico:

- **INTERNAL ONLY**

para nomes de devices/conceitos que nunca devem aparecer na landing pública.

## LOCKED

Inclui:

- COLÉGIO UNIVERSO DOS SONHOS;
- Juntos Tornamos Sonhos Em Realidade;
- navegação principal;
- labels estruturais principais;
- TIC / Engenharia / Ciência / Segurança Digital;
- VOZES COLUS;
- copyright COLUS;
- Powered by EduCore · A RIGHTWARE Product;
- estrutura de marca do Footer.

## WORKING

Inclui:

- supporting copy do Hero;
- Manifesto;
- Descobrir / Criar;
- Futuro;
- Vida COLUS;
- Pertencer;
- Transformar;
- Convite Final;
- labels de CTA enquanto o destino operacional não estiver validado;
- língua dos labels globais do Footer.

## PLACEHOLDER

Inclui:

- testemunhos;
- identificação de testemunhos;
- contactos finais;
- destinos reais dos CTAs;
- contexto específico de media;
- métricas/claims/programas/infraestruturas não confirmados.

## Internal only

Nomes como:

- Learning Trail;
- Signal Field;
- Community Ring;
- Rise Field;
- Voice in Focus;
- Return to Light;
- Scene Window.

Nunca devem ser renderizados como copy pública.

Direção detalhada:

- `copy-status-colus.md`
- `landing-colus-master.drawio` — painel **Copy Status V0.1**

---

# 61. Gate V0.15

Copy Status consolidado.

Próximo passo:

> **CONTACTOS + CTA DESTINATIONS**


---

# 62. Contactos + CTA Destinations

Foi fechado o comportamento dos contactos públicos e dos CTAs sem inventar um workflow interno do COLUS.

## Contactos usados no demonstrador

### Publicamente corroborado
- **+258 84 700 0242**
- **Matola-Rio · KM 16**

### Publicamente observado / revalidar antes de produção
- **info@colus.ac.mz**
- **@colus_mz**

Outros números anteriormente observados não entram nesta versão.

## Localização visual

Os contactos COLUS ficam no:

> **Convite Final**

e não no Footer EduCore / RIGHTWARE.

Contact strip:

> info@colus.ac.mz · +258 84 700 0242 · Matola-Rio · KM 16 · @colus_mz

## Routing

### Header / Hero
- Marcar uma visita → `#contactos`
- Descobrir o COLUS → `#o-colegio`

### Convite Final
- Marcar uma visita → `mailto:info@colus.ac.mz?subject=Pedido%20de%20visita%20ao%20COLUS`
- Falar connosco → `tel:+258847000242`

Isto inicia contacto através de canais públicos e **não afirma que existe booking, WhatsApp, chat ou formulário operacional**.

## Não implementar nesta fase

- WhatsApp CTA;
- agenda/booking;
- formulário com submissão;
- mapa/pin;
- chat;
- horário oficial;
- SLA.

Direção detalhada:

- `contactos-cta-colus.md`
- `landing-colus-master.drawio` — painel **Contactos + CTA Destinations V0.1**

---

# 63. Gate V0.16

Contactos + CTA Destinations consolidados.

Todos os itens P0 da auditoria global estão agora resolvidos.

Próximo passo:

> **TYPOGRAPHY + GRID RESPONSIVE SYSTEM**

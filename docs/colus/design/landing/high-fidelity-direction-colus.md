# High-Fidelity Direction — Landing COLUS

> **Estado:** HIGH-FIDELITY V0.1 — EM DESENVOLVIMENTO  
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

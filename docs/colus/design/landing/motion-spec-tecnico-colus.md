# Motion Spec Técnico — Landing COLUS

> **Versão:** V1.0  
> **Data:** 2026-10-03  
> **Estado:** FINAL PARA IMPLEMENTAÇÃO  
> **Stack alvo:** React + TypeScript + Framer Motion + SVG/CSS  
> **Base:** Master V0.18 + Motion Hierarchy + Scroll Budget + Asset Gate V0.3.

---

## 1. Princípio técnico

A landing usa **native scroll**.

Não introduzir:
- Lenis/smooth-scroll global por defeito;
- scroll-jacking;
- snap obrigatório;
- canvas/WebGL para os devices principais;
- timelines independentes sem coordenação.

Usar:
- Framer Motion `useScroll`;
- `useTransform`;
- `useSpring` apenas onde smoothing visual acrescenta valor;
- SVG para Path/Node/Mark;
- CSS transforms/opacity;
- IntersectionObserver para media/header/active sections;
- `useReducedMotion`.

---

# 2. Primitives de implementação

## `MotionPath`

Responsável por:
- Learning Trail;
- Signal Field;
- Community Ring;
- Rise Axis;
- Horizon.

Props conceptuais:
- `progress: MotionValue<number>`;
- `variant`;
- `strokeWidth`;
- `pathLength`;
- `opacity`.

## `MotionNode`

Estados:
- hidden;
- idle;
- active;
- contextual.

## `MediaWindow`

Responsável por:
- mask/aperture;
- crop;
- scale;
- border-radius;
- aspect ratio;
- media swap/crossfade.

## `LightHalo`

Usos fortes limitados a:
- Intro;
- Futuro;
- Convite Final.

## `SectionProgress`

Cada secção expõe progress normalizado `0 → 1`.

Contrato:
> **o layout não depende de frames intermediários existirem; qualquer progress deve renderizar um estado válido.**

---

# 3. Smoothing

Progress principal:
> **raw scroll progress**

Não aplicar spring em texto/semântica que precise responder imediatamente.

Spring opcional para Path/Node/ornamento:

```text
stiffness: 140
damping: 32
mass: 0.45
```

Se houver atraso perceptível em fast-scroll, remover spring.

---

# 4. Global transform limits

Texto:
- translate Y: **8–18px**;
- opacity: `0 → 1`;
- clip/mask curto;
- sem blur obrigatório.

Media normal:
- scale máximo habitual: **1.00 → 1.03**;
- translate: **≤ 4vw / 4vh**;
- sem tilt 3D.

Nodes:
- escala ativa: **1.0 → 1.15**;
- opacity: `0.35 → 1`;
- sem pulse infinito.

Intro Morph:
> pode ultrapassar estes limites porque o mark transforma-se em arquitetura.

---

# 5. Intro Morph — 200vh — SIGNATURE

Desktop ≥1024.

Progress local `p`:

## `0.00 → 0.12` — Silence
- mark derivado centrado;
- Header hidden;
- background Deep Ink/Warm dark;
- sem media.

## `0.12 → 0.32` — Book Open
- book leaves separam horizontalmente;
- rotação outward subtil, máximo ~10–12°;
- stem/light mantém eixo central;
- community nodes começam a ganhar opacity.

## `0.32 → 0.52` — Light Rise
- Light Device sobe e cresce;
- halo `0 → 1`;
- mark deixa de parecer logo estático;
- nodes começam a migrar para posições de composição.

## `0.46 → 0.70` — Aperture Reveal
- `MediaWindow` cresce de mask pequena para janela dominante;
- poster Hero aparece primeiro;
- vídeo inicia apenas quando aperture já é legível;
- book leaves tornam-se limites laterais/curvas do stage.

## `0.68 → 0.86` — Radial Separation
- nodes afastam-se;
- alguns deixam o mark e passam a device contextual;
- não mais de 5–7 nodes visíveis simultaneamente.

## `0.82 → 1.00` — Hero Assembly
- mark compacto migra para posição de Header;
- Hero headline revela;
- CTA revela;
- Header links entram por último;
- p=1 é exatamente o Hero estável.

Asset:
- poster: `COLUS-HERO-POSTER-001`;
- video: `COLUS-HERO-VID-001-SPORT-DAY.mp4`.

Hero video prep:
> recortar um segmento limpo de ação do source 1280×720; evitar frames com títulos gráficos incorporados.

Fallback:
- poster estático;
- mark já aberto;
- Hero montado.

---

# 6. Hero → Manifesto — 170vh — NARRATIVE / BRIDGE

Hero deve permanecer legível antes de sair.

## `0.00 → 0.32`
- Hero estável;
- vídeo scale máximo `1 → 1.02`;
- headline fixa visualmente, sem parallax.

## `0.32 → 0.58`
- media desloca/crop suavemente;
- CTA reduz prioridade;
- residual node entrega a Open Book curve.

## `0.52 → 0.78`
- Warm Paper começa a substituir Deep Ink;
- Book curve abre a próxima superfície;
- Hero headline sai por opacity + translate curto.

## `0.72 → 1.00`
- Manifesto headline entra;
- `COLUS-MANIFESTO-HUMANO-001` estabiliza;
- Header muda para Light Sticky apenas depois do fundo claro dominar.

---

# 7. Aprender em Movimento — 185vh — NARRATIVE

Desktop: sticky editorial moderado.

## `0.00 → 0.15` — Chapter
- label + headline;
- Learning Trail ainda curto.

## `0.15 → 0.42` — Descobrir
- trail progride ~20% → 45%;
- media principal: `COLUS-APRENDER-DESCOBRIR-001`;
- secondary/crossfade: `...DESCOBRIR-002`;
- apenas um media dominante.

## `0.42 → 0.58` — Handoff
- node ativo desloca-se;
- media mask muda proporção;
- texto Descobrir sai;
- Criar entra.

## `0.58 → 0.88` — Criar
- trail progride ~55% → 88%;
- media: `COLUS-APRENDER-CRIAR-001`;
- detalhe: `...CRIAR-002`;
- scale máximo `1.03`.

## `0.88 → 1.00` — To Signal
- trail deixa de ser curva editorial;
- stroke/geometry prepara Signal Field;
- não desaparecer e reaparecer do zero.

---

# 8. Futuro & Tecnologia — 230vh — SIGNATURE

Header: Dark Sticky.

Signal Field é o device dominante.

Progress:

## `0.00 → 0.10` — Entry
- headline `O futuro também se aprende.`;
- Signal Field entra em estado base.

## `0.10 → 0.30` — TIC
- scene window: `COLUS-FUTURO-TIC-001`;
- secondary: `COLUS-FUTURO-TIC-FEMALE-001`;
- node ativa TIC;
- copy não deve alegar evento específico.

## `0.30 → 0.48` — Engenharia
- **device-led**;
- sem fotografia genérica;
- Path + Node + schematic geometry;
- grid técnico subtil;
- Light Halo discreto;
- copy editorial de Engenharia.

## `0.48 → 0.70` — Ciência
- media: `COLUS-FUTURO-CIENCIA-VID-001`;
- fallback still: `COLUS-FUTURO-CIENCIA-001`;
- vídeo só toca quando scene active;
- crossfade curto.

## `0.70 → 0.88` — Segurança Digital
- media: `COLUS-FUTURO-TIC-002` ou `...TIC-003`;
- Signal Field reorganiza nodes;
- não usar HUD, glitch ou neon.

## `0.88 → 1.00` — Exit
- Signal Field desacelera;
- Scene Window deixa de ser interface e torna-se media editorial;
- entrega Story Marker a Vida COLUS.

---

# 9. Vida COLUS — 155vh — SUBTLE

Mostly natural flow.

Motion não deve competir com media.

Entrada:
- Story Marker entra com 8–12px translate;
- media reveal curto.

Sequência recomendada:
- `COLUS-VIDA-SPORT-001`;
- `COLUS-VIDA-CULTURA-001`;
- `COLUS-VIDA-EXPRESSAO-001`;
- trecho curto de `COLUS-VIDA-SPELLING-VID-001`;
- `COLUS-VIDA-LITERARIO-001` como ALT.

Regras:
- máximo dois media no mesmo viewport;
- scale ≤1.025;
- vídeo autoplay apenas quando ≥60% visível;
- parar ao sair;
- nenhum carousel automático.

Saída:
- último Story Marker desloca-se para origem do Community Ring.

---

# 10. Pertencer — 130vh — SUBTLE

Media:
- `COLUS-PERTENCER-INTERACAO-001` — principal;
- `COLUS-PERTENCER-COMUNIDADE-001` — apoio;
- `...COMUNIDADE-002` — ALT.

## `0.00 → 0.22`
- headline entra;
- node residual aparece.

## `0.18 → 0.48`
- Community Ring desenha ~25% → 80%;
- nodes assentam;
- sem rotação orbital.

## `0.38 → 0.72`
- media ganha presença;
- ring fica secundário.

## `0.72 → 0.92`
- ring abre num ponto;
- arc deixa de fechar círculo;
- o ponto aberto transforma-se no início do Rise Axis.

## `0.92 → 1.00`
- Rise Axis já visível;
- handoff direto para Transformar.

---

# 11. Transformar — 165vh — NARRATIVE

Header: Dark Sticky.

## `0.00 → 0.16` — Rise
- eixo entra;
- headline estabiliza.

## `0.16 → 0.40` — Expressar
- media: `COLUS-TRANSFORMAR-EXPRESSAR-001`;
- node 01 active;
- path vertical curto.

## `0.40 → 0.66` — Construir
- media: `COLUS-TRANSFORMAR-CONSTRUIR-001`;
- node 02 active;
- media crossfade / mask swap;
- sem slide lateral agressivo.

## `0.66 → 0.88` — Avançar
- media: `COLUS-TRANSFORMAR-AVANCAR-001`;
- node 03 active;
- usar como realização/progressão sem explicar o prémio.

## `0.88 → 1.00` — Horizon
- eixo vertical curva/abre horizontalmente;
- media reduz intensidade;
- Horizon Node nasce;
- entrega Depoimentos.

---

# 12. Depoimentos — 100–160vh — SUBTLE / NATURAL

Sem testemunho real:
> renderizar placeholder editorial interno no demo, nunca quote fabricada.

Quando existirem vozes reais:
- 1 voz → ~100vh;
- 2 → ~130vh;
- 3 → ~160vh.

Motion por voz:
- opacity `0 → 1`;
- translate Y 12px → 0;
- duration 480–620ms;
- media crossfade opcional;
- Horizon Node move para posição seguinte.

Não usar scrub contínuo para texto.

Ativação:
> IntersectionObserver / enter viewport.

Saída:
- último node percorre o restante da linha;
- chega ao extremo;
- expande para Halo.

---

# 13. Convite Final — 95vh — SUBTLE

Natural flow.

Entrada sequence:

1. Horizon Node → Halo;
2. mark derivado aparece;
3. headline;
4. supporting copy;
5. CTA;
6. contact strip;
7. Open Book memory.

Timing quando não scrubbado:
- halo: 650–850ms;
- mark: 420–520ms;
- headline: 480–620ms;
- CTA/contact strip: 380–520ms.

Stagger:
> **60–90ms**

Sem nova timeline complexa.

Header permanece Light e recolhe quando Footer entra.

---

# 14. Footer — STATIC / UTILITY

Sem entrance choreography.

Permitido:
- hover/focus 180–220ms;
- underline/opacity;
- icon response.

Não animar o lockup EduCore/RIGHTWARE como outro signature moment.

---

# 15. Header motion

## Intro
- hidden.

## Hero Assembly
- mark chega primeiro;
- links revelam em 40–60ms stagger;
- CTA por último.

## Sticky switch

Light/Dark:
- background opacity 220–280ms;
- text color 180–220ms;
- border 180ms;
- sem blur morph dramático.

## Auto-hide
- translateY `0 → -100%`;
- 220–280ms;
- ease `cubic-bezier(0.22,1,0.36,1)`.

---

# 16. Mobile motion contract — <768px

Mobile mantém narrativa e reduz coreografia.

## Intro
- 140–150svh;
- uma única sticky viewport curta é permitida;
- Book Open + Light + Reveal;
- nodes reduzidos em ~50%;
- Hero monta mais cedo.

## Aprender
- fluxo vertical;
- media reveal por IntersectionObserver;
- trail simplificado;
- sem sticky longo.

## Futuro
- cenas empilhadas;
- Signal Field fragmentado em cada cena;
- nenhum stage 230vh;
- videos on-demand por viewport.

## Pertencer
- ring parcial / static-draw curto;
- media dominante.

## Transformar
- axis lateral;
- três blocos naturais;
- sem scrub longo.

## Depoimentos
- stack vertical;
- sem auto-rotation.

## Convite
- halo menor;
- CTA quase full-width.

---

# 17. Tablet motion contract — 768–1023

- intensidade ~75% desktop;
- sticky limitado;
- path length reduzido;
- uma MediaWindow dominante;
- no máximo 4–5 nodes ativos;
- Futuro pode usar short-sticky, mas não copiar 230vh desktop 1:1.

---

# 18. Reduced Motion — contrato exato

Quando `prefers-reduced-motion: reduce`:

## Intro
- não reproduzir morph;
- renderizar Hero final imediatamente;
- mark compacto no Header;
- poster Hero em vez de autoplay video.

## Paths
- renderizar path em estado final;
- sem draw animation.

## Media
- sem parallax;
- sem scale contínuo;
- crossfade máximo 150–200ms ou imediato.

## Text
- sem stagger;
- opacity imediata ou 150ms.

## Scroll lengths
- remover espaço reservado exclusivamente ao motion;
- seguir reduções definidas no Scroll Budget.

---

# 19. Media playback

## Hero
- `muted`;
- `playsInline`;
- `loop` apenas no clip preparado;
- `preload='metadata'` ou equivalente;
- poster obrigatório;
- pausar quando Hero deixa viewport;
- não autoplay em reduced motion.

## Science / Vida
- lazy load;
- tocar apenas quando scene/media está ativa;
- pausar fora do viewport;
- evitar dois vídeos simultâneos.

Recomendação de preparação:
> exportar clips curtos de **6–10s** para Hero e **5–8s** para scene videos, em vez de carregar sources longos em runtime.

---

# 20. Asset ↔ motion map

| Secção | Asset principal | Motion |
|---|---|---|
| Hero | `COLUS-HERO-VID-001` | Aperture + subtle crop |
| Manifesto | `COLUS-MANIFESTO-HUMANO-001` | reveal / settle |
| Aprender / Descobrir | `...DESCOBRIR-001/002` | MediaWindow swap |
| Aprender / Criar | `...CRIAR-001/002` | MediaWindow swap |
| Futuro / TIC | `...TIC-001` + `...FEMALE-001` | Scene Window |
| Futuro / Engenharia | device-led | Path/Node/Schematic |
| Futuro / Ciência | `...CIENCIA-VID-001` | scene video |
| Vida | sport/cultura/expressão/spelling | Living Reel subtle |
| Pertencer | `...INTERACAO-001` | Community Ring support |
| Transformar | Expressar/Construir/Avançar | Rise Axis stages |
| Convite | derived mark | Halo + mark reveal |

---

# 21. Component architecture recomendada

Sem implementar ainda, a composição esperada é:

```text
LandingPage
├── LandingMotionProvider
├── IntroMorphSection
├── HeroManifestoSection
├── LearningTrailSection
├── FutureTechnologySection
├── LivingReelSection
├── BelongingSection
├── TransformSection
├── VoicesSection
├── FinalInvitationSection
└── EduCoreFooter

shared/motion/
├── MotionPath
├── MotionNode
├── MediaWindow
├── LightHalo
├── SectionProgress
└── ReducedMotionGate
```

Não criar uma engine separada por secção.

---

# 22. Performance budget

Objetivo:
- transform/opacity na maioria dos frames;
- SVG pathLength para draw;
- máximo um vídeo grande ativo;
- lazy media abaixo da próxima secção;
- poster sempre disponível;
- não recalcular layout em cada scroll frame;
- IntersectionObserver para visibility;
- motion values para transforms.

Evitar:
- animar width/height continuamente quando transform resolve;
- filtros blur grandes em vídeo;
- shadow animation pesada;
- listeners `scroll` manuais por secção;
- múltiplas RAF loops.

---

# 23. QA Motion

Testar obrigatoriamente:
- fast wheel scroll;
- trackpad lento;
- touch mobile;
- anchor jump durante sticky stage;
- voltar para cima;
- resize desktop → tablet;
- orientation change;
- reduced motion;
- vídeo bloqueado pelo browser;
- asset ainda não carregado;
- CPU/GPU média;
- browser sem autoplay.

Falha de media nunca pode quebrar layout.

---

# 24. Gate técnico

Motion Spec está aprovada quando:
- Intro e Futuro continuam os únicos signature moments;
- ranges são determinísticos;
- nenhum state depende de frame anterior;
- mobile funciona sem long pinning;
- reduced motion é completo;
- video playback é controlado;
- handoffs usam os mesmos primitives;
- Asset Gate V0.3 está mapeado.

Estado:

> **MOTION SPEC TÉCNICO — CLOSED**

Com Asset Gate fechado:

> **LANDING IMPLEMENTATION READY**

Próximo passo:

> **FRONTEND IMPLEMENTATION PLAN → depois código React/TSX.**
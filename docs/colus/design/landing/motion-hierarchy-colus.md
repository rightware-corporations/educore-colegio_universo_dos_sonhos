# Motion Hierarchy — Landing COLUS

> **Versão:** V0.1  
> **Data:** 2026-10-02  
> **Estado:** CONSOLIDAÇÃO HIGH-FIDELITY  
> **Objetivo:** transformar vários devices de motion num único sistema coerente.

---

## 1. Princípio

A landing não deve parecer uma sequência de nove demos de animação.

Todos os movimentos devem parecer variações do mesmo sistema.

> **Menos efeitos percebidos. Mais continuidade.**

O motion existe para:
- revelar hierarquia;
- ligar secções;
- transformar elementos existentes;
- orientar atenção;
- reforçar identidade.

Não existe para demonstrar complexidade técnica.

---

# 2. Três níveis de intensidade

## NÍVEL A — SIGNATURE MOTION

Máxima intensidade.

Reservado para apenas dois momentos:

### A1 — Intro Morph
- mark;
- book open;
- light reveal;
- media birth;
- hero assembly.

### A2 — Futuro & Tecnologia
- Learning Trail → Signal Field;
- Scene Window transformations;
- signal activation;
- multi-scene storytelling.

Regra:
> **Nunca existir outro bloco com complexidade equivalente no mesmo viewport próximo.**

---

## NÍVEL B — NARRATIVE MOTION

Intensidade média.

Usado quando o movimento ajuda a contar uma progressão.

### B1 — Hero → Manifesto
- Open To Meaning;
- media continuity;
- dark → warm transition.

### B2 — Aprender em Movimento
- Learning Trail;
- Descobrir → Criar;
- media progression.

### B3 — Transformar
- Rise Axis;
- Expressar → Construir → Avançar;
- axis → horizon.

Regra:
> motion perceptível, mas nunca mais complexo que Intro Morph ou Futuro & Tecnologia.

---

## NÍVEL C — SUBTLE MOTION

Baixa intensidade.

### C1 — Vida COLUS
- media crop shift;
- small scale;
- Story Markers;
- transitions leves.

### C2 — Pertencer
- arc draw;
- node settle;
- media reposition pequeno.

### C3 — Depoimentos
- quote reveal;
- Horizon Node;
- media crossfade suave.

### C4 — Convite Final
- halo expansion;
- mark reveal;
- headline/CTA;
- Open Book memory.

Regra:
> se o utilizador notar primeiro a animação e só depois o conteúdo, está forte demais.

---

# 3. Footer

O Footer é:

> **STATIC / UTILITY**

Permitido apenas:
- hover states;
- focus states;
- pequenos icon transitions;
- underline/opacity;
- nenhuma coreografia de entrada.

O Footer encerra a experiência. Não abre um novo espetáculo.

---

# 4. Primitives globais

Em implementação, os vários nomes conceptuais devem reduzir-se a poucos primitives reutilizáveis.

## 4.1 Path

Base para:
- Learning Trail;
- Signal Field;
- Community Ring;
- Rise Axis;
- Horizon.

Um mesmo primitive SVG/path com variantes de:
- stroke;
- width;
- curvature;
- progress;
- gradient;
- opacity.

---

## 4.2 Node

Base para:
- radial nodes;
- Story Markers;
- community nodes;
- Horizon Node;
- progress dots.

Estados:
- idle;
- active;
- contextual;
- muted;
- hidden.

---

## 4.3 Mask

Base para:
- Book Aperture;
- Scene Window;
- media reveal;
- crop transition.

Evitar criar uma máscara nova sem relação com estes primitives.

---

## 4.4 Light / Halo

Base para:
- Intro reveal;
- Futuro connection;
- Convite Final.

Máximo de três usos fortes na landing.

---

## 4.5 Media Window

Um primitive comum para media transformável:
- Hero;
- Futuro & Tecnologia;
- Vida COLUS;
- Transformar.

Varia:
- aspect ratio;
- crop;
- mask;
- position;
- scale.

---

# 5. Regra de simultaneidade

Por viewport, máximo recomendado:

- **1 movimento dominante**;
- **1 movimento secundário**;
- **1 micro-interação**.

Exemplo correto:

```text
Signal Field progride
+ Scene Window transforma
+ node ativa
```

Exemplo incorreto:

```text
Signal Field progride
+ 4 media movem
+ 6 nodes orbitam
+ headline parallax
+ background morph
+ halo pulsa
```

---

# 6. Easing global

## Discrete UI / reveals

Base:

> `cubic-bezier(0.22, 1, 0.36, 1)`

## Micro interactions

Faixa:
- 180–260ms.

## Text / component reveal

Faixa:
- 420–650ms.

## Section handoff

Faixa:
- 650–1000ms, quando não estiver diretamente scrubbado pelo scroll.

## Scroll-bound motion

Não usar duration fixa como mecanismo principal.

Usar:
- progress normalizado;
- transforms derivados de scroll;
- smoothing leve;
- sem elastic/bounce.

---

# 7. Movimento de texto

Texto não deve flutuar constantemente.

Permitido:
- mask reveal;
- translate Y de 8–18px;
- opacity;
- clip curto.

Evitar:
- blur exagerado;
- letter-by-letter em body copy;
- parallax de headline;
- scramble/glitch;
- kinetic typography prolongada.

Headline deve estabilizar rapidamente para leitura.

---

# 8. Movimento de media

Valores de direção:
- scale máximo habitual: `1.00 → 1.03`;
- translate curto;
- crop shift;
- mask transform;
- opacity/crossfade quando necessário.

Exceção:
- Intro Morph pode ultrapassar estes limites porque o próprio logo vira arquitetura.

Evitar:
- tilt 3D;
- infinite float;
- aggressive zoom;
- rotação sem função;
- vários vídeos autoplay simultâneos.

---

# 9. Handoffs entre secções

Cada transição deve passar **um elemento existente** para a próxima secção.

```text
Intro → Hero
Book / Light / Nodes

Hero → Manifesto
Book curve + media continuity

Manifesto → Aprender
residual node → Learning Trail

Aprender → Futuro
Trail → Signal Field

Futuro → Vida
Scene Window → fotografia / Story Markers

Vida → Pertencer
Story Marker → Community Ring

Pertencer → Transformar
open arc → Rise Axis

Transformar → Depoimentos
Rise Axis → Horizon

Depoimentos → Convite
Horizon Node → Halo

Convite → Footer
motion termina → utility surface
```

Regra:
> **não iniciar um novo device do zero quando a secção anterior pode entregá-lo.**

---

# 10. Densidade por secção

| Secção | Nível | Device dominante | Secondary | Proibição principal |
|---|---|---|---|---|
| Intro Morph | A | Book/Mark Morph | Light + Nodes | efeitos paralelos externos |
| Hero | B | Hero Assembly | Media/Nodes | parallax contínuo |
| Manifesto | C | Media continuity | Book curve | motion decorativo |
| Aprender | B | Learning Trail | Media Window | sticky excessivo |
| Futuro & Tecnologia | A | Signal Field | Scene Window | HUD/neon/glitch |
| Vida COLUS | C | Living Reel | Story Markers | gallery motion excessivo |
| Pertencer | C | Community Ring | media relation | orbital/rotação |
| Transformar | B | Rise Axis | media activation | cliché de crescimento |
| Depoimentos | C | Horizon Node | quote reveal | carousel autoplay |
| Convite Final | C | Halo | mark/headline | nova coreografia complexa |
| Footer | Static | none | hover/focus | entrance choreography |

---

# 11. Desktop / tablet / mobile

## Desktop

Permite todos os níveis A/B/C conforme definido.

## Tablet

Reduzir:
- sticky duration;
- node density;
- simultaneous transforms;
- complex masks.

Regra:
> intensidade visual ~75% do desktop.

## Mobile

Regra global:
> intensidade visual ~50–60% do desktop.

Manter narrativa, reduzir coreografia.

Preferir:
- vertical flow;
- short reveals;
- simplified paths;
- fewer nodes;
- no long pinning.

---

# 12. Reduced Motion

`prefers-reduced-motion: reduce` deve produzir uma experiência completa, não uma versão quebrada.

Regras:
- Intro abre diretamente no Hero final;
- paths ficam estáticos ou mostram estado final;
- Scene Windows não fazem morph longo;
- media não usa parallax;
- quote/CTA aparecem imediatamente ou com fade curto;
- nenhuma navegação depende de scroll animation.

---

# 13. Performance guardrails

Antes de implementação:
- preferir `transform` e `opacity`;
- usar SVG para paths/nodes;
- clip-path/mask apenas onde realmente necessário;
- não usar canvas para os devices principais;
- não criar listeners independentes por secção;
- centralizar scroll progress/orchestration;
- limitar vídeos ativos;
- pausar media fora do viewport quando aplicável.

---

# 14. Gate da Motion Hierarchy

A motion hierarchy fica aprovada para consolidação quando:
- só Intro e Futuro são percebidos como signature moments;
- os restantes blocos servem conteúdo;
- Path/Node/Mask/Light/Media Window são os primitives globais;
- cada handoff nasce do anterior;
- mobile reduz intensidade sem perder narrativa;
- reduced motion funciona;
- Footer permanece estático.

---

# 15. Decisão V0.1

> **2 signature moments + 3 narrative motion blocks + 4 subtle blocks + 1 static footer.**

Próximo passo da consolidação:

> **HEADER + ANCHORS GLOBAL SYSTEM**
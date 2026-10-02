# Typography + Grid Responsive System — Landing COLUS

> **Versão:** V0.1  
> **Data:** 2026-10-02  
> **Estado:** CONSOLIDAÇÃO HIGH-FIDELITY  
> **Objetivo:** fechar tipografia, grid, gutters, max-widths, spacing e regras responsivas antes da consolidação final do master.

---

## 1. Princípio

A landing precisa parecer editorial e cinematográfica sem perder precisão de produto.

O sistema base fica:

> **Manrope = estrutura, interface, precisão**

> **Newsreader = humanidade, manifesto, voz editorial**

Não usar Newsreader em excesso. Se tudo for editorial, nada é editorial.

---

# 2. Famílias tipográficas

## Manrope

Uso principal:
- Hero headline;
- section headlines tecnológicas;
- labels;
- navegação;
- CTA;
- captions;
- body funcional;
- Footer;
- números / progress.

Pesos permitidos:
- 400;
- 500;
- 600;
- 700.

Evitar 800 como padrão.

---

## Newsreader

Uso seletivo:
- Manifesto;
- Pertencer;
- Depoimentos;
- Convite Final;
- uma palavra/frase editorial quando ajuda a composição.

Pesos permitidos:
- 400;
- 500;
- 600.

Não usar em:
- Header;
- CTA;
- labels;
- progress indicators;
- Footer navigation;
- Scene labels;
- microcopy funcional.

---

# 3. Fallback stacks

Implementação de trabalho:

```css
--font-sans: 'Manrope', Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-editorial: 'Newsreader', Georgia, 'Times New Roman', serif;
```

A fonte final deve ser carregada de forma local/otimizada quando os assets estiverem fechados.

---

# 4. Escala tipográfica

## Display XL — Hero

Desktop:
> **clamp(72px, 7vw, 112px)**

Line-height:
> **0.94–1.00**

Tracking:
> **-0.03em a -0.045em**

Mobile:
> **clamp(44px, 13vw, 58px)**

---

## Display L — Section Signature

Uso:
- Futuro & Tecnologia;
- Transformar;
- Convite Final.

Desktop:
> **clamp(60px, 5.4vw, 84px)**

Line-height:
> **0.98–1.05**

Mobile:
> **clamp(38px, 10vw, 48px)**

---

## Display M — Editorial

Uso:
- Manifesto;
- Pertencer;
- Depoimentos.

Desktop:
> **clamp(48px, 4.3vw, 68px)**

Mobile:
> **clamp(34px, 8.5vw, 44px)**

---

## H2 / Chapter

Desktop:
> **36–48px**

Tablet:
> **32–40px**

Mobile:
> **28–34px**

---

## H3 / Scene

Desktop:
> **24–30px**

Mobile:
> **22–26px**

---

## Body L

> **18px / 30px**

Uso:
- supporting copy;
- manifesto body curto.

---

## Body

> **16px / 26px**

Uso padrão.

---

## Small

> **14px / 22px**

---

## Caption / Meta

> **12–13px / 18–20px**

---

## Eyebrow / Label

> **11–12px / 16px**

Tracking:
> **0.08em–0.12em**

Uppercase apenas para labels curtos.

---

# 5. Hierarquia por secção

| Secção | Família headline | Escala |
|---|---|---|
| Hero | Manrope 700 | Display XL |
| Manifesto | Newsreader 500/600 | Display M |
| Aprender | Manrope 700 | H2 / Display M |
| Futuro | Manrope 700 | Display L |
| Vida COLUS | Manrope 600/700 | H2 / Display M |
| Pertencer | Newsreader 500/600 | Display M |
| Transformar | Manrope 700 | Display L |
| Depoimentos | Newsreader 500/600 | Display M |
| Convite Final | Newsreader 500 + Manrope support | Display L/M |
| Footer | Manrope 400–700 | utility scale |

---

# 6. Max-widths de texto

## Hero headline
> **max 12–14ch**

## Section headline
> **max 13–16ch**

## Editorial quote / manifesto
> **max 16–20ch**

## Supporting copy
> **max 42–58ch**

## Long body
> **max 62–68ch**

Não deixar grandes headlines atravessar quase toda a largura do viewport.

---

# 7. Grid global

## Desktop ≥ 1280px

> **12 colunas**

Content max-width:
> **1440px**

Outer gutters:
> **64–80px**

Column gap:
> **24–32px**

---

## Desktop compacto 1024–1279px

> **12 colunas**

Outer gutters:
> **40–48px**

Column gap:
> **20–24px**

---

## Tablet 768–1023px

> **8 colunas**

Outer gutters:
> **32px**

Column gap:
> **20–24px**

---

## Mobile 0–767px

> **4 colunas**

Outer gutters:
> **20px**

Column gap:
> **16px**

Em mobile largo (≥480px), o gutter pode crescer para 24px.

---

# 8. Full-bleed contract

Algumas secções podem sair do content container:
- Hero media;
- Futuro & Tecnologia stage;
- Vida COLUS media;
- Transformar background;
- Footer surface.

Mesmo quando full-bleed:
- copy volta ao grid;
- focusable controls respeitam gutters;
- captions não encostam à edge.

---

# 9. Spacing scale

Base:
> **4px**

Tokens principais:

```text
4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 120 · 144 · 160
```

Evitar valores arbitrários fora da escala salvo composição de motion/mask.

---

# 10. Section padding

## Desktop

Natural sections:
> **120–160px** vertical

Compact transitions:
> **80–96px**

## Tablet

> **88–120px**

## Mobile

> **72–96px**

Signature sticky sections gerem espaço por scroll budget, não por padding inflado.

---

# 11. Breakpoints funcionais

```text
< 480      compact mobile
480–767    mobile
768–1023   tablet
1024–1279  compact desktop
1280–1599  desktop
≥ 1600     wide desktop
```

Os breakpoints não existem apenas para mudar font-size. Também alteram:
- grid;
- sticky/pinning;
- media composition;
- node density;
- Header behavior;
- crop strategy.

---

# 12. Sticky por breakpoint

## ≥ 1024px

Aplicar o Scroll Budget aprovado:
- Intro forte;
- Futuro forte;
- Aprender moderado;
- Transformar moderado.

## 768–1023px

Reduzir:
- Intro pinning;
- Futuro stage duration;
- transforms simultâneos.

Sticky pode existir, mas não deve reproduzir desktop 1:1.

## < 768px

> **sem long pinning**

Usar fluxo vertical e states curtos.

---

# 13. Responsive typography rule

Não usar dezenas de media queries de font-size.

Preferir:
- `clamp()`;
- 3 escalas principais;
- max-width por `ch`;
- line-height ajustado por role.

Exemplo:

```css
font-size: clamp(3rem, 5.4vw, 5.25rem);
line-height: 1;
max-width: 14ch;
```

---

# 14. Media aspect ratios

## Hero
- desktop: 16:9 / cinematic crop;
- mobile: 4:5 ou 9:16 crop derivado do mesmo asset quando possível.

## Scene Windows
- desktop: variável entre 4:3 / 3:2 / vertical;
- tablet: reduzir variações extremas;
- mobile: 4:5 / 3:4 predominante.

## Vida COLUS
- permitir combinação editorial;
- mobile: um media dominante por vez.

Não forçar desktop crop no mobile.

---

# 15. CTA sizing

## Desktop

Primary:
> **48–54px height**

Horizontal padding:
> **22–28px**

## Mobile

Primary:
> **52–56px height**

Convite Final:
> quase full-width quando necessário.

Touch target mínimo:
> **44px**

---

# 16. Header integration

Header usa o mesmo grid global.

Desktop:
- 12-col alignment;
- mark no início do content grid;
- CTA no extremo do content grid.

Mobile:
- 20px gutter;
- 60–64px height;
- mark + menu.

Não criar um grid independente só para o Header.

---

# 17. Footer responsive

Desktop:
- preservar arquitetura horizontal definida;
- alinhar conteúdo ao mesmo max-width global.

Tablet:
- 2–3 grupos por linha;
- RIGHTWARE lockup mantém bloco próprio.

Mobile:
- EduCore primeiro;
- navegação em 2 colunas ou accordion simples;
- RIGHTWARE;
- social;
- legal stack.

O Footer não deve ser comprimido numa miniatura do desktop.

---

# 18. Mobile density

Regras globais:
- reduzir nodes em ~40–50%;
- reduzir media simultâneo;
- não mostrar mais de 2 media no viewport;
- captions fora de overlays complexos;
- CTA principal facilmente alcançável;
- headline sem orphan lines quando possível.

---

# 19. Safe area

Mobile deve respeitar:
- `env(safe-area-inset-top)`;
- `env(safe-area-inset-bottom)`;
- menu / CTA nunca colados à área de gesture.

---

# 20. Container tokens propostos

```text
--container-max: 1440px
--gutter-mobile: 20px
--gutter-mobile-wide: 24px
--gutter-tablet: 32px
--gutter-desktop-compact: 48px
--gutter-desktop: 72px
--grid-gap-mobile: 16px
--grid-gap-tablet: 24px
--grid-gap-desktop: 28px
```

São tokens de implementação, não dimensões rígidas de arte final.

---

# 21. Critério de aprovação

O sistema passa se:
- Manrope e Newsreader têm papéis distintos;
- headlines não usam todas a mesma escala;
- desktop usa 12 colunas;
- tablet usa 8;
- mobile usa 4;
- full-bleed não quebra alinhamento de copy;
- mobile não replica sticky desktop;
- media tem crop próprio por breakpoint;
- Footer responde sem perder arquitetura;
- touch targets e safe area estão cobertos.

---

# 22. Decisão V0.1

> **12 / 8 / 4-column responsive grid + Manrope estrutural + Newsreader editorial + typography fluida por clamp + mobile como composição própria.**

Próximo passo:

> **MASTER HIGH-FIDELITY CONSOLIDATION PASS**
# Master High-Fidelity Consolidation — Landing COLUS

> **Versão:** V0.1  
> **Data:** 2026-10-02  
> **Estado:** MASTER CONSOLIDADO / IMPLEMENTAÇÃO AINDA BLOQUEADA  
> **Objetivo:** transformar todas as decisões aprovadas numa única especificação canónica antes de Asset Plan, Motion Spec técnico e código.

---

## 1. Fonte de verdade

A ordem de autoridade fica:

1. `landing-colus-master.drawio` — experiência visual contínua;
2. `high-fidelity-direction-colus.md` — contrato global consolidado;
3. specs especializadas da landing;
4. `archive/` — apenas histórico.

Em caso de conflito entre um artefacto antigo e uma decisão global posterior:

> **vence a decisão global mais recente.**

---

# 2. Sequência pública canónica

```text
Intro Morph
→ Hero
→ Manifesto
→ Aprender em Movimento
→ Futuro & Tecnologia
→ Vida COLUS
→ Pertencer
→ Transformar
→ Depoimentos
→ Convite Final
→ Footer EduCore / RIGHTWARE
```

Não adicionar novas secções antes da implementação sem reabrir o gate de design.

---

# 3. Contrato visual canónico

## Marca

- Orange `#F18136` — provisório até asset/spec oficial;
- Deep Blue `#0C5898` — provisório;
- Bright Blue `#2899EF` — provisório;
- Warm Paper `#FFF8EF`;
- Warm White `#FFFCF8`;
- Deep Ink `#071A2A`.

## Tipografia

- Manrope → estrutura / interface / precisão;
- Newsreader → voz editorial seletiva.

## Grid

- desktop → 12 colunas;
- tablet → 8 colunas;
- mobile → 4 colunas;
- max-width → 1440px.

## Motion

- Signature → Intro Morph; Futuro & Tecnologia;
- Narrative → Hero/Manifesto; Aprender; Transformar;
- Subtle → Vida; Pertencer; Depoimentos; Convite;
- Static → Footer.

Primitives globais:
- Path;
- Node;
- Mask;
- Light/Halo;
- Media Window.

---

# 4. Navegação canónica

```text
O Colégio    → #o-colegio    → Manifesto
Experiência  → #experiencia  → Aprender em Movimento
Futuro       → #futuro       → Futuro & Tecnologia
Comunidade   → #comunidade   → Pertencer
Contactos    → #contactos    → Convite Final
```

CTA Header:
> **Marcar uma visita → #contactos**

Sem Portal/Login na landing pública.

---

# 5. Scroll contract

Desktop preferido:
> **~1430–1490vh + Footer natural**

Mobile:
> **~1150–1350svh + Footer natural**

Sticky forte:
- Intro Morph;
- Futuro & Tecnologia.

Sticky moderado:
- Aprender;
- Transformar.

Sem scroll-jacking ou snap obrigatório.

---

# 6. Copy contract

## LOCKED

- COLÉGIO UNIVERSO DOS SONHOS;
- Juntos Tornamos Sonhos Em Realidade;
- navegação principal;
- labels estruturais aprovados;
- copyright COLUS;
- `Powered by EduCore · A RIGHTWARE Product`;
- branding obrigatório EduCore/RIGHTWARE no Footer.

## WORKING

- supporting Hero;
- Manifesto;
- copy editorial das secções;
- headline Transformar;
- supporting Convite;
- idioma do Footer.

## PLACEHOLDER

- testemunhos reais;
- nomes/relação dos testemunhos;
- media contextual não validado;
- claims/métricas/processos não confirmados.

---

# 7. Contactos / CTA

Demonstrador:

- telefone → `+258 84 700 0242`;
- localização curta → `Matola-Rio · KM 16`;
- email → `info@colus.ac.mz` — revalidar antes de produção;
- Instagram → `@colus_mz` — revalidar antes de produção.

Routing:

- Hero/Header visita → `#contactos`;
- Descobrir o COLUS → `#o-colegio`;
- Convite / Marcar uma visita → mailto do email observado;
- Convite / Falar connosco → telefone.

Não implementar WhatsApp, booking, formulário, mapa, chat ou SLA nesta fase.

---

# 8. Footer canónico

Footer global do produto:

- logo EduCore obrigatório;
- logo RIGHTWARE obrigatório;
- `A RIGHTWARE Product` obrigatório;
- copyright principal da instituição;
- variante Dark na landing COLUS.

Linha aprovada:

> **© 2026 Colégio Universo dos Sonhos. Todos os direitos reservados.**

> **Powered by EduCore · A RIGHTWARE Product**

Desktop e mobile preservam a mesma arquitetura, com reflow responsivo.

---

# 9. Mobile contract

Mobile é composição própria.

Regras:
- 4 colunas;
- gutter 20–24px;
- sem long pinning;
- motion ~50–60% do desktop;
- nodes -40–50%;
- máximo dois media simultâneos;
- crops próprios;
- Header mark + menu;
- Footer em stack responsivo.

---

# 10. Reduced Motion

`prefers-reduced-motion: reduce`:

- Hero final direto;
- paths em estado final;
- sem morph longo;
- sem parallax;
- scroll budget encurtado;
- nenhuma informação perdida.

---

# 11. Limpeza de decisões antigas

Durante esta consolidação:

- `mask/portal` no Intro passa a **mask/aperture** para não confundir com portal interno;
- gates antigos deixam de indicar “próxima secção” já concluída;
- a fonte de verdade do Intro passa a ser o próprio master;
- o antigo board de tokens fica apenas como apêndice;
- Footer recebe representação mobile explícita;
- nomes conceptuais continuam INTERNAL ONLY.

---

# 12. O que continua aberto

## OPEN-01 — idioma do Footer

O design de referência usa inglês.

Decisão ainda aberta:
- manter inglês como assinatura global EduCore;
- ou localizar labels mantendo exatamente a mesma arquitetura.

Não resolver automaticamente.

## OPEN-02 — assets finais

Precisamos fechar:
- logo/mark vetorial;
- media por secção;
- Hero video/photo;
- posters;
- autorizações;
- testemunhos.

## OPEN-03 — Motion Spec técnico

A hierarquia está fechada, mas falta converter os momentos principais em:
- scroll progress;
- transforms;
- masks;
- ranges;
- fallbacks;
- reduced-motion states.

---

# 13. Gate de implementação

A landing está:

> **DESENHADA + CONSOLIDADA**

Mas o código ainda não deve começar.

Faltam os dois gates técnicos finais:

1. **Asset Plan**;
2. **Motion Spec técnico**.

Depois destes dois:

> **LANDING IMPLEMENTATION READY**

---

# 14. Próximo passo

> **ASSET PLAN — inventário exato de logo, foto, vídeo, posters e media por secção.**
# Asset Audit — Landing COLUS

> **Versão:** V0.1  
> **Data:** 2026-10-02  
> **Input:** `colus-landing-assets.zip` recebido após primeira recolha externa.  
> **Estado:** ROUND 1 INCOMPLETO — NÃO IMPLEMENTAR AINDA.

---

## 1. Resultado executivo

O ZIP é útil como **reference pack**, mas ainda não é um **implementation pack**.

Motivos principais:

- Instagram não foi acedido com sessão autenticada;
- não existem vídeos/Reels para Hero;
- a maioria das fotografias utilizáveis está limitada a **206×206 px**;
- faltam vários temas P0 da landing;
- o logo disponível é raster e não contém mark isolado/vetorial;
- fotografias com pessoas continuam `NEEDS_AUTHORIZATION`;
- existem assets duplicados entre secções.

Conclusão:

> **não colocar estes ficheiros diretamente no frontend como assets finais.**

Eles servem para:
- confirmar direção visual;
- identificar posts/momentos certos;
- orientar uma segunda recolha autenticada;
- escolher quais originais em alta resolução devem ser obtidos.

---

# 2. Cobertura recebida

Recebido:
- 1 logo principal raster 719×682;
- 1 referência de logo 200×200;
- 19 source originals/reference downloads;
- ciência / feira de ciências;
- atividades hands-on;
- arte;
- desporto;
- uma fotografia comunitária 960×720;
- `assets.csv` e README com proveniência.

Não recebido:
- Hero video;
- Hero alternatives;
- Hero posters;
- mark/símbolo isolado;
- SVG/PDF/PNG transparente do logo;
- Manifesto dedicado;
- TIC / Segurança Digital;
- Engenharia;
- Meninas nas TIC;
- Museu de História Natural;
- Umbelúzi verificável;
- Dia da Família / pais em interação;
- Transformar / Avançar;
- dança / Spelling Bee em qualidade adequada.

---

# 3. Qualidade técnica

## 206×206 px

A maioria dos media selecionados veio como thumbnail público de 206×206.

Estado:
> **REFERENCE ONLY / NEEDS HIGH-RES REPLACEMENT**

Não são adequados para:
- Hero;
- Scene Window grande;
- media full-bleed;
- desktop high-DPI;
- crops mobile separados.

## 960×720

`COLUS-PERTENCER-COMUNIDADE-001.jpg` é o melhor ficheiro fotográfico em resolução do pacote.

Pode servir como:
- referência;
- fallback secundário num demonstrador privado;
- prova de comunidade/vida escolar.

Não é ideal como media principal de Pertencer porque é uma fotografia de grupo posada, não uma relação humana em ação.

## Logo 719×682

`COLUS-BRAND-LOGO-001.jpg` é útil como referência oficial raster.

Mas o Intro Morph precisa de:
- mark separado;
- livro separado;
- figuras/community ring separáveis;
- preferência por SVG/PDF/PNG transparente de alta resolução.

Estado:
> **NEEDS BRAND ASSET UPGRADE**

---

# 4. Seleção visual — re-download prioritário

Os seguintes ficheiros têm conteúdo visual suficientemente promissor para procurar o **mesmo momento/post em alta resolução**:

## Aprender / Descobrir

### `COLUS-APRENDER-DESCOBRIR-002.webp`
Classificação:
> **RE-DOWNLOAD / HIGH PRIORITY**

Razão:
- interação real;
- pessoas em ação;
- bom contexto de descoberta;
- funciona melhor que fotografia puramente posada.

### `COLUS-APRENDER-DESCOBRIR-001.webp`
Classificação:
> **ALT / RE-DOWNLOAD**

Razão:
- bom establishing frame de feira de ciências;
- útil para contexto;
- menos humano/intimista que o anterior.

---

## Aprender / Criar

### `COLUS-APRENDER-CRIAR-001.webp`
Classificação:
> **RE-DOWNLOAD / HIGH PRIORITY**

Razão:
- experiência prática evidente;
- alunos em interação;
- energia de criação/construção.

### `COLUS-APRENDER-CRIAR-003.webp`
Classificação:
> **RE-DOWNLOAD / HIGH PRIORITY**

Razão:
- aluno claramente envolvido na atividade;
- composição mais legível para narrativa individual.

### `COLUS-APRENDER-CRIAR-002.webp`
Classificação:
> **ALT / RE-DOWNLOAD**

Razão:
- boa interação de grupo;
- visual semelhante a outros frames científicos.

---

## Futuro / Ciência

### `COLUS-FUTURO-CIENCIA-002.webp`
Classificação:
> **RE-DOWNLOAD / HIGH PRIORITY**

Razão:
- experiência científica clara;
- boa combinação de alunos + atividade.

### `COLUS-FUTURO-CIENCIA-001.webp`
Classificação:
> **ALT / RE-DOWNLOAD**

Razão:
- útil como segundo frame;
- visualmente próximo de outras imagens da mesma atividade.

---

## Vida COLUS

### `COLUS-VIDA-ESCOLA-001.webp`
Classificação:
> **RE-DOWNLOAD / HIGH PRIORITY**

Razão:
- ação real;
- movimento;
- menos posado;
- potencial bom para Living Reel.

### `COLUS-VIDA-DESPORTO-003.webp`
Classificação:
> **RE-DOWNLOAD / HIGH PRIORITY**

Razão:
- atividade em curso;
- mais vivo que os retratos de equipa.

### `COLUS-VIDA-DESPORTO-001.webp`
Classificação:
> **ALT / LOW PRIORITY**

Razão:
- fotografia de equipa posada;
- não usar como protagonista.

### `COLUS-VIDA-DESPORTO-002.webp`
Classificação:
> **ALT / LOW PRIORITY**

Razão:
- retrato de equipa;
- pouco movimento.

---

## Pertencer

### `COLUS-PERTENCER-COMUNIDADE-001.jpg`
Classificação:
> **ALT / COMMUNITY ESTABLISHING SHOT**

Razão:
- diversidade e comunidade visíveis;
- Dia de África/contexto escolar;
- melhor resolução do pacote.

Limitação:
- grupo posado;
- não substitui o asset P0 de família/pais/encarregados em interação.

---

# 5. Assets a não promover para uso principal

## `COLUS-APRENDER-EXPRESSAR-001.webp`

> **REJECT AS MAIN MEDIA / ALT DETAIL ONLY**

Tem texto/poster incorporado e funciona melhor como detalhe editorial do que como media principal.

## `COLUS-APRENDER-EXPRESSAR-002.webp`

> **ALT DETAIL / NEEDS HIGH-RES**

Bom trabalho artístico, mas sem presença humana. Pode funcionar como close-up secundário.

## `COLUS-TRANSFORMAR-EXPRESSAR-001.webp`

> **REJECT FOR TRANSFORMAR**

É exatamente o mesmo ficheiro de `COLUS-VIDA-DESPORTO-001.webp`.

Além da duplicação, um retrato desportivo de equipa não corresponde ao objetivo `Expressar` definido para Transformar.

## `COLUS-TRANSFORMAR-CONSTRUIR-001.webp`

> **REJECT AS DUPLICATE IN FINAL SELECTION**

É exatamente o mesmo ficheiro de `COLUS-APRENDER-CRIAR-002.webp`.

O momento pode continuar a ser procurado em alta resolução, mas não deve aparecer duas vezes na landing.

## `COLUS-BRAND-LOGO-REFERENCE-002.jpg`

> **REJECT AS IMPLEMENTATION ASSET**

É apenas referência 200×200 do mesmo logo.

---

# 6. Duplicados exatos encontrados

## Duplicado 1

`COLUS-TRANSFORMAR-EXPRESSAR-001.webp`

=

`COLUS-VIDA-DESPORTO-001.webp`

## Duplicado 2

`COLUS-TRANSFORMAR-CONSTRUIR-001.webp`

=

`COLUS-APRENDER-CRIAR-002.webp`

Regra:
> **um mesmo ficheiro não deve ser reutilizado em duas secções narrativas diferentes na versão final.**

---

# 7. Gaps P0 — segunda recolha obrigatória

## GAP-01 — Hero

Necessário:
- 3 Reels/vídeos candidatos;
- original/highest quality;
- 3 posters fortes;
- planos com movimento e espaço para headline.

Estado:
> **CRITICAL BLOCKER**

## GAP-02 — Brand / mark

Necessário:
- logo transparente;
- mark isolado;
- ideal SVG/PDF;
- ou raster original significativamente maior.

Estado:
> **CRITICAL FOR INTRO MORPH**

## GAP-03 — Futuro / TIC

Necessário:
- Segurança nas TIC / INTIC;
- alunos em contexto tecnológico.

Estado:
> **P0 MISSING**

## GAP-04 — Futuro / Engenharia

Necessário:
- sessão de engenharia;
- alunos + profissionais;
- interação.

Estado:
> **P0 MISSING**

## GAP-05 — Meninas nas TIC

Necessário:
- 1–2 originais fortes.

Estado:
> **P0 MISSING**

## GAP-06 — Pertencer / Família

Necessário:
- Dia Internacional da Família;
- pais/encarregados em interação;
- aluno + adulto;
- momentos relacionais, não apenas fotografia de grupo.

Estado:
> **P0 MISSING**

## GAP-07 — Aprender / Descoberta externa

Necessário procurar especificamente:
- Museu de História Natural;
- Umbelúzi;
- outras visitas de estudo.

Estado:
> **P0 MISSING / VERIFY**

## GAP-08 — Vida / expressão e cultura

Necessário:
- dança;
- Spelling Bee;
- Dia de África em ação;
- arte/performance em melhor qualidade.

Estado:
> **P0/P1 INCOMPLETE**

## GAP-09 — Transformar / Avançar

Necessário:
- uma imagem humana forte;
- confiança/protagonismo;
- idealmente tecnologia/engenharia/Spelling Bee.

Estado:
> **P0 MISSING**

---

# 8. Direitos

Fotografias com pessoas:
> **NEEDS_AUTHORIZATION**

Uso recomendado agora:
- análise;
- composição;
- demonstrador privado/provisório, com cautela.

Antes de produção pública:
- obter autorização/ficheiros aprovados do COLUS;
- substituir thumbnails;
- confirmar direitos de imagem quando aplicável.

---

# 9. Decisão Round 1

```text
IMPLEMENTATION READY      → 0 media narrativos
REFERENCE / RE-DOWNLOAD   → ciência, prática, vida escolar, comunidade
REJECT / DUPLICATE        → posters/text-heavy + duplicados
CRITICAL MISSING          → Hero + TIC + Engenharia + Meninas TIC + Família + mark
```

Logo raster:
> **reference usable, implementation upgrade required**

---

# 10. Próxima ação

> **RECOLHA ROUND 2 — INSTAGRAM AUTENTICADO**

Não repetir download massivo.

A segunda recolha deve procurar apenas:
1. Hero/Reels;
2. mark/logo original;
3. TIC;
4. Engenharia;
5. Meninas nas TIC;
6. Família/comunidade relacional;
7. Museu/Umbelúzi;
8. dança/Spelling Bee/cultura;
9. originais high-res dos melhores frames científicos já identificados.

Depois da Round 2:

> **FINAL ASSET SELECTION → USE / ALT / REJECT / NEEDS_AUTHORIZATION**
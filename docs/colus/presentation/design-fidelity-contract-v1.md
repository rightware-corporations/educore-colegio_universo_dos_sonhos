# COLUS — Design Fidelity + Motion QA (Master V0.18)

> **Versão:** primeiro catálogo V1 · 2026-10-14  
> **Estado:** implementação em `main`, testes no Windows/Edge ainda pendentes.  
> **Fonte única da direção:** `docs/colus/design/landing/landing-colus-master.drawio`, acompanhado de High-Fidelity, Motion Spec, Scroll Budget e Asset Gate.  
> **Proteção P0:** Hero COLUS e o seu vídeo/editorial aprovado. Auditoria é de leitura, nunca executa alterações.

## 1. Qual era a lacuna?

O Motion QA anterior verificava progressão do scroll, media e etapas, mas não dizia se o produto estava a implementar **o conteúdo completo do desenho aprovado**. Este contrato acrescenta esse eixo:

- requisitos presentes vs. ausentes;
- requisitos parcialmente implementados;
- conteúdo ou ordem divergentes;
- componentes e assets a investigar;
- itens que só a comparação visual humana pode validar.

A presença de um elemento no DOM não demonstra que está bem enquadrado, sem sobreposições, ou com motion correto. `MATCH` é apenas resultado da regra específica, não aprovação estética.

## 2. Fontes de verdade

1. `landing-colus-master.drawio`, Master V0.18, blob `73bb21915fd8537f461573fdecba7397162ae6fd`;
2. `master-high-fidelity-consolidation-colus.md`;
3. `high-fidelity-direction-colus.md`;
4. `motion-spec-tecnico-colus.md`;
5. `scroll-budget-colus.md` e `motion-hierarchy-colus.md`;
6. `asset-final-selection-colus-v03.md`.

Os requisitos de catálogo incluem IDs exatos de células (ex.: `future_21`, `belong_9165`, `footer_9933`). O código **não é fonte do esperado**.

## 3. Catálogo inicial ligado ao código

| Secção | Referências master | Critérios já catalogados | Componente |
|---|---|---|---|
| Global | `master_9005` | ordem narrativa, anchors | `LandingFoundationPage.tsx` |
| Hero protegido | `intro_90`, `hero_98` | raster oficial, headline, CTAs, vídeo editado, morph sob revisão humana | `IntroHeroSection.tsx` |
| Manifesto | `hero_123`, `hero_131` | headline, handoff | `ManifestoSection.tsx` |
| Aprender | `learn_141–170` | Descobrir, Criar, legenda, media, Learning Trail | `AprenderSection.tsx` |
| Futuro | `future_21–59` | 4 cenas, janela única, Signal Field, media e legendas | `FuturoSection.tsx` |
| Vida | `life_18–52` | fotoensaio, headline, story markers | `VidaSection.tsx` |
| Pertencer | `belong_9113–9165` | Community Ring, progressão Acompanhar/Participar/Crescer | `PertencerSection.tsx` |
| Transformar | `transform_9320–9335` | headline e 3 atos | `TransformarSection.tsx` |
| Vozes | `voices_9509–9555` | foco humano, placeholder seguro | `TestimonialsSection.tsx` |
| Convite | `invite_9724–9764` | CTAs, copy e separação do Footer | `ContactFooter.tsx` |
| Footer | `footer_9904–9933` | lockups, quatro grupos, copyright e reflow | `ContactFooter.tsx` |

O catálogo V1 contém regras selecionadas dos principais gates, **não todas as 684 células gráficas do master**. A transcrição de estados, detalhes mobile e geometrias continua em fase de expansão.

## 4. Divergências que o sistema deve expor

- O master exige Footer com logo EduCore e RIGHTWARE, quatro grupos de navegação e legal/social. A implementação atual contém apresentação textual de marca e grupos diferentes: o catálogo sinaliza ausências/desvios sem alterar o Footer.
- A cena Ciência no Motion Spec prevê vídeo quando ativa, com poster fallback. O poster estático atual é provisório: Motion QA deve continuar a sinalizar a divergência.
- A fotografia da cena Engenharia substituiu um device-led previsto na Motion Spec. Permanece classificada para revisão de design, não como alteração automaticamente legitimada.
- Headline e media podem existir no DOM e, ainda assim, um crop, ring ou máscara não corresponder ao master: estes são requisitos **REVIEW** até termos checkpoints visuais aprovados.

## 5. Hero bloqueado e baseline editorial

O Hero aprovado é a composição Intro Morph → headline à esquerda → vídeo de alunos em janela orgânica, com marca oficial no Header. Foi recuperado depois de regressão anterior que fez o vídeo deixar de aparecer.

**É expressamente proibido na evolução de QA:**
- apagar/substituir `COLUS-HERO-VID-001-SPORT-DAY.mp4`;
- alterar a edição, cortes ou o comportamento cinematográfico recuperado;
- redesenhar marca/logo ou a máscara por iniciativa do auditor;
- aceitar um fallback ou asset diferente como novo standard sem aprovação.

O QA apenas observa e produz recomendações. Uma eventual correção no Hero exige decisão humana explícita, revisão do contrato e branch de segurança.

## 6. Modo de uso no Edge

Na pasta `frontend`:

```powershell
npm run typecheck
npm run build
npm run test:qa
npm run dev
```

Abrir `http://localhost:8080/?motionQA=1#top`.

- **Comparar com wireframe:** inspeciona a estrutura e conteúdo de todas as secções imediatamente; não move o scroll.
- **Design + Motion (scroll):** percurso automatizado seguido de comparação estrutural e temporal.
- Exportações: texto completo e JSON versionado com contrato e resultados.

Os resultados devem mostrar `MATCH`, `MISSING`, `PARTIAL`, `DIVERGENT`, `REVIEW` e `NOT_OBSERVED`, cada um com expectativa, observado, documento/célula, componente e ação.

## 7. Integridade de assets protegidos

O manifest `docs/colus/presentation/hero-protected-asset-lock.json` fixa os hashes Git blob aprovados de:

- `COLUS-HERO-VID-001-SPORT-DAY.mp4` — vídeo e edição do Hero recuperados;
- `COLUS-HERO-POSTER-001.jpg` — poster original;
- `COLUS-BRAND-LOGO-RASTER-001.jpg` — raster oficial COLUS.

`npm run test:qa` executa `qa-contract-tests.mjs` e `qa-protected-assets.mjs`. Este segundo teste bloqueia substituição silenciosa dos ficheiros locais protegidos e não altera nenhum asset. Não valida a qualidade cinematográfica; isso continua sujeito à referência visual aprovada.

## 8. Próximo gate

1. Executar `npm run test:qa`, `typecheck` e `build` sem erros.
2. Confirmar resultados de Design QA num browser real com largura desktop e mobile.
3. Melhorar selectors e regras que gerem falsos positivos/negativos.
4. Extrair frames de referência do Draw.io por estado e viewport, com revisão da direção aprovada.
5. Construir comparação visual de checkpoints e automação Playwright.
6. Só após isso utilizar o relatório para priorizar alterações visuais. **Nenhuma correção é executada automaticamente.**

Método genérico: `docs/rightware/frameworks/design-fidelity-contract-driven.md`.

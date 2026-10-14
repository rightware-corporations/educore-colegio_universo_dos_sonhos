# RIGHTWARE — Contract-Driven Design Fidelity QA

> **Versão:** V1 piloto · 2026-10-14  
> **Objetivo:** verificar se um produto **segue o desenho que foi aprovado**, incluindo elementos ausentes e implementações parciais.
> **Âmbito:** reutilizável, independente de COLUS, React ou Framer Motion.
> **Relação:** complementa `motion-qa-contract-driven.md`; não substitui Motion QA.

## Problema observado

Um wireframe completo perde valor se, durante a implementação, cada decisão visual for traduzida de forma diferente e o utilizador tiver de abrir manualmente Draw.io para descobrir o que falta. Validar apenas a ausência de erros runtime também não demonstra fidelidade.

A referência deve ser anterior e independente da implementação:

`MASTER APROVADO → INVENTÁRIO VERIFICÁVEL → EVIDÊNCIAS DE DOM/MEDIA/SCROLL → COMPARAÇÃO → GAPS PRIORITIZADOS → CORREÇÃO CONTROLADA → REVISÃO HUMANA`.

## Separação de responsabilidades

| Camada | Responsabilidade | Portabilidade |
|---|---|---|
| Master/wireframe | Verdade de design, incluindo células e estados | Específica de cada projeto |
| Contrato de design | Requisitos executáveis e critérios editoriais ancorados no master | Schema genérico, dados específicos |
| Observador | Lê DOM, texto, media e sequência sem alterar a UI | Adaptável a Playwright/outros |
| Evaluator | Classifica esperado/observado | Genérico RIGHTWARE |
| Motion QA | Scroll, janelas de progresso, sticky, playback, estados | Mesmo padrão, outro eixo |
| QA visual | Crop, proporção, máscaras, ritmo, distância e identidade | Exige referência visual aprovada |

## Modelo de regra

Cada requisito contém:

- `id` único e estável;
- `stage` / secção;
- `title` e `expected`: expectativa aprovada;
- `source`: caminho do master, célula, documento especializado;
- `component`: componente provável para investigar;
- `type`: presença, quantidade, texto, asset, sequência ou revisão editorial;
- `selector`, `minimum`, `expectedText`, `expectedAsset`, `ids` se aplicáveis;
- `viewport`: all/desktop/mobile;
- `priority`: P0/P1/P2.

**Nunca autogerar o esperado a partir do DOM atual.** Quando a implementação contradiz o master, o resultado é um gap até existir decisão de design aprovada; não se reescreve o contrato só para passar.

## Estados e interpretação

| Estado | Significado |
|---|---|
| **MATCH** | A regra instrumental especificada encontrou correspondência |
| **MISSING** | O elemento esperado não foi encontrado |
| **PARTIAL** | Foi encontrado um subconjunto ou estrutura incompleta |
| **DIVERGENT** | Existe implementação, mas não corresponde ao texto/asset/ordem contratada |
| **REVIEW** | Requer avaliação editorial/visual humana |
| **NOT_OBSERVED** | Evidências ausentes ou viewport não coberto |

**MATCH não significa aprovação visual.** Um asset pode estar no DOM mas aparecer cortado, ilegível ou sobreposto por SVG. Checks de Motion e checkpoints visuais são complementares.

## Proteção de composições aprovadas

Definir `P0` para elementos cuja alteração requer aprovação explícita (marca, logo, vídeo/edit, hero cinematográfico, conteúdo bloqueado). A auditoria pode ler esses componentes mas não pode alterar, trocar por um fallback diferente ou reescrever media para resolver uma divergência. A execução de correções é separada da observação.

## Piloto COLUS

- `frontend/src/shared/design-qa/designFidelity.ts` — evaluator puro;
- `frontend/src/shared/design-qa/domDesignAdapter.ts` — leitura do DOM, sem mutações;
- `frontend/src/config/colusDesignQaContract.ts` — primeira seleção priorizada de requisitos e células;
- `frontend/src/components/landing/LandingMotionQA.tsx` — painel integrado Design + Motion, apenas DEV;
- `frontend/scripts/qa-contract-tests.mjs` — regressão dos comparadores;
- `docs/colus/presentation/design-fidelity-contract-v1.md` — matriz e gaps COLUS.

O inventário V1 **não transcreve todas as 684 células** do ficheiro mestre. Reúne um primeiro conjunto de requisitos verificáveis e de revisão humana, incluindo preservação do Hero. Outros estados, versões mobile, medidas e checklists por bloco continuam a exigir expansão.

## Roadmap para um sistema RIGHTWARE completo

1. Extrair o Draw.io para representação semântica com IDs e historial de decisões aprovadas.
2. Cobrir todos os requisitos relevantes, incluindo conteúdo, elementos de desenho e estados por breakpoint, com rastreabilidade por célula.
3. Capturar checkpoints fixos de cada secção (entrada, 25%, 50%, 75%, saída), com viewport, zoom e escala de fonte constantes.
4. Guardar referências visuais de design aprovadas e comparar capturas de browser; marcar diffs como candidatos a revisão humana, não como falhas sem contexto.
5. Integrar scroll automático inverso/rápido, saltos por âncoras, tablet/mobile, reduced-motion e simulação de media indisponível.
6. CI: testes unitários, runner de browser e relatório versionado da revisão.
7. Promover a biblioteca RIGHTWARE quando possuir fixtures, projetos de exemplo sem referências a COLUS e prova de integração.

**Gate V1:** esquema/contrato, DOM adapter e relatório no browser foram codificados; compilação e validação no Edge ainda pendentes. Sem esses resultados, o piloto não é considerado concluído.

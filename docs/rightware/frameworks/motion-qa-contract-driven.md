# RIGHTWARE — Contract-Driven Motion QA

> **Estado:** Framework reutilizável V1 / demonstração piloto COLUS.  
> **Data:** 2026-10-13  
> **Âmbito:** landing pages, interfaces com scroll narrativo, animações Framer Motion, GSAP, CSS/SVG e futuras aplicações RIGHTWARE.
> **Separação:** o framework é transversal; as regras COLUS são específicas do projeto.

**Extensão aprovada:** para auditar não apenas o movimento mas também a fidelidade à composição e conteúdo do wireframe, usar o [Contract-Driven Design Fidelity QA](design-fidelity-contract-driven.md). Os dois eixos partilham o princípio de comparação, mas mantêm contratos e critérios distintos.

## 1. Problema que resolve

Um ficheiro de telemetria sem uma base de comparação não demonstra fidelidade ao desenho. A ausência de erro JavaScript, vídeo ou imagem não significa que a animação corresponda ao wireframe aprovado. O teste necessita de **oráculo** (contrato verificável).

**Princípio:** `CONTRATO APROVADO → OBSERVAÇÃO REPRODUZÍVEL → COMPARAÇÃO → ESTADO → EVIDÊNCIA → AÇÃO`.

O contrato **não é gerado automaticamente a partir do código a testar**. Deve ser derivado dos documentos de design/motion aprovados, incluindo versões e referências exatas. Caso contrário, o teste pode aprovar um erro por repetir a configuração defeituosa.

## 2. Fontes de verdade

Estabelecer, por projeto, ordem de autoridade e controlo de versões:

1. Wireframe/master canónico e identificadores de células/estados.
2. Motion spec: progressos, media por cena, handoffs, fallback, reduced motion.
3. Scroll budget: altura por stage, sticky/pinning, mobile/tablet.
4. Motion hierarchy: simultaneidade, níveis, easing e performance.
5. Asset gate e plano de implementação.
6. DOM e implementação real — apenas **fonte do observado**, nunca árbitro do esperado.

Resoluções ou tolerâncias novas exigem decisão documentada. Não ajustar limites só para fazer o teste passar.

## 3. Estrutura do teste

### A. Contrato declarativo

Contrato versionado com: identificador, versão, fontes, seletores/anchors, ranges numéricos, etapas/cenas, requisitos semânticos, revisão humana e critérios por viewport e reduced motion.

### B. Adaptador de observação

Pode usar navegador real, Playwright, Chrome DevTools, Framer Motion debug, GSAP inspector ou outro. Recolher: progresso real da secção, altura, estado sticky, posição/visibilidade dos elementos, media/erros, cena ativa e timestamps. Registar viewport, zoom/escala quando disponível, política de reduced motion e direção de scroll.

### C. Comparador

Motor puro, independente do framework de UI. Para cada regra:

- **PASS:** requisito objetivo observado na tolerância aprovada;
- **FAIL:** desvio objetivo com amostras suficientes;
- **REVIEW:** regra editorial/visual exige pessoa ou teste adicional;
- **NOT_OBSERVED:** etapa sem dados ou cobertura insuficiente; não equivale a PASS.

Exibir **Esperado / Observado / Fonte / Ação** por secção. Mostrar resumo e evidência temporal. Se a cobertura falhar, o relatório é **incompleto** mesmo com zero erros técnicos.

### D. Matriz de modalidades

| Modalidade | Verificações |
|---|---|
| Desktop scrub controlado | Sequência e progressos, altura, sticky, cenas/media |
| Scroll rápido / scroll inverso | Determinismo, transições reversíveis, nenhum frame obrigatório |
| Saltos por âncoras | Estado de aterragem e conteúdo legível |
| Resize tablet/mobile | Reflow, diferenças de scroll budget, sem pinning longo |
| Reduced motion | Mesma informação, sem morph longo, media com poster |
| Media indisponível | Fallback, sem região vazia ou layout quebrado |
| Qualidade editorial humana | Crop/rostos, ritmo, continuidade, hierarquia, identidade da marca |

**O V1 do piloto implementa** contrato + recolha desktop + comparação básica + exportações. As modalidades fast/reverse, screenshot diffs com checkpoints fixos e checks de visibilidade de faces **ainda são roadmap**, não funções concluídas.

## Revisão V1.1 — Budget editorial e checkpoints (2026-10-14)

O Scroll Budget COLUS define explicitamente valores de **ritmo editorial**, não alturas CSS mandatórias. No motor genérico, comparações de budget fora da faixa passam a `REVIEW` com valores esperado/observado e documento, **não** a `FAIL`. A falha funcional (asset errado, sticky requerido ausente, cena errada) continua `FAIL`.

O evaluator suporta um budget narrativo global, medido pelo adaptador sem o Footer natural, e budgets combinados para blocos agrupados pela direção do design (ex.: `Hero + Manifesto`). Nunca duplicar o orçamento de um bloco para cada subestado.

A primeira preparação de checkpoints visuais usa `frontend/src/shared/design-qa/visualCheckpoints.ts` e contratos por projeto. O browser permite navegar para estados de inspeção; **sem baseline visual aprovado e screenshot pareado, não declara aprovação estética**. Referência COLUS: `docs/colus/presentation/visual-checkpoints-v1.md`.

## 4. Métricas e limitações

O teste pode medir presença de media, ordem das cenas, progressos, duração de stage, CSS sticky e erros técnicos. Não pode concluir automaticamente se uma cena é bonita, natural ou fiel ao ritmo aprovado. O evaluator não conhece o conteúdo semântico de uma imagem pelo seu DOM. Falhas de vídeo e de fonte podem exigir inspeção do codec e do asset real.

Recomenda-se guardar checks por breakpoint, com tolerâncias e referência de aprovação. Performance e fluidez devem usar medição frame-by-frame confiável, em vez de interpretar um intervalo de amostragem de 70ms como FPS real.

## 5. Implementação piloto COLUS

- Engine puro: `frontend/src/shared/motion-qa/contractEvaluator.ts`.
- Contrato separado: `frontend/src/config/colusMotionQaContract.ts`.
- Adaptador/painel: `frontend/src/components/landing/LandingMotionQA.tsx`, apenas `DEV` + `?motionQA=1`.
- Referência e divergências: `docs/colus/presentation/motion-qa-contract-v1.md`.

O projeto cliente não incorpora as expectativas COLUS no motor genérico. Para outro produto, criar um novo contrato e um adaptador de observação. O código do painel é protótipo COLUS, não biblioteca publicada.

## 6. Outputs obrigatórios

- Comparação por regra no browser: esperado, observado, fonte, ação.
- Resumo PASS/FAIL/REVIEW/NOT_OBSERVED.
- Exportação de texto legível + JSON de contrato e resultados.
- Lista de critérios manuais pendentes.
- Histórico de exceções/decisões, sem apagar divergências antigas.

**Um status geral de aprovado só pode ser dado quando os FAIL foram tratados, as regras NOT_OBSERVED foram efetivamente testadas e as avaliações REVIEW foram assinadas por revisão visual adequada.**

## 7. Portabilidade e evolução

Próxima fase, por prioridade:
1. separar recolha e avaliação com fixture JSON gravado (executável em CI);
2. criar Playwright harness em viewport fixo, com ida/volta, fast wheel e anchor jumps;
3. checkpoint visual versionado para 0/25/50/75/100% por stage, mais diffs assistidos e revisão humana;
4. validar video play/pause em toda a página, orientação/codec, estado poster/fallback;
5. implementar perf mobile, reduced-motion, resize e simulação de media falhada;
6. só então extrair pacote RIGHTWARE versionado para outros repositórios.

**Não automatizar aprovações estéticas sem referência visual humana e confirmação de direitos de uso dos assets.**

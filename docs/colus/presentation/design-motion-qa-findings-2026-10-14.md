# COLUS — Backlog fundamentado no Design & Motion QA (2026-10-14)

> **Origem:** relatório fornecido pelo utilizador no chat em 2026-10-14, `COLUS-motion-qa-contrato.json` exportado e resumo filtrado colado na conversa.  
> **Estado:** diagnóstico + backlog, não execução de alterações visuais.  
> **Prioridade transversal:** preservar a edição, vídeo, máscara, headline e marca oficiais do Hero aprovados. Contrato e hash lock em `hero-protected-asset-lock.json`.  
> **Atenção:** saída do PowerShell apresenta mojibake (`nÃ£o`, `Â§`) na representação de algumas strings; IDs, estados e valores numéricos permanecem legíveis.

## 1. Resultados observados

Design (38 critérios): **MATCH 25 / MISSING 2 / PARTIAL 1 / DIVERGENT 0 / REVIEW 10 / NOT_OBSERVED 0**.

Motion (58 critérios): **PASS 27 / FAIL 7 / REVIEW 24 / NOT_OBSERVED 0**.

Estes indicadores não significam aprovação visual da landing. `REVIEW` permanece pendente e o contrato cobre apenas uma seleção do master.

## 2. Divergências de Design — comprovadas

| ID | Estado | Esperado | Observado | Próxima ação |
|---|---|---|---|---|
| FOOTER-EDUCORE-LOGO | MISSING | Logo oficial EduCore | Apenas texto, sem `img`/SVG acessível | Localizar/validar asset institucional oficial, sem criar logo novo; implementar lockup |
| FOOTER-NAV-ARCHITECTURE | PARTIAL | 4 grupos de navegação da arquitetura EduCore | Apenas 2 elementos de navegação no `ContactFooter.tsx` | Reconstituir quatro grupos aprovados do master, preservar links COLUS e responsive |
| FOOTER-RIGHTWARE-LOGO | MISSING | Logo RIGHTWARE + A RIGHTWARE Product | Texto RIGHTWARE sem lockup gráfico | Localizar/validar asset institucional oficial e compor footer conforme master |

**Fonte:** `landing-colus-master.drawio` células `footer_9904`, `footer_9907–9914`, `footer_9916–9918`, `footer_9933`; `master-high-fidelity-consolidation-colus.md` §8. `A RIGHTWARE Product` existe como texto; a falha instrumental é relativa à marca gráfica.

**Dependência:** o `frontend/public` atualmente contém apenas `media/colus`. Antes de importar logos EduCore/RIGHTWARE, recuperar ficheiros oficiais e validar direitos; não inventar símbolos nem substituir texto por logo improvisado.

## 3. Desvios Motion — observados, ainda não validados como defeitos visuais

| Secção | Esperado (budget desktop) | Observado | Tipo |
|---|---:|---:|---|
| Aprender | 170–195vh (ideal 185) | 225vh | Desvio de ritmo |
| Futuro | 210–240vh (ideal 230) | 280vh | Desvio de ritmo |
| Vida COLUS | 140–165vh (ideal 155) | 286vh | Desvio acentuado; conferir elemento medido |
| Pertencer | 115–140vh (ideal 130) | 155vh | Desvio de ritmo |
| Transformar | 150–175vh (ideal 165) | 220vh | Desvio de ritmo |
| Convite | 90–100vh (ideal 95) | 105vh | Desvio menor |

O documento `scroll-budget-colus.md` §1 estabelece: **«Scroll budget é um limite de ritmo, não uma altura rígida.»** Não reduzir valores para fazer o QA passar. Verificar se os anchors medem o mesmo stage do contrato, o comprimento total real e legibilidade dos estados (fast/reverse/anchors) antes de classificar como regressão funcional.

**Nuance de modelação do contrato:** o documento agrupa **Hero + Manifesto** no mesmo budget de 150–180vh; não duplicar o budget por contabilização de secções independentes. A comparação global exclui Footer natural.

## 4. Falha Motion / Media — confirmada

- `Futuro / Ciência`: a Motion Spec requer `COLUS-FUTURO-CIENCIA-VID-001.mp4`; em 6 amostras da janela ativa o browser observou somente `COLUS-FUTURO-CIENCIA-001.webp`. **FAIL real face ao contrato**, decorrente de workaround temporário após MP4 ser apresentado rodado. Corrigir orientação/export do asset antes de reintroduzir vídeo controlado; preservar poster como fallback e não alterar vídeo Hero.

## 5. Divergência de fidelidade ainda não detectada pelo QA automático

- `Futuro / Engenharia`: o `asset-final-selection-colus-v03.md` §3 determina cena **device-led**, `Path + Node`, geometria técnica/schematic e copy editorial, e proíbe tratar media genérica como prova de Engenharia. A implementação atual utiliza `COLUS-APRENDER-CRIAR-001.webp`, proveniente de Aprender. A solução deve passar por revisão do master, sem reintroduzir desenho técnico que tape rostos. Regra de fidelidade ainda é apenas `REVIEW` e não foi contada nos 3 gaps de Design acima.
- `Vozes COLUS`: possui composição editorial, mas testemunhos reais precisam de autorização; não fabricar depoimentos.
- `Pertencer`: a presença de ring/nodes não comprova geometricamente fidelidade ao master; revisão humana e checkpoints visuais pendentes.

## 5.1 Fase de execução iniciada — refinamento do auditor

- `contractEvaluator.ts` passa a classificar o excesso/defeito de `vh` como `REVIEW` e a apresentar budget global e agrupado, sem tornar a landing mais curta por iniciativa própria.
- `colusMotionQaContract.ts` V1.1 utiliza `Hero + Manifesto` como bloco conjunto, corrige duplicação do budget e referencia o total narrativo excluindo Footer.
- `visualCheckpoints.ts` e `colusVisualCheckpoints.ts` criam 45 pontos de inspeção, exportáveis em JSON/TXT e navegáveis através do painel.
- `qa-contract-tests.mjs` inclui casos de budget editorial, agrupamento e checkpoints.
- **Ainda pendente:** executar `npm run typecheck`, `npm run test:qa`, `npm run build` e rever visualmente os checkpoints; não há pixel-diff automático nesta fase.
- **Protegido:** Hero original, vídeo, poster, marca e restantes componentes visuais não foram modificados.

## 6. Ordem de trabalho e gates

1. **QA auditor** — marcar budget como desvio de ritmo a investigar, distinguir stage/layout e auditar global budget; evitar FAIL binário apenas pela diferença em vh.
2. **Footer** — obter logos EduCore/RIGHTWARE aprovados; implementar quatro grupos, respeitando a arquitetura prevista sem criar links fictícios.
3. **Ciência** — corrigir asset de vídeo/orientação e garantir o playback/fallback; o poster provisório não fecha o gate.
4. **Engenharia + demais REVIEW** — comparar cada estado com master/handoff e decidir solução sem overlay fixo sobre crianças.
5. **Testes browser e revisão humana** — desktop/mobile, reduced motion, ida/volta, fast wheel, anchors, frames comparados aos checkpoints aprovados.

Nenhum ajuste na landing deve ser aplicado automaticamente a partir do resultado do auditor.

**Estado pós-relatório:** análise documentada; não foram modificados `IntroHeroSection.tsx`, `ContactFooter.tsx`, assets nem componentes visuais nesta intervenção.

## 7. Simplificação da recolha de relatórios (2026-10-15)

Como a transferência de anexos grandes entre navegador e conversa se revelou pouco fiável, o painel de desenvolvimento dispõe de **Copiar resumo curto**. O resumo limita-se a 2.200 caracteres, inclui totais de Design e Motion, falhas estruturais, media ausente e desvios de ritmo ainda em revisão; assinala explicitamente quantas pendências foram omitidas pelo limite de tamanho.

A exportação completa TXT/JSON continua disponível para arquivo, mas **não é necessária para diagnóstico inicial**. O resumo é gerado localmente; não existe envio automático de dados. Este fluxo não modifica a landing nem exige que o utilizador execute comandos para extrair os dados.

Implementação reutilizável: `frontend/src/shared/design-qa/compactQaSummary.ts`; botão: `frontend/src/components/landing/LandingMotionQA.tsx`; testes: `frontend/scripts/qa-contract-tests.mjs`.

## 8. Comparação efetiva das auditorias (2) e (3) — 2026-10-15

**Evidência diretamente lida no GitHub:** [PatedContent-Select](qa-reports/PatedContent-Select) (extrato `Select-String` dos relatórios locais `COLUS-motion-qa-contrato (2).txt` e `(3).txt`). Não é uma exportação integral de todos os checkpoints ou revisão visual.

| Design | (2) | (3) |
|---|---:|---:|
| MATCH | 24 | 25 |
| MISSING | 2 | 2 |
| PARTIAL | 1 | 1 |
| DIVERGENT | 0 | 0 |
| REVIEW | 10 | 10 |
| NOT_OBSERVED | 1 | 0 |

A observação condicional do logo COLUS no Header deixou de constar como `NOT_OBSERVED` no percurso (3). As três pendências do Footer persistem: logos oficiais EduCore e RIGHTWARE ausentes e apenas 2/4 grupos de navegação.

**Motion (3):** `PASS 27 / FAIL 1 / REVIEW 31 / NOT_OBSERVED 0`; **100%** cobertura de scroll em dez secções; 0 erros reportados pelo trace e 3 intervalos de amostra acima de 100 ms. A comparação com o relatório anterior `PASS 27 / FAIL 7 / REVIEW 24` confirma que os seis desvios `vh` foram corretamente reclassificados como questões editoriais; não prova por si só melhoria de animação.

| Critério editorial | Esperado | Observado |
|---|---:|---:|
| Narrativa total, sem Footer | 1300–1580vh | **1813vh** |
| Hero + Manifesto, combinados | 150–180vh | **270vh** |
| Aprender | 170–195vh | **225vh** |
| Futuro | 210–240vh | **280vh** |
| Vida COLUS | 140–165vh | **277vh** |
| Pertencer | 115–140vh | **155vh** |
| Transformar | 150–175vh | **220vh** |

**Único FAIL reportado em Motion:** `Futuro & Tecnologia / media`: cena Ciência esperava `COLUS-FUTURO-CIENCIA-VID-001` mas o navegador viu `COLUS-FUTURO-CIENCIA-001.webp` em **7** amostras, sem vídeo.

### Implicações de engenharia

1. **Não encurtar o Hero aprovado.** O `Hero + Manifesto` observado (270vh) inclui um Hero estável protegido mais a secção editorial do Manifesto; rever o alinhamento entre o contrato conjunto e a direção visual aprovada antes de alterar alturas.
2. **O maior desvio individual de ritmo é Vida COLUS (277vh).** Trata-se de fotoensaio em fluxo natural: é preciso rever a duração e legibilidade, não reduzir CSS cegamente.
3. **Prioridade de implementação:** Footer com dois logos oficiais e quatro grupos de navegação; vídeo Ciência devidamente orientado e com poster fallback. Nenhuma destas correções exige modificar `IntroHeroSection.tsx` ou os assets protegidos do Hero.
4. **Auditor:** cobertura de 100% indica que os dez anchors foram percorridos; não equivale a auditoria de pixel/crop ou aprovação do wireframe completo.

**Estado:** o ficheiro foi finalmente lido diretamente a partir do GitHub; a comparação acima foi arquivada. Não alterar contratos ou elementos visuais apenas para fazer os indicadores passar.

## 9. Recuperação do vídeo Ciência e acesso QA — 2026-10-16

- O componente `FuturoSection.tsx` montava a cena 03 apenas com `COLUS-FUTURO-CIENCIA-001.webp` devido à orientação incorreta do vídeo original no Edge. A cena passou a montar `COLUS-FUTURO-CIENCIA-VID-001.mp4` com o poster estático como fallback. O original MP4 não foi alterado.
- A compensação de orientação `rotate-90` + `scale-[1.4]` atua apenas sobre o elemento `<video>` da Ciência, não sobre o poster nem sobre os assets do Hero. **A direção da rotação, o enquadramento e a qualidade ainda precisam de validação no Edge, desktop e mobile.** Não declarar vídeo/motion aprovado antes de ver a reprodução.
- O Motion QA V1.2 exige evidência adicional de **playback efetivo** (vídeo visível, amostras com estado ready/playing e avanço de `currentTime`). Se a amostragem não conseguir provar reprodução, devolve `REVIEW`, não um `PASS` apenas por encontrar o nome do MP4.
- `LandingMotionQA.tsx`: quando a landing é aberta em `http://localhost:8080/`, aparece um acesso discreto **Abrir Design + Motion QA**. O painel integral continua a exigir `/?motionQA=1#top` e `import.meta.env.DEV`. Nenhum destes instrumentos é visível numa build de produção.
- `qa-contract-tests.mjs` passou a testar fonte MP4, poster fallback, orientação restrita à Ciência, acesso QA em DEV e comportamento de tempo da media.

**Pendente neste gate:** executar `npm run typecheck`, `npm run test:qa`, `npm run build` e obter confirmação visual de orientação/reprodução no Edge antes de marcar Ciência `PASS`. Continua pendente Engenharia device-led, fidelidade visual de outras secções e validação global de motion. Copyright COLUS, Footer, favicon e Hero protegido inalterados.

### Revisão de orientação em Edge — 2026-10-16

A validação visual subsequente confirmou que `rotate-90` deixava o vídeo de Ciência **ainda de lado** (cabeças apontavam para a direita) e `scale-[1.4]` provocava zoom/crop excessivo. Em `FuturoSection.tsx`, a rotação exclusiva do `<video>` da cena 03 foi ajustada para `rotate-180`, sem a escala adicional. O poster continua sem transformação, e o MP4 original permanece intacto.

**Gate aberto:** confirmar com nova reprodução no Edge que os rostos estão verticais, sem crop indevido, antes de classificar a correção como validada. A auditoria de presença/playback não substitui o controlo de orientação.

## 10. Decisão aprovada — Cena Ciência (2026-10-16)

**Cena 03 / Ciência: APROVADA visualmente em desktop/Edge pelo responsável do COLUS.** O vídeo normalizado está vertical, sem rotação CSS. Fonte: captura e confirmação expressa do responsável do projeto após a intervenção Manus.

Implementação presente em `main` (commit `087eccd`) e documentada em [science-orientation-2026-10-16/README.md](qa-reports/science-orientation-2026-10-16/README.md).

- Recurso de reprodução: `COLUS-FUTURO-CIENCIA-VID-001-upright.mp4`.
- Source original e poster de fallback preservados.
- `LandingMedia.tsx`, `IntroHeroSection.tsx`, vídeo Hero e restante composição protegida não modificados.
- QA funcional de playback comunicado como aprovado pelo Manus; aprovação visual adicional confirmada pelo utilizador.
- **Pendente:** viewport mobile dedicado e regressão visual de todas as outras secções, incluindo Engenharia, rhythm e transições. Landing **não está concluída**.

Esta decisão substitui o estado de «aguarda validação» das notas históricas anteriores apenas para a **orientação desktop da Ciência**. O registo de tentativas CSS anteriores é mantido para rastreabilidade.

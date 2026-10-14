# COLUS — Motion QA baseado no Master V0.18

> **Tipo:** Contrato de aceitação comparativo, não nova direção de design.  
> **Versão:** V1 (2026-10-13)  
> **Estado:** Código integrado; build e prova no Edge pendentes.  
> **Regra:** a landing não é alterada para fazer passar este teste.

## 1. Fonte e ordem de autoridade

1. `docs/colus/design/landing/landing-colus-master.drawio` — master V0.18, blob `73bb21915fd8537f461573fdecba7397162ae6fd`;
2. `docs/colus/design/landing/high-fidelity-direction-colus.md`;
3. `docs/colus/design/landing/motion-spec-tecnico-colus.md` — V1.0;
4. `docs/colus/design/landing/scroll-budget-colus.md`;
5. `docs/colus/design/landing/motion-hierarchy-colus.md`;
6. `docs/colus/design/landing/asset-final-selection-colus-v03.md`.

O dashboard precisa mostrar a referência concreta para cada regra. A versão do contrato não é a versão da implementação.

## 2. Tabela de aceitação automática — desktop (≥1024px)

`vh` = percentagem da altura do viewport. Os intervalos vêm de `scroll-budget-colus.md`; o número do meio é o valor preferido. **O teste verifica tolerância documental, não escolha estética.**

| Stage / seletor | Intervalo | Preferido | Sticky exigido | Fonte de verdade |
|---|---:|---:|---|---|
| Intro / Hero `#top` | 180–220vh | 200vh | sim | Motion §5 / Master Intro |
| Manifesto `#o-colegio` | 150–180vh | 170vh | não obrigatório | Motion §6 |
| Aprender `#experiencia` | 170–195vh | 185vh | sim | Motion §7 / learn_168 |
| Futuro `#futuro` | 210–240vh | 230vh | sim | Motion §8 / future_21–58 |
| Vida `#vida-colus` | 140–165vh | 155vh | não | Motion §9 |
| Pertencer `#comunidade` | 115–140vh | 130vh | parcial | Motion §10 / belong_9127–9136 |
| Transformar `#transformar` | 150–175vh | 165vh | sim | Motion §11 |
| Vozes `#vozes-colus` | 100–160vh | conforme vozes reais | natural | Motion §12 |
| Convite `#contactos` | 90–100vh | 95vh | natural | Motion §13 |

**Limite importante:** como alguns anchors estão em wrappers internos, a comparação mede a altura do elemento com o anchor. Quando não for o contêiner do stage, rever o seletor e não converter discrepância automaticamente em ordem de alteração visual.

## 2.1 Revisão do critério de budget — V1.1 (2026-10-14)

O `scroll-budget-colus.md` §1 determina: **«Scroll budget é um limite de ritmo, não uma altura rígida.»**

- Valores fora do intervalo agora são `REVIEW — DESVIO DE RITMO`, com valor esperado e observado. Não são automaticamente `FAIL`.
- Budget global desktop: alvo aproximado `1300–1580vh`; zona preferida `1400–1500vh`. O adaptador exclui a altura natural do `footer` contido em `<main>`.
- `Hero + Manifesto` partilha uma faixa de `150–180vh`; a medição conjunta não é repetida como requisito independente do Manifesto. A Intro Morph mantém budget próprio.
- Regra funcional de media ausente, cena errada, sticky obrigatório em falta ou scroll não percorrido continua `FAIL`/`NOT_OBSERVED`, conforme a evidência.
- Ponto de inspeção visual em `docs/colus/presentation/visual-checkpoints-v1.md`: 45 checkpoints planeados, sem screenshot-diff ainda.

**Nota:** a tabela acima conserva os intervalos de referência documental; a sua leitura como limites CSS rígidos foi corrigida nesta versão. A revisão estética dos desvios é obrigatória antes de mexer em alturas.

## 3. Futuro — oráculo de cenas

| Progresso local | Esperado no mesmo Scene Window | Manual |
|---|---|---|
| 0–10% | Entrada / Signal Field | headline |
| 10–30% | `01 TIC` | imagem TIC correta, node ativo |
| 30–48% | `02 Engenharia` | Master/Motion descrevem device-led; foto usada atualmente é adaptação, **não reconciliação aprovada** |
| 48–70% | `03 Ciência` | exige vídeo controlado + poster fallback; imagem estática atual é provisória |
| 70–88% | `04 Segurança Digital` | imagem correta, sem sobreposição |
| 88–100% | saída / Story Marker | continuidade com Vida COLUS |

O comparador automático verifica **ID da cena renderizada e janela temporal**. A identidade e o enquadramento da imagem requerem verificação humana e Asset Gate.

## 4. Motion QA comparativo — interpretação

- **PASS:** uma regra instrumental verificável passou.
- **FAIL:** desvio numérico ou de cena/media; pede revisão técnica.
- **REVIEW:** requisito dependente de apreciação humana — pode envolver crop de rostos, rings, timing de leitura, logo.
- **NOT_OBSERVED:** teste não passou pelo estado; não aprovar.
- Cobertura global inferior a 70% ou menos de três secções visitadas torna o teste incompleto.

O teste deve apontar o desvio **sem alterar automaticamente** a landing.

## 5. Comportamentos que exigem rondas distintas

`motion-spec-tecnico-colus.md` §23 requer:
- slow scroll e fast wheel/trackpad;
- scroll inverso;
- anchor jump com sticky;
- touch mobile e rotação;
- desktop → tablet;
- reduced motion;
- media bloqueada, asset não carregado, browser sem autoplay.

**Piloto V1:** comparação básica de desktop com scroll automático. Os outros modos estão documentados como gates pendentes; um único PASS no desktop não autoriza fechar o gate técnico global.

## 6. Uso no Edge

1. Executar `npm run typecheck`, `npm run build`, `npm run dev` no `frontend`.
2. Abrir `http://localhost:8080/?motionQA=1#top` (somente em desenvolvimento).
3. Selecionar **Executar teste automático**, sem manipular manualmente o scroll.
4. Ler o painel **Comparação com o master e o Motion Spec**.
5. Exportar **Contrato + resultados .json** ou **Relatório .txt** para partilhar.
6. Registrar exceções técnicas justificadas e revisão visual por secção.

Relatórios não são enviados automaticamente a terceiros. O `.txt` inclui evidência temporal; o JSON transporta contrato e resultados estruturados. A versão V1 não guarda screenshots nem um vídeo com o movimento.

## 7. Divergências já conhecidas (não resolver por redefinição do contrato)

- Comprimentos implementados de alguns stages podem diferir dos valores preferidos/limites — o teste deverá sinalizar.
- Engenharia apresenta fotografia aprovada noutro bloco, enquanto a Motion Spec prevê cena `device-led`; decisão visual posterior precisa de validação contra master.
- Ciência está atualmente em poster temporário por orientação errada do MP4; a Motion Spec exige vídeo controlado.
- Vozes ainda não dispõe de testemunhos reais autorizados; não inventar quotes.
- Handoffs e fluidez qualitativa dependem de validação humana.

## 8. Separação para reutilização RIGHTWARE

O método universal está em `docs/rightware/frameworks/motion-qa-contract-driven.md`; a experiência COLUS e as decisões específicas **não devem ser promovidas a regras universais**. A adaptação para outro sistema exige contrato próprio, mantendo o evaluator independente.

**Gate atual:** DESIGN REFERENCE FOUND / QA ENGINE IMPLEMENTED / BUILD PENDING / BROWSER QA PENDING / HUMAN APPROVAL PENDING.

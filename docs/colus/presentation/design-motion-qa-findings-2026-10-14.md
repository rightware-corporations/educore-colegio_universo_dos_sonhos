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

## 6. Ordem de trabalho e gates

1. **QA auditor** — marcar budget como desvio de ritmo a investigar, distinguir stage/layout e auditar global budget; evitar FAIL binário apenas pela diferença em vh.
2. **Footer** — obter logos EduCore/RIGHTWARE aprovados; implementar quatro grupos, respeitando a arquitetura prevista sem criar links fictícios.
3. **Ciência** — corrigir asset de vídeo/orientação e garantir o playback/fallback; o poster provisório não fecha o gate.
4. **Engenharia + demais REVIEW** — comparar cada estado com master/handoff e decidir solução sem overlay fixo sobre crianças.
5. **Testes browser e revisão humana** — desktop/mobile, reduced motion, ida/volta, fast wheel, anchors, frames comparados aos checkpoints aprovados.

Nenhum ajuste na landing deve ser aplicado automaticamente a partir do resultado do auditor.

**Estado pós-relatório:** análise documentada; não foram modificados `IntroHeroSection.tsx`, `ContactFooter.tsx`, assets nem componentes visuais nesta intervenção.

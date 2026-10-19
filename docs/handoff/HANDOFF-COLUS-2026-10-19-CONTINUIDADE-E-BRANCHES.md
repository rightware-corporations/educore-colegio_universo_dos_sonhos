# HANDOFF OPERACIONAL COMPLETO — COLUS / EduCore / RIGHTWARE — 2026-10-19

> **FUNÇÃO:** ponte de continuidade para um novo chat quando o atual atinge o limite. Este ficheiro foi criado após consulta direta do histórico versionado, das branches e dos PRs. **Não substitui nem apaga os handoffs anteriores.** 
> **Repositório:** https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos
> **Branch deste documento:** `feat/colus-desktop-master-plus-fidelity` (PR #3 Draft → `feat/colus-mobile-editorial-storytelling`).
> **Data de corte das verificações de Git:** 2026-10-19; voltar a verificar HEAD, PRs e Actions no início do próximo chat.
> **Classificação:** histórico verificado + estado Git verificado + bloqueios/planos. Não converter propostas em decisões aprovadas.

## A. Protocolo inegociável para o próximo agente

1. **LER INTEGRALMENTE TODOS os handoffs**, da origem até ao presente, e não apenas `CURRENT`. Seguir `docs/handoff/README.md`, incluindo as duas fontes históricas adicionais (`docs/colus/handoff/HANDOFF-2026-10-03.md`, `docs/handoffs/colus-implementation-handoff.md`). Ler este documento datado antes de `CURRENT`; ler `CURRENT` por último. O prompt atual é `docs/handoff/NEW-CHAT-PROMPT-COLUS.md`; `docs/colus/handoff/NEXT-CHAT-PROMPT.md` é legado.
2. Examinar o código atual do GitHub, `main`, as duas feature branches, PR #2, PR #3 e seus últimos commits. **Não confiar em um "NEXT TASK" histórico como tarefa atual.** Quando duas decisões divergem, sinalizar a divergência e usar decisão explícita posterior + código atual como fontes de implementação.
3. Continuar o projeto **COLUS / Colégio Universo dos Sonhos**. Não confundir a identidade da instituição com RIGHTWARE, nem com outros repositórios escolares (p. ex. um eventual Colégio Horizonte do Futuro). EduCore é tecnologia da RIGHTWARE.
4. Nunca afirmar que o assistente eliminou conversas: limites de contexto não equivalem a eliminação. Repositório + handoffs são o arquivo confiável; conversas antigas podem exigir acesso separado.
5. Não pedir de novo assets já versionados. `landing-colus-master-plus.drawio` foi visto como anexo/referência visual, mas **não consta atualmente entre os Draw.io versionados verificados no Git**; `landing-colus-master.drawio` está versionado. Se a geometria exata do PLUS precisar ser reaberta e o anexo anterior tiver expirado, pedir novo upload do **PLUS**, sem substituir assets.

## B. Linha cronológica — leitura e evolução (não omitir nenhum marco)

| Data | Fonte | Conteúdo relevante | Cuidado |
|---|---|---|---|
| 03/10 | `docs/handoffs/colus-implementation-handoff.md` | Plano inicial de implementação, componentes, specs e proteção de media | Plano histórico; não é execução atual |
| 03/10 | `docs/colus/handoff/HANDOFF-2026-10-03.md` | Versão posterior na mesma data: arquiteturas V1 fechadas, árvore repo como próximo trabalho | Confrontar com specs V1 reais |
| 03/10 | `docs/handoff/HANDOFF-COLUS-2026-10-03.md` | Baseline de produto: SaaS distribuído, um repo/deployment por escola, Java/Postgres/Redis, Control/Data/Experience Planes | Neste documento, gate Stack/Backend/DB/Security ainda figurava como aberto; **histórico**, ultrapassado por V1 canónica posterior |
| 04/10 | `docs/handoff/HANDOFF-COLUS-2026-10-04-CONTINUATION.md` | Implementação de landing, Hero/Manifesto, correções de ritmo, marca original | Não presumir que sha/estado de main de 04/10 sejam atuais |
| 05–16/10 | Secções do `CURRENT` | Decisões, QA, Footer, favicon, Ciência, mobile, experiências | Existem decisões históricas contraditórias (ver §F) |
| 16/10 | `docs/handoff/HANDOFF-COLUS-2026-10-16.md` | Auditoria operacional, Ciência vertical já integrada, Hero protegido, Footer, design/motion QA, pendências | Não reexecutar fix Ciência nem atribuir aprovação global |
| 16–17/10 | `CURRENT` §§18–36 + QA reports | Mobile editorial, vídeo Engenharia contextual, pentágono retirado, coração intencional, filled rings e dispositivos desktop | O coração **não** é livro; prioridade a imagens + storytelling e motion |
| 17/10 | `CURRENT` §§37–38 e `docs/colus/presentation/qa-reports/desktop-master-plus-fidelity-2026-10-17.md` | PR #3 isolado, Master Plus, seis nós, Community Ring, cinco fases, Scene Window Futuro, correções WAAPI | Cuidado com numeração duplicada de secções no `CURRENT` |
| 19/10 | `CURRENT` §§39 e segundo §38 + QA relatório atualizado | Chromium scroll progressivo e inverso, 60 amostras 1440/1024, zero overflow, último run CI | Resultados técnicos comprovados **não** equivalem a aprovação estética; PRs ainda Draft |
| 19/10 | Este handoff e `BRANCH-STRATEGY-COLUS.md` | Auditoria de branches, plano de consolidação main/develop, prompt completo para chat novo | **Não realizar merges nem deletar branches ainda** |

## C. Produto e arquitetura — guardar as distinções

- RIGHTWARE é empresa de tecnologia; EduCore é produto; COLUS é a instituição e a personalização específica. A landing COLUS é demonstração/editorial institucional, **não** portal escolar operacional completo.
- Modelo de produto (decisões históricas): **uma escola = um repositório + deployment isolado**. `RIGHTWARE Control Plane` central mantém metadata de instâncias, versões, health, licenças e módulos; **Data Plane** escolar isolado armazena alunos/famílias/notas/pagamentos; **Experience Plane** é a personalização visual e funcional da escola.
- Super Admin é RIGHTWARE global, não confundir com admin do colégio. Não apresentar integração real, dados internos, relações institucionais, depoimentos ou produção como existentes sem prova.
- Arquiteturas V1 documentadas em `docs/colus/architecture/platform-stack-v1.md`, `backend-architecture-v1.md`, `database-architecture-v1.md`, `security-architecture-v1.md`: Java/Spring Boot conforme V1, PostgreSQL, Redis, security forte. **Arquitetura documentada NÃO implica backend de produção implementado.** O antigo handoff de 03/10 que pede para começar Stack V1 NÃO prevalece para a tarefa atual de QA da landing.
- Páscoa e outros colégios podem ser referências para futuros produtos, não autorização para misturar código, identidade, fotos ou repositórios com COLUS.

## D. Landing / contrato editorial / asset lock

**Sequência:** Intro Morph → Hero → Manifesto/O Colégio → Aprender (Descobrir→Criar) → Futuro (TIC→Engenharia→Ciência→Segurança Digital) → Vida COLUS → Pertencer (Community Ring) → Transformar (Expressar→Construir→Avançar) → Vozes editorial (não inventar testemunhos) → Convite/Contactos → Footer.

- Frontend implementado: React 18, TypeScript, Vite, Tailwind, Framer Motion, SVG. Storytelling responsive; desktop compositivo, mobile imersivo, sem compor como cards + texto soltos.
- **BLOQUEIO:** manter os assets, URLs `src`, posters, copy, logo, cores/identidade, crops aprovados, `LandingMedia.tsx` global e principalmente `IntroHeroSection.tsx` + vídeo do Hero. Sem autorização explícita não mexer. Teste `frontend/scripts/qa-protected-assets.mjs` e contrato `docs/colus/presentation/hero-protected-asset-lock.json`.
- Coração **intencional** no mobile Hero→Manifesto, sem barra vertical central; não o trocar por livro ou por outra marca.
- Ciência usa vídeo vertical normalizado, guardando original, já integrado à main em PR #1; correção desktop da orientação foi visualmente aceite antes, mas não extrapolar para todas as cenas ou viewports.
- Engenharia recebeu foto contextual no mobile em iterações posteriores; pentágono overlay foi removido. **Não reinterpretar especificação antiga “device-led sem foto” para apagar decisões mais recentes.**
- Community Ring do Master Plus: arco aberto e pontilhado, seis nós de contexto pequenos **circulares**, ponteiro principal preenchido, headline + descrição no interior da elipse, três media ao redor, três relações Acompanhar/Participar/Crescer juntos visíveis uma vez, cinco fases RELAÇÃO→ARCO NASCE→COMUNIDADE→ESTABILIDADE→ABERTURA; saída alinhada ao Rise Axis.
- Futuro: **mesmo Scene Window**, quatro cenas/media aprovados; progresso 01–04; Signal Field sem atravessar rostos, headline ou copy. Aprender tem PATH→NODE→handoff; Transformar tem três cenas e Horizon.
- Footer: © 2026 Colégio Universo dos Sonhos. Todos os direitos reservados. Assinatura separada: Powered by EduCore · A RIGHTWARE Product. Footer Dark, favicon e Ciência desktop foram implementados antes; política de links não inventados e OPEN-01 idioma pendente.
- Publicação pública depende de aprovação de direitos de imagem e contactos reais, revisão editorial/legal e consentimentos aplicáveis. Não assumir.

## E. Estado Git real verificado em 19/10/2026 — NÃO CONFUNDIR

**Repositório:** `rightware-corporations/educore-colegio_universo_dos_sonhos`; default `main`.

| Branch / PR | HEAD observada | Situação |
|---|---|---|
| `main` | `b5b493386377cc54d4f8850e294557abe4a90bd5` | código integrado antigo / produção potencial, sem PRs #2/#3 |
| `feat/colus-mobile-editorial-storytelling` | `22b75f05f130226d1614cdf0a34473dc9c72a7fc` | PR #2 **OPEN / DRAFT → main**, 130 commits à frente de main, nenhum atrás |
| `feat/colus-desktop-master-plus-fidelity` | `795463e6a674986bddcf89c55a43d1d0384fe9d5` | PR #3 **OPEN / DRAFT → branch mobile**, +58 commits em relação à mobile, cumulativamente 188 à frente de main |
| `fix/colus-science-video-orientation` | `087eccd272a7` | branch histórica; PR #1 merged 16/10 |
| Sete `backup/*` | vários SHAs, consultar GitHub | checkpoints de segurança; não apagar sem auditoria/tags |
| `develop` | **não existe** | branch permanente recomendada, a criar na futura operação controlada |

**Última execução conhecida:** https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39210062433 SUCCESS na HEAD do PR #3. Chromium scroll direto/inverso teve também run 39203930468 com 60 amostras, 1440×900 e 1024×768, nenhum overflow; regressão mobile, TypeScript, QA e build aprovados segundo workflow. Guardar sempre ID/SHA e diferenciar run histórico do corrente.

**Nenhum PR #2 ou #3 foi integrado**, não há autorização de merge na `main`. A latest state do GitHub em cada novo chat prevalece sobre esta fotografia temporal.

## F. Conflitos e riscos NÃO resolvidos silenciosamente

- `CURRENT` contém **dois blocos rotulados §38** e fragmentos históricos consecutivos; este documento NÃO apagou o arquivo vivo nem falsificou cronologia. No futuro usar marcos datados e referências de commits, em vez de renumerar retroativamente.
- Primeiro 03/10 exigia definir stack/arquitetura; outro 03/10 documentava V1 já fechada. Ler os ficheiros V1 e usar realidade Git antes de supor que o gate continua aberto.
- Remoção de Vozes/Testemunhos discutida em 05/10 vs. `TestimonialsSection` atualmente montada sem citação inventada. **Decisão editorial continua a confirmar**; não remover automaticamente.
- Master visual V0.18 versionado vs. `landing-colus-master-plus.drawio` fornecido externamente para direção desktop. O PLUS não foi encontrado versionado na última árvore auditada. Se necessário reabrir, pedir o ficheiro original. Não adivinhar detalhes geométricos fora da evidência.
- O QA verde garante contratos e amostras, **não** equivalência pixel a pixel, direitos de imagem nem aprovação estética final. Necessário Edge do responsável com scroll normal, inverso, 1440px/1024px, mobile de regressão.
- **Estado separado:** código implementado na PR #3, testes GitHub aprovados, aprovação estética pendente, decisão de release/merge **não tomada**.
- As sete branches de backup e a branch da Ciência não são sete trabalhos concorrentes; evitar confundir a quantidade com perda de código.

## G. Plano seguro de governança Git: duas branches permanentes

**Objetivo recomendado (ainda não executado):**
```
main          = versão estável/aprovada
develop       = integração ativa e QA antes de release
feature/*     = temporárias, PR → develop, apagar só depois de integração e backup
backup/*      = pontos históricos, posteriormente etiquetar/arquivar após auditoria
```

**Ordem segura, sem atalhos:**
1. Congelar alterações desnecessárias e conferir `git status` local, remotes, SHAs e PRs. Nunca forçar `reset --hard`, `push --force`, `git branch -D`, `git push --delete` ou rebase de branches compartilhadas como “limpeza”.
2. Rever visualmente PR #3 e obter aprovação explícita. Só então integrar PR #3 na feature mobile/PR #2; validar o diff completo e rodar CI novamente.
3. Criar `develop` **a partir da `main` contemporânea**, não a partir de um backup nem de branch parcial. Propor/alterar base do PR #2 para `develop` somente após explicar a mudança e verificar o diff/CI; aprovar e integrar.
4. Confirmar `develop` contém integralmente os 188 commits funcionais (ou equivalentes quando squash) através de comparação de árvores, não apenas contagem de commits. Testar e arquivar SHA anterior/depois.
5. Gerar PR `develop → main` só após aprovação global; verificar asset lock, testes e rollback. Criar tags imutáveis para marcos aprovados.
6. Apenas **depois da comprovação de ancestry/merge e da concordância do responsável**, inventariar backups e branches antigas para eventual limpeza seletiva. **Não apagar na primeira passagem.**
7. Com branches `main` e `develop` permanentes, novas features pequenas podem usar PR curto e branch efémera quando justificável; NÃO trabalhar diretamente em `main` para refinamentos incompletos.

Plano detalhado em `docs/handoff/BRANCH-STRATEGY-COLUS.md`. A quantidade de branches não elimina código por si; as mudanças devem ser reconciliadas antes de remover qualquer referência.

## H. Próxima tarefa do NOVO CHAT

**Não reiniciar desenho ou regressar a tarefas antigas.** A tarefa atual é **CONTINUIDADE + CHECKPOINT VISUAL FINAL DO PR #3 + PROPOSTA DE CONSOLIDAÇÃO**, não implementação de novo colégio nem projeto/backend do zero.

1. Cumprir toda a leitura do índice de handoffs e specs, mais o PR #3 e PR #2. Fazer tabela com documentos lidos + commits do GitHub.
2. Conferir HEAD da `main`, das duas features, último CI, e se há alterações desde este handoff; confirmar que não existe `develop` (ou detetar se foi criada entretanto). Não editar branch errada.
3. Comparar o Master Plus com as capturas Chromium/Edge mais recentes e recolher parecer do responsável sobre ring aberto, tipografia central, imagens, handoffs e motion. Não declarar aprovação estética sem ela.
4. Se houver falha concreta, corrigir apenas **geometria/scroll/opacity/nós** no PR #3, sem mudar media, textos, Hero/mobile. QA (typecheck, test:qa, build, browser mobile/desktop/direct-reverse, asset lock).
5. Após signoff, pedir autorização específica antes de PR #3→PR #2, PR #2→`develop`, e `develop`→`main`; confirmar cada passo com comparação e CI.
6. Atualizar este handoff por **novo marco datado**, `CURRENT`, índice e prompt quando houver alterações importantes; não apagar versões anteriores.

## I. Fontes que devem permanecer no próximo chat

- `docs/handoff/README.md` — **índice cronológico oficial**.
- `docs/handoff/NEW-CHAT-PROMPT-COLUS.md` — **prompt atual**.
- `docs/handoff/HANDOFF-COLUS-CURRENT.md` — registro vivo (inclui §§1–39 e §38 duplicado).
- `docs/colus/design/landing/landing-colus-master.drawio`; `motion-spec-tecnico-colus.md`; `scroll-budget-colus.md`; `master-high-fidelity-consolidation-colus.md`; `asset-final-selection-colus-v03.md`.
- `docs/colus/presentation/qa-reports/desktop-master-plus-fidelity-2026-10-17.md` + `mobile-master-alignment-2026-10-17/README.md`.
- `frontend/src/components/landing/`, `frontend/src/pages/LandingFoundationPage.tsx`, `frontend/scripts/qa-desktop-master-plus.mjs`, `qa-desktop-reverse-motion.mjs`, `qa-protected-assets.mjs`, `.github/workflows/colus-frontend-qa.yml`.
- PR #2 https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/pull/2
- PR #3 https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/pull/3

**Importante:** este documento é um handoff consolidado, **não um transcript literal de todas as conversas**. O histórico versionado deve ser lido diretamente, e não substituído por suposições sobre mensagens antigas.

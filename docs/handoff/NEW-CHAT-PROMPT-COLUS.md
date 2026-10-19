# PROMPT OFICIAL PARA NOVO CHAT — RIGHTWARE / EduCore / COLUS
> Atualizado em 2026-10-19. **Usar a versão desta branch de trabalho** e não a antiga em `main` até integração autorizada.

## Mensagem para colar no novo chat

Continuamos o trabalho de implementação e validação da landing **COLUS — Colégio Universo dos Sonhos**, parte do produto **EduCore**, criado pela **RIGHTWARE**. Sou o operador do projeto e preciso de continuidade técnica completa, sem ter de repetir decisões e sem perder nenhuma branch ou asset.

**Repositório:** `rightware-corporations/educore-colegio_universo_dos_sonhos`
https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos

**BRANCH DE TRABALHO ATUAL PARA LER PRIMEIRO:** `feat/colus-desktop-master-plus-fidelity` — [PR #3 DRAFT](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/pull/3), cuja base é `feat/colus-mobile-editorial-storytelling` ([PR #2 DRAFT](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/pull/2)). A `main` está atrás das melhorias de PR #2 + PR #3. **NÃO alterar `main`, não criar branches extra nem fazer merge/delete/reset/force-push sem autorização expressa**. A estratégia final pretendida é manter duas branches permanentes: `main` estável e `develop` para integração, com features temporárias. `develop` ainda não existia em 2026-10-19. Verificar no GitHub ao iniciar.

### TAREFA OBRIGATÓRIA ANTES DE QUALQUER CÓDIGO

1. Abrir no GitHub **a branch de trabalho atual** e ler `docs/handoff/README.md` NA ÍNTEGRA. Depois, ler **INTEGRALMENTE e por ordem cronológica TODOS os handoffs**, sem ler apenas `CURRENT` e sem pular os mais antigos:
   - `docs/handoffs/colus-implementation-handoff.md` (legado 03/10: implementação original);
   - `docs/colus/handoff/HANDOFF-2026-10-03.md` (legado 03/10: stack/arquitetura V1);
   - `docs/handoff/HANDOFF-COLUS-2026-10-03.md` (baseline oficial);
   - `docs/handoff/HANDOFF-COLUS-2026-10-04-CONTINUATION.md`;
   - `docs/handoff/HANDOFF-COLUS-2026-10-16.md`;
   - `docs/handoff/HANDOFF-COLUS-2026-10-19-CONTINUIDADE-E-BRANCHES.md` (NOVO, continuação completa até 19/10);
   - `docs/handoff/BRANCH-STRATEGY-COLUS.md` (governança atual);
   - `docs/handoff/HANDOFF-COLUS-CURRENT.md` (**ler por ÚLTIMO**, incluindo as secções 18–39 e a secção 38 duplicada no fim; não assumir que a numeração é perfeita).
   Os prompts legados em `docs/colus/handoff/NEXT-CHAT-PROMPT.md` são históricos: **não executar as suas tarefas antigas como se fossem o estado atual**.
2. Abrir as fontes reais indicadas nos handoffs, prioritariamente:
   - `docs/colus/design/landing/landing-colus-master.drawio`;
   - `docs/colus/design/landing/master-high-fidelity-consolidation-colus.md`;
   - `docs/colus/design/landing/high-fidelity-direction-colus.md`;
   - `docs/colus/design/landing/motion-spec-tecnico-colus.md`;
   - `docs/colus/design/landing/scroll-budget-colus.md`;
   - `docs/colus/design/landing/asset-final-selection-colus-v03.md`;
   - `docs/colus/presentation/qa-reports/desktop-master-plus-fidelity-2026-10-17.md`;
   - `docs/colus/presentation/qa-reports/mobile-master-alignment-2026-10-17/README.md`;
   - `docs/colus/architecture/platform-stack-v1.md`, `backend-architecture-v1.md`, `database-architecture-v1.md`, `security-architecture-v1.md` para contexto de produto (NÃO desviar para backend agora).
   O `landing-colus-master-plus.drawio` foi usado como referência detalhada em anexo, mas não foi identificado como arquivo versionado em Git; se não estiver acessível e for exigida comparação exata, pede-me para o reenviar.
3. Verificar diretamente no GitHub: HEAD de `main`, PR #2 e PR #3, branch/status de cada PR, lista real de branches, `develop` (existência ou não), comparações `main → PR#2 → PR#3`, últimos GitHub Actions e arquivos QA. **Não confiar em SHAs escritos em handoffs como atuais sem conferir.** Em 19/10 PR #2 estava 130 commits à frente de main e PR #3 mais 58; backups históricos são referências de segurança, não código perdido.
4. Ler o código real antes de decidir: `frontend/src/pages/LandingFoundationPage.tsx`, `frontend/src/components/landing/`, `frontend/src/components/landing/useScrollOpacity.ts`, `frontend/scripts/qa-desktop-master-plus.mjs`, `frontend/scripts/qa-desktop-reverse-motion.mjs`, `frontend/scripts/qa-protected-assets.mjs`, e `.github/workflows/colus-frontend-qa.yml`.
5. Entregar **primeiro** um briefing sucinto de `CONFIRMADO EM GIT` / `APROVADO PELO RESPONSÁVEL` / `PENDENTE` / `PROPOSTA`; relacionar cada passo com evidência. Depois propor a próxima ação sem a executar até confirmar o escopo. Não dizer “aprovado visualmente” só porque CI = PASS.

### CONTEXTO ATUAL QUE NÃO PODES PERDER

- **Direção de arte**: storytelling imersivo, tipografia integrada na fotografia, Path/Node/Rings como dispositivos de motion, não cards separados do texto. Desktop e mobile têm relações específicas do wireframe.
- **Bloqueio de media**: não trocar nem editar fotografias, vídeos, assets, posters, logos, copy, Hero, crop aprovado, marca, fonte dos media, Footer/copyright ou versão mobile aprovada sem pedido explícito. Hero original é especialmente protegido. Coração de transição no mobile é INTENCIONAL, sem barra central (não é livro).
- **Master Plus desktop Pertencer**: elipse aberta e pontilhada, seis nós pequenos preenchidos e circulares, ponteiro ativo, headline e descrição no centro, três imagens de comunidade ao redor, relação Acompanhar→Participar→Crescer juntos, cinco estados RELAÇÃO→ARCO NASCE→COMUNIDADE→ESTABILIDADE→ABERTURA; saída para Rise Axis. Não adicionar rings vazios arbitrários.
- **Aprender**: Descobrir→Criar; PATH via node para Futuro. **Futuro**: mesmo Scene Window em TIC→Engenharia→Ciência→Segurança Digital, numeração ativa, Signal Field sem atravessar texto/rostos. **Transformar**: Expressar→Construir→Avançar e Horizon. Fluxo nativo de scroll e inversão precisam de QA.
- **Bug corrigido e protegido**: opacidade das cenas desktop estava dessincronizada do Framer Motion por WAAPI/Chromium apesar do `scrollYProgress` correto; o código atual usa `useScrollOpacity.ts` para as opacidades dessas secções. Não reverter sem provas. GitHub Actions 2026-10-19 confirmou testes desktop 1440×900, 1024×768, scroll progressivo e inverso, mobile regressions, typecheck e build.
- Ciência usa vídeo upright já integrado na `main`; não repetir correção de orientação. Engenharia recebeu foto contextual e pentágono antigo foi removido; não reintroduzir overlays.
- Copyright institucional COLUS (não RIGHTWARE) e assinatura separada Powered by EduCore · A RIGHTWARE Product. Não inventar depoimentos, métricas, integrações, aprovações, links, direitos de imagem nem claims.
- **Diferenças históricas reais**: antigos handoffs de 03/10 divergem sobre abertura/fecho do gate arquitetural; as specs V1 posteriores definem arquitetura documental; `Vozes COLUS` tem decisão editorial histórica contraditória com implementação atual. Registar e confirmar, não decidir sozinho.
- Último CI verificado antes desta documentação: [Run 39210062433](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39210062433) SUCCESS. Isto é QA técnico, **NÃO** aprovação estética final do responsável.
- A `main` não deve receber PR #2 ou PR #3 antes de aprovação explícita. A estratégia `develop` + `main` está **recomendada mas ainda NÃO implementada**. Há sete backups; não apagar sem auditoria. PR #1 Ciência já foi merged.

### QUAL É A PRÓXIMA AÇÃO

O projeto está **perto da aprovação visual**, não pronto para merge/publicação. Validar screenshots reais e scroll contínuo em Edge contra o Master Plus (desktop 1440/1024, transições e recortes; regressão mobile), apontar apenas desvios comprovados, e preservar assets/copy. Sem alterações gratuitas.

Após aprovação, apresentar proposta de integração controlada PR #3 → branch mobile/PR #2 → `develop` → `main`, com checks e autorização entre etapas. Sem `reset --hard`, `push --force`, `branch -D`, rebase destrutivo nem operações que arrisquem os 188 commits.

### PROTOCOLO DE RESPOSTA

- Primeiro comprovar quais **documentos foram efetivamente lidos**, HEADs/PRs/runs atuais e divergências; não afirmar leitura não executada.
- Não me enviar tarefas manuais de engenharia se tens o GitHub acessível; executar no repositório apenas depois de escolher escopo apropriado e verificar SHA/branch.
- Separar `IMPLEMENTADO`, `TESTADO`, `APROVADO`, `PENDENTE`, `RECOMENDADO`.
- Se um arquivo do chat expirou, preferir cópia GitHub; pedir reenvio **apenas** do arquivo exato indispensável.
- Nunca “limpar” handoffs históricos, nem substituir documentação por memória não verificável.
- Depois de cada ciclo substancial: atualizar `docs/handoff/HANDOFF-COLUS-CURRENT.md`, criar novo marco datado quando necessário, atualizar índice e plano de branches se mudar.

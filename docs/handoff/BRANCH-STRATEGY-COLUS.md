# COLUS — Governança de branches sem perda de código
**Proposta operacional, 2026-10-19. NÃO EXECUTAR merges/deletes sem aprovação específica.**

## 1. Fotografia do repositório
Repo: https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos

Em 2026-10-19, o GitHub lista **11 branches**:
- `main`: `b5b493386377cc54d4f8850e294557abe4a90bd5`.
- `feat/colus-mobile-editorial-storytelling`: `22b75f05f130226d1614cdf0a34473dc9c72a7fc` — PR #2 DRAFT → main.
- `feat/colus-desktop-master-plus-fidelity`: `795463e6a674986bddcf89c55a43d1d0384fe9d5` à hora da análise — PR #3 DRAFT → branch mobile; **os novos commits deste handoff mudam esta SHA**.
- `fix/colus-science-video-orientation`: `087eccd272a7` — PR #1 **MERGED** em 16/10; não repetir.
- Sete checkpoints de backup:
  - `backup/colus-2026-10-13-before-contract-motion-qa`;
  - `backup/colus-2026-10-13-before-motion-overlap-fixes`;
  - `backup/colus-2026-10-13-before-motion-scene-fix`;
  - `backup/colus-2026-10-13-before-polish-batch`;
  - `backup/colus-2026-10-14-before-phase2-qa`;
  - `backup/colus-2026-10-14-before-qa-accuracy-fix`;
  - `backup/landing-colus-2026-10-13-before-restore`.

**Não existe develop nesta fotografia.** Nenhuma branch foi apagada e nenhum PR de desenvolvimento foi merged por este trabalho.

`git compare` verificado:
- main → mobile: **ahead 130, behind 0**, 23 ficheiros alterados.
- mobile → desktop Master Plus: **ahead 58, behind 0**, 13 ficheiros alterados.
- main → Master Plus: **ahead 188, behind 0**, 28 ficheiros alterados.
- A contagem de commits muda quando se adicionar documentação/novos commits; usar SHAs e diff/árvore para determinar conteúdo e nunca só uma contagem.

## 2. Política recomendada para o futuro (NÃO é uma alteração já aplicada)

```text
                 develop [integração + QA]
               /     |       \
    feature/* --PR----|        |----- PR release ----> main [estável]
                       |
                 proteção de assets
```

- `main` é estável. Nunca receber código inacabado nem alterações diretas para acelerar o trabalho.
- `develop` será o branch de integração das funcionalidades **depois** de revisão/QA.
- `feature/*` é temporária, apenas quando necessário isolar trabalho ainda não validado.
- Tags versionadas para releases e checkpoints importantes; backups antigos preservados até reconciliação.
- Branch protection/review/checks em `main` e `develop` são **recomendação de configuração** (pode requerer acesso administrativo); não afirmar que estão ativadas.

## 3. Plano de migração dos dois PRs abertos

**Gate 0 (agora):** conferir as três HEAD reais e estado do working tree local, último CI e aprovação editorial. Não criar `develop` a partir de HEAD arbitrária. Não alterar bases dos PRs sem avaliar o diff.

**Gate 1 (PR #3):** apresentar screenshots e reproduzir Master Plus desktop 1440/1024 com scroll progressivo, inverso e mobile regression. Com **aprovação explícita do responsável**, integrar PR #3 → `feat/colus-mobile-editorial-storytelling` (que é a base de PR #3). Confirmar diff/resultado, run CI após integração.

**Gate 2 (primeira develop permanente):** criar `develop` a partir da `main` **mais recente no momento da operação**; é seguro porque traz só o baseline estável. Migrar/retarget PR #2 → `develop` após revisão e autorização, verificar ancestry, diff, checks e asset lock. Merge somente após aprovação. Preservar referencial PR #2 original para auditoria.

**Gate 3 (release):** PR `develop`→`main` com aprovação visual e de negócio; CI + asset lock + QA Chromium + Edge + direitos/media/links. Confirmar código, rollback e tags de release.

**Gate 4 (limpeza):** apenas quando commits/diffs estão integrados e rastreáveis, inventariar branches `feature/*`, `backup/*`, `fix/*` remanescentes. Opcionalmente criar tags de arquivo dos SHAs históricos, verificar acessibilidade, obter autorização **antes** de apagar alguma. A regra é **limpar referências sem perder conteúdo**, jamais resetar/rebase-forçar código existente.

## 4. Operações de inspeção — seguras, não modificam histórico

No PowerShell do repositório:

```powershell
git status
git remote -v
git fetch origin --prune
git branch -a
git log -1 --format="%h %s" origin/main
git log -1 --format="%h %s" origin/feat/colus-mobile-editorial-storytelling
git log -1 --format="%h %s" origin/feat/colus-desktop-master-plus-fidelity
git log --oneline origin/main..origin/feat/colus-mobile-editorial-storytelling
git log --oneline origin/feat/colus-mobile-editorial-storytelling..origin/feat/colus-desktop-master-plus-fidelity
git diff --stat origin/main...origin/feat/colus-desktop-master-plus-fidelity
```

**Antes de trocar branches:** `git status`; se houver modificações locais, guardar o trabalho com commit/stash conforme contexto e autorização; `git switch` apenas quando seguro. `git fetch --prune` atualiza referências remotas obsoletas, **não apaga commits nem branches remotas**, mas pode remover refs locais de branches remotas que já tenham sido apagadas; não o confundir com limpeza do histórico.

## 5. Contratos para revisão e aceitação

**Protegido:** `frontend/public/media/**`, Hero, poster, `LandingMedia`, logo, copyright COLUS, copy, direitos, coração mobile e fotografia aprovada. Não fazer refactor oportunista nem mudança de marca durante merges.

**QA:** `npm run typecheck`, `npm run test:qa`, `npm run build`, CI browser mobile, desktop Master Plus (cenas, rings, no overlap) e scroll reverso; capturas antes/depois com revisão humana no Edge. PASS técnico ≠ aprovação estética.

**Risco prioritário:** versões documentadas em `main` são anteriores ao trabalho que vive nos PRs; não abrir novo chat exclusivamente com URLs `.../blob/main/...` e inferir que as correções desktop já estão integradas.

## 6. Próximo agente — ordem de atuação

Ler `docs/handoff/README.md`, todas as fontes cronológicas, `HANDOFF-COLUS-2026-10-19-CONTINUIDADE-E-BRANCHES.md` e `CURRENT`. Na primeira mensagem: inventário real das branches/PRs, estado do QA, pendências de aprovação estética, e proposta de integrar **sem executar merges**. Trabalhar no PR #3 enquanto aberto. Registar novo marco se o estado de merges mudar.

**Situação:** `main` + `develop` como solução final = **RECOMENDAÇÃO**; `develop` ainda não criada e nenhuma branch apagada nesta atividade.

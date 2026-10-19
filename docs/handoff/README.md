# Handoffs — EduCore / COLUS / RIGHTWARE

> **PASTA CANÓNICA DE CONTINUIDADE:** `docs/handoff/`. Preservar TODOS os marcos e as decisões. Não usar o último resumo como substituição da leitura histórica. **A landing COLUS não tem aprovação estética global nem foi integrada na main.**
>
> **Para novo chat:** abrir [PROMPT OFICIAL](NEW-CHAT-PROMPT-COLUS.md) a partir da branch `feat/colus-desktop-master-plus-fidelity` (PR #3 DRAFT) e seguir a leitura **antigo → recente**. Os arquivos de `main` estão desatualizados face a PR #2/#3, até eventual merge.

## Ordem obrigatória de leitura — TODAS as fontes históricas

1. [Legado 03/10 — Plano inicial de implementação](../handoffs/colus-implementation-handoff.md) — direção do design, assets, arquitetura conceitual e gate histórico. Ler como história.
2. [Legado 03/10 — Stack/arquiteturas V1 e árvore](../colus/handoff/HANDOFF-2026-10-03.md) — esclarece arquitetura V1; não assumir que o NEXT TASK antigo é o atual.
3. [Oficial 03/10 — Baseline produto / SaaS distribuído](HANDOFF-COLUS-2026-10-03.md) — decisões de identidade, Control/Data/Experience Planes, segurança e UX.
4. [Oficial 04/10 — Continuação de implementação](HANDOFF-COLUS-2026-10-04-CONTINUATION.md) — correções de Hero, Manifesto e aplicação React.
5. [Oficial 16/10 — Auditoria operacional](HANDOFF-COLUS-2026-10-16.md) — vídeo Ciência já normalizado em `main`, Footer, copyright, QA e riscos.
6. [Oficial 19/10 — Continuidade completa e estado de Git](HANDOFF-COLUS-2026-10-19-CONTINUIDADE-E-BRANCHES.md) — cronologia 03–19/10, implementado/aprovado/pendente e estado dos PRs/branches.
7. [Plano de duas branches permanentes — `main` + `develop`](BRANCH-STRATEGY-COLUS.md) — proposta, **NÃO** merge ou limpeza já executados.
8. [CURRENT — Handoff vivo](HANDOFF-COLUS-CURRENT.md) — **LER POR ÚLTIMO E INTEGRALMENTE**, inclusive anexos cumulativos §§18–39 e a secção 38 historicamente duplicada.

**Importante:** o prompt de `docs/colus/handoff/NEXT-CHAT-PROMPT.md` é **histórico**, não o prompt oficial atualizado. O antigo `docs/colus/presentation/HANDOFF-COLUS-2026-10-16.md` só redireciona para o handoff canónico e não deve ser duplicado/editado.

## Depois dos handoffs, estudar as fontes técnicas reais

- [Master Visual V0.18](../colus/design/landing/landing-colus-master.drawio), [Master High Fidelity Consolidation](../colus/design/landing/master-high-fidelity-consolidation-colus.md), [High Fidelity Direction](../colus/design/landing/high-fidelity-direction-colus.md).
- [Motion Spec](../colus/design/landing/motion-spec-tecnico-colus.md), [Scroll Budget](../colus/design/landing/scroll-budget-colus.md), [Asset Final Selection V0.3](../colus/design/landing/asset-final-selection-colus-v03.md).
- [Master Plus Desktop QA](../colus/presentation/qa-reports/desktop-master-plus-fidelity-2026-10-17.md), [Mobile Master Alignment QA](../colus/presentation/qa-reports/mobile-master-alignment-2026-10-17/README.md), [Science QA](../colus/presentation/qa-reports/science-orientation-2026-10-16/README.md).
- [Proteção do Hero](../colus/presentation/hero-protected-asset-lock.json), [Motion/Design findings](../colus/presentation/design-motion-qa-findings-2026-10-14.md), [Footer assets](../educore/design/footer-approved-visual-assets.md).
- **Arquiteturas V1 documentadas:** [stack](../colus/architecture/platform-stack-v1.md), [backend](../colus/architecture/backend-architecture-v1.md), [DB](../colus/architecture/database-architecture-v1.md), [segurança](../colus/architecture/security-architecture-v1.md).
- Master PLUS `landing-colus-master-plus.drawio`: foi fornecido ao trabalho como anexo e comparado visualmente; **não foi encontrado no Git versionado** em 19/10. Se necessário editar/inspecionar a geometria integral, solicitar reenvio do documento específico. Não substituir pelo V0.18 sem assinalar diferença.

## Rota de PRs (estado verificado em 19/10/2026; revalidar em Git)

```text
main                     b5b493386377 (baseline integrado)
  └─ PR #2 [DRAFT] feat/colus-mobile-editorial-storytelling
       └─ PR #3 [DRAFT] feat/colus-desktop-master-plus-fidelity
```

PR #2: https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/pull/2

PR #3: https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/pull/3

Em 19/10, PR #2 tinha 130 commits próprios à frente de `main` e PR #3 mais 58 (188 cumulativos, antes dos commits de handoff). Último run observado do PR #3: [39210062433 — SUCCESS](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39210062433). **PASS Chromium não equivale a aprovação estética.**

A futura política `main` + `develop` está recomendada e documentada, mas **`develop` ainda não foi criada**. O repositório conserva sete branches de backup e uma correção histórica Ciência já integrada. Não apagar nada sem comparar árvore, commits e tags.

## Regras permanentes de manutenção

- Não apagar nem reescrever handoffs datados; novos marcos após grandes eventos e atualização do `CURRENT` ao fim de cada ciclo. Evitar secções repetidas no futuro, mas manter historial mesmo quando a numeração tem um erro.
- Distinguir **decisão oficial**, **proposta**, **implementação em Git**, **teste realmente executado**, **aprovação visual explícita**, **pendência**. Nunca converter PASS de CI em aprovação final.
- GitHub branch/commit atuais prevalecem sobre SHAs históricos para saber o que existe em código. Decisões posteriores explícitas prevalecem sobre tarefas antigas.
- Hero, vídeo original/posters, logo, copy, direitos de imagem e media aprovados BLOQUEADOS. **O coração mobile não deve voltar a ser interpretado como livro**.
- Instituição COLUS detém o copyright: © 2026 Colégio Universo dos Sonhos. RIGHTWARE/EduCore são fornecimento/assinatura tecnológica.
- A Ciência vertical já está em `main`, não repetir o merge. Engenharia foi ajustada no mobile em sessões posteriores; avaliar histórico completo antes de tocar.
- Não começar outro repositório, refazer arquitetura ou publicar landing quando a tarefa atual é validar Master Plus e governar o fluxo dos PRs.
- Pedir o arquivo original apenas se não estiver versionado e for indispensável; ficheiros de uploads antigos podem expirar.

**Fonte única de estado vivo:** `docs/handoff/HANDOFF-COLUS-CURRENT.md` + PRs/SHAs/GitHub Actions realmente atuais.

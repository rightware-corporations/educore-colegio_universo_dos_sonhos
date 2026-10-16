# Handoffs — EduCore / COLUS

> **Pasta oficial de continuidade:** `docs/handoff/`. Conservar decisões históricas e verificar `main` para saber o que está efetivamente implementado. **A landing não está concluída.**

## Leitura obrigatória: antigo → recente

1. **[2026-10-03 — Baseline de produto e arquitetura](HANDOFF-COLUS-2026-10-03.md)** — RIGHTWARE Distributed SaaS, Java, PostgreSQL, Redis, segurança e decisões iniciais. O `NEXT TASK` dessa época não é necessariamente atual.
2. **[2026-10-04 — Continuação da implementação](HANDOFF-COLUS-2026-10-04-CONTINUATION.md)** — experiências e correções históricas em Intro/Hero, Manifesto e restantes secções.
3. **[2026-10-16 — Handoff operacional completo](HANDOFF-COLUS-2026-10-16.md)** — master, Design/Motion QA, Footer e copyright COLUS, favicon, Ciência corrigida, aprovações limitadas e backlog.
4. **[CURRENT — Estado vivo e próximos passos](HANDOFF-COLUS-CURRENT.md)** — ler por último e atualizar após cada ciclo. O código em `main` prevalece quanto à implementação.

Para iniciar uma conversa/agente: **[NEW-CHAT-PROMPT-COLUS.md](NEW-CHAT-PROMPT-COLUS.md)**. Não ler apenas este prompt sem os handoffs acima.

## Documentação e evidência complementar

- [Master Draw.io V0.18](../colus/design/landing/landing-colus-master.drawio), [Motion Spec](../colus/design/landing/motion-spec-tecnico-colus.md) e [Scroll Budget](../colus/design/landing/scroll-budget-colus.md).
- [Backlog Design/Motion QA](../colus/presentation/design-motion-qa-findings-2026-10-14.md), [provas Ciência](../colus/presentation/qa-reports/science-orientation-2026-10-16/README.md) e [proteção do Hero](../colus/presentation/hero-protected-asset-lock.json).
- [Assets institucionais do Footer](../educore/design/footer-approved-visual-assets.md).

O handoff de 16/10 foi criado inicialmente em `docs/colus/presentation/`. Esse caminho antigo contém apenas um **encaminhamento** para a versão oficial aqui. Os relatórios e capturas permanecem em `docs/colus/presentation/qa-reports/`, mas **não são handoffs**.

## Regras de manutenção

- Conservar os handoffs datados originais; criar novos marcos por data, sem reescrever a história.
- Em cada marco, atualizar também `CURRENT` e, quando necessário, este índice.
- Distinguir **implementação no Git**, **testes executados**, **aprovação visual** e **pendências**. Não converter um PASS técnico em aprovação estética.
- Proteger o Hero/vídeo/poster/máscara aprovados e o copyright da escola: © 2026 Colégio Universo dos Sonhos. EduCore/RIGHTWARE são apenas assinatura tecnológica.
- Ciência 03 desktop/Edge já aprovada e integrada em `main`; mobile e fidelidade global continuam em aberto. Não repetir o merge da branch Manus.
- Documentar divergências entre decisões anteriores e código, e pedir uma decisão explícita antes de alterar a landing.

# NEXT CHAT PROMPT — EduCore COLUS

Estamos a continuar o projeto **EduCore COLUS** no repositório:

`rightware-corporations/educore-colegio_universo_dos_sonhos`

Branch canónica:

`main`

Antes de responder, propor arquitetura nova ou alterar código, lê integralmente:

`docs/colus/handoff/HANDOFF-2026-10-03.md`

Depois lê as fontes canónicas apontadas nesse handoff, principalmente:

- `docs/colus/architecture/platform-stack-v1.md`
- `docs/colus/architecture/backend-architecture-v1.md`
- `docs/colus/architecture/database-architecture-v1.md`
- `docs/colus/architecture/security-architecture-v1.md`
- `docs/colus/design/landing/landing-colus-master.drawio`
- `docs/colus/design/landing/high-fidelity-direction-colus.md`
- `docs/colus/design/landing/motion-spec-tecnico-colus.md`
- `docs/colus/design/landing/master-high-fidelity-consolidation-colus.md`

Os assets selecionados já estão fisicamente no repo em:

`frontend/public/media/colus/landing/colus-assets-final-v03/`

**Não me peças novamente o ZIP dos assets.**

A landing está:

> **HIGH-FIDELITY V0.21 — LANDING IMPLEMENTATION READY**

Não reinventar:
- direção visual;
- sequência da landing;
- motion;
- typography/grid;
- header/anchors;
- copy aprovada;
- Footer;
- asset mapping.

A stack e as arquiteturas de backend/database/security já estão fechadas.

## Próximo trabalho

> **FULL REPOSITORY ARCHITECTURE TREE**

Quero desenhar e documentar a árvore completa do repositório antes de continuar o bootstrap/código.

A árvore deve cobrir:
- root;
- frontend React/TypeScript;
- backend Java 21/Spring Boot;
- bounded contexts e packages `api/application/domain/infrastructure`;
- database/migrations/seeds/policies/tests/ops;
- Redis/cache boundaries;
- object storage;
- infra/local/staging/production;
- docs;
- tests;
- scripts;
- CI/CD;
- security tooling;
- observability;
- Control Plane adapters;
- demo/test data;
- deployment.

Respeitar obrigatoriamente:

> **1 escola = 1 repository = 1 deployment = 1 isolated Data Plane**

e:

> **Control Plane RIGHTWARE central, separado do Data Plane COLUS.**

Antes de atualizar qualquer ficheiro existente no GitHub, obter o SHA atual.

Começa por confirmar brevemente que leste o handoff e compreendeste o estado atual. Depois avança diretamente, passo a passo, para a **FULL REPOSITORY ARCHITECTURE TREE**.
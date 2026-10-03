# HANDOFF — EduCore COLUS

> **Data:** 2026-10-03  
> **Repo:** `rightware-corporations/educore-colegio_universo_dos_sonhos`  
> **Branch de trabalho:** `main`  
> **Objetivo:** permitir continuar o projeto num novo chat sem perder contexto, decisões, estado do design, arquitetura já fechada e próximo trabalho técnico.

---

# 1. COMO USAR ESTE HANDOFF

No novo chat, a primeira ação deve ser:

1. abrir este ficheiro;
2. ler integralmente;
3. abrir os documentos obrigatórios listados abaixo;
4. confirmar o estado atual;
5. continuar exatamente a partir de **NEXT TASK**.

Não reconstruir decisões antigas de memória e não começar a programar antes de fechar a arquitetura técnica pendente.

---

# 2. CONTEXTO DO PRODUTO

EduCore é um produto RIGHTWARE para gestão escolar.

A implementação COLUS é uma experiência profundamente personalizada para:

> **COLUS — Colégio Universo dos Sonhos**

Princípio comercial usado no projeto:

```text
PESQUISA PÚBLICA
→ MODELAR
→ PERSONALIZAR
→ CONSTRUIR MVP
→ MOSTRAR
→ OBTER INTERESSE
→ VALIDAR
→ AJUSTAR
→ PROPOR
```

O MVP pode ser demonstrativo e profundamente personalizado, mas não pode fingir:
- integração real;
- dados internos reais;
- parceria aprovada;
- backend de produção quando não existe;
- testemunhos inventados.

---

# 3. ARQUITETURA DE PRODUTO JÁ DECIDIDA

## 3.1 Repo-per-school

Regra atual:

> **1 escola = 1 repositório = 1 deployment independente.**

Cada escola pode ter:
- repo;
- deployment;
- domínio;
- environment;
- secrets;
- pipeline;
- release;
- rollback.

Isso NÃO significa abandonar SaaS.

---

## 3.2 RIGHTWARE Distributed SaaS Architecture

O padrão geral é:

> **SaaS distribuído multi-instance com Control Plane central, Data Planes isolados e Experience Planes profundamente personalizados.**

### Control Plane

Pertence à RIGHTWARE.

Responsabilidades:
- organizations/schools;
- instances/deployments;
- health/heartbeat;
- versions/builds;
- module catalogue;
- entitlements;
- feature flags;
- releases;
- licensing;
- support;
- audit;
- futura fleet management.

### Data Plane

Isolado por escola.

Contém dados operacionais:
- alunos;
- encarregados;
- professores;
- presenças;
- avaliações;
- documentos;
- pagamentos;
- comunicações;
- etc.

O Control Plane NÃO deve virar a base operacional compartilhada das escolas.

### Experience Plane

Personalização profunda por escola:
- layout;
- landing;
- navegação;
- dashboards;
- copy;
- módulos;
- jornadas;
- widgets;
- workflows;
- integrações.

---

# 4. SUPER ADMIN

O Super Admin:

> **é RIGHTWARE, não é o admin da escola.**

Deve manter identidade global e consistente.

Pode existir dentro das implementações, mas utiliza o Control Plane central.

Separar claramente:
- identidade RIGHTWARE;
- identidade da escola.

Futuro esperado:
- RIGHTWARE IAM;
- MFA;
- least privilege;
- audit;
- central revocation;
- support access controlado.

---

# 5. ERP

Direção futura:

```text
EduCore
→ contratos/API
→ ERP RIGHTWARE separado
```

Lógica financeira profunda não deve ficar acoplada ao frontend escolar.

No MVP pode existir adapter demo.

---

# 6. FRONTEND / DESIGN — ESTADO ATUAL

A landing pública COLUS foi desenhada e consolidada.

Estado:

> **HIGH-FIDELITY V0.21 — LANDING IMPLEMENTATION READY**

Mas a implementação ainda deve esperar a definição técnica solicitada pelo utilizador neste ponto do projeto.

Sequência da landing:

```text
Intro Morph
→ Hero
→ Manifesto
→ Aprender em Movimento
→ Futuro & Tecnologia
→ Vida COLUS
→ Pertencer
→ Transformar
→ Depoimentos
→ Convite Final
→ Footer EduCore / RIGHTWARE
```

Motion Spec técnico também está fechado.

Stack visual já prevista:
- React;
- TypeScript;
- Vite;
- Framer Motion;
- SVG/CSS;
- IntersectionObserver;
- reduced-motion support.

---

# 7. ASSETS

Asset Gate fechado para MVP/demo privado.

Referência:
- `docs/colus/design/landing/asset-final-selection-colus-v03.md`

Decisões importantes:
- Hero tem vídeo candidato real;
- TIC coberto;
- Ciência coberta;
- Engenharia será **device-led** e não usa fotografia falsa;
- Pertencer usa comunidade/ligação humana sem identificar pessoas como pais quando isso não foi validado;
- mark pode ser derived SVG device baseado no logo raster, mas NÃO chamado de vetor oficial.

---

# 8. LANDING — DOCUMENTOS OBRIGATÓRIOS

Ler, no mínimo:

1. `docs/colus/design/landing/landing-colus-master.drawio`
2. `docs/colus/design/landing/high-fidelity-direction-colus.md`
3. `docs/colus/design/landing/master-high-fidelity-consolidation-colus.md`
4. `docs/colus/design/landing/motion-spec-tecnico-colus.md`
5. `docs/colus/design/landing/asset-final-selection-colus-v03.md`
6. `docs/colus/design/design-input-colus.md`

Não redesenhar a landing do zero.

---

# 9. ARQUITETURA — DOCUMENTOS OBRIGATÓRIOS

Ler:

1. `docs/colus/arquitetura/arquitetura-colus-v1.md`
2. `docs/colus/arquitetura/mapa-implementacao-colus.md`
3. `docs/educore/arquitetura/arquitetura-produto-deploy.md`
4. `docs/educore/arquitetura/arquitetura-saas-distribuida.md`
5. `docs/educore/arquitetura/super-admin-rightware.md`
6. `docs/rightware/frameworks/arquitetura-rightware-saas-distribuida.md`
7. `docs/rightware/frameworks/control-plane-contract.md`

Estas decisões são anteriores à arquitetura técnica detalhada do backend/database/security e devem ser preservadas.

---

# 10. ESTADO DO REPO BASE PÁSCOA

Páscoa é referência de produto/frontend, não backend de produção.

Frontend útil:
- React/Vite/TypeScript;
- role layouts;
- dashboards;
- academic components;
- auth guards;
- navigation;
- UI system.

Problemas conhecidos:
- AuthContext mock/localStorage;
- mockData estático;
- finance/attendance sem shared state real;
- backend/database placeholders.

Regra:

> **portar experiência e componentes; não copiar dívida arquitetural.**

Arquitetura desejada no COLUS:

```text
UI
→ use case / hook
→ repository contract
→ active adapter
```

MVP:

```text
Repository Contract
→ Demo Adapter / Local Store
→ Seed Data
```

Futuro:

```text
Repository Contract
→ API Adapter
→ Backend EduCore / ERP / services
```

---

# 11. NEXT TASK — ARQUITETURA TÉCNICA

Este é o ponto exato onde o novo chat deve continuar.

O utilizador NÃO quer começar pelo tree do repo ainda.

A ordem agora deve ser:

```text
STACK
→ BACKEND ARCHITECTURE
→ DATABASE ARCHITECTURE
→ SECURITY ARCHITECTURE
→ FULL REPOSITORY ARCHITECTURE TREE
→ BOOTSTRAP / IMPLEMENTATION
```

---

# 12. STACK — RESTRIÇÕES JÁ DADAS PELO UTILIZADOR

## Frontend

Já decidido:
- React;
- TypeScript;
- Vite;
- Framer Motion para landing.

## Backend

Obrigatório:

> **JAVA**

Framework Java ainda deve ser fechado formalmente.

Spring Boot é candidato natural, mas não deve ser assumido como decisão final sem consolidar arquitetura.

## Database

Obrigatório:

> **PostgreSQL**

## Cache

Obrigatório:

> **Redis**

## Segurança

O utilizador deixou explícito:

> **não basta JWT + password hashing.**

Precisamos de uma arquitetura de segurança completa.

---

# 13. BACKEND ARCHITECTURE — DIREÇÃO

O backend deve ser robusto e modular.

Não copiar literalmente uma estrutura genérica Node como:

```text
config/
controllers/
middlewares/
models/
routes/
services/
utils/
```

Essa imagem foi usada apenas como referência de preocupação com separação de responsabilidades.

Em Java devemos definir uma estrutura adequada ao domínio e à arquitetura escolhida.

A discussão deve considerar:
- modular monolith vs microservices;
- package-by-feature / bounded contexts;
- application/domain/infrastructure boundaries;
- API adapters;
- repositories;
- transactional boundaries;
- events internos;
- audit;
- integrations;
- background jobs;
- observability;
- error handling;
- validation;
- versioning;
- configuration/secrets.

Evitar microservices prematuros.

---

# 14. DATABASE ARCHITECTURE — INPUT DO UTILIZADOR

O utilizador forneceu `database_learn.zip` no chat anterior como referência importante.

Esse material cobre visualmente conceitos de:
- database sharding;
- vertical partitions;
- horizontal partitions;
- key-based sharding;
- range-based sharding;
- directory-based sharding;
- horizontal scaling;
- vertical scaling;
- request routing em ambientes shard-aware;
- primary keys;
- foreign keys;
- tables;
- indexes;
- relationships;
- SQL queries;
- normalization;
- database transactions;
- ACID properties.

Regra para o novo chat:

> **usar estes conceitos como input arquitetural, não copiar uma infographic como arquitetura pronta.**

A database deve ser tratada como parte de primeira classe da arquitetura.

Precisamos definir, antes do tree final:
- schemas/domínios;
- naming conventions;
- PK strategy;
- FK strategy;
- indexing strategy;
- unique constraints;
- check constraints;
- normalization boundaries;
- transaction boundaries;
- isolation levels quando relevante;
- optimistic/pessimistic locking quando relevante;
- audit tables;
- soft delete vs hard delete;
- temporal/history needs;
- idempotency;
- migration strategy;
- seed/demo data;
- read/write patterns;
- Redis cache boundaries;
- cache invalidation;
- outbox/event consistency se necessário;
- backups;
- PITR;
- encryption;
- DB roles;
- least privilege;
- secrets;
- connection pooling;
- observability;
- retention;
- partitioning;
- sharding only when justified by scale.

Importante:

> **não usar sharding só porque apareceu no material educativo.**

Primeiro desenhar PostgreSQL robusto e preparado para crescer.

---

# 15. SECURITY ARCHITECTURE — EXPECTATIVA

O utilizador quer segurança séria.

Deve ir além de:
- JWT;
- password hashing;
- HTTPS.

A arquitetura deve considerar pelo menos:
- authentication;
- authorization/RBAC/ABAC quando adequado;
- school identity vs RIGHTWARE identity;
- MFA para contas privilegiadas;
- short-lived access tokens;
- refresh token rotation/revocation;
- secure cookies quando aplicável;
- CSRF strategy;
- session/device tracking;
- account lockout/rate limiting;
- credential stuffing protection;
- password policy;
- secret management;
- key rotation;
- API security;
- input validation;
- output encoding;
- file upload security;
- audit log imutável/append-only quando necessário;
- encryption in transit;
- encryption at rest;
- sensitive-field protection;
- database least privilege;
- Redis security;
- service-to-service authentication;
- instance identity;
- Control Plane trust model;
- secure heartbeat/config;
- security headers;
- CSP;
- CORS;
- dependency/SBOM scanning;
- SAST/DAST;
- vulnerability management;
- backup security;
- incident response hooks;
- privacy/data minimization.

Especial atenção:

> RIGHTWARE Super Admin deve ter identidade e autorização separadas da escola.

---

# 16. O QUE É SHARED VS SCHOOL-SPECIFIC

Este ponto é fundamental e já foi discutido.

## Shared / RIGHTWARE / SaaS

Deve conter conceitos comuns e centralizados como:
- Control Plane;
- Super Admin;
- contracts;
- instance identity;
- heartbeat;
- module catalogue;
- feature flags;
- release/version model;
- common domain contracts quando fizer sentido;
- shared libraries/packages no futuro;
- observability standards;
- security standards.

## School-specific / COLUS

Deve conter:
- Experience Plane;
- school.config;
- branding;
- landing;
- school journeys;
- enabled modules;
- local integrations;
- school operational data;
- school-specific adapters/config;
- school deployment.

Não meter framework RIGHTWARE genérico dentro da pasta específica COLUS quando ele for claramente reutilizável.

---

# 17. CONTROL PLANE VS SCHOOL DATA

Regra não negociável:

> **dados operacionais da escola ficam no Data Plane isolado.**

Control Plane recebe apenas metadata necessária:
- instance_id;
- organization_id;
- environment;
- version/build;
- health;
- timestamp;
- modules/config version;
- licensing/status.

Não enviar alunos/pagamentos/notas/presenças para o Control Plane apenas para alimentar Super Admin.

---

# 18. FULL REPOSITORY TREE — SÓ DEPOIS

Depois de fechar:

1. stack;
2. backend architecture;
3. database architecture;
4. security architecture;

aí sim construir a árvore completa do repo.

A árvore deve cobrir:
- root;
- frontend;
- backend Java;
- database;
- infrastructure;
- docs;
- scripts;
- tests;
- CI/CD;
- observability;
- security tooling;
- migrations;
- local/dev;
- deployment;
- shared contracts;
- COLUS-specific experience.

Não gerar tree definitivo antes das decisões anteriores.

---

# 19. ESTADO DE IMPLEMENTAÇÃO

Apesar da landing estar `IMPLEMENTATION READY` do ponto de vista de design:

> **NÃO COMEÇAR CÓDIGO AGORA.**

O utilizador abriu explicitamente um gate técnico adicional:

> **Stack + Backend + Database + Security + Full Tree**

Esse gate deve ser fechado primeiro.

---

# 20. ESTILO DE TRABALHO COM O UTILIZADOR

Trabalhar passo a passo.

Não saltar diretamente para código.

Quando criar/alterar docs no repo:
- primeiro fetch do SHA atual;
- depois update;
- manter commits pequenos e semanticamente claros.

O utilizador prefere decisões concretas e arquiteturais antes de implementação.

---

# 21. FIRST ACTION NO NOVO CHAT

Depois de ler este handoff e os docs obrigatórios:

1. resumir em poucas linhas o estado atual;
2. declarar que o próximo trabalho é arquitetura técnica;
3. começar por **STACK V1**;
4. não desenhar ainda a árvore final;
5. depois seguir Backend → Database → Security → Tree.

---

# 22. REFERÊNCIA DO INPUT DE DATABASE DO CHAT ANTERIOR

O ficheiro original chamava-se:

> `database_learn.zip`

Ele não está versionado no repo neste momento.

Os conceitos relevantes foram capturados neste handoff.

Se for necessário analisar detalhes visuais específicos novamente, pedir ao utilizador para reanexar o ZIP no novo chat.

Para continuar a arquitetura normal, não é necessário reabrir o ZIP.

---

# 23. ESTADO FINAL DO HANDOFF

> **CONTEXTO SUFICIENTE PARA NOVO CHAT**

NEXT TASK:

> **STACK V1 → BACKEND ARCHITECTURE → DATABASE ARCHITECTURE → SECURITY ARCHITECTURE → FULL REPOSITORY TREE**
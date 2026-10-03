# EduCore COLUS — Platform Stack V1

> **Data:** 2026-10-03  
> **Estado:** ARQUITETURA TÉCNICA BASE — PRÉ-IMPLEMENTAÇÃO  
> **Objetivo:** fechar a stack e os limites arquiteturais antes de desenhar a árvore completa do repositório.

---

## 1. Princípio

O COLUS não será construído como um frontend bonito com um backend genérico atrás.

A implementação deve respeitar três planos já definidos:

```text
CONTROL PLANE — RIGHTWARE central
        │
        │ contratos / heartbeat / configuração / versões
        ▼
DATA PLANE — COLUS isolado
        │
        ├── PostgreSQL dedicado
        ├── Redis dedicado
        ├── Object Storage
        └── Backend COLUS
        │
        ▼
EXPERIENCE PLANE — COLUS
        └── React / TypeScript profundamente personalizado
```

Regra:

> **1 escola = 1 repositório = 1 deployment = 1 Data Plane isolado.**

O Control Plane não recebe dados operacionais dos alunos, encarregados, notas, pagamentos ou presenças.

---

# 2. Frontend

## Base

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Framer Motion
- Radix / shadcn
- Lucide
- Zod para validação de contratos no boundary quando necessário

## Estado

- **server state** → TanStack Query;
- **estado local/UI** → React state;
- store global só quando existir uma necessidade transversal real;
- não introduzir Redux por defeito.

## Arquitetura

```text
UI
→ feature hook / use case
→ repository contract
→ active adapter
```

A UI não conhece diretamente:
- fetch URLs;
- PostgreSQL;
- Redis;
- DTOs de persistência;
- estrutura interna do Control Plane.

---

# 3. Backend

## Base

- **Java 21 LTS**
- **Spring Boot**
- Spring Web
- Spring Security
- Spring Validation
- Spring Data JPA / Hibernate
- Spring Actuator
- Maven
- OpenAPI
- Flyway através de migration job separado
- HikariCP

A versão exata de Spring Boot e dependências deve ser pinada no bootstrap do projeto e atualizada por processo controlado.

---

# 4. Estilo arquitetural do backend

Decisão:

> **MODULAR MONOLITH + HEXAGONAL BOUNDARIES**

Não começar com microservices.

Razões:
- mantém transações locais fortes;
- reduz complexidade operacional;
- permite demo/MVP rápido;
- continua preparado para extrair serviços no futuro;
- combina com o Data Plane isolado por escola.

Cada módulo segue:

```text
api
→ application
→ domain
← infrastructure
```

O domínio não depende de Spring MVC, JPA ou Redis.

---

# 5. Módulos de domínio previstos

```text
identity
people
academic
admissions
finance
communication
governance
integration
```

### identity
Mapeamento local de utilizadores, papéis, permissões e identidade externa.

### people
Aluno, encarregado, professor, relações familiares/escolares.

### academic
Turmas, disciplinas, presenças, avaliações, resultados.

### admissions
Candidaturas, matrícula, documentos e onboarding escolar.

### finance
Boundary financeiro do EduCore.

No MVP pode existir implementação local/demo.

Produção futura:

```text
EduCore
→ Finance Port
→ ERP RIGHTWARE API
```

### communication
Notificações, avisos, calendário e comunicação.

### governance
Audit, segurança operacional, trilhos de ação, consentimentos quando aplicável.

### integration
Control Plane, ERP, object storage e integrações externas.

---

# 6. Persistência

## PostgreSQL

> **PostgreSQL dedicado por escola / Data Plane.**

Não usar:
- uma base operacional única para todas as escolas;
- schema tenancy como isolamento principal;
- `tenant_id` como substituto de isolamento real.

O Control Plane tem a sua própria base central.

## Redis

> **Redis dedicado por escola/deployment.**

Uso:
- cache;
- rate-limit counters;
- sessão distribuída quando aplicável;
- idempotency;
- locks curtos e controlados.

Redis nunca é a fonte de verdade.

## Object Storage

S3-compatible para:
- documentos;
- anexos;
- media privada;
- exports.

Não guardar ficheiros grandes diretamente no PostgreSQL.

---

# 7. Integração assíncrona

No MVP:

> **Transactional Outbox + worker**

Não introduzir Kafka/RabbitMQ sem necessidade medida.

Exemplo:

```text
PaymentValidated
→ commit PostgreSQL
→ outbox_event
→ worker
→ notification
→ projection update
→ Control Plane metadata only when applicable
```

Se a plataforma crescer, o dispatcher pode ser substituído por broker sem alterar o domínio.

---

# 8. Control Plane

Separado do Data Plane.

O backend COLUS apenas conhece contratos como:

- bootstrap;
- heartbeat;
- config;
- module entitlements;
- feature flags;
- version/build metadata.

Nunca envia:
- notas;
- pagamentos;
- presença;
- documentos;
- dados pessoais dos educandos.

---

# 9. Observabilidade

Backend deve nascer com:

- structured JSON logs;
- correlation/request ID;
- OpenTelemetry;
- Micrometer metrics;
- health/readiness/liveness;
- audit events separados de logs técnicos.

Actuator administrativo nunca deve ser exposto publicamente sem proteção.

---

# 10. Testes

- JUnit 5
- Testcontainers
- Spring Security Test
- ArchUnit
- integration tests com PostgreSQL real em container
- integration tests com Redis real em container
- contract tests para Control Plane / ERP adapters

Não usar H2 como substituto principal do PostgreSQL em testes de persistência.

---

# 11. Infra local

Local development:

```text
docker compose
├── postgres
├── redis
├── object-storage
├── backend
└── frontend
```

Produção mantém serviços independentes e secrets fora do repositório.

---

# 12. Decisão V1

```text
Frontend
React + TypeScript + Vite

Backend
Java 21 LTS + Spring Boot
Modular Monolith / Hexagonal

Database
PostgreSQL dedicated per school

Cache
Redis dedicated per school

Files
S3-compatible Object Storage

DB evolution
Flyway migration job

Async
Transactional Outbox

Security
Spring Security + OIDC/BFF + defense in depth

Observability
OpenTelemetry + structured logs + metrics
```

Próximo documento:

> **BACKEND ARCHITECTURE V1 + DATABASE ARCHITECTURE V1 + SECURITY ARCHITECTURE V1**

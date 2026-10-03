# EduCore COLUS — Backend Architecture V1

> **Data:** 2026-10-03  
> **Estado:** BASE ARQUITETURAL  
> **Stack:** Java 21 LTS + Spring Boot

---

## 1. Decisão

A referência visual enviada com pastas como `config`, `controllers`, `middlewares`, `models`, `routes`, `services` e `tests` contém responsabilidades corretas.

Para EduCore não vamos copiá-la literalmente.

Uma árvore global do tipo:

```text
controllers/
services/
models/
routes/
```

fica difícil de manter quando o domínio cresce.

A adaptação correta é:

> **organizar primeiro por bounded context / módulo; dentro de cada módulo, separar api, application, domain e infrastructure.**

---

# 2. Fluxo de dependências

```text
HTTP
 ↓
api
 ↓
application
 ↓
domain
 ↑
infrastructure adapters
```

Regras:

- `domain` não conhece HTTP;
- `domain` não conhece JPA;
- `domain` não conhece Redis;
- `api` não chama repository JPA diretamente;
- controllers não implementam regra de negócio;
- repositories concretos ficam em infrastructure;
- DTO REST não é entity JPA;
- entity JPA não sai pela API.

---

# 3. Estrutura interna de um módulo

Exemplo:

```text
academic/
├── api/
│   ├── rest/
│   ├── request/
│   ├── response/
│   └── mapper/
├── application/
│   ├── command/
│   ├── query/
│   ├── usecase/
│   └── port/
├── domain/
│   ├── model/
│   ├── valueobject/
│   ├── service/
│   ├── event/
│   └── repository/
└── infrastructure/
    ├── persistence/
    ├── cache/
    ├── messaging/
    └── adapter/
```

---

# 4. Shared kernel

O shared kernel deve ser pequeno.

Permitido:

```text
shared/
├── security/
├── observability/
├── validation/
├── time/
├── id/
├── errors/
├── events/
└── persistence/
```

Proibido:

> transformar `shared/` numa pasta para qualquer código que não sabemos onde colocar.

---

# 5. Transações

A fronteira transacional está no **application use case**.

Exemplo:

```text
validatePayment()
  ├── load payment
  ├── verify authorization
  ├── update payment
  ├── update local projection
  ├── append audit event
  └── append outbox event
COMMIT
```

Depois do commit:

```text
outbox worker
→ notification
→ external adapters
```

---

# 6. Consequências cross-role

Não depender de component state.

Exemplo:

```text
AttendanceRecorded
→ persistence
→ audit
→ notification
→ risk projection
```

```text
PaymentValidated
→ balance projection
→ receipt
→ guardian notification
→ executive metric
→ audit
```

Para o MVP isto pode continuar dentro do modular monolith.

---

# 7. API

Padrão:

- REST JSON;
- versionamento em `/api/v1`;
- OpenAPI;
- pagination consistente;
- error envelope consistente;
- idempotency key em comandos sensíveis;
- request validation;
- correlation ID.

Não expor stack traces ao cliente.

---

# 8. Configuração

Config tipada e separada por ambiente.

```text
application.yml
application-local.yml
application-test.yml
```

Production secrets não entram nesses ficheiros.

Secrets vêm de:
- secret manager;
- platform secret store;
- environment references.

---

# 9. Cache

Cache não pertence aos controllers.

Fluxo:

```text
application query
→ cache port
→ Redis adapter
→ repository fallback
```

Invalidation acontece após writes confirmados.

Nunca cachear dados sensíveis sem política explícita.

---

# 10. Jobs

Jobs previstos:

- outbox dispatcher;
- notification delivery;
- cleanup TTL;
- projection refresh;
- heartbeat do instance agent quando não for feito por outro componente.

Jobs são idempotentes.

---

# 11. Integrações

Interfaces:

```text
ControlPlanePort
FinancePort
ObjectStoragePort
NotificationPort
IdentityProviderPort
```

Adapters:

```text
ControlPlaneHttpAdapter
DemoFinanceAdapter
ErpFinanceApiAdapter
S3ObjectStorageAdapter
RightwareIdentityAdapter
```

---

# 12. Regra para futuro split em services

Um módulo só vira serviço separado quando houver razão operacional concreta, por exemplo:

- escala independente;
- deploy independente;
- requisitos de segurança diferentes;
- equipa diferente;
- necessidade de disponibilidade distinta.

Não dividir apenas porque “microservices parecem enterprise”.

---

# 13. Gate

Backend V1 aprovado quando:

- bounded contexts definidos;
- dependências obedecem api → application → domain;
- JPA/Redis ficam em infrastructure;
- cross-role state passa pelo domínio;
- Control Plane e ERP entram por ports;
- transactional outbox existe desde o início;
- security architecture é aplicada transversalmente.

Próximo:

> **DATABASE ARCHITECTURE V1**

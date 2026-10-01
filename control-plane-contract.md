# Control Plane Contract — RIGHTWARE Distributed SaaS

> **Estado:** ARQUITETURA V1  
> **Data:** 2026-10-01  
> **Escopo:** contrato entre Super Admin RIGHTWARE, Control Plane central e instâncias distribuídas dos produtos RIGHTWARE.
>
> Este documento é genérico e reutilizável. O EduCore/COLUS será a primeira aplicação concreta.

---

## 1. Objetivo

Definir como uma instância cliente comunica com o Control Plane central da RIGHTWARE sem partilhar a sua base operacional.

O contrato deve permitir:

- registar uma instância;
- autenticar uma instância;
- sincronizar configuração;
- reportar heartbeat;
- reportar versão/build;
- reportar health;
- reportar módulos habilitados;
- receber feature flags;
- receber estado/licença;
- auditar operações administrativas;
- suportar futuras ações remotas autorizadas.

---

# 2. Modelo de confiança

Cada deployment possui uma identidade própria.

Exemplo:

```text
instance_id = inst_colus_prod_001
organization_id = org_colus
product = educore
environment = production
```

A instância não se autentica com credenciais de utilizadores da escola.

Deve usar credenciais próprias de serviço.

### V1 conceptual

- `instance_id`
- `instance_secret` ou chave assimétrica
- rotação futura

### Futuro recomendado

- identidade de workload;
- assinatura assimétrica;
- mTLS ou mecanismo equivalente;
- rotação central;
- revogação instantânea.

---

# 3. Registo da instância

A criação de uma nova escola/produto deve resultar num registo central.

### Entidade

```json
{
  "instance_id": "inst_colus_prod_001",
  "organization_id": "org_colus",
  "product": "educore",
  "environment": "production",
  "repository": "rightware-corporations/educore-colegio_universo_dos_sonhos",
  "deployment_provider": "railway",
  "custom_domain": null,
  "status": "provisioning"
}
```

### Regra

O repositório e o deployment podem ser separados por cliente, mas a identidade da instância nasce no Control Plane.

---

# 4. Bootstrap

No primeiro arranque:

```text
Instance
  ↓
POST /v1/instances/bootstrap
  ↓
Control Plane
  ↓
config snapshot + module entitlements + feature flags + heartbeat policy
```

### Resposta conceptual

```json
{
  "instance_id": "inst_colus_prod_001",
  "organization": {
    "id": "org_colus",
    "display_name": "COLUS"
  },
  "status": "active",
  "modules": [
    "academic",
    "attendance",
    "communication"
  ],
  "feature_flags": {
    "guardian_portal": true,
    "finance_demo": true
  },
  "heartbeat": {
    "interval_seconds": 60
  },
  "config_version": 7
}
```

---

# 5. Heartbeat

## Endpoint

`POST /v1/instances/{instance_id}/heartbeat`

### Payload

```json
{
  "timestamp": "2026-10-01T08:15:00+02:00",
  "environment": "production",
  "version": "0.1.0",
  "build_sha": "abc123",
  "health": "healthy",
  "uptime_seconds": 18420,
  "config_version": 7,
  "modules_version": 3
}
```

### Não enviar

- alunos;
- professores;
- notas;
- documentos;
- pagamentos;
- dados pessoais;
- logs sensíveis;
- conteúdo operacional da escola.

---

# 6. Estado calculado pelo Control Plane

O estado visível no Super Admin deve ser calculado centralmente.

Exemplo inicial:

### ACTIVE
heartbeat dentro da janela esperada e health saudável.

### DEGRADED
heartbeat recente, mas health parcial ou warnings.

### OFFLINE
heartbeat expirado.

### OUTDATED
versão abaixo da policy definida.

### MAINTENANCE
estado explicitamente definido pela RIGHTWARE.

### SUSPENDED
instância administrativamente suspensa.

Os thresholds exatos devem ser configuração do Control Plane, não hard-coded em cada aplicação.

---

# 7. Config Sync

A instância deve consultar alterações de configuração.

## Endpoint

`GET /v1/instances/{instance_id}/config`

Pode devolver:

- status;
- module entitlements;
- feature flags;
- release policy;
- integration metadata;
- branding metadata que seja realmente central;
- support settings.

### Cache

A instância deve guardar o último snapshot válido.

Se o Control Plane ficar temporariamente indisponível:

- aplicação continua com último snapshot;
- marca estado de sync como stale;
- repete a tentativa;
- não bloqueia o Data Plane sem razão crítica.

---

# 8. Config Versioning

Toda configuração central deve possuir versão.

Exemplo:

```json
{
  "config_version": 8,
  "updated_at": "2026-10-01T08:20:00+02:00"
}
```

A instância reporta no heartbeat a versão aplicada.

O Super Admin consegue ver:

```text
Desired config: 8
Applied config: 7
Status: pending sync
```

---

# 9. Módulos

O Control Plane mantém catálogo global.

Exemplo:

```text
academic
attendance
guardian
communication
finance
reporting
automation
knowledge
```

Cada organização possui entitlement próprio.

### Importante

Ter um módulo habilitado centralmente significa:

> a instância está autorizada a oferecer aquela capacidade.

Não significa:

> todas as escolas devem apresentar o módulo da mesma maneira.

A Experience Plane continua livre para organizar a UX de forma distinta.

---

# 10. Feature Flags

Feature flags podem existir em três escopos:

### Global
para todas as instâncias de um produto.

### Organização
para um cliente específico.

### Instância/ambiente
para produção, staging ou demo.

Precedência recomendada:

```text
instance override
> organization override
> product/global default
```

---

# 11. Releases

Cada deployment reporta:

- version;
- build SHA;
- deployed_at;
- release channel.

O Control Plane mantém:

- latest stable;
- minimum supported;
- recommended version;
- compatibility notes.

### Super Admin

Deve poder mostrar:

- atualizado;
- atualização disponível;
- abaixo do mínimo;
- rollout pendente.

---

# 12. Health

Health não deve ser apenas "site respondeu 200".

Pode incluir:

- frontend reachable;
- backend reachable;
- data adapter;
- ERP connector;
- notification provider;
- storage;
- scheduled jobs.

### Payload resumido

```json
{
  "health": "degraded",
  "checks": {
    "app": "ok",
    "api": "ok",
    "erp_connector": "warning",
    "notifications": "ok"
  }
}
```

Nunca incluir segredos ou payloads operacionais.

---

# 13. Super Admin API

O Super Admin RIGHTWARE deve consumir apenas o Control Plane.

Principais endpoints conceptuais:

```text
GET  /v1/organizations
GET  /v1/organizations/{id}
GET  /v1/instances
GET  /v1/instances/{id}
GET  /v1/instances/{id}/health
GET  /v1/instances/{id}/heartbeats
GET  /v1/instances/{id}/config

PATCH /v1/organizations/{id}/modules
PATCH /v1/organizations/{id}/feature-flags
PATCH /v1/instances/{id}/status

GET  /v1/releases
GET  /v1/audit
```

A API real será especificada posteriormente.

---

# 14. Operações remotas

Não implementar na primeira versão, mas reservar arquitetura.

Futuras ações possíveis:

- request config refresh;
- request health check;
- request cache clear;
- request demo reset;
- request maintenance mode;
- request upgrade.

### Regra de segurança

Ação remota:

- autenticada;
- autorizada;
- auditada;
- limitada;
- sem shell arbitrário;
- sem execução genérica de comandos.

---

# 15. Auditoria

Toda ação administrativa sensível deve gerar evento.

Exemplos:

- módulo ativado;
- feature flag alterada;
- instância suspensa;
- configuração atualizada;
- acesso de suporte iniciado;
- release policy alterada.

Campos mínimos:

- actor;
- action;
- target;
- timestamp;
- reason;
- previous value;
- new value.

---

# 16. Support Access

O Control Plane deve permitir no futuro suporte autorizado.

Não significa que a RIGHTWARE deve ter acesso irrestrito aos dados operacionais.

Modelo recomendado:

```text
support request
→ authorization
→ time-bound access
→ scoped permissions
→ full audit
→ automatic expiry
```

---

# 17. Separação de bases de dados

## Control Plane DB
Global RIGHTWARE.

Guarda:
- organizações;
- instâncias;
- health;
- versões;
- módulos;
- flags;
- licensing;
- suporte;
- auditoria.

## Customer Data Plane
Isolado.

Guarda:
- dados operacionais;
- dados específicos do cliente;
- dados pessoais;
- transações de negócio.

### Regra

> **O Super Admin global deve operar sem precisar de ler a base operacional do cliente.**

---

# 18. Aplicação ao COLUS

O COLUS terá futuramente:

```text
COLUS instance
  ↓ heartbeat/config sync
RIGHTWARE Control Plane
  ↓
Super Admin global
```

Ao mesmo tempo:

```text
COLUS portal
  ↓
COLUS Data Plane
```

As duas relações são independentes.

---

# 19. Gate

Este contrato define a direção arquitetural.

Ainda faltam antes da implementação do COLUS:

- tecnologia concreta do Control Plane;
- estratégia de autenticação entre instância e Control Plane;
- storage/DB central;
- hosting do Control Plane;
- política de heartbeat inicial;
- primeira versão do Super Admin que realmente precisa ser implementada no MVP;
- definição de módulos P0 COLUS.

Não iniciar backend do Control Plane ainda sem fechar estas decisões.

# EduCore COLUS — Security Architecture V1

> **Data:** 2026-10-03  
> **Estado:** SECURITY BASELINE — DEFENSE IN DEPTH

---

## 1. Princípio

JWT não é a arquitetura de segurança.

Password hash também não é a arquitetura de segurança.

A segurança deve existir em camadas:

```text
EDGE
→ IDENTITY
→ SESSION
→ AUTHORIZATION
→ API
→ APPLICATION
→ DATABASE
→ CACHE
→ FILES
→ AUDIT
→ OBSERVABILITY
→ BACKUP / RECOVERY
→ SUPPLY CHAIN
```

---

# 2. Browser authentication

Produção recomendada:

> **OIDC / OAuth2 Authorization Code + PKCE + BFF/session pattern**

Para browser:

- React não guarda refresh token em localStorage;
- backend/BFF mantém tokens do IdP;
- browser recebe session cookie;
- cookie `HttpOnly`;
- `Secure`;
- `SameSite` apropriado;
- rotação/expiração;
- revogação.

JWT pode existir entre componentes, mas não é a única defesa.

---

# 3. MVP/demo authentication

Pode existir:

> `DemoIdentityAdapter`

com utilizadores seed.

Regra:

- claramente demo;
- não reutilizar secrets reais;
- não promover mock auth para produção.

Interface final continua:

> `IdentityProviderPort`

---

# 4. Privileged access

Para:
- RIGHTWARE Super Admin;
- direção;
- finanças;
- suporte privilegiado.

Produção:

- MFA;
- session controls;
- step-up auth para operações críticas quando aplicável;
- audit obrigatório;
- least privilege.

---

# 5. Authorization

Modelo:

> **RBAC + contextual ABAC**

RBAC:
- guardian;
- teacher;
- pedagogy;
- executive;
- secretary;
- finance;
- student.

ABAC/context:
- professor só para turmas atribuídas;
- encarregado só para educandos ligados;
- finance só para operações autorizadas;
- suporte RIGHTWARE com access scope explícito.

Nunca confiar em esconder menu.

Authorization ocorre no backend.

---

# 6. CSRF / CORS

Se sessão por cookie:

- CSRF protection ativa;
- tokens/headers conforme framework;
- SameSite não substitui completamente CSRF strategy.

CORS:
- allowlist explícita;
- sem `*` com credenciais;
- origins por ambiente.

---

# 7. Security headers

Edge/backend:

- HSTS;
- CSP;
- X-Content-Type-Options;
- Referrer-Policy;
- frame-ancestors;
- Permissions-Policy conforme necessidade.

Landing pública e portal podem ter CSPs diferentes.

---

# 8. Rate limiting

Redis-backed.

Aplicar por:
- IP;
- session/user;
- endpoint;
- credential/client.

Mais forte em:
- login;
- password reset;
- OTP/MFA;
- public forms;
- upload;
- expensive searches.

Rate limit não substitui WAF.

---

# 9. Input / output

- Bean Validation;
- size limits;
- allowlists;
- canonicalization onde necessário;
- prepared DB queries;
- output encoding;
- file type validation.

Nunca confiar no frontend.

---

# 10. File upload security

Pipeline:

```text
request
→ size/type checks
→ quarantine
→ malware scan
→ metadata strip quando aplicável
→ object storage
→ signed access
```

Não servir uploads diretamente como trusted HTML.

---

# 11. Secrets

Nunca no Git.

Usar:
- secret manager;
- platform secret store;
- short-lived credentials quando possível.

Rotação:
- DB;
- Redis;
- object storage;
- service credentials.

---

# 12. Database defense

- private network;
- TLS;
- encryption at rest;
- encrypted backups;
- separate DB roles;
- no superuser in app;
- field-level envelope encryption para PII selecionada;
- audit append-only.

---

# 13. Redis defense

- rede privada;
- TLS/ACL quando disponível;
- dedicated instance;
- TTL;
- sem dados permanentes;
- sem secrets em cache;
- evitar PII em plain text quando não necessário.

---

# 14. Service-to-service

Control Plane / ERP:

- TLS;
- service identity;
- audience/scope;
- short-lived credentials;
- request signing/mTLS avaliados para boundaries de alto risco;
- retries idempotentes.

Heartbeat não transporta dados operacionais.

---

# 15. Audit

Eventos críticos:

- login/logout;
- auth failure relevante;
- role/permission change;
- grade publish/change;
- attendance changes;
- payment validation;
- document access sensível;
- export;
- privileged support action;
- configuration changes.

Audit não pode conter password/token/secrets.

---

# 16. Logging

Structured logs.

Redaction:
- authorization header;
- cookies;
- tokens;
- passwords;
- full payment data;
- PII desnecessária.

Correlation ID em cada request.

---

# 17. Supply chain

Pipeline deve incluir:

- dependency scanning;
- secret scanning;
- SAST;
- container scan;
- SBOM;
- lock/pin de dependências;
- protected branch;
- reviews;
- signed/provenance artifacts quando a infra permitir.

---

# 18. Environment separation

```text
local
test
staging
production
```

Nunca:
- production DB em testes;
- production secrets em preview;
- demo accounts em produção.

---

# 19. Backups são segurança

Backup precisa de:
- encryption;
- access control;
- retention;
- immutable/offline strategy quando aplicável;
- restore test.

Backup que nunca foi restaurado não é recuperação comprovada.

---

# 20. Security testing

- unit authorization tests;
- integration auth tests;
- IDOR/BOLA tests;
- Testcontainers;
- dependency/security scans;
- negative API tests;
- file upload abuse tests;
- rate limit tests;
- privilege escalation tests.

Antes de produção:
- threat model;
- security review;
- penetration test proporcional ao risco.

---

# 21. Super Admin RIGHTWARE

Super Admin não é “role escolar extra”.

É identidade RIGHTWARE.

Regras:
- IAM separado;
- MFA;
- audit;
- least privilege;
- revogação central;
- suporte time-bound quando houver acesso a Data Plane;
- Control Plane como source of truth.

---

# 22. Security gate

Security V1 passa se:

- JWT não é tratado como defesa única;
- browser não guarda refresh tokens em localStorage;
- MFA existe para privileged roles em produção;
- authorization é backend-side;
- DB/Redis não são públicos;
- secrets estão fora do repo;
- encryption in transit/at rest;
- backups cifrados;
- uploads têm quarantine/scan;
- audit é append-only;
- logs fazem redaction;
- CI verifica dependências/secrets/images.

Próximo passo:

> **ORGANIZAR A ÁRVORE COMPLETA DO REPOSITÓRIO**

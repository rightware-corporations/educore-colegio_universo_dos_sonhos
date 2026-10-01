# Arquitetura RIGHTWARE — SaaS Distribuído Multi-Instance

> **Framework arquitetural reutilizável da RIGHTWARE**
>
> **Estado:** PADRÃO ARQUITETURAL V1  
> **Data:** 2026-10-01  
> **Aplicação:** produtos RIGHTWARE que exigem controlo central, isolamento operacional por cliente e personalização profunda.
>
> Este documento é deliberadamente genérico. Não pertence apenas ao EduCore.

---

## 1. Definição

A RIGHTWARE adota, quando adequado, um modelo de:

> **SaaS distribuído multi-instance com Control Plane central, Data Planes isolados e Experience Planes profundamente personalizados.**

O objetivo é combinar:

- controlo central;
- visão global;
- operação SaaS;
- isolamento por cliente;
- deployments independentes;
- personalização profunda;
- módulos variáveis;
- evolução comum da plataforma.

---

## 2. Os três planos

### 2.1 Control Plane

Pertence à RIGHTWARE.

É o cérebro operacional da plataforma.

Responsável por:

- catálogo de clientes/organizações;
- instâncias;
- estado dos deployments;
- módulos;
- feature flags;
- versões;
- releases;
- heartbeat;
- health;
- licenças;
- suporte;
- auditoria;
- observabilidade;
- integrações;
- lifecycle da instância.

O Control Plane utiliza uma **base de dados central RIGHTWARE**.

---

### 2.2 Data Plane

Pertence à operação de cada cliente.

Contém dados específicos da organização.

Exemplos:

- utilizadores;
- transações;
- documentos;
- registos operacionais;
- dados académicos;
- dados financeiros;
- workflows;
- atividade do cliente.

### Regra principal

> **Data Planes de clientes diferentes não devem ser misturados apenas para simplificar a arquitetura SaaS.**

Cada cliente deve permanecer isolado segundo as necessidades do produto.

---

### 2.3 Experience Plane

É a camada que o cliente vê e utiliza.

Pode variar profundamente entre clientes.

Inclui:

- identidade visual;
- layout;
- navegação;
- páginas;
- dashboards;
- copy;
- módulos expostos;
- jornadas;
- fluxos;
- widgets;
- integrações;
- features específicas;
- experiência pública;
- experiência autenticada.

### Princípio

> **Dois clientes podem usar a mesma plataforma RIGHTWARE sem parecer que receberam cópias do mesmo sistema.**

---

## 3. Arquitetura conceptual

```text
                    RIGHTWARE CONTROL PLANE
┌──────────────────────────────────────────────────────────────┐
│ Central API                                                  │
│ Central Database                                             │
│ Instance Registry                                            │
│ Module Catalogue                                             │
│ Feature Flags                                                │
│ Release Registry                                             │
│ Heartbeat / Health                                           │
│ Observability                                                │
│ Licensing / Support / Audit                                  │
└─────────────────────────────┬────────────────────────────────┘
                              │
              ┌───────────────┼────────────────┐
              │               │                │
              ▼               ▼                ▼
          CLIENTE A       CLIENTE B        CLIENTE C
          repo próprio    repo próprio     repo próprio
          deploy próprio  deploy próprio   deploy próprio
          experience A    experience B     experience C
          data plane A    data plane B     data plane C
```

---

## 4. Princípio de isolamento

Cada cliente pode ter:

- repositório próprio;
- deployment próprio;
- domínio próprio;
- secrets próprios;
- environment próprio;
- pipeline próprio;
- logs próprios;
- rollback próprio;
- Data Plane próprio.

Uma falha num cliente não deve obrigatoriamente afetar os restantes.

---

## 5. O que é partilhado

A independência operacional não elimina o produto comum.

Podem ser partilhados:

- design system;
- contratos de domínio;
- bibliotecas;
- packages;
- SDKs;
- autenticação contracts;
- observability SDK;
- Control Plane SDK;
- componentes;
- regras comuns;
- módulos reutilizáveis;
- integração API;
- tooling;
- CI templates;
- bootstrap de novos projetos.

---

## 6. Personalização profunda

A personalização não deve ser reduzida a:

- logotipo;
- cores;
- nome.

Pode alterar:

- estrutura de informação;
- ordem dos módulos;
- journeys;
- páginas;
- dashboards;
- permissões;
- widgets;
- fluxos;
- integrações;
- copy;
- identidade;
- experiência pública;
- experiência móvel;
- canais.

### Regra

> **Personalização profunda deve ser possível sem destruir a capacidade de evolução comum do produto.**

---

## 7. Control Plane Database

Entidades mínimas genéricas:

### organizations
- id
- legal_name
- display_name
- status
- country
- created_at
- activated_at

### instances
- id
- organization_id
- environment
- repository
- provider
- deployment_url
- custom_domain
- release_version
- build_sha
- status
- last_seen_at

### module_catalog
- id
- key
- name
- version
- description

### organization_modules
- organization_id
- module_id
- enabled
- config_version
- updated_at

### feature_flags
- key
- scope
- default_value

### organization_feature_flags
- organization_id
- feature_key
- value

### instance_heartbeats
- instance_id
- timestamp
- health
- latency
- version
- metadata

### releases
- version
- build_sha
- released_at
- compatibility
- notes

### support_audit
- actor
- organization_id
- action
- reason
- timestamp
- metadata

### Futuro
- subscriptions
- billing
- incidents
- support tickets
- integration registry
- licence assignments
- rollout channels

---

## 8. Heartbeat

Cada instância deve comunicar periodicamente com o Control Plane.

Payload mínimo:

- instance_id;
- organization_id;
- environment;
- version;
- build_sha;
- health;
- timestamp;
- modules/config version.

### O heartbeat pode permitir classificar

- ACTIVE;
- DEGRADED;
- OFFLINE;
- OUTDATED;
- MAINTENANCE.

### Regra de privacidade

Heartbeat não deve carregar dados operacionais sensíveis do cliente.

---

## 9. Super Admin RIGHTWARE

O Super Admin é uma superfície proprietária da RIGHTWARE.

Deve consumir:

> **a mesma Control Plane API e a mesma base central**

independentemente de onde a consola é aberta.

Pode existir:

- incorporado em cada deployment;
- como package partilhado;
- como portal central dedicado;
- ou numa combinação destes modelos.

### Deve permitir ver

- número de clientes;
- clientes ativos;
- degradados/offline;
- versões;
- módulos;
- health;
- deployments;
- integrações;
- licenças;
- incidentes;
- estado de atualização;
- auditoria de suporte.

---

## 10. Global vs local

### Global RIGHTWARE
- módulos disponíveis;
- políticas de compatibilidade;
- releases;
- feature flags globais;
- licensing;
- observability;
- suporte.

### Local da organização
- identidade;
- composição;
- experiência;
- módulos ativos;
- configuração operacional;
- integrações;
- conteúdo;
- journeys.

### Profundamente local
- páginas exclusivas;
- extensões;
- workflows;
- integrações especiais;
- experiência diferenciada.

---

## 11. Offline tolerance do Control Plane

Uma instância não deve parar completamente apenas porque o Control Plane está temporariamente indisponível.

Recomendação:

- cache local de configuração essencial;
- último estado conhecido;
- retry/backoff;
- sincronização posterior;
- health diferenciado.

### Princípio

> **Control Plane controla; Data Plane continua operacional dentro dos limites definidos.**

---

## 12. Segurança

A identidade RIGHTWARE deve ser separada da identidade do cliente.

### Nunca assumir

- admin do cliente = Super Admin;
- role operacional = role RIGHTWARE;
- utilizador local = acesso global.

### Requisitos futuros

- IAM RIGHTWARE;
- MFA;
- least privilege;
- sessão auditada;
- revogação central;
- support access explícito;
- logs de auditoria;
- segregação de ambientes;
- gestão de secrets;
- políticas de acesso por instância.

---

## 13. Releases e versões

Cada instância deve reportar:

- versão;
- build SHA;
- channel;
- compatibilidade;
- data de deploy.

O Control Plane deve saber:

- quais estão atualizadas;
- quais precisam atualizar;
- quais têm versão incompatível;
- quais estão num rollout gradual.

---

## 14. Módulos variáveis por cliente

Nem todos os clientes precisam dos mesmos módulos.

Exemplo genérico:

### Cliente A
- core;
- analytics;
- payments;
- notifications.

### Cliente B
- core;
- automation;
- documents;
- reporting.

### Cliente C
- core;
- integrations;
- risk;
- knowledge.

O Control Plane conhece entitlement/configuração.

A Experience Plane decide como esses módulos aparecem.

---

## 15. Extensibilidade

A plataforma deve permitir:

- módulos comuns;
- módulos opcionais;
- extensões específicas;
- integrações;
- overrides controlados;
- feature flags;
- widgets;
- adapters.

### Evitar

- forks incontroláveis;
- duplicação profunda;
- alterações core diretamente por cliente;
- lógica específica espalhada por toda a aplicação.

---

## 16. Modelo de repositórios RIGHTWARE

Conceitualmente:

```text
rightware/
├── <produto>-control-plane
├── <produto>-shared
├── <produto>-cliente-a
├── <produto>-cliente-b
└── <produto>-cliente-c
```

Nem todos precisam existir desde o primeiro MVP.

O importante é não criar decisões locais que impeçam evolução futura para este modelo.

---

## 17. Aplicação em produtos RIGHTWARE

### EduCore
- cada escola = instância;
- Data Plane académico isolado;
- experiência profundamente personalizada;
- Super Admin central.

### Fintech
- cada instituição/cliente = instância;
- dados financeiros isolados;
- produtos/flows variáveis;
- risk/health central.

### Automation
- cada empresa = instância;
- workflows locais;
- conectores próprios;
- orchestration central.

### Cybersecurity
- cada organização = instância;
- telemetria e dados segregados;
- políticas diferentes;
- control plane central para health, agents e licensing.

### Software vertical
- cada cliente pode receber experiência específica;
- componentes e contratos permanecem comuns.

---

## 18. Anti-patterns

Evitar:

1. uma única DB operacional para todos os clientes sem necessidade clara;
2. usar `tenant_id` como solução universal para isolamento;
3. confundir Super Admin com admin do cliente;
4. personalização limitada apenas a branding;
5. copiar o produto inteiro e perder evolução comum;
6. centralizar dados sensíveis que não precisam ser centralizados;
7. deixar cada repo inventar contratos incompatíveis;
8. deployments incapazes de reportar versão/health;
9. Control Plane como single point of failure operacional;
10. suporte sem auditoria.

---

## 19. Critério para usar esta arquitetura

Usar este padrão quando o produto precisa simultaneamente de:

- SaaS;
- controlo central;
- muitos clientes;
- isolamento;
- customização forte;
- deployments independentes;
- módulos variáveis;
- evolução comum.

Não usar apenas porque parece mais sofisticado.

Se um produto simples puder usar multi-tenancy tradicional sem comprometer experiência, segurança ou operação, avaliar a solução mais simples.

---

## 20. Definição oficial

> **RIGHTWARE Distributed SaaS Architecture**
>
> Um padrão multi-instance em que a RIGHTWARE mantém um Control Plane central para gestão, health, módulos, versões, licenças e suporte, enquanto cada cliente mantém um Data Plane isolado e uma Experience Plane que pode ser profundamente personalizada.

---

## 21. Relação com Inteligência Operacional

A **Inteligência Operacional** ajuda a descobrir como a experiência de cada cliente deve ser desenhada.

A **Arquitetura SaaS Distribuída** garante que essa personalização não destrói:

- controlo central;
- escalabilidade;
- manutenção;
- segurança;
- evolução comum do produto.

As duas metodologias são complementares:

```text
INTELIGÊNCIA OPERACIONAL
→ descobre como personalizar

ARQUITETURA SAAS DISTRIBUÍDA
→ permite personalizar sem perder plataforma
```

# Arquitetura SaaS Distribuída — EduCore / RIGHTWARE

> **Estado:** DECISÃO ARQUITETURAL EDUCORE  
> **Data:** 2026-10-01  
> **Escopo:** aplicação ao EduCore do framework geral RIGHTWARE de SaaS distribuído.
>
> **Framework geral:** `arquitetura-rightware-saas-distribuida.md`

---

## 1. Definição

Esta arquitetura é a especialização EduCore do padrão **RIGHTWARE Distributed SaaS Architecture**.

O EduCore não será um SaaS clássico em que todos os clientes utilizam exatamente a mesma aplicação visual e operacional.

O modelo escolhido é:

> **SaaS distribuído / multi-instance com Control Plane central.**

Cada escola pode ter:

- repositório próprio;
- deployment próprio;
- domínio próprio;
- identidade visual própria;
- composição de landing própria;
- módulos diferentes;
- jornadas diferentes;
- configuração funcional diferente;
- ritmo próprio de release quando necessário.

Mas todas as escolas continuam ligadas à mesma plataforma RIGHTWARE através de um **Control Plane central**.

---

## 2. Princípio de produto

A escola A não deve olhar para a escola B e sentir que recebeu apenas uma cópia com cores diferentes.

A personalização deve poder alterar:

- estrutura visual;
- hierarquia de informação;
- navegação;
- módulos;
- páginas;
- copy;
- jornadas;
- dashboards;
- funcionalidades expostas;
- experiência pública;
- experiência do encarregado;
- experiência de direção;
- integrações.

O que permanece comum é a **plataforma, os contratos, o controlo e a capacidade de evolução**.

---

## 3. Arquitetura global

```text
                    RIGHTWARE CONTROL PLANE
┌──────────────────────────────────────────────────────────────┐
│  Super Admin UI                                             │
│  Control Plane API                                          │
│  Control Plane Database                                     │
│  Fleet / Instance Registry                                  │
│  Module & Feature Catalogue                                 │
│  Release / Version Registry                                 │
│  Health / Heartbeat / Observability                         │
│  Licensing / Subscription / Support                         │
└──────────────────────────────┬───────────────────────────────┘
                               │
              ┌────────────────┼─────────────────┐
              │                │                 │
              ▼                ▼                 ▼
      EDUCORE COLUS      EDUCORE PÁSCOA      EDUCORE ESCOLA X
      repo próprio       repo próprio         repo próprio
      deploy próprio     deploy próprio       deploy próprio
      experiência COLUS  experiência Páscoa   experiência X
      DB escolar*        DB escolar*          DB escolar*
```

`* DB escolar` representa o Data Plane da escola. A implementação concreta pode evoluir com backend/ERP.

---

## 4. Control Plane vs Data Plane

### Control Plane RIGHTWARE

É global e pertence à RIGHTWARE.

Responsável por saber:

- quantas escolas existem;
- quantas estão ativas;
- que versão cada uma utiliza;
- que módulos estão habilitados;
- estado do deployment;
- último heartbeat;
- ambiente;
- domínio;
- plano/licença;
- integrações configuradas;
- incidentes/health;
- feature flags globais e por escola;
- histórico de alterações administrativas;
- suporte e acesso autorizado.

### Data Plane da escola

Pertence à operação daquela escola.

Responsável por dados como:

- alunos;
- encarregados;
- professores;
- turmas;
- presenças;
- avaliações;
- documentos;
- pagamentos;
- comunicações;
- dados académicos e operacionais.

### Regra de isolamento

> **A base central do Control Plane não deve tornar-se a base operacional de todos os alunos de todas as escolas.**

O Control Plane guarda **metadados da instância**, não os dados académicos completos de cada cliente.

Isso permite controlo SaaS global sem misturar dados sensíveis entre escolas.

---

## 5. Base de dados central RIGHTWARE

A mesma base de dados deve alimentar o Super Admin em todas as implementações.

Entidades mínimas propostas:

### `schools`
- id
- legal_name
- display_name
- status
- country
- timezone
- created_at
- activated_at

### `instances`
- id
- school_id
- environment
- repository
- deployment_provider
- deployment_url
- custom_domain
- release_version
- build_sha
- status
- last_seen_at

### `module_catalog`
- id
- key
- name
- description
- version

### `school_modules`
- school_id
- module_id
- enabled
- configuration_version
- updated_at

### `feature_flags`
- key
- scope
- default_value

### `school_feature_flags`
- school_id
- feature_key
- value

### `instance_heartbeats`
- instance_id
- timestamp
- health
- latency
- version
- metadata

### `releases`
- version
- build_sha
- released_at
- compatibility
- notes

### `support_audit`
- actor
- school_id
- action
- timestamp
- reason
- metadata

### Futuro
- subscriptions
- billing
- support tickets
- incidents
- integration registry
- licence assignments

---

## 6. O Super Admin deve ser realmente o mesmo

Não apenas visualmente semelhante.

A meta deve ser:

> **mesma implementação lógica + mesma API + mesma base central + mesma identidade RIGHTWARE.**

Curto prazo:

- o ecrã pode existir em cada repo;
- deve usar o mesmo contrato de API;
- deve apontar para o mesmo Control Plane.

Médio prazo:

- extrair para package interno, por exemplo:
  `@rightware/educore-super-admin`.

Longo prazo:

- pode existir também um portal global dedicado, por exemplo:
  `admin.educore.rightware...`

Os repos escolares podem manter `/platform` e:
- montar o package partilhado; ou
- redirecionar para o portal central com contexto da escola.

---

## 7. O que o Super Admin vê

O Super Admin RIGHTWARE deve conseguir ver, em tempo real ou quase real:

- total de escolas;
- ativas;
- suspensas;
- offline/degradadas;
- ambientes;
- versão de cada deployment;
- módulos habilitados;
- última comunicação;
- health;
- erros relevantes;
- domínio;
- provider de deploy;
- release;
- integrações;
- necessidade de atualização.

### Dashboard de fleet

Exemplo:

```text
EduCore Platform
────────────────────────────────────────────
Escolas            7
Ativas             6
Degradadas         1
Offline            0
Versão atual       1.4.2
Atualizações pend. 2
────────────────────────────────────────────
COLUS      active   v1.4.2   30s ago
Páscoa     active   v1.4.1   12s ago
Escola X   warning  v1.3.9   4m ago
```

---

## 8. Heartbeat da instância

Cada deployment deve comunicar periodicamente com o Control Plane.

Payload mínimo:

- instance_id;
- school_id;
- environment;
- version;
- build_sha;
- health;
- timestamp;
- enabled_modules hash/version.

O Control Plane usa isso para determinar:

- active;
- degraded;
- offline;
- outdated.

### Importante

Heartbeat não deve enviar dados de alunos ou outra informação operacional sensível.

---

## 9. Configuração: global vs local

Há três classes de configuração.

### A. RIGHTWARE global
Exemplos:
- catálogo de módulos;
- políticas de compatibilidade;
- release channel;
- flags globais;
- suporte.

Fonte de verdade: Control Plane.

### B. School platform configuration
Exemplos:
- módulos ativos;
- features habilitadas;
- estado/licença;
- integração ERP habilitada.

Fonte de verdade preferencial: Control Plane, com cache local quando necessário.

### C. Deep personalization
Exemplos:
- layout;
- landing;
- linguagem;
- composição;
- assets;
- fluxos específicos;
- páginas exclusivas.

Fonte de verdade: repositório/configuração da escola, podendo referenciar metadados centrais.

---

## 10. Por que não centralizar toda a personalização

Se toda diferença for reduzida a uma tabela de cores e flags, o produto volta a parecer um template SaaS.

A personalização profunda deve poder viver no repo da escola.

O Control Plane sabe **o que existe e o que está ativo**.

O repo da escola define **como aquilo é vivido e apresentado**.

---

## 11. Módulos podem variar por escola

Exemplo:

### COLUS
- académico;
- encarregados;
- eventos;
- comunicação;
- financeiro básico;
- relatórios.

### Páscoa
- académico;
- conteúdos;
- financeiro;
- admissões;
- comunicação;
- outros módulos específicos.

O Control Plane conhece o entitlement de cada escola.

A UI de cada escola não é obrigada a organizar esses módulos da mesma forma.

---

## 12. Sincronização de módulos

Fluxo recomendado:

```text
Super Admin
→ Control Plane API
→ school_modules / feature flags
→ instance sync
→ local cache/config
→ application behaviour
```

A instância deve conseguir iniciar com configuração em cache se o Control Plane estiver temporariamente indisponível.

---

## 13. Segurança do Super Admin

Super Admin precisa de identidade separada dos utilizadores escolares.

### Nunca

- Direção = Super Admin;
- login escolar dar acesso ao Control Plane;
- permissões RIGHTWARE derivadas de role escolar.

### Futuro obrigatório

- IAM RIGHTWARE;
- MFA;
- sessões auditadas;
- least privilege;
- support access explícito;
- logs imutáveis/auditáveis;
- revogação central.

---

## 14. Personalização profunda sem fork caótico

Para manter liberdade sem perder produto comum, separar:

### Core partilhável
- UI primitives;
- contratos de domínio;
- autenticação contract;
- role model;
- integração Control Plane;
- integration SDK;
- observability;
- common utilities.

### Experience layer por escola
- landing;
- layouts;
- copy;
- assets;
- journeys;
- composição de dashboards;
- feature surfaces.

### Extension points
- páginas próprias;
- widgets;
- módulos adicionais;
- integrações específicas;
- overrides declarativos.

---

## 15. Modelo de repositórios

```text
rightware/
├── educore-control-plane          # futuro / central
├── educore-shared                 # futuro packages
├── educore-colégio-pascoa
├── educore-colegio_universo_dos_sonhos
└── educore-<escola-x>
```

Não é necessário criar estes repos centrais agora para o MVP COLUS.

Mas a arquitetura COLUS deve evitar decisões que impeçam essa evolução.

---

## 16. Relação com ERP futuro

O ERP pode ser outro produto SaaS central ou distribuído, mas deve expor contratos estáveis.

```text
EduCore School Instance
        ↓
ERP Adapter
        ↓
ERP RIGHTWARE API
```

O Control Plane EduCore deve conhecer apenas:

- integração ativada;
- endpoint/connector id;
- health;
- versão;
- sincronização;
- permissões.

Não deve duplicar o ledger ou lógica financeira.

---

## 17. Resultado arquitetural

O EduCore passa a ser simultaneamente:

### SaaS
Porque existe:
- plataforma central;
- controlo RIGHTWARE;
- fleet;
- módulos/licenças;
- lifecycle;
- observabilidade;
- evolução comum.

### Multi-instance
Porque:
- cada escola tem deployment próprio;
- isolamento operacional;
- release e rollback independentes.

### Deeply personalized
Porque:
- cada escola pode ter experiência distinta;
- composição distinta;
- módulos distintos;
- flows distintos;
- identidade própria.

---

## 18. Definição curta

> **EduCore é um SaaS multi-instance com Control Plane central e experiências escolares profundamente personalizadas.**

Esta é a definição arquitetural que deve orientar o COLUS e as próximas escolas.

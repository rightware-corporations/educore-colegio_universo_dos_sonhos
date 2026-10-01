# Arquitetura COLUS V1 — EduCore

> **Estado:** BASE ARQUITETURAL FECHADA — AGUARDA DESIGN FUNCIONAL / NÃO IMPLEMENTAR AINDA  
> **Versão:** 0.1  
> **Data:** 2026-09-30  
> **Objetivo:** fechar a arquitetura do MVP COLUS antes de qualquer port ou escrita de código.

---

## 1. Princípios não negociáveis

### A. Repositório independente
COLUS vive no seu próprio repositório e deployment.

### B. Produto reutilizável
A independência de deployment não significa duplicar decisões de produto sem critério.

### C. Single-school runtime
Uma aplicação COLUS representa apenas o COLUS.

### D. Dados demonstrativos claramente separados
O MVP pode ser funcional sem fingir backend de produção.

### E. Portas para o futuro
O frontend deve poder trocar o adapter demo por API/ERP sem reescrever todas as páginas.

### F. Páginas finas
UI não deve conter simultaneamente seed, regra de negócio, persistência e integração.

### G. Cross-role first
O valor do MVP está em mostrar que uma ação feita num perfil altera a experiência dos outros.

---

# 2. Arquitetura de alto nível

```text
┌─────────────────────────────────────┐
│              UI / PAGES             │
│ Landing · Login · Portais por papel │
└─────────────────┬───────────────────┘
                  ↓
┌─────────────────────────────────────┐
│        FEATURES / USE CASES         │
│ presença · notas · matrícula · etc. │
└─────────────────┬───────────────────┘
                  ↓
┌─────────────────────────────────────┐
│          DOMAIN CONTRACTS           │
│ alunos · académico · financeiro ... │
└─────────────────┬───────────────────┘
                  ↓
┌─────────────────────────────────────┐
│        REPOSITORY / PORTS           │
│ interfaces independentes da origem  │
└───────────────┬─────────────────────┘
                ↓
       ┌────────┴────────┐
       ↓                 ↓
┌──────────────┐   ┌───────────────┐
│ Demo Adapter │   │ Future API    │
│ local/session│   │ EduCore / ERP │
└──────────────┘   └───────────────┘
```

---

# 3. Frontend

## Tecnologia base

Reutilizar a stack validada no Páscoa:

- React 18;
- TypeScript;
- Vite;
- React Router;
- Tailwind;
- Radix/shadcn;
- Lucide;
- TanStack Query disponível para futura comunicação com APIs;
- Vitest.

### Regra

Não adicionar framework ou state manager novo apenas por preferência.

Se uma necessidade concreta surgir, documentar antes.

---

# 4. SchoolConfig singleton

A aplicação deve ter uma única configuração institucional.

Exemplo conceitual:

```text
SchoolConfig
├── identity
├── branding
├── locale
├── academic
├── enabledFeatures
├── publicContent
└── contacts
```

### Deve conter

- nome legal;
- nome de apresentação;
- sigla/nome curto;
- logo;
- favicon;
- cores;
- tipografia;
- locale;
- timezone;
- moeda;
- classes/níveis demonstrativos;
- features habilitadas;
- contactos públicos confirmados;
- conteúdos públicos aprovados.

### Não deve conter

- dados de alunos;
- regras financeiras;
- credenciais;
- lógica de integração;
- múltiplas escolas.

---

# 5. Modelo de papéis

Manter:

- student;
- guardian;
- teacher;
- pedagogy;
- executive;
- secretary;
- finance.

## Separação importante

### Role
Define a experiência e autorização do utilizador.

### Module/Feature
Define se determinada capacidade existe no deployment.

Estas duas coisas não devem ser confundidas.

---

# 6. Autenticação do MVP

## V1 pré-comercial

Autenticação demonstrativa.

Pode usar:

- perfis demo predefinidos;
- sessão local;
- selector controlado de papel;
- persistência opcional em browser.

### Deve ser explicitamente considerada DEMO.

Não implementar ainda:

- IAM produtivo;
- MFA;
- reset real;
- gestão real de passwords;
- recuperação por email;
- sessões server-side.

## Futuro

```text
Auth UI
  ↓
Auth Port
  ↓
Production Identity Provider / API
```

Assim o shell e as páginas não dependem do mecanismo mock.

---

# 7. Estado demonstrativo

## Problema a evitar

No Páscoa, várias páginas possuem estado local independente e importam os seeds diretamente.

No COLUS, o estado da demo deve ser partilhado.

## Proposta V1

Um **Demo Application State** central para a sessão.

Responsabilidades:

- estado de alunos;
- presenças;
- avaliações;
- notas;
- pagamentos;
- notificações;
- aprovações;
- audit events;
- reset da demo.

### Persistência

Para a apresentação:

- memória durante uso;
- `localStorage` opcional para sobreviver à navegação/reload;
- botão/ação interna de reset.

### Regra

Persistência local é adapter de apresentação, não banco de dados.

---

# 8. Repository contracts

Cada domínio deve expor operações através de contrato.

Exemplo conceptual:

```text
StudentRepository
AttendanceRepository
AssessmentRepository
FinanceRepository
NotificationRepository
AuditRepository
```

Páginas não importam seeds.

Fluxo:

```text
UI
→ use case/hook
→ repository contract
→ active adapter
```

---

# 9. Domain actions

O MVP deve trabalhar em ações de negócio.

Exemplos:

- enrollStudent;
- assignGuardian;
- recordAttendance;
- justifyAbsence;
- createAssessment;
- publishGrades;
- submitPayment;
- validatePayment;
- generateReceipt;
- createNotification;
- recordAuditEvent.

### Vantagem

A mesma ação pode futuramente chamar uma API sem mudar a intenção da UI.

---

# 10. Domínios V1

## Core Identity
- profile;
- role;
- permissions.

## People
- student;
- guardian;
- teacher/staff.

## Academic
- class;
- subject;
- timetable;
- attendance;
- assessment;
- grade.

## School Operations
- admission;
- enrollment;
- documents;
- notices;
- events.

## Finance Boundary
- obligation;
- payment;
- receipt;
- balance.

## Governance
- approvals;
- audit;
- dashboards;
- reports.

---

# 11. ERP boundary

Esta fronteira deve existir desde o MVP.

## EduCore conhece

- identificador da conta/aluno;
- obrigação;
- estado;
- saldo;
- pagamento;
- recibo;
- resumo financeiro.

## EduCore não deve possuir definitivamente

- ledger contabilístico completo;
- regras profundas de reconciliação;
- motor fiscal;
- tesouraria produtiva;
- integrações bancárias;
- lógica contabilística reutilizável.

Essas capacidades pertencem ao futuro ERP RIGHTWARE.

## No MVP

`DemoFinanceAdapter` representa o comportamento necessário para apresentação.

No futuro:

`ErpFinanceApiAdapter`.

---

# 12. Eventos de domínio para propagação

Para tornar a demo viva, algumas ações produzem consequências.

Exemplos:

```text
AttendanceRecorded
→ GuardianNotificationCreated
→ AttendanceRiskUpdated
→ AuditEventCreated
```

```text
PaymentValidated
→ BalanceUpdated
→ ReceiptIssued
→ GuardianNotificationCreated
→ ExecutiveMetricUpdated
→ AuditEventCreated
```

Não é necessário implementar uma infraestrutura empresarial de event bus no MVP.

É necessário apenas preservar o **conceito de consequência centralizada**, em vez de cada página simular individualmente.

---

# 13. Estrutura de apresentação funcional

## História principal

Um aluno fictício COLUS serve de eixo.

### Secretaria
matrícula / perfil / encarregado.

### Professor
presença + avaliação.

### Encarregado
acompanha e reage.

### Pedagogia
valida/acompanha.

### Financeiro
estado financeiro e pagamento demonstrativo.

### Direção
vê indicadores resultantes.

O objetivo da arquitetura é permitir que esta história use **o mesmo estado**, não dados independentes por tela.

---

# 14. Landing e Portal são dois contextos

## Public Experience

- identidade;
- escola;
- visão;
- experiências;
- comunidade;
- acesso ao portal.

## Operational Experience

- autenticação;
- dashboards;
- fluxos;
- dados;
- perfis.

A landing não deve carregar regras do ERP.

O portal não deve depender da landing.

Ambos apenas partilham identidade visual e configuração institucional.

---

# 15. Estrutura de pastas proposta

```text
frontend/src/
├── app/
│   ├── router/
│   ├── guards/
│   └── providers/
├── config/
│   └── school.config.ts
├── domain/
│   ├── identity/
│   ├── people/
│   ├── academic/
│   ├── admissions/
│   ├── finance/
│   ├── communication/
│   └── governance/
├── application/
│   ├── hooks/
│   └── use-cases/
├── repositories/
│   ├── contracts/
│   └── demo/
├── demo/
│   ├── seeds/
│   ├── scenarios/
│   └── reset/
├── features/
│   ├── guardian/
│   ├── teacher/
│   ├── pedagogy/
│   ├── executive/
│   ├── secretary/
│   ├── finance/
│   └── student/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── academic/
│   ├── dashboard/
│   └── shared/
├── pages/
│   ├── public/
│   └── auth/
├── assets/
└── types/
```

---

# 16. O que será portado do Páscoa

## Port quase direto

- UI primitives;
- layouts visuais;
- dashboard cards;
- badges;
- sheets/modals;
- schedule components;
- report/receipt previews;
- responsive shell;
- router patterns;
- role types.

## Port com adaptação

- role pages;
- navigation;
- auth;
- public landing patterns;
- login;
- academic components;
- finance components.

## Não port

- tenant context;
- tenant registry;
- platform tenant admin;
- tenant switch;
- Páscoa assets;
- Páscoa claims;
- hard-coded institution in mock users.

---

# 17. Qualidade mínima antes do código

Arquitetura só será considerada fechada depois de decidir:

- [x] estratégia repo/deploy;
- [x] single-school configuration;
- [x] separação de multi-tenancy;
- [x] manutenção do Super Admin RIGHTWARE por instância;
- [x] Control Plane central e base de dados global RIGHTWARE;
- [x] contrato instância ↔ Control Plane ↔ Super Admin;
- [x] perfis base;
- [x] princípio cross-role;
- [x] boundary de dados;
- [x] repository contracts;
- [x] demo state;
- [x] boundary ERP;
- [x] landing vs portal;
- [ ] módulos exatos do MVP P0;
- [ ] cenário de demo final;
- [ ] identidade visual COLUS;
- [ ] conteúdo público da landing;
- [ ] política de módulos que ficam ocultos na V1;
- [ ] estratégia de deploy concreta;
- [ ] definição do que o primeiro contacto irá abrir/ver;
- [ ] Definition of Done do MVP.

---

# 18. Gate de implementação

Enquanto existir item crítico em aberto na secção anterior:

> **NÃO COMEÇAR PORT DE CÓDIGO.**

Quando todos os itens críticos estiverem resolvidos, alterar o estado deste documento para:

> **ARCHITECTURE READY**

e só então iniciar a implementação.



---
# 19. Super Admin RIGHTWARE

O Super Admin é uma superfície proprietária da RIGHTWARE e permanece em todas as implementações EduCore.

No COLUS ele não funcionará como gestor de múltiplos tenants. Funcionará como **control plane da instância COLUS**.

Deve manter identidade e estrutura consistentes com os outros repos EduCore, permitindo controlar configuração, módulos, papéis, branding, feature flags, estado da aplicação e ferramentas de suporte.

Documento de referência: `../../educore/arquitetura/super-admin-rightware.md`.


---

# 20. COLUS como instância do SaaS distribuído

O COLUS terá:

- repositório próprio;
- deployment próprio;
- experiência profundamente personalizada;
- configuração e módulos próprios;
- Data Plane próprio para os dados escolares;
- integração com o **Control Plane central RIGHTWARE**.

O Super Admin da rota `/platform` deve consumir o mesmo Control Plane usado pelas restantes escolas.

Portanto, ao entrar no Super Admin a partir do COLUS, a RIGHTWARE poderá ver a fleet global, não apenas o COLUS, desde que a identidade do utilizador tenha privilégios globais RIGHTWARE.

A aplicação escolar continua isolada; a visão global existe apenas no plano administrativo RIGHTWARE.

Documento de referência: `../../educore/arquitetura/arquitetura-saas-distribuida.md`.


---

# 21. Ponto de entrada do desenho funcional

A base arquitetural necessária para evitar retrabalho estrutural está agora suficientemente definida.

Já estão fechados:

- repo/deploy independente por escola;
- SaaS multi-instance;
- Control Plane central;
- Data Plane isolado;
- Experience Plane profundamente personalizável;
- Super Admin RIGHTWARE;
- heartbeat;
- contrato inicial de configuração/health;
- fronteira futura EduCore ↔ ERP;
- repository contracts;
- demo state partilhado;
- separação entre landing e portal;
- modelo de papéis.

## O que falta agora não é infraestrutura abstrata.

Falta decidir **como o COLUS deve ser vivido pelo utilizador**.

A próxima fase precisa de input direto de produto/design sobre:

1. primeira impressão da aplicação;
2. landing;
3. login;
4. dashboard inicial;
5. módulos P0;
6. ordem e hierarquia dos módulos;
7. diferenças entre perfis;
8. experiência do encarregado;
9. experiência da direção;
10. experiência do professor;
11. experiência da secretaria;
12. papel do financeiro no MVP;
13. identidade visual;
14. narrativa da demo;
15. o que mostrar e o que ocultar na V1.

### Gate atual

> **PRODUCT DESIGN INPUT REQUIRED**

Ainda não é:

> **ARCHITECTURE READY — PODEMOS COMEÇAR A IMPLEMENTAÇÃO**

Esse gate só será emitido depois de fechar o desenho funcional acima.

# Mapa de Implementação — COLUS / EduCore

> **Estado:** ARQUITETURA / PRÉ-CÓDIGO  
> **Data:** 2026-09-30  
> **Regra:** este documento não autoriza início de implementação. O código só começa depois de a arquitetura COLUS V1 estar fechada e aprovada.

---

## 1. Objetivo

Definir, antes de qualquer port de código, o que será aproveitado do repositório:

`rightware-corporations/educore-colegio-pascoa`

e o que será:

- PORTADO;
- ADAPTADO;
- REESTRUTURADO;
- IGNORADO.

O princípio é:

> **Reutilizar experiência e produto; não copiar dívida arquitetural nem multi-tenancy legado.**

---

## 2. Diagnóstico principal do Páscoa

A base Páscoa já contém bastante valor de produto:

- sete perfis;
- rotas completas;
- dashboards;
- páginas académicas;
- presença;
- avaliações;
- financeiro;
- secretaria;
- pedagogia;
- direção;
- chat;
- notificações;
- documentos;
- componentes de UI;
- landing e login personalizados.

Contudo, grande parte das páginas consome diretamente `mockData.ts` e mantém estado local.

Exemplo observado:

- páginas de encarregado importam arrays de alunos, notas, pagamentos e assiduidade diretamente;
- professor guarda presença em estado local e apresenta toast;
- financeiro filtra seeds diretamente;
- secretaria consome admissões diretamente;
- direção calcula indicadores diretamente a partir dos mocks.

### Consequência arquitetural

**Não devemos portar estas páginas como se a ligação direta a `mockData.ts` fosse a arquitetura final.**

O visual e os fluxos são reutilizáveis.

A camada de dados precisa de uma fronteira explícita.

---

# 3. Mapa por área

| Área Páscoa | Estado observado | Decisão COLUS | Justificação |
|---|---|---|---|
| React/Vite/TypeScript | base estável de frontend | PORTAR | adequada ao MVP |
| Tailwind/Radix/shadcn | design system existente | PORTAR | reduz retrabalho |
| `components/ui` | componentes genéricos | PORTAR | baixo acoplamento |
| `components/layout` | shell desktop/mobile | PORTAR + ADAPTAR | remover dependência tenant |
| `components/dashboard` | cards e visualização | PORTAR | reutilizável |
| `components/academic` | componentes académicos | PORTAR | domínio relevante |
| `components/finance` | apresentação financeira | PORTAR seletivamente | futuro ERP separado |
| `components/chat` | UI comunicação | PORTAR seletivamente | integrar depois |
| `components/notifications` | UI notificações | PORTAR | relevante para encarregado |
| `components/shared` | modais/detalhes/etc. | PORTAR | reutilização transversal |
| `app/router` | routing por perfil | PORTAR + SIMPLIFICAR | retirar multi-tenant |
| AuthGuard/RoleGuard | controlo de navegação | PORTAR PARA MVP | mock agora, real depois |
| `AuthContext` | auth local/mock | REESTRUTURAR | não deixar usuário/instituição hard-coded |
| `TenantContext` | troca de escolas | IGNORAR | arquitetura abandonada |
| `data/tenants.ts` | registry de escolas | IGNORAR | repo é single-school |
| `platform/tenancy` | entitlements tenant runtime | IGNORAR / EXTRAIR IDEIAS | não necessário no deploy single-school |
| PlatformAdminPage | Super Admin multi-tenant | IGNORAR | fora do COLUS |
| `types/tenant.ts` | tipos multi-tenant | IGNORAR / SUBSTITUIR | criar SchoolConfig simples |
| `types/roles.ts` | papéis do ERP | PORTAR | modelo útil |
| `roleNavigation.ts` | menu por perfil | PORTAR + CONFIGURAR | bom padrão |
| `pages/role/*` | experiências por perfil | PORTAR CONCEITO + REFATORAR DADOS | forte valor de produto |
| `pages/app/*` | telas partilhadas | PORTAR seletivamente | algumas sobrepõem role pages |
| `mockData.ts` | dataset estático monolítico | NÃO PORTAR 1:1 | criar seeds por domínio |
| Páscoa landing | composição visual tenant | REFERÊNCIA | COLUS deve ter identidade própria |
| Páscoa login | composição autenticada | REFERÊNCIA / PORTAR ESTRUTURA | adaptar à identidade COLUS |
| media Páscoa | assets do cliente | NÃO PORTAR | proibido misturar identidades |
| backend placeholder | sem produção | NÃO PORTAR como solução | definir fronteira futura |
| database placeholder | sem produção | NÃO PORTAR como solução | definir modelo depois |

---

# 4. Perfis V1

O Páscoa possui sete perfis:

1. Aluno
2. Encarregado
3. Professor
4. Pedagogia
5. Direção
6. Secretaria
7. Finanças

### Decisão recomendada

Manter o **modelo completo de papéis** na arquitetura.

Mas para a apresentação COLUS, priorizar:

**P0**
- Direção;
- Encarregado;
- Professor;
- Secretaria.

**P1**
- Pedagogia;
- Finanças.

**P2**
- Aluno, se não for necessário para a primeira narrativa.

Isto não remove os papéis do produto; apenas controla o esforço do MVP.

---

# 5. Rotas

A estrutura por papel é útil e deve ser preservada conceitualmente:

```text
/app/guardian/*
/app/teacher/*
/app/pedagogy/*
/app/executive/*
/app/secretary/*
/app/finance/*
/app/student/*
```

### Ajuste necessário

A aplicação COLUS não precisa de:

- resolução de tenant;
- verificação de módulo por tenant;
- troca de escola;
- rota `/platform` para gerir tenants.

O router deve saber apenas:

- utilizador autenticado;
- papel;
- permissões/módulos locais;
- rota.

---

# 6. Configuração institucional

Substituir a ideia de `TenantConfig` por:

## `SchoolConfig`

Responsável por:

- nome institucional;
- nome curto;
- descriptor;
- logo;
- mark/favicon;
- cores;
- tipografia;
- locale;
- timezone;
- currency;
- módulos ativos no deployment;
- feature flags;
- contactos públicos;
- conteúdo institucional.

### Regra

Existe apenas **uma SchoolConfig ativa por deployment**.

Não existe tenant switch.

---

# 7. Camada de dados — decisão crítica

Esta é a principal diferença entre copiar o Páscoa e construir o COLUS corretamente.

## Problema observado

Hoje muitas páginas importam diretamente:

`@/data/mockData`

Isto produz:

- acoplamento página ↔ seed;
- estado local isolado;
- alterações que não propagam entre perfis;
- dificuldade de trocar mocks por API;
- duplicação de lógica.

## Direção COLUS

As páginas não devem conhecer a origem real dos dados.

Criar uma fronteira:

```text
PAGE / FEATURE
      ↓
DOMAIN SERVICE / USE CASE
      ↓
REPOSITORY CONTRACT
      ↓
ADAPTER
```

Para o MVP:

```text
Repository Contract
      ↓
Demo Adapter / Local Store
      ↓
Seed Data
```

No futuro:

```text
Repository Contract
      ↓
API Adapter
      ↓
EduCore Backend / ERP / serviços
```

Assim o MVP não precisa ser descartado quando o backend surgir.

---

# 8. Store demonstrativo

Para a apresentação, o estado precisa ser compartilhado entre perfis.

### Requisitos

- uma única fonte de estado da sessão demo;
- persistência local opcional;
- reset de demo;
- ações de domínio;
- audit events;
- notificações;
- propagação entre perfis.

### Exemplo conceitual

```text
Professor marca falta
→ AttendanceService
→ DemoRepository
→ aluno atualizado
→ notificação criada
→ encarregado vê
→ direção/pedagogia refletem indicador
```

Não permitir que cada página mantenha uma versão separada do mesmo dado.

---

# 9. Domínios funcionais

Organizar por domínio, não apenas por papel.

## Identidade e acesso
- auth;
- roles;
- permissions.

## Pessoas
- students;
- guardians;
- staff.

## Académico
- classes;
- subjects;
- timetable;
- attendance;
- assessments;
- grades.

## Operações escolares
- admissions;
- enrollments;
- documents;
- communication;
- events.

## Financeiro / ERP boundary
- obligations;
- invoices;
- payments;
- receipts;
- balances.

## Intelligence / direção
- dashboards;
- KPIs;
- reports;
- audit.

---

# 10. Fronteira EduCore ↔ ERP

Mesmo no MVP, o financeiro não deve ficar arquiteturalmente misturado com a interface.

### EduCore consome

- saldo;
- obrigações;
- pagamentos;
- recibos;
- estado financeiro.

### ERP futuro fornece

- regras financeiras;
- ledger;
- reconciliação;
- faturação;
- tesouraria;
- integrações de pagamento.

No MVP, um adapter demo simula essa resposta.

A interface deve depender de contrato, não da implementação real.

---

# 11. Landing pública

A landing Páscoa serve apenas como referência de:

- composição;
- ritmo;
- hero;
- media;
- CTA;
- ponte para o portal.

O COLUS precisa de landing própria orientada pela Inteligência Operacional.

### Conteúdo provável

- identidade COLUS;
- visão de futuro;
- ciência/TIC/aprendizagem prática;
- comunidade/família;
- experiência escolar;
- acesso ao portal.

Não copiar claims não confirmados.

---

# 12. Navegação e shell

O `RoleLayout` do Páscoa é uma boa base:

- sidebar desktop;
- topbar;
- pesquisa;
- notificações;
- bottom nav mobile;
- perfil;
- role-specific navigation.

### Ajustes arquiteturais

- Brand passa a ler `SchoolConfig`;
- menus passam a considerar configuração local;
- remover `TenantContext`;
- auth continua isolado;
- shell não deve importar dados de domínio.

---

# 13. Estrutura desejada do frontend COLUS

**ARQUITETURA PROPOSTA — AINDA NÃO IMPLEMENTAR**

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
│   └── audit/
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
│   └── shared/
├── pages/
│   ├── public/
│   └── auth/
├── assets/
└── types/
```

### Razão

Separar:

**domínio → dados → experiência → infraestrutura visual**

para evitar que páginas gigantes concentrem tudo.

---

# 14. O que não queremos repetir do Páscoa

1. `mockData.ts` com dezenas de domínios num único ficheiro.
2. Estado mutável isolado dentro de cada página.
3. Dados da instituição hard-coded no AuthContext.
4. Páginas muito grandes contendo UI + regra de negócio + estado + dados.
5. Multi-tenancy no runtime.
6. Super Admin de tenants dentro da aplicação da escola.
7. financeiro inseparável da camada de apresentação.
8. lógica de demonstração sem caminho claro para API futura.

---

# 15. O que queremos preservar

1. amplitude funcional;
2. sete papéis;
3. navegação clara por papel;
4. UX responsiva;
5. design system;
6. integração narrativa entre perfis;
7. visão de direção;
8. experiência do encarregado;
9. fluxo académico;
10. financeiro visível;
11. documentação/handoffs;
12. disciplina de distinguir demo de produção.

---

# 16. Estado atual

**AINDA NÃO ENTRAR NO CÓDIGO.**

Antes disso faltam fechar:

- arquitetura frontend V1;
- fronteira EduCore/ERP;
- estratégia de estado/demo repository;
- definição do P0 funcional;
- identidade visual COLUS;
- estrutura de landing;
- cenário principal da demo;
- política de autenticação do MVP;
- estratégia de deployment do repo COLUS;
- critérios de conclusão da arquitetura.

Quando estes pontos estiverem fechados, deve ser emitido explicitamente:

> **ARCHITECTURE READY — PODEMOS COMEÇAR A IMPLEMENTAÇÃO.**

Até esse momento, continuar apenas em análise, desenho e documentação.

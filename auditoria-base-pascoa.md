# Auditoria Base — EduCore Colégio Páscoa → COLUS

> Repositório de referência técnica para o MVP COLUS:
> `rightware-corporations/educore-colegio-pascoa`
>
> **Branch de referência:** `tenant/colegio-pascoa-live`
> **Data da auditoria inicial:** 2026-09-30
> **Objetivo:** identificar o que reutilizar, configurar e personalizar para construir o MVP COLUS sem reconstruir o EduCore.

---

## 1. Correção de referência

A base correta para estudo e reaproveitamento do MVP COLUS é o **EduCore Colégio Páscoa**, não o repositório Belo Horizonte.

O Colégio Páscoa já representa uma segunda implementação/tenant da mesma plataforma EduCore e, portanto, é a referência mais útil para aprender como criar uma nova experiência escolar sem fazer fork conceptual do produto.

---

## 2. Arquitetura observada

O repositório está organizado em:

- `frontend/`
- `backend/`
- `database/`
- `docs/handoff/`

### Estado atual confirmado pelos handoffs

- frontend funcional para apresentação;
- multi-tenant foundation de apresentação implementada;
- dados principais ainda baseados em mocks;
- autenticação de produção ainda não implementada;
- backend de produção não implementado;
- base de dados de produção não implementada;
- integrações reais não implementadas;
- tenant provisioning de produção ainda não implementado.

Isto significa que o repositório é adequado como **base de MVP/demonstração**, não como prova de backend produtivo concluído.

---

## 3. Princípio multi-tenant já definido

O handoff principal estabelece:

**EduCore = produto-base SaaS**

Cada escola = **tenant configurável**.

Diferenças por escola devem ser tratadas por:

- configuração;
- branding;
- theme;
- roles;
- module entitlements;
- feature flags;
- conteúdo;
- extensões controladas.

Evitar:

- fork completo por escola;
- duplicação de lógica;
- condicionais de negócio hard-coded por cliente.

Esta arquitetura encaixa diretamente com o método RIGHTWARE de “fato à medida”: personalizar profundamente a experiência sem destruir a reutilização do core.

---

## 4. Tenant Colégio Páscoa

Configuração observada:

- tenant id: `tenant-pascoa-002`;
- slug: `colegio-pascoa`;
- locale: `pt-MZ`;
- timezone: `Africa/Maputo`;
- currency: `MZN`;
- experience preset: `modern`;
- roles ativos:
  - student;
  - guardian;
  - teacher;
  - pedagogy;
  - executive;
  - secretary;
  - finance.

### Core modules observados

- student_registry;
- admissions;
- enrollment;
- academic;
- timetable;
- attendance;
- assessments;
- gradebook;
- finance;
- treasury;
- documents;
- communication;
- knowledge;
- reporting.

---

## 5. O que o Páscoa prova para o COLUS

O Páscoa demonstra que já existe estrutura para:

1. criar tenant escolar distinto;
2. aplicar branding próprio;
3. escolher preset visual;
4. controlar módulos;
5. controlar roles;
6. manter o mesmo ERP core;
7. ter landing pública diferente;
8. ter login personalizado;
9. preservar atribuição EduCore;
10. gerir tenant via camada de plataforma de apresentação.

Portanto, o MVP COLUS não deve começar como projeto novo.

Deve começar como **Tenant 003 do EduCore**, seguindo a mesma fundação.

---

## 6. Funcionalidade de apresentação já desenhada

O handoff `09_PRESENTATION_MVP_FUNCTIONALITY.md` define como requisito que o ERP pareça conectado entre perfis.

Fluxos de referência:

### Secretaria
criar/gerir aluno → turma → encarregado → visibilidade pedagógica.

### Professor
marcar presença → encarregado vê → justifica → pedagogia acompanha.

### Avaliações
professor cria → pedagogia aprova → aluno/encarregado vê → notas são publicadas.

### Pedagogia
intervenções e acompanhamento de risco.

### Encarregado
acompanhar educando → justificar ausência → pagamentos → recibos → mensagens.

### Financeiro
submissão → validação/rejeição → saldo → recibo → indicadores.

### Direção
KPIs → aprovações → auditoria → relatórios.

A história de demonstração recomendada já é transversal:

**Secretaria → Professor → Encarregado → Pedagogia → Financeiro → Direção**

---

## 7. Reutilização para COLUS

| Área Páscoa | Decisão COLUS |
|---|---|
| Tenant foundation | REUTILIZAR |
| Roles | REUTILIZAR inicialmente |
| Core modules | REUTILIZAR / selecionar |
| Tenant config | CRIAR tenant COLUS |
| Branding | SUBSTITUIR por COLUS |
| Landing pública | PERSONALIZAR |
| Login | PERSONALIZAR |
| Media Páscoa | NÃO REUTILIZAR |
| Dados mock | CRIAR dataset COLUS fictício |
| ERP routes | REUTILIZAR |
| Entitlements | REUTILIZAR |
| Platform admin | REUTILIZAR para apresentação |
| Demo cross-role | REUTILIZAR estrutura |
| Backend/database | NÃO TRATAR COMO PRODUÇÃO |
| Integrações | NÃO PROMETER sem validação |

---

## 8. Primeira decisão técnica para COLUS

Criar um terceiro tenant:

- id sugerido: `tenant-colus-003`;
- slug: `colus` ou `colegio-universo-dos-sonhos`;
- nome: `Colégio Universo dos Sonhos`;
- locale: `pt-MZ`;
- timezone: `Africa/Maputo`;
- currency: `MZN`;
- experience preset: a decidir com base na identidade COLUS;
- roles: iniciar com o core existente;
- modules: selecionar de acordo com o MVP.

Esta identificação é interna/demonstrativa e pode ser ajustada antes da implementação.

---

## 9. O que estudar em seguida dentro do Páscoa

Prioridade técnica:

1. `frontend/src/data/tenants.ts`
2. `frontend/src/contexts/TenantContext*`
3. `frontend/src/platform/tenancy/*`
4. `frontend/src/pages/public/*`
5. `frontend/src/pages/auth/*`
6. `frontend/src/pages/role/*`
7. `frontend/src/data/mockData.ts`
8. tenant Páscoa media/landing;
9. routing e entitlements;
10. estado compartilhado usado pelos fluxos funcionais.

Objetivo: identificar exatamente **quais ficheiros precisam ser alterados para adicionar COLUS como tenant sem tocar desnecessariamente no core**.

---

## 10. Próximo output

Depois desta auditoria inicial, produzir:

**Mapa de Implementação COLUS**

com:

`FICHEIRO/COMPONENTE → REUTILIZAR → CONFIGURAR → PERSONALIZAR → NÃO TOCAR`

Depois disso começa a implementação do Tenant COLUS.

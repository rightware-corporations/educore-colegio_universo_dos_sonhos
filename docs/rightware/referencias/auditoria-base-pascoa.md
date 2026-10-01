# Auditoria Base — EduCore Colégio Páscoa → COLUS

> Repositório de referência funcional e visual:
> `rightware-corporations/educore-colegio-pascoa`
>
> **Branch observada:** `tenant/colegio-pascoa-live`
> **Data da revisão:** 2026-09-30
> **Objetivo:** identificar o que aprender e reutilizar do Páscoa sem repetir a antiga arquitetura multi-tenant.

---

## 1. Decisão arquitetural atual

**DECISÃO RIGHTWARE PARA O EDUCORE**

O modelo multi-tenant num único projeto/deploy deixou de ser a direção operacional.

A experiência mostrou dificuldade e ambiguidade no deployment de múltiplas escolas dentro do mesmo projeto, especialmente em plataformas de deploy como Railway e serviços equivalentes.

A estratégia atual passa a ser:

> **1 escola = 1 repositório = 1 aplicação/deployment independente.**

Assim:

- Colégio Páscoa tem o seu repositório;
- COLUS tem o seu repositório;
- futuras escolas terão repositórios próprios;
- deployments, variáveis de ambiente, domínio e ciclo de release ficam isolados por escola.

O nome da branch do Páscoa contém `tenant/` porque nasceu durante a fase multi-tenant. Isso é **legado histórico**, não a arquitetura que deve ser reproduzida no COLUS.

---

## 2. O que continua reutilizável

Separar **reutilização de produto** de **multi-tenancy operacional**.

Continuamos a reutilizar:

- componentes;
- fluxos;
- UX;
- páginas por perfil;
- módulos;
- padrões de navegação;
- lógica demonstrativa;
- contratos de domínio;
- modelos de dados quando aplicáveis;
- design system;
- estrutura de demo;
- testes úteis;
- ideias e decisões de produto.

Não devemos reutilizar como arquitetura de produção:

- tenant registry;
- tenant resolver;
- Super Admin multi-tenant;
- runtime switching de escolas;
- module entitlements dependentes de tenant;
- armazenamento de múltiplas escolas no mesmo deploy;
- lógica `tenant_id` apenas para suportar várias escolas no mesmo sistema.

---

## 3. Como ler o repositório Páscoa

O Páscoa deve ser estudado como:

### Referência de produto
O que o EduCore já sabe fazer.

### Referência de experiência
Como apresentar uma escola de forma convincente.

### Referência de fluxos
Como ligar Secretaria, Professor, Encarregado, Pedagogia, Financeiro e Direção.

### Referência de componentes
O que podemos portar para o novo repositório.

**Não** como blueprint de multi-tenancy.

---

## 4. Estado funcional observado

O repositório Páscoa contém:

- frontend React funcional para apresentação;
- landing personalizada;
- login personalizado;
- páginas por perfil;
- mocks extensos;
- fluxos transacionais de apresentação planeados;
- handoffs detalhados;
- estrutura de frontend madura para reutilização.

Também declara explicitamente:

- backend de produção: não implementado;
- base de dados de produção: não implementada;
- integrações reais: não implementadas;
- autenticação de produção: não implementada.

Portanto, o Páscoa é sobretudo uma **base funcional/demonstrativa**.

---

## 5. Fluxos que devemos reaproveitar

O documento `09_PRESENTATION_MVP_FUNCTIONALITY.md` continua altamente relevante.

### Secretaria
criar/gerir aluno → turma → encarregado → visibilidade pedagógica.

### Professor
marcar presença → encarregado vê → justifica → pedagogia acompanha.

### Avaliações
professor cria → aprovação/publicação → aluno e encarregado acompanham.

### Pedagogia
intervenções e acompanhamento académico.

### Encarregado
acompanhar educando → justificar ausência → comunicação → pagamentos.

### Financeiro
pagamento → validação → saldo → recibo → indicadores.

### Direção
KPIs → auditoria → relatórios → acompanhamento.

A história integrada continua válida para o COLUS:

**Secretaria → Professor → Encarregado → Pedagogia → Financeiro → Direção**

---

## 6. Mapa de reutilização corrigido

| Área do Páscoa | Decisão COLUS |
|---|---|
| Design system | REUTILIZAR |
| Componentes UI | REUTILIZAR |
| Páginas de perfis | REUTILIZAR / ADAPTAR |
| Fluxos ERP demonstrativos | REUTILIZAR |
| Mock data structure | REUTILIZAR / SUBSTITUIR DADOS |
| Landing structure | USAR COMO REFERÊNCIA, NÃO COPIAR IDENTIDADE |
| Login structure | REUTILIZAR / PERSONALIZAR |
| Routing | REUTILIZAR onde fizer sentido |
| Roles | REUTILIZAR inicialmente |
| Módulos | REUTILIZAR seletivamente |
| Media Páscoa | NÃO REUTILIZAR |
| Tenant registry | NÃO REUTILIZAR |
| Tenant context/resolution | NÃO REUTILIZAR como arquitetura |
| Platform Super Admin | PORTAR / REDEFINIR | manter como consola RIGHTWARE da instância, removendo gestão multi-tenant |
| Tenant switching | NÃO REUTILIZAR |
| Tenant entitlements runtime | NÃO REUTILIZAR como requisito estrutural |
| Backend/database placeholder | NÃO TRATAR COMO PRODUÇÃO |
| Integrações simuladas | NÃO APRESENTAR COMO REAIS |

---

## 7. Arquitetura do repositório COLUS

O repositório:

`rightware-corporations/educore-colegio_universo_dos_sonhos`

deve continuar a ser a unidade independente do COLUS.

Direção recomendada:

```text
educore-colegio_universo_dos_sonhos/
├── frontend/
├── backend/        # quando necessário
├── database/       # quando necessário
├── docs/
└── ...
```

A identidade da escola pode continuar configurável internamente através de um ficheiro único, por exemplo:

`school.config.ts`

Isso é **configuração de uma única instituição**, não multi-tenancy.

---

## 8. Produto comum sem deploy comum

Separar repositórios não significa abandonar o core comum.

O objetivo é manter:

> **mesmos princípios + componentes reutilizáveis + deployments independentes.**

No futuro, a reutilização técnica pode evoluir para:

- packages internos;
- biblioteca de componentes;
- módulos partilhados;
- templates;
- automação de bootstrap de novo colégio;
- upstream controlado;
- sincronização seletiva de melhorias.

Mas cada escola continua operacionalmente independente no deploy.

---

## 9. ERP como sistema separado

**DIREÇÃO DE PRODUTO INFORMADA PELO PROJETO**

O ERP não deve ser assumido como inseparável do EduCore para sempre.

A direção é que exista futuramente um **ERP separado**, reutilizável, com ciclo de vida próprio, integrado ao EduCore por contratos/API.

Modelo conceptual:

```text
EDUCORE — experiência escolar / produto da instituição
        ↓ integração
ERP RIGHTWARE — operações transacionais reutilizáveis
        ↓
serviços financeiros / académicos / administrativos / outros módulos
```

Isto permite que o ERP seja usado noutras soluções e contextos, sem obrigar todas as escolas a partilhar o mesmo deploy do EduCore.

A fronteira exata entre EduCore e ERP ainda deve ser formalizada antes de implementação produtiva.

---

## 10. O que estudar agora no Páscoa

A auditoria técnica deve priorizar:

1. páginas e componentes de `frontend/src/pages/role/*`;
2. `frontend/src/data/mockData.ts`;
3. router e estrutura de navegação;
4. landing e login como padrões de composição;
5. componentes comuns;
6. estado partilhado dos fluxos funcionais;
7. formulários e ações que já simulam ERP real;
8. testes relevantes;
9. styling e design tokens;
10. dependências necessárias.

### Baixa prioridade / legado

- `frontend/src/data/tenants.ts`;
- `TenantContext` para troca de escolas;
- `platform/tenancy/*`;
- lógica de criação/troca de tenants dentro do mesmo runtime;
- registry multi-tenant.

**Manter:** a superfície Super Admin RIGHTWARE como consola proprietária da instância COLUS.

Esses elementos podem ser úteis apenas como referência histórica ou para extrair componentes, não como arquitetura do COLUS.

---

## 11. Próximo output

Produzir o:

# Mapa de Implementação COLUS

Estrutura:

`FICHEIRO/COMPONENTE → COPIAR/PORTAR → ADAPTAR → REESCREVER → IGNORAR`

A prioridade passa a ser descobrir o **mínimo conjunto de código do Páscoa necessário para vestir o COLUS**, mantendo o novo repositório limpo e independente.

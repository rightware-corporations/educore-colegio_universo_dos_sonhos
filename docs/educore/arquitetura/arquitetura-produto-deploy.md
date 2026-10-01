# Arquitetura de Produto e Deploy — EduCore / RIGHTWARE

> **Estado:** DECISÃO ARQUITETURAL ATUAL  
> **Data:** 2026-09-30  
> **Escopo:** estratégia de repositórios, deployment e separação futura do ERP.

---

## 1. Princípio principal

A estratégia atual do EduCore é:

> **1 escola = 1 repositório = 1 deployment independente.**

A arquitetura multi-tenant num único projeto/deploy foi experimentada anteriormente, mas gerou fricção operacional no deployment e gestão de ambientes.

A separação por repositório passa a ser a regra para novas implementações.

---

## 2. Motivo da decisão

Problemas observados no modelo anterior:

- ambiguidade de deploy;
- serviços de hosting confundidos por múltiplas escolas/branches/contextos;
- maior risco de aplicar configuração errada;
- maior complexidade de variáveis de ambiente;
- maior dificuldade de isolar releases;
- maior dificuldade de rollback por escola;
- acoplamento operacional desnecessário.

A separação por repositório melhora:

- isolamento;
- clareza;
- ownership;
- release;
- rollback;
- domínio;
- variáveis de ambiente;
- observabilidade;
- troubleshooting.

---

## 3. O que “repo por escola” não significa

Não significa criar produtos completamente diferentes.

A RIGHTWARE deve continuar a manter:

- padrões comuns;
- design system;
- componentes reutilizáveis;
- módulos comuns;
- contratos de domínio;
- boas práticas;
- estruturas de dados reutilizáveis;
- testes reaproveitáveis;
- automações de bootstrap.

A estratégia é:

> **core intelectual e técnico comum + deployments independentes.**

---

## 4. Estrutura recomendada

Cada escola possui um repositório próprio:

```text
educore-colegio-pascoa
educore-colegio_universo_dos_sonhos
educore-<proxima-escola>
```

Dentro de cada repo:

```text
frontend/
backend/
database/
docs/
```

Nem todos os diretórios precisam existir desde o início.

---

## 5. Configuração da escola

Cada aplicação deve representar apenas uma instituição.

Pode existir um ficheiro de configuração local, por exemplo:

`src/config/school.config.ts`

contendo:

- nome;
- logotipo;
- cores;
- locale;
- moeda;
- timezone;
- módulos ativos;
- feature flags locais;
- conteúdo institucional.

Isto é **single-school configuration**.

Não deve existir troca de escola em runtime.

---

## 6. Reutilização entre repositórios

Curto prazo:

- copiar/portar componentes validados;
- manter documentação clara de origem;
- sincronizar melhorias importantes manualmente.

Médio prazo:

- extrair packages internos quando a repetição justificar;
- criar design system partilhado;
- criar módulos partilhados;
- criar gerador/bootstrap para novo colégio.

Longo prazo:

- definir dependências versionadas;
- automatizar atualizações;
- preservar customizações específicas sem bloquear evolução do core.

---

## 7. Estratégia de deployment

Cada escola deve ter:

- projeto de deploy próprio;
- domínio/subdomínio próprio;
- variáveis de ambiente próprias;
- logs próprios;
- secrets próprios;
- pipeline próprio;
- rollback próprio.

Uma falha ou mudança numa escola não deve forçar deploy das restantes.

---

## 8. ERP como produto separado

A direção futura é separar o ERP do EduCore.

### EduCore

Responsável pela experiência escolar e integração dos perfis da instituição.

Pode incluir:

- experiência do aluno;
- experiência do encarregado;
- comunicação;
- dashboards;
- jornadas;
- interface escolar.

### ERP RIGHTWARE

Produto separado, reutilizável e integrável.

Pode concentrar:

- operações transacionais;
- financeiro;
- contabilidade operacional;
- faturação;
- pagamentos;
- tesouraria;
- registos administrativos;
- outros serviços partilháveis.

### Relação

```text
EduCore da Escola
      ↓ API / contratos
ERP RIGHTWARE
      ↓
serviços reutilizáveis
```

O ERP deve poder servir vários produtos RIGHTWARE sem depender da interface EduCore.

---

## 9. Consequência para o MVP COLUS

O COLUS não deve ser criado como novo tenant dentro do Páscoa.

Deve ser desenvolvido diretamente no repositório:

`rightware-corporations/educore-colegio_universo_dos_sonhos`

O Páscoa será usado como:

- referência;
- origem de componentes;
- origem de fluxos;
- origem de páginas;
- origem de padrões visuais e funcionais.

Mas o resultado final será um projeto COLUS independente.

---

## 10. Regra para código legado multi-tenant

Ao portar código do Páscoa:

### Manter
- páginas úteis;
- componentes;
- fluxos;
- módulos;
- formulários;
- tabelas;
- dashboards;
- helpers genéricos.

### Remover ou simplificar
- tenant switching;
- tenant registry;
- platform tenant admin;
- tenant resolver;
- tenant-specific branching;
- runtime tenant context quando só serve múltiplas escolas.

### Avaliar caso a caso
- entitlements;
- feature flags;
- branding config;
- role permissions.

Estes conceitos continuam úteis, mas devem funcionar no contexto de **uma única escola por deploy**.

---

## 11. Princípio final

> **Reutilizar o produto não exige partilhar o deployment.**

A RIGHTWARE deve otimizar simultaneamente para:

**consistência do produto + independência operacional por cliente.**


---
## 12. Super Admin comum em deployments separados

A estratégia `1 escola = 1 repo = 1 deployment` **não elimina o Super Admin**.

Cada deployment deve incluir a mesma superfície proprietária **EduCore / RIGHTWARE Super Admin**, com escopo sobre a instância daquela escola.

O que desaparece é o runtime multi-tenant e a troca de escolas dentro da mesma aplicação. O que permanece é o control plane RIGHTWARE.

No futuro, estas consolas por instância podem também reportar para uma consola central de fleet management da RIGHTWARE.


---

## 13. Control Plane central

A independência de deployment não elimina o SaaS central.

Todas as instâncias EduCore devem ligar-se a um **Control Plane RIGHTWARE comum**, com:

- base de dados central de escolas/instâncias;
- módulos;
- feature flags;
- versões;
- heartbeat;
- health;
- licenças;
- auditoria de suporte.

Assim:

```text
Deploy separado por escola
+ Control Plane central
= SaaS multi-instance
```

A experiência de cada escola pode ser profundamente distinta sem perder controlo central.

Ver: `arquitetura-saas-distribuida.md`.

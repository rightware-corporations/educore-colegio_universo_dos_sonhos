# Super Admin RIGHTWARE — Arquitetura de Controlo

> **Estado:** DECISÃO ARQUITETURAL  
> **Data:** 2026-09-30  
> **Escopo:** superfície administrativa proprietária da RIGHTWARE presente em cada implementação EduCore.

---

## 1. Princípio

O **Super Admin não pertence à escola**.

É uma superfície de controlo da **RIGHTWARE** e deve manter identidade, estrutura e comportamento consistentes entre implementações.

> **Cada escola tem o seu repositório e deployment, mas o Super Admin continua a ser nosso.**

Isto resolve a aparente contradição entre:

- deployments separados por escola;
- controlo operacional central da RIGHTWARE.

---

## 2. Regra de consistência

O Super Admin deve ser, tanto quanto possível:

- o mesmo design;
- a mesma navegação;
- os mesmos componentes;
- os mesmos conceitos;
- as mesmas permissões RIGHTWARE;
- o mesmo modelo de configuração.

Pode mudar o **conteúdo da instância**, mas não a identidade da consola.

### Exemplo

No COLUS:

- a landing é COLUS;
- o login é COLUS;
- os portais são COLUS;
- o Super Admin continua visualmente **EduCore / RIGHTWARE**.

---

## 3. Diferença entre Super Admin e multi-tenancy

Manter o Super Admin **não significa voltar ao runtime multi-tenant**.

### Antigo modelo

```text
1 aplicação
→ vários tenants
→ troca de tenant
→ mesma infraestrutura/deploy
```

### Modelo atual

```text
Repo COLUS
→ deployment COLUS
→ Super Admin RIGHTWARE
→ controla a instância COLUS

Repo Páscoa
→ deployment Páscoa
→ Super Admin RIGHTWARE
→ controla a instância Páscoa
```

A consola é comum como **produto administrativo**, mas cada deployment controla a sua própria escola.

---

## 4. O que o Super Admin deve controlar

### P0 — obrigatório

- identificação da instância;
- estado da aplicação;
- módulos ativos;
- papéis/perfis disponíveis;
- feature flags;
- identidade visual da escola;
- configuração institucional;
- reset de dados demo, enquanto for MVP;
- versão/build;
- ambiente;
- acesso rápido às principais superfícies;
- ferramentas de suporte RIGHTWARE.

### P1 — quando backend existir

- utilizadores privilegiados;
- permissões;
- auditoria;
- logs operacionais;
- integrações;
- health checks;
- jobs;
- backups;
- configurações de API;
- gestão de sessões;
- segurança;
- manutenção.

### P2 — plataforma futura

- fleet view das várias instalações EduCore;
- versões por cliente;
- estado dos deployments;
- rollout controlado;
- suporte remoto autorizado;
- observabilidade central;
- gestão de licenças/planos.

---

## 5. O que deve sair do ecrã antigo

O `PlatformAdminPage` do Páscoa contém conceitos herdados da fase multi-tenant:

- lista de vários tenants;
- criar novo tenant;
- tenant switching;
- abrir tenant;
- suspender/ativar tenant dentro do mesmo runtime.

Essas funções **não devem ser copiadas literalmente** para o COLUS.

O design e linguagem de **EduCore Platform / Super Admin** são úteis, mas a função muda.

---

## 6. Super Admin COLUS V1

A primeira versão deve mostrar:

### Cabeçalho
**EduCore Platform — Super Admin**

### Identificação
- Instância: COLUS
- Ambiente: Demo / Presentation
- Versão
- Build
- Estado

### Módulos
Ativar/desativar módulos do deployment:

- Académico
- Assiduidade
- Avaliações
- Notas
- Matrículas
- Secretaria
- Finanças
- Comunicação
- Relatórios
- outros quando aplicável

### Perfis
Controlar disponibilidade:

- Aluno
- Encarregado
- Professor
- Pedagogia
- Direção
- Secretaria
- Finanças

### Branding
- nome;
- logo;
- cores;
- experiência visual;
- textos institucionais quando configuráveis.

### Demo Controls
- reset;
- seed scenario;
- mudar cenário demonstrativo;
- inspeção de eventos/audit demo.

### Support
- estado do sistema;
- build info;
- links de suporte;
- diagnóstico básico.

---

## 7. Segurança conceptual

O Super Admin é um nível acima dos papéis escolares.

```text
RIGHTWARE SUPER ADMIN
        ↓
INSTANCE / SCHOOL CONFIG
        ↓
SCHOOL ROLES
        ↓
student / guardian / teacher / pedagogy / executive / secretary / finance
```

Uma conta da escola não deve ganhar privilégios de Super Admin simplesmente por ser “Direção”.

**Direção ≠ Super Admin.**

---

## 8. Identidade visual

A consola deve manter identidade proprietária.

Sugestão:

- base escura/neutra;
- marca EduCore;
- indicação RIGHTWARE;
- sem adotar totalmente as cores da escola;
- mostrar a escola como **instância administrada**, não como dona da consola.

Isto reforça que o cliente usa o produto, mas a plataforma é operada pela RIGHTWARE.

---

## 9. Reutilização entre repositórios

O Super Admin é um excelente candidato a componente partilhado no futuro.

Curto prazo:

- portar o mesmo ecrã base para cada repo;
- manter alterações sincronizadas.

Médio prazo:

- extrair package interno;
- versionar;
- importar em todos os repos escolares.

Assim:

> **repos separados, Super Admin padronizado.**

---

## 10. Relação futura com ERP

Quando o ERP for separado, o Super Admin EduCore pode mostrar:

- estado da integração;
- versão do contrato/API;
- conectividade;
- sincronização;
- incidentes;
- permissões de integração.

Mas não deve duplicar toda a consola operacional do ERP.

---

## 11. Regra final

> **O Super Admin é uma superfície RIGHTWARE, não uma funcionalidade específica de tenant.**

Por isso deve existir em todas as implementações EduCore, mesmo quando cada escola tem repo e deployment próprios.

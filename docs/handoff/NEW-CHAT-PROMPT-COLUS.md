# Prompt para novo chat — EduCore COLUS

Usa este prompt no início de uma nova conversa:

---

Estamos a continuar o projeto EduCore / COLUS no repositório:

`rightware-corporations/educore-colegio_universo_dos_sonhos`

branch:

`main`

Antes de responder ou propor arquitetura, lê integralmente:

`docs/handoff/HANDOFF-COLUS-2026-10-03.md`

Depois lê os documentos obrigatórios indicados nesse handoff, especialmente os de arquitetura e o estado final da landing.

Não reconstruas decisões por memória e não comeces a programar.

O ponto exato onde paramos é:

```text
LANDING DESIGN               ✓
ASSETS                       ✓
MOTION SPEC                  ✓

STACK                        ← AGORA
BACKEND ARCHITECTURE         depois
DATABASE ARCHITECTURE        depois
SECURITY ARCHITECTURE        depois
FULL REPOSITORY TREE         depois
BOOTSTRAP / IMPLEMENTATION   só no fim
```

Restrições já dadas:

- frontend React + TypeScript + Vite;
- backend deve ser Java;
- PostgreSQL;
- Redis para cache;
- segurança deve ir muito além de JWT + password hashing;
- database deve ser tratada como arquitetura de primeira classe;
- preservar o modelo RIGHTWARE Distributed SaaS:
  - Control Plane central;
  - Data Plane isolado por escola;
  - Experience Plane personalizado;
  - 1 escola = 1 repo = 1 deployment;
  - Super Admin pertence à RIGHTWARE;
- não misturar dados operacionais das escolas no Control Plane;
- não meter frameworks reutilizáveis RIGHTWARE dentro da pasta específica COLUS;
- não definir a árvore final do repo antes de fechar stack/backend/database/security.

O chat anterior também recebeu um ficheiro `database_learn.zip` com referências sobre:

- sharding;
- partitioning;
- primary/foreign keys;
- indexes;
- relationships;
- SQL;
- normalization;
- transactions;
- ACID;
- scaling.

Os conceitos relevantes foram capturados no handoff. Usa-os como input, não como arquitetura literal.

Primeiro responde apenas com:

1. confirmação de que leste o handoff;
2. resumo curto do estado;
3. proposta de como vamos fechar **STACK V1** passo a passo.

Depois trabalhamos uma decisão de cada vez.

Quando fores alterar qualquer ficheiro existente no GitHub:

> faz fetch do SHA atual antes do update.

Não começar código até eu aprovar o gate técnico.
# EduCore COLUS — Database Architecture V1

> **Data:** 2026-10-03  
> **Estado:** BASE DE DADOS — ARQUITETURA ROBUSTA  
> **DBMS:** PostgreSQL  
> **Cache:** Redis

---

## 1. Material fornecido usado como checklist

O material enviado cobre conceitos fundamentais que entram diretamente nesta arquitetura:

- tables;
- primary keys;
- foreign keys;
- relationships;
- indexes;
- normalization;
- SQL queries;
- transactions;
- ACID;
- partitioning/sharing;
- replication;
- sharding;
- vertical scaling.

O vídeo também ilustra a distinção entre:

- **replication** para distribuir leituras;
- **sharding** para distribuir dados/escritas.

A arquitetura EduCore usa estes princípios, mas não aplica sharding prematuramente.

---

# 2. Boundary de dados

Decisão principal:

> **cada escola tem PostgreSQL operacional próprio.**

```text
COLUS
├── PostgreSQL COLUS
├── Redis COLUS
└── Object Storage COLUS

Escola B
├── PostgreSQL Escola B
├── Redis Escola B
└── Object Storage Escola B

RIGHTWARE
└── Control Plane PostgreSQL
```

O Data Plane não é uma base multi-tenant partilhada.

---

# 3. Schemas PostgreSQL

Proposta inicial:

```text
identity
people
academic
admissions
finance
communication
governance
integration
```

Isto organiza responsabilidades.

Não tratar schema PostgreSQL como principal security boundary.

---

# 4. Normalização

Core transacional:

> **normalizado por defeito.**

Usar 3NF como direção prática para:
- alunos;
- encarregados;
- relações;
- turmas;
- disciplinas;
- presenças;
- avaliações;
- pagamentos;
- documentos;
- permissões.

Não duplicar informação apenas para simplificar uma tela.

Para dashboards:

> criar projection/read models específicos quando necessário.

Desnormalização é uma otimização consciente, não o modelo primário.

---

# 5. Primary Keys

Padrão:

> **UUID para entidades de domínio.**

Regras:
- PK sempre explícita;
- IDs nunca derivados de dados pessoais;
- IDs públicos não revelam contagem interna;
- geração no boundary de aplicação ou biblioteca aprovada.

Tabelas append-heavy podem adotar chave sequencial interna adicional se houver ganho medido.

---

# 6. Foreign Keys

FKs reais no PostgreSQL.

Não confiar apenas na aplicação.

Regras:
- FK obrigatória quando existe relação real;
- `ON DELETE` escolhido conscientemente;
- evitar cascade delete global;
- indexar FKs usadas frequentemente em joins/lookups;
- não usar relações polimórficas sem constraint quando um modelo explícito resolve.

---

# 7. Constraints

Usar:

- `NOT NULL`;
- `UNIQUE`;
- `CHECK`;
- FK;
- constraints de domínio.

Exemplos:
- percentagem entre limites válidos;
- estados válidos;
- datas coerentes;
- uma matrícula ativa por regra definida;
- idempotency keys únicas.

A base participa da integridade, não é apenas armazenamento.

---

# 8. Indexes

Índice deve nascer de query real.

Padrões:

- PK;
- unique indexes;
- FK lookup indexes;
- composite indexes pela ordem de filtros reais;
- partial indexes para estados ativos;
- GIN/GiST apenas quando o caso exige.

Não indexar tudo.

Cada índice acelera leitura e aumenta custo de escrita/storage.

---

# 9. Queries

Regras:

- prepared parameters sempre;
- nada de SQL concatenado com input;
- paginação;
- `EXPLAIN (ANALYZE, BUFFERS)` em queries críticas;
- evitar N+1;
- projections para dashboards;
- limites explícitos em pesquisas.

SQL complexo pode viver em repository/query adapter sem poluir o domínio.

---

# 10. Transactions + ACID

Use cases de escrita importantes são ACID.

Default:

> PostgreSQL `READ COMMITTED`

Aumentar isolamento apenas para operações que realmente exigem.

Usar:
- optimistic locking com `version`;
- pessimistic lock apenas em hotspots concretos;
- `SERIALIZABLE` apenas em fluxos de alto risco onde o custo é justificado.

Não manter transação aberta enquanto chama API externa.

---

# 11. Outbox

Toda integração pós-commit importante usa transactional outbox.

Tabela conceptual:

```text
integration.outbox_event
├── id
├── aggregate_type
├── aggregate_id
├── event_type
├── payload
├── occurred_at
├── published_at
├── attempts
└── status
```

Commit de negócio + outbox ocorre na mesma transação.

---

# 12. Audit

Audit não é log técnico.

Tabela append-only:

```text
governance.audit_event
├── id
├── actor_id
├── action
├── resource_type
├── resource_id
├── context
├── ip_hash / metadata controlada
├── occurred_at
└── correlation_id
```

Runtime normal:
- INSERT;
- sem UPDATE/DELETE.

Retenção e export devem ser definidos separadamente.

---

# 13. Idempotency

Comandos críticos usam idempotency.

Exemplos:
- submissão de pagamento;
- validação de pagamento;
- upload;
- criação por integrações;
- webhooks.

Tabela/Redis pode manter idempotency key com:
- actor/client;
- endpoint/command;
- request hash;
- result reference;
- expiry.

---

# 14. Redis

Redis é:

- cache;
- session store quando BFF distribuído;
- rate limit;
- short-lived lock;
- idempotency acceleration.

Redis não é:
- ledger financeiro;
- student system of record;
- audit source of truth.

Padrão de chaves:

```text
educore:{instanceId}:{env}:{module}:{entity}:{id}
```

Usar TTL + jitter para evitar stampede sincronizado.

---

# 15. Segurança da base

## Network
- PostgreSQL e Redis em rede privada;
- sem acesso público direto;
- firewall/security group explícito.

## TLS
- conexão app → PostgreSQL cifrada;
- app → Redis cifrada onde suportado;
- certificados validados.

## At rest
- volume encryption;
- encrypted backups;
- provider/KMS managed keys quando disponível.

## Field-level
Para PII altamente sensível:

> envelope encryption no application/infrastructure boundary.

Não cifrar indiscriminadamente colunas que precisam de pesquisa/index.

## Credentials
Separar:
- migration owner;
- application runtime;
- read-only/reporting;
- backup/restore.

Aplicação nunca usa superuser.

---

# 16. Passwords

Preferência de produção:

> identidade externa / RIGHTWARE IAM.

Se existir password local:

- Argon2id;
- salt automático;
- parâmetros atualizáveis;
- nunca reversible encryption;
- nunca SHA simples.

---

# 17. Migrations

Decisão:

> **migrations não rodam com o mesmo utilizador da aplicação em produção.**

Pipeline:

```text
deploy
→ db migration job
→ verify
→ app rollout
```

Flyway executa com migration role.

Runtime app:
- sem DDL;
- apenas privilégios necessários.

---

# 18. Database repository layout

Fonte de verdade proposta:

```text
database/
├── migrations/
│   ├── versioned/
│   └── repeatable/
├── seeds/
│   ├── demo/
│   └── test/
├── policies/
├── views/
├── functions/
├── tests/
├── ops/
│   ├── backup/
│   ├── restore/
│   └── verify/
├── docs/
│   ├── erd/
│   ├── data-classification.md
│   ├── retention.md
│   └── naming-conventions.md
└── README.md
```

Produção:
- migration job lê esta pasta;
- aplicação não mantém schema paralelo escondido.

---

# 19. Backup / Disaster Recovery

Obrigatório:

- automated backups;
- WAL/PITR;
- encrypted backup storage;
- backup retention policy;
- restore drill;
- restore verification.

Target inicial a aprovar na fase de infra:

- RPO;
- RTO.

Não declarar um RPO/RTO comercial antes de infraestrutura real suportá-lo.

---

# 20. Replication, partitioning e sharding

Ordem de escala por escola:

```text
1. query/index tuning
2. connection pool tuning
3. vertical scaling
4. read replica
5. partition append-heavy tables
6. only then consider sharding
```

Porquê:

> o próprio modelo EduCore já distribui horizontalmente escolas em Data Planes independentes.

Logo, não precisamos shardear COLUS apenas porque o produto global tem várias escolas.

Candidatos futuros a partition:
- audit_event;
- notification_delivery;
- outbox history;
- high-volume activity logs.

---

# 21. Read replicas

Adicionar apenas quando leitura justificar.

Uso:
- reporting;
- analytics;
- dashboards pesados.

Não usar replica para fluxos que exigem read-after-write imediato sem estratégia explícita.

---

# 22. Connection pool

HikariCP.

Pool dimensionado com base em:
- DB max connections;
- número de app replicas;
- workload medido.

Não usar pool enorme “por segurança”.

---

# 23. Data lifecycle

Cada tabela deve ter política:

- retention;
- archive;
- delete/anonymize;
- legal hold quando aplicável.

Soft delete não é padrão universal.

Escolher por entidade.

---

# 24. Demo vs production

Demo seeds ficam separados.

```text
database/seeds/demo
database/seeds/test
```

Produção nunca carrega demo seed automaticamente.

---

# 25. Gate

Database Architecture V1 aprovada quando:

- Data Plane dedicado por escola;
- PK/FK/constraints reais;
- core normalizado;
- indexes orientados por queries;
- ACID e transaction boundaries definidos;
- outbox/audit/idempotency presentes;
- Redis não é source of truth;
- migrations separadas do runtime;
- backup/restore previsto;
- scaling segue medida antes de sharding;
- segurança da base é defense-in-depth.

Próximo:

> **SECURITY ARCHITECTURE V1**

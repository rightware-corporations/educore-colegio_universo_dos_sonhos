# COLUS — Presentation Build Scope V1

> **Estado:** APROVADO PARA IMPLEMENTAÇÃO FRONTEND  
> **Data:** 2026-10-03  
> **Prioridade:** personalização e validação comercial antes de produção.

## 1. Objetivo imediato

Construir uma demonstração frontend de alta qualidade para a apresentação COLUS, preservando a arquitetura futura mas sem bloquear a validação comercial com infraestrutura produtiva prematura.

A prioridade é:

```text
PERSONALIZAÇÃO COLUS
→ LANDING
→ PORTAL
→ 8 PERFIS
→ ESTADO DEMO PARTILHADO
→ WORKFLOWS CROSS-ROLE
→ POLISH / QA
→ APRESENTAÇÃO
```

Backend produtivo, database produtiva, hardening completo e provider definitivo de deployment ficam para a fase posterior à validação comercial.

## 2. Perfis escolares V1

1. Aluno
2. Encarregado
3. Professor
4. Pedagogia / Coordenação Académica
5. Receção / Atendimento
6. Secretaria
7. Finanças / SIGA ERP
8. Direção

O Super Admin RIGHTWARE permanece separado dos perfis escolares.

## 3. Responsabilidades essenciais

### Aluno
- horário semanal;
- disciplinas;
- avaliações;
- notas;
- assiduidade;
- conteúdos;
- trabalhos;
- comunicação;
- finanças visíveis.

### Encarregado
- visão 360º do educando;
- desempenho;
- assiduidade;
- horário semanal;
- pagamentos;
- documentos;
- chat professor ↔ encarregado.

### Professor
- opera apenas turmas e disciplinas atribuídas;
- presenças;
- avaliações;
- notas;
- trabalhos;
- conteúdos;
- plano de aula;
- comunicação com aluno/encarregado;
- não cria alunos nem constitui turmas.

### Pedagogia
Owner da gestão académica:
- classes;
- turmas;
- disciplinas;
- professores;
- atribuições;
- horários;
- aprovações;
- avaliações;
- publicação de notas;
- assiduidade;
- risco;
- intervenções;
- analítica.

### Receção
- receber;
- registar;
- protocolar;
- encaminhar;
- acompanhar pedidos;
- sem poderes para aprovar matrícula, notas ou pagamentos.

### Secretaria
- cadastro;
- documentação;
- admissões administrativas;
- matrícula/formalização;
- arquivo;
- declarações;
- certificados;
- transferências;
- processos.

### Finanças / SIGA ERP
- pagamentos;
- validação;
- faturação;
- obrigações;
- contas;
- devedores;
- recibos;
- multas;
- tesouraria;
- relatórios.

O ERP futuro deve evoluir para um sistema robusto e não ficar limitado a propinas.

### Direção
- visão executiva;
- académico;
- administrativo;
- financeiro;
- risco;
- relatórios;
- auditoria;
- aprovações excecionais;
- não funciona como operador universal.

## 4. Workflows P0

### Assiduidade
Professor → falta → aluno → encarregado → pedagogia → direção.

### Avaliação
Professor → avaliação/nota → pedagogia → aluno/encarregado → direção.

### Admissão e matrícula
Receção → secretaria → pedagogia → secretaria → finanças → encarregado.

### Financeiro
Encarregado → submissão → finanças → validação → recibo → encarregado → direção.

### Comunicação
Professor ↔ Encarregado, com contexto do educando.

## 5. Estratégia de reutilização do Páscoa

Páscoa é referência de produto e origem de componentes, não template COLUS.

### Portar
- primitives UI;
- componentes académicos;
- componentes de dashboard;
- chat;
- notifications;
- padrões responsive;
- padrões de routing.

### Adaptar
- role shell;
- páginas dos 7 perfis anteriores;
- login;
- navegação;
- financeiro.

### Criar novo
- landing COLUS;
- SchoolConfig COLUS;
- perfil Receção;
- shared demo state;
- workflows cross-role coerentes;
- experiência visual COLUS.

### Não portar
- tenant switching;
- tenant registry;
- experiência visual Páscoa;
- media Páscoa;
- multi-tenancy runtime legado.

## 6. Gate de implementação

Este documento autoriza o início do frontend da demonstração.

As decisões de produção permanecem separadas e serão retomadas depois da validação comercial.

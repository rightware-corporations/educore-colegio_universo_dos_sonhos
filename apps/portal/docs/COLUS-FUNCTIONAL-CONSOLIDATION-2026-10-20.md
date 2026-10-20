# COLUS Portal — Programa de consolidação funcional (2026-10-20)

**Autor:** RIGHTWARE / EduCore · **Branch:** `develop` · **Estado:** MVP pré-comercial (frontend demonstrativo)

## Porquê esta execução

O responsável solicitou aplicar a auditoria integral feita ao `educore.v1.1`, reutilizando capacidades e componentes adequados, mas **sem copiar a UI, a landing ou os dados do outro colégio**. O objetivo é deixar de apresentar páginas visualmente preenchidas mas sem fluxos. Trabalhos limitados a `apps/portal/**` e à documentação de handoff.

### Princípio de conclusão
`ação → mudança do estado → feedback → persistência no navegador → visibilidade ao papel seguinte → histórico auditável → QA`. Isto é **demonstração**, não autorização segura de servidor.

## Implementado neste ciclo

| Domínio | Funcionalidade adicionada / revista | Ecrãs / papéis | Limitação explícita |
| --- | --- | --- | --- |
| Académico | Chamada por aula e data (presente/falta/atraso), validação do dia da semana | Professor | Professor de referência fixo; sem autenticação real |
| Assiduidade | Justificação de ocorrência e aceitação/rejeição com motivo | Encarregado/Pedagogia | Apenas dados fictícios da sessão |
| Avaliações | Proposta de avaliação por turma/data; aprovação/rejeição; calendário publicado; publicação individual de notas | Professor/Pedagogia/Aluno/Encarregado | Notas ainda sem parametrização completa de ACS/ACP por turma |
| Aprendizagem | Materiais, trabalhos com vencimento, entrega textual, revisão com feedback, acompanhamento familiar | Professor/Aluno/Encarregado | Sem anexos ou armazenamento de ficheiros em produção |
| Secretaria | Cadastro filtrado por classe/estado, pesquisa por código, paginação 15/página, ficha individual com assiduidade, notas e documentos | Secretaria | Dados pessoais mínimos e fictícios |
| Documentos | Pedido, emissão de modelo, estado e histórico de referência | Secretaria | Não há geração de certificado oficial ou assinatura |
| Financeiro | Criar obrigação, comprovativo familiar, validar/rejeitar com motivo, visão de estados, pré-visualização claramente sem validade fiscal | Finanças/Encarregado/Direção | Sem ledger contabilístico, reconciliação ou recibo fiscal |
| Comunicados | Publicação geral/direcionada, confirmação de leitura | Pedagogia/Secretaria/Direção/Aluno/Encarregado | Sem push, email, SMS ou WhatsApp reais |
| Pedagogia | Intervenções com seguimento e conclusão | Pedagogia/Direção | Sem escalonamento institucional |
| Receção | Pedidos de atendimento, confirmação/cancelamento e deteção de horários confirmados já ocupados | Encarregado/Receção | Horário de referência, sem recurso de salas/funcionários reais |
| Direção | Indicadores derivados dos domínios, auditoria demonstrativa e exportação CSV de indicadores | Direção | Exportação local, não relatório certificado |
| Base de dados | Novas entidades `justifications`, `assessmentPlans`, `learningItems`, `workSubmissions`, `documents`, `notices`, `interventions`, `appointments` | `src/data/school.ts` e `state/DemoProvider.tsx` | `localStorage` apenas |
| Navegação | Novas rotas protegidas pelo perfil selecionado; Student continua sem finanças; link para ficha individual | Portal | Guardas no cliente não são RBAC de produção |

## QA adicional
`scripts/qa-browser.mjs` agora testa também:
- professor regista falta por sessão → família justifica → pedagogia aceita;
- professor propõe avaliação → pedagogia aprova → aluno consulta;
- professor publica trabalho → aluno entrega → professor devolve feedback → encarregado vê;
- secretaria emite documento modelo e consulta ficha individual;
- finanças gera obrigação → encarregado apresenta comprovativo → finanças valida;
- direção lê relatórios e auditoria;
- encarregado solicita atendimento → receção confirma → encarregado vê novo estado;
- exclusão financeira do Aluno e regressões de horários, mobile e landing.

### Ainda não concluído (priorizado)
**P0 antes de qualquer utilização real:** autenticação real por utilizador, permissões no backend, dados reais só com contrato e base legal, API, persistência institucional, isolamento e auditoria segura, migração e backups verificados, testes de penetração, validação curricular e dos preços/recibos pelo COLUS.

**P1 após validação institucional:** calendário académico e boletins completos com ACS1/ACS2/ACP conforme normas validadas, file upload seguro, reconciliação bancária, notificações reais, contas de todos os encarregados e professores, relatórios com filtros por período/ciclo, controlo de aprovações adicionais, expansão de horários, assiduidade e conteúdos a todas as turmas.

**P2 estratégico:** multi-tenancy da plataforma EduCore, faturação SaaS separada de finanças escolares, integrações externas, app móvel instalada e capacidades offline.

Não implementar funcionalidades de produção como se fossem parte desta sandbox. A referência `educore.v1.1` foi analisada, **não copiada integralmente**; preservar identidade e assets COLUS.

## Gate comercial
O objetivo é mostrar a integração entre funções com dados fictícios coerentes, recolher feedback por papel e confirmar o escopo e orçamento do produto real. **Landing pública aprovada bloqueada**; dois deployments distintos, sem merge na `main` e sem Railway neste ciclo.

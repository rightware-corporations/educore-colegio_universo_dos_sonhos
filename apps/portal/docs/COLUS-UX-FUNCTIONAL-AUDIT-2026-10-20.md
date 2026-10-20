# EduCore COLUS — Auditoria de profundidade funcional e visual (2026-10-20)

## Contexto e decisão
O responsável apresentou capturas Edge 1649×927 da área Pedagogia: `/classes`, `/assignments`, `/grades`, `/attendance` e `/schedule`.
Crítica confirmada: repetição de cabeçalhos e superfícies, atribuições visualmente idênticas a turmas, tabelas e cartões sem ações suficientes, turmas de 30 lugares com 1–2 alunos e excesso de texto de demo. Solicitou execução profissional e funcional, sem tocar na landing já aprovada.

## Entregue neste ciclo — V3 Pedagogia
- `/app/pedagogy/classes`: mapa operacional, pesquisa, criação de turma por classe/letra, configuração de lotação, ocupação, docentes e listagem de alunos
- `/app/pedagogy/staff`: diretório docente, pesquisa, registo de professor fictício com disciplina curricular e exposição das turmas atribuídas
- `/app/pedagogy/assignments`: matriz de atribuições por turma, validação de disciplina, impedimento de remoção de docente com aulas, colocação pedagógica dos alunos ainda sem turma
- `/app/pedagogy/timetable`: calendário semanal com ações de adicionar/remover aulas e prevenção de colisões de turma, professor ou sala
- `/app/pedagogy/grades`: gestão de avaliações com filtros por turma/estado, KPIs derivados do estado, publicação pela Pedagogia, gráfico por disciplina
- `/app/pedagogy/attendance`: visão de registos por turma/data, pesquisa de alunos, indicadores e gráfico
- Base `createSchool()` ampliada para 142 estudantes **fictícios gerados deterministicamente**, nas sete turmas base, aproximadamente 19–22 por turma. Os alunos centrais Tiago e Leonor continuam nos seus perfis. Docentes/encarregados fictícios, não dados reais do COLUS.
- O armazenamento demonstrativo passa a `colus.portal.sandbox.v3`. A mudança de versão prepara um cenário novo e não importa automaticamente a sandbox v2 do mesmo navegador.

## Evidência
- Portal e landing QA no HEAD `3d077aec` (antes deste documento):
  - [Portal 39401629394](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39401629394) — SUCCESS; screenshot archive `colus-portal-browser-qa` ID `12254684494`
  - [Landing 39401629377](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39401629377) — SUCCESS
- Chromium confirma criação de turma 8.ª A, registo de Hélio Macuácua, atribuição docente, marcação semanal e rejeição de horário em conflito, no mesmo cenário; regressões de Secretaria e Aluno sem Finanças continuam PASS.
- Diff `01ce4a3..3d077aec`: 7 ficheiros, todos dentro de `apps/portal/`. Nenhum `frontend/**`, media, Hero, copy ou landing foi alterado.

## Faltas reais: âmbito da aplicação completa
### P0 — Próximo ciclo do protótipo comercial
1. **Secretaria**: listagem paginada, filtros por classe/estado, ficha individual, documentação e sequência efetiva admissão→matrícula
2. **Professor**: turmas atribuídas, horário real da sandbox, chamada por aula/turma, avaliações por disciplina com estado de revisão e trabalhos
3. **Encarregado**: alternância entre múltiplos educandos, calendário, mensagens e alertas por filho, recibo **ilustrativo** claramente sem validade fiscal
4. **Aluno**: horário e trabalhos derivados da turma; nunca apresentar finanças
5. **Finanças**: lançamentos e gestão de obrigações fictícias, filtros de vencimento, comprovativos e histórico coerente; não inventar recibos reais
6. **Direção**: relatórios por período/ciclo, indicadores agregados verificáveis, alertas de processo e exportação de relatório de avaliação
7. **Receção**: atendimento, pedidos e marcações; motor de marcações aplicável após adaptação de recursos, serviços e horários
8. **Experiência transversal**: pesquisa, filtros, paginação, notificações associadas, feedback de ações, vazios, estados de erro, auditoria demo, responsividade e acessibilidade
9. **Pedagogia**: melhorias posteriores em opções curriculares e carga letiva; confirmação da oferta verdadeira da 1.ª à 12.ª com o COLUS

### P1 — Apenas depois de validação comercial
Autenticação real, RBAC/ABAC no backend, isolamento tenant, base de dados, histórico seguro de auditoria, cargas horárias oficiais por classe e modalidade, pagamentos reais, operações de produção, comunicações externas e retenção legal de dados.

## ZIP fornecido: `scheduling-template.zip`
Inspecionado: engine de marcações de uma barbearia (services/resources/appointments; localStorage, overlap, BookingFlow), 17 itens. **Não é um motor de horários letivos** e não deve ser copiado para o timetable escolar sem reengenharia. Pode ser aproveitado futuramente para agendamento de reuniões e atendimento de pais na Receção; requer adaptação de recursos, duração, estados, segurança e fusos.

## Restrições imutáveis
Landing aprovada e intocável; deploys e builds landing/portal separados; sem merge `main`, criação de branch ou eliminação de backups. Nada de dados escolares reais na sandbox. QA não implica aprovação estética institucional.

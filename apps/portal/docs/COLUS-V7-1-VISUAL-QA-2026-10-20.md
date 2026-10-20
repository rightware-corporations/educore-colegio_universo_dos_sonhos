# COLUS — Revisão visual V7.1 e regressão de Agendamentos
Data: 2026-10-20 · Entidade: RIGHTWARE/EduCore · Branch: `develop`

## Objetivo e limites
Revisar artefactos reais dos GitHub Actions de V7, reforçar a qualidade de navegação e demonstrar visualmente os novos módulos. **Não modificar o Hero, composições, fotografia, vídeos, textos e identidade da landing aprovada.** A integração pública de agendamentos não deve aparentar disponibilidade enquanto não houver API partilhada configurada.

## Evidências realmente analisadas
- `COLUS Portal Demo QA` [39477317664](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39477317664): PASS, base V7. Capturas do Professor, Secretaria mobile, Pedagogia e horários.
- `COLUS Frontend QA` [39477317729](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39477317729): PASS, landing 390/440/768/1024/1440.
- `COLUS Scheduling API QA` [39477001023](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39477001023): PASS, criação de booking público, prevenção de sobreposição, autenticação da fila de Receção, confirmação e cancelamento PostgreSQL.
- `COLUS Portal Demo QA` [39481310288](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39481310288): PASS, capturas adicionais dos ecrãs V7 (`v7-professor-pauta-9A-desktop.png`, `v7-professor-pauta-11B-desktop.png`, `v7-professor-tpc-desktop.png`, `v7-aluno-tpc-desktop.png`, `v7-recepcao-agendamentos-desktop.png`, `v7-professor-pauta-mobile-390.png`, `v7-aluno-tpc-mobile-390.png`).
- `COLUS Frontend QA` [39481475177](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39481475177): PASS, screenshots do agendamento público a 1440 e 390 px, sem JavaScript errors nem overflow; com API ausente, formulário bloqueia reserva e mostra mensagem honesta.

## Problemas visuais confirmados
1. A pauta do Professor mobile mostrava todos os 19 alunos da turma 9A de uma só vez, produzindo ecrã demasiado longo e informação pouco hierarquizada.
2. Os três indicadores de TPC do Aluno apareciam em três cartões verticais, ocupando demasiada área útil antes das tarefas.

## Correções executadas
- `Gradebook.tsx`: pesquisa + paginação em blocos de 8 alunos, com reset correto ao alterar turma ou pesquisa; tabela preservada em desktop; cartões acessíveis no mobile com registos, última nota e estado de publicação. Botões Anterior/Seguinte e contador.
- `LearningWorkflows.tsx`: estatísticas mobile em grelha compacta (2 + 1) e ajuste da altura do Hero mantendo a hierarquia visual COLUS.
- `apps/portal/scripts/qa-browser.mjs`: screenshots específicos por rota, verificação de 390 px, ausência de overflow e navegação entre páginas da pauta.
- `frontend/scripts/qa-public-booking-browser.mjs`: screenshot `agendar-1440.png` e `agendar-390.png`, sem API, CTA público desativado e retorno à landing; integrado no workflow de frontend e respetivo artefacto.

## QA final nesta revisão
- `COLUS Portal Demo QA` [39482111096](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39482111096) **SUCCESS**, commit `a7df1fb`. Build/contratos/Chromium, paginação mobile e regressões do portal.
- `COLUS Frontend QA` [39482110994](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39482110994) **SUCCESS**, commit `a7df1fb`. Landing, audit de cenas e nova rota de booking.
- Resultados observados: sem overflow horizontal a 390 px no Professor, Aluno e rota `/agendar`. Capturas não constituem aprovação visual oficial do COLUS.

## Pendências e decisões necessárias
- **Demonstração**: apresentar e recolher feedback da escola para turmas, disciplinas, workflow de notas, formatos de entrega de TPC e duração/recursos de slots.
- **Infraestrutura**: agendamento público ainda não sincroniza dois deploys reais por falta de URL/credenciais PostgreSQL e configuração de domínios; o teste de integração em CI usa serviço PostgreSQL temporário, não plataforma publicada.
- **Produção**: autenticação, RBAC server-side, object storage seguro, tratamento de dados de menores, validação curricular, backups, consentimento RGPD/legislação aplicável e notificações.
- **Restrições**: não criar branch sem necessidade, não efetuar merge, deployment nem modificar `main` sem ordem explícita. Não apagar backups nem alterar identidade/landing aprovada.

**Estado**: melhoria visual técnica concluída, revisão institucional pendente.

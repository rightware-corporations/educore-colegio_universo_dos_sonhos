# COLUS · Portal interno V6 — Auditoria de UX e correções operacionais (2026-10-20)

**Situação:** implementação na `develop`; landing oficial imutável. **Tipo de entrega:** demonstração comercial, não sistema de produção.

## Origem e evidências
O responsável pediu continuação após a auditoria abrangente de funcionalidades do `educore.v1.1`. A revisão do código e dos fluxos da V5 revelou três problemas no dashboard que os testes antigos não captavam:

1. **Professor:** chamada rápida com data fixa `2026-10-20` e sem seleção de aula, diferente do módulo real de chamada por aula/data.
2. **Finanças:** atalho de validação direta contornava a fila administrativa e a apresentação prévia de um comprovativo submetido.
3. **Encarregado:** aviso de falta baseado apenas numa data fixa podia declarar ausência de alertas apesar de existirem faltas ou atrasos sem justificação.

## Alterações V6 concluídas
### Dashboards específicos por papel
`src/components/DashboardActionCenter.tsx` cria filas de prioridades ligadas à store do portal:
- Professor: turmas e aulas associadas, trabalhos por rever, avaliações propostas; link para seleção de aula/chamada correta.
- Encarregado: cartões independentes por filho, ocorrências não justificadas e obrigações financeiras acessíveis apenas à família.
- Secretaria: admissões, alunos sem turma e documentos pendentes.
- Pedagogia: propostas de avaliação, justificações e colocações em turma.
- Finanças: comprovativos submetidos e obrigações pendentes, **sem validação no dashboard**.
- Receção: admissões e marcações pendentes.
- Direção: pendências e acesso aos relatórios.
- Aluno: trabalhos e calendário avaliativo, sem finanças.

`src/pages/Workspace.tsx` substitui os antigos cartões de chamada, finanças e alerta familiar, adota apresentação institucional mais distinta nos dashboards e remove a data editorial fixa.

### Navegação e mobile
`src/components/RoleShell.tsx` usa ícones semânticos no menu, quatro prioridades mobile diferentes por papel, rótulos corretos em rotas internas como `/students/:id`, contador familiar baseado em ocorrências por resolver e avisos ainda não lidos, e confirmação antes de restaurar os dados fictícios.

`src/pages/SchoolModules.tsx` apresenta quatro indicadores no cadastro, pesquisa, filtro por classe e paginação de 15 alunos; no mobile substitui a tabela de scroll horizontal por fichas compactas com consulta, edição e arquivo. O FinanceDesk antigo encaminha validações para o módulo próprio e não permite validar um pagamento diretamente.

### Continuidade de contexto familiar
`src/pages/GuardianChildren.tsx` disponibiliza uma ficha individual com indicadores por educando; `src/state/useGuardianChildSelection.ts` conserva a seleção fictícia de Tiago/Leonor durante a navegação. A seleção inicia por `?child=<id>` e persiste em `sessionStorage` **apenas no navegador**. Horário semanal, Notas, Avaliações, Trabalhos e Justificações reutilizam a seleção. Isto não é autenticação real nem restrição forte de dados no servidor.

## Verificação
- [Portal V6 Chromium + build + contrato — run 39465661340](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39465661340): **SUCCESS** no commit `02cddf8`.
- [Landing QA base V6 — run 39464787835](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39464787835): **SUCCESS** no commit `6a5ef23`, com verificação posterior em curso.
- QA ampliado: validação de chamada pela aula, envio de comprovativo pela família → Finanças valida via fila, cadastro e tabelas desktop, fichas mobile e sem overflow horizontal, seleção do educando em Horário/Notas/Trabalhos e exclusão das finanças do Aluno.
- Diff de `7e435d2` até `02cddf8`: **11 ficheiros, todos sob `apps/portal/**`**. Nenhum ficheiro `frontend/**`, vídeo, imagem, texto institucional da landing, Hero, backup ou `main` foi modificado.

## Dependências e pendências
**P0 de apresentação:** obter aprovação visual em Edge desktop e mobile de todos os novos cartões; rever estados de formulários, focos de teclado e consistência de navegação em contexto real.

**P1 funcional demonstrativo:** substituir identidades fixas `ALU-001`, `PROF-001` e `ENC-001` por um mecanismo de sessão fictícia selecionável; adicionar calendário escolar e distribuição de avaliações por ciclos; rever regra de chamadas para exceções institucionais; aperfeiçoar filtros, confirmação e histórico de ações. Nenhuma destas melhorias transforma a demo em produto real.

**Produção — não implementada:** API, backend e base de dados segura, autenticação, RBAC/ABAC, isolamento multiutilizador/multitenant, transmissão de notificações, faturação bancária ou fiscal, documentos oficiais, retenção/auditoria segura e validação curricular com COLUS.

## Restrições preservadas
NÃO modificar landing aprovada `frontend/**` ou `main`; NÃO fazer merge, apagar backups, criar branches desnecessárias ou publicar sem autorização. Em trabalho, usar `develop` e `apps/portal/**`. Reutilizar do EduCore v1.1 funcionalidades bem modeladas; **não replicar UI nem importar dados de outro colégio**.

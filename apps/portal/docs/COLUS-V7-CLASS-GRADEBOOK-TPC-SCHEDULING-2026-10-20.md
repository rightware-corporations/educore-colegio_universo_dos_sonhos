# COLUS — V7 · Gestão docente por turma, TPC com anexos e scheduling público
Data: 2026-10-20 · Responsável de execução: RIGHTWARE/EduCore · Branch: `develop`

## Pedido
Screenshots revelaram que as notas eram lançadas a partir de uma lista global, TPC mostrava uma caixa de texto mas nenhum upload e a Receção apresentava uma fila vazia. Foi enviado `scheduling-template.zip` com motor genérico de slots, reserva, estados, sobreposições e `localStorage`. O utilizador decidiu que **o trabalho do Professor deve estar sempre organizado por turma** e que **o agendamento público da landing deve refletir-se na Receção**, preservando a landing aprovada.

## Resultado implementado

### Ensino
- `apps/portal/src/pages/Gradebook.tsx`: diário de notas por turma, filtragem do elenco, alunos da turma selecionada, disciplina do docente, nota 0–20, estado publicado/em revisão. Permissões de demo continuam baseadas em `PROF-001`; não afirmar multiutilizador.
- Visualização distinta para Aluno e Encarregado com cartões por disciplina e médias de resultados já publicados.
- `SchoolModules.tsx`: Minhas turmas mostra apenas as turmas atribuídas ao Professor, e links contextuais `?class=` encaminham à pauta e conteúdos.
- `LearningWorkflows.tsx`: materiais e TPC por turma, publicação do Professor, lista de trabalhos, upload de anexo opcional, submissão pelo Aluno com texto ou ficheiro, download na revisão e feedback partilhado com família.
- Extensão do domínio em `school.ts`/`DemoProvider.tsx` com `DemoAttachment`, validações do nome, MIME e 512 KB. Os dados binários são guardados como data URL em `localStorage` **só para apresentação**; para produção usar object storage, validação do conteúdo e limites configuráveis. PDFs, DOCX, JPG, PNG e TXT.

### Website independente
- Nova rota isolada `/agendar` em `frontend/src/pages/PublicBookingPage.tsx` carregada por lazy loading; percurso: serviço → dia útil → slot livre → nome/email/telefone → número de referência.
- Apenas o `href` do CTA institucional existente «Marcar uma visita» no `ContactFooter` passou de `mailto:` para `/agendar`. Não se alteraram Hero, composições, vídeo, logo, secções, textos, layout, identidade ou CSS da landing.
- Quando a API não está configurada, a página apresenta os serviços apenas como pré-visualização e **bloqueia a confirmação**; sem bookings fantasmas.

### Serviço de agendamentos partilhado
- Serviço independente em `apps/scheduling-api/`, com PostgreSQL e API HTTP (Node 20+). Adapta o motor enviado pelo utilizador, deixando de usar `localStorage` como suposta fonte partilhada.
- `GET /v1/services`, `GET /v1/slots`, `POST /v1/bookings`, `GET /v1/bookings` e `PATCH /v1/bookings/:id`.
- Dias úteis 08:00–16:00 (configuração inicial ilustrativa, pendente de validação COLUS); passos de 15 min, duração de 30/45 min por serviço, fuso `Africa/Maputo`, exclusão de reservas sobrepostas (incluindo pending/requested) e horários passados.
- API usa transação PostgreSQL e `pg_advisory_xact_lock` por data para evitar reservas concorrentes conflitantes, validação de payload, origens CORS configuradas e limite básico de pedidos em memória.
- Página Receção `ReceptionPublicBookings.tsx` visualiza pedidos de origem pública, confirma, cancela, conclui e vê slots disponíveis. Requer `VITE_COLUS_SCHEDULING_API_URL` igual em frontend e portal e `RECEPTION_TOKEN` introduzido manualmente em runtime. Token não é empacotado nem persistido no cliente.
- `SchoolAppointments.tsx` mantém separada a fila **interna fictícia**, agora com dois registos de referência em seed (confirmado e cancelado) para demonstrar estados, sem confusão com pedidos reais.

## Estado de integração
**Código criado, integração remota pendente de infraestrutura.** Não existe deploy, URL de API, PostgreSQL operacional ou credencial de Receção definida nesta fase. Dois Vite apps em `localhost` não partilham `localStorage`; comunicação real só após configuração da API comum.

## Segurança e limitações
- Backend/portal não têm sessão/autenticação institucional ou RBAC server-side; token manual é mecanismo de integração controlada, não controlo final de produção.
- Não colocar nomes/dados reais de menores no ambiente demo antes da implantação de segurança, política de privacidade, backup e autorização.
- A landing pública e os dois deploys continuam independentes. **Não alterar `main`, não efetuar merge, não apagar branches, nem publicar sem autorização explícita.**
- Horários, serviços, duração, canais de notificações e critérios de agendamento necessitam de aprovação do COLUS.
- Teste de registos de notas e upload no Chromium; `apps/scheduling-api` tem QA de slots com Node `node:test`. Ver GitHub Actions para estado real atualizado.

## Próximos gates
1. Validar visual e funcionalmente no Edge: `/app/teacher/classes`, `/app/teacher/grades?class=CL-09-A`, `/app/teacher/learning`, `/app/student/assignments`, `/app/reception/appointments`, `/agendar`.
2. Confirmar e aprovar os serviços horários oficiais, janelas, disponibilidade por recurso e política de cancelamento.
3. Definir infraestrutura PostgreSQL + API partilhada, CORS para os dois domínios, TLS, autenticação por utilizador e proteção de dados.
4. Publicar somente após aprovação e verificar booking público → Receção → mudança de estado → reconsulta, entre dispositivos e navegadores distintos.

# COLUS — Preparação de publicação e limpeza da Receção
Data: 2026-10-20 · Projeto: EduCore/COLUS · Entidade: RIGHTWARE · Branch: `develop`

## Decisão
Antes de qualquer deploy de demonstração, nenhuma instrução de desenvolvimento, variável de ambiente ou referência a PostgreSQL, API, tokens ou infraestrutura deverá aparecer para os utilizadores na Receção. Preservar a separação de aplicações: landing e portal com publicações distintas. A ligação de reservas só deverá ser exibida como operacional quando existir infraestrutura funcional.

## Interface corrigida
- `ReceptionPublicBookings.tsx`: o painel de reservas públicas não é mostrado quando `VITE_COLUS_SCHEDULING_API_URL` está ausente. As credenciais, quando necessárias, são apresentadas como «Código de acesso» (sem jargão). Estados e erros mostrados aos utilizadores são legíveis e não expõem detalhes de implementação. Mantido o trabalho real do backend e fluxo de confirmação/cancelamento quando configurado.
- `SchoolAppointments.tsx`: removidos textos «cenário demonstrativo» e «sem notificações externas» das secções operacionais; títulos orientados à Receção, com «Atendimentos da escola» e consultas existentes.
- `frontend/src/pages/PublicBookingPage.tsx`: ausência do serviço é comunicada de modo profissional e sem jargão: «As marcações online estão temporariamente indisponíveis». Está disponível o contacto por email `info@colus.ac.mz` como alternativa, mantendo a submissão pública bloqueada até haver slots reais.
- Modo de demonstração do portal **mantido** porque o portal continua sem autenticação institucional e sem base de dados multiutilizador. O selo identifica corretamente registos de ensaio, evitando apresentar uma sandbox como sistema real.

## QA e evidência
- Teste de contrato do portal proíbe instruções de configuração na Receção.
- Teste Chromium verifica que, sem API, não se apresenta «Agenda de visitas» nem se revelam instruções técnicas na rota `/app/reception/appointments`. A página continua utilizável para marcações internas da demonstração.
- Teste Chromium da landing verifica /agendar em 390 e 1440 px, ausência de informação de backend e bloqueio da submissão sem serviço real.
- Consultar os runs automáticos mais recentes da `develop` antes de considerar a alteração aprovada.

## Configuração de hosting para futura publicação

| Aplicação | Diretório base | Build | Artefacto | SPA fallback |
|---|---|---|---|---|
| Landing | `frontend` | `npm install && npm run build` | `dist` | Redirecionar rotas desconhecidas para `/index.html` |
| Portal | `apps/portal` | `npm install && npm run build` | `dist` | Redirecionar rotas desconhecidas para `/index.html` |
| API de scheduling | `apps/scheduling-api` | `npm install` | Node 20+ `npm start` | Serviço HTTP, requer PostgreSQL |

*Landing e portal são dois deployments independentes. O scheduling (terceiro serviço) não está publicado nesta fase.* No serviço partilhado, configurar `DATABASE_URL`, `ALLOWED_ORIGINS` dos dois domínios, `RECEPTION_TOKEN` e HTTPS. Nas duas aplicações, `VITE_COLUS_SCHEDULING_API_URL` deve apontar para o mesmo serviço quando for publicado e validado.

## Condições antes de disponibilizar a terceiros
1. Decidir destino dos dois deployments e configurar fallback de rotas SPA da plataforma escolhida.
2. Executar `typecheck`, contrato, build e Chromium QA em `develop` e rever capturas.
3. **Demonstração externa**: usar apenas dados fictícios; identificar o caráter de demonstração.
4. **Operação real**: bloqueada até autenticação real, permissões de servidor, base de dados de produção, proteção de dados de menores, armazenamento seguro, backups e regras oficiais do colégio.
5. **Reservas públicas reais**: dependem da API partilhada, validação de horários e autenticação segura de Receção. O token manual atual é adequado apenas para testes técnicos controlados e não deve ser o controlo final de produção.

Restrições históricas: não modificar `main` nem fazer merge/deploy sem autorização específica, não eliminar backups, assets ou PRs históricos.

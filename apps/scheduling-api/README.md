# COLUS Scheduling API — serviço separado
Implementação independente, adaptada do algoritmo de slots e sobreposições do ZIP fornecido (scheduling-template), com persistência PostgreSQL e horário fixado em **Africa/Maputo**. Não utiliza localStorage como fonte comum.

## Endpoints
- `GET /v1/services`: tipos de atendimento, duração e janela de horários.
- `GET /v1/slots?date=YYYY-MM-DD&serviceId=visit`: slots de segunda a sexta, 08:00–16:00, com incrementos de 15 minutos, exclusão de reservas sobrepostas e horários passados.
- `POST /v1/bookings`: receção de pedido público; devolve referência; status `requested`.
- `GET /v1/bookings`: lista da Receção, protegida por header `Authorization: Bearer <RECEPTION_TOKEN>`.
- `PATCH /v1/bookings/:id`: Receção confirma, cancela ou conclui.

## Desenvolvimento
Instalar dependências com `npm install`, configurar `DATABASE_URL`, `RECEPTION_TOKEN` (mínimo 24 carateres) e `ALLOWED_ORIGINS`; `npm start`. A tabela é criada na inicialização. Landing e portal devem receber a mesma URL via `VITE_COLUS_SCHEDULING_API_URL`.

**Não está publicado nem conectado automaticamente.** Sem esse URL a landing mostra estado indisponível e a Receção continua com as marcações locais de demonstração. O token é introduzido manualmente em sessão na Receção e nunca colocado em VITE ou no bundle. Para produção substituir por login de equipa/RBAC, gateway, captcha/proteção anti-spam, consentimento de dados, notificações, logs e backups. PostgreSQL exige DATABASE_URL real.

## Testes automatizados

`npm test` valida sintaxe HTTP, slots e sobreposição (incluindo pedidos pendentes), horários passados em Africa/Maputo, dias úteis e cancelamentos. Workflow: `.github/workflows/colus-scheduling-api-qa.yml`.

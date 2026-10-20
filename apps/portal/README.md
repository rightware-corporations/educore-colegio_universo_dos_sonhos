# COLUS · Portal escolar independente — V2 de avaliação

**Estado:** demonstração comercial frontend. A landing institucional (`frontend/`) está aprovada e congelada.

Aplicação em `apps/portal/` com build e deployment próprios, sem dependência operacional da landing.
Base de referência: `aevumlux1-rwbot/educore.v1.1` (branch `tenant/colegio-pascoa-live`).
Componentes reutilizados: `StatsCard`, `QuickActionCard`, `PageContainer`, `ScheduleCard`.

## Arranque

```bash
cd apps/portal
npm install
npm run typecheck
npm run test:contract
npm run build
npm run dev
```

## Rotas

- `/`: splash exclusivo do portal (breve; motion reduzida quando solicitado);
- `/welcome`: capa institucional COLUS;
- `/login`: seleção de papel sem senha — **exclusivamente demonstrativa**;
- `/app/:role/:section`: oito experiências escolares com navegação própria.

## Modelo de dados V2

- **Catálogo 1.ª–12.ª** como referência configurável, NÃO declaração de oferta real de turmas.
- Turmas ATIVAS na demo, estudantes, famílias, cinco professores fictícios e vínculos coerentes.
- Secretaria pode criar, editar e arquivar alunos; não há eliminação irreversível.
- Receção regista/encaminha candidaturas; Secretaria formaliza a matrícula e gera registos; Pedagogia atribui turmas.
- Professor regista presenças e lança notas restritas às turmas/disciplina do seu perfil.
- Pedagogia publica resultados para Aluno e Encarregado.
- Encarregado acompanha apenas os seus educandos e os respetivos pagamentos.
- Finanças valida pagamentos fictícios; Direção vê indicadores agregados.
- **Aluno não tem acesso a Finanças**, nem via menu, nem via rota de perfil.
- Dashboards e gráficos derivam dos registos do cenário, não de estatísticas reais do COLUS.

Referências curriculares: https://www.mec.gov.mz/documentos.php e INDE/PCEP 2020.
A matriz do secundário sofreu revisões em 2025–2026 e exige confirmação por classe, área, opção e carga horária junto do COLUS.

## Limites e proteção de dados

- **Não é sistema produtivo:** sem identidade de servidor, credenciais verificadas, API, base de dados, transações reais ou isolamento forte de utilizadores.
- Os dados são completamente fictícios. Nunca inserir nomes/dados reais de alunos ou credenciais.
- O estado fictício da sandbox persiste em **localStorage**, no navegador utilizado, para manter a demonstração após refresh. O papel selecionado fica em sessionStorage. O botão de reset restaura o dataset inicial.
- Os filtros de interface por role são ilustrações funcionais e não autorização segura. Uma plataforma pública com dados reais exigirá backend e RBAC/ABAC no servidor.
- A matrícula, pagamentos e notas só são operações simuladas locais; os gráficos não representam números do colégio.

## Qualidade

`npm run typecheck`, `npm run test:contract`, `npm run build` e `node scripts/qa-browser.mjs` via GitHub Actions.
O browser QA testa fluxos cross-role, criação/edição/arquivo, atribuição pedagógica, isolamento financeiro do aluno e responsividade mobile a 390px.

## Deploy

Este projeto admite deployment estático independente, root `apps/portal`, build `npm run build`, output `dist`, com rewrite SPA de `/*` para `/index.html`. Não há deployment autorizado/configurado nesta fase, e o Railway está sem créditos.
Não modificar as configurações nem os ficheiros da landing. A landing congelada contém rotas antigas demo que devem ser tratadas ao nível de infraestrutura em deployments separados, sem alteração ao frontend aprovado.

# COLUS · Portal de demonstração independente

**Estado:** demo comercial frontend. Não utilizar com dados escolares reais.

Este frontend é independente da landing institucional em `frontend/`. 
A landing aprovada não foi modificada. Reutiliza componentes e padrões de UI da base
`aevumlux1-rwbot/educore.v1.1` (branch `tenant/colegio-pascoa-live`), adaptados à identidade COLUS.
Exemplos: `StatsCard`, `QuickActionCard`, `PageContainer` e `ScheduleCard`.

## Desenvolvimento

```sh
cd apps/portal
npm install
npm run typecheck
npm run test:contract
npm run build
npm run dev
```

### Entradas
- `/`: splash curto (reduzido/desativado com reduced motion).
- `/welcome`: capa exclusiva do portal, independente da landing.
- `/login`: selecção clara de um dos oito perfis **para demonstração**.
- `/app/:role/dashboard`: dashboards por perfil e módulos demo.

O estado é simulado em `sessionStorage` apenas na sessão do browser.
**Não há autenticação real, API ou base de dados, e não são aceites dados reais.**
O acesso aos dados demo não é controlo de permissões de produção.

## Deploy independente
Serviço de alojamento estático: diretório raiz `apps/portal`, comando de build `npm run build`,
pasta de saída `dist`. É obrigatório fallback SPA para `index.html` em rotas profundas.
Não reutilizar configurações do deploy da landing.

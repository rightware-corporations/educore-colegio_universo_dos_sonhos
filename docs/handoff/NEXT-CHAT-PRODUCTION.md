# COLUS — HANDOFF OPERACIONAL DE PRODUÇÃO
**Atualizado:** 19-10-2026
**Autoridade:** decisão explícita do responsável, não hipótese.

## Missão do próximo chat
Atuar como engenheiro/produto na finalização e produção do website COLUS. **Não criar branches, não voltar a planear Gitflow, não fazer novos PRs de feature por rotina.** A política permanente é `main` (estável) e `develop` (produção/validação). Trabalhar sobre o código e QA do produto.

## Fonte única
- Projeto: `rightware-corporations/educore-colegio_universo_dos_sonhos`
- Para engenharia e produção: branch `develop`. `main` é estável e não deve receber alterações até aprovação da publicação.
- Handoff detalhado `docs/handoff/HANDOFF-COLUS-CURRENT.md`, §41 prevalece sobre planos de branches anteriores.
- Referência visual: `landing-colus-master-plus.drawio` (se o ficheiro local expirar, solicitar reenvio para confronto exato; não substituir por inferência).
- QA: `.github/workflows/colus-frontend-qa.yml` e scripts `frontend/scripts/qa-desktop-master-plus.mjs`, `qa-desktop-state-audit.mjs`, `qa-desktop-reverse-motion.mjs`, mais QA mobile.

## Decisões protegidas
1. Não alterar imagens, vídeos, posters, media `src`, copy, logo/branding, Hero e composição mobile aprovada sem autorização explícita.
2. A animação não pode ser julgada pela presença de dots, rings e linhas: validar **fidelidade editorial** ao Master, enquadramento humano, não colisão com textos, cinco fases de Pertencer, quatro cenas de Futuro, efeitos de ligação entre secções, scroll lento, inverso e reduced motion.
3. O fundo claro Warm Paper mantém-se em Pertencer; Community Ring pontilhado laranja e ABERTO, seis nós contextuais redondos e um nó ativo. Headline/descrição no interior da elipse. `useScrollOpacity.ts` corrige opacidade de cenas associada ao scroll.
4. A `main` não foi promovida no processo de consolidação. Publicação exige validação visual do responsável e testes finais.

## Ordem de trabalho (produto, não branches)
1. Inspecionar website em viewport 1440×900 e 1024×768 e em mobile; consultar resultados Chromium mais recentes.
2. Afinar qualidade visual restante do Master Plus — especialmente Pertencer, handoffs e ritmos de transição — apenas se evidências do Edge/Chromium mostrarem falhas. Preservar todos os media/textos.
3. Confirmar acessibilidade/reduced-motion, responsividade, performance, acessibilidade do teclado e integridade de imagens.
4. Pedir signoff visual editorial; só então discutir publicação. Não disparar merge para `main` sem aprovação.

## Gestão Git
A consolidação de features em `develop` foi efetuada pela criação de `develop` a partir do último HEAD da antiga branch desktop, que continha também todos os commits da branch mobile. Branches históricas/temporárias foram identificadas como ancestrais. **O novo chat não deve executar a limpeza de branches; ela pertence exclusivamente à sessão de consolidação atual.** Confirmar qualquer limpeza em GitHub antes de afirmar que só existem `main` e `develop`.

## Comunicação
Responder em português profissional, direto, com resultados verificáveis. Distinguir decisão oficial, execução e pendências; não declarar conclusão visual por PASS técnico.

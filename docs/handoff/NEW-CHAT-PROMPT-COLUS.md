# Prompt de continuidade — EduCore / COLUS

Estamos a continuar o projeto EduCore / COLUS no repositório:
`rightware-corporations/educore-colegio_universo_dos_sonhos`, branch de integração `main`.

**Antes de responder ou modificar código, lê integralmente os handoffs pela ordem cronológica indicada em:**
https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/blob/main/docs/handoff/README.md

1. `docs/handoff/HANDOFF-COLUS-2026-10-03.md` — base de produto e arquitetura;
2. `docs/handoff/HANDOFF-COLUS-2026-10-04-CONTINUATION.md` — histórico da implementação;
3. `docs/handoff/HANDOFF-COLUS-2026-10-16.md` — contexto recente completo, Ciência/Footer/QA;
4. `docs/handoff/HANDOFF-COLUS-CURRENT.md` — estado operacional vivo; **ler por último**.

Não executar a secção `NEXT TASK` de handoffs antigos se for ultrapassada pelo estado mais recente. Verifica sempre a HEAD real da `main`, código atual, commits e specs antes de propor alterações. Se um documento divergir do código, assinala a discrepância.

**Estado de continuidade em 2026-10-16:** a landing COLUS **não está concluída**. Hero original e vídeo aprovados são intocáveis sem autorização. Copyright institucional **© 2026 Colégio Universo dos Sonhos. Todos os direitos reservados.** EduCore/RIGHTWARE são assinatura tecnológica, não titulares da escola. Footer Dark, lockups, favicon e Design/Motion QA implementados, mas mobile/global e links legais ainda pendentes. Ciência 03 usa vídeo corrigido **já integrado na main** e aprovado para desktop/Edge; **não repetir merge nem recomeçar a correção**. Ciência mobile e Engenharia device-led permanecem pendentes, além dos 45 checkpoints e Motion QA transversal.

**Divergência para confirmar:** decisão histórica C (05/10) retirara Vozes/Testemunhos; a `main` atual monta a secção editorial Vozes sem depoimentos inventados. Não inverter decisões nem publicar citações fictícias sem autorização.

Preservar a arquitetura geral antiga (1 escola = 1 repositório, RIGHTWARE Control Plane e Data Plane isolado, Java, PostgreSQL, Redis e segurança forte), sem tomar o antigo `STACK AGORA` como prioridade da landing atual.

**Regras de execução:** não modificar Hero, copyright, assets aprovados nem áreas fora de escopo; nunca afirmar build/testes/QA concluídos sem evidência; não inventar links/claims/autorização de imagens. Antes de editar ficheiros GitHub, fazer fetch do SHA atual. Correções de media e grandes mudanças em branch separada, com QA antes do merge.

Na primeira resposta do novo chat: indicar os handoffs lidos, a HEAD verificada, o que está concluído vs pendente e o próximo passo recomendado. No fim de cada ciclo substancial: atualizar o `CURRENT` e, para marcos importantes, criar um novo handoff datado na pasta `docs/handoff/`.

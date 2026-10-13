# RIGHTWARE — Aprendizados Motion QA no piloto COLUS

> **Projeto de origem:** EduCore / COLUS · 2026-10-13  
> **Uso:** referência transversal, não especificação para outro cliente.
> **Status:** observações confirmadas por capturas e relatório colado; implementação de QA em validação.

## Problema real

A landing apresentou falhas de continuidade que não eram identificáveis apenas por screenshots estáticas: texto de Futuro mudou enquanto a imagem permanecia bloqueada pela camada gráfica, renderização de vídeo Ciência rodado, ring de comunidade incompleto/cortado, legendas de Aprender cobertas por miniatura e regressões no vídeo Hero.

O diagnóstico inicial gerou centenas de amostras mas registrou somente a secção Contactos a 100% — embora reportasse zero erros. A causa técnica localizada foi conflito com `scroll-behavior: smooth` e instrumentação que não avaliava a cobertura real.

## Mudanças de método

1. **Instrumentação sem oráculo é observabilidade, não teste.**
2. O master/wireframe define o **esperado**; a implementação define apenas o **observado**.
3. Ausência de erro técnico não prova a fidelidade das media, do motion ou da narrativa.
4. Relatórios precisam de cobertura, regras, referências e estado por critério.
5. Preferir estados `PASS`, `FAIL`, `REVIEW`, `NOT_OBSERVED` à aprovação binária.
6. Não resolver divergência técnica alterando silenciosamente o contrato visual aprovado.
7. Conservar o Hero/media aprovada como fronteira de segurança para alterações a outras secções.
8. Para depurar vídeos, diferenciar **asset presente**, **codec/orientação**, **poster** e **reprodução real**.
9. Guardar contrato do projeto fora do evaluator genérico para poder reutilizá-lo noutro produto.
10. Versões de QA necessitam de um gate de build e QA real antes de serem promovidas a padrão validado.

## Artefactos criados

- Framework: `docs/rightware/frameworks/motion-qa-contract-driven.md`.
- Motor genérico: `frontend/src/shared/motion-qa/contractEvaluator.ts`.
- Contrato COLUS: `frontend/src/config/colusMotionQaContract.ts`.
- Matriz e gates COLUS: `docs/colus/presentation/motion-qa-contract-v1.md`.
- Instrumentação local: `frontend/src/components/landing/LandingMotionQA.tsx`.

**Limitação explícita:** o piloto V1 mede progresso, cena, stage, media/erro e alguns estados DOM; não faz pixel-diff canónico, avaliação de ritmo ou inspeção automática de rosto. Essas capacidades são próximas etapas, sujeitas a baseline e viewport fixos.

## Checkpoints de reutilização

Só extrair para outros sistemas quando: motor tiver fixture de teste unitário, runner de browser fixo, variante mobile/reduced-motion, exemplos de contrato independentes de COLUS, documentação de integração e relatório com provas de build. Até lá é **padrão em desenvolvimento**, não biblioteca certificada.

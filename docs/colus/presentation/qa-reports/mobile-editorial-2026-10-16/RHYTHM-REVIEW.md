# COLUS — Mobile Editorial Pass: Auditoria de ritmo (2026-10-16)

**Branch:** `feat/colus-mobile-editorial-storytelling`  
**Estado:** leitura estática do código + comparação com `scroll-budget-colus.md`; NÃO é QA de browser nem aprovação visual.  
**Contexto:** depois de três capturas Edge mobile e correções ao Header/QA e Ciência, permanece pendente a validação da narrativa integral, em especial Engenharia → Ciência.

## 1. Auditoria de ritmo: alturas mínimas declaradas

A tabela agrega apenas as alturas **mínimas explícitas dos palcos narrativos mobile** no TSX e exclui espaços/interligações, conteúdo excedente e componentes restantes. Valores `svh` são unidades do viewport pequeno, não tempos de interação.

| Secção | Mínimos de palcos declarados | Total mínimo nominal | Scroll Budget mobile (referência) |
| --- | --- | ---: | ---: |
| Aprender | 90 + 82svh | **172svh** | 140–150svh |
| Futuro (TIC / Engenharia / Ciência / Seg. Digital) | 82 + 76 + 88 + 75svh | **321svh** | 170–180svh |
| Vida COLUS | 80 + 62 + 58 + 62svh | **262svh** | 125–140svh |
| Pertencer | 82 + 65 + 66svh | **213svh** | 110–120svh |
| Transformar | 90 + 69 + 73svh | **232svh** | 130–145svh |
| **TOTAL destes cinco blocos** | | **1.200svh** | **675–735svh** |

**Interpretação:** divergência importante que requer revisão editorial, não um `FAIL` automático. O contrato `scroll-budget-colus.md` proíbe aplicar alturas rígidas e encurtar secções só para cumprir métricas. O ritmo real tem de ser avaliado no browser, incluindo legibilidade, densidade narrativa, pausa de media e comportamento ao percorrer rapidamente.

## 2. Riscos específicos observados anteriormente

- O Header fixo sobrepunha-se à headline de Engenharia durante scroll reverso na captura Edge 440×956. A branch contém proteção específica no `LandingHeader.tsx`, mas **ainda falta screenshot pós-fix**.
- Ciência estava com headline sobre os estudantes no vídeo. A branch passou a reservar espaço de texto no topo e deslocou o vídeo para a zona inferior, mas **ainda falta inspeção visual e de reprodução pós-fix**.
- O launcher inativo do painel de Design/Motion QA sobrepunha-se aos media mobile; a última captura confirmou visualmente o seu desaparecimento em modo normal.
- A secção Engenharia continua a precisar de julgamento editorial do proprietário; não substituir a abordagem **device-led** por fotografia não comprovada.
- Os quatro palcos quase completos em Futuro representam potenciais interrupções e alongamento; não reduzir automaticamente antes de testar uma alternativa com a mesma densidade de informação.

## 3. Plano de validação

1. Atualizar a branch e executar `npm run typecheck`, `npm run test:qa`, `npm run build` na pasta `frontend`; guardar o resultado observado.
2. Inspecionar no **Microsoft Edge real** os viewports 390×844, 440×956 e 768×1024; opcionalmente 360×800.
3. Abrir `http://localhost:8080/#futuro` (sem `motionQA=1`), fazer scroll lentamente e no sentido inverso pelas cenas TIC → Engenharia → Ciência → Segurança Digital.
4. Verificar: título não ocultado por Header, nenhuma parte da copy fora do viewport ou cortada, contraste em diferentes frames, presença e ritmo da geometria, ausência de descontinuidade entre cenas.
5. Ciência: verificar `paused/currentTime` enquanto visível e quando sai do ecrã; testar reduced-motion/Save-Data e poster. Não confundir validação desktop antiga com aprovação mobile.
6. Percorrer Aprender → Futuro → Vida → Pertencer → Transformar em scroll natural e rápido; identificar especificamente onde o utilizador sente espaço vazio ou repetição.
7. Se os palcos longos forem de facto problema, propor **uma única alternativa compacta por secção** preservando Headline/Media/Copy/ritmo e submeter imagens de antes/depois à aprovação, antes de eliminar espaço no CSS.

## 4. Estado de execução

- GitHub PR #2 permanece **draft**; `main` sem merge.
- Repositório acessível via conector GitHub. O runtime do agente não conseguiu resolver `github.com` por DNS para clonar/executar o frontend. Também não alcança o `localhost:8080` do proprietário.
- Esta auditoria **não executou** testes npm nem observou o browser após os dois últimos fixes.
- Hero, `LandingMedia`, assets aprovados e código desktop continuam fora do âmbito.

**Próxima evidência prioritária:** uma captura/curto vídeo do Edge depois do commit `2b5729d`, percorrendo a passagem Engenharia → Ciência com o Header visível/invisível. Com esse resultado, corrigir apenas defeitos comprovados.

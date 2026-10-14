# COLUS — Checkpoints de fidelidade visual V1

> **Estado:** plano preparado; referências visuais (imagens do Draw.io / screenshots de aprovação) e comparação pixel-a-pixel **ainda pendentes**.  
> **Data:** 2026-10-14  
> **Fonte de verdade:** `docs/colus/design/landing/landing-colus-master.drawio` Master V0.18, `motion-spec-tecnico-colus.md`, `scroll-budget-colus.md`.  
> **Proibição:** este processo **não modifica** o Hero, o vídeo `COLUS-HERO-VID-001-SPORT-DAY.mp4` nem qualquer media aprovada.

## 1. Conceito operacional

O painel `?motionQA=1` dispõe de **Checkpoints visuais · preparação**, com seleção de uma secção e uma posição do scroll. O botão **Ir para checkpoint** desloca a janela para o estado selecionado. O ponto escolhido inclui a expectativa, a célula/documento de referência e uma checklist. O JSON exporta a lista de pontos, mas **não contém screenshots nem diffs**.

Sem referência de imagem aprovada e sem revisão humana, nenhum checkpoint pode ser declarado `MATCH` de composição apenas pelo estado DOM.

## 2. Plano de inspeção

| Secção / anchor | Progresso previsto | Referência | Comparar |
|---|---|---|---|
| Intro Morph `#top` | 0, 25, 50, 75, 100% | `intro_90`, `hero_98` | Morph, marca, máscara, vídeo original, handoff |
| Hero estável `#hero` | 0, 50, 100% | `hero_98`, `hero_103–108` | Headline à esquerda, vídeo orgânico à direita, CTAs |
| Manifesto `#o-colegio` | 0, 25, 50, 75, 100% | `hero_123`, `hero_131` | Fundo Warm Paper, texto, continuidade dos nodes |
| Aprender `#experiencia` | 0, 25, 50, 75, 100% | `learn_141–171` | Descobrir/Criar, Learning Trail, legenda sem colisão |
| Futuro `#futuro` | 0, 20, 40, 60, 80, 100% | `future_21`, `future_56` | TIC, Engenharia, Ciência, Segurança Digital, Signal Field, troca de media |
| Vida `#vida-colus` | 0, 25, 50, 75, 100% | `life_18–52` | Fotoensaio e Story Marker |
| Pertencer `#comunidade` | 0, 25, 50, 75, 100% | `belong_9127–9136`, `belong_9165` | Ring aberto, nodes, rostos e handoff |
| Transformar `#transformar` | 0, 25, 50, 75, 100% | `transform_9326–9335` | Expressar/Construir/Avançar, Rise Axis |
| Vozes `#vozes-colus` | 0, 50, 100% | `voices_9509–9555` | Densidade editorial, node e depoimentos autorizados |
| Convite `#contactos` | 0, 50, 100% | `invite_9724–9764` | Marca, convite, CTAs, separação do Footer |

**Total inicial:** 45 pontos de inspeção, distribuídos por dez anchors.

## 3. Procedimento de comparação a implementar

1. **Baseline:** exportar o estado aprovado do master em tamanho/viewport fixo e registar documento, revisão, ID da célula e autor da aprovação. Um esboço não é automaticamente baseline pixel-exato da landing.
2. **Captura observada:** usar um runner de navegador (próxima fase; recomenda-se Playwright) para abrir a build correspondente, fixar tamanho do viewport, reduzir variáveis ambientais e posicionar o scroll no checkpoint.
3. **Pareamento:** comparar cada estado com o seu baseline aprovado. Diferenças de fonte/renderização e de conteúdo dinâmico devem ser normalizadas ou anotadas, não ocultadas.
4. **Avaliação:** relatório `Esperado → Capturado → Diferenças → Estado → Decisão`. Para transições, complementar com amostras sequenciais e testes ida/volta.
5. **Gate:** nenhuma alteração na landing é aplicada automaticamente; comparação de crop, máscara, qualidade do movimento, direitos e marca exige avaliação humana.

## 4. Particularidades de scroll

O `Scroll Budget` §1 diz que o budget é **limite de ritmo, não altura rígida**. Os pontos de 0–100% são posições de investigação: para um stage sem scrub e com altura inferior ao viewport, vários pontos podem coincidir na mesma área. Isso é esperado e **não constitui necessariamente erro**.

O orçamento `Hero + Manifesto` é conjunto. Não contar 170vh duas vezes. O comprimento narrativo global também exclui o Footer, que tem altura natural.

## 5. Proteção do Hero

A composição comprovada pelo utilizador (vídeo desportivo em janela orgânica, headline à esquerda, marca oficial) é o estado de referência editorial aprovado. `hero-protected-asset-lock.json` contém os hashes de integridade de vídeo, poster e logo. **Não alterar nem regenerar** o vídeo para satisfazer testes técnicos.

## 6. Limitações reais desta versão

- O painel navega até checkpoints, **não** faz captura automática nem pixel-diff.
- Não existe ainda baseline visual por estado, aprovado e versionado.
- O contract evaluator mede presença, sequência, media e scroll, mas não reconhece automaticamente rostos, textos tapados ou fidelidade do ring.
- A navegação dos checkpoints necessita de revisão em desktop/mobile no Edge; ainda não foi testada neste ambiente.
- As recomendações de ritmo em `vh` aparecem como `REVIEW` quando fora da faixa, **não** como `FAIL`.

**Próxima implementação:** runner Playwright versionado, screenshots por breakpoint e estado, importação de baseline aprovada, teste de movimento inverso/rápido e relatório visual por divergência.

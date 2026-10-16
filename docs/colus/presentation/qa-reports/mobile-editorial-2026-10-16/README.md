# COLUS — Mobile Editorial Storytelling — implementação para revisão

**Data:** 2026-10-16  
**Branch de trabalho:** `feat/colus-mobile-editorial-storytelling`  
**Base:** `main@b5b493386377cc54d4f8850e294557abe4a90bd5`  
**Estado:** CÓDIGO IMPLEMENTADO NA BRANCH / QA VISUAL E TÉCNICO PENDENTE  
**Âmbito:** experiência mobile/tablet, sem modificação do Hero protegido nem do layout desktop.

## Objetivo aprovado nesta conversa

Transformar a apresentação mobile de «imagem + texto em cartão» em composições editoriais imersivas: texto integrado nas imagens, hierarquia tipográfica narrativa, imagens com crops distintos, ritmo visual e continuidade entre secções. O utilizador autorizou a aplicação («vamos aplicar»), não a aprovação visual nem a publicação.

## Implementação na branch

1. `AprenderSection.tsx` — Descobrir e Criar passam a capítulos visuais com títulos e copy integrados nas imagens; Learning Trail como ligação vertical. O tratamento desktop permanece inalterado.
2. `FuturoSection.tsx` — abertura com TIC imersiva; cenas 02–04 tornam-se capítulos com títulos/copy sobre o media. Engenharia no **mobile** usa geometria técnica SVG (Path, Node e malha esquemática), sem fotografia genérica. Ciência mantém o vídeo `COLUS-FUTURO-CIENCIA-VID-001-upright.mp4` e o poster oficial, através de `LandingMedia`. O desktop de Engenharia ainda usa a fotografia histórica e necessita de uma intervenção específica posterior.
3. `VidaSection.tsx` — sequência imagem-led com Sport, Expressão, Cultura e Sport, tipografia sobre o media e variação de proporções/máscaras. A antiga composição conserva-se no bloco `lg:block`.
4. `PertencerSection.tsx` — narrativa de comunidade com fotografia principal, título institucional imerso e duas composições de continuidade; não identifica fotografias como pais/encarregados. Desktop intacto.
5. `TransformarSection.tsx` — Expressar, Construir, Avançar em sequência contínua de media, títulos, chapter markers e eixo visual, sem cartões com caption separada. Desktop intacto.

Pontos intencionalmente fora do âmbito: Intro/Hero, vídeo e poster protegidos, header, `LandingMedia.tsx`, Footer, testemunhos e arquitetura/depêndencias EduCore.

## Verificações realizadas nesta sessão

- A branch foi criada a partir da HEAD confirmada da `main`.
- Leitura dos cinco componentes de origem e dos contratos de design/motion antes da alteração.
- Comparação GitHub confirma que o diff de código se restringe aos cinco ficheiros listados.
- Verificação estática aproximada de pares de tags JSX `<div>`, `<article>`, `<section>` e headings efetuada sobre o código da branch; não substitui compilador.
- `FuturoSection.tsx` mantém a referência do vídeo normalizado de Ciência e utiliza o mesmo `LandingMedia`, que não foi alterado.
- Sem nova autorização para alterar Hero; os ficheiros e assets protegidos não aparecem no diff.
- GitHub não reportou statuses de CI associados à última HEAD consultada.

**NÃO executado nesta sessão:** `npm run typecheck`, `npm run test:qa`, `npm run build`, inspeção em Edge/Chrome real, screenshots responsive, testes de vídeo mobile ou comparação pixel-a-pixel. O acesso à clonagem Git a partir do ambiente local do agente falhou por DNS; o trabalho foi aplicado através do conector GitHub.

## Plano de QA antes de merge

- **Viewports:** 360×800, 390×844, 430×932, 768×1024 e desktop 1280×800/1440×900.
- **Legibilidade:** garantir contraste do texto nos momentos críticos de cada imagem, crop sem cortar rostos/ações essenciais, nenhuma sobreposição entre headline e caption; tipografia consistente e sem overflow horizontal.
- **Fluxo:** scroll rápido e reverso, pontos de entrada por anchors, sequência Aprender → Futuro → Vida → Pertencer → Transformar sem separadores artificiais, pausas narrativas proporcionais.
- **Ciência 03:** vídeo vertical, poster, autoplay mudo somente quando visível, pausa ao sair, `prefers-reduced-motion`, Save-Data, fallback e regressões no desktop.
- **Engenharia 02:** validar leitura do device técnico em 360–768px e continuidade com TIC/Ciência; alinhar com Master V0.18 e Motion Spec §8, sem prova fictícia de atividades da escola.
- **Acessibilidade:** heading order, texto como conteúdo real do DOM, alt nas imagens, sem informação dependente de motion; zoom 200%, reduced motion.
- **Testes:** na raiz `frontend/`, executar `npm run typecheck`, `npm run test:qa`, `npm run build` e registar outputs.
- **Aprovação humana:** capturas/filmagem mobile e comparação com wireframe master antes da integração.

## Restrições / pendências

- **Não declarar aprovado:** este é um candidato para revisão visual mobile.
- **Não alterar o Hero:** `IntroHeroSection.tsx`, `LandingMedia.tsx` e assets protegidos continuam bloqueados.
- **Engenharia desktop** continua por reconciliar com a decisão device-led do Asset Gate.
- **Vozes COLUS** permanece sob divergência decisão C versus secção montada; não foi alterada.
- **Footer** e QA completo da landing continuam pendentes.


## Revisão visual Futuro — captura Edge iPhone 16 Pro Max (2026-10-16)

**Origem:** captura fornecida pelo proprietário em emulação Edge DevTools, 440×956, URL `localhost:8080/?motionQA=1#top`. A captura mostrou a transição Engenharia 02 → Ciência 03 e levou à observação do proprietário: «o futuro está mal, falta algo».

**Desvios observados na captura anterior ao fix:**
- título «Engenharia» afastado do esquema técnico e colocado demasiado abaixo; falta de hierarquia editorial da cena;
- o esquema ocupa o meio do espaço e deixa a narrativa repartida entre início vazio, figura técnica e copy final;
- cenas com margens/cantos repetidos e uma linha curta entre cartões, em vez de continuidade entre capítulos;
- o painel fixo **RIGHTWARE DESIGN + MOTION QA** tapa uma faixa da Ciência na captura; este é um overlay de desenvolvimento ativado por `?motionQA=1`, não conteúdo editorial da landing.

**Ajuste implementado em `FuturoSection.tsx`:**
- mobile Futuro é um campo visual contínuo, sem margens entre as quatro cenas; fundos escuros e gradientes conectam as sequências;
- Engenharia 02 apresenta label, novo headline editorial («Das ideias às possibilidades.»), schematic Path/Node maior e o copy aprovado distribuído no final;
- desenho SVG técnico ampliado, sem criar atividades/eventos escolares falsos nem sobreposições nas fotografias;
- Ciência 03 mantém o `COLUS-FUTURO-CIENCIA-VID-001-upright.mp4` e poster, com título integrado e copy real; Segurança Digital integra-se no mesmo ritmo;
- o JSX desktop, a partir de `hidden h-[280vh] lg:block`, foi comparado textual e integralmente com a `main` — **idêntico**;
- não se alterou `LandingMedia.tsx`, Hero nem o vídeo Ciência.

**Fix:** `68cb5d98f9cd234621a2ceefa87e90e52458ae1e`.

**Verificação estática:** pares de tags `div`, `article`, `h3` equilibrados; cenas 02/03/04 presentes com `data-colus-mobile-scene`; vídeo upright e poster presentes. **Não é uma validação visual pós-fix nem um build.**

**A rever no Edge:** abrir `http://localhost:8080/#futuro` **sem `?motionQA=1`**, para ver a composição sem a barra de QA. Capturar novamente 440×956 e 390×844, avaliar enquadramento/legibilidade, espaçamento da nova ilustração e transição para Ciência, com testes reais de vídeo. Manter o modo QA separado para a auditoria técnica, não para julgar a estética final.


## Terceira captura Edge — Header e Ciência (2026-10-16)

**Evidência:** terceira captura disponibilizada pelo proprietário, emulação iPhone 16 Pro Max 440×956 no Edge, sem `?motionQA=1`. O botão de QA já não aparece (fix anterior observado). A imagem revela o Header fixo sobre o texto «Das ideias às possibilidades.» de Engenharia durante o scroll, e o heading «Observar para compreender.» de Ciência à frente de rostos no vídeo.

**Diagnóstico no código:**
- `LandingHeader.tsx` voltava a mostrar o Header após apenas 8 px de movimento reverso, mesmo se a headline de Futuro ainda estava no retângulo superior ocupado pelo Header.
- Na cena Ciência o vídeo preenchia 100% da secção em mobile, enquanto headline e copy estavam por cima. O gradiente anterior ajudava no contraste, mas não reservava um campo de leitura separado das pessoas.

**Fix na branch:**
- `LandingHeader.tsx`: em mobile/tablet (`window.innerWidth < 1024`), verificar os títulos marcados dentro de `#futuro`. Enquanto uma headline cruzar os primeiros 96 px do viewport, ocultar temporariamente o Header fixo; fora desses momentos mantém-se a lógica existente de auto-hide. A navegação/menu e o desktop mantêm-se.
- `FuturoSection.tsx`: marcar os quatro títulos editoriais mobile, para que apenas eles participem na proteção do Header; Ciência 03 recebe título e copy numa zona editorial escura no topo, enquanto o vídeo upright começa mais abaixo com gradiente de passagem, evitando texto sobre os rostos.
- Não modificar `LandingMedia.tsx`, o vídeo/poster de Ciência, o Hero, nem a renderização desktop de Futuro.

**Commits:** `1a3bc81` (Futuro) e `d1f6aae` (Header).

**Validação estática observada:** secção desktop de `FuturoSection.tsx` textual e integralmente idêntica à `main`; fontes upright e poster conservados; quatro títulos marcados; tags JSX `div/article/h2/h3/section` balanceadas num contador estático. **Não executados:** `npm run typecheck`, `npm run test:qa`, `npm run build`, QA browser pós-fix. Manter PR em draft.

**Critério visual para nova captura:** em 440×956, num scroll reverso lento sobre o headline de Engenharia, o Header não deve cortar o texto. Em Ciência, o título e copy não devem cobrir as caras e o vídeo deve reproduzir, pausar ao sair e preservar crop aceitável. Adicionalmente validar scroll para a âncora `#futuro`, menu mobile, 390×844, 768×1024 e desktop. O problema editorial amplo de Engenharia device-led **continua sujeito a aprovação visual**.


## Quarta captura Edge — início de Ciência sem imagem (2026-10-16)

A captura do proprietário no Microsoft Edge, iPhone 16 Pro Max 440×956, `/#futuro`, mostra Engenharia 02 e, logo abaixo, Ciência 03 como texto em fundo escuro, sem o vídeo visível no primeiro momento da secção. A caixa «Translate page from Portuguese?» pertence à interface do Edge, não à landing.

**Causa comprovada no código anterior:** `FuturoSection.tsx` colocava o vídeo em `absolute ... top-[32%]`, com gradiente superior opaco e copy no topo. Assim, antes de atingir aproximadamente 32% da altura da Ciência, o utilizador via apenas outro painel de texto, contradizendo o objetivo mobile image-led.

**Correção implementada na mesma branch:** a Ciência 03 tem agora o vídeo upright em `absolute inset-0` desde o primeiro pixel da cena; uma película superior subtil liga o fundo escuro de Engenharia à imagem real, e um gradiente inferior forte suporta título e descrição na parte inferior, afastados da região superior dos rostos. Altura declarada de Ciência reduzida de `88svh` para `78svh`, porque se eliminou a abertura sem imagem. Commit `0a33ea34044b3574f7d78ccf9d1fde88bb4cc5f5`.

**Verificação estática:** comparado o bloco desktop `h-[280vh] lg:block` com `main`, byte a byte idêntico; vídeo `COLUS-FUTURO-CIENCIA-VID-001-upright.mp4` e poster oficial preservados; pares JSX básicos equilibrados. **Não foram executados** npm typecheck, test:qa, build nem browser após a correção. É necessário screenshot mobile pós-correção em scroll lento e frames de Ciência para garantir que o título no rodapé não recobre pessoas importantes ou falha em algum frame. Se houver colisão real, ajustar o enquadramento/scrim com evidência, sem tocar no asset.


## Engenharia 02 — fotografia contextual + device secundário (2026-10-16)

**Feedback e autorização:** após novas capturas mobile o responsável salientou que «Engenharia continua sem imagem». Foi proposta explicitamente a utilização da fotografia existente `COLUS-APRENDER-CRIAR-001.webp` por trás do esquema técnico, com imagem real / gradiente / device / texto, e o responsável confirmou «sim». A mudança é **proposta implementada para revisão visual**, não uma aprovação final ou da publicação.

**Limite editorial:** a fotografia foi inspecionada e mostra estudantes do COLUS a montar/experimentar materiais numa atividade prática; **não há confirmação de que seja uma aula, programa ou atividade específica de Engenharia**. O uso como contexto de criação prática é distinto de afirmar que a imagem prova atividade de Engenharia. Isto representa uma adaptação provisória, sujeita a avaliação, da regra anterior do Asset Gate que priorizava device-led precisamente pela ausência de fotografia de Engenharia validada. Não reescrever retroativamente o Asset Gate.

**Diagnóstico do bug de composição:** `EngineeringMobileDevice` tinha `bg-colus-ink` opaco. Mesmo adicionando uma imagem atrás, o SVG opaco teria escondido a fotografia. A correção torna o contêiner de `EngineeringMobileDevice` transparente (o elemento só é usado como device da cena mobile).

**Implementação em `FuturoSection.tsx`:**
- imagem real `/03-aprender/criar/COLUS-APRENDER-CRIAR-001.webp` ocupa a cena Engenharia 02 em `absolute inset-0`, mantendo identidade e nomes dos assets existentes;
- crop inicial `object-[58%_center]` e texto alternativo factual sobre criação e experimentação, sem alegar Engenharia;
- gradiente escuro para apoiar legibilidade do título/copy; **foto não está obscurecida por fundo SVG**;
- `EngineeringMobileDevice` transparente, com opacidade geral 30% e máscara de desenho restrita essencialmente à parte inferior da cena, para não competir com as caras;
- título editorial e descrição existentes mantidos, sequência TIC→Engenharia→Ciência mantida;
- JSX desktop de Futuro comparado byte a byte com a `main`: idêntico; vídeo Ciência upright e poster preservados; Intro/Hero e `LandingMedia.tsx` intactos.

**Commit de código:** `9c3a3eb0c7aa7f1a84a8a7ceadc7d7d4ad6d8735`.

**Verificação executada:** revisão estática das referências, máscara, transparência do SVG e balanceamento de tags básicas JSX; fonte do vídeo e poster conferidos. **Não executados:** browser Edge pós-correção, typecheck, build, test:qa e validação de direitos de imagem para publicação. Não declarar aprovado.

**Próxima revisão:** atualizar branch, abrir o Edge a 440×956 e 390×844, confirmar que se vê efetivamente a fotografia de alunos durante a cena Engenharia, com rostos, mãos, material e conteúdo legíveis, sem linhas SVG sobre a cara; avaliar contraste e continuidade para Ciência. Se o crop não servir, corrigir só crop/gradiente com captura e validação, mantendo o asset como contextual.

## Engenharia 02 — remoção da marca geométrica (2026-10-16)

**Evidência do responsável:** captura Edge mobile 440×956 mostrou a fotografia de alunos já integrada, mas uma marca grande em forma de pentágono continuava visível sobre a atividade. Pedido direto: retirar a marca.

**Diagnóstico:** a marca não estava na fotografia, mas no `EngineeringMobileDevice`, ainda montado como overlay com 30% de opacidade e máscara na cena Engenharia.

**Alteração:** `FuturoSection.tsx` deixou de renderizar o `EngineeringMobileDevice` no mobile e a função exclusiva desse SVG foi removida. Fotografia `COLUS-APRENDER-CRIAR-001.webp`, copy, número de cena e elementos discretos de continuidade permanecem; o gradiente central ficou mais leve para melhorar a presença da imagem. O bloco desktop foi mantido byte a byte.

**Commit:** `a023884f3a6e64b43e26a0cae86858695ff9fbae`.

**Estado:** alteração aplicada à branch `feat/colus-mobile-editorial-storytelling`, pendente de visualização pós-correção e execução de `typecheck`, `test:qa` e `build`. Não declarar publicável, não fazer merge. O uso desta imagem continua como **contexto de criação/experimentação**, não prova de atividade específica de Engenharia.


## Diagnóstico de repetição entre Aprender / Criar e Futuro / Engenharia (2026-10-16)

**Evidência:** duas capturas no Microsoft Edge, iPhone 16 Pro Max (440×956) mostram `02 / CRIAR` e `02 / ENGENHARIA` com a **mesma fotografia** de alunos na experiência de montagem, `COLUS-APRENDER-CRIAR-001.webp`. Em `Aprender / Criar` a headline longa ocupa grande parte da zona inferior do media, encobrindo ação e materiais. Em `Futuro / Engenharia` a headline no topo sobrepõe-se parcialmente às pessoas. A repetição destrói a distinção entre os dois capítulos, embora cada um tenha copy diferente. O aviso de tradução visto no Edge é do browser, não parte do site.

**Verificação de assets:** foi feita consulta visual aos media reais disponíveis em `frontend/public/media/colus/landing/colus-assets-final-v03/`. A alternativa `03-aprender/descobrir/COLUS-APRENDER-DESCOBRIR-002.webp` mostra uma **fotografia diferente**, com demonstração de circuito elétrico e lâmpadas acesas, sem reaproveitar a imagem principal de Aprender/Criar e sem ser utilizada em outra cena mobile atual. A pessoa e o ambiente escolar podem continuar relacionados à mesma experiência, portanto não alegar evento, disciplina ou programa distinto com base na fotografia.

**Correções implementadas exclusivamente na branch `feat/colus-mobile-editorial-storytelling`:**
1. `FuturoSection.tsx` (commit `d9710eb4bf1e37a2f97e3fd570b2884579aa6577`): Engenharia **mobile** passa a utilizar `COLUS-APRENDER-DESCOBRIR-002.webp` como contextual visual, `object-[67%_center]`; alt factual sobre observação de circuitos e lâmpadas; ligeira redução da headline para tentar libertar as caras. **Engenharia desktop permanece como estava.**
2. `AprenderSection.tsx` (commit `c43306fe69ac80cbafde358bca38d0d2b6440d90`): tamanho e largura tipográficos ajustados em Criar **mobile** sem alterar as palavras aprovadas; gradiente médio suavizado para tornar a experiência visível e manter contraste no rodapé. **Aprender desktop permanece como estava.**
3. Nenhum dos media do Hero nem `LandingMedia.tsx` foi alterado; Ciência mantém vídeo upright/poster aprovados.

**Atenção editorial:** o Asset Gate histórico não valida fotografia de uma atividade especificamente denominada Engenharia. A fotografia de circuitos é contexto de experimentação e construção prática, não comprovação de aula curricular. O novo uso é sujeito a revisão visual, direitos e aprovação editorial antes de publicar.

**QA:** screenshots de origem foram observadas; o código novo foi aplicado, mas **não existe screenshot pós-alteração nem teste npm executado nesta sessão**. Validar em 440×956 e 390×844 a duplicação visual eliminada, cortes de rostos, título de Engenharia sem sobreposição relevante, criação e materiais visíveis no primeiro capítulo, transições, reduced motion, e ausência de regressões desktop. PR #2 continua draft, sem merge.

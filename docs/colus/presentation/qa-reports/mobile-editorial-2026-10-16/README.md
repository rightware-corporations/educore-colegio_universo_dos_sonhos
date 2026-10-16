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

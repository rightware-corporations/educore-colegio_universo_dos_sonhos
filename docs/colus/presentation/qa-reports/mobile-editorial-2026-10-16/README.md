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

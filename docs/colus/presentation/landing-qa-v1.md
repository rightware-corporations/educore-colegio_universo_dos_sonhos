# COLUS — Landing Implementation QA V1

> **Data:** 2026-10-03  
> **Estado:** IMPLEMENTAÇÃO EM QA / POLISH  
> **Fonte de verdade:** `landing-colus-master.drawio` + specs high-fidelity/motion aprovadas.

## 1. Verificações concluídas

### Estrutura narrativa

Implementada na ordem aprovada:

```text
Intro Morph
→ Hero
→ Manifesto
→ Aprender em Movimento
→ Futuro & Tecnologia
→ Vida COLUS
→ Pertencer
→ Transformar
→ Depoimentos
→ Convite Final
→ Footer EduCore / RIGHTWARE
```

### Brand mark

O símbolo derivado em SVG **não é o logo oficial**. Ele só pode ser usado como dispositivo gráfico de Intro/Motion quando explicitamente previsto pela direção.

Para qualquer apresentação formal da marca, usar o asset oficial:

`frontend/public/media/colus/landing/colus-assets-final-v03/00-brand/COLUS-BRAND-LOGO-RASTER-001.jpg`

Não reconstruir, redesenhar ou substituir o logo oficial por uma aproximação.

### Assets

Os assets usados pela implementação apontam para:

`frontend/public/media/colus/landing/colus-assets-final-v03/`

Foi verificada a existência física dos assets referenciados diretamente por:
- Hero;
- Manifesto;
- Aprender;
- Futuro;
- Vida COLUS;
- Pertencer.

Transformar usa os três assets aprovados por path dinâmico.

### Motion / responsive

- Intro e Futuro permanecem os signature moments.
- Mobile não replica long pinning de Aprender, Futuro, Pertencer e Transformar.
- Reduced motion remove os principais scroll holds e autoplay.
- Header nasce apenas no fim da montagem do Hero.
- Header tem estados hidden / transparent / light / dark.
- Header recolhe em scroll down e regressa em scroll up.
- Hero video é ativado apenas depois da aperture começar a ficar legível.
- Save-Data e reduced-motion usam poster quando disponível.
- Hero poster tem preload de alta prioridade.

### Acessibilidade

- skip navigation;
- landmark `main` separado do Header;
- focus-visible global;
- anchors com `aria-current="location"`;
- menu mobile com `aria-expanded` e `aria-controls`;
- radial nodes navegáveis por teclado;
- safe areas mobile;
- reduced-motion desativa smooth scrolling.

### Copy discipline

A implementação foi alinhada ao `copy-status-colus.md`.

Não renderizar publicamente nomes internos como:
- Living Reel;
- Signal Field;
- Community Ring;
- Rise Axis;
- Horizon Node;
- Return to Light;
- Book Aperture;
- Scene Window.

A secção «Vozes COLUS» apresenta texto institucional sem aspas nem atribuição a uma pessoa real. Não existe testemunho inventado. Depoimentos reais só podem ser publicados após validação/autorização.

## 2. Correções técnicas já aplicadas

- `@vitejs/plugin-react` adicionado ao frontend.
- Vite configurado com o plugin React.
- `.gitignore` criado para `node_modules`, `dist`, env e artefactos locais.
- science video recebeu fallback still aprovado.
- media abaixo da dobra continua lazy.
- secondary videos usam preload conservador.

## 3. Passagem de correção após a gravação de 2026-10-05

Correções integradas na branch `main` em 2026-10-12:

- Intro/Hero: a abertura do vídeo e do texto principal foi antecipada no progresso do scroll, a ampliação do símbolo gráfico foi suavizada e o Hero tem mais espaço de leitura no desktop. O símbolo da Intro continua apenas um dispositivo motion derivado, não um logótipo oficial.
- Aprender, Futuro, Pertencer e Transformar: o `overflow-hidden` externo passa a ser removido em desktop (`lg:overflow-visible`), mantendo clipping nos contentores internos. Isto permite ao `sticky` fixar-se ao viewport.
- Futuro e Transformar: sequências de opacidade retemporizadas com sobreposição entre cenas, sem intervalo em que todas as imagens estão invisíveis.
- Pertencer: título e fotografias entram com opacidade base elevada; o efeito permanece progressivo, mas o conteúdo nunca começa completamente invisível.
- Vozes COLUS: componente incluído no fluxo real da landing entre Transformar e Convite Final. Texto institucional substitui marcadores `TESTEMUNHO A INSERIR` sem criar depoimentos fictícios.
- Vozes COLUS: o texto começa legível mesmo com scroll rápido.
- Footer EduCore/RIGHTWARE: eliminados textos de template genérico, navegação fictícia e links legais não implementados. Incluídos apenas destinos já presentes na landing e contactos previamente especificados.

**Validação pendente:** estas são correções de código, não validação visual. É necessária uma nova gravação desktop para verificar sticky, saída de Futuro, leitura em Pertencer, presença da secção Vozes COLUS, Hero e Footer. O `npm run typecheck` e `npm run build` também continuam por validar localmente.

## 3.1. Segunda gravação — 2026-10-12

Revisão de vídeo local, 1920×1080, 48,4 s:

- **00:00–00:09:** a marca gráfica expandiu mas o Hero com headline/video/CTAs não estabilizou tempo suficiente para ser visto na passagem; considerou-se **P0**.
- **00:14–00:17:** Aprender mostrou sobretudo Descobrir; Criar não teve tempo de leitura claro nesta captura.
- **00:18–00:22:** Futuro mostrou TIC/Engenharia com sobreposição escura e textos em fantasma na transição; Ciência e Segurança Digital não ficaram demonstradas de forma clara na gravação.
- **00:29–00:34:** Pertencer aparece mais legível; o conteúdo desce para a parte inferior do viewport e a passagem continua abrupta.
- **00:34–00:39:** Transformar exibiu sobretudo Avançar, sem uma amostra clara da sequência Expressar/Construir.
- **00:40–00:47:** Vozes COLUS, Convite Final e Footer estão presentes. Vozes ainda precisa de conteúdo editorial/autorizado mais forte; não inventar testemunhos.

Nova passagem de código integrada na `main`:

- Intro/Hero: tempo de scroll desktop aumentado para **280vh**, media/copy visíveis mais cedo, redução da expansão do mark derivado; Header COLUS oficial mantém-se visível no estado de Hero transparente.
- Aprender: desktop stage prolongado para **225vh**.
- Futuro: desktop stage prolongado para **280vh**; troca de opacidade sobreposta por transição com janela revelada (`clip-path`) e maior contraste na engenharia; vídeo Ciência só é ativado quando a respetiva cena está ativa.
- Transformar: desktop stage prolongado para **220vh**.

**Não validados ainda no browser:** estas últimas mudanças foram feitas após a gravação. Verificar se as quatro cenas de Futuro e as três de Transformar são efetivamente legíveis em **slow scroll** e em **fast scroll**. Verificar também o Header e a ausência de overlaps em 1024px e em mobile.

**Lacunas de conteúdo/assets ainda abertas:** testemunhos reais autorizados; versão oficial transparent/vector do logo COLUS para contextos sem placa branca; logos oficiais EduCore e RIGHTWARE no Footer; revisão de crops, peso/codec dos vídeos e dos dados de contacto.

**Fora do gate da landing:** os oito perfis escolares, navegação de login/demo e integração SIGA/ERP exigem QA funcional separado. Uma gravação apenas da landing não valida nem invalida essas funcionalidades.

## 4. Itens ainda pendentes antes de declarar QA final

### Visual QA real

Executar e verificar em browser:
- desktop 1440px;
- desktop 1024–1279px;
- tablet 768–1023px;
- mobile 390px;
- mobile compacto 320–360px.

Verificar:
- crops reais;
- headline wrapping;
- fast scroll;
- anchor jumps;
- retorno para cima;
- header theme transitions;
- nenhum overlap de texto/media;
- nenhuma secção excessivamente longa.

### Build QA

Executar localmente:

```bash
cd frontend
npm install
npm run typecheck
npm run build
npm run dev
```

O ambiente de execução usado durante esta passagem não resolve `github.com` por DNS, portanto o build real ainda não foi marcado como validado.

### Assets / produção

Antes de produção pública:
- substituir/aprovar formalmente fotografia de pessoas;
- obter originais/vector oficiais COLUS quando disponíveis;
- obter logos/lockups oficiais EduCore e RIGHTWARE para o Footer;
- revalidar email e Instagram;
- inserir apenas depoimentos reais/autorizados;
- preparar clips curtos de Hero/Ciência para reduzir peso.

## 5. Gate atual

A landing está em:

> **IMPLEMENTATION QA / PRESENTATION POLISH**

Não reabrir direção criativa sem decisão explícita.

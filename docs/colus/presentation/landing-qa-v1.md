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

Depoimentos permanecem placeholders explícitos até existir voz real/autorizada.

## 2. Correções técnicas já aplicadas

- `@vitejs/plugin-react` adicionado ao frontend.
- Vite configurado com o plugin React.
- `.gitignore` criado para `node_modules`, `dist`, env e artefactos locais.
- science video recebeu fallback still aprovado.
- media abaixo da dobra continua lazy.
- secondary videos usam preload conservador.

## 3. Itens ainda pendentes antes de declarar QA final

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

## 4. Gate atual

A landing está em:

> **IMPLEMENTATION QA / PRESENTATION POLISH**

Não reabrir direção criativa sem decisão explícita.

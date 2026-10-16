# HANDOFF OPERACIONAL — EduCore / COLUS / RIGHTWARE — 2026-10-16

> **Arquivo oficial:** `docs/handoff/HANDOFF-COLUS-2026-10-16.md`. Consultar [o índice cronológico](README.md) e ler, nesta ordem: 03/10 → 04/10 → este handoff → [CURRENT](HANDOFF-COLUS-CURRENT.md). Não manter cópias divergentes noutros diretórios.

> **Data de corte:** 2026-10-16 (conversa de trabalho em curso desde a consolidação da landing).
> **Âmbito:** landing pública de apresentação do Colégio Universo dos Sonhos (COLUS), auditoria de fidelidade visual/motion e continuidade no próximo chat.
> **Estado real:** DESENVOLVIMENTO + QA + POLISH; **NÃO** está concluída, nem aprovada para publicação pública.
> **Ponto de partida verificado antes deste handoff:** main em 4319ab59f1bf201514a6dafc4ff69f084bd2b528 (2026-10-16). A criação do presente documento altera a HEAD; consultar a HEAD de main novamente.
> **Regra editorial:** este ficheiro resume decisões e fontes. Em caso de discrepância com o código atual, consultar o GitHub e o master canónico antes de agir.

## 1. Identidade, titularidade e objetivos

**Cliente/instituição:** Colégio Universo dos Sonhos (COLUS), Moçambique.

**Fornecedor tecnológico e assinatura de produto:** EduCore — um produto RIGHTWARE. O objetivo da landing é uma apresentação institucional e comercial do COLUS com assinatura tecnológica discreta; NÃO apresentar a RIGHTWARE como proprietária do colégio.

**Copyright BLOQUEADO, na landing COLUS:**

> © 2026 Colégio Universo dos Sonhos. Todos os direitos reservados.

**Assinatura separada:**

> Powered by EduCore · A RIGHTWARE Product

Não substituir o copyright da escola pelo da RIGHTWARE, mesmo que a referência de Footer genérica EduCore exiba copyright RIGHTWARE. O standard global determina copyright da instituição em projetos para escolas.

**Não confundir esta landing de apresentação com o portal escolar/MVP operacional EduCore.** Ideias comerciais de gestão escolar, acompanhamento de educandos/pais e propostas a escolas são contexto de produto, não autorização para acrescentar autenticação, formulários, funcionalidades internas ou claims à landing sem requisitos aprovados.

## 2. Repositório e fluxo de trabalho

- **GitHub:** https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos
- **Branch de integração:** main.
- **Ambiente do utilizador:** Windows + PowerShell + VS Code + Edge; frontend React 18 + TypeScript + Tailwind + Framer Motion + Vite, habitualmente localhost:8080.
- **Script de validação:** na pasta frontend, npm run typecheck; npm run test:qa; npm run build; npm run dev (apenas se Vite não estiver já ativo).
- **QA DEV:** http://localhost:8080/?motionQA=1#top e http://localhost:8080/?motionQA=1#futuro. Em localhost sem query, um atalho discreto permite abrir o QA; o painel não deve aparecer na build de produção.
- **GitHub como arquivo preferido** para relatórios extensos e handoffs. O upload de ficheiros/texto diretamente no chat apresentou falhas de leitura; funcionou consultar o ficheiro versionado no GitHub. Não obrigar o utilizador a voltar a transferir dados já arquivados.

**Regra de trabalho:** ler a HEAD real antes de alterar código, trabalhar em branch isolada para correções de media ou mudanças relevantes, verificar os SHA atuais antes de gravar, publicar diferenças auditáveis, não fazer merge redundante de branch já integrada. Não declarar testes executados se só foram escritos; separar evidências de código, testes realmente executados e aprovação visual.

## 3. Fontes de verdade, por ordem

1. **Master Draw.io V0.18:** [landing-colus-master.drawio](../colus/design/landing/landing-colus-master.drawio) — wireframe narrativo, composição e estados; referência canónica.
2. **[Master High Fidelity Consolidation](../colus/design/landing/master-high-fidelity-consolidation-colus.md)** — sequência, navegação, conteúdo, Footer, versão mobile, copyright e hierarquia de autoridade.
3. **[Motion Spec Técnico](../colus/design/landing/motion-spec-tecnico-colus.md)** — progresso das cenas, Path/Node/Mask, tempos, playback, reduced motion, breakpoints.
4. **[Scroll Budget](../colus/design/landing/scroll-budget-colus.md)** — orientação de ritmo, não alturas CSS absolutas.
5. **[Asset Final Selection V0.3](../colus/design/landing/asset-final-selection-colus-v03.md)** — media aprovados para demo privada e adaptação device-led em Engenharia.
6. **[Footer Standard EduCore](../educore/design/footer-standard.md)** + [registo de assets visuais](../educore/design/footer-approved-visual-assets.md).
7. **[QA visual de implementação](../colus/presentation/landing-qa-v1.md)** + [Backlog e auditorias](../colus/presentation/design-motion-qa-findings-2026-10-14.md) + [Science QA](../colus/presentation/qa-reports/science-orientation-2026-10-16/README.md).

A documentação inclui observações históricas obsoletas (p. ex. poster de Ciência em vez de vídeo, tentativas rotate-90/180, Footer com textos). Ler a **decisão mais recente**: a Ciência usa vídeo normalizado em main e o Footer já possui logótipos gráficos derivados das referências enviadas.

## 4. Contrato visual e narrativa implementada

Sequência pública canónica:

1. Intro Morph → Hero estável;
2. Manifesto / O Colégio;
3. Aprender em Movimento — Descobrir → Criar;
4. Futuro & Tecnologia — 01 TIC → 02 Engenharia → 03 Ciência → 04 Segurança Digital;
5. Vida COLUS — fotoensaio;
6. Pertencer — Community Ring aberto;
7. Transformar — Expressar → Construir → Avançar;
8. Vozes COLUS — editorial e testemunhos apenas autorizados;
9. Convite Final — CTA/contactos;
10. Footer EduCore/RIGHTWARE.

**Navegação aprovada:** O Colégio (#o-colegio), Experiência (#experiencia), Futuro (#futuro), Comunidade (#comunidade), Contactos (#contactos). CTA “Marcar uma visita” dirige a #contactos.

**Direção visual:** Warm Paper, Deep Ink, azul/laranja COLUS; Manrope para estrutura e Newsreader para editorial; media fotográfica predominante; uma Scene Window dominante em Futuro; devices Path/Node/Signal Field/Ring/Rise Axis como apoio sem tapar rostos; desktop 12 colunas, tablet 8 e mobile 4.

**Copy e riscos:** não inventar depoimentos, métricas, autorizações de imagem, eventos ou claims de Engenharia. Media de pessoas para demo privada carecem de validação de direitos antes de produção pública. Contactos (info@colus.ac.mz, +258 84 700 0242, @colus_mz, Matola-Rio KM 16) são do demonstrador; revalidar destinos antes de produção.

## 5. GATE ABSOLUTO — Hero aprovado e protegido

A recuperação visual do Hero foi considerada crítica pelo utilizador: headline/CTA à esquerda, vídeo original de atividade desportiva numa janela orgânica à direita, logo oficial, máscara/crop, timings da Intro → Hero e Hero estável. **NÃO alterar sem autorização explícita**:

- frontend/src/components/landing/IntroHeroSection.tsx;
- frontend/src/components/landing/LandingMedia.tsx (mudanças globais afetam o Hero);
- media/colus/landing/colus-assets-final-v03/01-hero/video/COLUS-HERO-VID-001-SPORT-DAY.mp4;
- poster Hero, logo oficial raster e restante composição/crop/motion aprovado.

**Bloqueio automatizado:** [hero-protected-asset-lock.json](../colus/presentation/hero-protected-asset-lock.json) + frontend/scripts/qa-protected-assets.mjs. Marca oficial não pode ser substituída por símbolo derivado da animação. O favicon COLUS usa recorte do logo oficial sem alterar a fonte.

## 6. Trabalho executado e decisões de design

### 6.1 Consolidação e implementação base

- Master V0.18 e specs determinam a landing cinematográfica, com Intro Morph e Futuro como signature moments, não como carrossel/slideshow genérico.
- Frontend React/Framer Motion com componentes separados por secção e Header responsivo/tematizado.
- Hero estável recuperado e aprovado visualmente depois de regressões anteriores; não remover o estado final para “simplificar”.
- Alterações orientadas por capturas do utilizador em Aprender (miniatura não tapa etiqueta), Futuro (legenda fora da máscara, uma cena ativa, node segue path real), Pertencer (ring aberto, mais expressivo, sem rostos cobertos), Transformar e Vozes (node ligado ao scroll).
- O Motion Spec inclui reduced motion, Save-Data, pauses, sticky e regras de fast/reverse scroll; conformidade integral ainda requer auditoria real.

### 6.2 RIGHTWARE Contract-Driven Design & Motion QA

Dois eixos complementares, que podem ser reutilizados noutros projetos RIGHTWARE:

- **Design Fidelity:** frontend/src/shared/design-qa/designFidelity.ts, domDesignAdapter.ts, frontend/src/config/colusDesignQaContract.ts.
- **Motion QA:** frontend/src/shared/motion-qa/contractEvaluator.ts, frontend/src/config/colusMotionQaContract.ts; mede scroll coverage, sticky, media, cena ativa e playback de vídeo.
- **Painel:** frontend/src/components/landing/LandingMotionQA.tsx, DEV apenas, com auditoria instantânea/completa, exportações TXT/JSON e opção “Copiar resumo curto” (máx. 2200 caracteres) para colar diretamente na conversa.
- **Checkpoints:** frontend/src/shared/design-qa/visualCheckpoints.ts e frontend/src/config/colusVisualCheckpoints.ts, 45 destinos de inspeção previstos sobre o master; navegação e plano, **não pixel-diff automático nem baselines visuais aprovados**.
- **Testes:** frontend/scripts/qa-contract-tests.mjs e qa-protected-assets.mjs; comandos via npm run test:qa.
- **Frameworks transversais:** [Design Fidelity](../rightware/frameworks/design-fidelity-contract-driven.md) e [Motion QA](../rightware/frameworks/motion-qa-contract-driven.md). Não misturar contratos COLUS com o motor genérico.

O Scroll Budget é **referência de ritmo, não obrigação de altura rígida**. Desvios de vh classificam-se como REVIEW, não FAIL automático. Budget global exclui Footer natural; Hero + Manifesto é um budget combinado, não duplicado. Falhas técnicas (asset ausente, cena errada, playback exigido não comprovado) permanecem objetivas. MATCH/PASS instrumental NÃO substitui revisão humana de crop, máscara, rosto, timings e identidade.

**Relatório arquivado:** [PatedContent-Select](../colus/presentation/qa-reports/PatedContent-Select), extraído das auditorias (2) e (3). Na auditoria (3), antes das últimas correções: Design MATCH 25, MISSING 2, PARTIAL 1, REVIEW 10, DIVERGENT 0, NOT_OBSERVED 0; Motion PASS 27, FAIL 1, REVIEW 31, NOT_OBSERVED 0; scroll coverage 100%. Esses totais são **históricos e não devem ser apresentados como resultados atuais**.

O orçamento narrativo observado nessa auditoria foi ~1813vh contra alvo 1300–1580vh (sem Footer); Hero+Manifesto ~270vh; Aprender ~225vh; Futuro ~280vh; Vida ~277vh; Pertencer ~155vh; Transformar ~220vh. A nota “vida extensa” requer revisão de leitura/layout antes de tocar em CSS. Não encurtar o Hero para fazer passar o número.

### 6.3 Footer EduCore/RIGHTWARE e copyright

- Arquitetura Dark da referência aprovada com **4 grupos:** PLATFORM, SOLUTIONS, SUPPORT, COMPANY.
- Imagens de referência Light/Dark recebidas do utilizador e arquivadas no Google Drive: [pasta de assets Footer](https://drive.google.com/drive/folders/1p4cMsQK7ULo05PPHSRsrCzGW9Zd3VRaJ), com originais na [pasta 03](https://drive.google.com/drive/folders/1oiUU6_79rLqcpOX0fz1pSg57KBPw6njI).
- SVGs autocontidos recortados da imagem de referência original (preservam raster, não são vetores institucionais de origem):
  - frontend/public/media/educore/footer/educore-logo-dark.svg;
  - frontend/public/media/educore/footer/rightware-product-dark.svg.
- Implementados em frontend/src/components/landing/ContactFooter.tsx. Captura Edge desktop mostrou o Footer Dark composto com os dois lockups, quatro grupos, copyright COLUS e assinatura de produto; utilizador respondeu “clean”. **Mobile ainda não validado.**
- Itens globais dos grupos, redes e legal (Privacy Policy, Terms, Cookie Policy, System Status) não receberam URL inventadas; permanecem não clicáveis até existir destino oficial. Decisão **OPEN-01 idioma do Footer** continua aberta nos docs; manter a marca global em inglês até decisão explícita.
- **Copyright sempre COLUS.** RIGHTWARE somente tecnologia / marketing de produto.

### 6.4 Favicon COLUS

- frontend/public/favicon-colus.svg, derivado de recorte do logo oficial COLUS com fonte original preservada.
- frontend/index.html inclui rel=icon. Capturas Edge confirmaram favicon visível no separador.
- Não inventar marca alternativa e não modificar a origem protegida.

### 6.5 Ciência — diagnóstico Manus, normalização e aprovação desktop

**Problema histórico:** COLUS-FUTURO-CIENCIA-VID-001.mp4 estava codificado com os pixels de lado. As tentativas de correção CSS (rotate-90, rotate-180, com/sem scale) não corrigiam consistentemente; posterior substituição temporária por poster produziu o FAIL de media no QA.

**Diagnóstico técnico reportado pelo Manus:** vídeo fonte 720×720, SAR/DAR 1:1, 24fps, sem metadata rotation/display matrix; frames físicos lateralizados. Um transpose anti-horário de 90° foi confirmado nos frames inicial/intermédio/final.

**Solução integrada na main:**
- preservar o MP4 original;
- nova cópia frontend/public/media/colus/landing/colus-assets-final-v03/04-futuro/ciencia/COLUS-FUTURO-CIENCIA-VID-001-upright.mp4;
- frontend/src/components/landing/FuturoSection.tsx usa a cópia vertical, sem rotação CSS, com poster original fallback;
- LandingMedia.tsx global, Hero e outras cenas não alterados pela intervenção Manus.

**Testes comunicados pelo Manus:** npm run typecheck, npm run test:qa, npm run build passaram. Evidência browser desktop 1280×1100, frames ~0.5s, 9.5s, 17.5s; currentTime avança, readyState 4, sem transform, pausas fora do viewport.

**Aprovação posterior documentada em main:** o responsável do projeto confirmou visualmente a orientação e composição da Ciência **para desktop/Edge**, conforme [QA Ciência](../colus/presentation/qa-reports/science-orientation-2026-10-16/README.md) e [backlog §10](../colus/presentation/design-motion-qa-findings-2026-10-14.md). **Mobile, teste integral de todas as cenas e auditoria visual de toda a landing não estão aprovados.**

**Git:** branch Manus [fix/colus-science-video-orientation](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/tree/fix/colus-science-video-orientation), commit 087eccd272a74ae40ecb2028fedb34eb8a8f7de3. Comparação realizada em 2026-10-16: essa branch está atrás de main por dois commits de documentação, sem commits exclusivos; **o código de Ciência JÁ está em main. NÃO executar outro merge nem recomeçar esta correção.**

### 6.6 Divergência de continuidade: Vozes COLUS

A decisão C de 2026-10-05, registada no [CURRENT histórico](HANDOFF-COLUS-CURRENT.md), retirou `TestimonialsSection` da landing pública. Porém, em 2026-10-16, o código da `main` em `frontend/src/pages/LandingFoundationPage.tsx` **monta novamente** `<TestimonialsSection />`, com conteúdo editorial sem depoimentos fabricados. Não se identificou aprovação explícita para reverter a decisão C. **Assinalar para confirmação do responsável; não alterar a landing automaticamente.**

## 7. Estado atual por área (não confundir com aprovação total)

| Área | Estado | Ação seguinte / caveat |
|---|---|---|
| Hero original/Intro e composição estável | Protegido e aprovado anteriormente | Regredir? Bloquear; usar hash lock e check visual |
| Footer Dark desktop | Implementado; captura desktop favorável (“clean”) | Revalidar mobile, contraste e links reais |
| Logótipos Footer | Assets integrados a partir de referência enviada | Não descrever como vetores originais oficiais independentes |
| Copyright COLUS / assinatura RIGHTWARE | Acordado e aplicado | Não transferir titularidade |
| Favicon COLUS | Implementado, capturado no Edge | Preservar |
| Ciência 03 desktop | Vídeo vertical integrado em main; aprovado no Edge | Preservar o MP4 normalizado e fonte; validar mobile |
| Ciência 03 mobile | PENDENTE | Emulação real, poster/reduced motion, autoplay/pausa, crop |
| Engenharia 02 | PENDENTE DE FIDELIDADE AO MASTER | Implementação usa foto de Aprender; spec espera device-led, Path/Node/Schematic sem overlay sobre rostos |
| TIC / Segurança Digital / trocas de cena | Implementadas, não aprovadas globalmente | Rever 01→02→03→04 e scroll inverso/rápido |
| Aprender / Vida / Pertencer / Transformar | Parcialmente implementados e refinados | Comparação visual dos checkpoints, geometria, duração e handoffs |
| Vozes COLUS | Secção editorial atualmente montada, sem citações fabricadas; conflito com decisão C (05/10) | Confirmar a visibilidade com o responsável antes de mudar |
| Footer links, política, idioma | PENDENTES | Não inventar URLs ou traduzir OPEN-01 sem decisão |
| Motion budget global e por secção | REVIEW histórico | Validar leitura, ritmo e âncoras; evitar CSS artificial |
| QA visual automático com screenshots aprovados | ROADMAP | Ainda não existe pixel-diff/baseline validada |
| Publicação pública da landing | NÃO AUTORIZADA | Validar conteúdo, direitos e integração completa |

## 8. Backlog de execução — ordem recomendada

**P0 — Regressão e baseline atual:**
- Fazer fetch da main atual, conferir o código do vídeo vertical e o relatório de Ciência; garantir Hero/Footer/copyright intactos. Não alterar assets aprovados.
- Executar tests e build antes de novas mudanças. Anotar resultados e diferenças; não assumir resultados de novo ambiente.
- Validar Ciência em viewport mobile e comportamento reduced-motion/save-data, usando vídeo upright e poster correto.

**P1 — Futuro 02 / Engenharia:**
- Abrir master Draw.io e Motion Spec §8; projetar intervenção “device-led” com esquema, Path, Node e Light Halo subtil sem mascarar rostos.
- Evitar foto genérica tomada como prova de Engenharia; não reintroduzir elemento gráfico persistente por cima de crianças.
- Fazer implementação incremental numa branch, captures before/after, e avaliar TODAS as quatro cenas da janela Futuro em ida/volta e fast scroll.

**P1 — Fidelidade visual / motion transversal:**
- Retomar 45 checkpoints; auditar desktop 1440, 1280 e 1024, tablet 768–1023, mobile 390 e compacto 320–360, prefers-reduced-motion e alternância de tema do Header.
- Rever Intro→Hero→Manifesto, Aprender (legenda sem sobreposição), Vida (fotoensaio e duração), Pertencer (ring aberto/nodes), Transformar (3 estados), Vozes (sem testemunho fabricado), Convite e Footer mobile.
- Comparar recortes e crops reais com baselines aprovadas antes de reclamar equivalência visual.
- Investigar budget total e stage budgets como ritmo editorial; não sacrificar o Hero aprovado.

**P2 — Produto/publicação:**
- Confirmar direitos/autorização de uso de imagens de pessoas, email/Instagram/contato, autenticidade de testemunhos e links jurídicos/sociais.
- Decidir OPEN-01 idioma do Footer.
- Se necessário, criar runner browser/CI para screenshots versionados, fast/reverse e diffs supervisionados; manter framework genérico RIGHTWARE independente.
- Publicação apenas após aprovação global explicitamente registada.

## 9. Procedimento operacional para retomar no Windows

Abrir PowerShell **na raiz** do repositório e executar, sequencialmente:

~~~powershell
git status
git branch --show-current
git switch main
git pull --ff-only origin main
cd frontend
npm run typecheck
npm run test:qa
npm run build
npm run dev
~~~

Se o terminal já estiver em frontend, **não repetir cd frontend**. Se Vite já está ativo, **não iniciar outro npm run dev**.

Abrir:
- Landing: http://localhost:8080/
- QA: http://localhost:8080/?motionQA=1#top
- Futuro: http://localhost:8080/?motionQA=1#futuro

No painel: Auditar página completa (Design + Motion); guardar ficheiro JSON/TXT em docs/colus/presentation/qa-reports quando houver dados novos, ou usar “Copiar resumo curto”. O último resultado automatizado arquivado é histórico, anterior a várias correções.

## 10. Instruções para o próximo agente/chat

1. **Ler primeiro este handoff e a main atual no GitHub.** Conferir branch/HEAD; dar precedência ao código atualizado e decisões mais recentes sobre anotações antigas.
2. **Não pedir ao utilizador para repetir informação que já existe no GitHub ou Drive.** O utilizador prefere execução prática, commits rastreáveis e análise a partir dos arquivos já presentes.
3. **NÃO mexer no Hero aprovado, vídeo original, máscara/crop, favicon, marca e copyright COLUS** sem autorização explícita. Não misturar marketing técnico com titularidade do colégio.
4. **NÃO considerar a landing finalizada.** Próxima intervenção é sobretudo validação mobile da Ciência e P1 Engenharia device-led; continuar comparação do master e Motion QA.
5. Para alterações visuais significativas, começar por ler spec, identificar critérios de aceitação, isolar branch, testar e pedir aprovação visual com evidência; não “corrigir” com valores arbitrários repetidos.
6. Distinguir sempre **implementado**, **testado por ferramentas**, **aprovado visualmente pelo utilizador** e **pendente**. Não declarar sucesso de upload/build/merge sem confirmação de ferramenta.
7. Verificar que a branch do Manus já foi incorporada na main antes de propor PR/merge; evitar repetição de trabalho.
8. Ao final de cada intervenção, atualizar documentação de decisão/QA no GitHub e fornecer o URL/commit e comandos específicos.

**Princípio de continuidade:** RIGHTWARE entrega qualidade verificável segundo a direção aprovada, com progressão controlada. O utilizador controla o ritmo e não deve pagar com regressões no Hero pela correção de outras secções.

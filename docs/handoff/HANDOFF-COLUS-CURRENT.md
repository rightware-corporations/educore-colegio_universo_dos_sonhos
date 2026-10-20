# COLUS — CURRENT LIVING HANDOFF

> **ATUALIZADO EM 2026-10-16.** Ler primeiro o [índice cronológico](README.md): 03/10 → 04/10 → [handoff de 16/10](HANDOFF-COLUS-2026-10-16.md) → **este CURRENT por último**.  
> As secções 6–14 abaixo preservam o registo até **2026-10-05**, mesmo quando ficaram historicamente ultrapassadas. Não seguir os antigos próximos passos sem consultar a secção 15 atualizada.
>
> **Estado recente:** Ciência usa vídeo `COLUS-FUTURO-CIENCIA-VID-001-upright.mp4` já integrado na `main`, aprovado visualmente **apenas para desktop/Edge**; mobile pendente. Footer Dark desktop observado e aceite pelo utilizador; logótipos e favicon implementados; © 2026 Colégio Universo dos Sonhos continua a ser o copyright institucional. O QA Design/Motion tem 45 checkpoints planeados, ainda sem pixel-diff automático aprovado. **Landing em desenvolvimento**, não concluída.
>
> **Divergência histórica:** a decisão C de 05/10 retirara `TestimonialsSection`, mas `LandingFoundationPage.tsx` atualmente volta a montá-la. O conteúdo de Vozes é editorial, sem depoimentos fabricados. A decisão sobre manter/remover a secção requer confirmação explícita antes de alterar o código.

**Project:** COLUS / Colégio Universo dos Sonhos  
**Repository:** rightware-corporations/educore-colegio_universo_dos_sonhos  
**Branch:** main  
**Status:** ACTIVE — living operational handoff

---

## 1. PURPOSE

This file is the current operational handoff for COLUS.
It exists so work can continue from a new ChatGPT conversation, another AI agent, or another work session without depending on the previous chat's context.
This file must be updated as work progresses.
It is not a replacement for historical handoffs. It is the current operational state.

## 2. SOURCE OF TRUTH

1. Git repository / current code — source of truth for what is actually implemented.
2. This file — source of truth for current operational context, progress, decisions-in-progress, verification status, blockers, and next action.
3. Historical handoffs and project documentation — source of truth for historical decisions, architecture, requirements, and prior context.
4. Chat conversation — execution context only; it must not be the only place where important state exists.

If this handoff conflicts with the repository, inspect the repository and reconcile the handoff before continuing.

## 3. HISTORICAL HANDOFFS

### Baseline
docs/handoff/HANDOFF-COLUS-2026-10-03.md

This remains historical/authoritative for the original architecture and product decisions captured there.

### Continuation snapshot
docs/handoff/HANDOFF-COLUS-2026-10-04-CONTINUATION.md

This captures the recovery/continuation state after the work performed following the 2026-10-03 handoff.
Historical files must not be rewritten merely to make the current state look cleaner.

## 4. CONTINUITY PROTOCOL

Every meaningful work cycle must follow this sequence:

1. Read this CURRENT handoff.
2. Inspect the current Git state and relevant files.
3. Determine the exact task and constraints.
4. Implement only the approved scope.
5. Verify the result with the appropriate tests, build, runtime inspection, or visual QA.
6. Update this CURRENT handoff with the resulting state.
7. Commit the handoff update to Git.
8. Record the exact next action so another agent can continue immediately.

A "meaningful work cycle" means a completed implementation block, QA block, investigation, decision, or other output that materially changes project state. Do not create meaningless updates for every sentence or conversational message.

### Mandatory rule

Before ending a meaningful work cycle, the CURRENT handoff must describe the state that actually exists in Git.
No agent should finish substantial work while leaving the operational handoff stale.

## 5. UPDATE FORMAT

When updating this file, preserve its structure and maintain these sections:
- Current Status
- Current Phase
- Completed Since Last Update
- Current Implementation State
- Verification / QA
- Known Issues / Blockers
- Decisions / Constraints
- Files / Commits of Interest
- Immediate Next Action
- Last Updated

Keep entries factual and concise.
Do not fabricate testimonials, social proof, metrics, business claims, assets, implementation status, or test results.

## 6. CURRENT STATUS

State: Landing-page implementation and visual QA are active. Two product/design decisions were implemented in the 2026-10-05 cycle (see sections 8 and 13).

Latest code commit: `297e637502c0c5d86cf4ba3998959e0559da3928` (Convite Final symbol), preceded by `c9ae5133b11a3f6667201ed3f28845aa275c76d1` (testimonial removal). Base before this cycle: `492b0a8` (docs-only); previous code baseline `ea055622cc3cfd16af6f4b35c05949b2106b1bc3`.
`ac73497` is the handoff commit for this cycle.

**PUSH STATUS: PUSHED.** `origin/main` was fast-forwarded `492b0a8..ac73497` on 2026-10-05 and confirmed with `git ls-remote`. A later docs-only commit recording this status may sit on top; verify `origin/main` before assuming.


## 7. CURRENT PHASE

### Landing implementation → visual QA → mobile QA → finalization

Status of the sequence:
1. Inspect current landing implementation — DONE (recovery audit).
2. Desktop visual QA — PARTIAL: only Transformar → Convite Final and the Convite symbol were inspected (headless Chromium, see section 11). Full-landing desktop QA is NOT done.
3. Fix only confirmed deviations — two approved changes done; further confirmed deviations are listed in section 12 and are NOT approved for fixing.
4. Mobile QA — PARTIAL: only Convite Final and the Transformar → Convite handoff at 390px.
5. Testimonial placeholder — RESOLVED by decision C: section removed from the public landing (no testimonial content exists or was invented).
6. Re-verify the complete landing — NOT done.
7. Update this handoff — done for this cycle.

Do not jump to unrelated product/system work while this phase is active unless explicitly approved.


## 8. COMPLETED SINCE HISTORICAL HANDOFF

Known completed work recorded in the continuation snapshot includes landing sections across Intro, Hero, Manifesto, Aprender, Futuro, Vida COLUS, Pertencer, Transformar, Depoimentos, Convite Final, and Footer.

Known corrective commits:
- Hero copy stabilization: e2882d0...
- Manifesto bridge fix: 7d2b642...
- Aprender trailing blank-space fix: 6e4b11d...
- Futuro dark dead-zone fix: e726c0c...
- Pertencer stage-fill fix: ae16d38...
- Transformar → testimonial handoff: 2a85189...
- Official COLUS logo corrections: a4828fa..., 6f285a2..., ea05562...

These references are historical pointers. Verify the actual repository state before relying on them.

### Cycle 2026-10-05
- Read-only recovery audit of Git vs handoffs (no code changed).
- **Testimonials removed from the public landing** — `c9ae5133b11a3f6667201ed3f28845aa275c76d1`. `TestimonialsSection.tsx` is kept in the repo, unmounted. No replacement content was added.
- **Convite Final branding implemented using the approved official-asset-derived approach** — `297e637502c0c5d86cf4ba3998959e0559da3928`. The derived `ColusMark` was replaced by a CSS crop of the official `COLUS-BRAND-LOGO-RASTER-001.jpg` (symbol only, wordmark excluded, no redraw, no new asset). Visual-quality condition passed in headless QA; the option-4 fallback (remove the mark) was not triggered.

## 9. CURRENT IMPLEMENTATION STATE

The implementation should be treated as the current Git state, not as a claim from this document.

Landing composition (`frontend/src/pages/LandingFoundationPage.tsx`): Header, IntroHero, Manifesto, Aprender, Futuro, Vida, Pertencer, Transformar, ContactFooter (Convite Final + Footer). **TestimonialsSection is NOT mounted.** Transformar now hands off directly to Convite Final.

Notes for anyone editing Convite Final:
- `ColusOfficialSymbol.tsx` displays a CSS crop window of the official JPG (source px: x 186, y 64, w 434, h 482; symbol spans x 192–613, y 71–548; wordmark starts at y 551; bottom edge held at 546 to keep JPEG ringing from the wordmark out of view).
- The JPG has an opaque white background. Removal relies on `mix-blend-multiply` on the logo wrapper in `ContactFooter.tsx`, plus `isolate` on the section and NO stacking-context ancestor (the content container's former `z-10` was removed). Re-adding `z-10`/transforms/opacity on an ancestor between the wrapper and the section will bring back a white rectangle.
- `ColusMark.tsx` (derived SVG) still exists but is unreferenced. Deleting it is a separate, unapproved decision.
- The header still uses the official raster logo via `ColusOfficialLogo`.
- No fabricated testimonials or unsupported social-proof content exist in the landing.


## 10. ARCHITECTURE BASELINE

The broader project architecture remains governed by the historical handoff and project documentation.
Known baseline:
- 1 school = 1 repo = 1 independent deployment.
- RIGHTWARE Control Plane.
- Isolated school Data Plane.
- Customized Experience Plane.
- School Super Admin separation.
- Backend baseline: Java / PostgreSQL / Redis.
- Frontend baseline: React + TypeScript + Vite.
- Do not casually alter established architecture while working on the landing.

For exact architectural requirements, consult the historical handoff and repository documentation.

## 11. VERIFICATION / QA

### Verification performed in cycle 2026-10-05
Environment: headless Chromium 141 via Playwright in the agent sandbox. Static frames, not real-time motion video. Google Fonts were blocked by the sandbox network (403), so fallback fonts were used: typography in these checks is NOT representative.
- `npm run typecheck`: exit 0, before and after the changes.
- `npm run build` (vite): succeeded, before and after (module count 2000 → 1999 as the unmounted component is tree-shaken).
- Convite Final symbol: inspected at 1440×900 (1× and 2×), 1920×1080, reduced-motion, and mobile 390×844 (DPR 3 / reduced-motion DPR 2). No white rectangle, no wordmark, no visible bottom-edge line; residual JPEG ringing ≤ 9/255 (1×) and ≤ 17/255 (2×) at the very bottom edge.
- Convite Final geometry (h2, p, CTAs, contact links, curve) measured identical to the pre-change version at 1440 and 390 (all deltas 0).
- Transformar → Convite Final transition: desktop frames and mobile 390px frames captured and inspected.
- Sticky pinning measured directly in Aprender, Futuro, Pertencer, Transformar (see section 12).

### NOT verified
- Full-landing desktop QA against the approved master; full mobile QA.
- Real-browser rendering with real fonts (Manrope/Newsreader) and real-time motion.
- Header theme (dark/light) behaviour: the header stayed hidden during programmatic scroll jumps, so it was not checked.
- Intro, Hero (incl. video), Manifesto, Vida: not inspected this cycle.
- Spec-level comparison of Convite Final against the approved master image.


## 12. KNOWN ISSUES / BLOCKERS

### Open (confirmed by measurement; NOT fixed; fixes NOT approved)
1. **Sticky stages do not pin.** In Aprender (`#experiencia`), Futuro, Pertencer (`#comunidade`) and Transformar, the `sticky top-0 h-screen` stage sits inside a section root with `overflow-hidden`, which neutralizes `position: sticky`. Measured (Chromium 141): the stage's top moves at exactly 1:1 with scroll in all four. With `overflow: clip` injected via CSS only (no source change) all four pin. Likely root cause of several earlier "undersized / dead zone" symptoms. Changing it affects four approved sections and needs explicit approval plus full re-QA; earlier tuning commits were made against the unpinned behaviour.
2. **Transformar desktop tail:** 738px of empty dark below the last media block, then a hard dark → light cut into Convite Final. Previously masked by the dark testimonial section. Probably a consequence of item 1. Mobile handoff is compact and clean (~80px padding then cut).
3. **Convite Final halo looks right of centre.** Present before this cycle's changes. Cause not verified.
4. **No lockfile in the repo.** Direct dependencies are pinned to exact versions; transitive ones are not. Lockfile/package-manager work is unapproved and separate.
5. `docs/handoff/NEW-CHAT-PROMPT-COLUS.md` is stale (still says the current step is STACK and not to program). Not modified.
6. Hero video request failed in the headless run (cause unconfirmed; may be a codec limit of headless Chromium). Check in a real browser.
7. Design docs `copy-status-colus.md` §10 and `depoimentos-colus.md` §3 still describe the testimonial placeholder as mandatory/allowed for the MVP. They were not edited; the supersession for the public landing (decision C) is recorded only here.

### Resolved by decision
- Testimonial placeholder shown to visitors — removed from the public landing (decision C). The underlying content question remains: no authorized real testimonial exists.

### Rule
Do not invent proof, testimonials, reviews, student outcomes, numbers, or institutional claims to fill placeholders.


## 13. DECISIONS / CONSTRAINTS

Standing constraints:
- Preserve approved visual direction unless a concrete deviation or explicit new instruction requires change.
- Avoid generic AI-generated/SaaS-style design.
- Do not redesign unrelated sections during focused QA.
- Do not modify backend, architecture, dependency versions, package manager, or lockfile when the task is limited to landing/frontend QA.
- Verify before claiming completion. Keep historical handoffs intact. Keep this file current.
- Prefer small, traceable changes.
- Before editing an existing GitHub file through the API, fetch its current SHA.

Decisions recorded (approved by the project owner, 2026-10-05):
- **Testimonials decision = C.** Remove the section from the public landing for now; keep the component file; no fabricated or filler content. Reintroduce only with an authorized real testimonial (text, name, relationship to the school, written authorization). Supersedes the placeholder rule for the public landing.
- **Convite Final logo decision = 3, conditional on visual quality.** Use the symbol area of the official `COLUS-BRAND-LOGO-RASTER-001.jpg`, never a redrawn/approximated mark. The condition passed in headless QA with fallback fonts; confirmation in a real browser is still pending. If it looks poor there, fall back to option 4 (remove the mark from Convite Final).
- **Lockfile: unapproved / separate future task.** Do not install or commit a lockfile or change dependencies without explicit approval.

Not decided (do not treat as approved): fixing the sticky-stage `overflow-hidden` issue; any change to Transformar's tail; deleting `ColusMark.tsx`; editing the design docs to record decision C; retiring `NEW-CHAT-PROMPT-COLUS.md`.


## 14. FILES / COMMITS OF INTEREST

### Handoffs
- docs/handoff/HANDOFF-COLUS-2026-10-03.md
- docs/handoff/HANDOFF-COLUS-2026-10-04-CONTINUATION.md
- docs/handoff/HANDOFF-COLUS-CURRENT.md

### Important implementation commits
- e2882d0...
- 7d2b642...
- 6e4b11d...
- e726c0c...
- ae16d38...
- 2a85189...
- a4828fa...
- 6f285a2...
- ea05562...


### Cycle 2026-10-05 commits (pushed to origin/main)
- `c9ae5133b11a3f6667201ed3f28845aa275c76d1` — fix: remove testimonial placeholder from public landing (`LandingFoundationPage.tsx`)
- `297e637502c0c5d86cf4ba3998959e0559da3928` — feat: use official COLUS symbol crop in Convite Final (`ColusOfficialSymbol.tsx` new, `ContactFooter.tsx`)
- `ac7349715e8b8ec066501749443ab2873e9e17e9` — docs(handoff): record testimonial removal and Convite Final symbol cycle (`HANDOFF-COLUS-CURRENT.md`)

### Files of interest
- `frontend/src/pages/LandingFoundationPage.tsx`
- `frontend/src/components/landing/ContactFooter.tsx`
- `frontend/src/components/landing/ColusOfficialSymbol.tsx`
- `frontend/src/components/landing/TestimonialsSection.tsx` (unmounted, retained)
- `frontend/src/components/landing/ColusMark.tsx` (unreferenced, retained)
- `frontend/src/components/landing/TransformarSection.tsx` (sticky issue, tail)
- `docs/colus/design/landing/convite-final-colus.md`, `docs/colus/presentation/landing-qa-v1.md` (brand-mark rule)

## 15. IMMEDIATE NEXT ACTION — RECONCILIADO EM 2026-10-16

A referência operacional integral é [HANDOFF-COLUS-2026-10-16.md](HANDOFF-COLUS-2026-10-16.md), especialmente §§7–10. O resumo histórico de 05/10 não substitui o estado atual.

1. Verificar a `main` real e ler os handoffs pela ordem do [índice](README.md). **Não voltar a fazer merge** de `fix/colus-science-video-orientation`: o vídeo vertical da Ciência já está integrado.
2. Validar **Ciência 03 em mobile**, reduced-motion, poster/fallback e pause/play. Desktop/Edge já foi aprovado visualmente.
3. Trabalhar a fidelidade de **Engenharia 02 device-led** contra o master e Motion Spec §8, sem fotografia genérica usada como prova de Engenharia nem overlays sobre rostos.
4. Comparar as secções com os **45 checkpoints**; testar desktop/mobile/tablet, scroll inverso/rápido, sticky e ritmo editorial. As diferenças em vh são `REVIEW`, não justificam reduzir o Hero aprovado.
5. Confirmar com o responsável a **decisão C vs Vozes COLUS atualmente montada**, links sem URLs, idioma do Footer e direitos antes de declarar publicação.

**Limites:** preservar `IntroHeroSection.tsx`, vídeo/poster/máscara Hero e marca oficiais; copyright **© 2026 Colégio Universo dos Sonhos**; `Powered by EduCore · A RIGHTWARE Product` apenas como assinatura tecnológica. **A landing continua incompleta.**

**Referência inicial desta atualização:** `main` verificada em `c3a37be0af5c4f598ae137b2228476ea9fb472a8`; os commits desta organização atualizam a HEAD. Verificar a HEAD real em cada sessão.

## 16. HANDOFF UPDATE RULE

Whenever substantial work is completed, this file must be updated before the work session is considered complete.
The next agent should be able to answer these questions by reading this file:
- What is the project?
- What is the current phase?
- What has actually been completed?
- What is verified?
- What is not verified?
- What remains?
- What must not be changed?
- What is the exact next action?
- Which Git commit represents the current state?

If any of these answers are missing after a meaningful work cycle, the handoff is incomplete.

## 17. LAST UPDATED

**2026-10-16.** Reconciliado o estado vivo com o handoff operacional de 16/10, o código da `main` e a cronologia documental. As secções históricas 6–14 continuam úteis para o percurso até 05/10, não para provar o estado atual. Atualizar este documento em cada ciclo substancial e manter os handoffs datados imutáveis.


## 18. MOBILE EDITORIAL PASS — 2026-10-16 (BRANCH, NÃO MERGED)

**Estado:** implementação realizada em branch de trabalho; requer testes técnicos, QA em browser mobile e aprovação visual do proprietário. Não declarar a landing concluída.

**Branch:** `feat/colus-mobile-editorial-storytelling` (criada a partir de `main@b5b493386377cc54d4f8850e294557abe4a90bd5`).

**Pedido autorizado nesta sessão:** transformar os layouts mobile que pareciam «card + texto» em composições imersivas com tipografia, títulos e narrativa dentro das imagens, melhores transições editoriais e continuidade entre secções. Aprovação para implementar NÃO equivale à aprovação visual final nem autorização para merge/publicação.

**Alterado na branch:**
- `frontend/src/components/landing/AprenderSection.tsx` — Descobrir/Criar como capítulos com headline sobre as imagens;
- `frontend/src/components/landing/FuturoSection.tsx` — TIC/Engenharia/Ciência/Segurança Digital como cenas integradas; Engenharia **mobile** agora device-led SVG em vez de foto genérica, Ciência conserva vídeo upright e poster;
- `frontend/src/components/landing/VidaSection.tsx` — imagens e texto compõem uma sequência editorial contínua;
- `frontend/src/components/landing/PertencerSection.tsx` — storytelling humano/familiar sem legendas falsas;
- `frontend/src/components/landing/TransformarSection.tsx` — Expressar/Construir/Avançar em sequência vertical sem captions soltas.

**Não alterado:** Hero/Intro protegido, `LandingMedia.tsx`, layout desktop das secções, dados/backend, deps, Footer e testemunhos.

**Commits de código:** `c8abc96`, `56d679a`, `cb53bd0`, `fda26c5`, `c141b85`; documentação QA: `9f7b37a`.

**Verificação na sessão:** diff do GitHub limitado aos cinco componentes antes da documentação; comparação de estrutura de tags JSX sem anomalias no contador; Ciência mantém fonte normalizada; GitHub sem statuses CI para a branch consultada. O ambiente de agente não conseguiu fazer `git clone` por DNS.

**NÃO VERIFICADO:** `npm run typecheck`, `npm run test:qa`, `npm run build`, screenshots e reprodução mobile, pixel diff e aprovação visual. A correção de Ciência desktop/Edge conserva o seu estado histórico aprovado, mas QA mobile ainda não foi realizado.

**Evidência e plano QA:** `docs/colus/presentation/qa-reports/mobile-editorial-2026-10-16/README.md`.

**Próxima ação exata:** abrir esta branch em browser mobile, executar testes e inspecionar 360/390/430/768px, vídeo Ciência/play-pause/reduced-motion/Save-Data, contraste e crop nas cenas, ritmo editorial completo e regressões desktop. Ajustar apenas desvios observados. Depois solicitar aprovação visual, decidir merge e atualizar este CURRENT no estado efetivamente integrado em `main`.

**Divergências ainda abertas:** Engenharia 02 **desktop** continua com fotografia histórica não device-led; Vozes COLUS decisão C versus secção montada; Footer links/idioma e direitos pré-publicação.


## 19. FUTURO MOBILE — REVISÃO COM CAPTURA DO EDGE (2026-10-16)

**Feedback real do proprietário:** screenshot no Edge DevTools, iPhone 16 Pro Max 440×956, mostra Engenharia 02 com demasiada separação entre desenho técnico e título/copy, capítulos com aspeto de cartões independentes, e Ciência 03 parcialmente visível ao final. O painel `?motionQA=1` está presente e sobrepõe-se à parte inferior da visualização; não confundir overlay de QA com conteúdo da landing.

**Correção aplicada apenas na branch `feat/colus-mobile-editorial-storytelling`:**
- `FuturoSection.tsx`: sequência mobile passa a campos full-bleed consecutivos, sem margens/gaps entre cartões;
- Engenharia 02: headline editorial «Das ideias às possibilidades.» no topo, schematic maior em zona central e copy no final; Path/Node coerente com a direção device-led, sem inventar fotografia ou evento;
- Ciência 03 mantém ficheiros de vídeo `upright.mp4` e poster anteriores; apenas composição dos textos/campo mobile mudou;
- Segurança Digital continua na narrativa visual, sem novos media;
- JSX desktop comparado integralmente com `main`: idêntico. Hero e `LandingMedia.tsx` intocados.

**Commit de correção:** `68cb5d98f9cd234621a2ceefa87e90e52458ae1e`.
**Relatório de diagnóstico:** `docs/colus/presentation/qa-reports/mobile-editorial-2026-10-16/README.md` (atualizado após o fix).

**Validação observada:** revisão estática de referências/tags e comparação textual do JSX desktop. **Não houve screenshot pós-fix, typecheck, test:qa ou build nesta sessão.** A correção deve ser tratada como candidato a aprovação mobile.

**Próximo passo:** atualizar branch no VS Code com `git pull --ff-only origin feat/colus-mobile-editorial-storytelling`; abrir `http://localhost:8080/#futuro` sem parâmetro `?motionQA=1`, recarregar e inspecionar sequência TIC→Engenharia→Ciência→Segurança Digital em 390×844/440×956. Obter evidência pós-fix, executar testes e corrigir apenas desvios observados. PR #2 permanece draft; não integrar na `main` sem validação.


## 20. MOBILE FUTURO — FEEDBACK REITERADO E QA LAUNCHER (2026-10-16)

**Feedback do proprietário:** segunda captura do Edge DevTools, 440×956, URL `localhost:8080/#futuro`: «continua o mesmo erro». A screenshot confirma que a reorganização anterior de Engenharia não resolveu a dificuldade de narrativa visual e de continuidade com as cenas adjacentes. **Não considerar a cena Engenharia aprovada.**

**Diagnóstico de UI confirmado no código:** o botão flutuante `Abrir Design + Motion QA` continuava visível em DEV mesmo sem `?motionQA=1`, pois `LandingMotionQA.tsx` devolvia um launcher `fixed bottom-4 left-4` quando QA não estava ativo. A instrução anterior de retirar o parâmetro de URL não ocultava esse botão.

**Correção aplicada na branch:** `LandingMotionQA.tsx` passa a ocultar o *launcher inativo* abaixo de `md` (Tailwind `hidden md:inline-flex`). Em desktop continua descobrível; o painel QA explícito com `?motionQA=1` não foi alterado. Commit `f4212eb`.

**Pendente:** confirmar no browser que o botão desaparece em mobile após `git pull`/refresh. A questão editorial de Engenharia permanece aberta e deve ser especificada com o proprietário antes de nova tentativa de redesenho. Preservar decisão device-led enquanto não houver autorização diferente; não inventar imagem de Engenharia nem alterar Ciência/Hero.

**Testes:** sem execução real de typecheck/build/browser nesta sessão; não declarar QA validado.


## 21. MOBILE FUTURO — HEADER / CIÊNCIA CONTRAST QA (2026-10-16)

**Nova evidência do proprietário:** terceira screenshot Edge mobile 440×956, sem `?motionQA=1`. Botão QA ausente (fix de launcher aparentemente eficaz). Persistem duas falhas específicas: Header fixo corta título de Engenharia durante scroll; o título de Ciência sobrepõe-se a estudantes no vídeo.

**Fix somente na branch `feat/colus-mobile-editorial-storytelling`:**
- `frontend/src/components/landing/LandingHeader.tsx` (commit `d1f6aae`): proteção mobile exclusiva para headlines de Futuro que entram na faixa superior do viewport. A lógica normal do Header mantém-se fora desse encontro e no desktop.
- `frontend/src/components/landing/FuturoSection.tsx` (commit `1a3bc81`): scene Ciência com campo de leitura escuro no início e vídeo progressivamente visível abaixo; marcas nos quatro títulos mobile para proteção do Header. Vídeo upright/poster inalterados; secção desktop comparada com `main` e idêntica.
- Relatório: `docs/colus/presentation/qa-reports/mobile-editorial-2026-10-16/README.md`.

**Verificação:** referências do vídeo/poster preservadas, comparação textual do bloco desktop sem diferenças, quatro títulos marcados e contagem de tags JSX balanceada; nenhum browser/build/teste npm executado após estas alterações. Não declarar aprovação visual ou técnica; PR #2 permanece draft, `main` intacta.

**Próxima ação:** atualizar a branch no VS Code; inspeção Edge mobile em 440×956/390×844, scroll lento reverso e direto no Header sobre Engenharia, cena Ciência sem texto sobre rostos, playback/pausa, responsive/tablet e testes `typecheck`, `test:qa`, `build`. Se continuar problema de composição, solicitar localização exata na captura antes de novo redesenho device-led; não modificar Hero, mídia original ou backend.


## 22. AUDITORIA ESTÁTICA DE RITMO MOBILE — 2026-10-16

**Motivo:** continuar o PR #2 sem repetir ajustes visuais especulativos antes de validar as últimas correções no Edge.

**Estado GitHub:** `main@b5b493386377cc54d4f8850e294557abe4a90bd5`; PR #2 draft, branch `feat/colus-mobile-editorial-storytelling` antes desta auditoria em `2b5729d5152eb61e56bf600369b636061746d66a`. Sem GitHub Actions configuradas/execuções observadas. Nenhum merge.

**Resultado do código:** mínimos nominais de palcos mobile são Aprender ~172svh, Futuro ~321svh, Vida ~262svh, Pertencer ~213svh, Transformar ~232svh, total ~1200svh, antes de espaçamentos e conteúdo excedente. O Scroll Budget prevê 675–735svh como referência conjunta para esses cinco blocos. Isto é **REVIEW editorial**, não `FAIL`; não encurtar mecanicamente porque a documentação define ritmo, não CSS obrigatório. Ver [relatório de ritmo](../colus/presentation/qa-reports/mobile-editorial-2026-10-16/RHYTHM-REVIEW.md).

**Validação:** inspeção do GitHub e comparação estática; não houve `typecheck`, `test:qa`, `build`, screenshot pós-fix ou QA do vídeo mobile. O runtime do agente não resolve github.com para clone nem tem acesso ao localhost do utilizador.

**Próxima ação:** atualizar branch no VS Code; executar os três comandos npm; inspecionar em Edge 390×844 / 440×956 a transição Engenharia→Ciência, scroll reverso sobre os headings, vídeo Ciência e legibilidade; depois confirmar ou refutar o risco do ritmo excessivo antes de alterar alturas. Preservar Hero, desktop e os assets protegidos. PR continua draft.


## 23. FUTURO MOBILE — CIÊNCIA PRECISA COMEÇAR COM VÍDEO (2026-10-16)

**Nova evidência:** screenshot Edge 440×956 do proprietário mostra que, após Engenharia, Ciência ainda começava com texto em fundo escuro e sem imagem visível no momento de entrada. O banner de tradução é chrome do Edge, não componente COLUS.

**Causa técnica:** `FuturoSection.tsx` colocava o vídeo mobile Ciência na região que começava em `top-[32%]`, criando entrada text-first sem o media. Contradiz o pedido aprovado de **texto imerso nas imagens** e continuidade de storytelling.

**Implementado na branch**, commit `0a33ea34044b3574f7d78ccf9d1fde88bb4cc5f5`: vídeo Ciência ocupa a cena desde o topo (`absolute inset-0`); headline e supporting copy ancorados ao fundo com scrim para legibilidade; altura mobile reduzida de `88svh` para `78svh` apenas pela eliminação da abertura sem media. O vídeo upright e o poster não foram trocados, `LandingMedia.tsx` não foi alterado, bloco desktop do Futuro continua idêntico à `main`, Hero protegido não tocado.

**Verificação observada:** comparação textual desktop idêntica, assets referenciados, tags JSX básicas balanceadas. Não ocorreu typecheck/build/QA real no Edge após este commit: correção é candidato para validação, não aprovação.

**Próxima ação:** `git pull --ff-only origin feat/colus-mobile-editorial-storytelling` com working tree limpa; hard refresh do Edge; no viewport 440×956 percorrer Engenharia → Ciência. Confirmar que o vídeo entra imediatamente, que texto no fundo não cobre rostos nem fica ilegível, e que pause/play/reduced-motion/Save-Data continuam corretos. Executar os testes npm pendentes. PR #2 permanece draft, sem merge. Relatório atualizado em `docs/colus/presentation/qa-reports/mobile-editorial-2026-10-16/README.md`.


## 24. ENGENHARIA 02 MOBILE — IMAGEM CONTEXTUAL INTRODUZIDA (2026-10-16)

**Feedback recorrente e autorização explícita:** proprietário comunicou que Engenharia «continua sem imagem», depois confirmou «sim» à solução proposta de fotografia real `COLUS-APRENDER-CRIAR-001.webp` como base, SVG técnico secundário e texto sobreposto. As capturas anteriores mostram que o painel exclusivamente esquemático não satisfazia a narrativa mobile.

**Intervenção implementada apenas na branch `feat/colus-mobile-editorial-storytelling`**, commit `9c3a3eb0c7aa7f1a84a8a7ceadc7d7d4ad6d8735`:
- `FuturoSection.tsx`: imagem COLUS da atividade prática/experiência incorporada como base real de Engenharia 02; os SVG Path/Node continuam como metáfora visual, em overlay discreto no terço inferior.
- Removida a cor de fundo opaca do componente `EngineeringMobileDevice`, que ocultaria a foto mesmo depois de inserida. O overlay tem agora fundo transparente, intensidade reduzida e máscara que privilegia imagem/rostos.
- Mantida a tipografia e o copy editorial, bem como os media aprovados de Ciência e o Hero.
- JSX desktop comparado com `main`: idêntico. `LandingMedia.tsx` e `IntroHeroSection.tsx` não alterados.

**Regra editorial importante:** a fotografia foi inspecionada; mostra experiência/criação prática de alunos, **não é evidência confirmada de uma atividade de Engenharia**. O Asset Gate histórico mantinha Engenharia como device-led por falta de media validado. A adaptação foto + device foi agora solicitada e aceite como tentativa no contexto mobile; não apresentar a imagem como prova específica de Engenharia, não declarar direitos aprovados para publicação.

**QA:** referências media e balanceamento JSX verificados estaticamente; nenhum browser/typecheck/build/test:qa pós-correção executado. Sem merge para `main`, PR #2 draft. Próxima ação: atualizar branch no VS Code, abrir Edge mobile 440×956 e 390×844, verificar imagem realmente visível, crop/rostos e texto, engenharia→ciência, redução de movimento e testes antes de solicitar aprovação.

## 25. ENGENHARIA MOBILE — REMOÇÃO DO PENTÁGONO (2026-10-16)

**Feedback com screenshot Edge 440×956:** a fotografia contextual de Engenharia já aparece, mas o grande pentágono técnico permanece sobre alunos e materiais. Pedido do responsável: eliminar a marca.

**Fix na branch de revisão:** `FuturoSection.tsx` commit `a023884f3a6e64b43e26a0cae86858695ff9fbae`. Foram retirados a montagem de `EngineeringMobileDevice` e o componente SVG exclusivo do mobile. O gradiente foi moderadamente aliviado, preservando a foto real `COLUS-APRENDER-CRIAR-001.webp`, title/copy, continuidade editorial, vídeo Ciência e poster; desktop/Hero protegidos mantidos.

**Status:** implementação feita, sem build/testes npm ou screenshot pós-correção nesta sessão. PR #2 mantém-se draft, `main` intacta. Verificar visualmente que o pentágono desapareceu e que texto e foto continuam legíveis. A fotografia retrata criação/experiência prática e não confirma um programa de Engenharia.


## 26. MOBILE STORYTELLING — ASSET DUPLICADO ENTRE CRIAR E ENGENHARIA (2026-10-16)

**Feedback:** duas screenshots Edge mobile 440×956 (Aprender/02 Criar e Futuro/02 Engenharia) mostraram a mesma fotografia `COLUS-APRENDER-CRIAR-001.webp` em ambas as cenas, juntamente com copy muito volumosa sobre ação/pessoas. A questão não era mais pentágono nem falta de media: era repetição visual e colisão da hierarquia editorial.

**Correção aplicada à branch `feat/colus-mobile-editorial-storytelling`:**
- `frontend/src/components/landing/FuturoSection.tsx`, commit `d9710eb`: substituiu apenas a imagem de **Engenharia mobile** por `03-aprender/descobrir/COLUS-APRENDER-DESCOBRIR-002.webp`, fotografia diferente com demonstração de circuito e lâmpadas; crop mobile `object-[67%_center]`; headline mais contida e alt factual. A imagem continua **contextual**, sem comprovar programa Engenharia.
- `frontend/src/components/landing/AprenderSection.tsx`, commit `c43306f`: tipografia de Criar mobile reduzida e gradiente suavizado. Texto original mantido.
- Nenhum componente desktop, Hero, Science upright/poster nem `LandingMedia.tsx` foi deliberadamente alterado.

**Nota:** a nova fotografia de Engenharia foi inspecionada no repositório, distinta do asset Criar; está presente também como detalhe na versão desktop Aprender (já existente). A duplicação apontada nas screenshots refere-se especificamente ao **mobile** e foi eliminada no código. A imagem não prova aula de Engenharia. Preservar o Asset Gate histórico e usar a nova cena apenas como contextual até aprovação.

**Estado:** implementação na branch, sem screenshot pós-correção, `typecheck`, `test:qa` ou `build` observados. PR #2 continua rascunho e `main` intacta. Próxima ação: atualizar branch e inspecionar Edge 440×956/390×844 o contraste, o corte no topo dos rostos, a visualização dos circuitos, a legibilidade dos títulos e a continuidade para Ciência antes de decidir merge.


## 27. MOBILE MASTER V0.18 — PATH/NODE MOTION + RITMO (2026-10-17)

**Pedido do proprietário:** depois da auditoria do `landing-colus-master (10).drawio`, autorizou «vamos então aplicar o que falta». O objetivo é alinhar os dispositivos mobile e a continuidade narrativa, sem alteração dos assets nem do Hero/desktop. Não equivale a aprovação para publicar ou integrar em `main`.

**Branch e PR:** `feat/colus-mobile-editorial-storytelling`, PR #2 permanece draft, `main` não modificada.

**Implementação na branch:**
- Novo `frontend/src/components/landing/MobileNarrativePath.tsx` com PATH/NODE ligados a scroll nativo. Variantes distintas: Aprender/Trail, Futuro/Signal Field, Vida/Story Marker, Pertencer/Community Ring, Transformar/Rise Axis que abre em Horizon. Um único nó ativo percorre cada path; não há pulsação infinita ou scroll-jacking. Nó mantém geometria circular em mobile mesmo com SVG vertical alongado.
- Novo `MobileSceneWindow.tsx` com media motion suave (scale 1.028→1→1.028, y +6→−6 px), montado em 14 janelas de fotografia, sem alteração de assets, vídeo ou dados. `LandingMedia` de Ciência fica intocado, sem parallax adicionado.
- Removidas linhas/pontos isolados estáticos no markup mobile das cinco secções e substituídos por narrativa PATH/NODE.
- Pertencer agora explicita os três estados do Master: `01 / Acompanhar`, `02 / Participar`, `03 / Crescer juntos`.
- Alturas mobile-only moderadas: Aprender ~144svh, Futuro ~255svh, Vida ~199svh, Pertencer ~173svh, Transformar ~188svh em mínimos nominais, total ~959svh versus ~1190svh antes. Ainda não equivale ao orçamento-alvo da landing completa nem garante crop legível.

**Verificação estática nesta sessão:** sem elementos JSX básicos desequilibrados nos sete ficheiros envolvidos; variantes e janelas presentes; regiões desktop comparadas durante as edições e preservadas. Hero e pasta de media não alterados. Não houve testes npm, screenshot novo ou validação runtime; não declarar QA aprovado.

**Fonte auditável e plano:** `docs/colus/presentation/qa-reports/mobile-master-alignment-2026-10-17/README.md`.

**Gates restantes:** validar 360/390/440/768px, Path/Node a percorrer a ligação real sem saltos, contexto de fotografia e legibilidade, curvas/ramificações, fast-scroll/reverso, âncoras, Header e Ciência upright/poster; executar `npm run typecheck`, `npm run test:qa`, `npm run build`. **Ainda existe a divergência de media secundário em Aprender/Criar** do Master (asset não escolhido neste pass) e a calibração global da duração. Preservar todos os assets e Hero até decisão explícita de revisão editorial.

**Próxima ação exata:** pull da mesma branch no VS Code; capturar scroll contínuo mobile Aprender→Futuro→Vida e Pertencer→Transformar para validação da cadeia visual; corrigir problemas observados antes de pensar em merge. Sem nova branch.


## 28. MOBILE MOTION — TESTE DE CONTRATO AUTOMATIZADO (2026-10-17)

**Continuação autorizada:** depois de implementar a cadeia do Master V0.18, a intervenção seguinte concentrou-se na integridade técnica, sem novos efeitos ou alterações gráficas.

**Implementado na branch `feat/colus-mobile-editorial-storytelling` / PR #2:**
- Criado `frontend/scripts/qa-mobile-story-contract.mjs` com verificações estáticas usando a dependência TypeScript existente. Comprova que Aprender/Trail, Futuro/Signal, Vida/Marker, Pertencer/Ring e Transformar/Axis estão montados nas secções corretas e que existem ao menos 14 `MobileSceneWindow`, controlo por scroll, `getPointAtLength`, fallback reduced-motion e nenhum pulse infinito ou scroll-jacking introduzido.
- Contrato confirma referências do vídeo Ciência upright/poster preservadas e proíbe reintroduzir o componente mobile de pentágono rejeitado.
- `frontend/package.json`: `npm run test:qa` passa a executar testes anteriores + `qa-mobile-story-contract.mjs` + proteção de assets.
- Assets, Hero, fotografias, cenas desktop e branch `main` não foram alterados neste pass.

**Verificação realizada aqui:** reconsulta de todos os cinco componentes e dos dois auxiliares diretamente no GitHub, conferência da presença de 5 devices + 14 janelas, imports e guardrails do contrato. Todas as verificações estáticas feitas pelo conector deram resultado esperado. **Não foram executados localmente** `npm run typecheck`, `npm run test:qa`, `npm run build` ou browser QA; o runtime do agente não tem acesso DNS a GitHub nem ao localhost do utilizador.

**Próximo gate:** utilizador faz pull da branch, executa o trio npm em `frontend` e recolhe captura/vídeo do scroll mobile real entre Aprender→Futuro e Pertencer→Transformar; só depois corrigir desvios visuais efetivamente observados. PR #2 deve continuar draft, sem merge nem claim de aprovação final.

## 29. FILLED RINGS — MANIFESTO / VOZES MOBILE (2026-10-17)

**Owner feedback:** Edge screenshots explicitly circled empty/decorative ring outlines and disconnected orange dots in the Manifesto and Vozes COLUS areas. Owner instructed that engineering should edit GitHub directly, not give manual paste instructions.

**Precise diagnosis:** these elements come from `ManifestoSection.tsx` (photo ellipse + horizontal timeline node) and `TestimonialsSection.tsx` (photo ellipse + horizontal line node), not the shared `MobileNarrativePath.tsx`. This corrects the preceding assumed diagnosis.

**Implemented only on `feat/colus-mobile-editorial-storytelling`:**
- Added `frontend/src/components/landing/EditorialOrbitNode.tsx` (commit `f6d6825`), a compact or photo-size **filled** deep-blue/orange ring with centre and two pointer dots rotating in response to the section's `scrollYProgress`; reduced-motion static; inert to touch and navigation.
- Updated `ManifestoSection.tsx` (commit `2647081`): mobile photo corner and mobile timeline now use filled ring/node; prior ellipse/rail visuals retained desktop-only.
- Updated `TestimonialsSection.tsx` (commit `b66ff55`): same two mobile-only replacements in Vozes; positioned photo ring clear of the caption; original desktop graphics retained.
- Updated `frontend/scripts/qa-mobile-story-contract.mjs` (commit `716318e`) with static regression checks for the **actual sections** and motion semantics. Existing `npm run test:qa` script already executes this file.

**Protected:** photographs, media, Hero, Science, official assets, desktop rendering and `main` unchanged. This is a UI correction, **not** an editorial decision about whether to retain Vozes COLUS as an official public section.

**Verification still pending:** Edge mobile screenshot/video 440×956 + 390×844, reduced-motion, scroll forward/reverse, crop and heading/caption clearance; run `npm run typecheck`, `npm run test:qa`, `npm run build`. No npm or browser run was performed by the agent. Keep PR #2 DRAFT until visually approved; do not merge.


## 30. FILLED RINGS — AUTOMATED BROWSER QA PASSED (2026-10-17)

**Implementation and validation, branch `feat/colus-mobile-editorial-storytelling`:**
- New `EditorialOrbitNode.tsx`, consumed twice each by mobile Manifesto and Vozes COLUS, with solid blue/orange face, active centre, two pointers driven by native-scroll progress. Static fallback for reduced motion.
- Added stable data attributes; new Playwright browser smoke `frontend/scripts/qa-mobile-browser.mjs`. GitHub Actions workflow `.github/workflows/colus-frontend-qa.yml` executes frontend typecheck/QA contract/build, installs Chromium, previews production output, checks motion and screenshots; trigger limited to pull requests to main to avoid duplicated runs.
- Final browser QA run **PASS**: https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/38980178093; artifact `colus-mobile-ring-qa` ID `12081260195`, 6 PNG screenshots and JSON evidence, at 440×956 and 390×844. Both photo rings rendered at 72px; pointer rotation changed when scrolling, remained static with reduced-motion; zero uncaught page errors; typecheck, test:qa, build succeeded.
- Screenshot review confirmed filled rings are visually present and caption/headline regions unblocked in captured frames. Found a narrow dark triangular artefact at the top of the Manifesto during its book/page transition; **separate REVIEW**, do not change protected Hero without continuous visual evidence/approval.

**Not approved:** entire landing mobile and motion choreography, CTA/final footer, editorial status of Vozes, or merge. `main` unchanged and PR #2 draft. Next: review ring alignment in owner's Edge during continuous scroll, review Manifesto triangle as an independent motion QA issue, then revisit wider PATH/NODE section handoffs before merging.


## 31. MANIFESTO SEAM + 5-DEVICE MOBILE BROWSER QA (2026-10-17)

**Authorised continuation:** examine the dark triangle at Hero→Manifesto and verify scroll handoffs from the mobile Master, while preserving protected assets and avoiding merge.

**Actual fix:** dark triangular wedge in Manifesto came from a gap between two rounded `bg-colus-paper` leaves. `ManifestoSection.tsx` gained a narrow matching animated centre spine. The Hero and assets were not modified. The exact screenshots before/after and pixel assertions at x=center, y=15/30/45, on widths 390 and 440, confirmed the dark `#071A2A` slit is replaced by paper `#FFF8EF`. QA result: https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/38981030829 PASS.

**New browser contract:** `MobileNarrativePath.tsx` has stable data markers only; `frontend/scripts/qa-mobile-handoffs.mjs` captures ten screenshots at 390×844 and checks active node movement through Trail, Signal, Marker, Ring and Axis, page width containment, static reduced-motion paths, and absence of page errors. Hooked into existing CI alongside filled-ring tests. Result: https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/38981335443 SUCCESS; TypeScript, QA scripts and build PASS; artifact `12081750112` with screenshots/results.

**Interpretation:** internal device motion works in the actual Chromium production preview, **not yet proof of pixel-perfect continuous handoffs between sections**. In screenshots certain scene windows still have inset margins/rounded edges and blank gaps, which is an editorial REVIEW against Master V0.18, not yet approved for further change. Keep PR #2 draft and `main` intact; no Hero/asset file changed.

**Next work:** focused visual review of boundary placement with owner-provided Edge continuous scroll; check Science playback/Save-Data and reduced-motion and desktop regression before any merge. Do not assert full mobile design approval.


### 31.1 — Proteção desktop e revalidação final

A peça central de papel introduzida em Manifesto recebeu `lg:hidden` para atuar **apenas abaixo de 1024px**, sem alterar a composição desktop previamente aprovada. Commit `eb1a013f28150acdd25068f5d851e57622821cec`. GitHub Actions https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/38981869303 concluiu **SUCCESS**, incluindo TypeScript, `test:qa`, build, pixel-check do Manifesto, filled rings e 5-device PATH/NODE smoke em Chromium. Os assets e a `main` mantêm-se intactos. PR #2 segue DRAFT por faltar aprovação editorial e QA manual contínuo no Edge.


## 32. MOBILE CHAPTER SEAMS / VISUAL CONTINUITY — 2026-10-17

**Authorization:** user said «vamos» to previous action plan to refine mobile composition and continuity between Aprender→Futuro→Vida→Pertencer→Transformar, not permission to publish/merge.

**Implemented in the existing branch `feat/colus-mobile-editorial-storytelling`:** the five mobile `max-w-[680px]` wrappers now have a connected dark narrative field and stable `data-colus-mobile-story` markers; tablet-specific wrapper top/bottom margins/padding were removed; artificial 40px/24px spacer blocks between/after scenes were compressed to 12px or removed. The special staggered crops and margins inside Vida/Pertencer remain intentional. No media or text content replacements, no Hero changes, no changes to desktop JSX during these edits.

**Browser validation:** `frontend/scripts/qa-mobile-handoffs.mjs` now checks wrapper and path continuity for four major chapter boundaries at widths 390, **440**, and 768px. GitHub Actions https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/38982859788 succeeded, including typecheck, test:qa, build, asset lock, filled rings, Manifesto pixel check, five scroll devices and 12 boundary geometry checks. Artifact ID `12082295931` includes screenshots/results. Captures inspected, visual chapter gaps reduced at 440px. PR #2 remains DRAFT; `main` unchanged.

**Remaining gate:** review real Edge mobile continuous scroll (not just captured frames), text/crop/contrast and actual Science video behavior; outer gutters at tablet/maxwidth680 are an editorial decision pending owner review. No approval to merge. QA report: `docs/colus/presentation/qa-reports/mobile-master-alignment-2026-10-17/README.md`.


## 33. HERO → MANIFESTO MOBILE — OPEN BOOK GEOMETRY (2026-10-17)

**Feedback:** screenshot do proprietário Edge 440×956 mostra duas pétalas Warm Paper gigantes com uma barra central («coração»), contrário ao Master V0.18. Não era um problema de media do Hero: origem em `ManifestoSection.tsx`.

**Alterações na branch atual:** a geometria mobile anterior (`rounded-t-[52%]` nas duas folhas e `data-colus-manifesto-spine` de 9% de largura) foi substituída por **uma única superfície de papel com curva dupla suave**, SVG `data-colus-manifesto-curve`, ligada ao progresso nativo de scroll. Curvas Bézier retificadas para centro com tangente horizontal (commit `b0fc762`). Uma faixa superior recebe o mesmo papel progressivamente no final do scroll, eliminando wedge escuro. As duas folhas antigas foram preservadas **apenas no desktop** (`hidden lg:block`). Hero, media e assets oficiais não foram alterados.

**QA introduzido:** `qa-mobile-browser.mjs` captura o momento de transição em 390×844 e 440×956 e rejeita curvas com diferença centro/lateral >80px, além do teste anterior de paper pleno; `qa-mobile-story-contract.mjs` protege a composição contra regressão para pétalas/stem. Primeiro screenshot de produção antes do último ajuste dos control points: https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/38983926935 PASS, demonstrando que as formas gigantes desapareceram. **Falta confirmar o último ajuste na execução CI mais recente** e obter validação visual do proprietário.

**Estado:** PR #2 draft; `main` intacta. Não fazer merge sem QA final do scroll contínuo e aprovação visual.


## 34. CORREÇÃO DE DIREÇÃO DE ARTE — CORAÇÃO, NÃO LIVRO (2026-10-17)

**ÚLTIMA DECISÃO EXPLÍCITA DO RESPONSÁVEL — PREVALECE SOBRE §33:** «o coração era a ideia, só que não devia ter aquela barra no meio»; a transição deve comunicar o coração, **não** passar a uma curva rasa que parece livro. A fotografia imediatamente a seguir mostra **duas pessoas a segurar dois corações verdes reais**, o que confirma a ligação psicológica intencional. O diagnóstico anterior de que o coração inteiro era um erro estava incorreto. **Não retirar novamente as duas pétalas arredondadas.**

**Implementação na branch `feat/colus-mobile-editorial-storytelling` (sem merge):**
- `ManifestoSection.tsx`: duas metades arredondadas Warm Paper restauradas em mobile com `pageScaleY` + separação lateral vinculados ao scroll; eliminada completamente a barra retangular central; preenchimento de fundo apenas na fase seguinte para tornar a fotografia e a copy legíveis. Identificadores `data-colus-manifesto-heart-left/right` e `data-colus-manifesto-paper-settle`.
- Fotografia aprovada `COLUS-MANIFESTO-HUMANO-001.webp` foi inspecionada no GitHub e **preservada**; Hero/desktop/media/texto/rings intactos.
- `qa-mobile-browser.mjs` e `qa-mobile-story-contract.mjs` corrigidos para proteger a intenção de coração com ausência de barra, e não proibir a silhueta. Teste de scroll intermédio a 390px e 440px e papel estabilizado junto ao retrato.

**Evidência browser:** GitHub Actions https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/38985381293 SUCCESS; artifact ID `12082474833` contém capturas `manifesto-heart-390.png`, `manifesto-heart-440.png`, estados seguintes, QA ring/path e JSON. Verificação visual efetuada nesta sessão: lobos presentes, espaço negativo central livre, sem barra; retrato posterior apresenta os dois corações verdes e texto legível.

**Estado:** conceito de coração explícito/confirmado pelo responsável; qualidade visual final do scroll contínuo ainda por aprovar no Edge; PR #2 draft, main intacta. **A referência artística válida é agora CORAÇÃO → CORAÇÕES REAIS NA FOTOGRAFIA**, não a anterior substituição por uma Open Book curve.


## 35. DESKTOP MASTER V0.18 — FILLED ACTIVE NODES, OPEN COMMUNITY RING (2026-10-17)

**Pedido e autorização:** utilizador confirmou que atualizou a branch e solicitou execução direta no GitHub do sistema Ring/Node em desktop, **não só preencher**. Estudar o wireframe desktop e respeitar assets/arquitetura.

**Revisão do Master `docs/colus/design/landing/landing-colus-master.drawio` e Motion Spec V1.0:**
- Aprender: Learning Trail como eixo principal, um node ativo, endpoints contextuais e media editorial.
- Futuro: Signal Field ativo, 4 Scene Windows preservadas, sem HUD ou overlay invasivo.
- Pertencer: Community Ring permanece deliberadamente INCOMPLETO/ABERTO; apenas nó relacional tem face sólida e ponteiros.
- Transformar: Rise Axis anima e entrega progressão ao Horizon Node; não esticar o ring com transformações da linha.
- Vida/Manifesto/Vozes: pequenos nodes editoriais, sem saturar com órbitas múltiplas; 1 movimento dominante por secção.

**Implementado apenas na branch `feat/colus-mobile-editorial-storytelling`:**
- Criado `frontend/src/components/landing/DesktopOrbitNode.tsx`: SVG preenchido, microponteiros scroll-driven, suporte reduced motion, sem pulse infinito.
- `AprenderSection.tsx`: ring segue a curva SVG real.
- `FuturoSection.tsx`: Signal Field recebe ring pontual dinâmico.
- `PertencerSection.tsx`: o arco aberto fica intacto e o node ativo ganha massa/preenchimento.
- `TransformarSection.tsx`: ring acompanha eixo, desaparece quando surge Horizon; Horizon ring independente do scaleX da linha para evitar elipse.
- `VidaSection.tsx`: Story Marker de saída preenchido.
- `ManifestoSection.tsx` e `TestimonialsSection.tsx`: ring da imagem + node da linha editorial em desktop, preservando mobile.
- `frontend/scripts/qa-desktop-rings.mjs` + GitHub Actions ampliado para 1440×900 e 1024×768.

**CI/Browser:** https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/38988536282 **SUCCESS**: TypeScript, contrato QA, proteção assets, build, antigos testes Chromium mobile e novo desktop. Screenshots/results no artifact ID `12083819266`, vistas em contact sheets. Em ambos os viewports, quatro dispositivos possuem ring redondo preenchido que se desloca, Community Ring continua aberto, compact orbits de Manifesto/Vida/Vozes presentes, sem overflow horizontal. Corrigidos dois assertions de QA antigos que contavam nós ocultos mobile/desktop como simultaneamente visíveis.

**Protegido:** `frontend/public/media/**`, Hero, imagens, vídeo Ciência, branding e `main`. Diff GitHub confirma nenhum asset/IntroHero alterado vs `main`. PR #2 draft.

**Ainda não aprovado:** high fidelity definitivo, tamanho/peso visual dos rings, timings de scroll físico no Edge local, publicação de testemunhos, direitos de imagem ou merge. Pedir avaliação do desktop no Edge após pull para aprovação editorial. Não mudar assets na próxima iteração.

## 36. DESKTOP — RECONCILIAÇÃO CIRÚRGICA DOS RINGS COM MASTER PLUS (2026-10-17)

**AUTORIZAÇÃO CONFIRMADA:** a landing COLUS está quase pronta. O responsável solicitou uma intervenção estritamente cirúrgica nas capturas do Edge de **Manifesto, Aprender, Futuro, Pertencer**. Handoff e `landing-colus-master-plus.drawio` (anexo de 2026-10-17) são as fontes de direção. Proibido substituir/alterar assets, vídeos, cartazes, logótipo, textos, imagens ou crops, ou redesenhar Hero e mobile. **Apenas efeitos, nós, percursos e microposições dos elementos existentes**; branch `feat/colus-mobile-editorial-storytelling`, PR #2 DRAFT; não integrar em `main`.

**Diagnóstico das 4 imagens do Edge:** (1) Manifesto: dois rings tinham peso semelhante e o da fotografia deslocava-se sobre a pessoa, fora da elipse; (2) Aprender: o ring e o Learning Trail atravessavam rostos, mais um ponto laranja distante competia com o nó; (3) Futuro: o Signal Field cortava headline/parágrafo e o ring estava afastado na extrema direita; (4) Pertencer: 3 rings vazios redundantes, arco aberto sem hierarquia, textos centrais demasiado próximos de uma foto e da curva laranja.

**Correções efetivas — só paths/nodes/layout de 4 componentes:**
- `ManifestoSection.tsx`: nó principal segue matematicamente a **semielipse inferior** em `orbitLeft/Top`, não o retrato. Rail secundário desktop usa ring reduzido a 72% para hierarquia; removidos os pontos soltos sem função. **Coração mobile intencional sem barra central continua protegido.**
- `AprenderSection.tsx`: Trail SVG z-index `0` atrás das fotos, trajeto redesenhado no espaço livre **abaixo da fotografia principal e para a lateral direita**; ring só emerge fora do media. Removido ponto terminal redundante, sem mudança nos media.
- `FuturoSection.tsx`: Signal Field redesenhado para percorrer a base da cena e subir no corredor lateral até **acima do limite superior** da fotografia; ring acompanha esse traçado e permanece visível sem atravessar copy ou rostos. Ativos TIC/ENG/Ciência/Segurança Digital, headline e imagem estão iguais.
- `PertencerSection.tsx`: removidas somente as 3 circunferências vazias de SVG que competiam com o nó. Pontos contextuais restantes mais pequenos e discretos; **o arco do Community Ring permanece aberto**. Container dos três textos centrais foi limitado a `max-w-[10rem]` e elevado de `top-[54%]` para `top-[48%]`, **sem alterar palavras**.
- `frontend/scripts/qa-desktop-rings.mjs` acrescenta verificações reais em Chromium: 151 amostras da geometria do path não podem cruzar headline/parágrafo de Futuro; Trail com z-index atrás das fotografias; órbita de Manifesto aderente à sua elipse; ring aberto, nós circulares e scroll-driven. Data attributes apenas para QA.

**Prova técnica e visual:** `npm run typecheck`, `npm run test:qa`, `npm run build`, desktop Chromium 1440×900 e 1024×768, e regressões mobile **PASS** na última execução: https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39066528379 ; artifact `colus-mobile-ring-qa`, ID `12113214093` (capturas de antes/depois). Capturas abertas: Aprender com ring visível fora da foto no progresso final; Futuro com ring azul acima do media; Pertencer sem rings vazios nem colisão com copy. Cópias dos media/copy foram comparadas durante as substituições — invariáveis. `IntroHeroSection.tsx` e `frontend/public/media/**` não alterados.

**ESTADO:** engenharia da microcomposição concluída, visual demonstrado em Chromium; aprovação estética do responsável **ainda pendente**, assim como scroll contínuo no Microsoft Edge do proprietário. Não confundir PASS técnico com aprovação de todo o projeto. Mais ajustes só perante nova evidência de captura e sem substituir assets nem copy. `main` intacta.


## 37. DESKTOP MASTER PLUS — BRANCH DE VALIDAÇÃO ISOLADA (2026-10-17)

**DECISÃO ATIVA, AUTORIZADA PELO RESPONSÁVEL:** executar correções espaciais e de coreografia que faltam no `landing-colus-master-plus.drawio`, mas **sem mexer em assets, fontes de media, vídeo/cartazes, copy, branding, Hero ou mobile**. Trabalhar numa NOVA branch para avaliar e só depois integrar. **Não existe autorização para merge para `main`.**

**Branches/PRs:**
- Branch original aprovada como base técnica (mas PR ainda draft): `feat/colus-mobile-editorial-storytelling` → PR #2 → `main`.
- NOVA branch: `feat/colus-desktop-master-plus-fidelity` criada A PARTIR DA ORIGINAL → PR #3 DRAFT → `feat/colus-mobile-editorial-storytelling`.
- Fluxo: validar PR #3 em Chromium e Edge do responsável → integrar na original → rerun geral → só depois rever PR #2 para eventual `main`.

**Origem:** `landing-colus-master-plus.drawio` enviado em 2026-10-17, especialmente `belong_9111–belong_9136`. Foi detectado que o diagnóstico antigo que removeu nós contextualizados estava errado: Master exige SEIS nós pequenos ao longo de elipse aberta pontilhada, com headline/descrição NO CENTRO, três imagens a rodear, três relações distribuídas, e cinco fases RELAÇÃO → ARCO NASCE → COMUNIDADE → ESTABILIDADE → ABERTURA. Fundo de produção permanece Warm Paper; fundo escuro do canvas Draw.io não justifica troca de identidade.

**Alterações propostas no PR #3:**
- `PertencerSection.tsx`: redisposição dos elementos desktop EXISTENTES, ring pontilhado aberto e seis pequenos nós. O nó principal tem escala própria (um SVG isolado num HTML overlay), para não ficar elíptico sob `preserveAspectRatio="none"`. Fases marcadas por `data-colus-community-phase`, media intactos.
- `FuturoSection.tsx`: mesmo Scene Window exterior persistente durante quatro cenas, alterando apenas o conteúdo interno/clip/opacity; indicador 01–04 demonstra a cena ativa. Signal Field passa a receber a curva vinda de Aprender pelo canto superior direito.
- `VidaSection.tsx`: marcador final microalinhado com a entrada do Community Ring; imagens intactas.
- `PertencerSection.tsx` → `TransformarSection.tsx`: último arco prolonga-se para o eixo ascendente de Transformar, sem uma barra desconectada.
- `AprenderSection.tsx` e `TransformarSection.tsx`: somente marcadores estáveis para comparar handoffs em testes.

**Proteção contra testes superficiais:** `frontend/scripts/qa-desktop-master-plus.mjs` verifica 390/440? Não: em **1440×900 e 1024×768** a geometria central, seis nós, três relações, três media, CINCO fases, persistência do Scene Window TIC→ENG→CIÊNCIA→SEG. DIGITAL e alinhamento de percursos entre secções. Testes legados mobile e desktop continuam obrigatórios; em especial os nós devem continuar realmente circulares em viewport. Documentação completa: `docs/colus/presentation/qa-reports/desktop-master-plus-fidelity-2026-10-17.md`.

**Gate actual:** implementação CANDIDATA em CI; ainda sem aprovação estética nem merge. As imagens podem ter um enquadramento visível diferente devido à mudança de tamanho/posição das janelas apesar de os ficheiros media, links e object-position serem os mesmos. Confirmar no Edge antes de aceitar.

**REGRA ABSOLUTA:** não converter este trabalho em revisão de copy, substituição de imagens ou redesign de Hero/mobile; não mudar `main`; PR #3 continua DRAFT até aprovação explícita.

## 38. DESKTOP MASTER PLUS — OPACIDADE REAL CORRIGIDA / PATH CONTÍNUO VALIDADO (2026-10-17)

**Origem:** auditoria visual posterior ao CI expôs que scrollYProgress progredia mas `Aprender 01→02`, `Transformar 01→02→03` e as três fotografias de `Pertencer` não acompanhavam as opacidades previstas (aceleração nativa de opacity no Chromium). Criado `useScrollOpacity.ts` sem timers, RAFrame extra ou alterações a media/copy. As mudanças ficaram limitadas a canais desktop dos três componentes.

**Estado atual PR #3:** `feat/colus-desktop-master-plus-fidelity` → `feat/colus-mobile-editorial-storytelling` (ainda DRAFT, NÃO MERGED). CI final: https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39077107986 — **SUCCESS**. Testes chromium 1440×900 e 1024×768 verificam opacidade **computada** de Descobrir/Criar, Expressar/Construir/Avançar e media Pertencer em 12/50/88%, sem congelamento da cena. Mobile e redução de movimento continuam em QA.

**Pertencer agora:** layout centralizado verticalmente preservando proporção Draw.io `1720×760`, headline central em duas linhas, 3 media inalterados, 6 pontos de contexto, ring aberto e pontilhado; 3 relações visíveis uma única vez, sem apagar a copy. Nó ativo acompanha o ring e no estado 5 percorre a própria saída; ramo de saída liga ao Rise Axis abaixo da zona das relações, **zero colisões** verificadas geometricamente no Chromium. Capturas realmente revistas nos estados 2/4/5 a 1440/1024, artefacto GitHub `12116579447`.

**INVARIÁVEL:** `frontend/public/media/**`, fontes media `src`, posters, textos, Hero, clips/crops aprovados e arte mobile NÃO podem ser alterados para estes refinamentos. `main` intacta. A alteração nas dimensões dos containers desktop pode mudar a área visível da imagem sem alterar o asset; só aprovação visual no Edge confirma composição final.

**NEXT:** não continuar alterações gratuitas. Aguardar revisão do responsável no Edge desktop com scroll para frente e para trás (Pertencer fase 5 → Rise, Aprender→Futuro, Futuro→Vida, Transformar→Vozes). Depois PR #3 pode ser integrado na branch original apenas mediante aprovação explícita; PR #2 permanece outro gate antes de `main`. Ver relatório completo em `docs/colus/presentation/qa-reports/desktop-master-plus-fidelity-2026-10-17.md`.

## 39. DESKTOP MASTER PLUS — SCROLL DIRETO/INVERSO CHROMIUM VALIDADO (2026-10-19)

**AUTORIZAÇÃO:** «vamos continuar» mantendo a branch isolada, todos os media, copy, Hero e mobile bloqueados. Nenhuma autorização para merge PR #3 ou PR #2.

**Trabalho nesta iteração:** novo `frontend/scripts/qa-desktop-reverse-motion.mjs`, integrado em `.github/workflows/colus-frontend-qa.yml`. Sem alterações nos componentes de produção nem nos assets. O teste usa Chromium real, scroll imediato e observação de **computed opacity / data-colus-community-phase / scene indicator** ao caminhar para a frente e para trás em quatro secções. Viewports **1440×900** e **1024×768**.

**Evidência verificada:** https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39203930468 — **SUCCESS**. Teste novo **COLUS MASTER PLUS BIDIRECTIONAL SCROLL PASS 60 samples**. Resultado JSON extraído e revisto: 60 amostras, capítulos `experiencia`, `futuro`, `comunidade`, `transformar`, overflow horizontal máximo **0px**. No scroll inverso de Pertencer (1440px): `5 → 4 → 3 → 2 → 1`. Em Transformar (1440px): `Avançar [0,0,1] → Construir [0,1,0] → Expressar [1,0,0]`. Todos os critérios repetidos a 1024px. A compilação, QA legado mobile, contratos de media, Master Plus de geometria e 30 cenas de opacidade também PASS. Artifact `colus-mobile-ring-qa`, ID `12165266270`, com `desktop-reversal/results.json` e screenshots.

**Imagem capturada e comparada:** estado ESTABILIDADE e ABERTURA do Community Ring 1440/1024; headline central em duas linhas, três janelas de imagem, seis nós e abertura para o Rise Axis. Sem alteração dos media, do Hero ou da copy. PR #3 continua **DRAFT**, base `feat/colus-mobile-editorial-storytelling`; PR #2 continua DRAFT; `main` intocada. Não afirmar que QA técnico substitui **revisão estética do responsável no Microsoft Edge**, especialmente movimentos perceptivos contínuos e recortes das imagens.

**NEXT:** apresentar as capturas novas; recolher aprovação visual explícita antes de merge; se houver novos screenshots com problema, corrigir exclusivamente dispositivos de motion/posicionamentos, sem mexer nos assets. A versão atual não precisa de mais alterações gratuitas.


## 38. MASTER PLUS — FIX OPACITY WAAPI + CHROMIUM FINAL (2026-10-19)

**Estado:** PR #3 continua DRAFT / base `feat/colus-mobile-editorial-storytelling`; nenhuma integração autorizada. Pedido do responsável: continuar correções do Master Plus, preservar TODOS os assets e copy. A inspeção original em Chromium mostrou cenas desktop de Aprender e Transformar bloqueadas apesar de `scrollYProgress` correto. Instrumentação comprovou valores derivados corretos mas opacidade DOM falsa, porque efeitos acelerados WAAPI geridos pelo Chromium ficavam dessincronizados do scroll: `getAnimations()` tinha keyframes `opacity`, enquanto inline style não acompanhava o MotionValue. Evidência inicial run 39073962637.

**Correção aplicada:** `useScrollOpacity.ts` subscreve scrollYProgress via Framer Motion `useMotionValueEvent` e escreve diretamente um MotionValue JS para opacity, evitando essa aceleração defeituosa. Usado APENAS em canais de opacidade desktop de `AprenderSection.tsx`, `TransformarSection.tsx` e `PertencerSection.tsx`; sem timers, RAF loop extra, mudanças de imagem ou texto. Script `qa-desktop-state-audit.mjs` passou a ASSERTAR opacidade COMPUTADA no Chromium a 12%, 50%, 88%, em viewports 1440 e 1024. RUN https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39074460306 PASS: Descobrir→Criar, Expressar→Construir→Avançar e Pertencer 3 media estabilizam corretamente.

**Composição corrigida:** `PertencerSection.tsx` mantém proporção do canvas desktop 1720/760; largura/escala da headline revista para duas linhas; títulos de Acompanhar/Participar/Crescer juntos sob as fotografias ficam acessíveis (`sr-only`) mas visíveis uma única vez nos blocos de relações; sem apagar copy. Terceira fotografia reposicionada à direita para não colidir com texto central. QA `qa-desktop-master-plus.mjs` agora exige proporção, título 2 linhas, não duplicação, sem colisões, 6 nós, 5 fases, abertura pontilhada e 4 cenas Futuro.

**CI FINAL:** run https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39075153063 SUCCESS; typecheck, build, QA contratos, asset protection, mobile 390/440/768, desktop rings em 1440/1024, Master Plus, opacidade computada em cinco pontos e reduced motion dentro das suites pré-existentes. Artifact `colus-mobile-ring-qa` ID 12117165345 inclui capturas. Contact sheet `colus-master-plus-current-review.jpg` revisto. URLs `src`, poster e copy permaneceram idênticos à branch-base.

**Pendente (não confundir PASS com aprovação visual):** proprietário rever a abertura do arco, relação com o Rise Axis, equilíbrio de escala/whitespace e transições em scroll contínuo no Edge. PR #3 não deve ser merged até aprovação explícita. Só depois merge PR #3 → branch original; testes novamente; decisão separada de merge PR #2 → main.


## 40. CONTINUIDADE INTEGRAL / BRANCH AUDIT — NOVO CHAT E GOVERNAÇÃO (2026-10-19)

**Motivação do responsável:** conversa COLUS atingiu limite e houve risco de novo chat começar sem contexto; o utilizador pediu um handoff cronológico no diretório oficial, prompt explícito obrigando leitura de TODOS os handoffs, e política de branches focada em `main` + `develop`, evitando perdas de código. **Nenhuma conversa foi eliminada pelo assistente**; arquivos de GitHub formam o histórico versionado recuperável.

**NOVO HANDOFF OFICIAL:** `docs/handoff/HANDOFF-COLUS-2026-10-19-CONTINUIDADE-E-BRANCHES.md`. Inclui cronologia histórica 03–19/10, arquitetura V1 (sem confundir documento com backend implementado), assets/copy bloqueados, divergências de Vozes, coração mobile intencional, Master Plus desktop, bug WAAPI corrigido, PRs, runs e os gates de aprovação.

**Índice e prompt atualizados:** `docs/handoff/README.md` passou a incluir os dois handoffs legados fora da pasta oficial, TODOS os quatro marcos oficiais datados, plano de branch e este `CURRENT`. `docs/handoff/NEW-CHAT-PROMPT-COLUS.md` agora exige leitura cronológica integral, inclusive `CURRENT` por último, verificação dos PRs, commits, specs e código real. O prompt antigo `docs/colus/handoff/NEXT-CHAT-PROMPT.md` é histórico; não confundir com tarefa atual.

**AUDITORIA REAL DE BRANCHES (19/10):** 11 branches: `main`, `feat/colus-mobile-editorial-storytelling` (PR #2 DRAFT → main), `feat/colus-desktop-master-plus-fidelity` (PR #3 DRAFT → branch mobile), sete `backup/*` e `fix/colus-science-video-orientation` já integrada pelo PR #1. **`develop` NÃO existia na última observação.** Antes dos commits de documentação, `main` era `b5b493386377`, PR #2 `22b75f05f130`, PR #3 `795463e6a674`. `main → PR#2`: ahead 130/behind 0; `PR#2 → PR#3`: ahead 58/behind 0. Último CI verificado na HEAD inicial do PR #3: https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39210062433 SUCCESS. **Os SHAs ficam históricos quando os documentos forem committados; consultar GitHub novamente.**

**Plano de governança:** `docs/handoff/BRANCH-STRATEGY-COLUS.md`. **RECOMENDAÇÃO não executada:** duas branches permanentes `main` (estável) e `develop` (integração), features apenas temporárias. `develop` seria criada da `main` mais recente **num gate futuro autorizado**, depois de validar PR #3; mover/integrar PR #2 via `develop` e criar release PR para `main` só após aprovação. **Não houve criação de develop, mudança de base, merge, reset, force-push ou exclusão de nenhuma branch nesta intervenção.** Preservar backups até catalogar SHAs e provar que conteúdo está integrado.

**ESTADO de implementação:** master plus desktop na PR #3 com 5 fases de Pertencer, 6 nós, elipse aberta, opacidade desktop vinculada ao scroll por `useScrollOpacity.ts`, cenas Aprender/Futuro/Transformar e scroll reverso cobertos por Chromium. Mobile regressions e media lock aprovados nos workflows consultados. **Aprovação estética do responsável, sobretudo recortes de fotos, ritmo de movimento no Edge e handoffs, continua PENDENTE.** Não fazer merge por PASS automático.

**LOCAL PARA TRABALHO ATUAL:** `feat/colus-desktop-master-plus-fidelity`, sem alterar assets, copy, Hero, foto/vídeo, logos, coração mobile nem footer. Só ajustar geometria/motion com evidência e autorização; preparar o plano de integração e solicitar signoff visual.

**LEITURA NO PRÓXIMO CHAT:** obter `docs/handoff/README.md` da branch do PR #3, seguir os links antigos→novos, ler novo handoff datado, `BRANCH-STRATEGY-COLUS.md` e este `CURRENT` por último. Confrontar branches/PRs reais e consultar master versionado `landing-colus-master.drawio`; `landing-colus-master-plus.drawio` foi anexo externo e não foi encontrado na árvore Git (reenvio específico se necessário).

**NEXT ACTION:** não programar nem criar novas branches por rotina; primeiro confirmar status atual de Git e screenshots/scroll no Edge, depois decidir explicitamente sobre PR #3, PR #2, `develop` e eventual `main`. Não apagar handoffs antigos.

## 40. Consolidação Git — auditoria sem merge (2026-10-19)

**PEDIDO ATUAL:** reduzir no futuro o repositório a **duas branches permanentes**, para que um chat novo não fique confuso com várias versões. **Recomendação documentada, não decisão oficial:** `main` estável + `develop` desenvolvimento/QA; as features e backups são temporários/históricos.

**VERIFICAÇÃO AO VIVO:** GitHub mostra 11 branches, sem `develop`. PR #1 Ciência foi merged na main; PR #2 (`feat/colus-mobile-editorial-storytelling` → `main`) ainda DRAFT/OPEN; PR #3 (`feat/colus-desktop-master-plus-fidelity` → branch mobile) ainda DRAFT/OPEN. PR #3 commit `6f3a74aceccb5fc30eee2a3791d01eea905dac7b`, último CI [39211975269](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39211975269) SUCCESS. Compare `main→mobile` +130 commits; `mobile→desktop` +63; cumulativo +193, sempre behind 0. Nenhum media, Hero ou LandingMedia alterado nesses dois conjuntos de diffs.

**AUDITORIA DE BACKUPS:** sete branches `backup/*` são HEADs ancestrais da branch desktop; nenhum commit exclusivo por integrar nelas. `fix/colus-science-video-orientation` também é ancestral e PR #1 já merged. Isto demonstra integridade de histórico para possível arquivo/limpeza futura, NÃO autorização para apagar. Guardar SHAs/tags e confirmar permissão de eliminação antes de mexer nas referências.

**GATES PENDENTES:** aprovação visual Edge do responsável → merge PR #3 na feature mobile → CI/inspeção → criar `develop` da `main` atual → integrar PR #2 na `develop` após aprovação → verificar conteúdo → eventual release `develop→main` distinta → apenas então limpar backups/feature com aprovação. Na integração atual GitHub, merge PR existe mas **delete de branches remotas não está exposto**. Não prometer que sobraram duas branches enquanto GitHub continuar com 11 referências.

**REGRA PARA NOVO CHAT:** ler `docs/handoff/BRANCH-STRATEGY-COLUS.md` §7, este marco, o handoff datado e estado GitHub atual; falar em branches permanentes versus temporárias/históricas. Não recomeçar design nem criar branches extra. Não fazer merges/deletes por engano; distinguir QA técnico aprovado de aprovação visual ainda pendente.


## 41. DECISÃO DE CONSOLIDAÇÃO — FLUXO COM MAIN + DEVELOP (2026-10-19)

**DECISÃO OFICIAL DO RESPONSÁVEL (2026-10-19):** simplificar o repositório para **exatamente duas branches de longa duração**: `main` (versão estável, publicada) e `develop` (produção e validação de alterações). O próximo chat não deve voltar a criar, gerir ou alternar branches; deve focar-se na execução do produto em `develop`. Promoção futura para `main` apenas depois de aprovação visual explícita.

**CONSOLIDAÇÃO REAL:** `develop` foi criada da SHA `94bf9870ef5f2826132f1f8cbb3e6ae33a30bf6f`, o HEAD previamente aprovado no CI da antiga `feat/colus-desktop-master-plus-fidelity`. Essa branch já era descendente de `feat/colus-mobile-editorial-storytelling` (66 commits à frente e 0 atrás); por sua vez a mobile era descendente da `main` (130 commits à frente e 0 atrás). Logo, `develop` reúne ambos os conjuntos **sem reset, sem perda de commits e sem merge prematuro para main**.

**Prova de preservação dos backups:** sete `backup/*` e a branch `fix/colus-science-video-orientation` têm zero commits à frente da branch desktop (comparação GitHub). PR #1 de Ciência já foi integrado em main. As antigas PRs #2 e #3 foram originariamente abertas em DRAFT e deixam de ser a fonte de trabalho depois desta consolidação. O processo de limpeza de refs e encerramento dos PRs deve ser confirmado pelo GitHub, nunca presumido.

**Código e produto:** frontend COLUS com Hero, Aprender, Futuro, Vida, Pertencer, Transformar e motion do Master Plus presentes em `develop`. No último commit da branch desktop, GitHub Actions [39213476959](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39213476959) passou. A correção de opacidade para scroll Chromium usa `useScrollOpacity.ts`; o Master Plus tem cinco fases de Pertencer, seis nós, ring aberto e 4 cenas no Scene Window de Futuro. Protegidos media, posters, copy, logótipo, coração mobile e Hero. **QA técnico PASS não significa aprovação estética definitiva:** Edge desktop, recortes e transições ainda exigem revisão editorial final.

**CI da nova estrutura:** `.github/workflows/colus-frontend-qa.yml` executa QA no `push` de `develop` e nos PRs destinados a `main`/`develop`. O próximo chat deve usar o estado de `develop` como fonte única e trabalhar apenas no produto, qualidade, experiência visual, desempenho, segurança e publicação — sem abrir ou reabrir o tema de branches.

**RESTRIÇÕES:** não alterar ficheiros media, imagens, vídeos, posters, branding, copy aprovado, Hero, mobile aprovado ou base `main` sem autorização. Não misturar conceitos de decisões oficiais com hipóteses. Nunca declarar `main` atualizada sem evidência de merge/release aprovado.

**LEITURA PRIORITÁRIA PARA O NOVO CHAT:** `docs/handoff/NEXT-CHAT-PRODUCTION.md` e este marco §41 (prevalecem sobre recomendações obsoletas nos marcos anteriores).


## 42. FUTURO — DESKTOP 1024, TIPOGRAFIA EQUILIBRADA (2026-10-20)

**Escopo e autorização:** continuidade da revisão visual da landing em `develop`, após auditoria de handoff e QA. O responsável autorizou «vamos continuar». Não houve autorização de publicação, merge para `main`, limpeza de branches, mudança dos assets/copy ou alteração do mobile.

**Evidência de entrada:** screenshot Chromium 1024×768 do run [39215283274](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39215283274) mostrava a headline «O futuro também se aprende.» em quatro linhas, com «se» isolado. Em 1440×900 o mesmo título estava equilibrado em três linhas. Causa observável em `frontend/src/components/landing/FuturoSection.tsx`: classe única `text-[clamp(42px,5.4vw,84px)]` aplicava ~55.3px em 1024px ao painel de quatro colunas.

**Fix cirúrgico em `develop`:** commit `58d0166a3a8e6f9ce1f37050fae9457af1a2ded5`. A headline desktop passou a `text-[clamp(42px,4.5vw,60px)] xl:text-[clamp(42px,5.4vw,84px)]`, preservando a tipografia >=1280px, todos os media, vídeos, fontes de media, copy, Hero, layouts mobile e cenas Futuro. Adicionado apenas atributo não visual de QA `data-colus-desktop-futuro-headline`.

**Regressão adicionada:** commit `072916d764b93c79838337834f25f37a8229e34e`, em `frontend/scripts/qa-desktop-master-plus.mjs`, verifica no browser a copy imutável e as três linhas reais calculadas de `getBoundingClientRect().height / lineHeight` nos viewports 1024×768 e 1440×900. Não interpreta PASS estrutural como aprovação estética.

**Validação comprovada:** GitHub Actions [39382082257](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39382082257) `SUCCESS` no SHA `072916d`. Typecheck, testes contratuais e proteção de assets, build, QA Chromium mobile, PATH/NODE, Desktop Master Rings, Desktop Master Plus, scene-state e scroll progressivo/inverso: todos PASS. Artefacto `colus-mobile-ring-qa` ID `12245766908`. `desktop-master-plus/results.json` confirmou 3.000 linhas em 1440px (77.76px) e 3.000 linhas em 1024px (46.08px); a screenshot `futuro-1024-02.png` foi inspecionada e mostra «também se» na mesma linha. A screenshot `futuro-1440-02.png` mantém o título original em três linhas. Comparação `d9c82b7 → 072916d`: somente os dois ficheiros mencionados foram alterados.

**Estado:** correção desktop implementada, testada e visualmente conferida em screenshot Chromium. Não foi reproduzido scroll contínuo no Microsoft Edge do responsável; o `landing-colus-master-plus.drawio` exato, previamente fornecido como anexo e não localizado no Git versionado, continua necessário para comparação geométrica fina. Pertencer/fases/handoffs e enquadramentos continuam sujeitos à aprovação editorial final. `main` não foi alterada; nenhuma branch/back-up apagada.

**NEXT:** prosseguir validação visual contínua desktop em Edge, sobretudo Pertencer fase 5 → Rise Axis, transições Futuro → Vida e transformações reversas, e regressão mobile, preservando media/copy/Hero. Corrigir apenas desvios comprovados. Não iniciar backend, merge/publicação nem limpeza de branches sem autorização.


## 43. APLICAÇÃO INTERNA COLUS INDEPENDENTE — DEMO FRONTEND (2026-10-20)

**DECISÃO EXPLÍCITA DO RESPONSÁVEL:** a landing institucional COLUS está aprovada e deve permanecer **INTOCÁVEL**. O portal é OUTRA aplicação, com **build e deployment independentes**. Não redesenhar, ajustar ou editar qualquer Hero, copy, imagem, vídeo, layout, componente ou ficheiro de produção da landing. O projeto segue em `develop`, sem nova branch e sem merge para `main`.

**Referência real autorizada:** `aevumlux1-rwbot/educore.v1.1`, branch `tenant/colegio-pascoa-live`, que disponibiliza shell, páginas de perfis, dashboards e componentes partilhados. A implementação para a apresentação de hoje não porta tenant switching nem o conteúdo/brand de outra escola; reaproveita os componentes de UI `StatsCard`, `QuickActionCard`, `PageContainer`, `ScheduleCard` e adapta padrões de navegação responsiva. Isto é **portagem seletiva para demo**, não réplica integral dos módulos funcionais V1.1.

**Implementado:** novo frontend completamente separado em `apps/portal/` com `package.json`, Vite, TS, Tailwind e assets COLUS copiados por SHA Git do próprio repositório: logo oficial e fotografias institucionais, sem modificar os originais. Rotas `/` (splash curto), `/welcome` (capa independente), `/login` (seleção de oito perfis; claramente simulado) e `/app/:role/:section` (workspaces). Oito papéis: aluno, encarregado, professor, pedagogia, receção, secretaria, finanças, direção. Shell com sidebar desktop, navegação mobile, topo, marca COLUS; dashboards diferenciados por perfil. `sessionStorage` mantém somente estado fictício desta sessão. Fluxos demonstrados: professor regista falta → encarregado visualiza; finanças valida pagamento de exemplo → encarregado visualiza; professor escreve mensagem demo → encarregado visualiza. Não existe autenticação real, permissão de servidor, API, DB ou operação institucional; não inserir dados reais.

**Commits:** `00e3908` cria a aplicação independente; `a0b5526` corrige import TypeScript; `a96aa65` adiciona browser QA; `138124b` adiciona CI Chromium completo; `4193835` cria .gitignore isolado. Todas as alterações até este marco estão em `apps/portal/**` e `.github/workflows/colus-portal-qa.yml`, sem tocar em `frontend/**` (landing) nem seus media.

**QA técnico confirmado:** `npm run typecheck`, `npm run test:contract`, `npm run build` passam no workflow [39389778556](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39389778556). Browser real em Chromium [39389984352](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39389984352) **SUCCESS**: welcome desktop e mobile 390px, login e oito perfis, professor marca falta, encarregado vê; finanças valida pagamento, encarregado vê, refresh mantém estado demo; splash independente e zero overflow horizontal (viewports testados). Artifact `colus-portal-browser-qa`, ID `12248873767`, guarda screenshots de splash, welcome, login, dashboards e resultados.

**Armadilha arquitetural existente, preservar transparência:** `frontend/src/App.tsx` da **landing aprovada** já continha rotas demo antigas `/login` e `/app/:role/*`, mesmo antes da implementação independente. Elas NÃO são o novo portal e NÃO foram alteradas para respeitar o lock. Antes de dois deployments oficiais, bloquear/redirecionar essas rotas antigas na configuração da hospedagem (ou obter autorização separada para limpar o bundle de landing); dois domínios e builds são independentes mesmo enquanto persistem essas rotas legadas no bundle congelado.

**Pendente de aprovação:** revisão visual final do novo portal pelo responsável em Edge/mobile; escolher hosting dos dois deployments; validação de direitos de media no contexto externo; decidir quais módulos operacionais desenvolver depois de feedback do cliente; autenticação real/servidor/DB ficam expressamente fora do escopo da demo. Railway não tem créditos disponíveis, logo **não foi efetuado deployment** nem assumido domínio público.

**Próxima etapa:** mostrar as capturas, recolher aprovação visual do portal e eventualmente ajustar APENAS `apps/portal/**`; nunca alterar a landing sem nova decisão expressa.


## 44. PORTAL COLUS V2 — FUNÇÕES ESCOLARES E PERMISSÕES (2026-10-20)

**APROVAÇÃO EXPLÍCITA:** responsável aprovou o plano completo de correção de perfis e investimento incremental após pesquisa curricular; determinou que o **Aluno nunca acede a Finanças**, cabendo ao Encarregado os aspetos financeiros. Esta decisão explícita de 20/10 prevalece sobre a menção antiga de finanças no perfil Aluno do `presentation-build-scope-v1.md`. Landing aprovada, intocável; trabalho exclusivamente `apps/portal/**` em `develop`; dois builds e deployments separados, sem merge de `main`.

**Documentos recuperados para a decisão:** `docs/colus/inteligencia/inteligencia-operacional.md`, `discovery-brief.md`, `mvp-brief.md`, `docs/colus/arquitetura/arquitetura-colus-v1.md`, `mapa-implementacao-colus.md`, `docs/colus/presentation/presentation-build-scope-v1.md`, arquitetura backend/database V1. Fontes curriculares públicas: Ministério de Educação e Cultura (planos EP e ES, https://www.mec.gov.mz/documentos.php) e INDE/PCEP 2020 (https://www.mept.org.mz/wp-content/uploads/2020/07/PCEP_Maio_2020_Final_1.pdf). Os programas e planos de 2026 do secundário apresentam revisões, pelo que `curriculum.ts` é referência configurável, não homologação nem oferta efetiva certificada pelo COLUS. A Inteligência Operacional identifica oferta legal 1.ª–12.ª, mas as turmas efetivamente abertas exigem confirmação com a escola. Não atribuir números ou pessoas fictícias à instituição como reais.

**Implementação efetuada:** domínio em `apps/portal/src/data/school.ts` e catálogo em `data/curriculum.ts` para 12 classes, com classes ativas separadas do catálogo e relações estudante-encarregado-turma-professor. Personagens e dados fictícios; `state/DemoProvider.tsx` substitui store binária anterior por ações de Secretaria (criar/editar/arquivar aluno), Receção (receber/encaminhar candidatura), Secretaria (formalizar e criar estudante/encarregado), Pedagogia (atribuir turma/publicar notas), Professor (marcar presenças/lançar nota), Encarregado (referência de pagamento e comunicação), Finanças (validar), Direção (consulta). Os perfis são demonstrativos, não autorização real de servidor. Arquivo preserva histórico; não criar delete definitivo.

**Experiência:** `config/roles.ts` retira de Student qualquer rota financeira; os oito perfis receberam navegação específica. `pages/SchoolModules.tsx` implementa formulários operáveis; `pages/Workspace.tsx` cria dashboards coerentes; `components/SchoolCharts.tsx` usa Recharts com valores derivados da sandbox. Feeds, notas e gráficos do encarregado foram filtrados por educandos associados; student só vê o seu registo académico. `App.tsx` corrige scroll ao navegar. Conteúdos e marca da landing não foram alterados.

**Persistência da DEMO:** dados só fictícios em browser `localStorage` (`colus.portal.sandbox.v2`), papel em `sessionStorage`; reset restaura dataset. **NÃO colocar dados reais**; produção necessita backend, autenticação real e autorização server-side, auditoria, dados persistentes institucionais, validação curricular pela escola e direitos de uso dos media.

**Qualidade:** workflow `COLUS Portal Demo QA` verifica TypeScript, build, contrato de oito perfis, exclusão financeira do aluno, fluxos professor→encarregado e finanças→encarregado, criação/edição/arquivo de aluno, atribuição de turma e permanência após refresh, navegação mobile 390px e splash autónomo. Referência inicial verde no commit `dcb3bb12`: run [39396553482](https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39396553482), artefacto screenshots `12251793846`; capturas agora aguardam a animação final e código de scroll restoration, para inspeção mais fiel.

**Não concluído:** backend operacional; acesso seguro a dados reais; fluxos ERP/recibos reais; matriz curricular fina por opção/ano; aprovação estética final no dispositivo do responsável; deployment público (Railway sem créditos). **Não afirmar produto pronto para produção.**

**Próxima fase:** inspecionar browser QA final em `develop` (incluindo capturas após animação), obter feedback COLUS e priorizar desenvolvimento adicional por validação. Manter `main`, assets, backups e landing imutáveis.

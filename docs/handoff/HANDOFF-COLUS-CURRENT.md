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

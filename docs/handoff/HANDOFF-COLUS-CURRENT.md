# COLUS — CURRENT LIVING HANDOFF

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

## 15. IMMEDIATE NEXT ACTION

Do not assume the landing is final.

1. **Real-browser desktop QA** (`npm run dev` in `frontend/`, real fonts): confirm the Convite Final symbol is clean; if it is not, fall back to option 4.
2. **Decision needed:** approve or reject fixing the sticky-stage `overflow-hidden` problem in Aprender/Futuro/Pertencer/Transformar (e.g. `overflow-clip`), with full re-QA of all four sections. This likely also resolves the Transformar desktop tail. Alternatives: a Transformar-only adjustment.
3. After that decision: finish desktop QA of the whole landing, then full mobile QA, then re-verify the complete landing and update this file.

Separate approvals still pending: lockfile; recording decision C in the design docs; retiring/updating `NEW-CHAT-PROMPT-COLUS.md`; deleting `ColusMark.tsx`.


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

2026-10-05

Updated after: removal of the testimonial section from the public landing (decision C) and the Convite Final official-symbol crop (decision 3, conditional). Verification was partial and headless (see section 11). Nothing in section 12 marked "Open" has been resolved. Commits were pushed to `origin/main` (up to `ac73497`).

Important: This file is intended to be updated continuously. It should remain in the repository and should not be treated as a one-time snapshot.


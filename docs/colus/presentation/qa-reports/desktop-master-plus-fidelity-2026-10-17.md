# COLUS Desktop — Master Plus Fidelity Review
Date: 2026-10-17
Status: IN VALIDATION — NOT AN APPROVAL TO MERGE

## Source of truth

- User-provided `landing-colus-master-plus.drawio` (exact file examined, 2026-10-17). Diagram: `Landing COLUS — Canvas Completo`; active desktop panel nodes `belong_9110–belong_9136`, plus `learn_132–learn_198`, `future_10–future_104`, `life_63–life_69`, `transform_9302–transform_9345`.
- Latest explicit artistic choice prevails: the mobile Hero → Manifesto HEART (without centre bar) is deliberate.
- Handoff: `docs/handoff/HANDOFF-COLUS-CURRENT.md`.
- Current review branch: `feat/colus-desktop-master-plus-fidelity`, created from `feat/colus-mobile-editorial-storytelling`; DRAFT PR #3 **into the existing feature branch**, not main. PR #2 remains the eventual review gate into main.

## Protected

**No modification is authorized to any media file or `src` reference, photograph/poster/video, COLUS logo, public copy, Hero, mobile scene layout, or rights status.** Only desktop path/node motion and positions of existing editorial elements.

## Master Plus: desktop Community Ring

Coordinates below are **relative positions within Draw.io** (not literal CSS pixels): parent `belong_9111` at (40,13210), size 1720 × 760. Central ellipse `belong_9112`: relative (525,100) 650 × 500. Centre headline `belong_9113` and description `belong_9114` INSIDE the ellipse. Three approved photo windows:
- Main human image: relative (70,110), 390 × 290.
- Participation image: (1175,75), 420 × 250.
- Culture/meeting image: (1130,440), 390 × 220.

Six contextual points from `belong_9118–belong_9123` (relative to panel): (570,130), (735,85), (995,120), (1145,245), (1040,545), (765,590). Relationship meanings below/around ellipse: **Acompanhar → Participar → Crescer juntos**.

The ring itself is an **incomplete dotted/outlined ORANGE relational arc**; this is not a filled disk. Only the single dominant pointer has a filled blue/orange face. SVG can scale elliptically; HTML-positioned contextual nodes and the active ring must remain physically circular.

Five phases, from `belong_9128–belong_9136`: **1 RELAÇÃO** (final human frame/Story Marker continues); **2 ARCO NASCE** (marker draws arc and nodes appear); **3 COMUNIDADE** (media settle around centre); **4 ESTABILIDADE** (ring remains open with central headline legible); **5 ABERTURA** (ring opens into Rise Axis). Progressive scroll must have real intermediate states, not just a final outline.

## Other required corrections

- Aprender `learn_188–learn_197`: Learning Trail must hand off its energetic final node to Futuro, with the Deep Blue scene accepting that energy.
- Futuro `future_54–future_73`: **one persistent Scene Window** across TIC/ENGENHARIA/CIÊNCIA/SEGURANÇA DIGITAL; media transform *inside* the frame, no detached-card remount; progress 01–04 shows active scene. Signal Field continues from the Learning Trail. Four approved media and all exact copy remain.
- Vida `life_63–life_69` → Pertencer `belong_9102–9109`: a subtle Story Marker/colour/position handoff, without replacing or duplicating the approved photos.
- Pertencer `belong_9151–9164` → Transformar `transform_9302–9316`: open ring path physically leads toward the same horizontal origin as Rise Axis, then ascends; no detached line.
- Motion hierarchy remains `motion_10102–10104`: Futuro is Signature, Aprender/Transformar are Narrative, Pertencer/Vida Subtle.

## Candidate implementation (not yet owner-approved)

On this isolated branch, the desktop Community Ring stage has the central copy, three existing media redistributed around it, three relation beats, six contextual nodes, one active filled node, and five scroll phases. A master-relative SVG path is open and dotted, and the last segment approaches Rise Axis. Futuro retains its fixed outer Scene Window with inner media mask transitions and active scene 01–04. Aprender/Futuro and Vida/Pertencer now share more closely aligned entry/exit paths/marker positions.

**Important:** changing image window geometry can change the visible framing even when media bytes, object-position settings and `src` remain unchanged. That needs screenshot approval and cannot be described as pixel-identical crop retention.

## Verification gates

1. Review file diff against source branch: no `frontend/public/media/**`, `IntroHeroSection.tsx`, official words or media source changes.
2. TypeScript `npm run typecheck`, existing static QA, asset locks and `npm run build`.
3. Existing mobile ring/PATH browser suite including reduced motion.
4. Existing desktop path/nodes suite, including **physically circular** active ring.
5. `frontend/scripts/qa-desktop-master-plus.mjs`: two desktops 1440×900 and 1024×768, five Community phases, six contextual dots, central copy vs media geometry, four Futuro scenes in one persistent frame, and chapter endpoints.
6. Manual Edge continuous-scroll forward/reverse and owner visual signoff, particularly faces, text and crop framing.

**NO automatic merge**. After approval: merge PR #3 to `feat/colus-mobile-editorial-storytelling`; rerun complete tests on PR #2; only then consider merging PR #2 into `main`.

## Desktop Master Plus — corrective browser acceptance pass (2026-10-17, latest)

**Context:** An initial CI PASS was rejected after a deeper Chrome/Chromium visual audit found frozen scene opacities and gaps between independent motion devices. The new *computed-style* browser test exposed that `scrollYProgress` and derived MotionValues advanced but Chromium's accelerated native opacity effects did not. Tests that only checked SVG node movement were insufficient.

**Corrective implementation on PR #3, no asset/copy edits:**
- `frontend/src/components/landing/useScrollOpacity.ts`: dedicated scroll-driven MotionValue interpolation, avoiding the native WAAPI opacity timeline conflict. No timers, RAF loops or React re-rendering on each frame. Applied ONLY to desktop opacity layers in `AprenderSection.tsx`, `TransformarSection.tsx`, `PertencerSection.tsx`. CSS/Framer transforms and approved mobile markup remain unchanged.
- `qa-desktop-state-audit.mjs`: asserts actual **computed** opacity of the displayed desktop scenes, not merely source scroll progress, at 12%, 50%, 88%, for 1440×900 and 1024×768. Discover→Create, Expressar→Construir→Avançar and Community media full stability all PASS.
- Community Ring stage fixed to Master panel `1720×760` aspect, centred within the desktop sticky viewport; central headline in two lines. Relationship titles retained exactly but displayed once in three existing editorial beats (redundant photo captions are visually hidden, still accessible).
- Six context dots stay physically circular, ellipse dotted and open. Main blue/orange node is connected to the open ring at fraction ~0.72 and follows the actual outgoing rise path during phase 5; no teleport back to the first node.
- Outgoing `M765 590 ... 860 940` routes through the gap between relation labels and approaches the Rise Axis **below** the stage, instead of cutting through `Crescer juntos`. Text and images are not repositioned outside the earlier Master-related scope.

**Latest actual Chromium acceptance:** https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39077107986 **SUCCESS** on commit `b7ec8b322cb720ecf8e7aad277e0f27afefaf2ff` including typecheck, production build, protected-asset checks, mobile browser tests, desktop ring tests, Master Plus structure and 30 measured scene opacity states. New geometric test samples outgoing path against ALL relationship cards: **zero collisions**; node follows outgoing path within 32px; arc joins outgoing branch within 7 SVG units; stage vertical centre occupies an intentional band of the viewport. Browser screenshots at 1440/1024 in artifact `colus-mobile-ring-qa` ID `12116579447`.

**Editorial assessment:** inspected contact sheets for 1440/1024 states 2 (Arco Nasce), 4 (Estabilidade), 5 (Abertura), confirming visible composition-centering and node following the descending handoff. This is validated **technical/visual smoke**, not formal signoff for every aspect of source Draw.io fidelity. The transitions must still be assessed by the owner in Microsoft Edge during continuous normal/reverse scroll. No PR merge authorized; keep PR #3 in draft.

## Bidirectional-scroll acceptance gate (2026-10-19)

The earlier Master Plus browser QA observed static milestones; the new `frontend/scripts/qa-desktop-reverse-motion.mjs` deliberately traverses each narrative forward and backward using native browser scroll and asserts real **computed opacity** and scene selection. There is **no production-component or content change** in this iteration.

Final successful Action: https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/39203930468 ; artifact `colus-mobile-ring-qa`, ID `12165266270`, folder `desktop-reversal`.

Pass: 60 samples, 1440×900 and 1024×768, `experiencia`, `futuro`, `comunidade`, `transformar`; max horizontal overflow 0. `comunidade` reverses 5→4→3→2→1; `transformar` reverses from only-third-visible to only-second-visible to only-first-visible. Futuro scene-number and progress indicator agree in both directions. Tests assert section progress close to requested scroll fraction to avoid false-green checks. Existing build, protected-asset, mobile and desktop contract tests PASS.

**Approval split:** code/automated Chromium behavior accepted as regression-safe. Pixel-level fidelity and the rhythm of native scroll on owner's Edge **still require human signoff**. PR #3 remains draft, no merge. All photos, videos, `src`, captions, original public copy, Hero, mobile art direction remain protected.

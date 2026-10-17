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

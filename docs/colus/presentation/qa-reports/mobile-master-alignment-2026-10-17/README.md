# COLUS — Mobile Master V0.18 alignment pass

**Data:** 2026-10-17  
**Branch:** `feat/colus-mobile-editorial-storytelling`  
**Status:** IMPLEMENTED FOR REVIEW / Browser QA and npm verification PENDING  
**Approval:** user requested implementation of the missing mobile structure after reviewing `landing-colus-master (10).drawio`. This is NOT approval to merge/publish.

## Source of truth / preserved constraints

- Uploaded file `landing-colus-master (10).drawio` (Master V0.18) reviewed in this session.
- Master contracts: Learning Trail → Signal Field → Story Marker → Community Ring → Rise Axis → Horizon, scene progression and 1 dominant motion + 1 secondary + 1 micro-interaction maximum.
- `docs/colus/design/landing/scroll-budget-colus.md`: mobile editorial rhythm target ~1150–1300svh overall, no hard CSS lock; no scroll snap/jacking; reduced motion direct/static; fast scroll and anchors remain usable.
- **No replacement or modification of photos/videos/posters/logo; Hero protected; existing desktop sections unchanged.**
- Work is limited to the existing mobile PR #2, with no merge to `main`.

## What has been implemented

1. Added `frontend/src/components/landing/MobileNarrativePath.tsx`, one shared scroll-scrub primitive with five editorial path variants:
   - `trail` in Aprender: curved Learning Trail;
   - `signal` in Futuro: Signal Field, secondary low-intensity dashed path, fades on handoff to Vida;
   - `marker` in Vida: sparse/subtle Story Marker intensity;
   - `ring` in Pertencer: lateral Community Ring curve into upward axis;
   - `axis` in Transformar: Rise Axis opens into a horizon towards Vozes.
   A single active node travels on the actual SVG path using `getPointAtLength` controlled by native scroll. Static short lines/dots have been removed from the mobile stage and replaced by connected paths. The node is a fixed-size HTML circle positioned with SVG path coordinates, to avoid ellipse distortion when section height changes.
2. Added `MobileSceneWindow.tsx`: subtle image scale (1.028 → 1 → 1.028) and ±6 px translation tied to natural scroll; **no scrolling blockers, infinite loops, parallax-heavy interactions or changes to the source files.** Fourteen media windows used in mobile stages. The Science video window was deliberately excluded from transform; `LandingMedia` retains its original video pause/play logic.
3. Connected all five mobile sections to their appropriate path variant. Updated Pertencer's first scene marker to `01 / Acompanhar` (then `02 / Participar`, `03 / Crescer juntos`) to match the master. No photos or descriptive claims were changed.
4. Reduced mobile-only stage minimum heights to improve pace without fixed clipping or scroll locking:
   - Aprender: 90+82 → 76+68 = **144svh**;
   - Futuro: 82+76+78+75 → 70+60+65+60 = **255svh**;
   - Vida: 80+62+58+62 → 68+48+35+48 = **199svh**;
   - Pertencer: 82+65+66 → 67+52+54 = **173svh**;
   - Transformar: 90+69+73 → 72+58+58 = **188svh**.
   Nominal stage sum was ~1,190svh and is now ~959svh (excluding spacers, content growth and all other sections). This is a **calibration trial**, not proof of meeting the global Scroll Budget or of good viewport crop.

## Checks observed during implementation

- Five desktop JSX regions compared to the prior branch content during edits and confirmed unchanged. Latest static comparison against `main`: Aprender, Futuro, Pertencer and Transformar text-identical in their desktop blocks; Vida desktop remained unedited under the pre-existing `hidden lg:block` wrapper.
- Code file reading shows one `MobileNarrativePath` instance in each of the five sections.
- Counted 14 `MobileSceneWindow` wrappers over existing photo content.
- Simple JSX structural balance check (div/section/article/span/svg/path, and motion components) showed no unbalanced tags in all seven new/changed code files sampled.
- No changes to Intro/Hero, media assets, `LandingMedia.tsx`, backend or dependencies.
- No npm typecheck/test:qa/build and no Edge runtime/screenshot verification after these changes. **Do not claim test success.**

## Open discrepancies / QA gates

- True continuous cross-section alignment, node motion and transition behavior **must be observed in Edge**, not inferred from hooks alone. Confirm rail stays behind copy, is never an elongated ellipse, and passes from Trail→Signal, Signal→Marker, Ring→Axis, Axis→Horizon with no sudden teleport or disconnected endpoints.
- Master mobile asks for Aprender/Criar primary + secondary media. Current build still uses one dominant photo in Criar; **do not pick/change assets without editorial approval**.
- Vida's photo-essay and Pertencer's emotional sequencing require qualitative High Fidelity review after this motion pass.
- Global budget not yet met or measured: these five sections alone total ~959svh of stage minima while their original preferred ranges total ~675–735svh; Intro + Manifesto not recalibrated because Hero is protected. Do not shrink further blindly.
- Responsive inspection 360×800, 390×844, 440×956, 768×1024 and desktop regression.
- Test fast scroll, reverse scroll, direct anchor entry (`#experiencia`, `#futuro`, `#comunidade`, `#transformar`), Header overlap, `prefers-reduced-motion`, Save-Data, Science upright playback/poster/pause, low-end performance and text contrast.
- Run in `frontend/`: `npm run typecheck`, `npm run test:qa`, `npm run build`; log actual outputs. Do not merge PR #2 until observed results and visual approval.

## Specific QA command

```powershell
git status
git fetch origin
git switch feat/colus-mobile-editorial-storytelling
git pull --ff-only origin feat/colus-mobile-editorial-storytelling
cd frontend
npm run typecheck
npm run test:qa
npm run build
npm run dev
```

Check local `git status` before switching/pulling; preserve user's uncommitted changes.

## Editorial rings — Manifesto and Vozes (2026-10-17)

**Source:** Edge 440×956 screenshots supplied by the owner. Two distinct empty elliptical ornaments were circled: one below the Manifesto photograph plus a thin disconnected timeline node, another at the bottom-left of the image in Vozes COLUS. These are implemented in `ManifestoSection.tsx` and `TestimonialsSection.tsx`, NOT in `MobileNarrativePath.tsx`. Earlier advice identifying only the latter was incorrect.

**Fix (branch only):** created `EditorialOrbitNode.tsx` — solid deep-blue/orange disc with centre and two pointer dots orbiting according to **section-native scroll progress**, no automatic perpetual loop, `pointer-events-none`, reduced-motion static. In mobile Manifesto replaced the pale image ellipse with a photo-corner filled ring and the isolated horizontal dot with a compact moving filled ring on a drawn rail. In mobile Vozes replaced the photo ellipse and the timeline's solitary point with the same two variants. The original desktop graphics are retained with `hidden lg:block` while mobile replacements use `lg:hidden`. The image, editorial text and official assets are unchanged.

**Regression protection:** `frontend/scripts/qa-mobile-story-contract.mjs` now statically checks the new component, both consuming sections, scroll-driven pointers and no infinite loop. It remains included in `npm run test:qa`.

**Commits:** component `f6d6825`, Manifesto `2647081`, Vozes `b66ff55`, QA contract `716318e`.

**Approval gate:** verify on Microsoft Edge mobile 440×956 and 390×844 the two filled nodes and their pointer progression, particularly that neither covers text, significant faces, navigation or captions, and that reduced-motion has no spinning elements. **No typecheck / build / QA runtime was executed in this session.** PR #2 remains draft, no merge.


## Real-browser QA for filled rings — GitHub Actions (2026-10-17)

**Evidence (production build / Playwright Chromium):**
- GitHub Actions final successful run: https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/38980178093
- Artifact: `colus-mobile-ring-qa` (ID `12081260195`), 6 PNG screenshots and `results.json`.
- Viewports: **440×956** and **390×844**, mobile+touch.
- Manifesto and Vozes photo-ring measured at **72px**; visibly filled, contrast and pointer details present in captured output. Both rings rotated with actual scroll, while reduced-motion remained static. **Zero uncaught JS page errors** in this QA script.
- `npm run typecheck`, `npm run test:qa`, `npm run build` also passed in the same run.
- Prior browser run failed only due to a strict-selector error in the smoke test (two expected pointer nodes matched); test selector was corrected in commit `b552a892`. Final run passed.
- Browser QA scripts live in `frontend/scripts/qa-mobile-browser.mjs` and GitHub Actions workflow `.github/workflows/colus-frontend-qa.yml`.

**Visual inspection:** screenshots were retrieved and examined. Rings are **solid** and no headline/caption collisions were evident near them in the evaluated frames. **Additional observation:** screenshots of Manifesto at the scrolled position expose a narrow dark triangular shape from the page/book transition at the top edge. This appears separate from the filled-ring implementation and must be reviewed against the approved Hero→Manifesto transition in a continuous scroll video before changing any protected component. Do not classify the full mobile landing as approved from the ring-only screenshots.

**Approval gate:** filled ring rendering/function has real-browser smoke evidence; full storytelling, scroll handoffs, assets rights, image crops beyond these scenes and owner visual approval remain open. PR #2 still draft; main unchanged.


## 2026-10-17 — Manifesto page seam and PATH/NODE browser QA

**Scope and evidence:** issue observed in screenshots from Chromium at 390×844 / 440×956: dark triangular wedge at upper centre of Manifesto caused by the gap between two vertically scaled, rounded paper-page leaves, not by the protected Hero asset. No Hero or media files were edited.

**Fix:** `ManifestoSection.tsx` now adds a narrow central `bg-colus-paper` spine matching the two leaves' `scaleY` transform. This seals the seam during scroll while preserving the left/right page opening and all desktop/hero media. Stable marker: `data-colus-manifesto-spine`.

**Automated evidence:** `qa-mobile-browser.mjs` includes a PNG pixel assertion sampling the top-centre paper colour at y=15/30/45 for 390px and 440px mobile captures; the browser run confirmed the three pixels as `rgb(255,248,239)` in both viewports. Before the fix the same pixel locations were `rgb(7,26,42)` in the saved baseline captures. Browser smoke and QA/build passed on run https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/38981030829.

**Five-section PATH/NODE browser test:** added `frontend/scripts/qa-mobile-handoffs.mjs` and included it in `.github/workflows/colus-frontend-qa.yml`. Smoke covers native-scroll motion in Aprender `trail`, Futuro `signal`, Vida `marker`, Pertencer `ring`, Transformar `axis`, 390×844. For each device, 360px scroll produced a measurable increase in active-node Y; no horizontal overflow. All five paths presented a static reduced-motion fallback; zero uncaught browser errors. Real-production Chromium run https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/38981335443 passed, as did TypeScript typecheck, QA scripts, assets safeguard, build and prior filled-ring smoke. Screenshot artifact `colus-mobile-ring-qa` ID `12081750112` contains ten PATH before/after PNGs, seven ring PNGs and two JSON evidence files.

**Visual inspection:** a contact sheet of the ten PATH captures was reviewed. Paths and nodes appear as thin, left-aligned connective elements and the photographs remain present. Some section boundaries still use spaced inset media/card-like masks; true pixel-contiguous PATH handoff across two separate sections has **not** been proven, even though each path animates internally. This is a separate High Fidelity REVIEW, not a regression/failure of the native-scroll tests.

**Remaining:** user approval of High Fidelity composition, real Microsoft Edge mobile continuous-scroll review, interaction/accessibility beyond covered smoke, Science video viewport behavior, unsupported testimonial-publication decision C conflict, and merge. `main` unchanged; PR #2 DRAFT. Do not alter Hero, protected assets or desktop to address aesthetic differences without evidence/authorization.


## Mobile chapter seam refinement — 2026-10-17

**Owner approval in conversation:** proceed to refine visual connections between chapters after functional PATH/NODE QA, without changing photos/media or approved Hero/desktop. Branch `feat/colus-mobile-editorial-storytelling`, PR #2 remains draft.

**Issue:** in Aprender, Vida, Pertencer, Transformar repeated mobile-only 40–48px empty spacers made image windows look like detached cards. On tablet (`sm` breakpoint), the wrappers of Aprender/Pertencer/Transformar used vertical 48px padding and Futuro used 48px outer margins, breaking the alignment of the editorial axis. Source JSX was examined before changes.

**Correction implemented on five existing mobile components:**
- Set the five `max-w-[680px]` mobile narrative wrappers to the same `bg-colus-ink` visual field and added `data-colus-mobile-story="trail|signal|marker|ring|axis"` for browser QA.
- Removed wrapper vertical tablet padding/margin; retained naturally centred maximum width at larger mobile/tablet viewports.
- Reduced intra-chapter decorative breaks from `h-10` (40px) or `h-6` (24px) to `h-3` (12px), and removed trailing decorative gaps.
- Kept intentional off-axis photo masks and insets in Vida and Pertencer as photo-essay features; these are not converted into generic equal cards.
- No words, video/image paths, image files, Hero or desktop JSX blocks were changed in this pass.

**New browser QA:** `frontend/scripts/qa-mobile-handoffs.mjs` now checks **4 section seams** (Aprender→Futuro, Futuro→Vida, Vida→Pertencer, Pertencer→Transformar) at **390×844, 440×956 and 768×1024**. It asserts contiguous wrapper Y edges (≤2px), aligned wrapper X/width and narrative-path X (≤2px), retains PATH active-node scroll, reduced-motion, horizontal-overflow checks, and stores 12 seam PNG screenshots. It does NOT claim that every photographed crop is editorially approved.

**Results:** CI https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/38982859788 — **SUCCESS**: TypeScript, test:qa, protected assets checks, production build, filled rings, Manifesto page seam, five PATH/NODE movement checks, and 12 wrapper seam checks. Artifact `colus-mobile-ring-qa` ID `12082295931` contains the screenshot evidence and JSON. Captures were downloaded and visually inspected. The 440×956 images show directly adjacent scenes; no independent gap is visible at the four transitions. Tablet outer gutters still reflect intentional 680px max-width framing, and remain an editorial review item (not an automatic defect).

**Scope and caveat:** this is a chapter-transition structural/motion pass, not proof of complete Master V0.18 pixel fidelity, user-side Edge, video playback, cross-device performance, rights review or permission to merge. The desktop blocks in Aprender/Futuro/Pertencer/Transformar remain byte-identical to `main`; Vida desktop code was preserved unedited during this pass, although its previous branch wrapper differs from `main`. No assets changed. PR #2 draft.


## Mobile Open Book — giant heart/petals rejected (2026-10-17)

**Owner evidence:** Microsoft Edge iPhone 16 Pro Max 440×956 screenshot of the Hero→Manifesto scroll bridge shows two enormous Warm Paper petals with a tall solid rectangle between them. The owner explicitly said this is not the book transition designed in the wireframe.

**Source-based diagnosis:** `ManifestoSection.tsx` used two `h-[108%] w-[56%] rounded-t-[52%]` shapes stretched by `scaleY` plus a 9%-width full-height centre spine, visually creating a heart rather than the **subtle Open Book double curve** in Master V0.18: «Warm Paper sobe por curva, sem wipe reto». The protected `IntroHeroSection.tsx` was not the cause.

**Fix on branch `feat/colus-mobile-editorial-storytelling`:**
- Replaced both giant mobile page silhouettes and the mobile centre stem with **one continuous shallow SVG Warm Paper surface**, `data-colus-manifesto-curve`, rising with the existing `pageScaleY` scroll mapping. Cubic Bézier controls at centre now share a horizontal tangent: no V-shaped angular cusp.
- Added a short top-paper settling fade to ensure the final Manifesto is fully Warm Paper, no remaining dark wedge.
- Retained both historic page leaves **desktop-only** with `hidden lg:block`. No Hero, video, poster, image file, desktop copy or asset was changed.
- Browser regression: `qa-mobile-browser.mjs` captures intermediate Hero→Manifesto frame at 390×844 and 440×956 and validates that the Warm Paper entry remains shallow (centre/side height difference ≤80px); existing final-paper pixel checks and filled ring/motion checks remain.
- Static regression: `qa-mobile-story-contract.mjs` asserts a single mobile Open Book SVG, no centre stem, desktop isolation.

**Initial real-browser evidence:** run https://github.com/rightware-corporations/educore-colegio_universo_dos_sonhos/actions/runs/38983926935 PASS; original intermediate screenshot showed large heart replaced by one shallow curved paper field. After seeing a slight sharp 'V' at the centre, the control points were refined (commit `b0fc762`) to make the centre smooth. **Final refined screenshot and tests must be confirmed on the latest branch HEAD**; user visual approval still pending.

**Required next check:** compare refined `manifesto-bridge-390.png` and `manifesto-bridge-440.png` (after final CI) against original Edge heart screenshot; no petals, no centre rectangle, no sharp cusp, Hero/CTA intact. Verify mobile natural scroll and reduced-motion and desktop regression. Do NOT declare approved for merge before owner review.

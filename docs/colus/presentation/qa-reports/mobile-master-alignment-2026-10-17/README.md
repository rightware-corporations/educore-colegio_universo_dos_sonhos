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

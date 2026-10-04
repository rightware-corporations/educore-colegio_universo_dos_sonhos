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

State: Landing-page implementation and visual QA are active.
The latest known repository state includes the post-2026-10-03 landing implementation and subsequent visual/brand corrections.
The current known latest commit from the continuation work is:

ea055622cc3cfd16af6f4b35c05949b2106b1bc3

This must be re-verified against the repository before further implementation.

## 7. CURRENT PHASE

### Landing implementation → visual QA → mobile QA → finalization

Immediate sequence:
1. Inspect current local landing implementation.
2. Perform structured desktop visual QA against the approved master/design direction.
3. Fix only confirmed deviations.
4. Perform mobile QA.
5. Resolve the testimonial placeholder using real/approved content only.
6. Re-verify the complete landing.
7. Update this handoff.

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

## 9. CURRENT IMPLEMENTATION STATE

The implementation should be treated as the current Git state, not as a claim from this document.
The landing has undergone multiple visual corrections and brand-asset corrections.
The official COLUS logo corrections are considered part of the current implementation direction.
No fabricated testimonials or unsupported social-proof content should be introduced.

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

### Last known verification state
The continuation work included iterative visual corrections, but the current local/runtime state must be re-verified before declaring the landing final.

### Required next verification
- Desktop visual inspection.
- Section-to-section spacing and transitions.
- Typography hierarchy.
- Official logo rendering.
- Hero and manifesto composition.
- Aprender/Futuro/Pertencer/Transformar transitions.
- Testimonial area.
- Final CTA and footer.
- Responsive/mobile behavior.
- Build/runtime health.

Only record a check as completed after it has actually been performed.

## 12. KNOWN ISSUES / BLOCKERS

### Known
- Testimonial content/placeholder still requires resolution using real or approved content.
- Current local landing should be inspected before further edits.

### Rule
Do not invent proof, testimonials, reviews, student outcomes, numbers, or institutional claims to fill placeholders.

## 13. DECISIONS / CONSTRAINTS

- Preserve approved visual direction unless a concrete deviation or explicit new instruction requires change.
- Avoid generic AI-generated/SaaS-style design.
- Do not redesign unrelated sections during focused QA.
- Do not modify backend when the task is limited to landing/frontend QA unless explicitly required.
- Verify before claiming completion.
- Keep historical handoffs intact.
- Keep this file current.
- Prefer small, traceable changes.
- Before editing an existing GitHub file through the API, fetch its current SHA.

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

## 15. IMMEDIATE NEXT ACTION

Do not assume the landing is final.

First: Inspect the current main branch and run/inspect the landing locally on desktop.
Then: Perform structured visual QA against the approved master/design direction and fix only confirmed deviations.
After that: Perform mobile QA and resolve the testimonial placeholder with approved content.
At the end of that work cycle, update this file again.

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

2026-10-04

Created as the living operational handoff.

Important: This file is intended to be updated continuously. It should remain in the repository and should not be treated as a one-time snapshot.
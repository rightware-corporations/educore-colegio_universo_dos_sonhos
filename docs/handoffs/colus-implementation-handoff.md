# HANDOFF — EduCore COLUS Implementation

> **Updated:** 2026-10-03  
> **Purpose:** continue implementation in a new chat without reopening design decisions.

---

## 1. Read this first

The public COLUS landing is already:

> **HIGH-FIDELITY V0.21 — LANDING IMPLEMENTATION READY**

Do **not** redesign the landing.

Canonical authority order:

1. `docs/colus/design/landing/landing-colus-master.drawio`
2. `docs/colus/design/landing/high-fidelity-direction-colus.md`
3. specialized landing specs
4. `archive/` only as historical reference

Canonical sequence:

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

No new section or visual direction should be introduced without explicitly reopening the design gate.

---

## 2. Mandatory implementation references

Read before changing the landing:

- `docs/colus/design/landing/high-fidelity-direction-colus.md`
- `docs/colus/design/landing/master-high-fidelity-consolidation-colus.md`
- `docs/colus/design/landing/motion-spec-tecnico-colus.md`
- `docs/colus/design/landing/typography-grid-responsive-colus.md`
- `docs/colus/design/landing/header-anchors-colus.md`
- `docs/colus/design/landing/scroll-budget-colus.md`
- `docs/colus/design/landing/copy-status-colus.md`
- `docs/colus/design/landing/contactos-cta-colus.md`
- `docs/colus/design/landing/asset-final-selection-colus-v03.md`

---

## 3. Asset rule

The curated implementation assets belong in:

> `frontend/public/media/colus/landing/`

The expected file list is tracked in:

> `frontend/public/media/colus/landing/asset-manifest.json`

The selected pack is:

> `colus-assets-final-v03.zip`

A ZIP by itself is only a transport package. For implementation, the **extracted files must exist in the repository** at the paths above.

Install helper:

> `scripts/install-colus-assets.sh /path/to/colus-assets-final-v03.zip`

After extraction, commit and push the actual media files.

If the assets are present at those paths, **do not ask the user to upload them again**.

---

## 4. Asset adaptations already approved

Do not reopen these gaps:

- Engineering → device-led scene using Path + Node + schematic geometry.
- Girls in ICT → female student in ICT context; do not claim a specific event unless validated.
- Pertencer → community/belonging; do not label people as parents/guardians without validation.
- Museu/Umbelúzi → discovery/practical learning without false caption.
- Brand mark → derived SVG device reconstructed from raster reference; do not call it an official vector.
- Transformar / Avançar → achievement/progression frame.

---

## 5. Motion contract

Stack target:

- React
- TypeScript
- Framer Motion
- SVG/CSS
- native scroll
- IntersectionObserver
- reduced motion

Do not introduce a separate animation engine per section.

Global primitives:

- MotionPath
- MotionNode
- MediaWindow
- LightHalo
- SectionProgress
- ReducedMotionGate

Motion authority:

> `docs/colus/design/landing/motion-spec-tecnico-colus.md`

---

## 6. Product architecture already decided

Current deployment rule:

> **1 school = 1 repository = 1 independent deployment**

EduCore remains a distributed SaaS:

- RIGHTWARE central **Control Plane**
- isolated customer **Data Plane**
- personalized **Experience Plane**

Super Admin is RIGHTWARE-global, not the school's executive admin.

Operational customer data must remain isolated per school.

The central Control Plane stores fleet/config/health/module/version metadata, not shared student operational data.

---

## 7. Backend direction already decided at product level

Known baseline:

- Java backend
- PostgreSQL
- Redis cache
- strong security beyond JWT/hash
- robust database architecture
- backend/database/security architecture must be designed before implementation

Do not treat the Páscoa backend/database placeholders as production reference.

The next architecture work after the landing plan is to close:

- exact Java stack/framework versions
- backend modular architecture
- database architecture
- security architecture
- repository tree
- then bootstrap/implementation

---

## 8. Current implementation gate

Landing:

> **IMPLEMENTATION READY**

Next technical task:

> **FRONTEND IMPLEMENTATION PLAN → then React/TSX implementation**

Do not reopen landing design unless a real implementation contradiction is found.

If a spec is ambiguous, interpret minimally and preserve the approved direction.

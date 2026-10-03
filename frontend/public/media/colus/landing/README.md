# COLUS Landing Media

This directory is the canonical runtime location for the curated COLUS landing assets.

## Expected source pack

`colus-assets-final-v03.zip`

## Installation

From repository root:

```bash
bash scripts/install-colus-assets.sh /absolute/path/to/colus-assets-final-v03.zip
```

Then verify:

```bash
git status --short frontend/public/media/colus/landing
```

The extracted binary files should be committed to the repository so implementation chats and CI do not depend on a local ZIP or previous ChatGPT sandbox.

## Source of truth

- `asset-manifest.json`
- `docs/colus/design/landing/asset-final-selection-colus-v03.md`
- `docs/colus/design/landing/motion-spec-tecnico-colus.md`

## Production rights

This pack is approved for the private MVP/demo workflow. Media with people still requires COLUS approval/rights confirmation before public production use.

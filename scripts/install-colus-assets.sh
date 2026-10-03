#!/usr/bin/env bash
set -euo pipefail

ZIP_PATH="${1:-}"
ROOT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
DEST="$ROOT_DIR/frontend/public/media/colus/landing"

if [[ -z "$ZIP_PATH" ]]; then
  echo "Usage: bash scripts/install-colus-assets.sh /path/to/colus-assets-final-v03.zip" >&2
  exit 1
fi

if [[ ! -f "$ZIP_PATH" ]]; then
  echo "Asset pack not found: $ZIP_PATH" >&2
  exit 1
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

unzip -q "$ZIP_PATH" -d "$TMP"

SRC="$TMP/colus-assets-final-v03"
if [[ ! -d "$SRC" ]]; then
  echo "Unexpected ZIP layout: expected colus-assets-final-v03/" >&2
  exit 1
fi

mkdir -p "$DEST"

for d in 00-brand 01-hero 02-manifesto 03-aprender 04-futuro 05-vida-colus 06-pertencer 07-transformar; do
  if [[ -d "$SRC/$d" ]]; then
    mkdir -p "$DEST/$d"
    cp -R "$SRC/$d/." "$DEST/$d/"
  fi
done

if [[ -d "$SRC/manifest" ]]; then
  mkdir -p "$DEST/manifest"
  cp -R "$SRC/manifest/." "$DEST/manifest/"
fi

echo "Installed COLUS landing assets into:"
echo "  $DEST"
echo
echo "Next:"
echo "  git add frontend/public/media/colus/landing"
echo "  git commit -m 'assets: add curated COLUS landing media V0.3'"
echo "  git push"

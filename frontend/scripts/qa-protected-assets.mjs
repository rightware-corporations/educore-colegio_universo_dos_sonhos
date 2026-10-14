/**
 * Guards the COLUS Hero and official brand against silent asset replacements.
 * No source files are changed. SHA-1 is the Git blob *integrity identifier*,
 * not a password hash or a security authentication mechanism.
 */
import assert from "node:assert/strict";
import { createReadStream, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const manifest = JSON.parse(readFileSync(path.join(root, "docs/colus/presentation/hero-protected-asset-lock.json"), "utf8"));
assert.equal(manifest.schema, "RIGHTWARE/PROTECTED-ASSETS/V1");

async function gitBlobHash(filePath) {
  const size = statSync(filePath).size;
  const hash = createHash("sha1");
  hash.update("blob " + size + "\0", "utf8");
  for await (const chunk of createReadStream(filePath)) hash.update(chunk);
  return hash.digest("hex");
}

for (const entry of manifest.references) {
  const filename = path.join(root, entry.path);
  const observed = await gitBlobHash(filename);
  assert.equal(observed, entry.gitBlobSha1,
    "O asset aprovado foi alterado: " + entry.path +
    "\nEsperado (Git blob): " + entry.gitBlobSha1 +
    "\nObservado: " + observed +
    "\nNão substituir o vídeo, poster ou logo sem autorização.");
  console.log("Protegido OK: " + entry.path.split("/").at(-1));
}

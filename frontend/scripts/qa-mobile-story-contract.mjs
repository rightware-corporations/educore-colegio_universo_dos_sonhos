/**
 * COLUS mobile visual-story contract (Master Draw.io V0.18).
 *
 * Static regression checks only: these DO NOT validate rendered motion,
 * pixel accuracy, video playback, breakpoints or accessibility in browser.
 * Run through npm run test:qa, followed by Edge visual QA.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const componentDir = path.join(root, "src", "components", "landing");
const read = (file) => readFileSync(path.join(componentDir, file), "utf8");

const components = [
  { file: "AprenderSection.tsx", device: "trail", minWindows: 2 },
  { file: "FuturoSection.tsx", device: "signal", minWindows: 3 },
  { file: "VidaSection.tsx", device: "marker", minWindows: 4 },
  { file: "PertencerSection.tsx", device: "ring", minWindows: 3 },
  { file: "TransformarSection.tsx", device: "axis", minWindows: 2 },
];

const pathComponent = read("MobileNarrativePath.tsx");
const mediaComponent = read("MobileSceneWindow.tsx");

for (const component of [...components.map(({ file }) => file), "MobileNarrativePath.tsx", "MobileSceneWindow.tsx"]) {
  const src = read(component);
  const { diagnostics = [] } = ts.transpileModule(src, {
    fileName: component,
    reportDiagnostics: true,
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const errors = diagnostics.filter((d) => d.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0,
    component + ": " + errors.map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n")).join("\n"));
}

for (const { file, device, minWindows } of components) {
  const src = read(file);
  assert.equal((src.match(/<MobileNarrativePath\s+kind=/g) ?? []).length, 1,
    file + " must contain one narrative PATH per mobile section");
  assert.ok(src.includes('<MobileNarrativePath kind="' + device + '" />'),
    file + " must use the correct Master device");
  assert.ok((src.match(/<MobileSceneWindow>/g) ?? []).length >= minWindows,
    file + " must retain editorial media movement");
  assert.ok(src.includes('import { MobileNarrativePath }') && src.includes('import { MobileSceneWindow }'),
    file + " must import the shared components");
}

for (const device of ["trail", "signal", "marker", "ring", "axis"]) {
  assert.ok(pathComponent.includes(device + ": {"), "Missing narrative device: " + device);
}
assert.ok(pathComponent.includes("useScroll") && pathComponent.includes("useMotionValueEvent"),
  "Active node must track scroll progress, not animate independently");
assert.ok(pathComponent.includes("getPointAtLength"),
  "Node must follow path geometry rather than a decorative fixed offset");
assert.ok(pathComponent.includes("useReducedMotion") && pathComponent.includes("reducedMotion ?"),
  "Reduced-motion static path is mandatory");
assert.ok(pathComponent.includes('pointer-events-none'),
  "Narrative device must never intercept touch, links or scroll");
assert.ok(!pathComponent.includes("repeat: Infinity"),
  "No perpetual, independent node animation");

// Photo motion must remain subtle and should never pin/snap/override input.
assert.ok(mediaComponent.includes("useReducedMotion"), "Media requires a static fallback");
assert.ok(mediaComponent.includes("useScroll"), "Media movement should be controlled by native scroll");
assert.ok(!mediaComponent.includes("scrollIntoView") && !mediaComponent.includes("scrollTo("),
  "Media must never hijack scroll");
assert.ok(mediaComponent.includes("[1.028, 1, 1.028]"),
  "Media transform must stay within the approved subtle range");

const future = read("FuturoSection.tsx");
assert.ok(future.includes("COLUS-FUTURO-CIENCIA-VID-001-upright.mp4"),
  "Approved upright Science video must remain referenced");
assert.ok(future.includes("COLUS-FUTURO-CIENCIA-001.webp"),
  "Approved Science poster must remain referenced");
assert.ok(!future.includes("EngineeringMobileDevice"),
  "Do not reintroduce the rejected engineering pentagon overlay");

const transform = read("TransformarSection.tsx");
assert.ok(transform.includes('<MobileNarrativePath kind="axis" />'),
  "Rise Axis/Horizon handoff must remain present");

console.log("COLUS mobile Master contract: 5 devices, node/path, 14+ media windows and video safeguards OK");
console.log("NOT VALIDATED: runtime animation, device crop, scroll pacing, video playback, visual fidelity");

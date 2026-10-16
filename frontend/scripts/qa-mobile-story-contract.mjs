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
const orbitComponent = read("EditorialOrbitNode.tsx");

for (const component of [...components.map(({ file }) => file), "MobileNarrativePath.tsx", "MobileSceneWindow.tsx", "EditorialOrbitNode.tsx", "ManifestoSection.tsx", "TestimonialsSection.tsx"]) {
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

// Mobile Open Book belongs to Manifesto as a shallow, continuous surface,
// never the two enormous page-petals or a centre rectangle seen in Edge.
const manifesto = read("ManifestoSection.tsx");
assert.ok(manifesto.includes("data-colus-manifesto-curve"),
  "Manifesto must render the single mobile Open Book curve");
assert.ok(!manifesto.includes("data-colus-manifesto-spine"),
  "Mobile Manifesto must not reintroduce the tall centre stem");
assert.ok(manifesto.includes('className="absolute inset-0 h-full w-full origin-bottom lg:hidden"'),
  "Book transition must be mobile-only and must not alter the desktop pages");

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

// Regression: the two outlines circled in Edge were NOT produced by
// MobileNarrativePath. Guard the actual Manifesto and Vozes components.
for (const file of ["ManifestoSection.tsx", "TestimonialsSection.tsx"]) {
  const source = read(file);
  assert.ok(source.includes('import { EditorialOrbitNode }'),
    file + " must import the solid editorial node");
  assert.equal((source.match(/<EditorialOrbitNode progress=\{scrollYProgress\}/g) ?? []).length, 2,
    file + " must render a photo ring and a rail ring on mobile");
  assert.ok(source.includes("lg:hidden") && source.includes("lg:block"),
    file + " must preserve the desktop composition and scope the new rings to mobile");
}
assert.ok(orbitComponent.includes("bg-colus-deep-blue") && orbitComponent.includes("bg-colus-orange"),
  "Editorial ring must have a solid filled face and contrasting centre");
assert.ok(orbitComponent.includes("useTransform(progress") && orbitComponent.includes("rotate: rotation"),
  "Two orbit pointers must follow actual scroll progress");
assert.ok(orbitComponent.includes("useReducedMotion") && orbitComponent.includes("pointer-events-none"),
  "Decorative nodes must preserve reduced motion and native scroll");
assert.ok(!orbitComponent.includes("repeat: Infinity"),
  "Orbit pointers must never pulse in an infinite timer");
console.log("COLUS mobile Master contract: 5 devices, node/path, 14+ media windows and video safeguards OK");
console.log("COLUS filled editorial rings: Manifesto and Vozes photo/rail nodes present (static contract)");
console.log("NOT VALIDATED: runtime animation, device crop, scroll pacing, video playback, visual fidelity");

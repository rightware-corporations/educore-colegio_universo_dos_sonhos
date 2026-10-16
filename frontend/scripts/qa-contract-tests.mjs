/**
 * Lightweight acceptance tests for the pure RIGHTWARE comparison engines.
 * Run: cd frontend && npm run test:qa
 * Uses existing devDependency "typescript"; no extra test framework installed.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const frontendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadPureEngine(relativePath) {
  const input = readFileSync(path.join(frontendRoot, relativePath), "utf8");
  const javascript = ts.transpileModule(input, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
    fileName: relativePath,
    reportDiagnostics: true,
  });
  const errors = (javascript.diagnostics ?? []).filter((x) => x.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0, errors.map((x) => ts.flattenDiagnosticMessageText(x.messageText, "\n")).join("\n"));
  const module = { exports: {} };
  runInNewContext(javascript.outputText, { module, exports: module.exports });
  return module.exports;
}

const { evaluateDesignFidelity } = loadPureEngine("src/shared/design-qa/designFidelity.ts");
const { mergeDesignEvidence } = loadPureEngine("src/shared/design-qa/domDesignAdapter.ts");
const { evaluateMotionQa } = loadPureEngine("src/shared/motion-qa/contractEvaluator.ts");
const { compactQaSummary } = loadPureEngine("src/shared/design-qa/compactQaSummary.ts");
const { checkpointScrollY, compileVisualCheckpoints } =
  loadPureEngine("src/shared/design-qa/visualCheckpoints.ts");

const base = {
  stage: "Hero", source: "master.drawio#hero_98",
  component: "IntroHeroSection.tsx", expected: "approved state", priority: "P0",
};
const designContract = {
  id: "fixture", version: "1",
  sources: ["master.drawio"],
  rules: [
    { ...base, id: "hero-video", title: "Hero video", type: "asset", selector: "#top video", expectedAsset: "SPORT-DAY.mp4" },
    { ...base, id: "footer-logo", title: "EduCore logo", type: "presence", selector: "footer img" },
    { ...base, id: "footer-groups", title: "Footer groups", type: "count", selector: "footer nav", minimum: 4 },
    { ...base, id: "copy", title: "Copy", type: "text", selector: "#hero h1", expectedText: "Juntos Tornamos" },
    { ...base, id: "order", title: "Sequence", type: "sequence", ids: ["top", "hero", "contactos"] },
    { ...base, id: "ring", title: "Ring", type: "review" },
    { ...base, id: "mobile", title: "Mobile only", type: "presence", selector: "nav", viewport: "mobile" },
  ],
};
const observed = [
  { ruleId: "hero-video", matches: 1, texts: [], assets: ["/media/SPORT-DAY.mp4"], foundOrder: [] },
  { ruleId: "footer-logo", matches: 0, texts: [], assets: [], foundOrder: [] },
  { ruleId: "footer-groups", matches: 2, texts: [], assets: [], foundOrder: [] },
  { ruleId: "copy", matches: 1, texts: ["Juntos Tornamos Sonhos"], assets: [], foundOrder: [] },
  { ruleId: "order", matches: 3, texts: [], assets: [], foundOrder: ["hero", "top", "contactos"] },
  { ruleId: "mobile", matches: 1, texts: [], assets: [], foundOrder: [] },
];
const actual = evaluateDesignFidelity(designContract, observed, "desktop");
const state = (id) => actual.results.find((item) => item.id === id)?.status;
assert.equal(state("hero-video"), "MATCH", "approved Hero asset is unchanged");
assert.equal(state("footer-logo"), "MISSING", "absent brand lockup must fail");
assert.equal(state("footer-groups"), "PARTIAL", "partially implemented section is not approved");
const duplicatedWindow = evaluateDesignFidelity({
  id: "window-fixture", version: "1", sources: ["master"],
  rules: [{ ...base, id: "scene-windows", type: "count", selector: ".window",
    minimum: 1, maximum: 1 }],
}, [
  { ruleId: "scene-windows", matches: 4, texts: [], assets: [], foundOrder: [] },
], "desktop");
assert.equal(duplicatedWindow.results[0].status, "DIVERGENT",
  "4 overlapping scene windows must not pass an exact-one-window contract");

assert.equal(state("copy"), "MATCH", "approved text is found");
assert.equal(state("order"), "DIVERGENT", "wrong wireframe order must fail");
assert.equal(state("ring"), "REVIEW", "ring aesthetics require human judgment");
assert.equal(state("mobile"), "NOT_OBSERVED", "desktop cannot approve mobile rules");
assert.equal(actual.totals.MATCH, 2);
assert.equal(actual.totals.REVIEW, 1);

const video = { source: "video.mp4", ready: 4, paused: false, error: null, visible: true, currentTime: 1 };
const sample = (scrollY, sectionId, progress, sceneLayers, visibleMedia) => ({
  ms: scrollY, scrollY, sectionId, section: sectionId, progress,
  heightVh: 230, sticky: "sticky", headingVisible: true, imagesBroken: 0,
  videos: [video], sceneLayers, visibleMedia,
});
const motionContract = {
  id: "motion-fixture", version: "1", sourceOfTruth: ["master.drawio"],
  desktopMinWidth: 1024, minimumCoveragePercent: 70,
  stages: [
    { id: "futuro", label: "Futuro", source: "master#future_21",
      desktopVh: { min: 210, preferred: 230, max: 240 },
      stickyDesktop: true,
      sceneWindows: [{ from: 48, to: 70, scene: "03", title: "Ciência", mediaMustInclude: "SCIENCE-VIDEO" }],
      humanReview: ["Correct crop"],
    },
  ],
  extraHumanReview: [],
};
const samples = [
  sample(0, "top", 0, "", []),
  sample(250, "futuro", 51, "03:1.00", ["SCIENCE-POSTER.webp"]),
  sample(500, "futuro", 58, "03:1.00", ["SCIENCE-POSTER.webp"]),
  sample(750, "futuro", 63, "03:1.00", ["SCIENCE-POSTER.webp"]),
  sample(1000, "contactos", 100, "", []),
];
const motion = evaluateMotionQa(samples, motionContract, 1440, 1000);
assert.equal(motion.coveragePercent, 100);
assert.equal(motion.checks.find((c) => c.category === "scene")?.status, "PASS", "scene 03 itself is active");
assert.equal(motion.checks.find((c) => c.category === "media" && c.expected.includes("SCIENCE-VIDEO"))?.status,
  "FAIL", "poster-only implementation must not pass a required video contract");
assert.equal(motion.checks.find((c) => c.category === "editorial")?.status, "REVIEW");

// Science requires real playback, not just an MP4 filename in the DOM.
const sciencePlaybackContract = {
  ...motionContract,
  stages: [{
    ...motionContract.stages[0],
    sceneWindows: [{ ...motionContract.stages[0].sceneWindows[0], playbackRequired: true }],
  }],
};
const playingScience = samples.map((frame, index) => frame.sectionId === "futuro"
  ? {
      ...frame,
      visibleMedia: ["SCIENCE-VIDEO.mp4"],
      videos: [{
        source: "SCIENCE-VIDEO.mp4", ready: 4, paused: false,
        error: null, visible: true, currentTime: index * 0.4,
      }],
    }
  : frame
);
const playingScienceAudit = evaluateMotionQa(playingScience, sciencePlaybackContract, 1440, 1000);
assert.equal(
  playingScienceAudit.checks.find((check) => check.category === "playback")?.status, "PASS",
  "Science must demonstrate moving video frames to pass playback"
);
const stalledScience = playingScience.map((frame) => frame.sectionId === "futuro"
  ? { ...frame, videos: frame.videos.map((entry) => ({ ...entry, currentTime: 0, paused: true })) }
  : frame
);
assert.equal(
  evaluateMotionQa(stalledScience, sciencePlaybackContract, 1440, 1000)
    .checks.find((check) => check.category === "playback")?.status, "REVIEW",
  "a visible but paused video must not be counted as confirmed playback"
);

const temporaryHeader = {
  ruleId: "official-header", matches: 0, texts: [], assets: [],
  foundOrder: [], unavailable: true,
  unavailableReason: "Header intentionally unmounted during Intro",
};
const activeHeader = {
  ruleId: "official-header", matches: 1, texts: [],
  assets: ["/media/COLUS-BRAND-LOGO-RASTER-001.jpg"], foundOrder: [],
};
const headerRule = {
  id: "header-fixture", version: "1", sources: ["master.drawio"],
  rules: [{ ...base, id: "official-header", type: "asset",
    selector: "header img", observeWhenSelector: "header",
    expectedAsset: "COLUS-BRAND-LOGO-RASTER-001.jpg" }],
};
assert.equal(evaluateDesignFidelity(headerRule, [temporaryHeader], "desktop").results[0].status,
  "NOT_OBSERVED", "unmounted header during Intro must never be called missing");
const merged = mergeDesignEvidence([[temporaryHeader], [activeHeader]]);
assert.equal(merged[0].unavailable, undefined);
assert.equal(merged[0].matches, 1);
assert.equal(evaluateDesignFidelity(headerRule, merged, "desktop").results[0].status,
  "MATCH", "once the real header appears the logo passes");
const missingHeaderImage = {
  ruleId: "official-header", matches: 0, texts: [], assets: [], foundOrder: [],
};
assert.equal(evaluateDesignFidelity(headerRule, [missingHeaderImage], "desktop").results[0].status,
  "MISSING", "a header with no approved logo is a true failure");
assert.equal(mergeDesignEvidence([
  [{ ruleId: "f", matches: 1, texts: ["TIC"], assets: [], foundOrder: [] }],
  [{ ruleId: "f", matches: 1, texts: ["Ciência"], assets: [], foundOrder: [] }],
])[0].texts.length, 2, "dynamic scene texts are captured across the scroll");


// Scroll Budget V0.1 explicitly defines rhythm guidance, not hard CSS limits.
// Hero + Manifesto are a single group and must not be counted twice.
const rhythmContract = {
  id: "rhythm", version: "1.1", sourceOfTruth: ["budget"],
  desktopMinWidth: 1024, minimumCoveragePercent: 70,
  globalBudgetVh: {
    min: 1300, preferredMin: 1400, preferredMax: 1500, max: 1580, source: "budget §2",
  },
  combinedBudgets: [{
    label: "Hero + Manifesto", stageIds: ["hero", "o-colegio"],
    min: 150, preferred: 170, max: 180, source: "budget §3",
  }],
  stages: [{ id: "hero", label: "Hero", source: "budget" },
    { id: "o-colegio", label: "Manifesto", source: "budget" },
    { id: "experiencia", label: "Aprender", source: "budget",
      desktopVh: { min: 170, preferred: 185, max: 195 } }],
  extraHumanReview: [],
};
const rhythmFrames = [
  sample(0, "hero", 0, "", []),
  sample(300, "o-colegio", 35, "", []),
  { ...sample(650, "experiencia", 50, "", []), heightVh: 225 },
  sample(1000, "contactos", 90, "", []),
];
const rhythm = evaluateMotionQa(rhythmFrames, rhythmContract, 1440, 1000, 1810);
const budgetResults = rhythm.checks.filter((check) => check.category === "budget");
assert.equal(budgetResults.length, 3, "global, combined and individual budget must be checked once");
assert.equal(budgetResults.every((check) => check.status === "REVIEW"), true,
  "oversized editorial stages require rhythm review, never a false hard FAIL");
assert.equal(rhythm.totals.FAIL, 0, "out-of-range rhythm must not count as a technical error");
assert.equal(rhythm.globalMeasuredVh, 1810, "real <main> minus footer is reported");

const checkpointFixture = compileVisualCheckpoints([{
  stageId: "futuro", title: "Futuro", source: "master#future_21",
  expected: "4 scenes", review: ["Check media and nodes"],
  percentages: [100, 50, 0, 50],
}]);
assert.equal(checkpointFixture.map((x) => x.progress).join(","), "0,50,100",
  "checkpoints are sorted and deduplicated");
assert.equal(checkpointFixture[1].baselineStatus, "PENDING_APPROVED_REFERENCE",
  "a planned state must not claim a validated visual baseline");
assert.equal(checkpointScrollY(1000, 2000, 1000, 50, 5000), 1500);
assert.equal(checkpointScrollY(500, 400, 800, 50, 5000), 300,
  "natural flow shorter than viewport must target the centre");
assert.throws(() => compileVisualCheckpoints([{
  stageId: "bad", title: "bad", source: "master", expected: "none",
  review: [], percentages: [-1],
}]), /Invalid checkpoint progress/);


const summaryFixture = compactQaSummary(actual, motion, 1000);
assert.ok(summaryFixture.includes("DESIGN:"), "summary includes the design totals");
assert.ok(summaryFixture.includes("MOTION:"), "summary includes motion totals");
assert.ok(summaryFixture.includes("FOOTER") || summaryFixture.includes("footer-logo"),
  "summary includes actionable design deviations");
assert.ok(summaryFixture.includes("FAIL"), "summary includes technical media failures");
assert.ok(summaryFixture.length <= 1000, "short summary must be safe to paste inline");
const crowded = {
  ...motion,
  checks: Array.from({ length: 60 }, (_, index) => ({
    key: "i" + index, section: "Very Long Scroll Chapter " + index,
    category: "media", status: "FAIL", expected: "Expected video",
    observed: "No active video, poster present" + "x".repeat(200),
    source: "master", nextStep: "check",
  })),
};
const bounded = compactQaSummary(actual, crowded, 700);
assert.ok(bounded.length <= 700, "summary hard limit respected");
assert.ok(bounded.includes("omitida"), "truncation is disclosed");

// Canonical footer architecture: the P0 nav count closes without changing Hero.
const footerSource = readFileSync(path.resolve(process.cwd(), "src/components/landing/ContactFooter.tsx"), "utf8");
for (const label of ["PLATFORM", "SOLUTIONS", "SUPPORT", "COMPANY"]) {
  assert.ok(footerSource.includes('title: "' + label + '"'), "official footer column present: " + label);
}
assert.ok(footerSource.includes("footerGroups.map"), "all 4 footer groups render nav elements");
assert.ok(footerSource.includes("Integrated school management for stronger institutions."),
  "official EduCore footer tagline must not be replaced");
assert.ok(footerSource.includes("A RIGHTWARE Product"),
  "RIGHTWARE product attribution must remain visible");
assert.ok(footerSource.includes('src="/media/educore/footer/educore-logo-dark.svg"'),
  "the EduCore graphical lockup must be rendered from the archived original");
assert.ok(footerSource.includes('src="/media/educore/footer/rightware-product-dark.svg"'),
  "the RIGHTWARE graphical lockup must be rendered from the archived original");
assert.ok(footerSource.includes("© 2026 Colégio Universo dos Sonhos. Todos os direitos reservados."),
  "the copyright belongs to the school, not the technology supplier");
assert.ok(footerSource.includes("Powered by EduCore · A RIGHTWARE Product"),
  "EduCore and RIGHTWARE must only receive the approved technology attribution");
assert.ok(!footerSource.includes("© 2026 RIGHTWARE"),
  "never replace the institutional copyright with the provider");

// Browser branding must use the protected official COLUS symbol, never a generic icon.
const indexHtml = readFileSync(path.resolve(process.cwd(), "index.html"), "utf8");
const colusFavicon = readFileSync(path.resolve(process.cwd(), "public/favicon-colus.svg"), "utf8");
assert.ok(indexHtml.includes('href="/favicon-colus.svg?v=1"'), "COLUS favicon linked in HTML head");
assert.ok(indexHtml.includes('type="image/svg+xml"'), "favicon has explicit SVG MIME type");
assert.ok(colusFavicon.includes("COLUS — Colégio Universo dos Sonhos"), "official COLUS identity label");
assert.ok(colusFavicon.includes('viewBox="186 64 434 482"'),
  "favicon uses the same official symbol crop as ColusOfficialSymbol");
assert.ok(colusFavicon.includes("data:image/jpeg;base64,/9j/"),
  "favicon embeds the original approved JPG, with no network dependency or redrawn icon");

// Protect the Science scene and the easily discoverable development QA launcher.
const futureSource = readFileSync(path.resolve(process.cwd(), "src/components/landing/FuturoSection.tsx"), "utf8");
const qaSource = readFileSync(path.resolve(process.cwd(), "src/components/landing/LandingMotionQA.tsx"), "utf8");
assert.ok(futureSource.includes('kind="video"') &&
  futureSource.includes("COLUS-FUTURO-CIENCIA-VID-001.mp4"), "Science must render the actual approved MP4");
assert.ok(futureSource.includes("COLUS-FUTURO-CIENCIA-001.webp"), "Science retains the approved fallback poster");
assert.ok(futureSource.includes("[&_video]:rotate-180"), "Science video orientation uses corrected 180deg rotation, excluding poster");
assert.ok(!futureSource.includes("[&_video]:scale-[1.4]"), "do not overzoom Science video after 180deg correction");
assert.ok(qaSource.includes('href="/?motionQA=1#top"'), "QA is discoverable without a query on localhost");
assert.ok(qaSource.includes("import.meta.env.DEV"), "QA launcher must not be exposed publicly");

console.log("RIGHTWARE Design & Motion QA: comparadores e observações condicionais verificados.");

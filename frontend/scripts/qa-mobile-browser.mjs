/**
 * COLUS mobile ring smoke test. Runs only in browser QA CI; needs Playwright Chromium
 * and a Vite preview running on http://127.0.0.1:4173.
 *
 * Captures the real production build, checks filled orbit dimensions,
 * scroll-linked pointers, prefers-reduced-motion and uncaught page errors.
 * Screenshots are QA evidence, not automatically approved design baselines.
 */
import assert from "node:assert/strict";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { PNG } from "pngjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "qa-artifacts", "mobile-rings");
mkdirSync(output, { recursive: true });
const base = process.env.COLUS_PREVIEW_URL ?? "http://127.0.0.1:4173/";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const errors = [];
const results = [];
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// The previous Manifesto screenshot showed dark ink at the centre of its
// otherwise paper-coloured top edge: a seam between two rounded page leaves.
// Sample the same screenshot framing to prevent that specific regression.
// Test only after bringing the Manifesto photo ring into view and only in
// non-reduced-motion mode. Screenshot positions are intentionally fixed.
// The approved mobile bridge is a shallow DOUBLE CURVE of Warm Paper, not
// two giant tall petal silhouettes. Capture an intermediate scroll state and
// compare the paper entry height at the left edge and at the centre.
async function captureManifestoBridge(page, width) {
  const curve = page.locator("[data-colus-manifesto-curve]");
  assert.equal(await curve.count(), 1, "Manifesto mobile must use a single connected book curve");
  await page.evaluate(() => {
    const section = document.querySelector("#o-colegio")?.closest("section");
    if (!section) throw new Error("Manifesto section not found");
    const rect = section.getBoundingClientRect();
    const start = rect.top + window.scrollY;
    const progress = 0.18;
    const target = start + (window.innerHeight + rect.height) * progress - window.innerHeight;
    window.scrollTo({ top: target, behavior: "instant" });
  });
  await wait(600);
  const screenshot = path.join(output, "manifesto-bridge-" + width + ".png");
  await page.screenshot({ path: screenshot });
  const png = PNG.sync.read(readFileSync(screenshot));
  const paper = [255, 248, 239];
  function firstPaperRow(x) {
    for (let y = Math.round(png.height * 0.47); y < png.height - 65; y++) {
      const i = (y * png.width + x) * 4;
      if (paper.every((v, j) => Math.abs(v - png.data[i + j]) <= 18)) return y;
    }
    return -1;
  }
  const outer = firstPaperRow(7);
  const centre = firstPaperRow(Math.floor(width / 2));
  assert.ok(outer > 0 && centre > 0,
    "Mobile paper curve must visibly enter from below during Hero handoff");
  assert.ok(centre >= outer - 7 && centre - outer <= 80,
    "Open Book curve must be shallow and connected, not a giant heart/petal gap: " +
    JSON.stringify({ outer, centre, width }));
  return { width, outer, centre, shallowCurve: true };
}

function assertManifestoSpineSealed(filePath, width) {
  const png = PNG.sync.read(readFileSync(filePath));
  assert.equal(png.width, width, "Unexpected mobile capture width");
  for (const y of [15, 30, 45]) {
    const x = Math.floor(width / 2);
    const index = (y * png.width + x) * 4;
    const pixel = [...png.data.subarray(index, index + 3)];
    const paper = [255, 248, 239];
    assert.ok(pixel.every((channel, i) => Math.abs(channel - paper[i]) <= 18),
      "Manifesto top-centre page seam must be paper, got " + pixel.join(",") +
      " at " + width + "x" + png.height + ", y=" + y);
  }
}


try {
  const page = await browser.newPage({
    viewport: { width: 440, height: 956 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    reducedMotion: "no-preference",
  });
  page.on("pageerror", (error) => errors.push(String(error.message)));
  await page.goto(base, { waitUntil: "networkidle", timeout: 45000 });
  await page.locator("#o-colegio").waitFor({ state: "attached" });
  results.push({ case: "manifesto-book-curve-440", ...await captureManifestoBridge(page, 440) });
  const cases = [
    { id: "manifesto", scope: "#o-colegio" },
    { id: "vozes", scope: "#vozes-colus" },
  ];
  for (const item of cases) {
    const photo = page.locator(item.scope + ' [data-colus-orbit-node="photo"]');
    const rail = page.locator(item.scope + ' [data-colus-orbit-node="compact"]');
    assert.equal(await photo.count(), 1, item.id + " must expose its filled photo ring");
    assert.equal(await rail.count(), 1, item.id + " must expose its filled timeline node");

    await photo.scrollIntoViewIfNeeded();
    await wait(450);
    const before = await photo.locator("[data-colus-orbit-pointer]").evaluate(
      (el) => window.getComputedStyle(el).transform,
    );
    const dimensions = await photo.boundingBox();
    assert.ok(dimensions && dimensions.width >= 68 && dimensions.height >= 68,
      item.id + " photo ring must be a visible, filled editorial device");
    const computed = await photo.evaluate((el) => ({
      background: window.getComputedStyle(el).backgroundColor,
      border: window.getComputedStyle(el).borderTopWidth,
    }));
    assert.notEqual(computed.background, "rgba(0, 0, 0, 0)", "ring must have a solid face");
    await page.screenshot({ path: path.join(output, item.id + "-440-before.png") });
    if (item.id === "manifesto") {
      assertManifestoSpineSealed(path.join(output, item.id + "-440-before.png"), 440);
      results.push({ case: "manifesto-spine-440", sealed: true });
    }

    await page.evaluate(() => window.scrollBy({ top: 270, behavior: "instant" }));
    await wait(900);
    const after = await photo.locator("[data-colus-orbit-pointer]").evaluate(
      (el) => window.getComputedStyle(el).transform,
    );
    assert.notEqual(before, after, item.id + " pointers must respond to scroll");
    await page.screenshot({ path: path.join(output, item.id + "-440-after.png") });
    results.push({ case: item.id, photoSize: Math.round(dimensions.width), pointerMoved: true });
  }

  // Load with reduced motion already enabled: do not depend on a runtime
  // matchMedia toggle being observed by every animation library.
  const reducedPage = await browser.newPage({
    viewport: { width: 440, height: 956 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  reducedPage.on("pageerror", (error) => errors.push(String(error.message)));
  await reducedPage.goto(base, { waitUntil: "networkidle", timeout: 45000 });
  const reduced = reducedPage.locator('#o-colegio [data-colus-orbit-node="photo"] [data-colus-orbit-pointer]');
  await reduced.scrollIntoViewIfNeeded();
  await wait(400);
  const reducedBefore = await reduced.evaluate((el) => window.getComputedStyle(el).transform);
  await reducedPage.evaluate(() => window.scrollBy({ top: 270, behavior: "instant" }));
  await wait(500);
  const reducedAfter = await reduced.evaluate((el) => window.getComputedStyle(el).transform);
  assert.equal(reducedBefore, reducedAfter,
    "reduced-motion orbit must remain static while scrolling");
  results.push({ case: "reduced-motion", pointerStatic: true });
  // Smaller mobile viewport: verify both filled photo-rings also retain
  // their size and position without relying solely on the 440px emulation.
  const narrowPage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    reducedMotion: "no-preference",
  });
  narrowPage.on("pageerror", (error) => errors.push(String(error.message)));
  await narrowPage.goto(base, { waitUntil: "networkidle", timeout: 45000 });
  results.push({ case: "manifesto-book-curve-390", ...await captureManifestoBridge(narrowPage, 390) });
  for (const item of cases) {
    const photo = narrowPage.locator(item.scope + ' [data-colus-orbit-node="photo"]');
    await photo.scrollIntoViewIfNeeded();
    await wait(400);
    const rect = await photo.boundingBox();
    assert.ok(rect && rect.width >= 68 && rect.height >= 68,
      item.id + " filled ring must remain full-size at 390x844");
    await narrowPage.screenshot({
      path: path.join(output, item.id + "-390.png"),
    });
    if (item.id === "manifesto") {
      assertManifestoSpineSealed(path.join(output, item.id + "-390.png"), 390);
      results.push({ case: "manifesto-spine-390", sealed: true });
    }
    results.push({ case: item.id + "-narrow", photoSize: Math.round(rect.width) });
  }
  assert.equal(errors.length, 0, "Uncaught browser page errors: " + errors.join(" | "));
  writeFileSync(path.join(output, "results.json"),
    JSON.stringify({ viewports: ["440x956", "390x844"], checks: results, errors }, null, 2));
  console.log("COLUS mobile browser QA passed:", JSON.stringify(results));
} catch (error) {
  writeFileSync(path.join(output, "results.json"),
    JSON.stringify({ viewport: "440x956", checks: results, errors, failure: String(error) }, null, 2));
  throw error;
} finally {
  await browser.close();
}

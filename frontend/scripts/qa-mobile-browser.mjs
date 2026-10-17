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
// The OWNER clarified the HEART was deliberate. The two lobes communicate
// affection, then hand off to the real classroom photo: two people holding
// green hearts. Regression is the thick centre BAR, not the heart silhouette.
// Capture its intermediate scroll state rather than only settled paper.
async function captureManifestoHeart(page, width) {
  const left = page.locator("[data-colus-manifesto-heart-left]");
  const right = page.locator("[data-colus-manifesto-heart-right]");
  const settle = page.locator("[data-colus-manifesto-paper-settle]");
  assert.equal(await left.count(), 1, "Manifesto must have one mobile left heart lobe");
  assert.equal(await right.count(), 1, "Manifesto must have one mobile right heart lobe");
  assert.equal(await settle.count(), 1, "Manifesto must settle to warm paper after the heart");
  assert.equal(await page.locator("[data-colus-manifesto-spine]").count(), 0,
    "The rejected centre bar must NEVER appear");
  await page.evaluate(() => {
    const section = document.querySelector("#o-colegio")?.closest("section");
    if (!section) throw new Error("Manifesto section not found");
    const rect = section.getBoundingClientRect();
    const start = rect.top + window.scrollY;
    const progress = 0.18;
    const target = start + (window.innerHeight + rect.height) * progress - window.innerHeight;
    window.scrollTo({ top: target, behavior: "instant" });
  });
  await wait(650);
  const state = await page.evaluate(() => {
    const lobeL = document.querySelector("[data-colus-manifesto-heart-left]");
    const lobeR = document.querySelector("[data-colus-manifesto-heart-right]");
    const paper = document.querySelector("[data-colus-manifesto-paper-settle]");
    const l = lobeL.getBoundingClientRect(), r = lobeR.getBoundingClientRect();
    return {
      lobeLeftWidth: l.width,
      lobeRightWidth: r.width,
      lobeLeftHeight: l.height,
      lobeRightHeight: r.height,
      leftRadius: getComputedStyle(lobeL).borderTopLeftRadius,
      rightRadius: getComputedStyle(lobeR).borderTopRightRadius,
      settledOpacity: parseFloat(getComputedStyle(paper).opacity),
    };
  });
  assert.ok(state.lobeLeftWidth > width * 0.45 && state.lobeRightWidth > width * 0.45,
    "The heart must read as two full-size curved lobes");
  assert.ok(state.lobeLeftHeight > 150 && state.lobeRightHeight > 150,
    "The heart lobes must visibly open with scroll");
  assert.ok(state.settledOpacity < 0.1,
    "Do not fill the negative space with a centre rectangle during the heart");
  const screenshot = path.join(output, "manifesto-heart-" + width + ".png");
  await page.screenshot({ path: screenshot });
  return { width, heartLobes: 2, noCentreBar: true, ...state };
}

function assertManifestoFinalPaper(filePath, width) {
  const png = PNG.sync.read(readFileSync(filePath));
  assert.equal(png.width, width, "Unexpected mobile capture width");
  for (const y of [15, 30, 45]) {
    const x = Math.floor(width / 2);
    const index = (y * png.width + x) * 4;
    const pixel = [...png.data.subarray(index, index + 3)];
    const paper = [255, 248, 239];
    assert.ok(pixel.every((channel, i) => Math.abs(channel - paper[i]) <= 18),
      "Manifesto settled background must become full warm paper, got " + pixel.join(",") +
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
  results.push({ case: "manifesto-heart-440", ...await captureManifestoHeart(page, 440) });
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
      assertManifestoFinalPaper(path.join(output, item.id + "-440-before.png"), 440);
      results.push({ case: "manifesto-paper-settled-440", sealed: true });
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
  results.push({ case: "manifesto-heart-390", ...await captureManifestoHeart(narrowPage, 390) });
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
      assertManifestoFinalPaper(path.join(output, item.id + "-390.png"), 390);
      results.push({ case: "manifesto-paper-settled-390", sealed: true });
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

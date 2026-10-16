/**
 * COLUS mobile ring smoke test. Runs only in browser QA CI; needs Playwright Chromium
 * and a Vite preview running on http://127.0.0.1:4173.
 *
 * Captures the real production build, checks filled orbit dimensions,
 * scroll-linked pointers, prefers-reduced-motion and uncaught page errors.
 * Screenshots are QA evidence, not automatically approved design baselines.
 */
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "qa-artifacts", "mobile-rings");
mkdirSync(output, { recursive: true });
const base = process.env.COLUS_PREVIEW_URL ?? "http://127.0.0.1:4173/";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const errors = [];
const results = [];
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

    await page.evaluate(() => window.scrollBy({ top: 270, behavior: "instant" }));
    await wait(900);
    const after = await photo.locator("[data-colus-orbit-pointer]").evaluate(
      (el) => window.getComputedStyle(el).transform,
    );
    assert.notEqual(before, after, item.id + " pointers must respond to scroll");
    await page.screenshot({ path: path.join(output, item.id + "-440-after.png") });
    results.push({ case: item.id, photoSize: Math.round(dimensions.width), pointerMoved: true });
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await wait(400);
  const reduced = page.locator('#o-colegio [data-colus-orbit-pointer]');
  await reduced.scrollIntoViewIfNeeded();
  const reducedBefore = await reduced.evaluate((el) => window.getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollBy({ top: 270, behavior: "instant" }));
  await wait(500);
  const reducedAfter = await reduced.evaluate((el) => window.getComputedStyle(el).transform);
  assert.equal(reducedBefore, reducedAfter,
    "reduced-motion orbit must remain static while scrolling");
  results.push({ case: "reduced-motion", pointerStatic: true });
  assert.equal(errors.length, 0, "Uncaught browser page errors: " + errors.join(" | "));
  writeFileSync(path.join(output, "results.json"),
    JSON.stringify({ viewport: "440x956", checks: results, errors }, null, 2));
  console.log("COLUS mobile browser QA passed:", JSON.stringify(results));
} catch (error) {
  writeFileSync(path.join(output, "results.json"),
    JSON.stringify({ viewport: "440x956", checks: results, errors, failure: String(error) }, null, 2));
  throw error;
} finally {
  await browser.close();
}

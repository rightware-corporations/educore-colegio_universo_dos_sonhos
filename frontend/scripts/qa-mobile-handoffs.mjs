/**
 * COLUS mobile PATH/NODE browser smoke — Master Draw.io V0.18.
 * Native scroll only. Checks each device node follows section progress,
 * screenshots representative handoffs, layout containment and reduced motion.
 * Not a substitute for owner's motion/design approval in Microsoft Edge.
 */
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "qa-artifacts", "mobile-handoffs");
mkdirSync(output, { recursive: true });
const base = process.env.COLUS_PREVIEW_URL ?? "http://127.0.0.1:4173/";
const cases = [
  { selector: "#experiencia", device: "trail" },
  { selector: "#futuro", device: "signal" },
  { selector: "#vida-colus", device: "marker" },
  { selector: "#comunidade", device: "ring" },
  { selector: "#transformar", device: "axis" },
];
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const checks = [];
const errors = [];

try {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    reducedMotion: "no-preference",
  });
  page.on("pageerror", (error) => errors.push(String(error.message)));
  await page.goto(base, { waitUntil: "networkidle", timeout: 45000 });

  for (const scene of cases) {
    const host = page.locator(scene.selector + ' [data-colus-mobile-path="' + scene.device + '"]');
    const dot = host.locator("[data-colus-mobile-active-node]");
    assert.equal(await host.count(), 1, scene.device + " requires exactly one scroll path");
    assert.equal(await dot.count(), 1, scene.device + " requires exactly one active node");

    // Begin after first ~10% of the section; 360px further should visibly
    // advance the node even on short scenes.
    const top = await page.locator(scene.selector).evaluate(
      (el) => el.getBoundingClientRect().top + window.scrollY,
    );
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), top + 125);
    await pause(950);
    const a = await dot.evaluate((el) => ({
      x: parseFloat(window.getComputedStyle(el).left),
      y: parseFloat(window.getComputedStyle(el).top),
    }));
    await page.screenshot({ path: path.join(output, scene.device + "-before.png") });

    await page.evaluate(() => window.scrollBy({ top: 360, behavior: "instant" }));
    await pause(950);
    const b = await dot.evaluate((el) => ({
      x: parseFloat(window.getComputedStyle(el).left),
      y: parseFloat(window.getComputedStyle(el).top),
    }));
    await page.screenshot({ path: path.join(output, scene.device + "-after.png") });
    assert.ok(Number.isFinite(a.y) && Number.isFinite(b.y) && b.y > a.y + 10,
      scene.device + " node must move forward along scroll (was " + a.y + ", now " + b.y + ")");

    const pageWidth = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      width: window.innerWidth,
    }));
    assert.ok(pageWidth.scroll <= pageWidth.width + 2,
      scene.device + " must not introduce horizontal overflow: " + JSON.stringify(pageWidth));
    checks.push({ device: scene.device, before: a, after: b, nodeAdvanced: true, horizontalOverflow: false });
  }

  const staticPage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  staticPage.on("pageerror", (error) => errors.push(String(error.message)));
  await staticPage.goto(base, { waitUntil: "networkidle", timeout: 45000 });
  for (const scene of cases) {
    const host = staticPage.locator(scene.selector + ' [data-colus-mobile-path="' + scene.device + '"]');
    assert.equal(await host.locator("[data-colus-mobile-active-node]").count(), 0,
      scene.device + " should not mount animated node when motion is reduced");
    assert.ok(await host.locator("svg path").count() >= 2,
      scene.device + " must preserve a visible static path");
  }
  assert.deepEqual(errors, [], "Uncaught browser errors");
  checks.push({ reducedMotion: "all five static", errors: 0 });
  writeFileSync(path.join(output, "results.json"), JSON.stringify({ viewport: "390x844", checks, errors }, null, 2));
  console.log("COLUS PATH/NODE handoffs QA PASS:", JSON.stringify(checks));
} catch (error) {
  writeFileSync(path.join(output, "results.json"), JSON.stringify({ viewport: "390x844", checks, errors, failure: String(error) }, null, 2));
  throw error;
} finally {
  await browser.close();
}

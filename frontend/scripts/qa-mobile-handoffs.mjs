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

  // Section-to-section alignment: the media masks may be asymmetric,
  // but the underlying narrative wrapper and PATH must meet with no
  // tablet-only outer margin or white gap. Do not compare image corners.
  const pairs = [
    ["experiencia", "futuro"],
    ["futuro", "vida-colus"],
    ["vida-colus", "comunidade"],
    ["comunidade", "transformar"],
  ];
  const seamViewports = [
    { width: 390, height: 844 },
    { width: 440, height: 956 },
    { width: 768, height: 1024 },
  ];
  for (const viewport of seamViewports) {
    const seamPage = await browser.newPage({
      viewport,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      reducedMotion: "no-preference",
    });
    seamPage.on("pageerror", (error) => errors.push(String(error.message)));
    await seamPage.goto(base, { waitUntil: "networkidle", timeout: 45000 });
    for (const [from, to] of pairs) {
      const seam = await seamPage.evaluate(([fromId, toId]) => {
        const fromEl = document.querySelector("#" + fromId + " [data-colus-mobile-story]");
        const toEl = document.querySelector("#" + toId + " [data-colus-mobile-story]");
        if (!fromEl || !toEl) return null;
        const a = fromEl.getBoundingClientRect();
        const b = toEl.getBoundingClientRect();
        const fromPath = fromEl.querySelector("[data-colus-mobile-path]");
        const toPath = toEl.querySelector("[data-colus-mobile-path]");
        if (!fromPath || !toPath) return null;
        const aPath = fromPath.getBoundingClientRect();
        const bPath = toPath.getBoundingClientRect();
        return {
          gap: b.top - a.bottom,
          leftShift: Math.abs(a.left - b.left),
          widthShift: Math.abs(a.width - b.width),
          pathShift: Math.abs(aPath.left - bPath.left),
          boundaryY: (a.bottom + b.top) / 2 + window.scrollY,
        };
      }, [from, to]);
      assert.ok(seam, from + " → " + to + " must have two mounted narrative wrappers");
      assert.ok(Math.abs(seam.gap) <= 2,
        from + " → " + to + " has disconnected outer margins: " + JSON.stringify(seam));
      assert.ok(seam.leftShift <= 2 && seam.widthShift <= 2 && seam.pathShift <= 2,
        from + " → " + to + " breaks the continuous mobile PATH axis: " + JSON.stringify(seam));
      await seamPage.evaluate((top) => window.scrollTo({ top, behavior: "instant" }),
        seam.boundaryY - viewport.height / 2);
      await pause(350);
      await seamPage.screenshot({
        path: path.join(output, from + "-to-" + to + "-" + viewport.width + ".png"),
      });
      checks.push({ boundary: from + "->" + to, viewport: viewport.width, connected: true });
    }
    await seamPage.close();
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

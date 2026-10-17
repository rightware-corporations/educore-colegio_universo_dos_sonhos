/**
 * Desktop Master V0.18 — ring/node smoke on a production Chromium preview.
 * Validates that active nodes are filled, round and scroll-linked while paths
 * remain path-led (including the deliberately OPEN Community Ring).
 * Screenshots provide review evidence, not automatic high-fidelity approval.
 */
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const folder = path.join(root, "qa-artifacts", "desktop-rings");
mkdirSync(folder, { recursive: true });
const base = process.env.COLUS_PREVIEW_URL ?? "http://127.0.0.1:4173/";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const results = [];
const errors = [];
const stages = [
  { id: "experiencia", kind: "Learning Trail" },
  { id: "futuro", kind: "Signal Field" },
  { id: "comunidade", kind: "Community Ring" },
  { id: "transformar", kind: "Rise Axis" },
];

try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 1024, height: 768 }]) {
    const page = await browser.newPage({ viewport, reducedMotion: "no-preference" });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(base, { waitUntil: "networkidle", timeout: 45000 });
    for (const stage of stages) {
      const host = page.locator("#" + stage.id);
      const node = host.locator('[data-colus-desktop-orbit-node="orange"], [data-colus-desktop-orbit-node="blue"]');
      assert.equal(await node.count(), 1, stage.kind + " must have ONE active desktop orbit node");
      const target = await host.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return { top: window.scrollY + rect.top, distance: Math.max(0, rect.height - window.innerHeight) };
      });
      const readState = async (fraction) => {
        await page.evaluate((pos) => window.scrollTo({ top: pos, behavior: "instant" }),
          target.top + target.distance * fraction);
        await pause(750);
        return await node.evaluate((el) => {
          const box = el.getBoundingClientRect();
          const pointer = el.querySelector("[data-colus-desktop-orbit-pointers]");
          const outer = el.querySelector("circle");
          return {
            x: box.x + box.width / 2,
            y: box.y + box.height / 2,
            width: box.width,
            height: box.height,
            fill: outer?.getAttribute("fill") || "",
            pointers: pointer?.querySelectorAll("circle").length ?? 0,
          };
        });
      };
      const before = await readState(0.16);
      await page.screenshot({ path: path.join(folder, stage.id + "-" + viewport.width + "-before.png") });
      const after = await readState(0.7);
      await page.screenshot({ path: path.join(folder, stage.id + "-" + viewport.width + "-after.png") });
      assert.ok(before.width > 18 && before.height > 18, stage.kind + " has no substantial filled node");
      assert.ok(Math.abs(before.width - before.height) <= 3,
        stage.kind + " must stay circular, not stretched into an ellipse");
      assert.equal(before.fill, "#071A2A", stage.kind + " must have a filled face");
      assert.equal(before.pointers, 2, stage.kind + " must expose two active pointers");
      assert.ok(Math.hypot(after.x - before.x, after.y - before.y) > 8,
        stage.kind + " node must follow scroll-linked path");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      assert.ok(overflow <= 3, stage.kind + " caused horizontal overflow: " + overflow);
      results.push({ viewport: viewport.width, stage: stage.kind, filled: true, round: true, scrollLinked: true });
    }

    // Regression from the owner's desktop Edge captures: the Signal Field
    // crossed BOTH Futuro heading and copy. Sample actual SVG path geometry
    // in viewport coordinates; media frames/copy/assets must be untouched.
    const futureMetrics = await page.evaluate(() => {
      const section = document.querySelector("#futuro");
      const path = section?.querySelector("[data-colus-desktop-signal-path]");
      if (!section || !path) return null;
      const title = [...section.querySelectorAll("h2")].find(el => el.getBoundingClientRect().width > 0);
      const description = title?.nextElementSibling;
      const ctm = path.getScreenCTM();
      if (!title || !description || !ctm) return null;
      const forbidden = [title.getBoundingClientRect(), description.getBoundingClientRect()];
      let intersectsText = 0;
      const n = 150;
      for (let i = 0; i <= n; i++) {
        const point = path.getPointAtLength(path.getTotalLength() * i / n);
        const px = ctm.a * point.x + ctm.c * point.y + ctm.e;
        const py = ctm.b * point.x + ctm.d * point.y + ctm.f;
        if (forbidden.some(r => px >= r.left - 10 && px <= r.right + 10 &&
          py >= r.top - 10 && py <= r.bottom + 10)) intersectsText++;
      }
      return { intersectsText, pointSamples: n + 1 };
    });
    assert.ok(futureMetrics && futureMetrics.intersectsText === 0,
      "Desktop Signal Field must not cross Futuro title/copy: " + JSON.stringify(futureMetrics));
    results.push({ viewport: viewport.width, signalAvoidsCopy: true });

    // Learning Trail runs behind photo windows so active SVG nodes do not
    // stamp faces. The existing image dimensions and masks are protected.
    const trail = page.locator("#experiencia [data-colus-desktop-learning-trail]");
    assert.equal(await trail.count(), 1, "Learning Trail must exist for desktop");
    assert.equal(await trail.evaluate(el => getComputedStyle(el).zIndex), "0",
      "Learning Trail must be behind photo media, not painted over faces");

    // In Manifesto the active photo orbit belongs ON the ellipse boundary,
    // not over the people in the photograph.
    const orbitMetrics = await page.evaluate(() => {
      const ellipse = document.querySelector("[data-colus-desktop-photo-orbit]");
      const node = ellipse?.querySelector('[data-colus-orbit-node="compact"]');
      if (!ellipse || !node) return null;
      const e = ellipse.getBoundingClientRect(), n = node.getBoundingClientRect();
      const dx = (n.left + n.width / 2 - e.left - e.width / 2) / (e.width / 2);
      const dy = (n.top + n.height / 2 - e.top - e.height / 2) / (e.height / 2);
      return { radius: Math.hypot(dx, dy) };
    });
    assert.ok(orbitMetrics && orbitMetrics.radius >= .68 && orbitMetrics.radius <= 1.18,
      "Manifesto active node must follow photo ellipse: " + JSON.stringify(orbitMetrics));
    results.push({ viewport: viewport.width, manifestoOrbitOnEllipse: true, trailBehindMedia: true });

    // Master demands a COMMUNITY RING which remains incomplete, rather than
    // turning the entire blue SVG into a disk. The active pointer is filled.
    const community = page.locator("#comunidade");
    assert.equal(await community.locator("svg path[fill='none']").count() >= 4, true,
      "Desktop Community Ring must retain multiple open paths");

    // Non-signature scenes use the compact orbit instead of extra active
    // competing devices; they preserve editorial copy and original media.
    for (const [section, expected] of [["#o-colegio", 2], ["#vida-colus", 1], ["#vozes-colus", 2]]) {
      const selector = section === "#o-colegio"
        ? page.locator(section).locator("xpath=ancestor::section[1]")
        : page.locator(section);
      const orbit = selector.locator('[data-colus-orbit-node="compact"]:visible');
      assert.equal(await orbit.count(), expected,
        section + " must show " + expected + " desktop editorial orbit(s)");
    }
    // No distorted Horizon ring inside the scaled line.
    const horizon = page.locator("#transformar [data-colus-orbit-node='compact']:visible");
    assert.equal(await horizon.count(), 1, "Desktop Horizon node must be present");
    await page.locator("#transformar").scrollIntoViewIfNeeded();
    const rect = await horizon.boundingBox();
    assert.ok(rect && Math.abs(rect.width - rect.height) <= 2,
      "Horizon node must not inherit the line's scaleX transformation");
    results.push({ viewport: viewport.width, communityPathOpen: true, editorialNodesPresent: true });
    await page.close();
  }
  assert.deepEqual(errors, [], "Unexpected browser runtime errors");
  writeFileSync(path.join(folder, "results.json"), JSON.stringify({ checks: results, errors }, null, 2));
  console.log("COLUS desktop orbit QA PASS:", JSON.stringify(results));
} catch (error) {
  writeFileSync(path.join(folder, "results.json"), JSON.stringify({ checks: results, errors, failure: String(error) }, null, 2));
  throw error;
} finally {
  await browser.close();
}

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

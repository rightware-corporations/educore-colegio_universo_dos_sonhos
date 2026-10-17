/**
 * COLUS Master Plus — structural/phase-level desktop fidelity regression.
 * Tests the approved geometric RELATIONSHIPS, not only existence of active dots.
 * All photo/video sources, captions and copy are immutable.
 */
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "qa-artifacts", "desktop-master-plus");
mkdirSync(dir, { recursive: true });
const base = process.env.COLUS_PREVIEW_URL ?? "http://127.0.0.1:4173/";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const errors = [];
const results = [];
const wait = (ms) => new Promise(r => setTimeout(r, ms));

async function scrollToProgress(page, selector, fraction) {
  await page.evaluate(([selector, fraction]) => {
    const section = document.querySelector(selector);
    if (!section) throw new Error("Section missing: " + selector);
    const rect = section.getBoundingClientRect();
    const start = rect.top + window.scrollY;
    const distance = Math.max(0, rect.height - window.innerHeight);
    window.scrollTo({ top: start + distance * fraction, behavior: "instant" });
  }, [selector, fraction]);
  await wait(420);
}

try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 1024, height: 768 }]) {
    const page = await browser.newPage({ viewport, reducedMotion: "no-preference" });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(base, { waitUntil: "networkidle", timeout: 45000 });
    const stage = page.locator("#comunidade [data-colus-community-stage]");
    assert.equal(await stage.count(), 1, "One desktop community stage is required");
    assert.equal(await stage.locator("[data-colus-community-context-nodes] > span").count(), 6,
      "Master Plus demands six small contextual nodes, not three or hollow duplicates");
    assert.equal(await stage.locator("[data-colus-community-media]").count(), 3,
      "Three existing approved media windows must surround the ellipse");
    assert.equal(await stage.locator("[data-colus-community-relation]").count(), 3,
      "Three relation beats must be spatially distributed");
    assert.equal(await stage.locator("[data-colus-community-active-node]").count(), 1,
      "Only one dominant active node belongs to Community Ring");
    const ring = stage.locator("[data-colus-community-ring-path]");
    const d = await ring.getAttribute("d");
    assert.ok(d && !/[zZ]\s*$/.test(d), "Master Plus Community Ring must remain OPEN");
    assert.equal(await stage.locator("[data-colus-community-rise-handoff]").count(), 1,
      "The open arc must yield into Rise Axis via its own connecting path");

    const layout = await stage.evaluate(el => {
      const bounds = el.getBoundingClientRect();
      const rect = selector => {
        const r = el.querySelector(selector)?.getBoundingClientRect();
        return r ? {
          left: (r.left - bounds.left) / bounds.width,
          top: (r.top - bounds.top) / bounds.height,
          right: (r.right - bounds.left) / bounds.width,
          bottom: (r.bottom - bounds.top) / bounds.height,
        } : null;
      };
      const center = rect("[data-colus-community-central-copy]");
      const media = [1,2,3].map(i => rect('[data-colus-community-media="' + i + '"]'));
      const relations = [1,2,3].map(i => rect('[data-colus-community-relation="' + i + '"]'));
      const overlaps = (a,b) => a && b && a.left < b.right && a.right > b.left
        && a.top < b.bottom && a.bottom > b.top;
      return { center, media, relations, overlapsMedia: media.some(p => overlaps(center, p)),
        relationX: relations.map(p => p?.left) };
    });
    assert.ok(layout.center && layout.center.left >= 0.32 && layout.center.right <= 0.71,
      "Headline and description must be INSIDE the Master ellipse: " + JSON.stringify(layout));
    assert.ok(!layout.overlapsMedia,
      "Central text must not collide with any existing media: " + JSON.stringify(layout));
    assert.ok(layout.media[0].right < layout.center.left &&
      layout.media[1].left > layout.center.right,
      "Main photo left and participation image right must frame the central headline");
    assert.ok(layout.relationX[0] < layout.relationX[1] &&
      layout.relationX[1] < layout.relationX[2],
      "Acompanhar -> Participar -> Crescer juntos must progress across the stage");

    const phases = [
      { fraction: 0.07, phase: 1, name: "relacao" },
      { fraction: 0.25, phase: 2, name: "arco-nasce" },
      { fraction: 0.45, phase: 3, name: "comunidade" },
      { fraction: 0.67, phase: 4, name: "estabilidade" },
      { fraction: 0.91, phase: 5, name: "abertura" },
    ];
    for (const step of phases) {
      await scrollToProgress(page, "#comunidade", step.fraction);
      assert.equal(await stage.getAttribute("data-colus-community-phase"), String(step.phase),
        "Community narrative states must happen IN ORDER: " + step.name);
      await page.screenshot({ path: path.join(dir,
        "pertencer-" + viewport.width + "-" + step.phase + "-" + step.name + ".png") });
      results.push({ viewport: viewport.width, chapter: "Pertencer", state: step.name, phase: step.phase });
    }

    // FUTURO: the SAME scene-window node must survive changes of all four
    // scenes. Only media content transforms inside the fixed approved mask.
    const window = page.locator("#futuro [data-colus-desktop-scene-window]");
    assert.equal(await window.count(), 1, "Exactly one persistent desktop Scene Window");
    await window.evaluate(el => el.dataset.qaPersistentIdentity = "one-window");
    const scenes = [
      { fraction: 0.12, number: "01" },
      { fraction: 0.37, number: "02" },
      { fraction: 0.55, number: "03" },
      { fraction: 0.8, number: "04" },
    ];
    for (const scene of scenes) {
      await scrollToProgress(page, "#futuro", scene.fraction);
      assert.equal(await window.getAttribute("data-colus-scene"), scene.number,
        "Futuro must follow TIC -> ENG -> CIENCIA -> SEGURANCA sequence");
      assert.equal(await window.getAttribute("data-qa-persistent-identity"), "one-window",
        "Scene Window outer frame must not remount like a card");
      assert.equal(await window.locator("[data-colus-active-scene-media]").count(), 1,
        "One active media inside shared Scene Window");
      assert.equal(await window.locator("[data-colus-active-scene-media]").getAttribute("data-colus-active-scene-media"),
        scene.number, "Active media and caption must refer to same scene");
      const indicator = page.locator('#futuro [data-colus-desktop-scene-progress][aria-current="step"]');
      assert.equal(await indicator.count(), 1, "Exactly one progress indicator is active");
      assert.equal(await indicator.getAttribute("data-colus-desktop-scene-progress"), scene.number);
      await page.screenshot({ path: path.join(dir,
        "futuro-" + viewport.width + "-" + scene.number + ".png") });
      results.push({ viewport: viewport.width, chapter: "Futuro", scene: scene.number, oneWindow: true });
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert.ok(overflow <= 3, "Unexpected horizontal overflow: " + overflow);
    await page.close();
  }
  assert.deepEqual(errors, [], "Uncaught browser errors");
  writeFileSync(path.join(dir, "results.json"),
    JSON.stringify({ results, errors, status: "pass" }, null, 2));
  console.log("COLUS Master Plus structural browser QA PASS:", JSON.stringify(results));
} catch (error) {
  writeFileSync(path.join(dir, "results.json"),
    JSON.stringify({ results, errors, status: "fail", error: String(error) }, null, 2));
  throw error;
} finally {
  await browser.close();
}

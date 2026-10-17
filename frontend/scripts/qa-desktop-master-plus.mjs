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
    assert.equal(await ring.getAttribute("stroke-dasharray"), "4 13",
      "Master Plus ring must remain dotted, not a solid line");
    assert.equal(await ring.getAttribute("mask"), "url(#colus-community-arc-reveal)",
      "A separate animated mask must reveal the dots without replacing dasharray");
    assert.equal(await stage.locator("[data-colus-community-reveal-mask]").count(), 1,
      "A dedicated progressive reveal mask must drive the ring");
    assert.equal(await stage.locator("[data-colus-community-rise-handoff]").count(), 1,
      "The open arc must yield into Rise Axis via its own connecting path");

    const typography = await stage.evaluate(el => {
      const rect=el.getBoundingClientRect();
      const heading=el.querySelector("[data-colus-community-central-copy] h2");
      const hs=heading && getComputedStyle(heading);
      const lineHeight=hs?parseFloat(hs.lineHeight):0;
      return {
        ratio:rect.width/rect.height,
        titleLines:heading && lineHeight ? heading.getBoundingClientRect().height/lineHeight : 0,
        captionsHidden:[...el.querySelectorAll("[data-colus-community-media] > p")].every(
          label => label.classList.contains("sr-only")),
      };
    });
    assert.ok(Math.abs(typography.ratio-1720/760)<.065,
      "Desktop Community Ring stage must preserve Master panel aspect: "+JSON.stringify(typography));
    assert.ok(typography.titleLines>1.7 && typography.titleLines<2.45,
      "Master Plus central headline should render in TWO lines: "+JSON.stringify(typography));
    assert.ok(typography.captionsHidden,
      "The three relation titles must be visible ONCE (beside their description), not duplicated under photos");
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
    assert.ok(layout.center && layout.center.left >= 0.315 && layout.center.right <= 0.71,
      "Headline and description must be INSIDE the Master ellipse: " + JSON.stringify(layout));
    assert.ok(!layout.overlapsMedia,
      "Central text must not collide with any existing media: " + JSON.stringify(layout));
    assert.ok(layout.media[0].right < layout.center.left &&
      layout.media[1].left > layout.center.right,
      "Main photo left and participation image right must frame the central headline");
    assert.ok(layout.relationX[0] < layout.relationX[1] &&
      layout.relationX[1] < layout.relationX[2],
      "Acompanhar -> Participar -> Crescer juntos must progress across the stage");

    // Master chapter handoffs. Their endpoints should agree spatially,
    // not merely exist as independent scroll effects.
    const handoffs = await page.evaluate(() => {
      const trail = document.querySelector("#experiencia [data-colus-desktop-trail-path]");
      const signal = document.querySelector("#futuro [data-colus-desktop-signal-path]");
      const entry = document.querySelector("#comunidade [data-colus-community-entry-bridge]");
      const ring = document.querySelector("#comunidade [data-colus-community-ring-path]");
      const exit = document.querySelector("#comunidade [data-colus-community-rise-handoff]");
      const rise = document.querySelector("#transformar [data-colus-desktop-rise-axis]");
      const vida = document.querySelector("#vida-colus [data-colus-vida-exit-marker]");
      const stage = document.querySelector("#comunidade [data-colus-community-stage]");
      if (!trail || !signal || !entry || !ring || !exit || !rise || !vida || !stage) return null;
      const end = p => p.getPointAtLength(p.getTotalLength());
      const begin = p => p.getPointAtLength(0);
      const a = end(trail), b = begin(signal), c = end(entry), d = begin(ring),
        e = end(exit), f = begin(rise);
      const stageX = stage.getBoundingClientRect().left +
        stage.getBoundingClientRect().width * 570 / 1720;
      const vidaX = vida.getBoundingClientRect().left;
      return {
        trailToSignal: Math.hypot(a.x / 800 - b.x / 1440, a.y / 620 - b.y / 900),
        entryJoinsRing: Math.hypot(c.x - d.x, c.y - d.y),
        communityToRise: Math.abs(e.x / 1720 - f.x / 1400),
        vidaMarkerToEntry: Math.abs(vidaX - stageX) / window.innerWidth,
      };
    });
    assert.ok(handoffs &&
      handoffs.trailToSignal < 0.11 &&
      handoffs.entryJoinsRing < 2 &&
      handoffs.communityToRise < 0.03 &&
      handoffs.vidaMarkerToEntry < 0.10,
      "PATH and Story Markers must connect across chapter boundaries: " +
      JSON.stringify(handoffs));
    results.push({ viewport: viewport.width, chapter: "Chapter handoffs", ...handoffs });

    // Master-stage alignment: compositions must inhabit the sticky viewport,
    // not float at the top above hundreds of empty pixels.
    await scrollToProgress(page, "#comunidade", 0.67);
    const verticalBalance = await stage.evaluate(el => {
      const r = el.getBoundingClientRect();
      return (r.top + r.height * 0.5) / window.innerHeight;
    });
    assert.ok(verticalBalance > 0.43 && verticalBalance < 0.64,
      "Community Ring must be vertically balanced in viewport: "+verticalBalance);

    // Phase 5 handoff must start on the SAME ellipse perimeter and avoid
    // painting through the three relationship captions. This is a screen-
    // coordinate collision test, not a simple test of SVG path presence.
    await scrollToProgress(page, "#comunidade", 0.91);
    const outgoing = await stage.evaluate(el => {
      const ellipse = el.querySelector("[data-colus-community-ring-path]");
      const handoff = el.querySelector("[data-colus-community-rise-handoff]");
      const moving = el.querySelector("[data-colus-community-active-node]");
      const relations = [...el.querySelectorAll("[data-colus-community-relation]")];
      if (!ellipse || !handoff || !moving || relations.length !== 3) return null;
      const lengths = ellipse.getTotalLength(), handoffLength = handoff.getTotalLength();
      const near = ellipse.getPointAtLength(lengths * .72);
      const entrance = handoff.getPointAtLength(0);
      const point = handoff.getPointAtLength(handoffLength * .55);
      const matrix = handoff.getScreenCTM();
      if (!matrix) return null;
      const project = p => ({
        x: matrix.a*p.x + matrix.c*p.y + matrix.e,
        y: matrix.b*p.x + matrix.d*p.y + matrix.f
      });
      const ringPoint = project(point);
      const rect = moving.getBoundingClientRect();
      const nodePoint = {x:rect.left+rect.width/2,y:rect.top+rect.height/2};
      let collisions=0;
      for(let i=0;i<=100;i++){
        const p=project(handoff.getPointAtLength(handoffLength*i/100));
        if(relations.some(rel=>{
          const r=rel.getBoundingClientRect();
          return p.x>r.left+2 && p.x<r.right-2 && p.y>r.top+2 && p.y<r.bottom-2;
        })) collisions++;
      }
      return {connection:Math.hypot(near.x-entrance.x, near.y-entrance.y),
        nodeDrift:Math.hypot(ringPoint.x-nodePoint.x,ringPoint.y-nodePoint.y),
        collisions};
    });
    assert.ok(outgoing && outgoing.connection < 7,
      "The active ellipse pointer must join the outgoing Rise Axis branch: "+JSON.stringify(outgoing));
    assert.ok(outgoing.collisions === 0,
      "Rise Axis handoff must not obscure Acompanhar/Participar/Crescer juntos: "+JSON.stringify(outgoing));
    assert.ok(outgoing.nodeDrift < 32,
      "The phase-5 filled node should travel WITH the handoff: "+JSON.stringify(outgoing));
    results.push({viewport:viewport.width,chapter:"Community Rise",...outgoing,verticalBalance});

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

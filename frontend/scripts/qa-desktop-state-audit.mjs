// Read-only Chromium audit of desktop story states against the Draw.io Master Plus.
// Produces measurement evidence; intentionally does NOT modify production assets
// or auto-approve fidelity from ring movement alone.
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const dir = resolve(dirname(fileURLToPath(import.meta.url)), "../qa-artifacts/desktop-state-audit");
mkdirSync(dir, { recursive: true });
const base = process.env.COLUS_PREVIEW_URL ?? "http://127.0.0.1:4173/";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const rows = [];
const wait = t => new Promise(r => setTimeout(r,t));
try {
 for (const width of [1440,1024]) {
  const page = await browser.newPage({ viewport: { width, height: width===1440?900:768 }, reducedMotion:"no-preference" });
  await page.goto(base, { waitUntil:"networkidle" });
  for (const id of ["experiencia","transformar","comunidade"]) {
   for (const f of [0.12,0.3,0.5,0.7,0.88]) {
    await page.evaluate(([id,f]) => {
     const s = document.getElementById(id);
     const r = s.getBoundingClientRect();
     const top = window.scrollY+r.top;
     const distance = Math.max(0, r.height-window.innerHeight);
     window.scrollTo({top:top+distance*f,behavior:"instant"});
    },[id,f]);
    await wait(620);
    const row=await page.evaluate(([id,f])=>{
     const s=document.getElementById(id),r=s.getBoundingClientRect();
     const style=node=>node?{opacity:getComputedStyle(node).opacity,inlineStyle:node.getAttribute("style"),animations:node.getAnimations().map(a=>({name:a.animationName??null,state:a.playState,css:a.effect?.getKeyframes?.().map(k=>({opacity:k.opacity,offset:k.offset})).slice(0,3)})).slice(0,5),rect:(()=>{let b=node.getBoundingClientRect();return [b.x,b.y,b.width,b.height].map(v=>Math.round(v))})()}:null;
     const headingSelector=id==="experiencia"?"h2":id==="comunidade"?"[data-colus-community-central-copy]":"[class*=min-h-\\[66vh\\]]";
     const sceneOpacity = (selector) => {
       const el = s.querySelector(selector);
       return el ? Number(getComputedStyle(el).opacity) : null;
     };
     const targets = id==="experiencia"
       ? {discover:sceneOpacity("[data-colus-desktop-discover]"),
          create:sceneOpacity("[data-colus-desktop-create]")}
       : id==="transformar"
       ? {first:sceneOpacity('[data-colus-desktop-moment="01"]'),
          second:sceneOpacity('[data-colus-desktop-moment="02"]'),
          third:sceneOpacity('[data-colus-desktop-moment="03"]')}
       : {heading:sceneOpacity("[data-colus-community-central-copy]"),
          media1:sceneOpacity('[data-colus-community-media="1"]'),
          media2:sceneOpacity('[data-colus-community-media="2"]'),
          media3:sceneOpacity('[data-colus-community-media="3"]')};
     const headings=[...s.querySelectorAll("h2")].map(el=>({text:el.textContent.trim().slice(0,90),wrap:style(el.parentElement),self:style(el)}));
     const momentArticles=id==="transformar"?[...s.querySelectorAll("motion-article,article")].filter(el=>/0[123] \/ (?:EXPRESSAR|CONSTRUIR|AVANÇAR)/.test(el.textContent)).map(el=>({label:el.textContent.match(/0[123] \/ [A-ZÁÇÃ ]+/)?.[0]??"",style:style(el)})):[];
     const media=[...s.querySelectorAll("[data-colus-community-media]")].map(el=>({name:el.getAttribute("data-colus-community-media"),style:style(el)}));
     return {id,f,targets,motionProgress:s.dataset.colusScrollProgress ?? null,derived:{discover:s.dataset.colusDiscoverOpacity,create:s.dataset.colusCreateOpacity,first:s.dataset.colusFirstOpacity,second:s.dataset.colusSecondOpacity,third:s.dataset.colusThirdOpacity,mediaA:s.dataset.colusMediaAOpacity,mediaB:s.dataset.colusMediaBOpacity,mediaC:s.dataset.colusMediaCOpacity},scrollY:Math.round(scrollY),sectionTop:Math.round(r.top),sectionHeight:Math.round(r.height),
       headings,momentArticles,media,phase:s.querySelector("[data-colus-community-stage]")?.getAttribute("data-colus-community-phase")??null};
    },[id,f]);
    rows.push({width,...row});
    if(id!=="comunidade" && [0.12,0.5,0.88].includes(f)){
      await page.screenshot({path:`${dir}/${id}-${width}-${String(f).replace(".","_")}.png`});
    }
   }
  }
  await page.close();
 }
 writeFileSync(`${dir}/states.json`,JSON.stringify(rows,null,2));
 for (const width of [1440,1024]) {
   const state = (id, at) => rows.find(r => r.width===width && r.id===id && r.f===at);
   const a=state("experiencia",0.12).targets, b=state("experiencia",0.5).targets, d=state("experiencia",0.88).targets;
   assert.ok(a.discover > .95 && a.create < .05, "Discover must lead at 12%: "+JSON.stringify(a));
   assert.ok(b.discover < .35 && b.create > .6, "Create must enter at 50%: "+JSON.stringify(b));
   assert.ok(d.discover < .05 && d.create > .95, "Create must dominate at 88%: "+JSON.stringify(d));
   const t0=state("transformar",0.12).targets,t1=state("transformar",0.5).targets,t2=state("transformar",0.88).targets;
   assert.ok(t0.first > .95 && t0.second < .05 && t0.third < .05,"Expressar must lead: "+JSON.stringify(t0));
   assert.ok(t1.first < .05 && t1.second > .95 && t1.third < .05,"Construir must lead: "+JSON.stringify(t1));
   assert.ok(t2.first < .05 && t2.second < .05 && t2.third > .95,"Avançar must lead: "+JSON.stringify(t2));
   const p=state("comunidade",0.88).targets;
   assert.ok(p.heading>.95 && p.media1>.95 && p.media2>.95 && p.media3>.95,
     "Master Plus community must fully settle by 88%: "+JSON.stringify(p));
 }

 console.log("COLUS DESKTOP STATE AUDIT collected", rows.length, "samples");
} finally { await browser.close(); }

// Read-only Chromium audit of desktop story states against the Draw.io Master Plus.
// Produces measurement evidence; intentionally does NOT modify production assets
// or auto-approve fidelity from ring movement alone.
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
     const style=node=>node?{opacity:getComputedStyle(node).opacity,rect:(()=>{let b=node.getBoundingClientRect();return [b.x,b.y,b.width,b.height].map(v=>Math.round(v))})()}:null;
     const headingSelector=id==="experiencia"?"h2":id==="comunidade"?"[data-colus-community-central-copy]":"[class*=min-h-\\[66vh\\]]";
     const headings=[...s.querySelectorAll("h2")].map(el=>({text:el.textContent.trim().slice(0,90),wrap:style(el.parentElement),self:style(el)}));
     const momentArticles=id==="transformar"?[...s.querySelectorAll("motion-article,article")].filter(el=>/0[123] \/ (?:EXPRESSAR|CONSTRUIR|AVANÇAR)/.test(el.textContent)).map(el=>({label:el.textContent.match(/0[123] \/ [A-ZÁÇÃ ]+/)?.[0]??"",style:style(el)})):[];
     const media=[...s.querySelectorAll("[data-colus-community-media]")].map(el=>({name:el.getAttribute("data-colus-community-media"),style:style(el)}));
     return {id,f,scrollY:Math.round(scrollY),sectionTop:Math.round(r.top),sectionHeight:Math.round(r.height),
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
 console.log("COLUS DESKTOP STATE AUDIT collected", rows.length, "samples");
} finally { await browser.close(); }

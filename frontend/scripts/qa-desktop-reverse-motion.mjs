/**
 * COLUS Master Plus: forward and reverse chapter-motion regression.
 * Chromium validates real computed opacity and active scene as scroll changes.
 * This never changes production assets, copy, layout or the scroll mechanism.
 */
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../qa-artifacts/desktop-reversal");
mkdirSync(root, { recursive: true });
const base = process.env.COLUS_PREVIEW_URL ?? "http://127.0.0.1:4173/";
const browser = await chromium.launch({headless:true,args:["--no-sandbox"]});
const records=[];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function sample(page,chapter,fraction) {
  await page.evaluate(([id,t])=>{
    const el=document.getElementById(id);
    if(!el) throw new Error("Missing section "+id);
    const rect=el.getBoundingClientRect();
    const top=rect.top+window.scrollY;
    const runway=Math.max(0,rect.height-window.innerHeight);
    window.scrollTo({top:top+runway*t,behavior:"instant"});
  },[chapter,fraction]);
  await sleep(330);
  const actual=await page.evaluate(id=>{
    const sec=document.getElementById(id);
    const op=selector=>{
      const el=sec?.querySelector(selector);
      return el ? Number(getComputedStyle(el).opacity):null;
    };
    return {progress:Number(sec?.dataset.colusScrollProgress ?? (
      Math.min(1,Math.max(0,-sec.getBoundingClientRect().top/
        Math.max(1,sec.getBoundingClientRect().height-window.innerHeight)
      ))
    )),
      chapter:id,
      discover:op("[data-colus-desktop-discover]"),
      create:op("[data-colus-desktop-create]"),
      first:op('[data-colus-desktop-moment="01"]'),
      second:op('[data-colus-desktop-moment="02"]'),
      third:op('[data-colus-desktop-moment="03"]'),
      communityPhase:sec?.querySelector("[data-colus-community-stage]")?.getAttribute("data-colus-community-phase") ?? null,
      communityHeading:op("[data-colus-community-central-copy]"),
      photos:[1,2,3].map(n=>op('[data-colus-community-media="'+n+'"]')),
      futureScene:sec?.querySelector("[data-colus-desktop-scene-window]")?.getAttribute("data-colus-scene") ?? null,
      activeFuture:sec?.querySelector('[data-colus-desktop-scene-progress][aria-current="step"]')?.getAttribute("data-colus-desktop-scene-progress") ?? null,
      horizontalOverflow:document.documentElement.scrollWidth - window.innerWidth,
    };
  },chapter);
  assert.ok(Math.abs(actual.progress-fraction)<.045,
    "Scroll-progress desynchronization "+JSON.stringify({chapter,fraction,actual}));
  assert.ok(actual.horizontalOverflow<=3,
    "Unexpected horizontal overflow "+JSON.stringify(actual));
  return actual;
}

function validate(id,f,actual){
  if (id==="experiencia") {
    if (f===.12) assert.ok(actual.discover>.95 && actual.create<.05,
      "Returning to Descobrir failed: "+JSON.stringify(actual));
    if (f===.5) assert.ok(actual.discover<.35 && actual.create>.6,
      "Aprender transition failed: "+JSON.stringify(actual));
    if (f===.88) assert.ok(actual.discover<.05 && actual.create>.95,
      "Criar cannot stabilize: "+JSON.stringify(actual));
  } else if(id==="transformar"){
    if(f===.12) assert.ok(actual.first>.95 && actual.second<.05 && actual.third<.05,
      "Expressar reverse failed: "+JSON.stringify(actual));
    if(f===.5) assert.ok(actual.first<.05 && actual.second>.95 && actual.third<.05,
      "Construir missing: "+JSON.stringify(actual));
    if(f===.88) assert.ok(actual.first<.05 && actual.second<.05 && actual.third>.95,
      "Avançar missing: "+JSON.stringify(actual));
  } else if(id==="comunidade"){
    const phases=[[.07,"1"],[.25,"2"],[.45,"3"],[.67,"4"],[.91,"5"]];
    const expected=phases.find(x=>x[0]===f)?.[1];
    assert.equal(actual.communityPhase,expected,
      "Community phase stuck during reverse: "+JSON.stringify(actual));
    if(f===.67 || f===.91) assert.ok(actual.communityHeading>.95 && actual.photos.every(v=>v>.95),
      "Community elements fail to settle: "+JSON.stringify(actual));
  }else if(id==="futuro"){
    const scenes=[[.12,"01"],[.37,"02"],[.55,"03"],[.8,"04"]];
    const expected=scenes.find(x=>x[0]===f)?.[1];
    assert.equal(actual.futureScene,expected,"Future scene stuck: "+JSON.stringify(actual));
    assert.equal(actual.activeFuture,expected,"Future indicator stuck: "+JSON.stringify(actual));
  }
}

try{
  const chapters=[
    ["experiencia",[.12,.5,.88]],
    ["futuro",[.12,.37,.55,.8]],
    ["comunidade",[.07,.25,.45,.67,.91]],
    ["transformar",[.12,.5,.88]],
  ];
  for(const viewport of [{width:1440,height:900},{width:1024,height:768}]){
    const page=await browser.newPage({viewport,reducedMotion:"no-preference"});
    await page.goto(base,{waitUntil:"networkidle",timeout:45000});
    for(const [id,steps] of chapters){
      for(const direction of ["forward","reverse"]){
        const path=direction==="forward"?steps:[...steps].reverse();
        for(const f of path){
          const actual=await sample(page,id,f);
          validate(id,f,actual);
          records.push({viewport:viewport.width,chapter:id,direction,fraction:f,...actual});
        }
        const end=path.at(-1);
        await page.screenshot({path:root+"/"+id+"-"+viewport.width+"-"+direction+"-"+end+".png"});
      }
    }
    await page.close();
  }
  writeFileSync(root+"/results.json",JSON.stringify({status:"pass",records},null,2));
  console.log("COLUS MASTER PLUS BIDIRECTIONAL SCROLL PASS",records.length,"samples");
}catch(error){
  writeFileSync(root+"/results.json",JSON.stringify({status:"fail",error:String(error),records},null,2));
  throw error;
}finally{
  await browser.close();
}

import assert from "node:assert/strict";
import {mkdirSync,writeFileSync} from "node:fs";
import {resolve} from "node:path";
import {chromium} from "playwright";

const base=process.env.COLUS_PREVIEW_URL??"http://127.0.0.1:4173";
const dir=resolve("qa-artifacts/public-booking");
mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const result=[];
try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:width===390?844:900},deviceScaleFactor:1});
  const errors=[];
  page.on("pageerror",e=>errors.push(e.message));
  await page.goto(base+"/agendar",{waitUntil:"networkidle",timeout:45000});
  assert.ok(await page.getByRole("heading",{name:/Escolha o momento ideal/i}).isVisible());
  assert.ok((await page.locator("main").innerText()).includes("As marcações online estão temporariamente indisponíveis"),
    "Scheduling must report unavailable backend without offering fake bookings");
  assert.ok(!/VITE_COLUS_|PostgreSQL|API|deployments|integração técnica/i.test(await page.locator("main").innerText()),
    "Public booking must not show implementation details");
  assert.equal(await page.getByRole("button",{name:/Enviar pedido/i}).isEnabled(),false,
    "Public bookings must fail closed when shared API is unavailable");
  assert.ok(await page.getByRole("button",{name:/Visita ao colégio/i}).isVisible(),
    "Service options should preview even when API is disconnected");
  const metrics=await page.evaluate(()=>({
   overflow:document.documentElement.scrollWidth-window.innerWidth,
   title:document.title
  })).catch(async()=>page.evaluate(()=>({overflow:document.documentElement.scrollWidth-window.innerWidth})));
  assert.ok(metrics.overflow<=3,"Public booking horizontal overflow on "+width+": "+metrics.overflow);
  assert.equal(errors.length,0,errors.join(" | "));
  await page.screenshot({path:resolve(dir,"agendar-"+width+".png"),fullPage:true});
  result.push({case:"public-booking-no-api",width,status:"pass",overflow:metrics.overflow,errors});
  await page.getByRole("link",{name:/Voltar ao COLUS/}).click();
  assert.equal(new URL(page.url()).pathname,"/","Return link must preserve the approved landing");
  await page.close();
 }
 writeFileSync(resolve(dir,"results.json"),JSON.stringify({status:"pass",result},null,2));
}catch(e){
 writeFileSync(resolve(dir,"results.json"),JSON.stringify({status:"fail",result,error:String(e)},null,2));
 throw e;
}finally{await browser.close();}

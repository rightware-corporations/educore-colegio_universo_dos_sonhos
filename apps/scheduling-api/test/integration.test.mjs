import {test} from "node:test";
import assert from "node:assert/strict";
import {spawn} from "node:child_process";
const disabled=!process.env.DATABASE_URL;
const token="COLUS-CI-ONLY-TEST-RECEPTION-TOKEN-123456789";
test("public landing booking → private reception queue → confirmation", {skip:disabled,timeout:30000},async()=>{
 const port=18967,base="http://127.0.0.1:"+port;
 const child=spawn(process.execPath,["server.mjs"],{cwd:process.cwd(),env:{...process.env,PORT:String(port),RECEPTION_TOKEN:token,ALLOWED_ORIGINS:"http://localhost:8080"},stdio:"pipe"});
 let stderr="";child.stderr.on("data",x=>{stderr+=x.toString()});
 const wait=async()=>{for(let i=0;i<80;i++){if(child.exitCode!==null)throw Error(stderr||"API exited");try{const r=await fetch(base+"/health");if(r.ok)return}catch{}await new Promise(r=>setTimeout(r,150))}throw Error("API unavailable "+stderr)};
 try{
  await wait();
  const today=new Intl.DateTimeFormat("en-CA",{timeZone:"Africa/Maputo",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());
  const n=k=>Number(today.find(p=>p.type===k)?.value);
  let date;
  for(let delta=4;delta<12;delta++){const d=new Date(Date.UTC(n("year"),n("month")-1,n("day")+delta));if(d.getUTCDay()>0&&d.getUTCDay()<6){date=d.toISOString().slice(0,10);break;}}
  const services=await (await fetch(base+"/v1/services")).json();
  assert.ok(services.services.some(s=>s.id==="visit"));
  const slots=await (await fetch(base+"/v1/slots?date="+date+"&serviceId=visit")).json();
  assert.ok(slots.slots.length>0);
  const time=slots.slots[0];
  const body={date,time,serviceId:"visit",clientName:"Contacto Demo QA",email:"teste@example.com",phone:"+258840000000",notes:"Visita fictícia"};
  const created=await fetch(base+"/v1/bookings",{method:"POST",headers:{"Content-Type":"application/json",Origin:"http://localhost:8080"},body:JSON.stringify(body)});
  assert.equal(created.status,201);
  assert.equal(created.headers.get("access-control-allow-origin"),"http://localhost:8080");
  const booking=(await created.json()).booking;
  assert.equal(booking.status,"requested");
  const conflict=await fetch(base+"/v1/bookings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
  assert.equal(conflict.status,409,"requesting overlapping public slots must fail");
  const anon=await fetch(base+"/v1/bookings");assert.equal(anon.status,401);
  const staff=await fetch(base+"/v1/bookings",{headers:{Authorization:"Bearer "+token}});
  assert.equal(staff.status,200);
  const booked=(await staff.json()).bookings;
  assert.ok(booked.some(r=>r.id===booking.id&&r.reference===booking.reference&&r.source==="landing"));
  const changed=await fetch(base+"/v1/bookings/"+booking.id,{method:"PATCH",headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"},body:JSON.stringify({status:"confirmed"})});
  assert.equal(changed.status,200);
  const updated=await (await fetch(base+"/v1/bookings",{headers:{Authorization:"Bearer "+token}})).json();
  assert.equal(updated.bookings.find(x=>x.id===booking.id).status,"confirmed");
  const cancelled=await fetch(base+"/v1/bookings/"+booking.id,{method:"PATCH",headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"},body:JSON.stringify({status:"cancelled"})});
  assert.equal(cancelled.status,200);
  const slotsAfter=await (await fetch(base+"/v1/slots?date="+date+"&serviceId=visit")).json();
  assert.ok(slotsAfter.slots.includes(time),"cancellation releases slot");
 }finally{child.kill("SIGTERM")}
});

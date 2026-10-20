import http from "node:http";
import { randomUUID, timingSafeEqual } from "node:crypto";
import pg from "pg";
import {services,windowHours,dateOK,dayOK,serviceOf,slotsFor} from "./core.mjs";

const {Pool}=pg;
const port=Number(process.env.PORT??8088);
const origins=(process.env.ALLOWED_ORIGINS??"http://localhost:8080,http://127.0.0.1:8080,http://localhost:5173,http://127.0.0.1:5173").split(",").map(x=>x.trim()).filter(Boolean);
const secret=process.env.RECEPTION_TOKEN??"";
const pool=new Pool({connectionString:process.env.DATABASE_URL,ssl:process.env.PGSSL==="require"?{rejectUnauthorized:true}:undefined,max:6});
const reply=(res,code,data)=>{res.writeHead(code,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});res.end(JSON.stringify(data))};
const input=async req=>{let body="";for await(const chunk of req){body+=chunk;if(body.length>8000)throw Error("Pedido demasiado grande");}return JSON.parse(body||"{}")};
const authorized=req=>{if(secret.length<24)return false;const given=req.headers.authorization?.replace(/^Bearer /,"")??"";if(given.length!==secret.length)return false;return timingSafeEqual(Buffer.from(given),Buffer.from(secret))};
const throttle=new Map();
function permit(req){const ip=(req.socket.remoteAddress??"unknown");const now=Date.now();const rec=throttle.get(ip);if(!rec||now-rec.start>600000){throttle.set(ip,{start:now,count:1});return true}rec.count++;return rec.count<=8}
async function initialize(){
 if(!process.env.DATABASE_URL)throw Error("DATABASE_URL é obrigatório para sincronizar a landing e a Receção");
 await pool.query(`CREATE TABLE IF NOT EXISTS colus_public_bookings (
  id UUID PRIMARY KEY, reference TEXT NOT NULL UNIQUE, service_id TEXT NOT NULL,
  date DATE NOT NULL, time TEXT NOT NULL, duration_minutes INTEGER NOT NULL,
  client_name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, notes TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'requested' CHECK(status IN ('requested','confirmed','cancelled','completed')),
  source TEXT NOT NULL DEFAULT 'landing', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 )`);
 await pool.query("CREATE INDEX IF NOT EXISTS colus_public_bookings_day_idx ON colus_public_bookings(date,status)");
}
const selectRows=async(date)=>{const q=await pool.query("SELECT id,reference,service_id as \"serviceId\",date::text,time,duration_minutes as \"durationMinutes\",client_name as \"clientName\",email,phone,notes,status,source,created_at as \"createdAt\" FROM colus_public_bookings WHERE date=$1 ORDER BY time", [date]);return q.rows};
async function reserve(body){
 const svc=serviceOf(body.serviceId);
 const {date,time}=body;const name=String(body.clientName??"").trim(),email=String(body.email??"").trim(),phone=String(body.phone??"").trim(),notes=String(body.notes??"").trim();
 if(!svc||!dateOK(date)||!dayOK(date)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(time??"")||name.length<3||name.length>100||
 !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>160||phone.length<7||phone.length>25||notes.length>300)throw Object.assign(Error("Dados da reserva inválidos"),{code:400});
 const client=await pool.connect();
 try{
  await client.query("BEGIN");
  await client.query("SELECT pg_advisory_xact_lock(hashtext($1))",[date]);
  const existing=(await client.query("SELECT time,duration_minutes as \"durationMinutes\",status FROM colus_public_bookings WHERE date=$1 AND status<>'cancelled' FOR UPDATE",[date])).rows;
  if(!slotsFor(date,svc.id,existing).includes(time))throw Object.assign(Error("Horário indisponível, escolha outro slot."),{code:409});
  const id=randomUUID(),reference="COL-"+id.slice(0,8).toUpperCase();
  await client.query("INSERT INTO colus_public_bookings(id,reference,service_id,date,time,duration_minutes,client_name,email,phone,notes) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
  [id,reference,svc.id,date,time,svc.duration,name,email,phone,notes]);
  await client.query("COMMIT");
  return {id,reference,serviceId:svc.id,date,time,status:"requested"};
 }catch(e){await client.query("ROLLBACK");throw e}finally{client.release()}
}
async function patchBooking(id,body){
 if(!/^[a-f0-9-]{36}$/i.test(id))throw Object.assign(Error("Identificador inválido"),{code:400});
 const status=String(body.status??"");
 if(!["confirmed","cancelled","completed"].includes(status))throw Object.assign(Error("Estado inválido"),{code:400});
 const res=await pool.query(`UPDATE colus_public_bookings SET status=$2,updated_at=NOW() WHERE id=$1 AND
 ((status='requested' AND $2 IN ('confirmed','cancelled')) OR (status='confirmed' AND $2 IN ('completed','cancelled')))
 RETURNING id,reference,status`,[id,status]);
 if(!res.rowCount)throw Object.assign(Error("Reserva inexistente ou transição indisponível"),{code:409});
 return res.rows[0];
}
const server=http.createServer(async(req,res)=>{
 const origin=req.headers.origin;
 if(origin&&origins.includes(origin)){res.setHeader("Access-Control-Allow-Origin",origin);res.setHeader("Vary","Origin");res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization");res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, OPTIONS");}
 if(req.method==="OPTIONS"){res.writeHead(origin&&origins.includes(origin)?204:403);res.end();return}
 try{
  const url=new URL(req.url??"/","http://localhost");
  if(req.method==="GET"&&url.pathname==="/health")return reply(res,200,{ok:true});
  if(req.method==="GET"&&url.pathname==="/v1/services")return reply(res,200,{services,timezone:"Africa/Maputo",windowHours});
  if(req.method==="GET"&&url.pathname==="/v1/slots"){
   const date=url.searchParams.get("date")??"",serviceId=url.searchParams.get("serviceId")??"";
   if(!dateOK(date)||!serviceOf(serviceId))return reply(res,400,{error:"Data ou serviço inválidos"});
   const bookings=await selectRows(date);return reply(res,200,{date,serviceId,timezone:"Africa/Maputo",slots:slotsFor(date,serviceId,bookings)});
  }
  if(req.method==="POST"&&url.pathname==="/v1/bookings"){if(!permit(req))return reply(res,429,{error:"Muitos pedidos. Aguarde antes de repetir."});return reply(res,201,{booking:await reserve(await input(req))})}
  if(req.method==="GET"&&url.pathname==="/v1/bookings"){
   if(!authorized(req))return reply(res,401,{error:"Credenciais da Receção necessárias"});
   const r=await pool.query(`SELECT id,reference,service_id as "serviceId",date::text,time,duration_minutes as "durationMinutes",
    client_name as "clientName",email,phone,notes,status,source,created_at as "createdAt"
    FROM colus_public_bookings ORDER BY date DESC,time DESC LIMIT 250`);
   return reply(res,200,{bookings:r.rows});
  }
  const match=url.pathname.match(/^\/v1\/bookings\/([a-f0-9-]{36})$/i);
  if(req.method==="PATCH"&&match){if(!authorized(req))return reply(res,401,{error:"Credenciais da Receção necessárias"});return reply(res,200,{booking:await patchBooking(match[1],await input(req))})}
  return reply(res,404,{error:"Rota desconhecida"});
 }catch(e){const code=Number(e.code)||500;console.error("Scheduling API:",code,e.message);reply(res,code>=400&&code<500?code:500,{error:code<500?e.message:"Erro temporário de agendamento"})}
});
initialize().then(()=>server.listen(port,"0.0.0.0",()=>console.info("COLUS Scheduling API",port))).catch(e=>{console.error("Scheduling API startup failed",e.message);process.exit(1)});

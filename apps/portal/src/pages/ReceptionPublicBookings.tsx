import {useCallback,useEffect,useState} from "react";
import {CalendarDays,CheckCircle2,Clock3,RefreshCw,ShieldCheck,XCircle} from "lucide-react";
type Booking={id:string;reference:string;serviceId:string;date:string;time:string;durationMinutes:number;clientName:string;email:string;phone:string;notes:string;status:"requested"|"confirmed"|"cancelled"|"completed";source:string};
type Service={id:string;name:string;duration:number};
const API=(import.meta.env.VITE_COLUS_SCHEDULING_API_URL??"").replace(/\/$/,"");
const field="h-11 min-w-0 rounded-xl border border-[#DBE5EC] bg-white px-3 text-sm";
const primary="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#0C5898] px-4 text-xs font-bold text-white disabled:opacity-40";
const neutral="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#D8E4EB] bg-white px-4 text-xs font-bold text-[#0C5898] disabled:opacity-40";
const day=(d:string)=>new Date(d+"T12:00:00").toLocaleDateString("pt-MZ",{weekday:"short",day:"numeric",month:"short"});
function upcoming(offset:number){const x=new Intl.DateTimeFormat("en-CA",{timeZone:"Africa/Maputo",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());const get=(name:string)=>Number(x.find(y=>y.type===name)?.value);return new Date(Date.UTC(get("year"),get("month")-1,get("day")+offset)).toISOString().slice(0,10)}
export function ReceptionPublicBookings(){
 const [token,setToken]=useState(""),[connected,setConnected]=useState(false),[services,setServices]=useState<Service[]>([]);
 const [bookings,setBookings]=useState<Booking[]>([]),[error,setError]=useState(""),[busy,setBusy]=useState("");
 const [filter,setFilter]=useState("all"),[date,setDate]=useState(upcoming(1)),[service,setService]=useState("visit"),[slots,setSlots]=useState<string[]>([]);
 const load=useCallback(async(auth:string)=>{
  if(!API||auth.length<24)return;
  const response=await fetch(API+"/v1/bookings",{headers:{Authorization:"Bearer "+auth}});
  const d=await response.json();
  if(!response.ok)throw Error(d.error??"Credenciais ou ligação inválidas");
  setBookings(d.bookings??[]);setConnected(true);setError("");
 },[]);
 useEffect(()=>{if(!API)return;fetch(API+"/v1/services").then(r=>r.json()).then(d=>setServices(d.services??[])).catch(()=>setError("Serviço público indisponível"));},[]);
 useEffect(()=>{if(!API||!date||!service)return;let alive=true;fetch(API+"/v1/slots?date="+date+"&serviceId="+service).then(r=>r.json()).then(d=>{if(alive)setSlots(d.slots??[])}).catch(()=>{if(alive)setSlots([])});return()=>{alive=false}},[date,service]);
 useEffect(()=>{if(!connected||!token)return;const interval=window.setInterval(()=>load(token).catch(e=>{setConnected(false);setError(String(e))}),20000);return()=>clearInterval(interval)},[connected,token,load]);
 const modify=async(id:string,status:"confirmed"|"cancelled"|"completed")=>{
  setBusy(id);try{const res=await fetch(API+"/v1/bookings/"+id,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:"Bearer "+token},body:JSON.stringify({status})});const d=await res.json();if(!res.ok)throw Error(d.error??"Não foi possível atualizar.");await load(token)}
  catch(e){setError(e instanceof Error?e.message:String(e))}finally{setBusy("")}
 };
 const filtered=bookings.filter(b=>filter==="all"||b.status===filter);
 const counts=(status:string)=>bookings.filter(b=>b.status===status).length;
 return <section className="space-y-5 rounded-[24px] border border-[#DBE6EE] bg-white p-5 sm:p-7" aria-label="Agendamentos recebidos da landing">
  <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#F18136]">COLUS · Receção online</p><h2 className="mt-2 text-xl font-extrabold text-[#071A2A]">Reservas do website</h2><p className="mt-2 max-w-2xl text-xs leading-6 text-[#657886]">Os pedidos efetuados em /agendar aparecem aqui após ligação à API. A agenda utiliza slots partilhados e o fuso Africa/Maputo.</p></div>
   {connected&&<button type="button" className={neutral} onClick={()=>load(token).catch(e=>setError(String(e)))}><RefreshCw size={14}/> Atualizar</button>}
  </div>
  {!API?<div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-6 text-amber-900"><strong>Integração não configurada.</strong> Para receber pedidos reais da landing, definir a mesma variável VITE_COLUS_SCHEDULING_API_URL nos dois deployments e disponibilizar o serviço PostgreSQL. Os pedidos internos fictícios permanecem disponíveis abaixo.</div>:
  !connected?<form onSubmit={e=>{e.preventDefault();load(token).catch(x=>setError(x instanceof Error?x.message:String(x)))}} className="flex flex-wrap items-end gap-3 rounded-xl bg-[#F3F8FB] p-4">
   <label className="min-w-[200px] flex-1 space-y-2 text-xs font-bold">Acesso da Receção à API<input aria-label="Chave de acesso da Receção" className={field+" block w-full"} type="password" minLength={24} value={token} onChange={e=>setToken(e.target.value)} placeholder="Token introduzido apenas nesta sessão"/></label><button className={primary}>Ligar agenda</button>
   <p className="w-full text-[11px] text-[#657886]">Token introduzido manualmente e conservado apenas na memória desta página. Para produção, substituir por autenticação institucional.</p>
  </form>:
  <>
   <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[{label:"Pedidos",value:bookings.length},{label:"Por confirmar",value:counts("requested")},{label:"Confirmados",value:counts("confirmed")},{label:"Concluídos",value:counts("completed")}].map(k=><div className="rounded-xl bg-[#F4F8FA] p-4" key={k.label}><p className="text-[11px] text-[#667987]">{k.label}</p><p className="mt-2 text-2xl font-extrabold">{k.value}</p></div>)}</div>
   <div className="flex flex-wrap items-end justify-between gap-3"><h3 className="text-sm font-extrabold">Pedidos públicos</h3><select aria-label="Filtrar reservas públicas" className={field} value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">Todos os estados</option><option value="requested">Por confirmar</option><option value="confirmed">Confirmados</option><option value="completed">Concluídos</option><option value="cancelled">Cancelados</option></select></div>
   {filtered.map(b=><article key={b.id} className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-[#DFE8EE] p-4"><div><p className="text-sm font-extrabold">{b.clientName}</p><p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#657886]"><span><CalendarDays className="mr-1 inline" size={13}/>{b.date} · {b.time}</span><span>{services.find(s=>s.id===b.serviceId)?.name??b.serviceId}</span><span>{b.reference}</span></p>
    <p className="mt-2 text-xs text-[#657886]">{b.email} · {b.phone}</p>{b.notes&&<p className="mt-2 text-xs leading-6">{b.notes}</p>}</div>
    <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#EDF5FA] px-3 py-2 text-[11px] font-bold text-[#0C5898]">{({requested:"Por confirmar",confirmed:"Confirmado",cancelled:"Cancelado",completed:"Concluído"} as const)[b.status]}</span>
    {b.status==="requested"&&<><button disabled={busy===b.id} className={primary} onClick={()=>modify(b.id,"confirmed")}><CheckCircle2 size={14}/> Confirmar</button><button disabled={busy===b.id} className={neutral} onClick={()=>modify(b.id,"cancelled")}><XCircle size={14}/> Cancelar</button></>}
    {b.status==="confirmed"&&<><button disabled={busy===b.id} className={primary} onClick={()=>modify(b.id,"completed")}>Concluir atendimento</button><button disabled={busy===b.id} className={neutral} onClick={()=>modify(b.id,"cancelled")}>Cancelar</button></>}</div></article>)}
   {filtered.length===0&&<div className="rounded-xl bg-[#F5F9FB] p-5 text-sm text-[#647987]">Sem reservas públicas para este filtro. A Receção receberá os pedidos automaticamente quando forem submetidos no website.</div>}
  </>}
  {API&&<div className="rounded-xl border border-[#E2E9F0] p-4">
   <h3 className="flex items-center gap-2 text-sm font-extrabold"><Clock3 size={16}/> Consultar slots públicos</h3><div className="mt-3 flex flex-wrap gap-3"><label className="text-xs font-bold">Dia<input aria-label="Dia da agenda pública" type="date" value={date} onChange={e=>setDate(e.target.value)} className={field+" ml-2"}/></label>
    <label className="text-xs font-bold">Atendimento<select aria-label="Tipo de atendimento público" value={service} onChange={e=>setService(e.target.value)} className={field+" ml-2"}>{services.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></label></div>
   <p className="mt-4 text-xs text-[#647987]">{slots.length?slots.length+" slots disponíveis em "+day(date):"Sem slots disponíveis para esta data ou serviço."}</p>
   <div className="mt-3 flex flex-wrap gap-2">{slots.map(s=><span className="rounded-lg bg-[#EDF5FA] px-3 py-2 text-xs font-bold text-[#0C5898]" key={s}>{s}</span>)}</div>
  </div>}
  {error&&<p role="alert" className="rounded-xl bg-red-50 p-3 text-xs font-bold text-red-800">{error}</p>}
  <p className="flex items-start gap-2 text-[11px] text-[#6C7B86]"><ShieldCheck size={15} className="shrink-0"/> Ambiente de integração técnica: o uso com dados reais exige autenticação institucional e políticas de proteção de dados.</p>
 </section>;
}

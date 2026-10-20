import {useEffect,useMemo,useState} from "react";
import {Link} from "react-router-dom";
import {ArrowLeft,ArrowRight,CalendarDays,CheckCircle2,Clock3,MapPin,ShieldCheck} from "lucide-react";
type Service={id:string;name:string;duration:number;description:string};
const API=(import.meta.env.VITE_COLUS_SCHEDULING_API_URL??"").replace(/\/$/,"");
const previewServices:Service[]=[
 {id:"admission",name:"Admissões e matrículas",duration:30,description:"Informações sobre a candidatura e requisitos documentais"},
 {id:"visit",name:"Visita ao colégio",duration:45,description:"Conhecer os espaços e o projeto educativo"},
 {id:"secretary",name:"Atendimento à Secretaria",duration:30,description:"Informações e procedimentos administrativos"}
];
const input="min-h-12 w-full rounded-xl border border-[#D9E3E7] bg-white px-4 text-sm outline-none focus:border-[#0C5898]";
const weekday=(d:string)=>{const n=new Date(d+"T12:00:00").getDay();return n>0&&n<6};
const fmt=(d:string)=>new Date(d+"T12:00:00").toLocaleDateString("pt-MZ",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
function nextDate(offset:number){const formatter=new Intl.DateTimeFormat("en-CA",{timeZone:"Africa/Maputo",year:"numeric",month:"2-digit",day:"2-digit"});const parts=formatter.formatToParts(new Date());const y=Number(parts.find(p=>p.type==="year")?.value),m=Number(parts.find(p=>p.type==="month")?.value),day=Number(parts.find(p=>p.type==="day")?.value);const d=new Date(Date.UTC(y,m-1,day+offset));return d.toISOString().slice(0,10)}
const card="rounded-[24px] border border-[#DDE6EA] bg-white p-5 shadow-[0_10px_35px_rgba(7,26,42,.06)] sm:p-7";
export function PublicBookingPage(){
 const [services,setServices]=useState<Service[]>([]),[service,setService]=useState("visit");
 const [date,setDate]=useState(()=>Array.from({length:7},(_,i)=>nextDate(i)).find(weekday)??nextDate(1)),[slots,setSlots]=useState<string[]>([]),[time,setTime]=useState("");
 const [clientName,setName]=useState(""),[email,setEmail]=useState(""),[phone,setPhone]=useState(""),[notes,setNotes]=useState("");
 const [loading,setLoading]=useState(false),[error,setError]=useState(""),[reference,setReference]=useState("");
 const days=useMemo(()=>Array.from({length:14},(_,i)=>nextDate(i)).filter(weekday),[]);
 useEffect(()=>{if(!API)return;let active=true;fetch(API+"/v1/services").then(r=>{if(!r.ok)throw Error();return r.json()}).then(d=>{if(active)setServices(d.services??[])}).catch(()=>{if(active)setError("O agendamento online está temporariamente indisponível. Contacte a Secretaria.")});return()=>{active=false}},[]);
 useEffect(()=>{if(!API||!service||!date)return;let active=true;setTime("");setLoading(true);
 fetch(API+"/v1/slots?date="+encodeURIComponent(date)+"&serviceId="+encodeURIComponent(service)).then(r=>{if(!r.ok)throw Error();return r.json()}).then(d=>{if(active){setSlots(d.slots??[]);setError("");}}).catch(()=>{if(active){setSlots([]);setError("Não foi possível consultar os horários. Tente novamente mais tarde.");}}).finally(()=>{if(active)setLoading(false)});
 return()=>{active=false};},[date,service]);
 const save=async(e:React.FormEvent)=>{
  e.preventDefault();if(!API||!time)return;setLoading(true);setError("");
  try{const res=await fetch(API+"/v1/bookings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({serviceId:service,date,time,clientName,email,phone,notes})});const data=await res.json();if(!res.ok)throw Error(data.error??"Não foi possível criar o pedido.");setReference(data.booking.reference);}
  catch(ex){setError(ex instanceof Error?ex.message:"Erro ao marcar");}finally{setLoading(false)}
 };
 return <main className="min-h-screen bg-[#FFF8EF] px-4 py-7 text-[#071A2A] sm:px-8 sm:py-12">
  <div className="mx-auto max-w-6xl">
   <div className="flex flex-wrap items-center justify-between gap-4"><Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#0C5898]"><ArrowLeft size={16}/> Voltar ao COLUS</Link><span className="text-[11px] font-bold uppercase tracking-[.18em] text-[#6B7985]">Colégio Universo dos Sonhos</span></div>
   <header className="relative mt-7 overflow-hidden rounded-[27px] bg-[#071A2A] px-7 py-10 text-white sm:px-10 sm:py-14"><div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border-[70px] border-[#1C5277]/35"/>
    <p className="relative text-xs font-bold uppercase tracking-[.2em] text-[#F18136]">Visitas e atendimento escolar</p><h1 className="relative mt-4 max-w-[16ch] font-editorial text-[clamp(40px,6vw,72px)] leading-[1.05]">Escolha o momento ideal para nos conhecer.</h1>
    <p className="relative mt-5 max-w-2xl text-sm leading-7 text-white/70">Selecione o atendimento, a data e o horário. A equipa de Receção analisará o seu pedido. Todos os horários seguem a hora de Moçambique.</p>
   </header>
   {reference?<section className={card+" mx-auto mt-8 max-w-2xl text-center"}><CheckCircle2 className="mx-auto text-emerald-700" size={38}/><h2 className="mt-3 text-2xl font-extrabold">Pedido recebido</h2><p className="mt-3 text-sm leading-7 text-[#5E7480]">Referência: <strong>{reference}</strong>. A reserva aguarda confirmação da Receção. Este ecrã não constitui confirmação de horário.</p><p className="mt-3 text-sm font-bold">{fmt(date)} · {time}</p><Link to="/" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0C5898] px-5 text-sm font-bold text-white">Regressar ao website</Link></section>:
    <form onSubmit={save} className="mt-8 grid items-start gap-6 lg:grid-cols-[1.15fr_.85fr]">
     <div className="space-y-6">
      <section className={card}><p className="text-[11px] font-extrabold uppercase tracking-[.15em] text-[#0C5898]">01 · Motivo da visita</p><h2 className="mt-2 text-lg font-extrabold">Como podemos ajudar?</h2>
       <div className="mt-5 grid gap-3 sm:grid-cols-2">{(services.length?services:previewServices).map(s=><button type="button" aria-pressed={service===s.id} key={s.id} onClick={()=>setService(s.id)} className={"rounded-xl border p-4 text-left transition "+(service===s.id?"border-[#0C5898] bg-[#EDF5FB]":"border-[#DFE7ED] hover:bg-[#F7FAFC]")}><p className="text-sm font-extrabold">{s.name}</p><p className="mt-2 text-xs leading-5 text-[#6A7B85]">{s.description}</p><p className="mt-3 text-xs font-bold text-[#0C5898]"><Clock3 className="mr-1 inline" size={14}/>{s.duration} minutos</p></button>)}</div>
       {!API&&<p role="alert" className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">As marcações online estão temporariamente indisponíveis. Para marcar uma visita, contacte a Secretaria do colégio.</p>}
      </section>
      <section className={card}><p className="text-[11px] font-extrabold uppercase tracking-[.15em] text-[#0C5898]">02 · Calendário</p><h2 className="mt-2 text-lg font-extrabold">Escolha um dia</h2>
       <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5">{days.map(d=><button type="button" aria-pressed={date===d} onClick={()=>setDate(d)} key={d} className={"rounded-xl border px-2 py-3 text-center "+(date===d?"border-[#0C5898] bg-[#0C5898] text-white":"border-[#E0E8EE] bg-white hover:bg-[#F6FAFC]")}>
        <span className="block text-[10px] font-bold uppercase">{new Date(d+"T12:00:00").toLocaleDateString("pt-MZ",{weekday:"short"})}</span><span className="mt-1 block text-xl font-extrabold">{d.slice(-2)}</span><span className="text-[10px]">{d.slice(5,7)}/{d.slice(0,4)}</span>
       </button>)}</div>
       <h3 className="mt-6 text-sm font-bold">Horários para {fmt(date)}</h3><div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">{slots.map(slot=><button type="button" aria-pressed={time===slot} key={slot} onClick={()=>setTime(slot)} className={"min-h-11 rounded-lg border text-sm font-bold "+(time===slot?"border-[#0C5898] bg-[#0C5898] text-white":"border-[#E0E8EE] text-[#0C5898] hover:bg-[#EDF5FB]")}>{slot}</button>)}</div>
       {!slots.length&&<p className="mt-3 rounded-lg bg-[#F5F8FA] p-4 text-sm text-[#657987]">{loading?"A consultar horários...":"Sem slots disponíveis. Experimente outra data ou contacte a Secretaria."}</p>}
      </section>
     </div>
     <section className={card+" lg:sticky lg:top-6"}><p className="text-[11px] font-extrabold uppercase tracking-[.15em] text-[#0C5898]">03 · Dados para contacto</p><h2 className="mt-2 text-lg font-extrabold">Confirmar pedido</h2>
      <p className="mt-3 text-xs leading-6 text-[#6B7C88]">Os dados fornecidos destinam-se exclusivamente a tratar o pedido de visita. Não inclua informações sensíveis sobre crianças.</p>
      <div className="mt-5 space-y-4">
       <label className="block space-y-2 text-xs font-bold">Nome completo<input required minLength={3} maxLength={100} autoComplete="name" className={input} value={clientName} onChange={e=>setName(e.target.value)}/></label>
       <label className="block space-y-2 text-xs font-bold">Email<input required type="email" maxLength={160} autoComplete="email" className={input} value={email} onChange={e=>setEmail(e.target.value)}/></label>
       <label className="block space-y-2 text-xs font-bold">Telefone<input required minLength={7} maxLength={25} autoComplete="tel" className={input} value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+258 ..."/></label>
       <label className="block space-y-2 text-xs font-bold">Observações (opcional)<textarea rows={3} maxLength={300} className={input+" py-3"} value={notes} onChange={e=>setNotes(e.target.value)}/></label>
       <div className="rounded-xl bg-[#F4F8FA] p-4 text-xs leading-6"><p className="flex items-center gap-2 font-bold"><CalendarDays size={15}/> {date} · {time||"Selecionar horário"}</p><p className="mt-2 flex items-center gap-2 text-[#667984]"><MapPin size={15}/> COLUS · Matola-Rio</p></div>
       {error&&<p role="alert" className="rounded-xl bg-red-50 p-3 text-xs font-bold text-red-800">{error}</p>}
       <button type="submit" disabled={!API||!services.length||!time||loading} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0C5898] px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Enviar pedido <ArrowRight size={16}/></button>
       <p className="flex gap-2 text-[11px] leading-5 text-[#71838B]"><ShieldCheck size={16} className="shrink-0"/> A reserva só fica confirmada após validação da Receção.</p>
      </div>
     </section>
    </form>}
  </div>
 </main>
}

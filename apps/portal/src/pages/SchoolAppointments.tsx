import { useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, Phone, XCircle, Users } from "lucide-react";
import { useDemo } from "../state/DemoProvider";
import { guardianStudents } from "../data/school";
import { ReceptionPublicBookings } from "./ReceptionPublicBookings";
const input="h-11 w-full rounded-xl border border-[#DCE4EB] bg-white px-3 text-sm outline-none focus:border-[#0C5898]";
const button="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#0C5898] px-4 text-xs font-bold text-white";
const ghost="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#DDE5EB] px-4 text-xs font-bold text-[#0C5898]";
export function SchoolAppointments({role}:{role:"guardian"|"reception"}){
 const {state,requestAppointment,decideAppointment}=useDemo();
 const children=guardianStudents(state);
 const [studentId,setStudentId]=useState("ALU-001"),[reason,setReason]=useState("Reunião de acompanhamento escolar"),[date,setDate]=useState("2026-10-28"),[time,setTime]=useState("09:00");
 const visible=state.appointments.filter(a=>role==="reception"||children.some(s=>s.id===a.studentId));
 const [search,setSearch]=useState("");
 const filtered=visible.filter(a=>[a.reason,a.guardianName,a.date,state.students.find(s=>s.id===a.studentId)?.name].join(" ").toLowerCase().includes(search.toLowerCase()));
 const taken=new Set(state.appointments.filter(a=>a.status==="confirmed").map(a=>a.date+" "+a.time));
 return <div className="space-y-5">
  <header className="relative overflow-hidden rounded-[26px] bg-[#071A2A] p-7 text-white sm:p-9"><div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[55px] border-[#0C5898]/30"/>
   <p className="relative text-[11px] font-bold uppercase tracking-[.2em] text-[#F18136]">COLUS · Atendimento escolar</p><h1 className="relative mt-3 font-display text-[clamp(36px,4vw,56px)]">Marcações e atendimentos</h1>
   <p className="relative mt-3 max-w-xl text-sm leading-7 text-white/70">Solicitações de atendimento, horários e confirmações num único espaço.</p></header>
  {role==="reception"&&<ReceptionPublicBookings/>}
  <div className="grid gap-3 sm:grid-cols-3">{[{label:"Pedidos recebidos",n:visible.length},{label:"Confirmados",n:visible.filter(a=>a.status==="confirmed").length},{label:"Aguardam resposta",n:visible.filter(a=>a.status==="requested").length}].map(x=><div key={x.label} className="rounded-xl border border-[#DCE4EC] bg-white p-4"><p className="text-xs text-[#687782]">{x.label}</p><p className="mt-2 text-2xl font-extrabold">{x.n}</p></div>)}</div>
  {role==="guardian"&&<form className="grid gap-3 rounded-2xl border border-[#DCE4EC] bg-white p-5 sm:grid-cols-2" onSubmit={e=>{e.preventDefault();requestAppointment(studentId,reason,date,time);setReason("");}}>
   <h2 className="text-base font-extrabold sm:col-span-2">Solicitar atendimento</h2>
   <label className="space-y-2 text-xs font-bold">Educando<select aria-label="Educando do atendimento" value={studentId} onChange={e=>setStudentId(e.target.value)} className={input}>{children.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
   <label className="space-y-2 text-xs font-bold">Motivo<input aria-label="Motivo do atendimento" value={reason} onChange={e=>setReason(e.target.value)} minLength={5} required maxLength={300} className={input}/></label>
   <label className="space-y-2 text-xs font-bold">Data<input aria-label="Data do atendimento" type="date" value={date} onChange={e=>setDate(e.target.value)} className={input}/></label>
   <label className="space-y-2 text-xs font-bold">Hora<select aria-label="Hora do atendimento" value={time} onChange={e=>setTime(e.target.value)} className={input}>{["08:00","09:00","10:00","11:00","12:00","14:00","15:00","16:00"].map(t=><option key={t}>{t}</option>)}</select></label>
   <button className={button+" sm:justify-self-start"}><CalendarDays size={15}/> Submeter pedido</button>
   <p className="text-xs text-[#687782] sm:col-span-2">Sujeito à confirmação da Receção.</p>
  </form>}
  <section className="rounded-2xl border border-[#DCE4EC] bg-white p-5 sm:p-6">
   <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 className="text-base font-extrabold">{role==="reception"?"Atendimentos da escola":"Os meus pedidos"}</h2><input value={search} onChange={e=>setSearch(e.target.value)} aria-label="Pesquisar marcações" placeholder="Pesquisar pedidos" className={input+" max-w-xs"}/></div>
   <div className="space-y-3">{filtered.map(a=><div key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E1E8EE] p-4"><div><p className="text-sm font-extrabold">{a.reason}</p>
    <p className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#687782]"><span className="inline-flex items-center gap-1"><Clock3 size={13}/>{a.date} · {a.time}</span><span className="inline-flex items-center gap-1"><Users size={13}/>{state.students.find(s=>s.id===a.studentId)?.name}</span><span className="inline-flex items-center gap-1"><Phone size={13}/>{a.guardianName}</span></p></div>
    <div className="flex flex-wrap items-center gap-2"><span className={"rounded-full px-3 py-1.5 text-[11px] font-bold "+(a.status==="confirmed"?"bg-emerald-50 text-emerald-800":a.status==="cancelled"?"bg-red-50 text-red-800":"bg-amber-50 text-amber-800")}>{a.status==="confirmed"?"Confirmado":a.status==="requested"?"Pendente":"Cancelado"}</span>
     {role==="reception"&&a.status==="requested"&&<><button disabled={taken.has(a.date+" "+a.time)} className={button+" disabled:opacity-40"} onClick={()=>decideAppointment(a.id,true)}><CheckCircle2 size={15}/> Confirmar</button>
      <button className={ghost} onClick={()=>decideAppointment(a.id,false)}><XCircle size={15}/> Cancelar</button></>}
    </div></div>)}</div>
   {filtered.length===0&&<p className="rounded-xl bg-[#F5F8FA] p-5 text-sm text-[#687782]">Nenhum pedido corresponde à pesquisa.</p>}
  </section></div>;
}

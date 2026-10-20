import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Activity, ArrowRight, Bell, BookOpen, CalendarDays, Check, CheckCircle2, CircleAlert, ClipboardList, Clock, CreditCard, FileText, GraduationCap, HeartHandshake, MessageCircle, Send, ShieldCheck, Users, Wallet } from "lucide-react";
import { ROLE_DEFS, isRole, type Role } from "../config/roles";
import { useDemo } from "../state/DemoProvider";
import { PageContainer } from "../components/PageContainer";
import { StatsCard } from "../components/StatsCard";
import { ScheduleCard } from "../components/ScheduleCard";
import { QuickActionCard } from "../components/QuickActionCard";

const timetable=[
 {time:"07:30",subject:"Matemática",room:"Sala A12",teacher:"Professor demo",current:true},
 {time:"09:15",subject:"Língua Portuguesa",room:"Sala B04",teacher:"Docente demo"},
 {time:"11:00",subject:"Ciências",room:"Laboratório",teacher:"Docente demo"}
];
const student="Estudante demonstrativo";
const formatMT=(value:number)=>new Intl.NumberFormat("pt-MZ").format(value)+" MT";
const grades=[{subject:"Matemática",score:"16/20",note:"Avaliação demonstrativa"},{subject:"Língua Portuguesa",score:"14/20",note:"Avaliação demonstrativa"},{subject:"Ciências",score:"17/20",note:"Avaliação demonstrativa"}];
function Section({title,subtitle,children}:{title:string;subtitle?:string;children:React.ReactNode}){
 return <section className="panel p-5 sm:p-7"><div className="mb-5"><h2 className="text-[17px] font-extrabold">{title}</h2>{subtitle&&<p className="mt-1 text-xs leading-6 text-muted-foreground">{subtitle}</p>}</div>{children}</section>;
}
function Status({ok,label}:{ok:boolean;label:string}){return <span className={"inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold "+(ok?"bg-emerald-50 text-emerald-800":"bg-amber-50 text-amber-800")}>{ok?<CheckCircle2 size={14}/>:<CircleAlert size={14}/>} {label}</span>;}
function Timeline(){
 const {state}=useDemo();
 return <Section title="Atividade partilhada" subtitle="Eventos gerados pelas ações desta sessão de demonstração.">
  {state.events.length===0?<p className="rounded-2xl bg-[#F5F7F8] p-5 text-sm leading-6 text-muted-foreground">Ainda não existem movimentos. Experimente registar uma falta como Professor ou validar um pagamento em Finanças.</p>:
   <div className="space-y-4">{state.events.map(e=><div key={e.id} className="flex items-start gap-3 border-b border-border/60 pb-4 last:border-0 last:pb-0"><span className="mt-1 rounded-xl bg-[#0C5898]/10 p-2 text-[#0C5898]"><Activity size={16}/></span><div><p className="text-sm font-bold">{e.title}</p><p className="mt-1 text-xs leading-6 text-muted-foreground">{e.detail}</p></div></div>)}</div>}
 </Section>;
}
function ActionFlows({role}:{role:Role}){
 const {state,markAbsent,validatePayment}=useDemo();
 return <div className="grid gap-4 xl:grid-cols-2">
  {(role==="teacher"||role==="pedagogy"||role==="guardian"||role==="executive"||role==="student")&&
  <Section title="Assiduidade partilhada" subtitle="Professor → educando → família → coordenação.">
   <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F5F7F8] p-4"><div><p className="text-xs text-muted-foreground">{student} · 11.ª A</p><p className="mt-1 text-sm font-extrabold">Presença de hoje</p></div><Status ok={!state.absent} label={state.absent?"Falta registada":"Presente"}/></div>
   {role==="teacher"&&<button className="action mt-4 w-full" onClick={markAbsent} disabled={state.absent}><ClipboardList size={17}/>{state.absent?"Falta já registada":"Registar falta (demo)"}</button>}
   {role==="guardian"&&state.absent&&<p className="mt-4 rounded-xl bg-[#F18136]/10 p-3 text-xs leading-6 text-[#9E5018]"><Bell size={15} className="mr-2 inline"/>O encarregado foi notificado nesta sessão.</p>}
  </Section>}
  {(role==="finance"||role==="guardian"||role==="executive"||role==="student")&&
  <Section title="Pagamento demonstrativo" subtitle="Validação nas Finanças → atualização do encarregado.">
   <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F5F7F8] p-4"><div><p className="text-xs text-muted-foreground">Propina ilustrativa</p><p className="mt-1 text-xl font-extrabold">{formatMT(8500)}</p></div><Status ok={state.paymentValidated} label={state.paymentValidated?"Validado":"Pendente"}/></div>
   {role==="finance"&&<button className="action mt-4 w-full" onClick={validatePayment} disabled={state.paymentValidated}><Check size={17}/>{state.paymentValidated?"Pagamento validado":"Validar pagamento (demo)"}</button>}
  </Section>}
 </div>;
}
function Dashboard({role}:{role:Role}){
 const info=ROLE_DEFS[role];const {state}=useDemo();
 const cards=role==="executive"?[
  {label:"Perfis em demonstração",value:"8",icon:Users},{label:"Estado académico",value:state.absent?"1 falta":"Regular",icon:GraduationCap},{label:"Pagamentos validados",value:state.paymentValidated?"1":"0",icon:Wallet},{label:"Movimentos",value:String(state.events.length),icon:Activity}
 ]:role==="finance"?[
  {label:"Pagamento em análise",value:state.paymentValidated?"0":"1",icon:Wallet},{label:"Valor demonstrativo",value:formatMT(8500),icon:CreditCard},{label:"Validados",value:state.paymentValidated?"1":"0",icon:CheckCircle2},{label:"Registos",value:String(state.events.length),icon:FileText}
 ]:role==="teacher"?[
  {label:"Turmas de exemplo",value:"1",icon:Users},{label:"Assiduidade",value:state.absent?"1 falta":"Regular",icon:ClipboardList},{label:"Aulas de exemplo",value:"3",icon:CalendarDays},{label:"Comunicações",value:String(state.messages.length),icon:MessageCircle}
 ]:role==="guardian"?[
  {label:"Educando",value:"1",icon:GraduationCap},{label:"Assiduidade",value:state.absent?"1 falta":"Regular",icon:ClipboardList},{label:"Pagamento",value:state.paymentValidated?"Validado":"Pendente",icon:Wallet},{label:"Alertas",value:String(state.guardianUnread),icon:Bell}
 ]:role==="student"?[
  {label:"Média ilustrativa",value:"15,7",icon:BookOpen},{label:"Disciplinas",value:"3",icon:GraduationCap},{label:"Presença",value:state.absent?"Falta":"Presente",icon:ClipboardList},{label:"Propinas",value:state.paymentValidated?"Em dia":"Pendente",icon:Wallet}
 ]:role==="pedagogy"?[
  {label:"Turmas ilustrativas",value:"1",icon:Users},{label:"Presenças",value:state.absent?"1 falta":"Regular",icon:ClipboardList},{label:"Avaliações",value:"3",icon:BookOpen},{label:"Comunicações",value:String(state.messages.length),icon:MessageCircle}
 ]:role==="secretary"?[
  {label:"Processos demo",value:"3",icon:FileText},{label:"Matrículas",value:"2",icon:Users},{label:"Por concluir",value:"1",icon:Clock},{label:"Arquivos",value:"Demo",icon:ShieldCheck}
 ]:[
  {label:"Pedidos demonstrativos",value:"3",icon:Users},{label:"Recebidos",value:"2",icon:FileText},{label:"Em análise",value:"1",icon:Clock},{label:"Encaminhados",value:"2",icon:HeartHandshake}
 ];
 return <PageContainer>
  <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
   <div><p className="eyebrow">Portal EduCore · {info.short}</p><h1 className="mt-3 font-display text-[clamp(38px,4vw,54px)] leading-tight text-[#071A2A]">{role==="student"?"O meu percurso":role==="guardian"?"Acompanhar de perto":role==="executive"?"Visão da instituição":"Bom dia, "+info.short+"."}</h1><p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">{info.caption} · Informação ilustrativa para apresentação.</p></div>
   <span className="rounded-full border border-[#0C5898]/10 bg-white px-4 py-2 text-xs font-bold text-[#0C5898]">Ano letivo · Demonstração 2026</span>
  </div>
  <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
   {cards.map((c,i)=><StatsCard key={c.label} label={c.label} value={c.value} icon={c.icon} variant={i===0?"primary":"default"}/>)}
  </div>
  <div className="mt-6 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
   <div className="space-y-5">
    <ActionFlows role={role}/>
    {(role==="teacher"||role==="student"||role==="pedagogy")&&<Section title="Horário de referência"><ScheduleCard day="Hoje · Ilustrativo" items={timetable}/></Section>}
    {(role==="reception"||role==="secretary")&&<AdmissionOverview/>}
   </div>
   <div className="space-y-5">
    <Section title="Acesso rápido" subtitle="Módulos disponíveis nesta demonstração.">
     <div className="grid grid-cols-2 gap-3">{info.items.filter(i=>i.path!=="dashboard").slice(0,4).map((i,k)=><QuickActionCard key={i.path} icon={[ClipboardList,Clock,MessageCircle,Wallet][k%4]} label={i.label} to={"/app/"+role+"/"+i.path}/>)}</div>
    </Section>
    <Timeline/>
   </div>
  </div>
 </PageContainer>;
}
function AdmissionOverview(){
 return <Section title="Processos demonstrativos" subtitle="Exemplos fictícios sem dados de alunos reais.">
  <div className="space-y-3">{[["ADM-001","Pedido de informação","Recebido"],["ADM-002","Admissão escolar","Em análise"],["ADM-003","Entrega documental","Encaminhado"]].map(([id,label,status])=><div key={id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#F5F7F8] p-4"><div><p className="text-sm font-bold">{label}</p><p className="text-xs text-muted-foreground">{id}</p></div><span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0C5898]">{status}</span></div>)}</div>
 </Section>;
}
function Messages({role}:{role:Role}){
 const {state,sendMessage}=useDemo();const [message,setMessage]=useState("");
 return <Section title="Comunicação escola–família" subtitle="Mensagens locais nesta sessão, sem envio externo.">
  <div className="space-y-3">{state.messages.map((m,i)=><div key={i} className="rounded-2xl bg-[#F5F7F8] p-4"><p className="text-xs font-extrabold text-[#0C5898]">{m.from}</p><p className="mt-2 text-sm leading-6">{m.text}</p></div>)}</div>
  {role==="teacher"&&<form className="mt-5 space-y-3" onSubmit={e=>{e.preventDefault();sendMessage(message);setMessage("");}}>
   <label htmlFor="demo-message" className="text-xs font-bold">Nova mensagem demonstrativa</label>
   <textarea id="demo-message" value={message} maxLength={240} onChange={e=>setMessage(e.target.value)} className="min-h-24 w-full rounded-xl border border-border p-3 text-sm" placeholder="Escreva uma nota para o encarregado..."/>
   <button className="action" disabled={!message.trim()}><Send size={16}/> Enviar mensagem (demo)</button>
  </form>}
 </Section>;
}
function Grades(){return <Section title="Notas ilustrativas" subtitle="Escala 0–20 · Não representam avaliações reais.">
 <div className="space-y-3">{grades.map(g=><div key={g.subject} className="flex items-center justify-between gap-4 rounded-xl bg-[#F5F7F8] p-4"><div><p className="text-sm font-bold">{g.subject}</p><p className="mt-1 text-xs text-muted-foreground">{g.note}</p></div><span className="rounded-xl bg-white px-4 py-2 text-sm font-extrabold text-[#0C5898]">{g.score}</span></div>)}</div>
 </Section>;}
export function Workspace(){
 const {role,section}=useParams();if(!isRole(role))return <Navigate to="/login" replace/>;
 const info=ROLE_DEFS[role];const active=section||"dashboard";
 if(!info.items.some(i=>i.path===active))return <Navigate to={"/app/"+role+"/dashboard"} replace/>;
 if(active==="dashboard")return <Dashboard role={role}/>;
 const title=info.items.find(i=>i.path===active)?.label||"Módulo";
 return <PageContainer>
  <div className="mb-7"><Link to={"/app/"+role+"/dashboard"} className="inline-flex items-center gap-2 text-xs font-bold text-[#0C5898]"><ArrowRight className="rotate-180" size={14}/> Voltar ao painel</Link>
   <p className="eyebrow mt-6">EduCore COLUS · {info.short}</p>
   <h1 className="mt-2 font-display text-5xl text-[#071A2A]">{title}</h1>
   <p className="mt-3 text-sm text-muted-foreground">Ambiente de apresentação com dados e ações fictícios.</p>
  </div>
  {active==="attendance"?<ActionFlows role={role}/>:
   active==="payments"?<ActionFlows role={role}/>:
   active==="messages"?<Messages role={role}/>:
   active==="grades"?<Grades/>:
   active==="schedule"?<Section title="Horário semanal · Exemplo"><ScheduleCard day="Hoje · Demonstração" items={timetable}/></Section>:
   active==="admissions"?<AdmissionOverview/>:
   <Section title="Módulo em demonstração"><p className="text-sm leading-7 text-muted-foreground">Esta área foi reservada para validação de necessidades com o COLUS. Não existe ainda um fluxo operacional ligado a dados reais.</p></Section>}
  <div className="mt-6"><Timeline/></div>
 </PageContainer>;
}

import { useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, FileText, Search, ShieldCheck, AlertTriangle, ArrowRight, Printer, Send, BookOpen, ClipboardCheck } from "lucide-react";
import { useDemo } from "../state/DemoProvider";
import { activeStudents, average, guardianStudents, mt } from "../data/school";
import type { Role } from "../config/roles";

const control="min-h-11 min-w-0 rounded-xl border border-[#DEE6EC] bg-white px-3 text-sm text-[#112534] outline-none focus:border-[#0C5898]";
const button="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0C5898] px-4 text-xs font-bold text-white hover:bg-[#0A4778] disabled:opacity-50";
const secondary="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#D9E3EA] bg-white px-3 text-xs font-bold text-[#0C5898] hover:bg-[#EFF6FB]";
const soft="rounded-2xl border border-[#DEE6EC] bg-white p-5 sm:p-6";
function Intro({eyebrow,title,subtitle,children}:{eyebrow:string;title:string;subtitle:string;children?:React.ReactNode}){
 return <header className="relative overflow-hidden rounded-[26px] bg-[#071A2A] px-6 py-8 text-white sm:px-9 sm:py-9">
  <div className="pointer-events-none absolute -right-20 -top-32 h-72 w-72 rounded-full border-[65px] border-[#0C5898]/35"/>
  <div className="relative flex flex-wrap items-end justify-between gap-4"><div>
  <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#F18136]">{eyebrow}</p>
  <h1 className="mt-3 font-display text-[clamp(34px,4vw,54px)] leading-tight">{title}</h1>
  <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">{subtitle}</p></div>{children}</div>
 </header>;
}
function Status({children,type="neutral"}:{children:React.ReactNode;type?:"neutral"|"success"|"attention"}){
 return <span className={"inline-flex rounded-full px-3 py-1.5 text-[11px] font-bold "+(type==="success"?"bg-emerald-50 text-emerald-800":type==="attention"?"bg-amber-50 text-amber-800":"bg-[#EDF3F7] text-[#0C5898]")}>{children}</span>;
}
function Empty({children}:{children:React.ReactNode}){return <p className="rounded-xl bg-[#F3F7FA] p-5 text-sm leading-6 text-[#657683]">{children}</p>;}
function Summary({items}:{items:{label:string;value:string|number}[]}){return <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{items.map(x=><div className="rounded-2xl border border-[#DEE6EC] bg-white p-4" key={x.label}><p className="text-[11px] font-bold uppercase tracking-wider text-[#687782]">{x.label}</p><p className="mt-3 text-2xl font-extrabold">{x.value}</p></div>)}</div>;}
const format=(date:string)=>date?new Date(date+"T12:00:00").toLocaleDateString("pt-MZ"):"—";
export function TeacherSessionAttendance(){
 const {state,recordSession}=useDemo();
 const lessons=state.lessons.filter(l=>l.teacherId==="PROF-001").sort((a,b)=>a.weekday-b.weekday||a.start.localeCompare(b.start));
 const [lessonId,setLessonId]=useState(lessons[0]?.id??"");
 const [date,setDate]=useState("2026-10-20");
 const [search,setSearch]=useState("");
 const lesson=lessons.find(l=>l.id===lessonId);
 const students=activeStudents(state).filter(x=>x.classId===lesson?.classId&&x.name.toLowerCase().includes(search.toLowerCase()));
 const entries=state.attendance.filter(a=>a.date===date&&a.lessonId===lessonId);
 const number=entries.filter(a=>a.status==="present").length,absent=entries.filter(a=>a.status==="absent"||a.status==="late").length;
 return <div className="space-y-5">
  <Intro eyebrow="Professor · Chamada" title="Presenças por aula" subtitle="Cada aula mantém o seu próprio registo de presença, falta ou atraso. O encarregado pode justificar ocorrências."/>
  <div className={soft}>
   <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_190px]">
    <label className="space-y-2 text-xs font-extrabold">Aula e turma<select aria-label="Aula para chamada" className={control+" block w-full"} value={lessonId} onChange={e=>setLessonId(e.target.value)}>
     {lessons.map(l=><option key={l.id} value={l.id}>{state.classes.find(c=>c.id===l.classId)?.name} · {["","Segunda","Terça","Quarta","Quinta","Sexta"][l.weekday]} {l.start} · {state.staff.find(t=>t.id===l.teacherId)?.subject}</option>)}</select></label>
    <label className="space-y-2 text-xs font-extrabold">Data<input className={control+" block w-full"} type="date" aria-label="Data da chamada" value={date} onChange={e=>setDate(e.target.value)}/></label>
   </div>
   <Summary items={[{label:"Alunos da turma",value:students.length},{label:"Presenças registadas",value:number},{label:"Faltas ou atrasos",value:absent},{label:"Por registar",value:Math.max(0,students.length-entries.length)}]}/>
   <div className="my-5 flex items-center gap-2 rounded-xl border border-[#E0E7ED] px-3"><Search size={16} className="text-[#687782]"/><input className="h-11 w-full text-sm outline-none" aria-label="Pesquisar estudante na chamada" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Pesquisar aluno da turma"/></div>
   <div className="divide-y divide-[#E6EDF1]">{students.map(st=>{
    const a=entries.find(x=>x.studentId===st.id);
    const locked=!!a&&state.justifications.some(j=>j.attendanceId===a.id);
    return <div key={st.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
     <div><p className="text-sm font-bold">{st.name}</p><p className="mt-1 text-xs text-[#697A84]">{st.id}{locked?" · Justificação em análise":""}</p></div>
     <div className="flex flex-wrap items-center gap-2"><Status type={a?.status==="present"?"success":a?"attention":"neutral"}>{a?.status==="present"?"Presente":a?.status==="absent"?"Falta":a?.status==="late"?"Atraso":"Sem chamada"}</Status>
      {(["present","absent","late"] as const).map(status=><button key={status} type="button" disabled={!lesson||locked} aria-label={status+" "+st.name}
       onClick={()=>lesson&&recordSession(lesson.id,date,st.id,status)} className={secondary+" disabled:opacity-40"}>{status==="present"?"Presente":status==="absent"?"Falta":"Atraso"}</button>)}
     </div>
    </div>
   })}</div>
   {students.length===0&&<Empty>Sem alunos atribuídos a esta turma.</Empty>}
   <p className="mt-5 text-xs text-[#687782]">Os dados são exclusivamente demonstrativos. Não substituem a folha de chamada oficial.</p>
  </div>
 </div>;
}
export function AbsenceCases({role}:{role:"guardian"|"pedagogy"}){
 const {state,justifyAbsence,decideJustification}=useDemo();
 const [drafts,setDrafts]=useState<Record<string,string>>({});
 const family=new Set(guardianStudents(state).map(x=>x.id));
 const rows=state.attendance.filter(a=>a.status!=="present"&&(role==="pedagogy"||family.has(a.studentId))).slice().reverse();
 return <div className="space-y-5"><Intro eyebrow={role==="guardian"?"Família · Assiduidade":"Pedagogia · Justificações"} title={role==="guardian"?"Justificar faltas":"Revisão de faltas"} subtitle="Acompanhe faltas e atrasos por aula, com justificação, análise pedagógica e histórico."/>
 <Summary items={[{label:"Ocorrências",value:rows.length},{label:"Justificadas",value:rows.filter(a=>state.justifications.some(j=>j.attendanceId===a.id&&j.status==="approved")).length},{label:"Por analisar",value:rows.filter(a=>state.justifications.some(j=>j.attendanceId===a.id&&j.status==="submitted")).length},{label:"Sem justificação",value:rows.filter(a=>!state.justifications.some(j=>j.attendanceId===a.id)).length}]}/>
 <section className={soft}><h2 className="mb-5 text-base font-extrabold">Ocorrências registadas</h2>
 <div className="space-y-3">{rows.map(a=>{
  const st=state.students.find(x=>x.id===a.studentId),lesson=state.lessons.find(x=>x.id===a.lessonId);
  const j=state.justifications.find(x=>x.attendanceId===a.id);
  return <article key={a.id} className="rounded-xl border border-[#E1E8ED] p-4">
   <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm font-extrabold">{st?.name}</p>
    <p className="mt-1 text-xs text-[#697A84]">{format(a.date)} · {lesson?state.staff.find(t=>t.id===lesson.teacherId)?.subject:"Registo escolar"} · {a.status==="late"?"Atraso":"Falta"}</p></div>
    <Status type={j?.status==="approved"?"success":j?"attention":"neutral"}>{j?.status==="approved"?"Justificada":j?.status==="rejected"?"Rejeitada":j?"Em análise":"Sem justificação"}</Status>
   </div>
   {j&&<p className="mt-3 rounded-lg bg-[#F5F8FA] p-3 text-xs leading-6">{j.reason}{j.decisionReason?" · Parecer: "+j.decisionReason:""}</p>}
   {role==="guardian"&&!j&&<form className="mt-4 flex flex-wrap gap-2" onSubmit={e=>{e.preventDefault();justifyAbsence(a.id,drafts[a.id]??"");}}>
    <input aria-label={"Motivo da falta de "+st?.name} required minLength={5} maxLength={400} value={drafts[a.id]??""} onChange={e=>setDrafts(d=>({...d,[a.id]:e.target.value}))} className={control+" min-w-[170px] flex-1"} placeholder="Indicar motivo da falta ou atraso"/>
    <button className={button}>Enviar justificação</button>
   </form>}
   {role==="pedagogy"&&j?.status==="submitted"&&<div className="mt-4 flex flex-wrap gap-2"><button className={button} onClick={()=>decideJustification(j.id,true)}><CheckCircle2 size={15}/> Aceitar</button>
    <button className={secondary} onClick={()=>{const reason=window.prompt("Motivo da rejeição:");if(reason?.trim()&&reason.trim().length>=3)decideJustification(j.id,false,reason)}}>Rejeitar com motivo</button></div>}
  </article>;
 })}</div>{rows.length===0&&<Empty>Não existem faltas ou atrasos neste histórico.</Empty>}
 </section></div>;
}
export function AssessmentWorkflow({role}:{role:"teacher"|"pedagogy"|"student"|"guardian"}){
 const {state,createAssessment,decideAssessment,publishGrade}=useDemo();
 const [classId,setClassId]=useState("CL-09-A"),[title,setTitle]=useState(""),[date,setDate]=useState("2026-10-27");
 const [selectedChild,setChild]=useState("ALU-001");
 const family=guardianStudents(state);
 const studentId=role==="student"?"ALU-001":role==="guardian"?selectedChild:null;
 const viewedClass=studentId?state.students.find(x=>x.id===studentId)?.classId:null;
 const plans=state.assessmentPlans.filter(a=>(role==="teacher"?a.teacherId==="PROF-001":role==="student"||role==="guardian"?a.status==="approved"&&a.classId===viewedClass:true))
  .slice().sort((a,b)=>a.date.localeCompare(b.date));
 const pendingGrades=state.assessments.filter(x=>!x.published);
 return <div className="space-y-5"><Intro eyebrow="Ensino · Avaliações" title={role==="teacher"?"Planear avaliações":role==="pedagogy"?"Aprovar avaliações":"Calendário de avaliações"} subtitle="Avaliações propostas pelos professores são revistas pela Pedagogia antes de aparecerem no calendário dos educandos."/>
  {role==="guardian"&&<div className={soft}><label className="text-xs font-bold">Educando<select aria-label="Educando das avaliações" className={control+" ml-3"} value={selectedChild} onChange={e=>setChild(e.target.value)}>{family.map(st=><option key={st.id} value={st.id}>{st.name}</option>)}</select></label></div>}
  {role==="teacher"&&<form className={soft+" grid gap-3 sm:grid-cols-[1fr_1fr_180px_auto] sm:items-end"} onSubmit={e=>{e.preventDefault();createAssessment(classId,title,date);setTitle("");}}>
   <label className="space-y-2 text-xs font-bold">Turma<select aria-label="Turma da avaliação" value={classId} onChange={e=>setClassId(e.target.value)} className={control+" block w-full"}>{state.classes.filter(c=>state.staff.find(t=>t.id==="PROF-001")?.classIds?.includes(c.id)).map(c=><option value={c.id} key={c.id}>{c.name}</option>)}</select></label>
   <label className="space-y-2 text-xs font-bold">Avaliação<input aria-label="Título da avaliação" required minLength={3} maxLength={120} className={control+" block w-full"} placeholder="Ex.: Teste trimestral" value={title} onChange={e=>setTitle(e.target.value)}/></label>
   <label className="space-y-2 text-xs font-bold">Data<input aria-label="Data da avaliação" type="date" value={date} onChange={e=>setDate(e.target.value)} className={control+" block w-full"}/></label>
   <button className={button}><Send size={14}/> Propor</button>
  </form>}
  {role==="pedagogy"&&<Summary items={[{label:"Propostas",value:state.assessmentPlans.length},{label:"Por analisar",value:state.assessmentPlans.filter(p=>p.status==="submitted").length},{label:"Aprovadas",value:state.assessmentPlans.filter(p=>p.status==="approved").length},{label:"Notas por publicar",value:pendingGrades.length}]}/>}
  <section className={soft}><h2 className="mb-5 text-base font-extrabold">Calendário e estados</h2><div className="space-y-3">{plans.map(a=><article key={a.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E3E9EF] p-4">
   <div className="flex items-center gap-3"><div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-[#EEF5FA] text-[#0C5898]"><CalendarDays size={16}/><span className="mt-0.5 text-[10px] font-bold">{a.date.slice(8,10)}/{a.date.slice(5,7)}</span></div>
   <div><p className="text-sm font-extrabold">{a.title}</p><p className="mt-1 text-xs text-[#687782]">{a.subject} · {state.classes.find(c=>c.id===a.classId)?.name} · {format(a.date)}</p>{a.reason&&<p className="mt-1 text-xs text-red-700">{a.reason}</p>}</div></div>
   <div className="flex flex-wrap gap-2"><Status type={a.status==="approved"?"success":a.status==="submitted"?"attention":"neutral"}>{a.status==="approved"?"Aprovada":a.status==="submitted"?"Em revisão":"Rejeitada"}</Status>
    {role==="pedagogy"&&a.status==="submitted"&&<><button onClick={()=>decideAssessment(a.id,true)} className={button}>Aprovar</button><button onClick={()=>{const reason=window.prompt("Motivo da rejeição:");if(reason?.trim()&&reason.trim().length>=3)decideAssessment(a.id,false,reason)}} className={secondary}>Rejeitar</button></>}
   </div></article>)}</div>{plans.length===0&&<Empty>Não existem avaliações publicadas para esta turma.</Empty>}
  </section>
  {role==="pedagogy"&&<section className={soft}><h2 className="mb-4 text-base font-extrabold">Publicação individual de notas</h2>
   <div className="space-y-3">{pendingGrades.map(a=><div key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F5F8FA] p-3"><div><p className="text-xs font-bold">{state.students.find(x=>x.id===a.studentId)?.name} · {a.subject}</p><p className="mt-1 text-xs text-[#687782]">{a.score}/20 · {a.term}.º trimestre</p></div>
   <button className={secondary} onClick={()=>publishGrade(a.id)}>Publicar nota</button></div>)}{pendingGrades.length===0&&<Empty>Sem notas pendentes de publicação.</Empty>}</div>
  </section>}
 </div>;
}
export function NoticesWorkspace({role}:{role:"student"|"guardian"|"pedagogy"|"secretary"|"executive"}){
 const {state,postNotice,acknowledgeNotice}=useDemo();
 const [title,setTitle]=useState(""),[body,setBody]=useState(""),[studentId,setStudentId]=useState("");
 const recipients=role==="guardian"?new Set(guardianStudents(state).map(x=>x.id)):new Set(["ALU-001"]);
 const visible=state.notices.filter(n=>role!=="student"&&role!=="guardian"||!n.studentId||recipients.has(n.studentId));
 const recipient=role==="guardian"?"ENC-001":"ALU-001";
 return <div className="space-y-5"><Intro eyebrow="Comunicação escolar" title="Comunicados" subtitle="Informação institucional com destinatários, registo de publicação e confirmação de leitura no cenário."/>
  {["pedagogy","secretary","executive"].includes(role)&&<form onSubmit={e=>{e.preventDefault();postNotice(title,body,studentId||undefined);setTitle("");setBody("");}} className={soft+" grid gap-3 md:grid-cols-2"}>
   <label className="space-y-2 text-xs font-bold">Título<input required minLength={3} aria-label="Título do comunicado" className={control+" block w-full"} value={title} onChange={e=>setTitle(e.target.value)}/></label>
   <label className="space-y-2 text-xs font-bold">Destinatário<select aria-label="Destinatário do comunicado" className={control+" block w-full"} value={studentId} onChange={e=>setStudentId(e.target.value)}><option value="">Toda a comunidade</option>{activeStudents(state).slice(0,160).map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
   <label className="space-y-2 text-xs font-bold md:col-span-2">Mensagem<textarea aria-label="Texto do comunicado" value={body} onChange={e=>setBody(e.target.value)} required minLength={5} maxLength={500} rows={3} className={control+" w-full py-3"}/></label>
   <button className={button+" md:justify-self-start"}><Send size={14}/> Publicar comunicado</button>
  </form>}
  <section className={soft}><div className="space-y-3">{visible.map(n=><article key={n.id} className="rounded-xl border border-[#E1E9EF] p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-extrabold">{n.title}</p><p className="mt-1 text-xs text-[#657683]">{n.studentId?"Mensagem direcionada":"Comunicado geral"} · {new Date(n.at).toLocaleDateString("pt-MZ")}</p></div>
   {["student","guardian"].includes(role)?n.readBy.includes(recipient)?<Status type="success">Lido</Status>:<button className={secondary} onClick={()=>acknowledgeNotice(n.id)}>Marcar como lido</button>:<Status>{n.readBy.length} confirmação(ões)</Status>}</div>
   <p className="mt-3 text-sm leading-6 text-[#425563]">{n.text}</p></article>)}</div>
   {visible.length===0&&<Empty>Não existem comunicados para este perfil.</Empty>}
  </section>
 </div>;
}
export function DocumentsWorkspace(){
 const {state,requestDocument,issueDocument}=useDemo();
 const [studentId,setStudentId]=useState("ALU-001"),[kind,setKind]=useState("matricula");
 const student=state.students.find(s=>s.id===studentId);
 const printPreview=(id:string)=>{
  const doc=state.documents.find(x=>x.id===id);
  if(!doc||doc.status!=="issued")return;
  window.print();
 };
 return <div className="space-y-5"><Intro eyebrow="Secretaria · Gestão documental" title="Documentos escolares" subtitle="Solicite e emita modelos ilustrativos ligados à ficha do aluno, com histórico verificável e pré-visualização."/>
  <form className={soft+" flex flex-wrap items-end gap-3"} onSubmit={e=>{e.preventDefault();requestDocument(studentId,kind);}}>
   <label className="min-w-[200px] flex-1 space-y-2 text-xs font-bold">Aluno<select aria-label="Aluno do documento" className={control+" block w-full"} value={studentId} onChange={e=>setStudentId(e.target.value)}>{state.students.filter(x=>x.status==="active").map(x=><option key={x.id} value={x.id}>{x.name} · {x.id}</option>)}</select></label>
   <label className="min-w-[200px] flex-1 space-y-2 text-xs font-bold">Tipo de documento<select aria-label="Tipo de documento" className={control+" block w-full"} value={kind} onChange={e=>setKind(e.target.value)}><option value="matricula">Declaração de matrícula</option><option value="frequencia">Declaração de frequência</option><option value="declaracao">Declaração escolar</option></select></label>
   <button className={button}><FileText size={16}/> Solicitar documento</button>
  </form>
  <section className={soft}><h2 className="mb-4 text-base font-extrabold">Histórico de documentos</h2><div className="space-y-3">{state.documents.map(d=><article key={d.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#DEE6EC] p-4">
   <div><p className="text-sm font-bold">{d.kind==="matricula"?"Declaração de matrícula":d.kind==="frequencia"?"Declaração de frequência":"Declaração escolar"}</p>
   <p className="mt-1 text-xs text-[#687782]">{state.students.find(x=>x.id===d.studentId)?.name} · {d.id} · {new Date(d.createdAt).toLocaleDateString("pt-MZ")}</p></div>
   <div className="flex flex-wrap items-center gap-2"><Status type={d.status==="issued"?"success":"attention"}>{d.status==="issued"?"Emitido":"Solicitado"}</Status>
   {d.status==="requested"?<button className={secondary} onClick={()=>issueDocument(d.id)}>Emitir modelo</button>:
   <button className={secondary} onClick={()=>printPreview(d.id)}><Printer size={14}/> Imprimir</button>}</div>
  </article>)}</div>{state.documents.length===0&&<Empty>Registe o primeiro pedido documental.</Empty>}</section>
  {state.documents.some(d=>d.status==="issued")&&<section className={soft+" print:border-0"}><p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#F18136]">Modelo demonstrativo — sem validade oficial</p><h2 className="text-lg font-extrabold">COLUS · Documento de referência</h2><p className="mt-3 text-sm leading-7">Este documento demonstra a geração de declarações escolares. Dados e assinaturas oficiais exigem validação do colégio.</p><p className="mt-3 text-xs text-[#687782]">Aluno selecionado: {student?.name}</p></section>}
 </div>;
}
export function FinanceOperations({section}:{section:"obligations"|"validation"|"receipts"|"accounts"}){
 const {state,createObligation,validateFee,rejectFee}=useDemo();
 const [studentId,setStudentId]=useState("ALU-001"),[description,setDescription]=useState("Mensalidade de novembro 2026"),[amount,setAmount]=useState("8500"),[dueDate,setDueDate]=useState("2026-11-10"),[query,setQuery]=useState("");
 const rows=state.fees.filter(f=>section!=="validation"||f.status==="submitted").filter(f=>section!=="receipts"||f.status==="validated")
  .filter(f=>!query||[f.description,state.students.find(x=>x.id===f.studentId)?.name].join(" ").toLowerCase().includes(query.toLowerCase()));
 const headline={obligations:"Obrigações escolares",validation:"Validação de pagamentos",receipts:"Comprovativos validados",accounts:"Contas dos alunos"}[section];
 return <div className="space-y-5"><Intro eyebrow="Finanças · Gestão escolar" title={headline} subtitle="Movimentos exclusivamente fictícios; os estados refletem-se nos educandos e nos indicadores da Direção."/>
  <Summary items={[{label:"Valor registado",value:mt(state.fees.reduce((n,f)=>n+f.amount,0))},{label:"Validado",value:mt(state.fees.filter(f=>f.status==="validated").reduce((n,f)=>n+f.amount,0))},{label:"Por validar",value:state.fees.filter(f=>f.status==="submitted").length},{label:"Pendente ou rejeitado",value:state.fees.filter(f=>f.status==="pending"||f.status==="rejected").length}]}/>
  {section==="obligations"&&<form className={soft+" grid gap-3 md:grid-cols-2 xl:grid-cols-5 xl:items-end"} onSubmit={e=>{e.preventDefault();createObligation(studentId,description,Number(amount),dueDate);setDescription("");}}>
   <label className="space-y-2 text-xs font-bold">Aluno<select aria-label="Aluno da obrigação" className={control+" block w-full"} value={studentId} onChange={e=>setStudentId(e.target.value)}>{activeStudents(state).map(x=><option value={x.id} key={x.id}>{x.name}</option>)}</select></label>
   <label className="space-y-2 text-xs font-bold xl:col-span-2">Descrição<input aria-label="Descrição da obrigação" required minLength={3} className={control+" block w-full"} value={description} onChange={e=>setDescription(e.target.value)}/></label>
   <label className="space-y-2 text-xs font-bold">Montante MT<input aria-label="Montante da obrigação" min="1" type="number" required className={control+" block w-full"} value={amount} onChange={e=>setAmount(e.target.value)}/></label>
   <button className={button+" xl:col-span-1"}>Criar obrigação</button>
   <label className="space-y-2 text-xs font-bold">Vencimento<input aria-label="Vencimento da obrigação" type="date" className={control+" block w-full"} value={dueDate} onChange={e=>setDueDate(e.target.value)}/></label>
  </form>}
  <section className={soft}><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="text-base font-extrabold">Registos financeiros</h2><div className="flex items-center gap-2 rounded-xl border border-[#DEE6EC] px-3"><Search size={15} className="text-[#687782]"/><input aria-label="Pesquisar registos financeiros" className="h-11 bg-transparent text-sm outline-none" placeholder="Pesquisar aluno ou conceito" value={query} onChange={e=>setQuery(e.target.value)}/></div></div>
   <div className="space-y-3">{rows.map(f=><article key={f.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E2E9EF] p-4">
    <div><p className="text-sm font-extrabold">{state.students.find(x=>x.id===f.studentId)?.name}</p><p className="mt-1 text-xs text-[#687782]">{f.description} · {f.id}{f.dueDate?" · "+format(f.dueDate):""}</p>{f.reason&&<p className="mt-1 text-xs text-red-700">Motivo: {f.reason}</p>}</div>
    <div className="flex flex-wrap items-center gap-2"><strong className="mr-2 text-sm">{mt(f.amount)}</strong><Status type={f.status==="validated"?"success":f.status==="submitted"?"attention":"neutral"}>{{pending:"Pendente",submitted:"Submetido",validated:"Validado",rejected:"Rejeitado"}[f.status]}</Status>
     {f.status==="submitted"&&section==="validation"&&<><button className={button} onClick={()=>validateFee(f.id)}>Validar</button>
     <button className={secondary} onClick={()=>{const reason=window.prompt("Motivo da rejeição");if(reason?.trim()&&reason.length>=3)rejectFee(f.id,reason)}}>Rejeitar</button></>}
     {f.status==="validated"&&<button className={secondary} onClick={()=>window.print()}><Printer size={14}/> Imprimir referência</button>}
    </div></article>)}</div>{rows.length===0&&<Empty>Sem movimentos correspondentes aos filtros.</Empty>}
  </section>
  <p className="text-xs text-[#876632]">A impressão é apenas uma referência de demonstração e não constitui recibo fiscal ou declaração de pagamento oficial.</p>
 </div>;
}
export function InterventionsWorkspace(){
 const {state,openIntervention,closeIntervention}=useDemo();
 const [studentId,setStudentId]=useState("ALU-001"),[note,setNote]=useState(""),[followUp,setFollowUp]=useState("2026-11-03");
 return <div className="space-y-5"><Intro eyebrow="Pedagogia · Acompanhamento" title="Intervenções pedagógicas" subtitle="Identificar necessidades, registar o acompanhamento, atribuir datas de seguimento e consultar o histórico."/>
 <form className={soft+" grid gap-3 sm:grid-cols-2"} onSubmit={e=>{e.preventDefault();openIntervention(studentId,note,followUp);setNote("");}}>
  <label className="space-y-2 text-xs font-bold">Aluno<select aria-label="Aluno da intervenção" className={control+" block w-full"} value={studentId} onChange={e=>setStudentId(e.target.value)}>{activeStudents(state).map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
  <label className="space-y-2 text-xs font-bold">Data de seguimento<input aria-label="Data de seguimento" type="date" className={control+" block w-full"} value={followUp} onChange={e=>setFollowUp(e.target.value)}/></label>
  <label className="space-y-2 text-xs font-bold sm:col-span-2">Medida de acompanhamento<textarea rows={3} aria-label="Medida de acompanhamento" required minLength={5} maxLength={400} value={note} onChange={e=>setNote(e.target.value)} className={control+" w-full py-3"}/></label>
  <button className={button+" sm:justify-self-start"}>Registar intervenção</button>
 </form>
 <section className={soft}><h2 className="mb-4 text-base font-extrabold">Histórico de acompanhamento</h2><div className="space-y-3">{state.interventions.map(x=><article key={x.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E2E9EF] p-4"><div><p className="text-sm font-extrabold">{state.students.find(s=>s.id===x.studentId)?.name}</p><p className="mt-2 text-xs leading-6">{x.note}</p><p className="mt-2 text-xs text-[#687782]">Reavaliação: {format(x.followUp)}</p></div><div className="flex items-center gap-2"><Status type={x.status==="closed"?"success":"attention"}>{x.status==="closed"?"Concluído":"Em acompanhamento"}</Status>{x.status==="open"&&<button className={secondary} onClick={()=>closeIntervention(x.id)}>Concluir</button>}</div></article>)}</div>{state.interventions.length===0&&<Empty>Sem intervenções em aberto.</Empty>}</section>
 </div>;
}
export function ExecutiveReports(){
 const {state}=useDemo();
 const students=activeStudents(state),absence=state.attendance.filter(a=>a.status!=="present");
 const download=()=>{
  const lines=["Indicador;Valor","Alunos ativos;"+students.length,"Turmas ativas;"+state.classes.filter(c=>c.active).length,
   "Faltas e atrasos;"+absence.length,"Justificações em análise;"+state.justifications.filter(j=>j.status==="submitted").length,
   "Intervenções abertas;"+state.interventions.filter(x=>x.status==="open").length,"Recebimentos fictícios validados MT;"+state.fees.filter(f=>f.status==="validated").reduce((n,f)=>n+f.amount,0),
   "Notas publicadas;"+state.assessments.filter(a=>a.published).length];
  const url=URL.createObjectURL(new Blob(["\uFEFF"+lines.join("\n")],{type:"text/csv;charset=utf-8"}));
  const a=document.createElement("a");a.href=url;a.download="colus-relatorio-demonstrativo.csv";a.click();URL.revokeObjectURL(url);
 };
 return <div className="space-y-5"><Intro eyebrow="Direção · Inteligência escolar" title="Visão institucional" subtitle="Indicadores agregados calculados diretamente a partir das operações da demonstração."/>
 <Summary items={[{label:"Alunos ativos",value:students.length},{label:"Turmas",value:state.classes.filter(c=>c.active).length},{label:"Assiduidade registada",value:state.attendance.length?Math.round(state.attendance.filter(a=>a.status==="present").length/state.attendance.length*100)+"%":"—"},{label:"Média publicada",value:average(state.assessments.filter(a=>a.published).map(a=>a.score))+"/20"}]}/>
 <div className="grid gap-5 lg:grid-cols-2">
  <section className={soft}><h2 className="mb-4 text-base font-extrabold">Acompanhamento académico</h2><div className="space-y-3">{[
   ["Faltas e atrasos",absence.length],["Justificações pendentes",state.justifications.filter(j=>j.status==="submitted").length],
   ["Intervenções abertas",state.interventions.filter(x=>x.status==="open").length],["Propostas de avaliação",state.assessmentPlans.filter(x=>x.status==="submitted").length],
   ["Notas em revisão",state.assessments.filter(x=>!x.published).length]
  ].map(([name,value])=><div className="flex justify-between border-b border-[#E4EAEF] py-2 text-sm" key={name}><span>{name}</span><strong>{value}</strong></div>)}</div></section>
  <section className={soft}><h2 className="mb-4 text-base font-extrabold">Administração e finanças</h2><p className="text-xs text-[#687782]">Valores fictícios, sem ligação bancária.</p><p className="mt-3 text-3xl font-extrabold">{mt(state.fees.filter(f=>f.status==="validated").reduce((n,f)=>n+f.amount,0))}</p><p className="mt-1 text-xs">Pagamentos validados</p>
  <div className="mt-5 space-y-2 text-sm"><p>{state.admissions.filter(x=>x.status==="enrolled").length} matrículas formalizadas</p><p>{state.documents.filter(x=>x.status==="issued").length} documentos de referência emitidos</p></div>
  <button className={button+" mt-5"} onClick={download}><FileText size={16}/> Exportar relatório CSV</button></section>
 </div>
 <section className={soft}><h2 className="mb-4 text-base font-extrabold">Auditoria demonstrativa</h2><div className="max-h-96 divide-y divide-[#E5EDF2] overflow-y-auto">{state.events.slice(0,40).map(e=><div className="flex flex-wrap justify-between gap-3 py-3" key={e.id}><div><p className="text-xs font-bold">{e.title}</p><p className="mt-1 text-xs text-[#687782]">{e.detail}</p></div><time className="text-[11px] text-[#687782]">{new Date(e.at).toLocaleString("pt-MZ")}</time></div>)}</div>{state.events.length===0&&<Empty>As próximas operações aparecerão neste histórico.</Empty>}</section>
 <p className="text-xs text-[#687782]">A exportação contém apenas números sintéticos calculados no navegador.</p></div>;
}

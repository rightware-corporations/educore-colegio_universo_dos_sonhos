import { useState } from "react";
import { Check, ClipboardCheck, Edit3, FilePlus2, Search, Send, UserPlus, UserRoundX, type LucideIcon } from "lucide-react";
import { useDemo } from "../state/DemoProvider";
import { CURRICULUM, GRADE_NOTE, LEVELS } from "../data/curriculum";
import { activeStudents, guardianStudents, gradeSubjects, mt, type Student } from "../data/school";
import type { Role } from "../config/roles";

export function Panel({title,subtitle,children,action}:{title:string;subtitle?:string;children:React.ReactNode;action?:React.ReactNode}){
 return <section className="panel min-w-0 p-5 sm:p-6"><div className="mb-5 flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-base font-extrabold text-[#071A2A]">{title}</h2>{subtitle&&<p className="mt-1 max-w-2xl text-xs leading-6 text-muted-foreground">{subtitle}</p>}</div>{action}</div>{children}</section>;
}
export function Pill({children,tone="neutral"}:{children:React.ReactNode;tone?:"success"|"warning"|"neutral"}){
 return <span className={"inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-bold "+(tone==="success"?"bg-emerald-50 text-emerald-800":tone==="warning"?"bg-amber-50 text-amber-800":"bg-[#0C5898]/10 text-[#0C5898]")}>{children}</span>;
}
export function Empty({children}:{children:React.ReactNode}){return <p className="rounded-xl bg-[#F5F7F8] p-5 text-sm text-muted-foreground">{children}</p>;}
export function StudentRegistry(){
 const {state,createStudent,editStudent,archiveStudent}=useDemo();
 const [open,setOpen]=useState(false),[query,setQuery]=useState(""),[showArchived,setShowArchived]=useState(false);
 const [name,setName]=useState(""),[grade,setGrade]=useState(9),[guardianId,setGuardian]=useState("ENC-001");
 const [editing,setEditing]=useState<Student|null>(null);
 const rows=state.students.filter(s=>(showArchived||s.status==="active")&&s.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
 function save(e:React.FormEvent){e.preventDefault();if(editing){editStudent(editing.id,{name,guardianId});setEditing(null);}else{createStudent({name,grade,guardianId});}setOpen(false);setName("");}
 return <Panel title="Registo de alunos" subtitle="Cadastro escolar e gestão documental; histórico conservado ao arquivar." action={
 <button className="action" onClick={()=>{setEditing(null);setName("");setGrade(9);setGuardian("ENC-001");setOpen(v=>!v);}}><UserPlus size={16}/> Novo aluno</button>}>
  <div className="mb-5 flex flex-wrap gap-3">
   <label className="flex min-w-[200px] flex-1 items-center gap-2 rounded-xl border border-border bg-white px-3"><Search size={16} className="text-muted-foreground"/><input aria-label="Pesquisar aluno" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Pesquisar por nome" className="h-11 min-w-0 flex-1 outline-none"/></label>
   <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-muted-foreground"><input type="checkbox" checked={showArchived} onChange={e=>setShowArchived(e.target.checked)}/> Mostrar arquivados</label>
  </div>
  {open&&<form className="mb-6 grid gap-4 rounded-2xl border border-[#0C5898]/15 bg-[#F5FAFE] p-5 sm:grid-cols-2" onSubmit={save}>
   <div className="sm:col-span-2"><p className="text-sm font-extrabold">{editing?"Editar ficha do aluno":"Nova ficha do aluno"}</p><p className="mt-1 text-xs text-muted-foreground">Utilizar apenas nomes fictícios nesta apresentação.</p></div>
   <label className="text-xs font-bold">Nome completo<input aria-label="Nome completo" required minLength={3} maxLength={90} value={name} onChange={e=>setName(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-border bg-white px-3 text-sm"/></label>
   {!editing&&<label className="text-xs font-bold">Classe pretendida<select aria-label="Classe pretendida" value={grade} onChange={e=>setGrade(Number(e.target.value))} className="mt-2 h-11 w-full rounded-xl border border-border bg-white px-3 text-sm">{CURRICULUM.map(c=><option key={c.grade} value={c.grade}>{c.label}</option>)}</select></label>}
   <label className="text-xs font-bold">Encarregado<select aria-label="Encarregado associado" value={guardianId} onChange={e=>setGuardian(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-border bg-white px-3 text-sm">{state.guardians.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}</select></label>
   <div className="flex items-end gap-3"><button type="submit" className="action"><Check size={16}/> Guardar</button><button type="button" className="action-secondary" onClick={()=>{setOpen(false);setEditing(null)}}>Cancelar</button></div>
  </form>}
  <div className="overflow-x-auto"><table className="w-full min-w-[630px] text-left text-xs"><thead><tr className="border-b border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
   <th className="pb-3">Aluno</th><th className="pb-3">Classe / turma</th><th className="pb-3">Encarregado</th><th className="pb-3">Situação</th><th className="pb-3 text-right">Ações</th>
  </tr></thead><tbody>{rows.map(s=><tr key={s.id} className="border-b border-border/60 last:border-0">
   <td className="py-4"><p className="font-extrabold text-[#071A2A]">{s.name}</p><p className="mt-1 text-[10px] text-muted-foreground">{s.id}</p></td>
   <td className="py-4">{s.grade}ª Classe · {state.classes.find(c=>c.id===s.classId)?.name??"Por atribuir"}</td>
   <td className="py-4">{state.guardians.find(g=>g.id===s.guardianId)?.name}</td>
   <td className="py-4"><Pill tone={s.status==="active"?"success":"warning"}>{s.status==="active"?"Ativo":"Arquivado"}</Pill></td>
   <td className="py-4 text-right">{s.status==="active"&&<div className="flex justify-end gap-2">
    <button title={"Editar "+s.name} aria-label={"Editar "+s.name} onClick={()=>{setEditing(s);setName(s.name);setGuardian(s.guardianId);setOpen(true);}} className="rounded-lg border border-border p-2 hover:bg-muted"><Edit3 size={15}/></button>
    <button title={"Arquivar "+s.name} aria-label={"Arquivar "+s.name} onClick={()=>{if(window.confirm("Arquivar a ficha de "+s.name+"? O histórico académico ficará preservado."))archiveStudent(s.id);}} className="rounded-lg border border-border p-2 text-red-700 hover:bg-red-50"><UserRoundX size={15}/></button>
    </div>}</td>
  </tr>)}</tbody></table></div>
  {rows.length===0&&<Empty>Nenhum aluno corresponde à pesquisa.</Empty>}
 </Panel>;
}
export function ClassAssignments({role}:{role:Role}){
 const {state,assignStudent}=useDemo();const students=activeStudents(state);
 return <div className="space-y-5">
  <Panel title="Turmas e organização académica" subtitle="Oferta configurável por classe; apenas turmas ativas são apresentadas como operacionais no cenário.">
   <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{state.classes.map(c=>{
    const enrolled=students.filter(s=>s.classId===c.id).length;
    return <div key={c.id} className="rounded-2xl border border-border bg-[#FBFCFD] p-4"><div className="flex items-center justify-between"><p className="text-base font-extrabold">{c.name}</p><Pill tone="success">Ativa</Pill></div>
    <p className="mt-2 text-xs text-muted-foreground">{enrolled} alunos · {c.capacity} lugares na turma</p>
    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E8EDF0]"><div className="h-full rounded-full bg-[#0C5898]" style={{width:(enrolled/c.capacity*100)+"%"}}/></div>
    <p className="mt-3 text-xs leading-6 text-muted-foreground">{state.staff.filter(t=>t.role==="teacher"&&t.classIds?.includes(c.id)).map(t=>t.name).join(" · ")||"Atribuição docente em preparação"}</p>
    </div>})}</div>
  </Panel>
  {role==="pedagogy"&&<Panel title="Atribuir turma a aluno" subtitle="Apenas a coordenação pedagógica pode atribuir turmas, respeitando classe e lotação.">
   <div className="space-y-3">{students.filter(x=>!x.classId).map(s=><div key={s.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F5F7F8] p-4"><span className="text-sm font-bold">{s.name} · {s.grade}ª Classe</span>
    <select aria-label={"Atribuir turma a "+s.name} defaultValue="" className="h-10 rounded-lg border border-border bg-white px-3 text-xs" onChange={e=>{if(e.target.value)assignStudent(s.id,e.target.value)}}>
     <option value="">Escolher turma</option>{state.classes.filter(c=>c.grade===s.grade).map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
    </select></div>)}{!students.some(x=>!x.classId)&&<Empty>Todos os alunos ativos têm turma atribuída.</Empty>}</div>
  </Panel>}
 </div>;
}
export function AdmissionsDesk({role}:{role:Role}){
 const {state,createAdmission,updateAdmission}=useDemo();
 const [candidate,setCandidate]=useState(""),[guardianName,setGuardian]=useState(""),[grade,setGrade]=useState(7);
 return <Panel title={role==="reception"?"Pedidos recebidos":"Admissões e matrículas"} subtitle="Atendimento → Secretaria → validação administrativa. Não há integração com registos reais.">
  {role==="reception"&&<form onSubmit={e=>{e.preventDefault();createAdmission({candidate,guardianName,grade});setCandidate("");setGuardian("");}} className="mb-6 grid gap-3 rounded-2xl bg-[#F5FAFE] p-4 md:grid-cols-[1fr_1fr_150px_auto]">
   <input aria-label="Candidato" required minLength={3} value={candidate} onChange={e=>setCandidate(e.target.value)} placeholder="Nome fictício do candidato" className="h-11 min-w-0 rounded-xl border border-border px-3 text-xs"/>
   <input aria-label="Nome do encarregado" required minLength={3} value={guardianName} onChange={e=>setGuardian(e.target.value)} placeholder="Encarregado" className="h-11 min-w-0 rounded-xl border border-border px-3 text-xs"/>
   <select aria-label="Classe de candidatura" value={grade} onChange={e=>setGrade(Number(e.target.value))} className="h-11 rounded-xl border border-border bg-white px-3 text-xs">{CURRICULUM.map(c=><option value={c.grade} key={c.grade}>{c.label}</option>)}</select>
   <button className="action"><FilePlus2 size={16}/> Registar</button>
  </form>}
  <div className="space-y-3">{state.admissions.map(a=><div key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-4">
   <div><p className="text-sm font-extrabold">{a.candidate}</p><p className="mt-1 text-xs text-muted-foreground">{a.id} · {a.grade}ª Classe · Encarregado: {a.guardianName}</p></div>
   <div className="flex items-center gap-2"><Pill tone={a.status==="enrolled"?"success":a.status==="received"?"warning":"neutral"}>{{received:"Recebido",referred:"Encaminhado",review:"Em análise",enrolled:"Matriculado"}[a.status]}</Pill>
   {role==="reception"&&a.status==="received"&&<button onClick={()=>updateAdmission(a.id,"referred")} className="action-secondary"><Send size={14}/> Encaminhar</button>}
   {role==="secretary"&&a.status==="referred"&&<button onClick={()=>updateAdmission(a.id,"review")} className="action-secondary"><ClipboardCheck size={14}/> Analisar</button>}
   {role==="secretary"&&a.status==="review"&&<button onClick={()=>updateAdmission(a.id,"enrolled")} className="action-secondary"><Check size={14}/> Formalizar</button>}
   </div>
  </div>)}</div>
 </Panel>;
}
export function AttendanceDesk({role}:{role:Role}){
 const {state,recordAttendance}=useDemo();const mine=role==="student"?activeStudents(state).filter(s=>s.id==="ALU-001"):
 role==="guardian"?guardianStudents(state):
 role==="teacher"?activeStudents(state).filter(s=>state.staff.some(t=>t.id==="PROF-001"&&t.classIds?.includes(s.classId??""))):
 activeStudents(state);
 return <Panel title="Assiduidade" subtitle="Presenças lançadas por professor atribuído; família e coordenação consultam os resultados.">
  <div className="space-y-3">{mine.map(s=>{
   const row=state.attendance.find(a=>a.studentId===s.id&&a.date==="2026-10-20");
   return <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border p-4" key={s.id}>
    <div><p className="text-sm font-extrabold">{s.name}</p><p className="mt-1 text-xs text-muted-foreground">{s.grade}ª Classe · {state.classes.find(c=>c.id===s.classId)?.name??"Sem turma"}</p></div>
    <div className="flex items-center gap-3"><Pill tone={row?.status==="absent"?"warning":row?.status==="present"?"success":"neutral"}>{row?.status==="absent"?"Falta registada":row?.status==="present"?"Presente":"Por registar"}</Pill>
    {role==="teacher"&&<><button className="action-secondary" onClick={()=>recordAttendance(s.id,"present")}>Presente</button><button className="action-secondary" onClick={()=>recordAttendance(s.id,"absent")}>Registar falta</button></>}
    </div>
   </div>})}</div>
 </Panel>;
}
export function GradesDesk({role}:{role:Role}){
 const {state,recordGrade,publishGrades}=useDemo();
 const [studentId,setStudentId]=useState("ALU-001"),[score,setScore]=useState(""),[subject,setSubject]=useState("Matemática");
 const rows=state.assessments.filter(a=>role==="teacher"?a.teacherId==="PROF-001":role==="pedagogy"||a.published).filter(a=>
  role==="student"?a.studentId==="ALU-001":role==="guardian"?guardianStudents(state).some(s=>s.id===a.studentId):true);
 const chosen=state.students.find(s=>s.id===studentId);
 return <Panel title="Avaliações e resultados" subtitle="O professor lança notas; a Pedagogia valida a publicação; alunos e encarregados consultam apenas resultados publicados.">
  {role==="teacher"&&<form className="mb-5 flex flex-wrap items-end gap-3 rounded-xl bg-[#F5FAFE] p-4" onSubmit={e=>{e.preventDefault();recordGrade(studentId,subject,Number(score));setScore("");}}>
   <label className="flex-1 text-xs font-bold">Aluno<select aria-label="Aluno da avaliação" value={studentId} onChange={e=>setStudentId(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-border bg-white px-3 text-xs">{activeStudents(state).filter(x=>x.classId==="CL-09-A"||x.classId==="CL-11-B").map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
   <label className="flex-1 text-xs font-bold">Disciplina<select aria-label="Disciplina da avaliação" value={subject} onChange={e=>setSubject(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-border bg-white px-3 text-xs">{gradeSubjects(chosen?.grade??9).filter(x=>x==="Matemática").map(x=><option key={x}>{x}</option>)}</select></label>
   <label className="w-24 text-xs font-bold">Nota /20<input aria-label="Nota de avaliação" type="number" step="0.5" min="0" max="20" required value={score} onChange={e=>setScore(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-border px-3 text-xs"/></label>
   <button className="action">Lançar nota</button>
  </form>}
  {role==="pedagogy"&&state.assessments.some(a=>!a.published)&&<button onClick={publishGrades} className="action mb-5"><Check size={16}/> Publicar notas pendentes</button>}
  <div className="overflow-x-auto"><table className="w-full min-w-[520px] text-left text-xs"><thead><tr className="border-b border-border text-muted-foreground"><th className="pb-3">Aluno</th><th className="pb-3">Disciplina</th><th className="pb-3">Trimestre</th><th className="pb-3">Nota</th><th className="pb-3">Estado</th></tr></thead>
   <tbody>{rows.map(a=><tr key={a.id} className="border-b border-border/60 last:border-0"><td className="py-4 font-bold">{state.students.find(s=>s.id===a.studentId)?.name??"Registo histórico"}</td>
    <td className="py-4">{a.subject}</td><td className="py-4">{a.term}.º</td><td className="py-4 font-extrabold">{a.score}/20</td><td><Pill tone={a.published?"success":"warning"}>{a.published?"Publicada":"Em revisão"}</Pill></td></tr>)}</tbody>
   </table></div>{!rows.length&&<Empty>Não existem avaliações publicadas nesta área.</Empty>}
 </Panel>;
}
export function FinanceDesk({role}:{role:Role}){
 const {state,validateFee,submitPayment}=useDemo();const [refs,setRefs]=useState<Record<string,string>>({});
 const allowed=role==="guardian"?new Set(guardianStudents(state).map(s=>s.id)):null;
 const rows=state.fees.filter(f=>!allowed||allowed.has(f.studentId));
 return <Panel title={role==="finance"?"Contas e recebimentos":role==="executive"?"Visão financeira":"Pagamentos dos educandos"} subtitle={role==="guardian"?"Consulte e apresente um comprovativo fictício para validação.":"Registos financeiros fictícios, separados do módulo académico."}>
  <div className="space-y-3">{rows.map(f=><div key={f.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border p-4">
   <div><p className="text-sm font-extrabold">{state.students.find(s=>s.id===f.studentId)?.name}</p>
    <p className="mt-1 text-xs text-muted-foreground">{f.description} · {f.id}</p><p className="mt-2 text-base font-extrabold">{mt(f.amount)}</p></div>
   <div className="flex flex-wrap items-center gap-2"><Pill tone={f.status==="validated"?"success":"warning"}>{{pending:"Pendente",submitted:"Em validação",validated:"Validado",rejected:"Rejeitado"}[f.status]}</Pill>
    {role==="finance"&&f.status!=="validated"&&<button onClick={()=>validateFee(f.id)} className="action">Validar pagamento</button>}
    {role==="guardian"&&f.status==="pending"&&<form className="flex flex-wrap gap-2" onSubmit={e=>{e.preventDefault();submitPayment(f.id,refs[f.id]??"");}}>
     <input aria-label={"Referência de "+f.id} placeholder="Referência fictícia" minLength={4} maxLength={48} required value={refs[f.id]??""} onChange={e=>setRefs(x=>({...x,[f.id]:e.target.value}))} className="h-11 w-40 rounded-lg border border-border px-3 text-xs"/>
     <button className="action-secondary">Submeter comprovativo</button>
    </form>}
   </div>
  </div>)}</div>
 </Panel>;
}
export function MessagesDesk({role}:{role:Role}){
 const {state,sendMessage}=useDemo();const [message,setMessage]=useState("");
 const visible=state.messages.filter(m=>role!=="guardian"||guardianStudents(state).some(s=>s.id===m.studentId));
 return <Panel title={role==="reception"?"Atendimento escolar":"Comunicação escola–família"} subtitle="Mensagens locais ao cenário de avaliação. Não há envio por email, SMS ou WhatsApp.">
  <div className="space-y-3">{visible.map(m=><div key={m.id} className="rounded-xl bg-[#F5F7F8] p-4">
   <p className="text-xs font-extrabold text-[#0C5898]">{m.sender==="teacher"?"Elisa Simango · Professora":"Marta Nhampossa · Encarregada"}</p>
   <p className="mt-2 text-sm leading-6">{m.text}</p></div>)}</div>
  {(role==="teacher"||role==="guardian")&&<form className="mt-5 space-y-3" onSubmit={e=>{e.preventDefault();sendMessage(message);setMessage("");}}>
   <label htmlFor="school-message" className="text-xs font-bold">Escrever mensagem</label>
   <textarea id="school-message" maxLength={240} value={message} onChange={e=>setMessage(e.target.value)} className="min-h-28 w-full rounded-xl border border-border p-3 text-sm" placeholder="Escreva uma mensagem sobre o acompanhamento escolar..."/>
   <button disabled={!message.trim()} className="action"><Send size={16}/> Enviar mensagem</button></form>}
 </Panel>;
}
export function CurriculumDesk(){
 const [grade,setGrade]=useState(9);const selected=CURRICULUM[grade-1];
 return <Panel title="Plano curricular de referência · 2026" subtitle={GRADE_NOTE}>
  <label className="text-xs font-bold">Classe<select aria-label="Selecionar classe curricular" className="ml-3 h-11 rounded-xl border border-border px-4 text-xs" value={grade} onChange={e=>setGrade(Number(e.target.value))}>{CURRICULUM.map(x=><option value={x.grade} key={x.grade}>{x.label}</option>)}</select></label>
  <p className="mt-4 text-xs text-muted-foreground">{LEVELS[selected.level]}</p>
  <div className="mt-4 grid gap-2 sm:grid-cols-2">{selected.subjects.map(s=><div key={s} className="rounded-xl border border-border p-3 text-xs font-bold">{s}</div>)}</div>
  <p className="mt-5 text-xs leading-6 text-amber-800">Matriz indicativa, não homologação curricular da instituição. Opções curriculares da 10.ª–12.ª e a introdução por classe requerem confirmação pedagógica.</p>
 </Panel>;
}
export function LinkFeature({icon:Icon,label,description}:{icon:LucideIcon;label:string;description:string}){return <div className="rounded-xl bg-[#F5F7F8] p-4"><Icon className="mb-3 text-[#0C5898]" size={20}/><p className="text-sm font-bold">{label}</p><p className="mt-1 text-xs leading-6 text-muted-foreground">{description}</p></div>}

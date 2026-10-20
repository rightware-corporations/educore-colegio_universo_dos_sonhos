import { useState } from "react";
import { BookOpen, ClipboardList, FileText, ArrowLeft, CalendarDays, UserRound, GraduationCap, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import { useDemo } from "../state/DemoProvider";
import { useGuardianChildSelection } from "../state/useGuardianChildSelection";
import { guardianStudents, average, attendanceRate, type DemoAttachment } from "../data/school";
const control="min-h-11 rounded-xl border border-[#DAE4EC] bg-white px-3 text-sm outline-none focus:border-[#0C5898]";
const action="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0C5898] px-4 text-xs font-bold text-white";
const frame="rounded-2xl border border-[#DFE8EE] bg-white p-5 sm:p-6";
function Heading({title,subtitle}:{title:string;subtitle:string}){return <header className="rounded-[25px] bg-[#071A2A] px-7 py-8 text-white sm:px-10"><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#F18136]">EduCore · Percurso académico</p><h1 className="mt-3 font-display text-[clamp(36px,4vw,56px)]">{title}</h1><p className="mt-3 max-w-xl text-sm leading-7 text-white/70">{subtitle}</p></header>;}
const allowedTypes=["application/pdf","image/png","image/jpeg","text/plain","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
async function readUpload(file:File):Promise<DemoAttachment>{
 if(file.size>512*1024||file.size<1||!allowedTypes.includes(file.type))throw Error("Ficheiro inválido. Use PDF, DOCX, JPG, PNG ou TXT até 512 KB.");
 const dataUrl=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(new Error("Falha ao ler ficheiro."));reader.readAsDataURL(file)});
 return {name:file.name.slice(0,140),size:file.size,type:file.type,dataUrl};
}
function AttachedFile({file}:{file?:DemoAttachment}){return file?<a className="inline-flex items-center gap-2 rounded-lg bg-[#EDF5FA] px-3 py-2 text-xs font-bold text-[#0C5898] hover:underline" href={file.dataUrl} download={file.name}><FileText size={14}/>{file.name} · {Math.ceil(file.size/1024)} KB</a>:null;}
export function LearningWorkspace({role,section}:{role:"student"|"teacher"|"guardian";section:string}){
 const {state,createLearningItem,submitWork,reviewWork}=useDemo();
 const [selectedClass,setSelectedClass]=useState(()=>new URLSearchParams(window.location.search).get("class")??"CL-09-A"),[title,setTitle]=useState(""),[details,setDetails]=useState(""),[kind,setKind]=useState<"assignment"|"material">("assignment"),[dueDate,setDueDate]=useState("2026-10-28");
 const [response,setResponse]=useState<Record<string,string>>({}),[feedback,setFeedback]=useState<Record<string,string>>({});
 const [childId,setChild]=useGuardianChildSelection();
 const [uploads,setUploads]=useState<Record<string,DemoAttachment>>({});
 const [error,setError]=useState("");
 const [teacherAttachment,setTeacherAttachment]=useState<DemoAttachment|undefined>();
 const child=role==="student"?state.students.find(x=>x.id==="ALU-001"):role==="guardian"?guardianStudents(state).find(x=>x.id===childId):undefined;
 const teacherClasses=state.staff.find(s=>s.id==="PROF-001")?.classIds??[];
 const accessible=new Set(role==="teacher"?[selectedClass]:child?.classId?[child.classId]:[]);
 const list=state.learningItems.filter(x=>accessible.has(x.classId)&&
   (role!=="student"||section!=="assignments"||x.kind==="assignment")&&
   (role!=="student"||section!=="materials"||x.kind==="material")).slice().reverse();
 const submissions=state.workSubmissions.filter(s=>role==="teacher"?list.some(x=>x.id===s.itemId):
  role==="student"?s.studentId==="ALU-001":s.studentId===child?.id);
 const presentCount=list.filter(x=>x.kind==="assignment").length;
 return <div className="space-y-5">
 <Heading title={role==="teacher"?"Conteúdos e trabalhos":role==="guardian"?"Trabalhos dos educandos":section==="materials"?"Materiais de estudo":"Trabalhos e tarefas"} subtitle="Materiais, propostas, entregas e acompanhamento partilhados entre professor, aluno e encarregado, sem informação financeira."/>
 {role==="guardian"&&<div className={frame}><label className="text-xs font-bold">Educando<select aria-label="Educando dos trabalhos" value={childId} onChange={e=>setChild(e.target.value)} className={control+" ml-3"}>{guardianStudents(state).map(st=><option value={st.id} key={st.id}>{st.name}</option>)}</select></label></div>}
 {role==="teacher"&&<form className={frame+" grid gap-3 sm:grid-cols-2"} onSubmit={e=>{e.preventDefault();createLearningItem(selectedClass,title,details,kind,dueDate,teacherAttachment);setTitle("");setDetails("");setTeacherAttachment(undefined);}}>
  <label className="space-y-2 text-xs font-bold">Turma<select aria-label="Turma do conteúdo" value={selectedClass} onChange={e=>setSelectedClass(e.target.value)} className={control+" block w-full"}>{state.classes.filter(c=>teacherClasses.includes(c.id)&&c.active).map(c=><option value={c.id} key={c.id}>{c.name}</option>)}</select></label>
  <label className="space-y-2 text-xs font-bold">Tipo<select aria-label="Tipo de conteúdo" value={kind} onChange={e=>setKind(e.target.value as "assignment"|"material")} className={control+" block w-full"}><option value="assignment">Trabalho</option><option value="material">Material de estudo</option></select></label>
  <label className="space-y-2 text-xs font-bold">Título<input aria-label="Título do trabalho" required minLength={3} maxLength={120} value={title} onChange={e=>setTitle(e.target.value)} className={control+" block w-full"}/></label>
  {kind==="assignment"&&<label className="space-y-2 text-xs font-bold">Entrega até<input aria-label="Data de entrega" type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} className={control+" block w-full"}/></label>}
  <label className="space-y-2 text-xs font-bold sm:col-span-2">Instruções<textarea aria-label="Instruções do conteúdo" value={details} onChange={e=>setDetails(e.target.value)} minLength={teacherAttachment?0:5} required={!teacherAttachment} maxLength={600} rows={3} className={control+" w-full py-3"}/></label>
  <div className="sm:col-span-2 flex flex-wrap items-center gap-3"><label className={action+" cursor-pointer"}>Carregar ficheiro<input type="file" accept=".pdf,.docx,.jpg,.jpeg,.png,.txt" aria-label="Carregar ficheiro do professor" className="sr-only" onChange={async e=>{const f=e.target.files?.[0];if(f)try{setTeacherAttachment(await readUpload(f));setError("");}catch(err){setError(String(err));}}}/></label><AttachedFile file={teacherAttachment}/><button className={action}>Publicar conteúdo</button></div>
  {error&&<p role="alert" className="text-xs font-bold text-red-700 sm:col-span-2">{error}</p>}
 </form>}
 <div className="grid gap-3 sm:grid-cols-3">{[{label:"Materiais disponíveis",value:list.filter(x=>x.kind==="material").length},{label:"Trabalhos",value:presentCount},{label:"Entregas registadas",value:submissions.length}].map(x=><div key={x.label} className={frame}><p className="text-xs text-[#687782]">{x.label}</p><p className="mt-3 text-2xl font-extrabold">{x.value}</p></div>)}</div>
 <div className="space-y-4">{list.map(item=>{
  const mine=state.workSubmissions.find(s=>s.itemId===item.id&&s.studentId===child?.id);
  const teacherSubs=state.workSubmissions.filter(s=>s.itemId===item.id);
  return <article key={item.id} className={frame}><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex items-center gap-2 text-[#0C5898]">{item.kind==="assignment"?<ClipboardList size={18}/>:<BookOpen size={18}/>}<span className="text-[11px] font-extrabold uppercase tracking-wider">{item.kind==="assignment"?"Trabalho":"Material"}</span></div><h2 className="mt-2 text-lg font-extrabold">{item.title}</h2><p className="mt-1 text-xs text-[#687782]">{item.subject} · {state.classes.find(x=>x.id===item.classId)?.name}{item.dueDate?" · Entrega: "+item.dueDate:""}</p></div>
  {mine&&<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">{mine.status==="reviewed"?"Revisto":"Entregue"}</span>}</div>
  <p className="mt-4 text-sm leading-7 text-[#405767]">{item.details}</p><div className="mt-3"><AttachedFile file={item.attachment}/></div>
  {role==="student"&&item.kind==="assignment"&&!mine&&<form className="mt-5 flex flex-wrap items-end gap-3" onSubmit={e=>{e.preventDefault();submitWork(item.id,response[item.id]??"",uploads[item.id]);}}>
  <label className="min-w-[200px] flex-1 space-y-2 text-xs font-bold">Resposta (opcional quando há anexo)<textarea aria-label={"Resposta para "+item.title} required={!uploads[item.id]} minLength={uploads[item.id]?0:5} maxLength={1200} rows={3} value={response[item.id]??""} onChange={e=>setResponse(v=>({...v,[item.id]:e.target.value}))} className={control+" block w-full py-3"} placeholder="Escreva a resposta do exercício..."/></label>
  <div className="flex flex-wrap items-center gap-2"><label className={action+" cursor-pointer"}>Carregar ficheiro<input aria-label={"Carregar ficheiro para "+item.title} type="file" accept=".pdf,.docx,.jpg,.jpeg,.png,.txt" className="sr-only" onChange={async e=>{const file=e.target.files?.[0];if(file)try{const att=await readUpload(file);setUploads(prev=>({...prev,[item.id]:att}));setError("");}catch(err){setError(String(err));}}}/></label><button className={action}>Entregar trabalho</button></div>
  {uploads[item.id]&&<AttachedFile file={uploads[item.id]}/>}
  {error&&<p role="alert" className="w-full text-xs font-bold text-red-700">{error}</p>}
 </form>}
  {mine&&<p className="mt-3 rounded-xl bg-[#EFF6FA] p-3 text-xs leading-6">Resposta: {mine.response||"Entrega em anexo"} <AttachedFile file={mine.attachment}/>{mine.feedback&&<span className="mt-2 block font-bold">Observação do professor: {mine.feedback}</span>}</p>}
  {role==="teacher"&&item.kind==="assignment"&&<div className="mt-5 border-t border-[#E1E8EE] pt-4"><h3 className="text-sm font-bold">{teacherSubs.length} entrega(s) dos alunos</h3><div className="mt-3 space-y-3">{teacherSubs.map(sub=><div key={sub.id} className="rounded-xl bg-[#F5F8FA] p-4"><p className="text-xs font-bold">{state.students.find(s=>s.id===sub.studentId)?.name}</p><p className="mt-2 text-xs leading-6">{sub.response||"Entrega em anexo"}</p><AttachedFile file={sub.attachment}/><p className="mt-1 text-xs text-[#687782]">{sub.feedback??"Aguarda revisão"}</p>{sub.status==="submitted"&&<form className="mt-3 flex flex-wrap gap-2" onSubmit={e=>{e.preventDefault();reviewWork(sub.id,feedback[sub.id]??"");}}><input aria-label={"Feedback da entrega "+sub.id} value={feedback[sub.id]??""} onChange={e=>setFeedback(v=>({...v,[sub.id]:e.target.value}))} required minLength={3} className={control+" min-w-[180px] flex-1"} placeholder="Feedback ao aluno"/><button className={action}>Rever entrega</button></form>}</div>)}</div></div>}
 </article>
 })}</div>
 {list.length===0&&<p className="rounded-xl bg-[#F5F8FA] p-6 text-sm text-[#687782]">Não existem conteúdos nesta turma. O professor pode adicionar materiais ou trabalhos.</p>}
 </div>;
}
export function StudentRecord({studentId}:{studentId:string}){
 const {state}=useDemo();
 const st=state.students.find(x=>x.id===studentId);
 if(!st)return <p className="p-6">Aluno não encontrado.</p>;
 const records=state.attendance.filter(a=>a.studentId===st.id);
 const grades=state.assessments.filter(g=>g.studentId===st.id&&g.published);
 const documents=state.documents.filter(d=>d.studentId===st.id);
 return <div className="space-y-5">
 <Link className="inline-flex items-center gap-2 text-xs font-bold text-[#0C5898]" to="/app/secretary/students"><ArrowLeft size={16}/> Regressar aos alunos</Link>
 <Heading title={st.name} subtitle="Ficha individual do aluno · registos demonstrativos do ano letivo 2026."/>
 <div className="grid gap-3 sm:grid-cols-4">{[{label:"Situação",value:st.status==="active"?"Ativo":"Arquivado"},{label:"Classe",value:st.grade+"ª"},{label:"Turma",value:state.classes.find(c=>c.id===st.classId)?.name??"Por atribuir"},{label:"Média publicada",value:average(grades.map(x=>x.score))+"/20"}].map(x=><div className={frame} key={x.label}><p className="text-xs text-[#687782]">{x.label}</p><p className="mt-2 text-lg font-extrabold">{x.value}</p></div>)}</div>
 <div className="grid gap-5 xl:grid-cols-2">
 <section className={frame}><h2 className="flex items-center gap-2 text-base font-extrabold"><UserRound size={18}/> Identificação e vínculo familiar</h2><p className="mt-4 text-sm">Identificador: {st.id}</p><p className="mt-2 text-sm">Encarregado: {state.guardians.find(g=>g.id===st.guardianId)?.name??"Não atribuído"}</p><p className="mt-2 text-sm">Assiduidade registada: {attendanceRate(state,[st.id])}%</p><p className="mt-4 text-xs text-[#687782]">A edição do nome e encarregado ocorre na área Registo de alunos.</p></section>
 <section className={frame}><h2 className="flex items-center gap-2 text-base font-extrabold"><GraduationCap size={18}/> Desempenho académico</h2><div className="mt-4 space-y-2">{grades.map(g=><p className="flex justify-between border-b border-[#E4ECF2] py-2 text-sm" key={g.id}><span>{g.subject} · {g.term}.º trimestre</span><strong>{g.score}/20</strong></p>)}{grades.length===0&&<p className="text-sm text-[#687782]">Sem notas publicadas.</p>}</div></section>
 <section className={frame}><h2 className="flex items-center gap-2 text-base font-extrabold"><CalendarDays size={18}/> Frequência</h2><p className="mt-3 text-sm">{records.length} ocorrências registadas (incluindo presenças)</p><div className="mt-3 space-y-2">{records.slice(-6).map(a=><p key={a.id} className="text-xs">{a.date} — {a.status==="present"?"Presença":a.status==="absent"?"Falta":"Atraso"}</p>)}</div></section>
 <section className={frame}><h2 className="flex items-center gap-2 text-base font-extrabold"><FileText size={18}/> Arquivo de documentos</h2><p className="mt-3 text-sm">{documents.length} pedidos registados</p>{documents.map(d=><p key={d.id} className="mt-2 text-xs">{d.kind} · {d.status==="issued"?"Emitido":"Solicitado"}</p>)}<Link className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#0C5898]" to="/app/secretary/documents"><Printer size={14}/> Gestão documental</Link></section>
 </div>
 </div>;
}

import {useState} from "react";
import {BookOpen, ChevronRight, ClipboardCheck, GraduationCap} from "lucide-react";
import {useDemo} from "../state/DemoProvider";
import {useGuardianChildSelection} from "../state/useGuardianChildSelection";
import {activeStudents,average,guardianStudents} from "../data/school";
const field="min-h-11 rounded-xl border border-[#DCE7EF] bg-white px-3 text-sm text-[#102638] focus:border-[#0C5898] focus:outline-none";
const panel="rounded-2xl border border-[#DFE8EE] bg-white p-5 sm:p-6";
function Header({label,title,sub}:{label:string;title:string;sub:string}){return <header className="rounded-[26px] bg-[#071A2A] px-7 py-8 text-white sm:px-9 sm:py-10"><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#F18136]">{label}</p><h1 className="mt-3 font-display text-[clamp(35px,4vw,54px)]">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">{sub}</p></header>}
export function TeacherGradebook(){
 const {state,recordGrade}=useDemo();
 const teacher=state.staff.find(t=>t.id==="PROF-001");
 const classes=state.classes.filter(c=>c.active&&teacher?.classIds?.includes(c.id));
 const [classId,setClassId]=useState(classes[0]?.id??"");
 const [studentId,setStudentId]=useState("");
 const [score,setScore]=useState("");
 const [query,setQuery]=useState("");
 const [message,setMessage]=useState("");
 const classroom=classes.find(c=>c.id===classId);
 const roster=activeStudents(state).filter(s=>s.classId===classId).sort((a,b)=>a.name.localeCompare(b.name,"pt"));
 const filtered=roster.filter(s=>s.name.toLowerCase().includes(query.toLowerCase())||s.id.toLowerCase().includes(query.toLowerCase()));
 const subject=teacher?.subject??"";
 const existing=state.assessments.filter(a=>a.teacherId===teacher?.id&&a.subject===subject&&roster.some(st=>st.id===a.studentId));
 const pending=existing.filter(a=>!a.published).length;
 const named=roster.find(s=>s.id===(roster.some(x=>x.id===studentId)?studentId:roster[0]?.id));
 const currentStudentId=named?.id??"";
 const save=(e:React.FormEvent)=>{
  e.preventDefault(); const value=Number(score);
  if(!currentStudentId||!Number.isFinite(value)||value<0||value>20){setMessage("Selecione um aluno e uma nota válida entre 0 e 20.");return;}
  recordGrade(currentStudentId,subject,value,teacher?.id);
  setScore("");setMessage("Nota registada. Aguarda validação da Pedagogia.");
 };
 return <div className="space-y-5">
 <Header label="COLUS · Professor · Gestão por turma" title="Diário de notas" sub="Selecione primeiro a turma. A pauta, os alunos e o lançamento de resultados respeitam exclusivamente essa atribuição docente."/>
 <section className={panel+" space-y-4"}>
  <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[11px] font-extrabold uppercase tracking-[.16em] text-[#0C5898]">01 · Turma de trabalho</p><h2 className="mt-2 text-base font-extrabold">Selecionar turma</h2></div><span className="rounded-full bg-[#EEF5FA] px-3 py-2 text-xs font-bold text-[#0C5898]">{subject}</span></div>
  <div className="grid gap-3 sm:grid-cols-2">{classes.map(c=><button type="button" key={c.id} aria-pressed={c.id===classId} onClick={()=>{setClassId(c.id);setStudentId("");setMessage("");}} className={"flex items-center justify-between rounded-xl border p-4 text-left "+(c.id===classId?"border-[#0C5898] bg-[#EDF5FB]":"border-[#E0E7ED] hover:bg-[#F7FAFC]")}>
   <div className="flex items-center gap-3"><span className="flex h-11 w-12 items-center justify-center rounded-xl bg-[#0C5898] text-xs font-extrabold text-white">{c.name}</span><div><p className="text-sm font-extrabold">{activeStudents(state).filter(s=>s.classId===c.id).length} aluno(s)</p><p className="mt-1 text-xs text-[#6D808C]">{subject} · Ano letivo 2026</p></div></div><ChevronRight size={17} className="text-[#0C5898]"/></button>)}</div>
  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{[{title:"Turma",value:classroom?.name??"—"},{title:"Inscritos",value:roster.length},{title:"Registos",value:existing.length},{title:"Por publicar",value:pending}].map(v=><div key={v.title} className="rounded-xl bg-[#F3F7FA] p-4"><p className="text-[11px] text-[#687B88]">{v.title}</p><p className="mt-2 text-xl font-extrabold">{v.value}</p></div>)}</div>
 </section>
 <section className={panel}>
  <p className="text-[11px] font-extrabold uppercase tracking-[.16em] text-[#0C5898]">02 · Lançamento</p>
  <h2 className="mt-2 text-base font-extrabold">Registar avaliação por aluno</h2>
  <p className="mb-5 mt-2 text-xs leading-6 text-[#617786]">Disciplina atribuída: {subject}. O resultado ficará em revisão até à publicação pela Pedagogia.</p>
  <form onSubmit={save} className="grid gap-3 rounded-xl bg-[#F4F8FB] p-4 sm:grid-cols-[minmax(0,1fr)_150px_auto] sm:items-end">
   <label className="block space-y-2 text-xs font-bold">Aluno da turma<select aria-label="Aluno da avaliação" value={currentStudentId} onChange={e=>setStudentId(e.target.value)} className={field+" block w-full"}>{roster.map(st=><option key={st.id} value={st.id}>{st.name}</option>)}</select></label>
   <label className="block space-y-2 text-xs font-bold">Nota /20<input aria-label="Nota de avaliação" value={score} onChange={e=>setScore(e.target.value)} type="number" min={0} max={20} step={0.5} required className={field+" block w-full"}/></label>
   <button disabled={!roster.length} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0C5898] px-4 text-xs font-extrabold text-white disabled:opacity-40"><ClipboardCheck size={16}/> Lançar nota</button>
  </form>
  {message&&<p role="status" className="mt-3 text-xs font-bold text-[#0C5898]">{message}</p>}
 </section>
 <section className={panel}>
  <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-[11px] font-extrabold uppercase tracking-[.16em] text-[#0C5898]">03 · Pauta da turma</p><h2 className="mt-2 text-base font-extrabold">Alunos e resultados — {classroom?.name??"—"}</h2></div>
   <input aria-label="Pesquisar aluno na pauta" className={field+" w-full max-w-xs"} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Pesquisar por nome ou código"/></div>
  <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[590px] text-left text-xs"><thead><tr className="border-b border-[#DDE7EE] text-[#607381]"><th className="py-3">Aluno</th><th className="py-3">Disciplina</th><th className="py-3">Notas lançadas</th><th className="py-3">Última nota</th><th className="py-3">Publicação</th></tr></thead>
   <tbody>{filtered.map(st=>{const notes=existing.filter(a=>a.studentId===st.id);const latest=notes[0];return <tr key={st.id} className="border-b border-[#E6EDF2] last:border-0"><td className="py-4"><p className="font-extrabold">{st.name}</p><p className="mt-1 text-[#69808E]">{st.id}</p></td><td className="py-4">{subject}</td><td className="py-4">{notes.length}</td><td className="py-4 font-extrabold">{latest?latest.score+"/20":"—"}</td><td className="py-4">{!latest?"Sem avaliação":latest.published?"Publicada":"Em revisão"}</td></tr>})}</tbody></table></div>
  {!filtered.length&&<p className="mt-4 rounded-xl bg-[#F4F8FA] p-4 text-xs">Não existem alunos nesta turma ou pesquisa.</p>}
 </section></div>;
}
export function LearnerGrades({role}:{role:"student"|"guardian"}){
 const {state}=useDemo();
 const [selected,setSelected]=useGuardianChildSelection();
 const children=guardianStudents(state);
 const student=role==="student"?state.students.find(s=>s.id==="ALU-001"):children.find(s=>s.id===selected)??children[0];
 const grades=state.assessments.filter(g=>g.published&&g.studentId===student?.id);
 const subjects=Array.from(new Set(grades.map(g=>g.subject))).sort((a,b)=>a.localeCompare(b,"pt"));
 return <div className="space-y-5">
  <Header label={"COLUS · "+(role==="student"?"Aluno":"Encarregado")+" · Resultados"} title="As minhas notas" sub="Resultados publicados pela Coordenação Pedagógica, organizados por disciplina e período. Os resultados em revisão não são apresentados."/>
  {role==="guardian"&&<div className={panel}><label className="text-xs font-bold">Educando<select aria-label="Educando das notas" className={field+" ml-3"} value={student?.id??""} onChange={e=>setSelected(e.target.value)}>{children.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></label></div>}
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{[{label:"Discente",value:student?.name??"—"},{label:"Média publicada",value:grades.length?average(grades.map(g=>g.score))+"/20":"—"},{label:"Disciplinas avaliadas",value:subjects.length}].map(x=><div key={x.label} className={panel}><p className="text-[11px] text-[#647684]">{x.label}</p><p className="mt-2 break-words text-lg font-extrabold">{x.value}</p></div>)}</div>
  {subjects.length?<div className="grid gap-3 lg:grid-cols-2">{subjects.map(subject=>{const data=grades.filter(g=>g.subject===subject);return <section key={subject} className={panel}><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2"><BookOpen size={18} className="text-[#0C5898]"/><h2 className="text-base font-extrabold">{subject}</h2></div><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">Publicado</span></div><p className="mt-4 text-2xl font-extrabold">{average(data.map(x=>x.score))}<span className="text-sm text-[#697B88]">/20</span></p><div className="mt-4 space-y-2">{data.map(x=><p key={x.id} className="flex justify-between border-t border-[#E9EFF3] pt-2 text-xs"><span>{x.term}.º trimestre</span><strong>{x.score}/20</strong></p>)}</div></section>})}</div>:
  <div className={panel}><GraduationCap className="text-[#0C5898]"/><h2 className="mt-3 text-base font-extrabold">Sem notas publicadas</h2><p className="mt-2 text-sm text-[#647684]">Assim que as avaliações forem validadas, os resultados aparecerão aqui.</p></div>}
 </div>;
}

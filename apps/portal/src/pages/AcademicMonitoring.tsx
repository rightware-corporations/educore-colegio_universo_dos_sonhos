import { useState } from "react";
import { CalendarCheck2, Check, Search, TrendingUp } from "lucide-react";
import { useDemo } from "../state/DemoProvider";
import { activeStudents, average } from "../data/school";
import { AttendanceChart, PerformanceChart } from "../components/SchoolCharts";

const input="h-11 rounded-xl border border-[#DCE4EA] bg-white px-3 text-sm";
function Heading({tag,title,desc,children}:{tag:string;title:string;desc:string;children?:React.ReactNode}){
 return <div className="relative mb-6 overflow-hidden rounded-[26px] bg-[#071A2A] px-7 py-8 text-white sm:px-10 sm:py-9">
  <div className="absolute -right-24 -top-36 h-[380px] w-[380px] rounded-full border-[75px] border-[#0C5898]/25"/>
  <div className="relative flex flex-wrap items-end justify-between gap-4"><div><p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#F18136]">{tag}</p>
  <h2 className="mt-3 font-display text-[clamp(37px,4vw,56px)] leading-none">{title}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-white/65">{desc}</p></div>{children}</div>
 </div>;
}
function Stat({label,value}:{label:string;value:string|number}){return <div className="rounded-xl border border-[#E1E9F0] bg-white p-4"><p className="text-[11px] font-bold uppercase tracking-wider text-[#687782]">{label}</p><p className="mt-3 text-2xl font-extrabold text-[#071A2A]">{value}</p></div>;}
export function PedagogyAttendance(){
 const {state}=useDemo(),[classId,setClassId]=useState("CL-09-A"),[date,setDate]=useState("2026-10-19"),[query,setQuery]=useState("");
 const students=activeStudents(state).filter(s=>s.classId===classId&&s.name.toLowerCase().includes(query.toLowerCase()));
 const rows=state.attendance.filter(a=>a.classId===classId&&a.date===date);
 const present=rows.filter(a=>a.status==="present").length,absent=rows.filter(a=>a.status==="absent").length;
 const latest=state.attendance.filter(a=>a.classId===classId).map(a=>a.date).sort().reverse()[0];
 return <div>
 <Heading tag="Qualidade e acompanhamento" title="Controlo de assiduidade" desc="Acompanhe a frequência por turma e data. O lançamento pertence aos professores responsáveis."><div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm"><CalendarCheck2 size={20} className="text-[#F18136]"/> Histórico de presenças</div></Heading>
 <section className="rounded-2xl border border-[#E2E9EF] bg-white p-5 sm:p-6">
  <div className="mb-5 flex flex-wrap items-end gap-3">
   <label className="space-y-2 text-xs font-extrabold">Turma<select aria-label="Turma de assiduidade" className={input+" block"} value={classId} onChange={e=>setClassId(e.target.value)}>{state.classes.filter(c=>c.active).map(c=><option value={c.id} key={c.id}>{c.name}</option>)}</select></label>
   <label className="space-y-2 text-xs font-extrabold">Data<input aria-label="Data de assiduidade" className={input+" block"} type="date" value={date} onChange={e=>setDate(e.target.value)}/></label>
   <label className="flex min-w-[180px] flex-1 items-center gap-2 rounded-xl border border-[#DCE4EA] px-3"><Search size={16} className="text-[#687782]"/><input aria-label="Pesquisar alunos em assiduidade" placeholder="Pesquisar estudante" value={query} onChange={e=>setQuery(e.target.value)} className="h-11 min-w-0 flex-1 text-sm outline-none"/></label>
  </div>
  <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
    <Stat label="Registos nesta data" value={rows.length}/><Stat label="Presentes" value={present}/><Stat label="Faltas" value={absent}/>
    <Stat label="Taxa registada" value={rows.length?Math.round(present/rows.length*100)+"%":"—"}/>
  </div>
  <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
   <div className="overflow-x-auto"><table className="w-full min-w-[460px] text-left text-xs"><thead className="bg-[#F5F8FA] text-[#687782]"><tr><th className="rounded-l-lg px-3 py-3">Estudante</th><th className="px-3 py-3">Classe</th><th className="px-3 py-3">Situação</th><th className="rounded-r-lg px-3 py-3">Docente</th></tr></thead><tbody>
    {students.map(st=>{const a=rows.find(x=>x.studentId===st.id);return <tr key={st.id} className="border-b border-[#E7EDF2]"><td className="px-3 py-3 font-extrabold">{st.name}</td><td className="px-3 py-3">{st.grade}ª</td><td className="px-3 py-3"><span className={"rounded-full px-2 py-1 font-bold "+(a?.status==="present"?"bg-emerald-50 text-emerald-800":a?.status==="absent"?"bg-amber-50 text-amber-800":"bg-[#EEF2F5] text-[#687782]")}>{a?.status==="present"?"Presente":a?.status==="absent"?"Falta":"Por registar"}</span></td><td className="px-3 py-3 text-[#687782]">{state.staff.find(t=>t.id===a?.teacherId)?.name??"—"}</td></tr>})}</tbody></table>
   </div>
   <div className="rounded-xl bg-[#F7F9FB] p-4"><h3 className="text-sm font-extrabold">Assiduidade por turma</h3><p className="mt-1 text-[11px] text-[#687782]">Registos disponíveis no cenário</p><AttendanceChart data={state}/><p className="mt-2 text-[11px] text-[#687782]">Última data registada nesta turma: {latest??"Sem registos"}</p></div>
  </div>
 </section>
 </div>;
}
export function PedagogyAssessments(){
 const {state,publishGrades}=useDemo();
 const [classId,setClassId]=useState("all"),[status,setStatus]=useState("all"),[query,setQuery]=useState("");
 const filtered=state.assessments.filter(a=>{
  const student=state.students.find(x=>x.id===a.studentId);
  return (classId==="all"||student?.classId===classId)&&(status==="all"||(status==="published"?a.published:!a.published))&&
    (!query||[student?.name,a.subject].join(" ").toLowerCase().includes(query.toLowerCase()));
 });
 const published=state.assessments.filter(a=>a.published);
 const pending=state.assessments.filter(a=>!a.published);
 return <div>
  <Heading tag="Acompanhamento pedagógico" title="Gestão de avaliações" desc="Acompanhe resultados por disciplina e turma, reveja lançamentos e publique notas para as famílias.">
   {pending.length>0&&<button onClick={publishGrades} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#F18136] px-5 text-sm font-extrabold text-[#071A2A]"><Check size={17}/> Publicar {pending.length} nota(s)</button>}
  </Heading>
  <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
   <Stat label="Avaliações registadas" value={state.assessments.length}/>
   <Stat label="Publicadas" value={published.length}/>
   <Stat label="Aguardam publicação" value={pending.length}/>
   <Stat label="Média publicada" value={average(published.map(x=>x.score))+"/20"}/>
  </div>
  <div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
   <section className="rounded-2xl border border-[#E2E9EF] bg-white p-5 sm:p-6">
    <div className="mb-5 flex flex-wrap gap-3">
     <label className="text-xs font-extrabold">Turma<select aria-label="Filtrar avaliações por turma" className={input+" mt-2 block"} value={classId} onChange={e=>setClassId(e.target.value)}><option value="all">Todas as turmas</option>{state.classes.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
     <label className="text-xs font-extrabold">Estado<select aria-label="Filtrar avaliações por estado" className={input+" mt-2 block"} value={status} onChange={e=>setStatus(e.target.value)}><option value="all">Todos</option><option value="published">Publicadas</option><option value="pending">Em revisão</option></select></label>
     <label className="flex min-w-[160px] flex-1 items-end"><span className="sr-only">Pesquisar avaliações</span><input value={query} onChange={e=>setQuery(e.target.value)} aria-label="Pesquisar avaliações" placeholder="Aluno ou disciplina" className={input+" w-full"}/></label>
    </div>
    <div className="overflow-x-auto"><table className="w-full min-w-[490px] text-left text-xs"><thead className="bg-[#F5F8FA] text-[#687782]"><tr><th className="p-3">Aluno</th><th className="p-3">Disciplina</th><th className="p-3">Nota</th><th className="p-3">Estado</th></tr></thead><tbody>
     {filtered.map(a=><tr key={a.id} className="border-b border-[#E7EDF2]"><td className="p-3 font-bold">{state.students.find(st=>st.id===a.studentId)?.name}</td><td className="p-3">{a.subject}</td><td className="p-3 font-extrabold">{a.score}/20</td><td className="p-3"><span className={"rounded-full px-2 py-1 text-[10px] font-bold "+(a.published?"bg-emerald-50 text-emerald-800":"bg-amber-50 text-amber-800")}>{a.published?"Publicada":"Por publicar"}</span></td></tr>)}</tbody></table>
    </div>
    {filtered.length===0&&<p className="py-6 text-center text-xs text-[#687782]">Sem avaliações correspondentes aos filtros.</p>}
   </section>
   <section className="rounded-2xl border border-[#E2E9EF] bg-white p-5"><h3 className="flex items-center gap-2 text-sm font-extrabold"><TrendingUp size={17} className="text-[#0C5898]"/> Desempenho por disciplina</h3><p className="mt-1 text-xs text-[#687782]">Média das notas publicadas</p><PerformanceChart data={state}/><p className="mt-2 text-xs leading-6 text-[#687782]">Publicações afetam os painéis do Aluno e do Encarregado.</p></section>
  </div>
 </div>;
}

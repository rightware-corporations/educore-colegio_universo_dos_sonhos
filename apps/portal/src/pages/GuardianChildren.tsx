import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, BookOpen, CalendarDays, ChevronRight, GraduationCap, Users } from "lucide-react";
import { useDemo } from "../state/DemoProvider";
import { attendanceRate, average, guardianStudents, mt } from "../data/school";
export function GuardianChildren(){
 const {state}=useDemo();
 const children=guardianStudents(state);
 const [selectedId,setSelectedId]=useState("ALU-001");
 const child=children.find(s=>s.id===selectedId)??children[0];
 if(!child)return <div className="rounded-2xl bg-white p-6"><h1 className="text-xl font-bold">Os meus educandos</h1><p className="mt-3 text-sm">Não existem educandos associados ao perfil familiar de demonstração.</p></div>;
 const grades=state.assessments.filter(a=>a.studentId===child.id&&a.published);
 const absences=state.attendance.filter(a=>a.studentId===child.id&&a.status!=="present");
 const unresolved=absences.filter(a=>!state.justifications.some(j=>j.attendanceId===a.id&&j.status==="approved"));
 const fees=state.fees.filter(f=>f.studentId===child.id&&f.status!=="validated");
 const work=state.learningItems.filter(x=>x.classId===child.classId&&x.kind==="assignment");
 const assignmentsDue=work.filter(w=>!state.workSubmissions.some(s=>s.itemId===w.id&&s.studentId===child.id));
 const classes=state.classes.find(c=>c.id===child.classId);
 return <div className="space-y-6">
  <header className="relative overflow-hidden rounded-[26px] bg-[#071A2A] px-6 py-8 text-white sm:px-9">
   <div className="pointer-events-none absolute -right-12 -top-32 h-72 w-72 rounded-full border-[58px] border-[#0C5898]/30"/>
   <p className="relative text-[11px] font-extrabold uppercase tracking-[.18em] text-[#F18136]">Acompanhamento familiar</p>
   <h1 className="relative mt-3 font-display text-[clamp(35px,4vw,53px)]">Os meus educandos</h1>
   <p className="relative mt-3 max-w-lg text-sm leading-7 text-white/70">Consulte os registos académicos de cada educando individualmente, com informação atualizada na demonstração.</p>
  </header>
  <div className="grid items-start gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
   <section aria-label="Selecionar educando" className="rounded-2xl border border-[#DFE8EF] bg-white p-5">
    <h2 className="mb-4 flex items-center gap-2 text-sm font-extrabold"><Users size={17}/> Escolher educando</h2>
    <div className="space-y-2">{children.map(st=><button type="button" key={st.id} onClick={()=>setSelectedId(st.id)} aria-pressed={st.id===child.id} className={"flex w-full items-center justify-between rounded-xl border px-4 py-4 text-left transition "+(st.id===child.id?"border-[#0C5898] bg-[#EAF4FB]":"border-[#E4EBF0] hover:bg-[#F7FAFC]")}>
     <div><p className="text-sm font-extrabold">{st.name}</p><p className="mt-1 text-xs text-[#657784]">{state.classes.find(c=>c.id===st.classId)?.name??"Por atribuir"}</p></div><ChevronRight size={16} aria-hidden className="text-[#0C5898]"/>
    </button>)}</div>
   </section>
   <div className="space-y-5">
    <section className="rounded-2xl border border-[#DFE8EF] bg-white p-5 sm:p-6">
     <div className="flex flex-wrap items-center justify-between gap-3">
      <div><p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#0C5898]">Ficha de acompanhamento</p>
      <h2 className="mt-2 text-xl font-extrabold">{child.name}</h2>
      <p className="mt-1 text-xs text-[#657784]">{child.grade}.ª classe · {classes?.name??"Turma por atribuir"}</p></div>
      {unresolved.length>0?<span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800"><AlertCircle size={15}/> {unresolved.length} ocorrência(s) por resolver</span>:<span className="rounded-full bg-[#EDF6F0] px-3 py-2 text-xs font-bold text-emerald-800">Sem ocorrências pendentes</span>}
     </div>
     <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">{[
      {label:"Média publicada",value:grades.length?average(grades.map(g=>g.score))+"/20":"—"},
      {label:"Assiduidade",value:attendanceRate(state,[child.id])+"%"},
      {label:"Trabalhos pendentes",value:assignmentsDue.length},
      {label:"Obrigações",value:fees.length}
     ].map(x=><div key={x.label} className="rounded-xl bg-[#F4F8FA] p-3"><p className="text-[11px] text-[#627582]">{x.label}</p><p className="mt-2 text-xl font-extrabold">{x.value}</p></div>)}</div>
     {fees.length>0&&<p className="mt-4 rounded-xl bg-[#FFF8EC] p-3 text-xs text-[#885720]">Montante pendente no cenário: {mt(fees.reduce((sum,f)=>sum+f.amount,0))}. Esta informação está reservada ao Encarregado.</p>}
    </section>
    <section className="rounded-2xl border border-[#DFE8EF] bg-white p-5 sm:p-6">
     <h2 className="text-base font-extrabold">Próximas ações e resultados</h2>
     <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <Link to="/app/guardian/schedule" className="flex items-center justify-between gap-2 rounded-xl border border-[#DFE8EF] p-4 text-sm font-bold text-[#0C5898] hover:bg-[#F4F9FC]"><span className="flex items-center gap-2"><CalendarDays size={17}/> Horário semanal</span><ChevronRight size={15}/></Link>
      <Link to="/app/guardian/learning" className="flex items-center justify-between gap-2 rounded-xl border border-[#DFE8EF] p-4 text-sm font-bold text-[#0C5898] hover:bg-[#F4F9FC]"><span className="flex items-center gap-2"><BookOpen size={17}/> Trabalhos escolares</span><ChevronRight size={15}/></Link>
      <Link to="/app/guardian/grades" className="flex items-center justify-between gap-2 rounded-xl border border-[#DFE8EF] p-4 text-sm font-bold text-[#0C5898] hover:bg-[#F4F9FC]"><span className="flex items-center gap-2"><GraduationCap size={17}/> Notas publicadas</span><ChevronRight size={15}/></Link>
      <Link to="/app/guardian/justifications" className="flex items-center justify-between gap-2 rounded-xl border border-[#DFE8EF] p-4 text-sm font-bold text-[#0C5898] hover:bg-[#F4F9FC]"><span className="flex items-center gap-2"><AlertCircle size={17}/> Justificações</span><ChevronRight size={15}/></Link>
     </div>
     {grades.length>0&&<div className="mt-5 border-t border-[#E8EEF2] pt-4"><h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#667784]">Resultados recentes</h3>
      {grades.slice(-4).map(g=><div key={g.id} className="flex justify-between gap-3 border-b border-[#EBF0F3] py-2 text-xs"><span>{g.subject} · {g.term}.º trimestre</span><strong>{g.score}/20</strong></div>)}
     </div>}
    </section>
   </div>
  </div>
 </div>;
}

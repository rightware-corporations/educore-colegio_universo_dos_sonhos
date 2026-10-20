import { useGuardianChildSelection } from "../state/useGuardianChildSelection";
import { CalendarDays, Clock3, GraduationCap, MapPin, UserRound, BookOpen, Trash2 } from "lucide-react";
import { useDemo } from "../state/DemoProvider";
import { activeStudents, guardianStudents, type Lesson, type SchoolData } from "../data/school";
import type { Role } from "../config/roles";

/** Numeric weekday ISO: 1=Monday ... 5=Friday. Display all days in one scrollable document. */
export const SCHOOL_WEEK = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"] as const;
export const endOfLesson = (start:string, duration:number) => {
 const [hours,minutes]=start.split(":").map(Number);
 const sum=hours*60+minutes+duration;
 return String(Math.floor(sum/60)).padStart(2,"0")+":"+String(sum%60).padStart(2,"0");
};
export const orderedLessons = (lessons:Lesson[]) => [...lessons].sort(
 (a,b)=>a.weekday-b.weekday||a.start.localeCompare(b.start)||a.room.localeCompare(b.room)
);
export function WeeklyLessonList({data,lessons,onRemove}:{data:SchoolData;lessons:Lesson[];onRemove?:(id:string)=>void}){
 const ordered=orderedLessons(lessons);
 return <div className="space-y-5" aria-label="Horário semanal completo">
  {SCHOOL_WEEK.map((day,index)=>{
   const rows=ordered.filter(l=>l.weekday===index+1);
   return <section key={day} className="overflow-hidden rounded-2xl border border-[#E0E8EE] bg-[#FFFEFC]" aria-label={day}>
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7EDF1] bg-[#F6F8FA] px-5 py-4 sm:px-6">
     <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0C5898]/10 text-xs font-extrabold text-[#0C5898]">{String(index+1).padStart(2,"0")}</span>
      <h3 className="text-base font-extrabold tracking-tight text-[#071A2A]">{day}</h3></div>
     <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#657681]">{rows.length} {rows.length===1?"aula":"aulas"}</span>
    </div>
    {rows.length===0?<p className="px-5 py-6 text-sm text-[#71808A] sm:px-6">Sem aulas registadas para este dia.</p>:
    <ol className="divide-y divide-[#E9EEF2]">{rows.map(l=>{
     const teacher=data.staff.find(t=>t.id===l.teacherId);
     const schoolClass=data.classes.find(c=>c.id===l.classId);
     return <li key={l.id} className="group flex flex-wrap items-center gap-3 px-4 py-4 transition hover:bg-[#F8FBFD] sm:gap-5 sm:px-6">
      <div className="w-[70px] shrink-0 border-r-2 border-[#0C5898]/25 pr-3 sm:w-[88px]">
       <p className="text-sm font-extrabold tabular-nums text-[#0C5898]">{l.start}</p>
       <p className="mt-1 text-[11px] tabular-nums text-[#687782]">{endOfLesson(l.start,l.minutes)}</p>
      </div>
      <div className="min-w-[140px] flex-[1_1_250px]">
       <p className="text-[14px] font-extrabold text-[#102231]">{teacher?.subject??"Disciplina não associada"}</p>
       <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#687782]">
        <span className="inline-flex items-center gap-1.5"><UserRound size={13} aria-hidden="true"/>{teacher?.name??"Docente por atribuir"}</span>
        <span className="inline-flex items-center gap-1.5"><MapPin size={13} aria-hidden="true"/>{l.room}</span>
        <span className="inline-flex items-center gap-1.5"><GraduationCap size={13} aria-hidden="true"/>{schoolClass?.name??"Turma"}</span>
       </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
       <span className="rounded-full bg-[#EAF2F8] px-3 py-1.5 text-[11px] font-bold text-[#0C5898]">{l.minutes} min</span>
       {onRemove&&<button type="button" onClick={()=>onRemove(l.id)} aria-label={"Remover aula "+l.id} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-[#E9CED0] px-3 text-[11px] font-bold text-[#A33438] transition hover:bg-red-50"><Trash2 size={14}/> Remover</button>}
      </div>
     </li>
    })}</ol>}
   </section>;
  })}
 </div>;
}
export function RoleWeeklyTimetable({role}:{role:Extract<Role,"student"|"guardian"|"teacher">}){
 const {state}=useDemo();
 const children=guardianStudents(state);
 const [selectedChild,setSelectedChild]=useGuardianChildSelection();
 const student=role==="student"?state.students.find(s=>s.id==="ALU-001"):
  role==="guardian"?children.find(s=>s.id===selectedChild)??children[0]:undefined;
 const enrolled=activeStudents(state).some(x=>x.id===student?.id);
 const visible=role==="teacher"?
  state.lessons.filter(l=>l.teacherId==="PROF-001"):
  enrolled?state.lessons.filter(l=>l.classId===student?.classId):[];
 const label=role==="teacher"?"Elisa Simango · Turmas atribuídas":student?.name+" · "+state.classes.find(c=>c.id===student?.classId)?.name;
 return <div className="space-y-6">
  <div className="relative overflow-hidden rounded-[26px] bg-[#071A2A] px-6 py-8 text-white sm:px-10">
   <span className="pointer-events-none absolute -right-20 -top-36 h-[370px] w-[370px] rounded-full border-[65px] border-[#0C5898]/25"/>
   <div className="relative flex flex-wrap items-end justify-between gap-4"><div>
    <p className="text-[11px] font-extrabold uppercase tracking-[.21em] text-[#F18136]">Agenda académica · 2026</p>
    <h1 className="mt-3 font-display text-[clamp(38px,4vw,58px)] leading-tight">Horário semanal</h1>
    <p className="mt-3 max-w-lg text-sm leading-7 text-white/70">Todas as aulas de segunda a sexta-feira numa única lista, organizadas por dia e hora.</p>
   </div>
   <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-bold"><CalendarDays size={17} className="text-[#F18136]"/> {visible.length} aulas registadas</div></div>
  </div>
  {role==="guardian"&&<div className="rounded-2xl border border-[#E0E8EE] bg-white p-5"><label htmlFor="guardian-child-timetable" className="mb-2 block text-xs font-extrabold text-[#425563]">Educando</label>
   <select id="guardian-child-timetable" value={student?.id??""} onChange={e=>setSelectedChild(e.target.value)} className="h-11 w-full max-w-sm rounded-xl border border-[#DCE4EA] bg-white px-3 text-sm">{children.map(s=><option key={s.id} value={s.id}>{s.name} · {s.grade}.ª classe</option>)}</select></div>}
  <div className="flex flex-wrap items-center justify-between gap-3"><div>
   <h2 className="text-lg font-extrabold">{role==="teacher"?"Minhas aulas":"Aulas da turma"}</h2>
   <p className="mt-1 text-xs text-[#687782]">{label??"Por atribuir"}</p></div>
   <p className="inline-flex items-center gap-2 text-xs text-[#687782]"><Clock3 size={15}/> Segunda a sexta-feira</p>
  </div>
  <WeeklyLessonList data={state} lessons={visible}/>
  <p className="inline-flex items-start gap-2 text-xs leading-6 text-[#687782]"><BookOpen size={15} className="mt-0.5 shrink-0"/> Horários demonstrativos configurados pela Pedagogia. A programação efetiva da escola necessita de validação institucional.</p>
 </div>;
}

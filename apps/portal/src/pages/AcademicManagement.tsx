import { useMemo, useState } from "react";
import { CalendarDays, Check, ChevronRight, Clock3, GraduationCap, Plus, Search, Settings2, SlidersHorizontal, UserRoundPlus, Users, X } from "lucide-react";
import { useDemo } from "../state/DemoProvider";
import { CURRICULUM, GRADE_NOTE, subjectsFor } from "../data/curriculum";
import { activeStudents, type SchoolClass } from "../data/school";

const field="h-11 w-full min-w-0 rounded-xl border border-[#DCE4EA] bg-white px-3 text-sm outline-none focus:border-[#0C5898] focus:ring-2 focus:ring-[#0C5898]/15";
const label="space-y-2 text-xs font-bold text-[#425563]";
const btn="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0C5898] px-4 text-xs font-bold text-white hover:bg-[#084979]";
const small="inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#DCE4EA] bg-white px-3 text-xs font-bold text-[#0C5898] hover:bg-[#F0F6FB]";
const days=["Segunda","Terça","Quarta","Quinta","Sexta"];
const clock=(h:string)=>{const [a,b]=h.split(":").map(Number);return a*60+b;};
function Frame({eyebrow,title,description,children,side}:{eyebrow:string;title:string;description:string;children:React.ReactNode;side?:React.ReactNode}){
 return <div className="space-y-6">
  <div className="relative overflow-hidden rounded-[28px] bg-[#071A2A] px-7 py-8 text-white sm:px-10 sm:py-10">
   <div className="pointer-events-none absolute -right-16 -top-28 h-[330px] w-[330px] rounded-full border-[58px] border-[#0C5898]/35"/>
   <div className="relative flex flex-wrap items-end justify-between gap-6">
    <div><p className="text-[11px] font-extrabold uppercase tracking-[.21em] text-[#F18136]">{eyebrow}</p>
     <h2 className="mt-3 font-display text-[clamp(37px,4vw,57px)] leading-none">{title}</h2>
     <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">{description}</p>
    </div>{side}
   </div>
  </div>
  {children}
 </div>;
}
function Surface({title,sub,children,action}:{title:string;sub?:string;children:React.ReactNode;action?:React.ReactNode}){
 return <section className="rounded-2xl border border-[#DCE4EA] bg-white p-5 shadow-[0_12px_34px_rgba(7,26,42,.035)] sm:p-6">
  <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-base font-extrabold">{title}</h3>{sub&&<p className="mt-1 text-xs leading-6 text-[#687782]">{sub}</p>}</div>{action}</div>{children}
 </section>;
}
function NumberMetric({n,title}:{n:string|number;title:string}){return <div className="min-w-[115px] rounded-xl border border-white/20 bg-white/10 px-4 py-3"><p className="text-xl font-extrabold">{n}</p><p className="mt-1 text-[11px] text-white/65">{title}</p></div>;}
export function ClassesManagement(){
 const {state,createClass,updateClass}=useDemo();
 const [query,setQuery]=useState("");const [selected,setSelected]=useState(state.classes[0]?.id??"");
 const [open,setOpen]=useState(false),[grade,setGrade]=useState(8),[letter,setLetter]=useState("A"),[capacity,setCapacity]=useState(30);
 const [editing,setEditing]=useState(false),[newCapacity,setNewCapacity]=useState(30);
 const students=activeStudents(state);
 const classes=state.classes.filter(c=>c.name.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>a.grade-b.grade||a.name.localeCompare(b.name));
 const current=state.classes.find(c=>c.id===selected);
 const total=state.classes.reduce((n,c)=>n+(c.active?1:0),0);
 const occupied=current?students.filter(s=>s.classId===current.id):[];
 function select(c:SchoolClass){setSelected(c.id);setNewCapacity(c.capacity);setEditing(false);}
 return <Frame eyebrow="Estrutura académica" title="Classes e turmas" description="Gerir a oferta ativa, capacidade, ocupação e acompanhamento de cada turma." side={<div className="flex gap-2"><NumberMetric n={total} title="Turmas ativas"/><NumberMetric n={students.length} title="Alunos registados"/></div>}>
  <div className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
   <Surface title="Mapa de turmas" sub="Selecione uma turma para consultar os seus detalhes." action={<button className={btn} onClick={()=>setOpen(x=>!x)}><Plus size={15}/> Nova turma</button>}>
    {open&&<form className="mb-5 grid gap-3 rounded-2xl bg-[#F0F6FB] p-4 sm:grid-cols-[1fr_1fr_1fr_auto]" onSubmit={e=>{e.preventDefault();createClass(grade,letter,capacity);setOpen(false);setSelected("CL-"+String(grade).padStart(2,"0")+"-"+letter.toUpperCase());}}>
     <label className={label}>Classe<select aria-label="Nova classe" value={grade} onChange={e=>setGrade(Number(e.target.value))} className={field}>{CURRICULUM.map(x=><option value={x.grade} key={x.grade}>{x.label}</option>)}</select></label>
     <label className={label}>Turma<select aria-label="Letra da turma" value={letter} onChange={e=>setLetter(e.target.value)} className={field}>{["A","B","C","D","E"].map(x=><option key={x}>{x}</option>)}</select></label>
     <label className={label}>Lotação<input aria-label="Lotação da nova turma" type="number" min="5" max="60" className={field} value={capacity} onChange={e=>setCapacity(Number(e.target.value))}/></label>
     <button className={btn+" self-end"}>Criar</button>
    </form>}
    <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#DCE4EA] px-3"><Search size={16} className="text-[#657580]"/><input className="h-11 w-full bg-transparent text-sm outline-none" placeholder="Pesquisar turmas…" aria-label="Pesquisar turmas" value={query} onChange={e=>setQuery(e.target.value)}/></div>
    <div className="space-y-2">{classes.map(c=>{
     const count=students.filter(s=>s.classId===c.id).length;
     const active=selected===c.id;
     return <button key={c.id} onClick={()=>select(c)} className={"flex w-full items-center justify-between gap-3 rounded-xl border p-4 text-left transition "+(active?"border-[#0C5898] bg-[#EFF6FC]":"border-[#E4EBF0] hover:border-[#A5BFCE]")}>
      <span className="flex items-center gap-3"><span className={"flex h-11 w-11 items-center justify-center rounded-xl font-extrabold "+(active?"bg-[#0C5898] text-white":"bg-[#E9F1F6] text-[#0C5898]")}>{c.name.split(" ")[0]}</span>
      <span><strong className="block text-sm">{c.name}</strong><span className="mt-1 block text-xs text-[#687782]">{count} de {c.capacity} lugares · {c.active?"Ativa":"Inativa"}</span></span></span><ChevronRight size={17} className="shrink-0 text-[#98ACBA]"/>
     </button>})}{classes.length===0&&<p className="text-sm text-[#687782]">Nenhuma turma encontrada.</p>}</div>
   </Surface>
   <div className="space-y-5">
    <Surface title={current?"Turma "+current.name:"Selecionar turma"} sub="Detalhes, capacidade e professores">
     {current?<div className="space-y-5">
      <div className="grid grid-cols-2 gap-3"><div className="rounded-xl bg-[#F1F6FA] p-4"><GraduationCap size={18} className="text-[#0C5898]"/><p className="mt-3 text-2xl font-extrabold">{occupied.length}</p><p className="text-xs text-[#697A84]">Alunos ativos</p></div><div className="rounded-xl bg-[#F1F6FA] p-4"><Users size={18} className="text-[#0C5898]"/><p className="mt-3 text-2xl font-extrabold">{current.capacity-occupied.length}</p><p className="text-xs text-[#697A84]">Lugares disponíveis</p></div></div>
      <div><div className="mb-2 flex justify-between text-xs font-bold"><span>Ocupação</span><span>{Math.round(occupied.length/current.capacity*100)}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#E6ECF1]"><div className="h-full rounded-full bg-[#0C5898]" style={{width:Math.min(100,occupied.length/current.capacity*100)+"%"}}/></div></div>
      <div><p className="text-xs font-bold uppercase tracking-wider text-[#687782]">Docentes associados</p><div className="mt-3 space-y-2">{state.staff.filter(x=>x.role==="teacher"&&x.classIds?.includes(current.id)).map(x=><p className="rounded-lg bg-[#F5F8FA] p-3 text-xs" key={x.id}><strong>{x.name}</strong> · {x.subject}</p>)}{!state.staff.some(x=>x.role==="teacher"&&x.classIds?.includes(current.id))&&<p className="text-xs text-[#687782]">Nenhum docente atribuído. Utiliza Atribuições.</p>}</div></div>
      {editing?<form onSubmit={e=>{e.preventDefault();updateClass(current.id,newCapacity,current.active);setEditing(false);}} className="flex items-end gap-2"><label className={label+" flex-1"}>Nova capacidade<input aria-label="Nova capacidade" type="number" min={Math.max(5,occupied.length)} max="60" className={field} value={newCapacity} onChange={e=>setNewCapacity(Number(e.target.value))}/></label><button className={btn}>Guardar</button><button type="button" className={small} onClick={()=>setEditing(false)}><X size={14}/></button></form>:<button className={small} onClick={()=>{setEditing(true);setNewCapacity(current.capacity);}}><Settings2 size={14}/> Ajustar capacidade</button>}
     </div>:<p className="text-sm text-[#687782]">Escolha uma turma na lista.</p>}
    </Surface>
    {current&&<Surface title="Alunos desta turma" sub="Pré-visualização do cadastro atualizado"><div className="max-h-[330px] space-y-2 overflow-y-auto pr-2">{occupied.slice(0,40).map(s=><p key={s.id} className="flex justify-between gap-3 rounded-lg border border-[#E9EDF2] px-3 py-2.5 text-xs"><span className="font-bold">{s.name}</span><span className="text-[#81909A]">{s.id}</span></p>)}</div></Surface>}
   </div>
  </div>
 </Frame>;
}
export function TeachersManagement(){
 const {state,createTeacher}=useDemo();const [open,setOpen]=useState(false),[name,setName]=useState(""),[subject,setSubject]=useState("Matemática"),[query,setQuery]=useState("");
 const teachers=state.staff.filter(x=>x.role==="teacher"&&[x.name,x.subject].join(" ").toLowerCase().includes(query.toLowerCase()));
 const subjects=Array.from(new Set(CURRICULUM.flatMap(x=>x.subjects))).sort();
 return <Frame eyebrow="Corpo docente" title="Professores" description="Equipa escolar, disciplinas e distribuição de docentes pelos níveis de ensino." side={<NumberMetric n={state.staff.filter(x=>x.role==="teacher").length} title="Docentes registados"/>}>
  <Surface title="Diretório docente" sub="Atribua as turmas no módulo de Atribuições." action={<button className={btn} onClick={()=>setOpen(x=>!x)}><UserRoundPlus size={16}/> Registar professor</button>}>
   {open&&<form className="mb-6 flex flex-wrap items-end gap-3 rounded-2xl bg-[#F0F6FB] p-4" onSubmit={e=>{e.preventDefault();createTeacher(name,subject);setName("");setOpen(false);}}>
    <label className={label+" min-w-[190px] flex-1"}>Nome completo<input aria-label="Nome do professor" required minLength={3} maxLength={90} value={name} onChange={e=>setName(e.target.value)} className={field}/></label>
    <label className={label+" min-w-[190px] flex-1"}>Disciplina<select aria-label="Disciplina do professor" value={subject} onChange={e=>setSubject(e.target.value)} className={field}>{subjects.map(x=><option key={x}>{x}</option>)}</select></label>
    <button className={btn}><Check size={15}/> Guardar professor</button>
   </form>}
   <div className="mb-5 flex items-center gap-2 rounded-xl border border-[#DCE4EA] px-3"><Search size={16}/><input className="h-11 w-full outline-none" aria-label="Pesquisar professores" placeholder="Pesquisar nome ou disciplina" value={query} onChange={e=>setQuery(e.target.value)}/></div>
   <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">{teachers.map((t,i)=><div key={t.id} className="flex gap-4 rounded-2xl border border-[#E3EAF0] p-4">
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#0C5898]/10 text-base font-extrabold text-[#0C5898]">{t.name.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
    <div className="min-w-0"><p className="text-sm font-extrabold">{t.name}</p><p className="mt-1 text-xs text-[#657680]">{t.subject}</p><p className="mt-3 text-[11px] font-semibold text-[#0C5898]">{t.classIds?.length??0} turmas atribuídas</p><p className="mt-1 text-[11px] text-[#657680]">{(t.classIds??[]).map(id=>state.classes.find(c=>c.id===id)?.name).join(" · ")||"A aguardar atribuição"}</p></div>
   </div>)}</div>
   <p className="mt-5 text-xs leading-6 text-[#9A6B25]">Os nomes e dados docentes desta área são fictícios e destinam-se à avaliação da plataforma.</p>
  </Surface>
 </Frame>;
}
export function AssignmentsManagement(){
 const {state,assignTeacher}=useDemo();const [classId,setClassId]=useState("CL-09-A");
 const current=state.classes.find(c=>c.id===classId);
 const eligible=state.staff.filter(t=>t.role==="teacher"&&(current?subjectsFor(current.grade).includes(t.subject??""):false));
 const allTeachers=state.staff.filter(t=>t.role==="teacher");
 return <Frame eyebrow="Distribuição curricular" title="Atribuições docentes" description="Defina quem leciona cada disciplina em cada turma. As alterações refletem-se nos horários e nas áreas docentes." side={<NumberMetric n={allTeachers.reduce((n,t)=>n+(t.classIds?.length??0),0)} title="Atribuições ativas"/>}>
  <div className="grid gap-5 lg:grid-cols-[310px_minmax(0,1fr)]">
   <Surface title="Selecionar turma" sub="Turmas disponíveis no cenário">
    <div className="space-y-2">{state.classes.filter(x=>x.active).map(c=><button key={c.id} onClick={()=>setClassId(c.id)} className={"flex w-full items-center justify-between rounded-xl p-3 text-left text-sm font-bold "+(c.id===classId?"bg-[#0C5898] text-white":"bg-[#F2F6F9] text-[#223746] hover:bg-[#E8F0F5]")}><span>{c.name}</span><ChevronRight size={15}/></button>)}</div>
   </Surface>
   <Surface title={"Plano de docentes · "+(current?.name??"")} sub="Só aparecem docentes cujas disciplinas constam do plano de referência da classe.">
    <div className="space-y-3">{eligible.map(t=>{
      const assigned=t.classIds?.includes(classId)??false;const sessions=state.lessons.filter(x=>x.teacherId===t.id&&x.classId===classId).length;
      return <div key={t.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E2E9EF] p-4"><div><p className="text-sm font-extrabold">{t.name}</p><p className="mt-1 text-xs text-[#697985]">{t.subject} · {sessions} aulas no horário</p></div>
       <button aria-label={(assigned?"Retirar ":"Atribuir ")+t.name} disabled={assigned&&sessions>0} onClick={()=>assignTeacher(t.id,classId,!assigned)} className={assigned?"rounded-xl border border-[#B5D8C8] bg-[#EBF8F2] px-4 py-2.5 text-xs font-bold text-[#147650] disabled:opacity-50":"rounded-xl bg-[#0C5898] px-4 py-2.5 text-xs font-bold text-white"}>
        {assigned?"Atribuído ✓":"Atribuir"}
       </button></div>;
     })}
     {eligible.length===0&&<p className="rounded-xl bg-[#F6F8FA] p-4 text-sm text-[#697985]">Não há professores de disciplinas compatíveis. Registe um docente.</p>}
    </div>
    <p className="mt-5 text-xs text-[#8A6330]">Atribuições com aulas marcadas não podem ser removidas antes de ajustar o horário.</p>
   </Surface>
  </div>
 </Frame>;
}
export function TimetableManagement(){
 const {state,addLesson,removeLesson}=useDemo();
 const [classId,setClassId]=useState("CL-09-A"),[weekday,setWeekday]=useState(1),[teacherId,setTeacherId]=useState("PROF-001"),[start,setStart]=useState("11:00"),[minutes,setMinutes]=useState(45),[room,setRoom]=useState("A12"),[error,setError]=useState("");
 const [open,setOpen]=useState(false);
 const assigned=state.staff.filter(t=>t.role==="teacher"&&t.classIds?.includes(classId));
 const classes=state.classes.filter(x=>x.active);
 const weekly=state.lessons.filter(x=>x.classId===classId).sort((a,b)=>a.weekday-b.weekday||clock(a.start)-clock(b.start));
 const missing=state.classes.find(x=>x.id===classId)?.name??"";
 function save(e:React.FormEvent){
  e.preventDefault();setError("");
  if(!assigned.some(x=>x.id===teacherId)){setError("Selecione um professor atribuído à turma.");return;}
  const at=clock(start),end=at+minutes;
  const conflict=state.lessons.some(l=>l.weekday===weekday&&at<clock(l.start)+l.minutes&&end>clock(l.start)&&
   (l.classId===classId||l.teacherId===teacherId||l.room.toUpperCase()===room.trim().toUpperCase()));
  if(conflict){setError("Conflito de horário: turma, professor ou sala já ocupada.");return;}
  addLesson({classId,teacherId,weekday,start,minutes,room});setOpen(false);
 }
 return <Frame eyebrow="Planeamento semanal" title="Horários de aulas" description="Construa a agenda semanal, verifique conflitos de professor, sala e turma e mantenha o calendário académico consistente." side={<NumberMetric n={weekly.length} title="Aulas desta turma"/>}>
  <Surface title="Planeamento" sub="Aulas semanais do cenário escolar; sem calendário institucional homologado." action={<button className={btn} onClick={()=>setOpen(x=>!x)}><Plus size={15}/> Adicionar aula</button>}>
   <label className={label+" mb-5 block max-w-xs"}>Turma<select aria-label="Filtrar horário por turma" value={classId} onChange={e=>{setClassId(e.target.value);setError("");}} className={field}>{classes.map(c=><option value={c.id} key={c.id}>{c.name}</option>)}</select></label>
   {open&&<form onSubmit={save} className="mb-6 grid gap-3 rounded-2xl bg-[#F0F6FB] p-4 sm:grid-cols-2 xl:grid-cols-4">
     <label className={label}>Dia<select aria-label="Dia da aula" className={field} value={weekday} onChange={e=>setWeekday(Number(e.target.value))}>{days.map((x,i)=><option key={x} value={i+1}>{x}</option>)}</select></label>
     <label className={label}>Professor<select aria-label="Professor da aula" className={field} value={teacherId} onChange={e=>setTeacherId(e.target.value)}>
      <option value="">Selecionar docente</option>{assigned.map(t=><option value={t.id} key={t.id}>{t.name} · {t.subject}</option>)}</select></label>
     <label className={label}>Início<input aria-label="Início da aula" className={field} type="time" min="07:00" max="17:30" value={start} onChange={e=>setStart(e.target.value)}/></label>
     <label className={label}>Duração<select aria-label="Duração" className={field} value={minutes} onChange={e=>setMinutes(Number(e.target.value))}>{[40,45,50,60,90].map(x=><option key={x} value={x}>{x} minutos</option>)}</select></label>
     <label className={label}>Sala<input aria-label="Sala" value={room} maxLength={18} required onChange={e=>setRoom(e.target.value)} className={field}/></label>
     <div className="flex items-end"><button className={btn}><Check size={15}/> Guardar aula</button></div>
     {error&&<p role="alert" className="col-span-full rounded-lg bg-red-50 p-3 text-xs font-bold text-red-800">{error}</p>}
   </form>}
   <div className="grid gap-3 lg:grid-cols-5">{days.map((day,i)=><div key={day} className="min-h-[240px] rounded-2xl bg-[#F5F8FA] p-3">
    <h3 className="mb-4 border-b border-[#DCE5ED] pb-3 text-xs font-extrabold text-[#425664]">{day}</h3>
    <div className="space-y-2">{weekly.filter(l=>l.weekday===i+1).map(l=>{
     const teacher=state.staff.find(t=>t.id===l.teacherId);
     return <div className="rounded-xl border-l-4 border-l-[#F18136] bg-white p-3 shadow-sm" key={l.id}>
      <p className="text-[11px] font-extrabold text-[#0C5898]">{l.start} · {l.minutes}min</p>
      <p className="mt-2 text-xs font-bold">{teacher?.subject}</p><p className="mt-1 text-[11px] text-[#687986]">{teacher?.name}</p>
      <div className="mt-2 flex justify-between text-[10px] text-[#687986]"><span>{l.room}</span><button aria-label={"Remover aula "+l.id} className="text-red-700 hover:underline" onClick={()=>removeLesson(l.id)}>Remover</button></div>
     </div>})}{!weekly.some(l=>l.weekday===i+1)&&<p className="py-5 text-center text-[11px] text-[#90A0A9]">Sem aulas definidas</p>}</div>
   </div>)}</div>
   <p className="mt-5 flex items-center gap-2 text-xs text-[#687986]"><Clock3 size={15}/> {missing}: {weekly.length} aulas semanais. As colisões são recusadas ao guardar.</p>
  </Surface>
 </Frame>;
}

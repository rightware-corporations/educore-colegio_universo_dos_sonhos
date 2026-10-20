import { Link } from "react-router-dom";
import { AlertCircle, ArrowUpRight, BookOpen, CalendarDays, CheckCircle2, ChevronRight, ClipboardCheck, CreditCard, FileText, GraduationCap, Users } from "lucide-react";
import { useDemo } from "../state/DemoProvider";
import { activeStudents, guardianStudents, mt } from "../data/school";
import type { Role } from "../config/roles";

const linkStyle="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-[#0C5898] px-4 text-xs font-extrabold text-white transition hover:bg-[#084672] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F18136]";
function Notice({count,label,href,action}:{count:number;label:string;href:string;action:string}){
 return <Link to={href} className="group flex items-center justify-between gap-4 rounded-xl border border-[#E0E8EF] bg-white px-4 py-4 transition hover:border-[#0C5898]/40 hover:bg-[#F5F9FC]">
  <div className="flex items-center gap-3"><span className={"flex h-11 min-w-11 items-center justify-center rounded-xl text-lg font-extrabold "+(count>0?"bg-[#FFF0E5] text-[#A4531C]":"bg-[#EBF4EF] text-[#166A46]")}>{count}</span>
  <div><p className="text-sm font-bold text-[#142D3D]">{label}</p><p className="mt-1 text-[11px] text-[#71818B]">{count>0?action:"Sem tarefas pendentes"}</p></div></div>
  <ChevronRight aria-hidden size={17} className="shrink-0 text-[#8A9BA7] group-hover:text-[#0C5898]"/>
 </Link>;
}
function Shell({heading,kicker,description,children,action}:{heading:string;kicker:string;description:string;children:React.ReactNode;action?:React.ReactNode}){
 return <section aria-label={heading} className="overflow-hidden rounded-[24px] border border-[#DBE5EB] bg-white shadow-[0_12px_35px_rgba(7,26,42,.045)]">
  <div className="border-b border-[#E3EBF0] bg-gradient-to-r from-[#F3F8FC] to-white px-5 py-5 sm:px-6">
   <div className="flex flex-wrap items-start justify-between gap-4"><div>
    <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#0C5898]">{kicker}</p>
    <h2 className="mt-2 text-lg font-extrabold text-[#071A2A]">{heading}</h2>
    <p className="mt-1 max-w-xl text-xs leading-6 text-[#637784]">{description}</p></div>{action}</div>
  </div>
  <div className="space-y-3 px-4 py-5 sm:px-6">{children}</div>
 </section>;
}
export function OperationalPriorities({role}:{role:Role}){
 const {state}=useDemo();
 const students=activeStudents(state);
 if(role==="teacher"){
  const teacher=state.staff.find(x=>x.id==="PROF-001");
  const classes=state.classes.filter(c=>teacher?.classIds?.includes(c.id)&&c.active);
  const lessons=state.lessons.filter(l=>l.teacherId===teacher?.id);
  const submitted=state.workSubmissions.filter(s=>s.status==="submitted"&&state.learningItems.some(i=>i.id===s.itemId&&i.teacherId===teacher?.id));
  const pending=state.assessmentPlans.filter(p=>p.teacherId===teacher?.id&&p.status==="submitted");
  return <Shell kicker="Sala de professores" heading="As minhas prioridades" description="Aceda à chamada da aula certa e acompanhe os trabalhos e propostas pendentes."
   action={<Link className={linkStyle} to="/app/teacher/attendance"><ClipboardCheck size={16}/> Abrir chamada</Link>}>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
     <div className="rounded-xl bg-[#F4F8FA] p-3"><p className="text-[11px] text-[#647985]">Turmas atribuídas</p><p className="mt-1 text-2xl font-extrabold">{classes.length}</p></div>
     <div className="rounded-xl bg-[#F4F8FA] p-3"><p className="text-[11px] text-[#647985]">Aulas semanais</p><p className="mt-1 text-2xl font-extrabold">{lessons.length}</p></div>
     <div className="col-span-2 rounded-xl bg-[#F4F8FA] p-3 sm:col-span-1"><p className="text-[11px] text-[#647985]">Entregas por rever</p><p className="mt-1 text-2xl font-extrabold">{submitted.length}</p></div>
    </div>
    {classes.map(c=><Link key={c.id} to="/app/teacher/classes" className="flex items-center justify-between rounded-xl border border-[#E3EAF0] p-3 hover:bg-[#F7FAFC]">
     <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7F1F8] text-xs font-extrabold text-[#0C5898]">{c.name}</span>
      <div><p className="text-xs font-extrabold">{students.filter(s=>s.classId===c.id).length} alunos</p><p className="mt-1 text-[11px] text-[#687782]">{lessons.filter(l=>l.classId===c.id).length} aulas por semana</p></div></div><ChevronRight size={16} aria-hidden className="text-[#8FA1AD]"/>
    </Link>)}
    <div className="flex flex-wrap gap-3 border-t border-[#E5ECF1] pt-4">
     <Link to="/app/teacher/learning" className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0C5898]"><BookOpen size={16}/>{submitted.length} trabalhos por rever <ArrowUpRight size={14}/></Link>
     <Link to="/app/teacher/assessments" className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0C5898]"><CalendarDays size={16}/>{pending.length} propostas em análise <ArrowUpRight size={14}/></Link>
    </div>
   </Shell>;
 }
 if(role==="guardian"){
  const children=guardianStudents(state);
  return <Shell kicker="Família e escola" heading="Os meus educandos" description="Acompanhe cada filho individualmente. As ocorrências refletem os registos disponíveis, não uma data fixa."
   action={<Link to="/app/guardian/children" className={linkStyle}><Users size={16}/> Ver educandos</Link>}>
   {children.map(st=>{
    const incidents=state.attendance.filter(a=>a.studentId===st.id&&a.status!=="present");
    const pendingJust=incidents.filter(a=>!state.justifications.some(j=>j.attendanceId===a.id&&j.status==="approved"));
    const pendingFees=state.fees.filter(f=>f.studentId===st.id&&f.status!=="validated");
    const planned=state.assessmentPlans.filter(a=>a.status==="approved"&&a.classId===st.classId).length;
    return <article key={st.id} className="rounded-2xl border border-[#DEE8EF] px-4 py-4 sm:px-5">
     <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6F2F9] text-sm font-extrabold text-[#0C5898]">{st.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</span>
      <div><h3 className="text-sm font-extrabold">{st.name}</h3><p className="mt-1 text-xs text-[#657782]">{state.classes.find(c=>c.id===st.classId)?.name??"Turma por atribuir"} · {st.grade}.ª classe</p></div></div>
      {pendingJust.length>0?<span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-bold text-amber-800"><AlertCircle size={13}/> Falta registada · {pendingJust.length} por resolver</span>:<span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-800">{incidents.length>0?"Ocorrências analisadas":"Sem ocorrências registadas"}</span>}
     </div>
     <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#E6EDF1] pt-3 text-[11px] text-[#687782]">
      <span><strong className="text-[#142D3D]">{planned}</strong> avaliações no calendário</span>
      <span><strong className="text-[#142D3D]">{pendingFees.length}</strong> obrigações por regularizar</span>
     </div>
     <div className="mt-3 flex flex-wrap gap-3 text-xs font-bold text-[#0C5898]">
      <Link to="/app/guardian/justifications" className="hover:underline">Justificações →</Link>
      <Link to="/app/guardian/schedule" className="hover:underline">Horário semanal →</Link>
      <Link to="/app/guardian/assessments" className="hover:underline">Avaliações →</Link>
     </div>
    </article>;
   })}
   {children.length===0&&<p className="text-sm text-[#697B86]">Nenhum educando associado a esta conta demonstrativa.</p>}
  </Shell>;
 }
 if(role==="finance"){
  const sent=state.fees.filter(f=>f.status==="submitted");
  const outstanding=state.fees.filter(f=>f.status==="pending"||f.status==="rejected");
  return <Shell kicker="Controlo financeiro" heading="Fila de validação" description="Cada comprovativo deve ser revisto no módulo de Finanças antes de uma decisão."
   action={<Link to="/app/finance/validation" className={linkStyle}><CreditCard size={16}/> Rever comprovativos</Link>}>
   <Notice count={sent.length} label="Comprovativos por analisar" href="/app/finance/validation" action="Verificar referências e decidir"/>
   <Notice count={outstanding.length} label="Obrigações por regularizar" href="/app/finance/obligations" action="Acompanhar cobranças fictícias"/>
   <div className="flex flex-wrap justify-between gap-2 rounded-xl bg-[#F2F7FA] px-4 py-3 text-xs"><span className="text-[#627783]">Total validado na demonstração</span><strong className="text-[#092A3C]">{mt(state.fees.filter(f=>f.status==="validated").reduce((sum,f)=>sum+f.amount,0))}</strong></div>
  </Shell>;
 }
 if(role==="secretary"){
  const unassigned=students.filter(s=>!s.classId);
  const admissions=state.admissions.filter(a=>a.status==="referred"||a.status==="review");
  const pendingDocuments=state.documents.filter(d=>d.status==="requested");
  return <Shell kicker="Operações administrativas" heading="Trabalho por concluir" description="Priorize matrículas, fichas por completar e pedidos documentais."
   action={<Link to="/app/secretary/students" className={linkStyle}><GraduationCap size={16}/> Abrir cadastro</Link>}>
   <Notice count={admissions.length} label="Processos de admissão" href="/app/secretary/admissions" action="Analisar e formalizar"/>
   <Notice count={unassigned.length} label="Alunos sem turma" href="/app/secretary/students" action="Consultar fichas e encaminhar à Pedagogia"/>
   <Notice count={pendingDocuments.length} label="Documentos por emitir" href="/app/secretary/documents" action="Emitir modelos documentais"/>
  </Shell>;
 }
 if(role==="reception"){
  const received=state.admissions.filter(a=>a.status==="received");
  const appointments=state.appointments.filter(a=>a.status==="requested");
  return <Shell kicker="Balcão de atendimento" heading="Pedidos e agendamentos" description="Receba processos e confirme marcações, sem aprovar matrículas ou pagamentos."
   action={<Link to="/app/reception/appointments" className={linkStyle}><CalendarDays size={16}/> Agenda de atendimento</Link>}>
    <Notice count={received.length} label="Novas candidaturas" href="/app/reception/admissions" action="Encaminhar à Secretaria"/>
    <Notice count={appointments.length} label="Marcações por confirmar" href="/app/reception/appointments" action="Verificar horários e decidir"/>
   </Shell>;
 }
 if(role==="pedagogy"){
  const plans=state.assessmentPlans.filter(a=>a.status==="submitted");
  const justifications=state.justifications.filter(j=>j.status==="submitted");
  return <Shell kicker="Coordenação pedagógica" heading="Decisões pendentes" description="Valide avaliações, analise justificações e acompanhe matrículas por atribuir."
   action={<Link to="/app/pedagogy/reviews" className={linkStyle}><CheckCircle2 size={16}/> Aprovações</Link>}>
    <Notice count={plans.length} label="Avaliações a aprovar" href="/app/pedagogy/reviews" action="Rever propostas dos professores"/>
    <Notice count={justifications.length} label="Justificações por analisar" href="/app/pedagogy/justifications" action="Analisar documentação da família"/>
    <Notice count={students.filter(s=>!s.classId).length} label="Alunos por colocar em turma" href="/app/pedagogy/assignments" action="Concluir atribuições"/>
   </Shell>;
 }
 if(role==="executive"){
  return <Shell kicker="Supervisão e indicadores" heading="Processos da instituição" description="Os números refletem exclusivamente as operações fictícias existentes no cenário."
   action={<Link to="/app/executive/reports" className={linkStyle}><FileText size={16}/> Relatório institucional</Link>}>
    <Notice count={state.assessmentPlans.filter(a=>a.status==="submitted").length} label="Aprovações académicas pendentes" href="/app/executive/reports" action="Consultar indicadores"/>
    <Notice count={state.interventions.filter(i=>i.status==="open").length} label="Acompanhamentos abertos" href="/app/executive/reports" action="Consultar resultados pedagógicos"/>
    <Notice count={state.fees.filter(f=>f.status==="submitted").length} label="Comprovativos pendentes" href="/app/executive/payments" action="Consultar situação financeira"/>
   </Shell>;
 }
 return <Shell kicker="Percurso académico" heading="Próximas tarefas" description="Materiais e trabalhos disponíveis para a turma."
  action={<Link to="/app/student/assignments" className={linkStyle}><BookOpen size={16}/> Consultar trabalhos</Link>}>
   <Notice count={state.learningItems.filter(i=>i.kind==="assignment"&&i.classId===state.students.find(s=>s.id==="ALU-001")?.classId&&!state.workSubmissions.some(w=>w.itemId===i.id&&w.studentId==="ALU-001")).length} label="Trabalhos por entregar" href="/app/student/assignments" action="Abrir atividades"/>
   <Notice count={state.assessmentPlans.filter(a=>a.status==="approved"&&a.classId===state.students.find(s=>s.id==="ALU-001")?.classId).length} label="Avaliações no calendário" href="/app/student/assessments" action="Consultar datas e disciplinas"/>
  </Shell>;
}

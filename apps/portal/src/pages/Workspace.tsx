import { Link, Navigate, useParams } from "react-router-dom";
import { Activity, ArrowRight, Bell, BookOpen, CalendarDays, CheckCircle2, ClipboardList, Clock, CreditCard, FileText, GraduationCap, HeartHandshake, Layers3, MessageCircle, ShieldCheck, TrendingUp, Users, Wallet } from "lucide-react";
import { ROLE_DEFS, isRole, type Role } from "../config/roles";
import { useDemo } from "../state/DemoProvider";
import { activeStudents, attendanceRate, average, guardianStudents, gradeSubjects, mt, paymentsReceived, type SchoolData } from "../data/school";
import { PageContainer } from "../components/PageContainer";
import { StatsCard } from "../components/StatsCard";
import { RoleWeeklyTimetable, orderedLessons, SCHOOL_WEEK, endOfLesson } from "../components/WeeklyTimetable";
import { QuickActionCard } from "../components/QuickActionCard";
import { AttendanceChart, FinanceChart, GradeDistribution, PerformanceChart } from "../components/SchoolCharts";
import { ClassesManagement, TeachersManagement, AssignmentsManagement, TimetableManagement } from "./AcademicManagement";
import { PedagogyAttendance, PedagogyAssessments } from "./AcademicMonitoring";
import { TeacherSessionAttendance, AbsenceCases, AssessmentWorkflow, NoticesWorkspace, DocumentsWorkspace, FinanceOperations, InterventionsWorkspace, ExecutiveReports } from "./OperationalWorkflows";
import { LearningWorkspace, StudentRecord } from "./LearningWorkflows";
import { SchoolAppointments } from "./SchoolAppointments";
import { GuardianChildren } from "./GuardianChildren";
import { OperationalPriorities } from "../components/DashboardActionCenter";
import { AdmissionsDesk, AttendanceDesk, ClassAssignments, CurriculumDesk, Empty, FinanceDesk, GradesDesk, LinkFeature, MessagesDesk, Panel, Pill, StudentRegistry } from "./SchoolModules";

const focusStudent="ALU-001";

function ActivityFeed({role}:{role:Role}){
 const {state}=useDemo();
 const familyIds=guardianStudents(state).map(s=>s.id);
 const scopedEvents=state.events.filter(e=>role==="executive" ||
  (role==="student"&&e.studentId==="ALU-001"&&["attendance","assessment"].includes(e.kind)) ||
  (role==="guardian"&&!!e.studentId&&familyIds.includes(e.studentId)&&["attendance","assessment","payment","message","student"].includes(e.kind)) ||
  (role==="teacher"&&!!e.studentId&&state.students.some(st=>st.id===e.studentId&&["CL-09-A","CL-11-B"].includes(st.classId??""))&&["attendance","assessment","message"].includes(e.kind)) ||
  (role==="pedagogy"&&["attendance","assessment","student"].includes(e.kind)) ||
  (role==="secretary"&&["student","admission"].includes(e.kind)) ||
  (role==="reception"&&e.kind==="admission") ||
  (role==="finance"&&e.kind==="payment")
 );
 return <Panel title="Atividade recente" subtitle="Histórico das operações realizadas neste ambiente.">
  {scopedEvents.length===0?<div className="rounded-2xl bg-[#F5F7F8] p-5"><p className="text-sm font-bold">Tudo preparado para começar.</p><p className="mt-2 text-xs leading-6 text-muted-foreground">Os movimentos escolares serão registados aqui à medida que os perfis executarem tarefas.</p></div>:
   <div className="space-y-4">{scopedEvents.slice(0,6).map(e=><div key={e.id} className="flex items-start gap-3 border-b border-border/60 pb-4 last:border-b-0 last:pb-0"><span className="rounded-xl bg-[#0C5898]/10 p-2 text-[#0C5898]"><Activity size={16}/></span><div className="min-w-0"><p className="text-xs font-extrabold">{e.title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{e.detail}</p></div></div>)}</div>}
 </Panel>;
}
const sum=(data:SchoolData,id:string)=>average(data.assessments.filter(a=>a.studentId===id&&a.published).map(a=>a.score));
function metrics(role:Role,s:SchoolData){
 const students=activeStudents(s),guardian=guardianStudents(s);
 const absences=s.attendance.filter(a=>a.status==="absent").length;
 const pending=s.assessments.filter(a=>!a.published).length;
 if(role==="student")return [
  {label:"Média atual",value:sum(s,focusStudent)+"/20",icon:TrendingUp},
  {label:"Assiduidade",value:attendanceRate(s,[focusStudent])+"%",icon:CheckCircle2},
  {label:"Disciplinas",value:gradeSubjects(9).length,icon:BookOpen},
  {label:"Avaliações publicadas",value:s.assessments.filter(a=>a.studentId===focusStudent&&a.published).length,icon:ClipboardList}
 ];
 if(role==="guardian")return [
  {label:"Educandos",value:guardian.length,icon:Users},
  {label:"Assiduidade",value:attendanceRate(s,guardian.map(x=>x.id))+"%",icon:CheckCircle2},
  {label:"Por regularizar",value:s.fees.filter(f=>guardian.some(x=>x.id===f.studentId)&&f.status!=="validated").length,icon:Wallet},
  {label:"Comunicações",value:s.messages.filter(m=>guardian.some(x=>x.id===m.studentId)).length,icon:Bell}
 ];
 if(role==="teacher")return [
  {label:"Turmas atribuídas",value:s.staff.find(t=>t.id==="PROF-001")?.classIds?.length??0,icon:Users},
  {label:"Alunos acompanhados",value:students.filter(x=>["CL-09-A","CL-11-B"].includes(x.classId??"")).length,icon:GraduationCap},
  {label:"Presenças registadas",value:s.attendance.filter(a=>a.teacherId==="PROF-001").length,icon:CheckCircle2},
  {label:"Notas pendentes",value:s.assessments.filter(a=>a.teacherId==="PROF-001"&&!a.published).length,icon:ClipboardList}
 ];
 if(role==="pedagogy")return [
  {label:"Turmas ativas",value:s.classes.filter(c=>c.active).length,icon:Layers3},
  {label:"Alunos sem turma",value:students.filter(x=>!x.classId).length,icon:Users},
  {label:"Avaliações por publicar",value:pending,icon:ClipboardList},
  {label:"Assiduidade global",value:attendanceRate(s)+"%",icon:TrendingUp}
 ];
 if(role==="reception")return [
  {label:"Pedidos recebidos",value:s.admissions.filter(a=>a.status==="received").length,icon:FileText},
  {label:"Encaminhados",value:s.admissions.filter(a=>a.status==="referred").length,icon:ArrowRight},
  {label:"Em análise",value:s.admissions.filter(a=>a.status==="review").length,icon:Clock},
  {label:"Marcações pendentes",value:s.appointments.filter(a=>a.status==="requested").length,icon:HeartHandshake}
 ];
 if(role==="secretary")return [
  {label:"Alunos ativos",value:students.length,icon:GraduationCap},
  {label:"Atribuição de turma",value:students.filter(x=>!x.classId).length,icon:Layers3},
  {label:"Matrículas processadas",value:s.admissions.filter(a=>a.status==="enrolled").length,icon:CheckCircle2},
  {label:"Pedidos por tratar",value:s.admissions.filter(a=>a.status==="referred"||a.status==="review").length,icon:FileText}
 ];
 if(role==="finance")return [
  {label:"Recebimentos validados",value:mt(paymentsReceived(s)),icon:Wallet},
  {label:"Obrigações por regularizar",value:s.fees.filter(f=>f.status==="pending"||f.status==="rejected").length,icon:Clock},
  {label:"Comprovativos em análise",value:s.fees.filter(f=>f.status==="submitted").length,icon:FileText},
  {label:"Obrigações registadas",value:s.fees.length,icon:CreditCard}
 ];
 return [
  {label:"Alunos ativos",value:students.length,icon:Users},
  {label:"Assiduidade global",value:attendanceRate(s)+"%",icon:CheckCircle2},
  {label:"Faltas registadas",value:absences,icon:ClipboardList},
  {label:"Recebimentos validados",value:mt(paymentsReceived(s)),icon:Wallet}
 ];
}
function WeekPreview({role}:{role:"teacher"|"student"}){
 const {state}=useDemo();
 const student=state.students.find(s=>s.id==="ALU-001");
 const relevant=state.lessons.filter(l=>role==="teacher"?l.teacherId==="PROF-001":l.classId===student?.classId);
 const preview=orderedLessons(relevant).slice(0,4);
 return <Panel title="Horário escolar" subtitle="Primeiras aulas da programação semanal" action={<Link to={"/app/"+role+"/schedule"} className="text-xs font-bold text-[#0C5898] hover:underline">Ver semana completa →</Link>}>
  <div className="space-y-2">{preview.map(l=><div key={l.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#E8EDF2] p-3">
   <span className="w-24 shrink-0 text-[11px] font-extrabold text-[#0C5898]">{SCHOOL_WEEK[l.weekday-1]?.split("-")[0]} · {l.start}</span>
   <div className="min-w-0 flex-1"><p className="text-xs font-extrabold">{state.staff.find(t=>t.id===l.teacherId)?.subject??"Disciplina"}</p>
    <p className="mt-1 text-[11px] text-[#687782]">{endOfLesson(l.start,l.minutes)} · {l.room} · {state.classes.find(c=>c.id===l.classId)?.name}</p></div>
  </div>)}
  {preview.length===0&&<p className="text-xs text-[#687782]">Ainda não há aulas registadas.</p>}</div>
 </Panel>;
}
function PeopleSpotlight(){
 const {state}=useDemo();
 return <Panel title="Corpo docente e atribuições" subtitle="Professores e ligações curriculares do cenário escolar.">
 <div className="grid gap-3 sm:grid-cols-2">{state.staff.filter(s=>s.role==="teacher").map(st=><div key={st.id} className="flex items-center gap-3 rounded-xl bg-[#F5F7F8] p-4">
  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0C5898]/10 text-xs font-extrabold text-[#0C5898]">{st.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</span>
  <div className="min-w-0"><p className="text-xs font-extrabold">{st.name}</p><p className="mt-1 text-[11px] text-muted-foreground">{st.subject} · {st.classIds?.map(id=>state.classes.find(c=>c.id===id)?.name).join(", ")}</p></div>
 </div>)}</div>
 </Panel>;
}
function SubjectsSpotlight(){
 const {state}=useDemo();const student=state.students.find(s=>s.id===focusStudent);
 return <Panel title="As minhas disciplinas" subtitle={(student?.grade??9)+"ª Classe · Plano de referência"}>
  <div className="grid gap-2 sm:grid-cols-2">{gradeSubjects(student?.grade??9).map((sub,i)=><div key={sub} className="flex items-center gap-3 rounded-xl border border-border p-3">
   <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0C5898]/10 text-[11px] font-extrabold text-[#0C5898]">{String(i+1).padStart(2,"0")}</span>
   <p className="text-xs font-bold">{sub}</p></div>)}</div>
 </Panel>;
}
function Dashboard({role}:{role:Role}){
 const {state}=useDemo();const info=ROLE_DEFS[role];
 const title:Record<Role,string>={
  student:"O meu percurso",guardian:"Acompanhar de perto",teacher:"Olá, professora Elisa.",
  pedagogy:"Coordenação académica",reception:"Atendimento e receção",secretary:"Gestão escolar",
  finance:"Panorama financeiro",executive:"Visão da instituição"
 };
 const stats=metrics(role,state);
 return <PageContainer>
  <header className="relative mb-6 overflow-hidden rounded-[27px] bg-[#071A2A] px-6 py-8 text-white shadow-[0_22px_55px_rgba(7,26,42,.12)] sm:px-9 sm:py-10">
   <div className="pointer-events-none absolute -right-16 -top-32 h-80 w-80 rounded-full border-[66px] border-[#1F4D70]/25"/>
   <div className="relative flex flex-wrap items-end justify-between gap-5">
    <div><p className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#F18136]">COLUS · {info.short}</p>
     <h1 className="mt-3 font-display text-[clamp(35px,4vw,55px)] leading-[1.07]">{title[role]}</h1>
     <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">{info.caption}. Consulte operações e indicadores atualizados no cenário escolar.</p>
    </div>
    <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-bold text-white/80">Ano letivo de referência · 2026</span>
   </div>
  </header>
  <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">{stats.map((x,i)=><StatsCard key={x.label} label={x.label} value={x.value} icon={x.icon} variant={i===0?"primary":"default"}/>)}</div>
  <div className="mt-6 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
   <div className="space-y-5">
    <OperationalPriorities role={role}/>
    {role==="student"&&<SubjectsSpotlight/>}
    {role==="pedagogy"&&<PeopleSpotlight/>}
    {(role==="executive"||role==="secretary"||role==="pedagogy")&&<Panel title="Distribuição dos alunos" subtitle="Contagem atualizada com os registos ativos."><GradeDistribution data={state}/></Panel>}
    {(role==="executive"||role==="pedagogy")&&<Panel title="Desempenho académico" subtitle="Médias calculadas a partir de avaliações publicadas."><PerformanceChart data={state}/></Panel>}
    {(role==="student"||role==="teacher")&&<WeekPreview role={role}/>}
    {role==="guardian"&&<Panel title="Desempenho dos educandos" subtitle="Registos publicados pela Coordenação Pedagógica"><PerformanceChart data={state} studentIds={guardianStudents(state).map(s=>s.id)}/></Panel>}
    {role==="finance"&&<Panel title="Distribuição dos recebimentos" subtitle="Valores agrupados pelo estado dos pagamentos."><FinanceChart data={state}/></Panel>}
    {role==="executive"&&<Panel title="Assiduidade por turma" subtitle="Percentagem observada nos registos da amostra."><AttendanceChart data={state}/></Panel>}
   </div>
   <div className="space-y-5">
    <Panel title="Acesso rápido" subtitle="Ações e informação pertinentes ao seu perfil.">
     <div className="grid grid-cols-2 gap-3">{info.items.filter(x=>x.path!=="dashboard").slice(0,4).map((item,i)=>
      <QuickActionCard key={item.path} icon={[ClipboardList,CalendarDays,MessageCircle,BookOpen][i]} label={item.label} to={"/app/"+role+"/"+item.path}/>)}</div>
    </Panel>
    {role==="guardian"&&<Panel title="Estado financeiro da família" subtitle="Apenas o encarregado e os perfis de gestão autorizados podem consultar.">
     <div className="space-y-3">{state.fees.filter(f=>guardianStudents(state).some(s=>s.id===f.studentId)).map(f=><div className="flex items-center justify-between gap-3" key={f.id}><div><p className="text-xs font-bold">{state.students.find(s=>s.id===f.studentId)?.name}</p><p className="text-xs text-muted-foreground">{mt(f.amount)}</p></div><Pill tone={f.status==="validated"?"success":"warning"}>{f.status==="validated"?"Validado":"Pendente"}</Pill></div>)}</div>
     </Panel>}
    <ActivityFeed role={role}/>
   </div>
  </div>
 </PageContainer>;
}
function StudentWork(){return <Panel title="Trabalhos e atividades" subtitle="Organização pessoal; apenas informação académica.">
 <div className="grid gap-3 sm:grid-cols-2"><LinkFeature icon={ClipboardList} label="Matemática" description="Ficha de revisão · Entrega prevista para 23 de outubro."/><LinkFeature icon={BookOpen} label="Língua Portuguesa" description="Leitura orientada · 27 de outubro."/></div>
 </Panel>;}
function OtherModule({role,section}:{role:Role;section:string}){
 const {state}=useDemo();
 if(section==="students"&&role==="secretary")return <StudentRegistry/>;
 if(section==="admissions")return <AdmissionsDesk role={role}/>;
 if(section==="classes"||section==="assignments"&&role==="pedagogy")return <ClassAssignments role={role}/>;
 if(section==="attendance")return <AttendanceDesk role={role}/>;
 if(section==="grades")return <GradesDesk role={role}/>;
 if(section==="payments"||section==="accounts"||section==="finance")return <FinanceDesk role={role}/>;
 if(section==="messages")return role==="reception"?<AdmissionsDesk role={role}/>:<MessagesDesk role={role}/>;
 if(section==="schedule")return role==="pedagogy"?<CurriculumDesk/>:<Empty>Horário escolar indisponível neste perfil.</Empty>;
 if(section==="subjects")return <SubjectsSpotlight/>;
 if(section==="children"&&role==="guardian")return <GuardianChildren/>;
 if(section==="assignments"&&role==="student")return <StudentWork/>;
 if(section==="analytics")return <div className="grid gap-5 lg:grid-cols-2"><Panel title="Distribuição por ciclo"><GradeDistribution data={state}/></Panel><Panel title="Assiduidade"><AttendanceChart data={state}/></Panel></div>;
 if(section==="documents")return <Panel title="Arquivo administrativo" subtitle="Gestão da documentação do processo escolar.">
  <div className="grid gap-3 sm:grid-cols-2"><LinkFeature icon={FileText} label="Fichas de matrícula" description="Registos do cenário escolar."/><LinkFeature icon={ShieldCheck} label="Arquivo preservado" description="Alunos arquivados mantêm o histórico." /></div></Panel>;
 return <Empty>Esta área não possui registos associados ao perfil selecionado.</Empty>;
}
export function Workspace(){
 const {role,section,id}=useParams();
 const allowedRole=isRole(role)?role:null;
 if(!allowedRole)return <Navigate to="/login" replace/>;
 const info=ROLE_DEFS[allowedRole];
 const active=section??"dashboard";
 if(!info.items.some(i=>i.path===active))return <Navigate to={"/app/"+allowedRole+"/dashboard"} replace/>;
 if(active==="dashboard")return <Dashboard role={allowedRole}/>;
 if(allowedRole==="secretary"&&active==="students"&&id)return <PageContainer><StudentRecord studentId={id}/></PageContainer>;
 if((allowedRole==="student"&&(active==="assignments"||active==="materials"))||
    (allowedRole==="teacher"&&active==="learning")||(allowedRole==="guardian"&&active==="learning"))
  return <PageContainer><LearningWorkspace role={allowedRole as "student"|"teacher"|"guardian"} section={active}/></PageContainer>;
 if(active==="schedule"&&(allowedRole==="student"||allowedRole==="guardian"||allowedRole==="teacher"))
  return <PageContainer><RoleWeeklyTimetable role={allowedRole}/></PageContainer>;
 if(allowedRole==="pedagogy"&&active==="classes")return <PageContainer><ClassesManagement/></PageContainer>;
 if(allowedRole==="pedagogy"&&active==="staff")return <PageContainer><TeachersManagement/></PageContainer>;
 if(allowedRole==="pedagogy"&&active==="assignments")return <PageContainer><AssignmentsManagement/></PageContainer>;
 if(allowedRole==="pedagogy"&&active==="timetable")return <PageContainer><TimetableManagement/></PageContainer>;
 if(allowedRole==="pedagogy"&&active==="attendance")return <PageContainer><PedagogyAttendance/></PageContainer>;
 if(allowedRole==="pedagogy"&&active==="grades")return <PageContainer><PedagogyAssessments/></PageContainer>;
 if(allowedRole==="teacher"&&active==="attendance")return <PageContainer><TeacherSessionAttendance/></PageContainer>;
 if((allowedRole==="guardian"||allowedRole==="reception")&&active==="appointments")
  return <PageContainer><SchoolAppointments role={allowedRole}/></PageContainer>;
 if(allowedRole==="teacher"&&active==="assessments")return <PageContainer><AssessmentWorkflow role="teacher"/></PageContainer>;
 if(allowedRole==="pedagogy"&&active==="reviews")return <PageContainer><AssessmentWorkflow role="pedagogy"/></PageContainer>;
 if(allowedRole==="pedagogy"&&active==="justifications")return <PageContainer><AbsenceCases role="pedagogy"/></PageContainer>;
 if(allowedRole==="pedagogy"&&active==="interventions")return <PageContainer><InterventionsWorkspace/></PageContainer>;
 if(allowedRole==="guardian"&&active==="justifications")return <PageContainer><AbsenceCases role="guardian"/></PageContainer>;
 if((allowedRole==="guardian"||allowedRole==="student")&&active==="assessments")return <PageContainer><AssessmentWorkflow role={allowedRole}/></PageContainer>;
 if((allowedRole==="guardian"||allowedRole==="student"||allowedRole==="pedagogy"||allowedRole==="secretary"||allowedRole==="executive")&&active==="notices")return <PageContainer><NoticesWorkspace role={allowedRole}/></PageContainer>;
 if(allowedRole==="secretary"&&active==="documents")return <PageContainer><DocumentsWorkspace/></PageContainer>;
 if(allowedRole==="finance"&&(active==="validation"||active==="obligations"||active==="receipts"||active==="accounts"))
  return <PageContainer><FinanceOperations section={active}/></PageContainer>;
 if(allowedRole==="executive"&&(active==="reports"||active==="audit"))return <PageContainer><ExecutiveReports/></PageContainer>;
 return <PageContainer>
  <div className="mb-7"><Link to={"/app/"+allowedRole+"/dashboard"} className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0C5898]"><ArrowRight className="rotate-180" size={14}/> Regressar ao painel</Link>
  <p className="eyebrow mt-6">COLUS · {info.short}</p>
  <h1 className="mt-3 font-display text-[clamp(38px,5vw,55px)] leading-tight text-[#071A2A]">{info.items.find(i=>i.path===active)?.label}</h1>
  <p className="mt-2 text-sm text-muted-foreground">Ano letivo 2026 · Informação do cenário escolar de avaliação.</p></div>
  <OtherModule role={allowedRole} section={active}/>
  <div className="mt-6"><ActivityFeed role={allowedRole}/></div>
 </PageContainer>;
}

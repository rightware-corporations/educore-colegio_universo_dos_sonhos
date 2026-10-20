import { Link, Navigate, useParams } from "react-router-dom";
import { Activity, ArrowRight, Bell, BookOpen, CalendarDays, ChartColumnIncreasing, Check, CheckCircle2, ClipboardList, Clock, CreditCard, FileText, GraduationCap, HeartHandshake, Layers3, MessageCircle, ShieldCheck, TrendingUp, Users, Wallet } from "lucide-react";
import { ROLE_DEFS, isRole, type Role } from "../config/roles";
import { useDemo } from "../state/DemoProvider";
import { activeStudents, attendanceRate, average, guardianStudents, gradeSubjects, mt, paymentsReceived, type SchoolData } from "../data/school";
import { PageContainer } from "../components/PageContainer";
import { StatsCard } from "../components/StatsCard";
import { ScheduleCard } from "../components/ScheduleCard";
import { QuickActionCard } from "../components/QuickActionCard";
import { AttendanceChart, FinanceChart, GradeDistribution, PerformanceChart } from "../components/SchoolCharts";
import { AdmissionsDesk, AttendanceDesk, ClassAssignments, CurriculumDesk, Empty, FinanceDesk, GradesDesk, LinkFeature, MessagesDesk, Panel, Pill, StudentRegistry } from "./SchoolModules";

const focusStudent="ALU-001";
const lessons=[
 {time:"07:30",subject:"Matemática",room:"Sala A12",teacher:"Elisa Simango",current:true},
 {time:"09:15",subject:"Língua Portuguesa",room:"Sala B04",teacher:"Daniel Machava"},
 {time:"11:00",subject:"Biologia",room:"Laboratório",teacher:"Lídia Mabunda"}
];
function ActivityFeed(){
 const {state}=useDemo();
 return <Panel title="Atividade recente" subtitle="Histórico das operações realizadas neste ambiente.">
  {state.events.length===0?<div className="rounded-2xl bg-[#F5F7F8] p-5"><p className="text-sm font-bold">Tudo preparado para começar.</p><p className="mt-2 text-xs leading-6 text-muted-foreground">Os movimentos escolares serão registados aqui à medida que os perfis executarem tarefas.</p></div>:
   <div className="space-y-4">{state.events.slice(0,6).map(e=><div key={e.id} className="flex items-start gap-3 border-b border-border/60 pb-4 last:border-b-0 last:pb-0"><span className="rounded-xl bg-[#0C5898]/10 p-2 text-[#0C5898]"><Activity size={16}/></span><div className="min-w-0"><p className="text-xs font-extrabold">{e.title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{e.detail}</p></div></div>)}</div>}
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
  {label:"Turmas atribuídas",value:2,icon:Users},
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
  {label:"Atendimentos registados",value:s.admissions.length,icon:HeartHandshake}
 ];
 if(role==="secretary")return [
  {label:"Alunos ativos",value:students.length,icon:GraduationCap},
  {label:"Atribuição de turma",value:students.filter(x=>!x.classId).length,icon:Layers3},
  {label:"Matrículas processadas",value:s.admissions.filter(a=>a.status==="enrolled").length,icon:CheckCircle2},
  {label:"Pedidos por tratar",value:s.admissions.filter(a=>a.status==="referred"||a.status==="review").length,icon:FileText}
 ];
 if(role==="finance")return [
  {label:"Recebimentos validados",value:mt(paymentsReceived(s)),icon:Wallet},
  {label:"Pagamentos por validar",value:s.fees.filter(f=>f.status!=="validated").length,icon:Clock},
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
function TeacherSpotlight(){
 const {state,markAbsent,recordAttendance}=useDemo();
 const student=state.students.find(s=>s.id===focusStudent);
 const today=state.attendance.find(a=>a.studentId===focusStudent&&a.date==="2026-10-20");
 return <Panel title="Chamada de hoje" subtitle="Matemática · 9.ª A · Elisa Simango" action={<Link className="text-xs font-bold text-[#0C5898] hover:underline" to="/app/teacher/attendance">Abrir turma →</Link>}>
  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F5F7F8] p-4">
   <div><p className="text-sm font-extrabold">{student?.name}</p><p className="mt-1 text-xs text-muted-foreground">9.ª A · Número de referência {student?.id}</p></div>
   <Pill tone={today?.status==="absent"?"warning":today?.status==="present"?"success":"neutral"}>{today?.status==="absent"?"Falta registada":today?.status==="present"?"Presente":"Por registar"}</Pill>
  </div>
  <div className="mt-4 flex flex-wrap gap-3"><button className="action" onClick={markAbsent}><ClipboardList size={16}/> Registar falta</button>
   <button className="action-secondary" onClick={()=>recordAttendance(focusStudent,"present")}><Check size={16}/> Marcar presença</button></div>
 </Panel>;
}
function FinanceSpotlight(){
 const {state,validatePayment}=useDemo();const fee=state.fees.find(f=>f.id==="FIN-001");
 return <Panel title="Pagamento para validação" subtitle="Conferência administrativa e atualização do estado da família.">
 <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#F5F7F8] p-4"><div><p className="text-sm font-extrabold">Tiago Nhampossa</p><p className="mt-1 text-xs text-muted-foreground">{fee?.description}</p>
 <p className="mt-2 text-xl font-extrabold">{mt(fee?.amount??0)}</p></div><Pill tone={fee?.status==="validated"?"success":"warning"}>{fee?.status==="validated"?"Validado":"Pendente"}</Pill></div>
 {fee?.status!=="validated"&&<button className="action mt-4" onClick={validatePayment}><Check size={16}/> Validar pagamento</button>}
 </Panel>;
}
function GuardianSpotlight(){
 const {state}=useDemo();const children=guardianStudents(state);
 return <Panel title="Os meus educandos" subtitle="Acompanhamento escolar da família Nhampossa.">
  <div className="space-y-3">{children.map(s=><div key={s.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F5F7F8] p-4">
   <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0C5898]/10 text-sm font-extrabold text-[#0C5898]">{s.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</span>
   <div><p className="text-sm font-extrabold">{s.name}</p><p className="mt-1 text-xs text-muted-foreground">{s.grade}ª Classe · {state.classes.find(c=>c.id===s.classId)?.name??"Em atribuição"}</p></div></div>
   <Pill tone={state.attendance.some(a=>a.studentId===s.id&&a.date==="2026-10-20"&&a.status==="absent")?"warning":"success"}>
    {state.attendance.some(a=>a.studentId===s.id&&a.date==="2026-10-20"&&a.status==="absent")?"Falta registada":"Sem alerta de falta"}</Pill>
  </div>)}</div>
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
  <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Colégio Universo dos Sonhos · {info.short}</p>
   <h1 className="mt-3 font-display text-[clamp(38px,4vw,58px)] leading-[1.05] text-[#071A2A]">{title[role]}</h1>
   <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{info.caption}.</p></div>
   <span className="rounded-full border border-[#0C5898]/10 bg-white px-4 py-2 text-xs font-bold text-[#0C5898]">20 outubro 2026 · 3.º trimestre</span>
  </div>
  <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">{stats.map((x,i)=><StatsCard key={x.label} label={x.label} value={x.value} icon={x.icon} variant={i===0?"primary":"default"}/>)}</div>
  <div className="mt-6 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
   <div className="space-y-5">
    {role==="teacher"&&<TeacherSpotlight/>}
    {role==="finance"&&<FinanceSpotlight/>}
    {role==="guardian"&&<GuardianSpotlight/>}
    {role==="student"&&<SubjectsSpotlight/>}
    {role==="pedagogy"&&<PeopleSpotlight/>}
    {(role==="reception"||role==="secretary")&&<AdmissionsDesk role={role}/>}
    {(role==="executive"||role==="secretary"||role==="pedagogy")&&<Panel title="Distribuição dos alunos" subtitle="Contagem atualizada com os registos ativos."><GradeDistribution data={state}/></Panel>}
    {(role==="executive"||role==="pedagogy")&&<Panel title="Desempenho académico" subtitle="Médias calculadas a partir de avaliações publicadas."><PerformanceChart data={state}/></Panel>}
    {(role==="student"||role==="teacher")&&<Panel title="Aulas e horários" subtitle="Agenda académica da 9.ª A"><ScheduleCard day="Terça-feira · 20 outubro" items={lessons}/></Panel>}
    {role==="guardian"&&<Panel title="Desempenho dos educandos" subtitle="Registos publicados pela Coordenação Pedagógica"><PerformanceChart data={state}/></Panel>}
    {role==="finance"&&<Panel title="Distribuição dos recebimentos" subtitle="Valores agrupados pelo estado dos pagamentos."><FinanceChart data={state}/></Panel>}
    {role==="executive"&&<Panel title="Assiduidade por turma" subtitle="Percentagem observada nos registos da amostra."><AttendanceChart data={state}/></Panel>}
    {role==="reception"&&<Panel title="A sua responsabilidade" subtitle="Encaminhar processos sem aprovar matrículas ou pagamentos."><div className="grid grid-cols-2 gap-3"><LinkFeature icon={HeartHandshake} label="Atendimento" description="Receber pedidos e orientar famílias."/><LinkFeature icon={FileText} label="Protocolo" description="Registar e encaminhar documentação." /></div></Panel>}
   </div>
   <div className="space-y-5">
    <Panel title="Acesso rápido" subtitle="Ações e informação pertinentes ao seu perfil.">
     <div className="grid grid-cols-2 gap-3">{info.items.filter(x=>x.path!=="dashboard").slice(0,4).map((item,i)=>
      <QuickActionCard key={item.path} icon={[ClipboardList,CalendarDays,MessageCircle,BookOpen][i]} label={item.label} to={"/app/"+role+"/"+item.path}/>)}</div>
    </Panel>
    {role==="guardian"&&<Panel title="Estado financeiro da família" subtitle="Apenas o encarregado e os perfis de gestão autorizados podem consultar.">
     <div className="space-y-3">{state.fees.filter(f=>guardianStudents(state).some(s=>s.id===f.studentId)).map(f=><div className="flex items-center justify-between gap-3" key={f.id}><div><p className="text-xs font-bold">{state.students.find(s=>s.id===f.studentId)?.name}</p><p className="text-xs text-muted-foreground">{mt(f.amount)}</p></div><Pill tone={f.status==="validated"?"success":"warning"}>{f.status==="validated"?"Validado":"Pendente"}</Pill></div>)}</div>
     </Panel>}
    <ActivityFeed/>
   </div>
  </div>
 </PageContainer>;
}
function StudentWork(){return <Panel title="Trabalhos e atividades" subtitle="Organização pessoal; apenas informação académica.">
 <div className="grid gap-3 sm:grid-cols-2"><LinkFeature icon={ClipboardList} label="Matemática" description="Ficha de revisão · Entrega prevista para 23 de outubro."/><LinkFeature icon={BookOpen} label="Língua Portuguesa" description="Leitura orientada · 27 de outubro."/></div>
 </Panel>;}
function OtherModule({role,section}:{role:Role;section:string}){
 if(section==="students"&&role==="secretary")return <StudentRegistry/>;
 if(section==="admissions")return <AdmissionsDesk role={role}/>;
 if(section==="classes"||section==="assignments"&&role==="pedagogy")return <ClassAssignments role={role}/>;
 if(section==="attendance")return <AttendanceDesk role={role}/>;
 if(section==="grades")return <GradesDesk role={role}/>;
 if(section==="payments"||section==="accounts"||section==="finance")return <FinanceDesk role={role}/>;
 if(section==="messages")return role==="reception"?<AdmissionsDesk role={role}/>:<MessagesDesk role={role}/>;
 if(section==="schedule")return role==="pedagogy"?<CurriculumDesk/>:<Panel title="Horário académico" subtitle="Agenda de referência da turma."><ScheduleCard day="Terça-feira · 20 outubro" items={lessons}/></Panel>;
 if(section==="subjects")return <SubjectsSpotlight/>;
 if(section==="children")return <GuardianSpotlight/>;
 if(section==="assignments"&&role==="student")return <StudentWork/>;
 if(section==="analytics")return <div className="grid gap-5 lg:grid-cols-2"><Panel title="Distribuição por ciclo"><GradeDistribution data={useDemo().state}/></Panel><Panel title="Assiduidade"><AttendanceChart data={useDemo().state}/></Panel></div>;
 if(section==="documents")return <Panel title="Arquivo administrativo" subtitle="Gestão da documentação do processo escolar.">
  <div className="grid gap-3 sm:grid-cols-2"><LinkFeature icon={FileText} label="Fichas de matrícula" description="Registos do cenário escolar."/><LinkFeature icon={ShieldCheck} label="Arquivo preservado" description="Alunos arquivados mantêm o histórico." /></div></Panel>;
 return <Empty>Esta área não possui registos associados ao perfil selecionado.</Empty>;
}
export function Workspace(){
 const {role,section}=useParams();
 const allowedRole=isRole(role)?role:null;
 if(!allowedRole)return <Navigate to="/login" replace/>;
 const info=ROLE_DEFS[allowedRole];
 const active=section??"dashboard";
 if(!info.items.some(i=>i.path===active))return <Navigate to={"/app/"+allowedRole+"/dashboard"} replace/>;
 if(active==="dashboard")return <Dashboard role={allowedRole}/>;
 return <PageContainer>
  <div className="mb-7"><Link to={"/app/"+allowedRole+"/dashboard"} className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0C5898]"><ArrowRight className="rotate-180" size={14}/> Regressar ao painel</Link>
  <p className="eyebrow mt-6">COLUS · {info.short}</p>
  <h1 className="mt-3 font-display text-[clamp(38px,5vw,55px)] leading-tight text-[#071A2A]">{info.items.find(i=>i.path===active)?.label}</h1>
  <p className="mt-2 text-sm text-muted-foreground">Ano letivo 2026 · Informação do cenário escolar de avaliação.</p></div>
  <OtherModule role={allowedRole} section={active}/>
  <div className="mt-6"><ActivityFeed/></div>
 </PageContainer>;
}

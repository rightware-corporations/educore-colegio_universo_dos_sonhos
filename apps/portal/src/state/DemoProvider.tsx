import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { isRole, type Role } from "../config/roles";
import { createSchool, type SchoolData, type Student, type Admission, type Attendance, type Assessment, type Message, type Event, type Lesson, gradeSubjects, type AbsenceJustification, type AssessmentPlan, type SchoolDocument, type SchoolNotice, type Intervention } from "../data/school";

const DB_KEY="colus.portal.sandbox.v4";
const PREVIOUS_KEY="colus.portal.sandbox.v3";
const WEEK_UPGRADE_KEY="colus.portal.weekly.v4.1";
const ROLE_KEY="colus.portal.role";
const uid=(prefix:string)=>prefix+"-"+crypto.randomUUID().slice(0,8).toUpperCase();
const makeEvent=(kind:string,title:string,detail:string,studentId?:string):Event=>({id:uid("EVT"),kind,title,detail,at:new Date().toISOString(),studentId});
const sane=(v:unknown):v is SchoolData=>{
 if(!v||typeof v!=="object")return false;
 const x=v as Record<string,unknown>;
 return ["lessons","students","guardians","staff","classes","attendance","assessments","fees","admissions","events","messages"].every(k=>Array.isArray(x[k]));
};
const mergeWeekSeed=(previous:SchoolData):SchoolData=>{
 const blueprint=createSchool();
 // Expand reference teachers only; do not overwrite the client's local edits.
 const staff=[...previous.staff,...blueprint.staff.filter(t=>
  ["PROF-006","PROF-007","PROF-008"].includes(t.id)&&!previous.staff.some(p=>p.id===t.id))];
 const lessons:Lesson[]=[...previous.lessons];
 const toMinute=(time:string)=>{const [h,m]=time.split(":").map(Number);return 60*h+m;};
 for(const planned of blueprint.lessons){
  if(lessons.some(l=>l.id===planned.id))continue;
  if(!previous.classes.some(c=>c.id===planned.classId&&c.active))continue;
  if(!staff.some(t=>t.id===planned.teacherId&&t.role==="teacher"&&t.classIds?.includes(planned.classId)))continue;
  const blocked=lessons.some(l=>l.weekday===planned.weekday&&toMinute(l.start)<toMinute(planned.start)+planned.minutes&&
   toMinute(planned.start)<toMinute(l.start)+l.minutes&&
   (l.classId===planned.classId||l.teacherId===planned.teacherId||l.room===planned.room));
  if(!blocked)lessons.push(planned);
 }
 return {...previous,staff,lessons};
};
const hydrate=(s:SchoolData):SchoolData=>({...s,
 justifications:s.justifications??[],assessmentPlans:s.assessmentPlans??[],documents:s.documents??[],notices:s.notices??[],interventions:s.interventions??[]
});
const read=():SchoolData=>{
 try{
  const raw=localStorage.getItem(DB_KEY);
  if(raw){
   const parsed:unknown=JSON.parse(raw);
   if(sane(parsed)){
    if(localStorage.getItem(WEEK_UPGRADE_KEY))return hydrate(parsed);
    const enriched=mergeWeekSeed(parsed);
    localStorage.setItem(DB_KEY,JSON.stringify(enriched));
    localStorage.setItem(WEEK_UPGRADE_KEY,"1");
    return hydrate(enriched);
   }
  }
  // Upgrade V3 without losing existing local student, grade or payment changes.
  const legacy=localStorage.getItem(PREVIOUS_KEY);
  if(legacy){
   const parsed:unknown=JSON.parse(legacy);
   if(sane(parsed)){
    const migrated=mergeWeekSeed(parsed);
    localStorage.setItem(DB_KEY,JSON.stringify(migrated));
    localStorage.setItem(WEEK_UPGRADE_KEY,"1");
    return hydrate(migrated);
   }
  }
 }catch{}
 return hydrate(createSchool());
};
const readRole=():Role|null=>{try{const r=sessionStorage.getItem(ROLE_KEY);return isRole(r??undefined)?r as Role:null;}catch{return null;}};
type StudentInput={name:string;grade:number;guardianId:string};
type AdmissionInput={candidate:string;grade:number;guardianName:string};
type Ctx={
 state:SchoolData;role:Role|null;enter:(role:Role)=>void;leave:()=>void;reset:()=>void;
 createStudent:(input:StudentInput)=>void;editStudent:(id:string,patch:Partial<Pick<Student,"name"|"guardianId">>)=>void;archiveStudent:(id:string)=>void;
 assignStudent:(studentId:string,classId:string)=>void;createAdmission:(input:AdmissionInput)=>void;updateAdmission:(id:string,status:Admission["status"])=>void;
 markAbsent:()=>void;recordAttendance:(studentId:string,status:Attendance["status"],teacherId?:string)=>void;
 recordGrade:(studentId:string,subject:string,score:number,teacherId?:string)=>void;publishGrades:()=>void;
 submitPayment:(feeId:string,reference:string)=>void;validatePayment:()=>void;validateFee:(id:string)=>void;
 createClass:(grade:number,letter:string,capacity:number)=>void;
 updateClass:(id:string,capacity:number,active:boolean)=>void;
 createTeacher:(name:string,subject:string)=>void;
 assignTeacher:(teacherId:string,classId:string,enabled:boolean)=>void;
 addLesson:(input:Omit<Lesson,"id">)=>void;
 removeLesson:(id:string)=>void;
 recordSession:(lessonId:string,date:string,studentId:string,status:Attendance["status"])=>void;
 justifyAbsence:(attendanceId:string,reason:string)=>void;
 decideJustification:(id:string,accept:boolean,reason?:string)=>void;
 createAssessment:(classId:string,title:string,date:string)=>void;
 decideAssessment:(id:string,accept:boolean,reason?:string)=>void;
 publishGrade:(id:string)=>void;
 requestDocument:(studentId:string,kind:string)=>void;
 issueDocument:(id:string)=>void;
 createObligation:(studentId:string,description:string,amount:number,dueDate:string)=>void;
 rejectFee:(id:string,reason:string)=>void;
 postNotice:(title:string,text:string,studentId?:string)=>void;
 acknowledgeNotice:(id:string)=>void;
 openIntervention:(studentId:string,note:string,followUp:string)=>void;
 closeIntervention:(id:string)=>void;
 sendMessage:(text:string,studentId?:string)=>void;
};
const Context=createContext<Ctx|null>(null);
export function DemoProvider({children}:PropsWithChildren){
 const [state,setState]=useState<SchoolData>(read);
 const [role,setRole]=useState<Role|null>(readRole);
 const mutate=(fn:(s:SchoolData)=>SchoolData)=>setState(old=>{
  const next=fn(old);
  if(next!==old){try{localStorage.setItem(DB_KEY,JSON.stringify(next));}catch{}}
  return next;
 });
 const value=useMemo<Ctx>(()=>({
  state,role,
  enter(r){setRole(r);try{sessionStorage.setItem(ROLE_KEY,r);}catch{}},
  leave(){setRole(null);try{sessionStorage.removeItem(ROLE_KEY);}catch{}},
  reset(){const next=createSchool();setState(next);try{localStorage.setItem(DB_KEY,JSON.stringify(next));}catch{}},
  createClass(grade,letter,capacity){
   if(role!=="pedagogy"||!Number.isInteger(grade)||grade<1||grade>12||!Number.isInteger(capacity)||capacity<5||capacity>60)return;
   const code=letter.trim().toUpperCase();
   if(!/^[A-Z]$/.test(code))return;
   const id="CL-"+String(grade).padStart(2,"0")+"-"+code;
   mutate(s=>s.classes.some(c=>c.id===id)?s:{
     ...s,classes:[...s.classes,{id,grade,name:grade+"ª "+code,capacity,active:true}],
     events:[makeEvent("class","Turma criada",grade+"ª "+code),...s.events]
   });
  },
  updateClass(id,capacity,active){
   if(role!=="pedagogy"||!Number.isInteger(capacity)||capacity<5||capacity>60)return;
   mutate(s=>{
    const cls=s.classes.find(c=>c.id===id);
    if(!cls)return s;
    const enrolled=s.students.filter(x=>x.classId===id&&x.status==="active").length;
    if(capacity<enrolled||(!active&&enrolled>0))return s;
    return {...s,classes:s.classes.map(c=>c.id===id?{...c,capacity,active}:c),events:[makeEvent("class","Configuração da turma",cls.name),...s.events]};
   });
  },
  createTeacher(name,subject){
   if(role!=="pedagogy"||name.trim().length<3||name.trim().length>90||!subject.trim()||subject.length>80)return;
   mutate(s=>({
    ...s,staff:[...s.staff,{id:uid("PROF"),name:name.trim(),role:"teacher",subject:subject.trim(),classIds:[]}],
    events:[makeEvent("staff","Professor registado",name.trim()+" · "+subject.trim()),...s.events]
   }));
  },
  assignTeacher(teacherId,classId,enabled){
   if(role!=="pedagogy")return;
   mutate(s=>{
    const teacher=s.staff.find(x=>x.id===teacherId&&x.role==="teacher");
    const cls=s.classes.find(x=>x.id===classId&&x.active);
    if(!teacher||!cls)return s;
    const assigned=teacher.classIds??[];
    if(enabled&&assigned.includes(classId)||!enabled&&!assigned.includes(classId))return s;
    if(enabled&&!gradeSubjects(cls.grade).includes(teacher.subject??""))return s;
    if(!enabled&&s.lessons.some(l=>l.teacherId===teacherId&&l.classId===classId))return s;
    return {...s,staff:s.staff.map(x=>x.id===teacherId?{...x,classIds:enabled?[...assigned,classId]:assigned.filter(y=>y!==classId)}:x),
      events:[makeEvent("staff",enabled?"Atribuição docente":"Atribuição retirada",teacher.name+" · "+cls.name),...s.events]};
   });
  },
  addLesson(input){
   if(role!=="pedagogy"||!Number.isInteger(input.weekday)||input.weekday<1||input.weekday>5||!Number.isInteger(input.minutes)||input.minutes<30||input.minutes>120||!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(input.start)||!input.room.trim())return;
   const toMinute=(time:string)=>{const [h,m]=time.split(":").map(Number);return h*60+m;};
   const start=toMinute(input.start),end=start+input.minutes;
   if(start<420||end>1080)return;
   mutate(s=>{
    const teacher=s.staff.find(x=>x.id===input.teacherId&&x.role==="teacher"&&x.classIds?.includes(input.classId));
    const cls=s.classes.find(x=>x.id===input.classId&&x.active);
    if(!teacher||!cls)return s;
    const conflict=s.lessons.some(l=>l.weekday===input.weekday&&start<toMinute(l.start)+l.minutes&&end>toMinute(l.start)&&
      (l.classId===input.classId||l.teacherId===input.teacherId||l.room.toUpperCase()===input.room.toUpperCase()));
    if(conflict)return s;
    return {...s,lessons:[...s.lessons,{...input,room:input.room.trim().toUpperCase(),id:uid("AULA")}],
      events:[makeEvent("schedule","Aula agendada",cls.name+" · "+teacher.name),...s.events]};
   });
  },
  removeLesson(id){
   if(role!=="pedagogy")return;
   mutate(s=>s.lessons.some(l=>l.id===id)?{...s,lessons:s.lessons.filter(l=>l.id!==id),events:[makeEvent("schedule","Aula removida",id),...s.events]}:s);
  },
  createStudent(input){
   if(role!=="secretary")return;
   const name=input.name.trim();
   if(name.length<3||name.length>90||!Number.isInteger(input.grade)||input.grade<1||input.grade>12)return;
   mutate(s=>{
    if(!s.guardians.some(g=>g.id===input.guardianId))return s;
    const item:Student={id:uid("ALU"),name,grade:input.grade,classId:null,guardianId:input.guardianId,status:"active"};
    return {...s,students:[...s.students,item],events:[makeEvent("student","Aluno registado",name+" · aguarda atribuição a turma",item.id),...s.events]};
   });
  },
  editStudent(id,patch){
   if(role!=="secretary")return;
   mutate(s=>{
    const target=s.students.find(x=>x.id===id&&x.status==="active");if(!target)return s;
    const name=patch.name===undefined?target.name:patch.name.trim();
    const guardianId=patch.guardianId??target.guardianId;
    if(name.length<3||name.length>90||!s.guardians.some(g=>g.id===guardianId))return s;
    return {...s,students:s.students.map(x=>x.id===id?{...x,name,guardianId}:x),events:[makeEvent("student","Ficha atualizada",name,id),...s.events]};
   });
  },
  archiveStudent(id){
   if(role!=="secretary")return;
   mutate(s=>{const student=s.students.find(x=>x.id===id&&x.status==="active");if(!student)return s;
    return {...s,students:s.students.map(x=>x.id===id?{...x,status:"archived" as const}:x),events:[makeEvent("student","Aluno arquivado",student.name+" · histórico preservado",id),...s.events]};
   });
  },
  assignStudent(studentId,classId){
   if(role!=="pedagogy")return;
   mutate(s=>{const student=s.students.find(x=>x.id===studentId&&x.status==="active");
    const turma=s.classes.find(x=>x.id===classId&&x.active);
    if(!student||!turma||student.grade!==turma.grade||s.students.filter(x=>x.classId===classId&&x.status==="active").length>=turma.capacity)return s;
    return {...s,students:s.students.map(x=>x.id===studentId?{...x,classId}:x),events:[makeEvent("student","Turma atribuída",student.name+" → "+turma.name,studentId),...s.events]};
   });
  },
  createAdmission(input){
   if(role!=="reception")return;
   const candidate=input.candidate.trim(),guardianName=input.guardianName.trim();
   if(candidate.length<3||guardianName.length<3||!Number.isInteger(input.grade)||input.grade<1||input.grade>12)return;
   mutate(s=>({...s,admissions:[{id:uid("ADM"),candidate,grade:input.grade,guardianName,status:"received"},...s.admissions],events:[makeEvent("admission","Novo pedido recebido",candidate),...s.events]}));
  },
  updateAdmission(id,status){
   if(role==="reception"&&status!=="referred")return;
   if(role!=="reception"&&role!=="secretary")return;
   mutate(s=>{const item=s.admissions.find(x=>x.id===id);if(!item)return s;
    if(!((role==="reception"&&item.status==="received"&&status==="referred")||
     (role==="secretary"&&item.status==="referred"&&status==="review")||
     (role==="secretary"&&item.status==="review"&&status==="enrolled")))return s;
    const enrolling=status==="enrolled";
    const existingGuardian=s.guardians.find(g=>g.name.toLocaleLowerCase()===item.guardianName.toLocaleLowerCase());
    const guardianId=existingGuardian?.id??uid("ENC");
    const guardians=enrolling&&!existingGuardian?[...s.guardians,{id:guardianId,name:item.guardianName}]:s.guardians;
    const studentExists=s.students.some(st=>st.name===item.candidate&&st.grade===item.grade);
    const newStudent:Student={id:uid("ALU"),name:item.candidate,grade:item.grade,classId:null,guardianId,status:"active"};
    const students=enrolling&&!studentExists?[...s.students,newStudent]:s.students;
    return {...s,guardians,students,admissions:s.admissions.map(x=>x.id===id?{...x,status}:x),
      events:[makeEvent("admission",enrolling?"Matrícula formalizada":"Pedido atualizado",item.candidate+(enrolling?" · ficha criada para atribuição pela Pedagogia":" → "+status)),...s.events]};
   });
  },
  recordAttendance(studentId,status,teacherId="PROF-001"){
   if(role!=="teacher")return;
   mutate(s=>{
    const student=s.students.find(x=>x.id===studentId&&x.status==="active"&&!!x.classId);
    const teacher=s.staff.find(x=>x.id===teacherId&&x.role==="teacher"&&x.classIds?.includes(student?.classId??""));
    if(!student||!teacher||!student.classId)return s;
    const rest=s.attendance.filter(x=>!(x.studentId===studentId&&x.date==="2026-10-20"));
    const row:Attendance={id:uid("ATT"),studentId,classId:student.classId,date:"2026-10-20",status,teacherId};
    return {...s,attendance:[row,...rest],events:[makeEvent("attendance",status==="absent"?"Falta registada":"Presença registada",student.name+" · "+teacher.name,studentId),...s.events]};
   });
  },
  markAbsent(){if(role==="teacher")value.recordAttendance("ALU-001","absent","PROF-001");},
  recordGrade(studentId,subject,score,teacherId="PROF-001"){
   if(role!=="teacher"||!Number.isFinite(score)||score<0||score>20)return;
   mutate(s=>{
    const student=s.students.find(x=>x.id===studentId&&x.status==="active");
    const teacher=s.staff.find(x=>x.id===teacherId&&x.role==="teacher"&&x.subject===subject&&x.classIds?.includes(student?.classId??""));
    if(!student||!teacher)return s;
    const note:Assessment={id:uid("NOT"),studentId,subject,score,term:3,published:false,teacherId};
    return {...s,assessments:[note,...s.assessments],events:[makeEvent("assessment","Nota lançada para revisão",student.name+" · "+subject,studentId),...s.events]};
   });
  },
  publishGrades(){
   if(role!=="pedagogy")return;
   mutate(s=>{const pending=s.assessments.filter(a=>!a.published);
    if(!pending.length)return s;
    return {...s,assessments:s.assessments.map(a=>({...a,published:true})),events:[makeEvent("assessment","Notas publicadas",pending.length+" resultados disponibilizados às famílias"),...s.events]};
   });
  },
  submitPayment(feeId,reference){
   if(role!=="guardian"||reference.trim().length<4||reference.trim().length>48)return;
   mutate(s=>{const fee=s.fees.find(f=>f.id===feeId&&(f.status==="pending"||f.status==="rejected"));const student=s.students.find(x=>x.id===fee?.studentId);
    if(!fee||student?.guardianId!=="ENC-001")return s;
    return {...s,fees:s.fees.map(f=>f.id===feeId?{...f,status:"submitted" as const,reference:reference.trim()}:f),
     events:[makeEvent("payment","Comprovativo apresentado","Submissão fictícia para validação",fee.studentId),...s.events]};
   });
  },
  validateFee(id){
   if(role!=="finance")return;
   mutate(s=>{const fee=s.fees.find(x=>x.id===id&&x.status!=="validated");if(!fee)return s;
    return {...s,fees:s.fees.map(f=>f.id===id?{...f,status:"validated" as const}:f),events:[makeEvent("payment","Pagamento validado",fee.description+" · "+fee.amount+" MT",fee.studentId),...s.events]};
   });
  },
  validatePayment(){if(role==="finance")value.validateFee("FIN-001");},
  recordSession(lessonId,date,studentId,status){
   if(role!=="teacher"||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!["present","absent","late"].includes(status))return;
   mutate(s=>{
    const lesson=s.lessons.find(l=>l.id===lessonId&&l.teacherId==="PROF-001");
    const student=s.students.find(st=>st.id===studentId&&st.classId===lesson?.classId&&st.status==="active");
    if(!lesson||!student)return s;
    const previous=s.attendance.find(a=>a.lessonId===lessonId&&a.date===date&&a.studentId===studentId);
    if(previous&&s.justifications.some(j=>j.attendanceId===previous.id))return s;
    const row:Attendance={id:previous?.id??uid("ATT"),studentId,classId:lesson.classId,date,status,teacherId:lesson.teacherId,lessonId};
    return {...s,attendance:[...s.attendance.filter(a=>a.id!==previous?.id),row],
     events:[makeEvent("attendance","Chamada atualizada",student.name+" · "+status+" · "+date,studentId),...s.events]};
   });
  },
  justifyAbsence(attendanceId,reason){
   if(role!=="guardian"||reason.trim().length<5||reason.length>400)return;
   mutate(s=>{
    const a=s.attendance.find(a=>a.id===attendanceId&&a.status!=="present");
    const st=s.students.find(st=>st.id===a?.studentId&&st.guardianId==="ENC-001");
    if(!a||!st||s.justifications.some(j=>j.attendanceId===attendanceId))return s;
    const j:AbsenceJustification={id:uid("JUST"),attendanceId,studentId:st.id,reason:reason.trim(),status:"submitted"};
    return {...s,justifications:[j,...s.justifications],events:[makeEvent("justification","Justificação submetida",st.name,st.id),...s.events]};
   });
  },
  decideJustification(id,accept,reason=""){
   if(role!=="pedagogy"||!accept&&reason.trim().length<3)return;
   mutate(s=>{
    const current=s.justifications.find(j=>j.id===id&&j.status==="submitted");if(!current)return s;
    return {...s,justifications:s.justifications.map(j=>j.id===id?{...j,status:accept?"approved" as const:"rejected" as const,decisionReason:reason.trim()}:j),
     events:[makeEvent("justification","Justificação analisada",accept?"Aceite":"Rejeitada: "+reason,current.studentId),...s.events]};
   });
  },
  createAssessment(classId,title,date){
   if(role!=="teacher"||title.trim().length<3||title.length>120||!/^\d{4}-\d{2}-\d{2}$/.test(date))return;
   mutate(s=>{
    const teacher=s.staff.find(t=>t.id==="PROF-001");
    if(!teacher?.classIds?.includes(classId))return s;
    const plan:AssessmentPlan={id:uid("AVA"),classId,teacherId:teacher.id,subject:teacher.subject??"",title:title.trim(),date,status:"submitted"};
    return {...s,assessmentPlans:[plan,...s.assessmentPlans],events:[makeEvent("assessment","Avaliação proposta",plan.title+" · aguarda aprovação"),...s.events]};
   });
  },
  decideAssessment(id,accept,reason=""){
   if(role!=="pedagogy"||!accept&&reason.trim().length<3)return;
   mutate(s=>{
    const a=s.assessmentPlans.find(x=>x.id===id&&x.status==="submitted");if(!a)return s;
    return {...s,assessmentPlans:s.assessmentPlans.map(x=>x.id===id?{...x,status:accept?"approved" as const:"rejected" as const,reason:reason.trim()}:x),
     events:[makeEvent("assessment","Avaliação revista",a.title+" · "+(accept?"Aprovada":"Rejeitada")),...s.events]};
   });
  },
  publishGrade(id){
   if(role!=="pedagogy")return;
   mutate(s=>{
    const a=s.assessments.find(x=>x.id===id&&!x.published);if(!a)return s;
    return {...s,assessments:s.assessments.map(x=>x.id===id?{...x,published:true}:x),
     events:[makeEvent("assessment","Nota publicada",a.subject,a.studentId),...s.events]};
   });
  },
  requestDocument(studentId,kind){
   if(role!=="secretary"||!["matricula","frequencia","declaracao"].includes(kind))return;
   mutate(s=>{
    if(!s.students.some(x=>x.id===studentId))return s;
    const doc:SchoolDocument={id:uid("DOC"),studentId,kind,status:"requested",createdAt:new Date().toISOString()};
    return {...s,documents:[doc,...s.documents],events:[makeEvent("document","Documento solicitado",kind,studentId),...s.events]};
   });
  },
  issueDocument(id){
   if(role!=="secretary")return;
   mutate(s=>{
    const doc=s.documents.find(x=>x.id===id&&x.status==="requested");if(!doc)return s;
    return {...s,documents:s.documents.map(x=>x.id===id?{...x,status:"issued"}:x),
     events:[makeEvent("document","Documento emitido","Modelo demonstrativo sem validade oficial",doc.studentId),...s.events]};
   });
  },
  createObligation(studentId,description,amount,dueDate){
   if(role!=="finance"||description.trim().length<3||description.length>120||!Number.isFinite(amount)||amount<=0||amount>1000000||!/^\d{4}-\d{2}-\d{2}$/.test(dueDate))return;
   mutate(s=>{
    if(!s.students.some(x=>x.id===studentId&&x.status==="active"))return s;
    const fee={id:uid("FIN"),studentId,description:description.trim(),amount,dueDate,status:"pending" as const};
    return {...s,fees:[fee,...s.fees],events:[makeEvent("payment","Obrigação criada",description.trim(),studentId),...s.events]};
   });
  },
  rejectFee(id,reason){
   if(role!=="finance"||reason.trim().length<3||reason.length>200)return;
   mutate(s=>{
    const fee=s.fees.find(x=>x.id===id&&x.status==="submitted");if(!fee)return s;
    return {...s,fees:s.fees.map(x=>x.id===id?{...x,status:"rejected" as const,reason:reason.trim()}:x),
     events:[makeEvent("payment","Comprovativo rejeitado",reason.trim(),fee.studentId),...s.events]};
   });
  },
  postNotice(title,text,studentId){
   if(!["pedagogy","secretary","executive"].includes(role??"")||title.trim().length<3||text.trim().length<5||text.length>500)return;
   mutate(s=>{
    if(studentId&&!s.students.some(x=>x.id===studentId))return s;
    const notice:SchoolNotice={id:uid("COM"),title:title.trim(),text:text.trim(),studentId,at:new Date().toISOString(),readBy:[]};
    return {...s,notices:[notice,...s.notices],events:[makeEvent("notice","Comunicado publicado",title.trim(),studentId),...s.events]};
   });
  },
  acknowledgeNotice(id){
   if(role!=="guardian"&&role!=="student")return;
   mutate(s=>{
    const notice=s.notices.find(n=>n.id===id),recipient=role==="guardian"?"ENC-001":"ALU-001";
    if(!notice||notice.readBy.includes(recipient)||
      (notice.studentId&&!(role==="guardian"?s.students.some(st=>st.id===notice.studentId&&st.guardianId===recipient):notice.studentId===recipient)))return s;
    return {...s,notices:s.notices.map(n=>n.id===id?{...n,readBy:[...n.readBy,recipient]}:n)};
   });
  },
  openIntervention(studentId,note,followUp){
   if(role!=="pedagogy"||note.trim().length<5||note.length>400||!/^\d{4}-\d{2}-\d{2}$/.test(followUp))return;
   mutate(s=>{
    if(!s.students.some(x=>x.id===studentId&&x.status==="active"))return s;
    const item:Intervention={id:uid("INT"),studentId,note:note.trim(),followUp,status:"open"};
    return {...s,interventions:[item,...s.interventions],events:[makeEvent("intervention","Acompanhamento aberto",note.trim(),studentId),...s.events]};
   });
  },
  closeIntervention(id){
   if(role!=="pedagogy")return;
   mutate(s=>{
    const v=s.interventions.find(x=>x.id===id&&x.status==="open");if(!v)return s;
    return {...s,interventions:s.interventions.map(x=>x.id===id?{...x,status:"closed"}:x),events:[makeEvent("intervention","Acompanhamento encerrado","Intervenção concluída",v.studentId),...s.events]};
   });
  },
  sendMessage(text,studentId="ALU-001"){
   if((role!=="teacher"&&role!=="guardian")||text.trim().length<2||text.trim().length>240)return;
   mutate(s=>{const student=s.students.find(x=>x.id===studentId&&x.status==="active");
    if(!student||(role==="guardian"&&student.guardianId!=="ENC-001")||
     (role==="teacher"&&!s.staff.some(t=>t.id==="PROF-001"&&t.classIds?.includes(student.classId??""))))return s;
    const m:Message={id:uid("MSG"),sender:role,text:text.trim(),studentId,at:new Date().toISOString()};
    return {...s,messages:[...s.messages,m],events:[makeEvent("message","Mensagem enviada",student.name+" · comunicação escola–família",studentId),...s.events]};
   });
  }
 }),[role,state]);
 return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useDemo(){const ctx=useContext(Context);if(!ctx)throw new Error("DemoProvider obrigatório");return ctx;}

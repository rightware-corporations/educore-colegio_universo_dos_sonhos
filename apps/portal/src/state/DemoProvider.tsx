import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { isRole, type Role } from "../config/roles";
import { createSchool, type SchoolData, type Student, type Admission, type Attendance, type Assessment, type Message, type Event } from "../data/school";

const DB_KEY="colus.portal.sandbox.v2";
const ROLE_KEY="colus.portal.role";
const uid=(prefix:string)=>prefix+"-"+crypto.randomUUID().slice(0,8).toUpperCase();
const makeEvent=(kind:string,title:string,detail:string,studentId?:string):Event=>({id:uid("EVT"),kind,title,detail,at:new Date().toISOString(),studentId});
const sane=(v:unknown):v is SchoolData=>{
 if(!v||typeof v!=="object")return false;
 const x=v as Record<string,unknown>;
 return ["students","guardians","staff","classes","attendance","assessments","fees","admissions","events","messages"].every(k=>Array.isArray(x[k]));
};
const read=():SchoolData=>{try{const raw=localStorage.getItem(DB_KEY);if(raw){const obj:unknown=JSON.parse(raw);if(sane(obj))return obj;}}catch{}return createSchool();};
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
   mutate(s=>{const fee=s.fees.find(f=>f.id===feeId&&f.status==="pending");const student=s.students.find(x=>x.id===fee?.studentId);
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

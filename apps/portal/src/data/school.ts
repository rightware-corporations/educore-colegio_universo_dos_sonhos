import { CURRICULUM } from "./curriculum";
export type Student={id:string;name:string;grade:number;classId:string|null;guardianId:string;status:"active"|"archived"};
export type Guardian={id:string;name:string};
export type Staff={id:string;name:string;role:"teacher"|"pedagogy"|"secretary"|"reception"|"finance"|"executive";subject?:string;classIds?:string[]};
export type SchoolClass={id:string;grade:number;name:string;capacity:number;active:boolean};
export type Attendance={id:string;studentId:string;classId:string;date:string;status:"present"|"absent"|"late";teacherId:string;lessonId?:string};
export type Assessment={id:string;studentId:string;subject:string;score:number;term:1|2|3;published:boolean;teacherId:string};
export type Fee={id:string;studentId:string;description:string;amount:number;status:"pending"|"submitted"|"validated"|"rejected";reference?:string;dueDate?:string;reason?:string};
export type Admission={id:string;candidate:string;grade:number;guardianName:string;status:"received"|"referred"|"review"|"enrolled"};
export type Event={id:string;kind:string;title:string;detail:string;at:string;studentId?:string};
export type Message={id:string;sender:"teacher"|"guardian";studentId:string;text:string;at:string};
export type Lesson={id:string;classId:string;teacherId:string;weekday:number;start:string;minutes:number;room:string};
export type AbsenceJustification={id:string;attendanceId:string;studentId:string;reason:string;status:"submitted"|"approved"|"rejected";decisionReason?:string};
export type AssessmentPlan={id:string;classId:string;teacherId:string;subject:string;title:string;date:string;status:"submitted"|"approved"|"rejected";reason?:string};
export type SchoolDocument={id:string;studentId:string;kind:string;status:"requested"|"issued";createdAt:string};
export type SchoolNotice={id:string;title:string;text:string;studentId?:string;at:string;readBy:string[]};
export type Intervention={id:string;studentId:string;note:string;followUp:string;status:"open"|"closed"};
export type LearningItem={id:string;classId:string;subject:string;teacherId:string;title:string;details:string;kind:"material"|"assignment";dueDate?:string};
export type WorkSubmission={id:string;itemId:string;studentId:string;response:string;status:"submitted"|"reviewed";feedback?:string};
export type SchoolData={learningItems:LearningItem[];workSubmissions:WorkSubmission[];justifications:AbsenceJustification[];assessmentPlans:AssessmentPlan[];documents:SchoolDocument[];notices:SchoolNotice[];interventions:Intervention[];lessons:Lesson[];students:Student[];guardians:Guardian[];staff:Staff[];classes:SchoolClass[];attendance:Attendance[];assessments:Assessment[];fees:Fee[];admissions:Admission[];events:Event[];messages:Message[]};
const schoolClass=(grade:number,letter="A"):SchoolClass=>({id:"CL-"+String(grade).padStart(2,"0")+"-"+letter,grade,name:grade+"ª "+letter,capacity:30,active:true});
export const DEMO_TODAY="2026-10-20";
export const createSchool=():SchoolData=>{const seed:SchoolData={
 lessons:[],
 learningItems:[
  {id:"MAT-001",classId:"CL-09-A",subject:"Matemática",teacherId:"PROF-001",title:"Equações do 2.º grau",details:"Material de revisão para o 3.º trimestre. Consulte os exercícios disponibilizados em aula.",kind:"material"},
  {id:"TRAB-001",classId:"CL-09-A",subject:"Matemática",teacherId:"PROF-001",title:"Resolução de problemas",details:"Apresente a estratégia utilizada para resolver duas equações.",kind:"assignment",dueDate:"2026-10-28"}
 ],workSubmissions:[],justifications:[],assessmentPlans:[],documents:[],notices:[
 {id:"COM-001",title:"Encontro com encarregados",text:"Aviso fictício: reunião de acompanhamento pedagógico no final do trimestre.",at:"2026-10-19",readBy:[]}
 ],interventions:[],
 classes:[schoolClass(1),schoolClass(3),schoolClass(5),schoolClass(7),schoolClass(9),schoolClass(11,"B"),schoolClass(12)],
 students:[
 {id:"ALU-001",name:"Tiago Nhampossa",grade:9,classId:"CL-09-A",guardianId:"ENC-001",status:"active"},
 {id:"ALU-002",name:"Leonor Nhampossa",grade:5,classId:"CL-05-A",guardianId:"ENC-001",status:"active"},
 {id:"ALU-003",name:"Nelson Mavota",grade:9,classId:"CL-09-A",guardianId:"ENC-002",status:"active"},
 {id:"ALU-004",name:"Célia Mucavele",grade:11,classId:"CL-11-B",guardianId:"ENC-003",status:"active"},
 {id:"ALU-005",name:"Dina Cambule",grade:7,classId:"CL-07-A",guardianId:"ENC-002",status:"active"},
 {id:"ALU-006",name:"Eduardo Chissano",grade:3,classId:"CL-03-A",guardianId:"ENC-003",status:"active"},
 {id:"ALU-007",name:"Ariana Mateus",grade:12,classId:"CL-12-A",guardianId:"ENC-002",status:"active"},
 {id:"ALU-008",name:"Francisco Mabote",grade:1,classId:"CL-01-A",guardianId:"ENC-003",status:"active"}],
 guardians:[{id:"ENC-001",name:"Marta Nhampossa"},{id:"ENC-002",name:"Paulo Mavota"},{id:"ENC-003",name:"Sónia Mucavele"}],
 staff:[
 {id:"PROF-001",name:"Elisa Simango",role:"teacher",subject:"Matemática",classIds:["CL-09-A","CL-11-B"]},
 {id:"PROF-002",name:"Daniel Machava",role:"teacher",subject:"Língua Portuguesa",classIds:["CL-09-A"]},
 {id:"PROF-003",name:"Lídia Mabunda",role:"teacher",subject:"Biologia",classIds:["CL-09-A","CL-11-B"]},
 {id:"PROF-004",name:"Celso Nhantumbo",role:"teacher",subject:"Ciências Naturais",classIds:["CL-05-A"]},
 {id:"PROF-005",name:"Sara Tembe",role:"teacher",subject:"Inglês",classIds:["CL-11-B","CL-09-A"]},
 {id:"PROF-006",name:"Regina Nhaca",role:"teacher",subject:"Língua Portuguesa",classIds:["CL-05-A"]},
 {id:"PROF-007",name:"Joaquim Massango",role:"teacher",subject:"Matemática",classIds:["CL-05-A"]},
 {id:"PROF-008",name:"Alice Baloi",role:"teacher",subject:"Educação Física",classIds:["CL-05-A"]},
 {id:"STAFF-006",name:"Ana Matola",role:"pedagogy"},
 {id:"STAFF-007",name:"Alda Magalhães",role:"secretary"},
 {id:"STAFF-008",name:"Rosa Mucavele",role:"reception"},
 {id:"STAFF-009",name:"David Mondlane",role:"finance"},
 {id:"STAFF-010",name:"Mário Cau",role:"executive"}],
 attendance:[
 {id:"ATT-001",studentId:"ALU-001",classId:"CL-09-A",date:"2026-10-19",status:"present",teacherId:"PROF-001"},
 {id:"ATT-002",studentId:"ALU-002",classId:"CL-05-A",date:"2026-10-19",status:"present",teacherId:"PROF-004"},
 {id:"ATT-003",studentId:"ALU-003",classId:"CL-09-A",date:"2026-10-19",status:"absent",teacherId:"PROF-001"},
 {id:"ATT-004",studentId:"ALU-004",classId:"CL-11-B",date:"2026-10-19",status:"present",teacherId:"PROF-003"}],
 assessments:[
 {id:"NOT-001",studentId:"ALU-001",subject:"Matemática",score:16,term:3,published:true,teacherId:"PROF-001"},
 {id:"NOT-002",studentId:"ALU-001",subject:"Biologia",score:14,term:3,published:true,teacherId:"PROF-003"},
 {id:"NOT-003",studentId:"ALU-001",subject:"Língua Portuguesa",score:15,term:3,published:true,teacherId:"PROF-002"},
 {id:"NOT-004",studentId:"ALU-002",subject:"Ciências Naturais",score:17,term:3,published:true,teacherId:"PROF-004"},
 {id:"NOT-005",studentId:"ALU-003",subject:"Matemática",score:12,term:3,published:true,teacherId:"PROF-001"},
 {id:"NOT-006",studentId:"ALU-004",subject:"Biologia",score:18,term:3,published:true,teacherId:"PROF-003"}],
 fees:[
 {id:"FIN-001",studentId:"ALU-001",description:"Mensalidade · Outubro 2026",amount:8500,status:"pending"},
 {id:"FIN-002",studentId:"ALU-002",description:"Mensalidade · Outubro 2026",amount:8500,status:"validated",reference:"REF-FICT-002"},
 {id:"FIN-003",studentId:"ALU-004",description:"Mensalidade · Outubro 2026",amount:9500,status:"pending"}],
 admissions:[
 {id:"ADM-001",candidate:"Júlia Cossa",grade:7,guardianName:"Aurélia Cossa",status:"received"},
 {id:"ADM-002",candidate:"Tomás Machava",grade:1,guardianName:"Henrique Machava",status:"referred"},
 {id:"ADM-003",candidate:"Mina Bila",grade:5,guardianName:"Américo Bila",status:"review"}],
 events:[],
 messages:[{id:"MSG-001",sender:"teacher",studentId:"ALU-001",text:"Tiago tem participado com interesse nas aulas de Matemática.",at:"2026-10-17"}]
};
 const first=["Amélia","Armando","Belmira","Bento","Celina","Custódio","Dália","Edson","Elsa","Estêvão","Fátima","Gilberto","Helena","Ismael","Júlia","Leandro","Maira","Nelson","Olívia","Rui","Sofia","Tomás","Vera","Wilson"];
 const last=["Chongo","Maluleque","Massango","Mabote","Macuácua","Matsinhe","Muianga","Machava","Mucavel","Mavota","Sumbana","Tembe","Zimba","Nhantumbo","Mondlane","Chissano","Cossa","Sitoe"];
 const extra=seed.classes.flatMap((c,k)=>Array.from({length:19+(k%4)-seed.students.filter(s=>s.classId===c.id).length},(_,j)=>{
   const n=k*31+j;const id="SIM-"+String(n+1).padStart(4,"0");
   return {id,name:first[n%first.length]+" "+last[(n*7+k)%last.length],grade:c.grade,classId:c.id,guardianId:"ENC-"+id,status:"active" as const};
 }));
 const lessons:Lesson[]=[
 {id:"AULA-001",classId:"CL-09-A",teacherId:"PROF-001",weekday:1,start:"07:30",minutes:45,room:"A12"},
 {id:"AULA-002",classId:"CL-09-A",teacherId:"PROF-002",weekday:1,start:"08:20",minutes:45,room:"A12"},
 {id:"AULA-003",classId:"CL-09-A",teacherId:"PROF-003",weekday:2,start:"09:15",minutes:45,room:"LAB-1"},
 {id:"AULA-004",classId:"CL-09-A",teacherId:"PROF-005",weekday:3,start:"10:05",minutes:45,room:"A12"},
 {id:"AULA-005",classId:"CL-05-A",teacherId:"PROF-004",weekday:1,start:"07:30",minutes:45,room:"B04"},
 {id:"AULA-006",classId:"CL-11-B",teacherId:"PROF-003",weekday:4,start:"09:15",minutes:45,room:"LAB-2"},
 {id:"AULA-007",classId:"CL-11-B",teacherId:"PROF-001",weekday:5,start:"07:30",minutes:45,room:"A16"}
 ];
 // Grade 9A: make every weekday useful in the demo, without overlapping rooms,
 // teachers or class slots. Additional slots are reference data, not the COLUS timetable.
 const template:(Omit<Lesson,"id">)[]=[];
 const plan:[string,string,string][]=[
  ["07:30","PROF-001","A12"],["08:20","PROF-002","A12"],
  ["09:15","PROF-003","LAB-1"],["10:05","PROF-005","A12"]
 ];
 for(let weekday=1;weekday<=5;weekday++){
  for(const [start,teacherId,room] of plan)template.push({classId:"CL-09-A",teacherId,weekday,start,minutes:45,room});
  template.push({classId:"CL-05-A",teacherId:"PROF-004",weekday,start:"07:30",minutes:45,room:"B04"});
  // Balanced 5A timetable: language, mathematics and physical education
  // alongside science; all fictional, pending official school validation.
  const grade5Extras:[string,string,string][][]=[
   [["08:20","PROF-006","B04"],["09:15","PROF-007","B04"]],
   [["08:20","PROF-007","B04"],["09:15","PROF-006","B04"]],
   [["08:20","PROF-006","B04"],["09:15","PROF-008","PAV-1"]],
   [["08:20","PROF-007","B04"],["09:15","PROF-006","B04"]],
   [["08:20","PROF-008","PAV-1"],["09:15","PROF-007","B04"]]
  ];
  for(const [start,teacherId,room] of grade5Extras[weekday-1])
   template.push({classId:"CL-05-A",teacherId,weekday,start,minutes:45,room});
 }
 const seniorTeachers=["PROF-003","PROF-001","PROF-005","PROF-003","PROF-005"];
 for(let weekday=1;weekday<=5;weekday++)
  template.push({classId:"CL-11-B",teacherId:seniorTeachers[weekday-1],weekday,start:"11:00",minutes:45,room:"A16"});
 const minutesFrom=(time:string)=>{const [h,m]=time.split(":").map(Number);return h*60+m;};
 const overlaps=(a:Lesson,b:Omit<Lesson,"id">)=>a.weekday===b.weekday &&
  minutesFrom(a.start)<minutesFrom(b.start)+b.minutes &&
  minutesFrom(b.start)<minutesFrom(a.start)+a.minutes &&
  (a.classId===b.classId||a.teacherId===b.teacherId||a.room===b.room);
 for(const [index,candidate] of template.entries()){
  if(!lessons.some(a=>overlaps(a,candidate))){
   lessons.push({...candidate,id:"AULA-WEEK-"+String(index+1).padStart(3,"0")});
  }
 }
 return {...seed,lessons,students:[...seed.students,...extra],guardians:[...seed.guardians,...extra.map((x,i)=>({id:x.guardianId,name:"Família fictícia "+String(i+1)}))]};
};
export const activeStudents=(s:SchoolData)=>s.students.filter(x=>x.status==="active");
export const guardianStudents=(s:SchoolData,g="ENC-001")=>activeStudents(s).filter(x=>x.guardianId===g);
export const gradeSubjects=(g:number)=>CURRICULUM.find(x=>x.grade===g)?.subjects??[];
export const average=(xs:number[])=>xs.length?Math.round(10*xs.reduce((a,b)=>a+b,0)/xs.length)/10:0;
export const attendanceRate=(s:SchoolData,ids?:string[])=>{const rows=s.attendance.filter(a=>!ids||ids.includes(a.studentId));return rows.length?Math.round(100*rows.filter(a=>a.status==="present").length/rows.length):0;};
export const paymentsReceived=(s:SchoolData)=>s.fees.filter(f=>f.status==="validated").reduce((a,b)=>a+b.amount,0);
export const mt=(n:number)=>new Intl.NumberFormat("pt-MZ",{maximumFractionDigits:0}).format(n)+" MT";

import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const app=read("src/App.tsx"), roles=read("src/config/roles.ts");
const state=read("src/state/DemoProvider.tsx"), index=read("index.html");
assert.ok(app.includes("/welcome")&&app.includes("/login")&&app.includes("/app/:role"),"Independent portal routes required");
for(const role of ["student","guardian","teacher","pedagogy","reception","secretary","finance","executive"])assert.ok(roles.includes(role),"Missing profile: "+role);
assert.ok(state.includes("markAbsent")&&state.includes("validatePayment"),"Cross-role demo flows required");
const studentMenu=roles.split('student:{')[1]?.split('guardian:{')[0]??"";
assert.ok(studentMenu.length>20&&!/payments|finance|propinas|wallet/i.test(studentMenu),"Student menu must never contain finance");
for(const action of ["createStudent","editStudent","archiveStudent","assignStudent","createAdmission","updateAdmission","recordAttendance","recordGrade","publishGrades","submitPayment","validateFee"]){
 assert.ok(state.includes(action),"School operation missing: "+action);
}
const curriculum=read("src/data/curriculum.ts");
assert.ok(curriculum.includes("length:12")&&curriculum.includes("validatedBySchool:false"),"12 configurable grades must remain provisional");
const school=read("src/data/school.ts");
assert.ok(school.includes("Elisa Simango")&&school.includes("Marta Nhampossa"),"Consistent fictional school personas required");
assert.ok(index.includes("Demonstração EduCore"),"Demo must not claim production readiness");
assert.ok(existsSync(new URL("../public/assets/colus-logo.jpg",import.meta.url)),"Official brand asset missing");
for(const path of ["src/App.tsx","src/pages/EntryPages.tsx","src/pages/Workspace.tsx","src/components/RoleShell.tsx"]){const t=read(path);assert.ok(!/Deus Connosco|P[aá]scoa/i.test(t),"Foreign-school content in "+path);}
const weekly=read("src/components/WeeklyTimetable.tsx");
assert.ok(weekly.includes("SCHOOL_WEEK.map")&&weekly.includes("WeeklyLessonList"),"Full week list must be rendered without day tabs");
const academic=read("src/pages/AcademicManagement.tsx");
assert.ok(academic.includes("WeeklyLessonList")&&academic.includes("onRemove={removeLesson}"),"Pedagogy must manage the whole week in one list");
const workspace=read("src/pages/Workspace.tsx");
assert.ok(workspace.includes("RoleWeeklyTimetable")&&workspace.includes('allowedRole==="guardian"'),"All academic roles must use shared weekly schedule");
const extended=read("src/pages/OperationalWorkflows.tsx");
for(const module of ["TeacherSessionAttendance","AbsenceCases","AssessmentWorkflow","NoticesWorkspace","DocumentsWorkspace","FinanceOperations","InterventionsWorkspace","ExecutiveReports"]){
 assert.ok(extended.includes("export function "+module),"Missing cross-role workflow: "+module);
}
const learning=read("src/pages/LearningWorkflows.tsx");
assert.ok(learning.includes("export function LearningWorkspace")&&learning.includes("StudentRecord"),"Student and teacher learning workflows required");
const booking=read("src/pages/SchoolAppointments.tsx");
assert.ok(booking.includes("requestAppointment")&&booking.includes("decideAppointment"),"Guardian-reception scheduling required");
assert.ok(!studentMenu.includes('["finance"')&&!studentMenu.includes('["payments"'),"Student finance must remain excluded");
const center=read("src/components/DashboardActionCenter.tsx");
assert.ok(center.includes("OperationalPriorities")&&center.includes("Fila de validação")&&center.includes("Falta registada"),"Role dashboards need contextual tasks and accurate family alerts");
const shell=read("src/components/RoleShell.tsx");
assert.ok(shell.includes("primaryMobileTabs")&&shell.includes('pathname.split("/")[3]'),"Mobile tabs and nested-page breadcrumbs required");
assert.ok(!read("src/pages/Workspace.tsx").includes("function TeacherSpotlight"),"Fixed-date teacher quick attendance must not return");
console.log("COLUS PORTAL CONTRACT PASS: 8 profiles, split routes, brand, cross-role demo and no foreign-school copy");

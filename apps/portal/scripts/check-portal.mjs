import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const app=read("src/App.tsx"), roles=read("src/config/roles.ts");
const state=read("src/state/DemoProvider.tsx"), index=read("index.html");
assert.ok(app.includes("/welcome")&&app.includes("/login")&&app.includes("/app/:role"),"Independent portal routes required");
for(const role of ["student","guardian","teacher","pedagogy","reception","secretary","finance","executive"])assert.ok(roles.includes(role),"Missing profile: "+role);
assert.ok(state.includes("markAbsent")&&state.includes("validatePayment"),"Cross-role demo flows required");
assert.ok(index.includes("Demonstração EduCore"),"Demo must not claim production readiness");
assert.ok(existsSync(new URL("../public/assets/colus-logo.jpg",import.meta.url)),"Official brand asset missing");
for(const path of ["src/App.tsx","src/pages/EntryPages.tsx","src/pages/Workspace.tsx","src/components/RoleShell.tsx"]){const t=read(path);assert.ok(!/Deus Connosco|P[aá]scoa/i.test(t),"Foreign-school content in "+path);}
console.log("COLUS PORTAL CONTRACT PASS: 8 profiles, split routes, brand, cross-role demo and no foreign-school copy");

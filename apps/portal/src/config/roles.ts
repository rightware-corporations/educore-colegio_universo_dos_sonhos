import type { LucideIcon } from "lucide-react";
import { GraduationCap, Users, BookOpen, Layers, Headset, Files, Wallet, ChartNoAxesCombined } from "lucide-react";

export const ROLES = ["student","guardian","teacher","pedagogy","reception","secretary","finance","executive"] as const;
export type Role = typeof ROLES[number];
export type NavItem = { path:string; label:string };
export type RoleDef = { label:string; short:string; caption:string; icon:LucideIcon; items:NavItem[] };
const items=(...xs:[string,string][]):NavItem[]=>xs.map(([path,label])=>({path,label}));
export const ROLE_DEFS:Record<Role,RoleDef>={
  student:{label:"Aluno",short:"Aluno",caption:"Aprendizagem e percurso académico",icon:GraduationCap,items:items(["dashboard","Visão geral"],["grades","Notas"],["schedule","Horário"],["attendance","Assiduidade"])},
  guardian:{label:"Encarregado de educação",short:"Encarregado",caption:"Acompanhamento dos educandos",icon:Users,items:items(["dashboard","Visão geral"],["attendance","Assiduidade"],["payments","Pagamentos"],["messages","Mensagens"])},
  teacher:{label:"Professor",short:"Professor",caption:"Turmas, aulas e acompanhamento",icon:BookOpen,items:items(["dashboard","Visão geral"],["attendance","Presenças"],["schedule","Horário"],["messages","Comunicação"])},
  pedagogy:{label:"Coordenação pedagógica",short:"Pedagogia",caption:"Desempenho e acompanhamento escolar",icon:Layers,items:items(["dashboard","Visão geral"],["attendance","Assiduidade"],["grades","Avaliações"],["schedule","Horários"])},
  reception:{label:"Receção",short:"Receção",caption:"Atendimento e processos de entrada",icon:Headset,items:items(["dashboard","Visão geral"],["admissions","Pedidos"],["messages","Comunicação"])},
  secretary:{label:"Secretaria",short:"Secretaria",caption:"Alunos e processos administrativos",icon:Files,items:items(["dashboard","Visão geral"],["admissions","Matrículas"],["schedule","Calendário"])},
  finance:{label:"Finanças",short:"Finanças",caption:"Pagamentos e controlo financeiro",icon:Wallet,items:items(["dashboard","Visão geral"],["payments","Pagamentos"],["messages","Comunicação"])},
  executive:{label:"Direção",short:"Direção",caption:"Visão de conjunto da instituição",icon:ChartNoAxesCombined,items:items(["dashboard","Visão geral"],["attendance","Académico"],["payments","Financeiro"],["admissions","Matrículas"])},
};
export function isRole(v:string|undefined):v is Role {return ROLES.some(x=>x===v);}

import type { LucideIcon } from "lucide-react";
import { GraduationCap, Users, BookOpen, Layers, Headset, Files, Wallet, ChartNoAxesCombined } from "lucide-react";
export const ROLES=["student","guardian","teacher","pedagogy","reception","secretary","finance","executive"] as const;
export type Role=typeof ROLES[number];
export type NavItem={path:string;label:string};
export type RoleDef={label:string;short:string;caption:string;icon:LucideIcon;items:NavItem[]};
const items=(...pairs:[string,string][]):NavItem[]=>pairs.map(([path,label])=>({path,label}));
export const ROLE_DEFS:Record<Role,RoleDef>={
 student:{label:"Aluno",short:"Aluno",caption:"Aprendizagem e percurso académico",icon:GraduationCap,
 items:items(["dashboard","Visão geral"],["subjects","Disciplinas"],["grades","Notas"],["schedule","Horário"],["attendance","Assiduidade"],["assignments","Trabalhos"])},
 guardian:{label:"Encarregado de educação",short:"Encarregado",caption:"Acompanhamento integral dos educandos",icon:Users,
 items:items(["dashboard","Visão geral"],["children","Educandos"],["grades","Desempenho"],["attendance","Assiduidade"],["payments","Pagamentos"],["schedule","Horários"],["messages","Mensagens"])},
 teacher:{label:"Professor",short:"Professor",caption:"Turmas, conteúdos e acompanhamento",icon:BookOpen,
 items:items(["dashboard","Visão geral"],["classes","Minhas turmas"],["attendance","Presenças"],["grades","Avaliações"],["schedule","Horários"],["messages","Comunicação"])},
 pedagogy:{label:"Coordenação pedagógica",short:"Pedagogia",caption:"Gestão académica e validação de avaliações",icon:Layers,
 items:items(["dashboard","Visão geral"],["classes","Classes e turmas"],["staff","Professores"],["assignments","Atribuições docentes"],["timetable","Horários letivos"],["grades","Avaliações"],["attendance","Assiduidade"],["schedule","Currículo"])},
 reception:{label:"Receção",short:"Receção",caption:"Atendimento e encaminhamento de pedidos",icon:Headset,
 items:items(["dashboard","Visão geral"],["admissions","Pedidos de admissão"],["messages","Atendimento"])},
 secretary:{label:"Secretaria",short:"Secretaria",caption:"Matrículas, alunos e documentação",icon:Files,
 items:items(["dashboard","Visão geral"],["students","Registo de alunos"],["admissions","Matrículas"],["classes","Turmas"],["documents","Documentação"])},
 finance:{label:"Finanças",short:"Finanças",caption:"Contas, pagamentos e validação financeira",icon:Wallet,
 items:items(["dashboard","Visão geral"],["payments","Pagamentos"],["accounts","Contas e saldos"])},
 executive:{label:"Direção",short:"Direção",caption:"Indicadores e visão institucional",icon:ChartNoAxesCombined,
 items:items(["dashboard","Visão geral"],["analytics","Analítica"],["classes","Académico"],["payments","Financeiro"],["admissions","Admissões"])},
};
export function isRole(v:string|undefined):v is Role{return ROLES.some(x=>x===v);}

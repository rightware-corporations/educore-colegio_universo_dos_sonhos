export type SchoolRole =
  | "student"
  | "guardian"
  | "teacher"
  | "pedagogy"
  | "reception"
  | "secretary"
  | "finance"
  | "executive";

export const ROLE_LABELS: Record<SchoolRole, string> = {
  student: "Aluno",
  guardian: "Encarregado",
  teacher: "Professor",
  pedagogy: "Pedagogia",
  reception: "Receção",
  secretary: "Secretaria",
  finance: "Finanças / SIGA ERP",
  executive: "Direção",
};

export const SCHOOL_ROLES = Object.keys(ROLE_LABELS) as SchoolRole[];

export function isSchoolRole(value: string | undefined): value is SchoolRole {
  return Boolean(value && SCHOOL_ROLES.includes(value as SchoolRole));
}

import type { SchoolRole } from "@/types/roles";

export interface RoleNavItem {
  label: string;
  path: string;
}

const nav = (role: SchoolRole, labels: string[]): RoleNavItem[] =>
  labels.map((label) => ({
    label,
    path: `/app/${role}/${label
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "dashboard"}`,
  }));

export const ROLE_NAVIGATION: Record<SchoolRole, RoleNavItem[]> = {
  student: nav("student", ["Painel", "Disciplinas", "Horário Semanal", "Avaliações", "Notas", "Assiduidade", "Conteúdos", "Trabalhos", "Chat", "Atualizações", "Notificações", "Finanças"]),
  guardian: nav("guardian", ["Painel", "Educandos", "Desempenho", "Avaliações", "Assiduidade", "Horário Semanal", "Finanças", "Pagamentos", "Documentos", "Chat", "Notificações"]),
  teacher: nav("teacher", ["Painel", "Horário", "Minhas Turmas", "Presenças", "Avaliações", "Notas", "Trabalhos", "Conteúdos", "Plano de Aula", "Chat", "Notificações"]),
  pedagogy: nav("pedagogy", ["Painel", "Aprovações", "Ano Letivo", "Classes", "Turmas", "Disciplinas", "Professores", "Atribuições", "Horários", "Calendário de Avaliações", "Notas e Publicação", "Assiduidade", "Risco", "Intervenções", "Analítica", "Relatórios", "Notificações"]),
  reception: nav("reception", ["Painel", "Pedidos", "Admissões", "Documentos Recebidos", "Atendimento", "Marcações", "Solicitações", "Notificações"]),
  secretary: nav("secretary", ["Painel", "Admissões", "Matrículas", "Alunos", "Encarregados", "Documentos", "Transferências", "Regularidade", "Processos", "Notificações"]),
  finance: nav("finance", ["Painel", "Pagamentos", "Validação", "Faturas", "Obrigações", "Contas", "Devedores", "Recibos", "Multas", "Tesouraria", "Relatórios"]),
  executive: nav("executive", ["Painel Executivo", "Académico", "Administrativo", "Financeiro", "Matrículas", "Risco", "Relatórios", "Aprovações Excecionais", "Auditoria"]),
};

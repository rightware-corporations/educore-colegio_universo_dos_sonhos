import { Navigate, NavLink, useParams } from "react-router-dom";
import { ROLE_NAVIGATION } from "@/shared/navigation/roleNavigation";
import { isSchoolRole, ROLE_LABELS } from "@/types/roles";
import { useDemoStore } from "@/demo/store/DemoStore";

export function RoleWorkspacePage() {
  const { role } = useParams();
  const demo = useDemoStore();

  if (!isSchoolRole(role)) {
    return <Navigate to="/login" replace />;
  }

  const items = ROLE_NAVIGATION[role];

  return (
    <main className="min-h-screen bg-[#F4F6F8] text-colus-text lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="bg-colus-ink p-6 text-white lg:min-h-screen">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-colus-orange">
            COLUS · EduCore
          </p>
          <h1 className="mt-2 text-xl font-bold">{ROLE_LABELS[role]}</h1>
        </div>
        <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <section className="p-6 md:p-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-colus-deep-blue">
                Presentation build foundation
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">
                {ROLE_LABELS[role]}
              </h2>
            </div>
            <button
              onClick={demo.reset}
              className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold"
            >
              Reset demo
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-colus-muted">Aluno central</p>
              <strong className="mt-2 block text-xl">{demo.state.student.name}</strong>
              <span className="text-sm text-colus-muted">{demo.state.student.className}</span>
            </article>
            <article className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-colus-muted">Assiduidade</p>
              <strong className="mt-2 block text-xl">
                {demo.state.student.attendanceStatus === "absent" ? "Falta registada" : "Presente"}
              </strong>
              <span className="text-sm text-colus-muted">
                Alertas do encarregado: {demo.state.guardianUnread}
              </span>
            </article>
            <article className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-colus-muted">Pagamento demo</p>
              <strong className="mt-2 block text-xl">
                {demo.state.payment.amount.toLocaleString("pt-PT")} MT
              </strong>
              <span className="text-sm text-colus-muted">
                {demo.state.payment.status === "validated" ? "Validado" : "Pendente"}
              </span>
            </article>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {role === "teacher" && (
              <>
                <button
                  onClick={demo.markAbsent}
                  className="rounded-xl bg-colus-deep-blue px-4 py-2.5 text-sm font-bold text-white"
                >
                  Registar falta da Amélia
                </button>
                <button
                  onClick={() =>
                    demo.sendMessage(
                      "teacher",
                      "Gostaria de conversar sobre a evolução da Amélia.",
                    )
                  }
                  className="rounded-xl bg-colus-orange px-4 py-2.5 text-sm font-bold text-colus-ink"
                >
                  Mensagem ao encarregado
                </button>
              </>
            )}
            {role === "finance" && (
              <button
                onClick={demo.validatePayment}
                className="rounded-xl bg-colus-deep-blue px-4 py-2.5 text-sm font-bold text-white"
              >
                Validar pagamento
              </button>
            )}
          </div>

          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">Estado partilhado da demonstração</h3>
            <p className="mt-2 text-sm leading-6 text-colus-muted">
              Esta fundação prova o contrato de estado cross-role. As páginas finais de cada
              perfil substituirão esta superfície, mantendo a mesma fonte de estado.
            </p>
            <div className="mt-5 space-y-2">
              {demo.state.messages.map((message) => (
                <div key={message.id} className="rounded-xl bg-[#F7F8FA] p-3 text-sm">
                  <strong>{message.author === "teacher" ? "Professor" : "Encarregado"}:</strong>{" "}
                  {message.text}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

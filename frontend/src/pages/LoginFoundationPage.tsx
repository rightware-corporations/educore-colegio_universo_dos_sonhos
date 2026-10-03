import { Link } from "react-router-dom";
import { ROLE_LABELS, SCHOOL_ROLES } from "@/types/roles";

export function LoginFoundationPage() {
  return (
    <main className="min-h-screen bg-colus-paper px-6 py-12 text-colus-text md:px-12">
      <div className="mx-auto max-w-6xl">
        <Link to="/" className="text-sm font-semibold text-colus-deep-blue">
          ← COLUS
        </Link>
        <div className="mt-12 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-colus-orange">
            Demonstração interna
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] md:text-5xl">
            Escolher experiência
          </h1>
          <p className="mt-4 text-colus-muted">
            Entrada temporária para validação dos oito perfis escolares. Esta
            superfície será substituída pelo login final COLUS.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SCHOOL_ROLES.map((role) => (
            <Link
              key={role}
              to={`/app/${role}/painel`}
              className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-colus-deep-blue">
                Perfil
              </span>
              <strong className="mt-3 block text-lg">{ROLE_LABELS[role]}</strong>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

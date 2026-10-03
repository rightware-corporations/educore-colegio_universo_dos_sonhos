import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { ColusMark } from "./ColusMark";

const footerGroups = [
  ["PLATFORM", ["Overview", "Features", "Pricing", "Integrations"]],
  ["SOLUTIONS", ["Schools", "Multi-Campus", "Administrators", "Educators"]],
  ["SUPPORT", ["Help Center", "Documentation", "Training", "Contact"]],
  ["COMPANY", ["About", "Blog", "Careers", "News"]],
] as const;

export function ContactFooter() {
  return (
    <>
      <section
        id="contactos"
        data-header-theme="light"
        className="relative min-h-[100svh] scroll-mt-24 overflow-hidden bg-colus-paper px-5 py-28 md:px-8 lg:min-h-[95vh] lg:px-16"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-colus-orange/15 blur-3xl" />
        <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-[1440px] flex-col items-center justify-center text-center">
          <ColusMark className="h-28 w-32" compact />
          <h2 className="mt-8 max-w-[16ch] font-editorial text-[clamp(42px,5vw,76px)] font-medium leading-[1.02] tracking-[-.03em] text-colus-ink">
            Venha conhecer de perto o Universo dos Sonhos.
          </h2>
          <p className="mt-6 max-w-[54ch] text-base leading-7 text-colus-muted md:text-lg">
            Descubra a experiência, o ambiente e a comunidade que dão vida ao COLUS.
          </p>
          <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row">
            <a
              href="mailto:info@colus.ac.mz?subject=Pedido%20de%20visita%20ao%20COLUS"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-colus-ink px-7 text-sm font-bold text-white transition hover:-translate-y-0.5"
            >
              Marcar uma visita <ArrowRight className="h-4 w-4" />
            </a>
            <a href="tel:+258847000242" className="inline-flex items-center gap-2 text-sm font-semibold text-colus-ink">
              Falar connosco <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-14 grid w-full max-w-5xl gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
            <a href="mailto:info@colus.ac.mz" className="rounded-2xl border border-black/8 bg-white/50 p-4">
              <Mail className="h-4 w-4 text-colus-orange" />
              <span className="mt-3 block text-sm font-semibold">info@colus.ac.mz</span>
            </a>
            <a href="tel:+258847000242" className="rounded-2xl border border-black/8 bg-white/50 p-4">
              <Phone className="h-4 w-4 text-colus-orange" />
              <span className="mt-3 block text-sm font-semibold">+258 84 700 0242</span>
            </a>
            <div className="rounded-2xl border border-black/8 bg-white/50 p-4">
              <MapPin className="h-4 w-4 text-colus-orange" />
              <span className="mt-3 block text-sm font-semibold">Matola-Rio · KM 16</span>
            </div>
            <a href="https://www.instagram.com/colus_mz" target="_blank" rel="noreferrer" className="rounded-2xl border border-black/8 bg-white/50 p-4">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-colus-orange">Instagram</span>
              <span className="mt-3 block text-sm font-semibold">@colus_mz</span>
            </a>
          </div>
        </div>
      </section>

      <footer data-header-theme="hidden" className="bg-colus-ink px-5 py-16 text-white md:px-8 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.4fr_repeat(4,1fr)_1.4fr]">
            <div>
              <p className="text-2xl font-bold">EduCore</p>
              <p className="mt-4 max-w-[28ch] text-sm leading-6 text-white/55">
                Integrated school management for stronger institutions.
              </p>
            </div>

            {footerGroups.map(([title, items]) => (
              <div key={title}>
                <p className="text-xs font-bold tracking-[0.12em] text-white/45">{title}</p>
                <div className="mt-4 grid gap-2 text-sm text-white/65">
                  {items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            ))}

            <div className="lg:text-right">
              <p className="text-xl font-bold tracking-[0.08em]">RIGHTWARE</p>
              <p className="mt-3 text-sm text-white/55">A RIGHTWARE Product</p>
              <p className="mt-6 text-xs text-white/35">LinkedIn · YouTube · X · Instagram</p>
            </div>
          </div>

          <div className="flex flex-col gap-5 pt-8 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
            <div>
              <p>© 2026 Colégio Universo dos Sonhos. Todos os direitos reservados.</p>
              <p className="mt-2">Powered by EduCore · A RIGHTWARE Product</p>
            </div>
            <p>Privacy Policy · Terms of Service · Cookie Policy · System Status</p>
          </div>
        </div>
      </footer>
    </>
  );
}

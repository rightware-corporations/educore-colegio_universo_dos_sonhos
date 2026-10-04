import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useRef } from "react";
import { ColusOfficialSymbol } from "./ColusOfficialSymbol";

const footerGroups = [
  ["PLATFORM", ["Overview", "Features", "Pricing", "Integrations"]],
  ["SOLUTIONS", ["Schools", "Multi-Campus", "Administrators", "Educators"]],
  ["SUPPORT", ["Help Center", "Documentation", "Training", "Contact"]],
  ["COMPANY", ["About", "Blog", "Careers", "News"]],
] as const;

export function ContactFooter() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.28, once: true });
  const reduceMotion = useReducedMotion();
  const visible = reduceMotion || inView;

  return (
    <>
      <section
        ref={ref}
        id="contactos"
        data-header-theme="light"
        className="relative isolate min-h-[100svh] scroll-mt-24 overflow-hidden bg-colus-paper px-5 py-24 md:px-8 lg:min-h-[95vh] lg:px-16 lg:py-28"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }}
          animate={visible ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute left-1/2 top-[42%] h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,252,248,.92)_0%,rgba(241,129,54,.18)_34%,rgba(241,129,54,.05)_58%,transparent_72%)] blur-xl md:h-[34rem] md:w-[34rem]"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex min-h-[72vh] max-w-[1440px] flex-col items-center justify-center text-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.48, delay: reduceMotion ? 0 : 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mix-blend-multiply"
          >
            <ColusOfficialSymbol className="h-24 md:h-28" />
          </motion.div>

          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={visible ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.58, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-[16ch] font-editorial text-[clamp(40px,5vw,76px)] font-medium leading-[1.02] tracking-[-.03em] text-colus-ink"
          >
            Venha conhecer de perto o Universo dos Sonhos.
          </motion.h2>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-[54ch] text-base leading-7 text-colus-muted md:text-lg"
          >
            Descubra a experiência, o ambiente e a comunidade que dão vida ao COLUS.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.46, delay: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex w-full max-w-md flex-col items-stretch gap-5 sm:w-auto sm:max-w-none sm:flex-row sm:items-center"
          >
            <a
              href="mailto:info@colus.ac.mz?subject=Pedido%20de%20visita%20ao%20COLUS"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-colus-ink px-7 text-sm font-bold text-white transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-colus-deep-blue focus-visible:ring-offset-4"
            >
              Marcar uma visita
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+258847000242"
              className="group inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-colus-ink"
            >
              Falar connosco
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={visible ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.48, delay: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 grid w-full max-w-5xl grid-cols-1 border-y border-black/10 text-left sm:grid-cols-2 lg:grid-cols-4"
          >
            <a
              href="mailto:info@colus.ac.mz"
              className="group flex min-h-24 items-center gap-4 border-b border-black/10 py-5 sm:border-r lg:border-b-0"
            >
              <Mail className="h-4 w-4 shrink-0 text-colus-orange" />
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-colus-muted">Email</span>
                <span className="mt-1 block text-sm font-semibold group-hover:underline">info@colus.ac.mz</span>
              </div>
            </a>

            <a
              href="tel:+258847000242"
              className="group flex min-h-24 items-center gap-4 border-b border-black/10 py-5 sm:pl-5 lg:border-b-0 lg:border-r"
            >
              <Phone className="h-4 w-4 shrink-0 text-colus-orange" />
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-colus-muted">Telefone</span>
                <span className="mt-1 block text-sm font-semibold group-hover:underline">+258 84 700 0242</span>
              </div>
            </a>

            <div className="flex min-h-24 items-center gap-4 border-b border-black/10 py-5 sm:border-r lg:border-b-0 lg:pl-5">
              <MapPin className="h-4 w-4 shrink-0 text-colus-orange" />
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-colus-muted">Localização</span>
                <span className="mt-1 block text-sm font-semibold">Matola-Rio · KM 16</span>
              </div>
            </div>

            <a
              href="https://www.instagram.com/colus_mz"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram do COLUS, abre numa nova janela"
              className="group flex min-h-24 items-center py-5 sm:pl-5"
            >
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-colus-orange">Instagram</span>
                <span className="mt-1 block text-sm font-semibold group-hover:underline">@colus_mz</span>
              </div>
            </a>
          </motion.div>
        </div>

        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full text-colus-deep-blue/12"
          aria-hidden="true"
        >
          <path d="M-20 150 C310 30 490 30 720 130 C950 30 1130 30 1460 150" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M-20 172 C320 72 520 64 720 154 C920 64 1120 72 1460 172" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </section>

      <footer
        data-header-theme="hidden"
        className="bg-colus-ink px-5 py-14 text-white md:px-8 lg:px-16 lg:py-16"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_repeat(4,1fr)_1.4fr] lg:gap-8 lg:pb-14">
            <div>
              <p className="text-2xl font-bold tracking-[-.03em]">EduCore</p>
              <p className="mt-4 max-w-[28ch] text-sm leading-6 text-white/55">
                Integrated school management for stronger institutions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:contents">
              {footerGroups.map(([title, items]) => (
                <div key={title}>
                  <p className="text-xs font-bold tracking-[0.12em] text-white/45">{title}</p>
                  <div className="mt-4 grid gap-2 text-sm text-white/65">
                    {items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 lg:text-right">
              <p className="text-xl font-bold tracking-[0.08em]">RIGHTWARE</p>
              <p className="mt-3 text-sm text-white/55">A RIGHTWARE Product</p>
              <p className="mt-6 text-xs text-white/35">LinkedIn · YouTube · X · Instagram</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 pt-8 text-xs leading-5 text-white/45 md:flex-row md:items-end md:justify-between">
            <div>
              <p>© 2026 Colégio Universo dos Sonhos. Todos os direitos reservados.</p>
              <p className="mt-2">Powered by EduCore · A RIGHTWARE Product</p>
            </div>
            <p className="max-w-xl md:text-right">
              Privacy Policy · Terms of Service · Cookie Policy · System Status
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

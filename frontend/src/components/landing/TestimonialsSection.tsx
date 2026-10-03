import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: true });
  const reduceMotion = useReducedMotion();

  const visible = reduceMotion || inView;

  return (
    <section
      ref={ref}
      data-header-theme="dark"
      className="relative min-h-screen overflow-hidden bg-colus-ink px-5 py-24 text-white md:px-8 lg:px-16 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(12,88,152,.16),transparent_24%)]"
      />

      <div className="relative mx-auto flex min-h-[72vh] max-w-[1440px] items-center">
        <div className="w-full max-w-5xl">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-orange"
          >
            Vozes COLUS
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.58, delay: reduceMotion ? 0 : 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-[18ch] font-editorial text-[clamp(36px,4.3vw,68px)] font-medium leading-[1.04] tracking-[-.025em] text-colus-white"
          >
            TESTEMUNHO REAL / AUTORIZADO — A INSERIR
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={visible ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-sm font-semibold tracking-[0.08em] text-white/48"
          >
            NOME / RELAÇÃO COM A ESCOLA — A VALIDAR
          </motion.p>

          <div className="mt-16 max-w-4xl">
            <div className="relative h-px bg-white/14">
              <motion.span
                initial={reduceMotion ? false : { left: "0%" }}
                animate={visible ? { left: "100%" } : undefined}
                transition={{ duration: 1.05, delay: reduceMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-[5px] h-3 w-3 -translate-x-1/2 rounded-full bg-colus-orange"
                aria-hidden="true"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
              <span>01</span>
              <span>Vozes COLUS</span>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.82 }}
        animate={visible ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.72, delay: reduceMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -bottom-24 right-[8%] h-52 w-52 rounded-full bg-colus-orange/8 blur-3xl"
        aria-hidden="true"
      />
    </section>
  );
}

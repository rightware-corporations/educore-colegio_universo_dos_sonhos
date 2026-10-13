import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { LandingMedia } from "./LandingMedia";

const MEDIA_ROOT = "/media/colus/landing/colus-assets-final-v03";

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.12, once: true });
  const reduceMotion = useReducedMotion();
  const visible = reduceMotion || inView;

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: visible ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.6, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={ref}
      data-header-theme="dark"
      className="relative overflow-hidden bg-colus-ink px-5 py-24 text-white md:px-8 lg:px-16 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(12,88,152,.25),transparent_35%)]"
      />

      <div className="relative mx-auto grid min-h-[78vh] max-w-[1440px] items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <motion.p
            {...reveal(0)}
            className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-orange"
          >
            Vozes COLUS
          </motion.p>

          <motion.h2
            {...reveal(0.06)}
            className="mt-8 max-w-[17ch] font-editorial text-[clamp(38px,4.4vw,72px)] font-medium leading-[1.04] tracking-[-.025em] text-colus-white"
          >
            São as pessoas que dão vida a cada conquista.
          </motion.h2>

          <motion.p
            {...reveal(0.12)}
            className="mt-8 max-w-[50ch] text-base leading-7 text-white/70"
          >
            Cada descoberta, cada encontro e cada passo fazem parte da experiência COLUS.
            A escola constrói-se com quem aprende, acompanha e participa.
          </motion.p>

          <motion.div {...reveal(0.18)} className="mt-12 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-colus-orange">
              Histórias da comunidade
            </p>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Espaço editorial reservado a testemunhos reais de alunos, famílias
              e educadores, a publicar apenas com a devida autorização.
            </p>
          </motion.div>

          <div className="mt-14 max-w-xl">
            <div className="relative h-px bg-white/20">
              <motion.span
                initial={reduceMotion ? false : { left: "0%" }}
                animate={visible ? { left: "100%" } : undefined}
                transition={{ duration: 1.1, delay: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-[5px] h-3 w-3 -translate-x-1/2 rounded-full bg-colus-orange"
                aria-hidden="true"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
              <span>A nossa comunidade</span>
              <span>Histórias que nos ligam</span>
            </div>
          </div>
        </div>

        <motion.figure
          {...reveal(0.22)}
          className="relative mx-auto w-full max-w-[540px] lg:col-span-5"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[84px_30px_90px_30px] bg-colus-ink-soft sm:aspect-[5/5] lg:aspect-[4/5]">
            <LandingMedia
              kind="image"
              src={`${MEDIA_ROOT}/06-pertencer/COLUS-PERTENCER-INTERACAO-001.webp`}
              alt="Momentos reais de participação na comunidade escolar COLUS"
              className="object-[center_35%]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-colus-ink/60 via-transparent to-transparent" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 -left-5 h-24 w-32 rounded-[50%] border border-colus-bright-blue/35"
          >
            <span className="absolute left-[16%] top-[20%] h-3 w-3 rounded-full bg-colus-orange" />
          </div>
          <figcaption className="relative mt-5 text-xs font-semibold uppercase tracking-[0.13em] text-white/55">
            A vida COLUS, vista de perto
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

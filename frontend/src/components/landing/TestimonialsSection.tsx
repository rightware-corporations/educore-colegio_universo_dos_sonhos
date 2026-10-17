import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LandingMedia } from "./LandingMedia";
import { EditorialOrbitNode } from "./EditorialOrbitNode";

const MEDIA_ROOT = "/media/colus/landing/colus-assets-final-v03";

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.12, once: true });
  const reduceMotion = useReducedMotion();
  const visible = reduceMotion || inView;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const storyLineLength = useTransform(scrollYProgress, [0.18, 0.76], [0, 1]);
  const storyNodeX = useTransform(scrollYProgress, [0.18, 0.76], ["0%", "100%"]);

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: visible ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.6, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={ref}
      id="vozes-colus"
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
            {/* Filled, scroll-linked rail node on mobile; desktop keeps its approved line. */}
            <div className="relative h-[2px] bg-white/20 lg:hidden" aria-hidden="true">
              <motion.div
                style={reduceMotion ? { scaleX: 1 } : { scaleX: storyLineLength }}
                className="absolute inset-0 origin-left bg-gradient-to-r from-colus-bright-blue to-colus-orange"
              />
              <motion.div
                style={{ left: reduceMotion ? "100%" : storyNodeX }}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <EditorialOrbitNode progress={scrollYProgress} size="compact" />
              </motion.div>
            </div>
            <div className="relative hidden h-px bg-white/20 lg:block">
              <motion.div
                style={reduceMotion ? undefined : { scaleX: storyLineLength }}
                className="absolute inset-0 origin-left bg-gradient-to-r from-colus-bright-blue to-colus-orange"
                aria-hidden="true"
              />
              <motion.div
                style={{ left: reduceMotion ? "100%" : storyNodeX }}
                className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                aria-hidden="true"
              >
                <EditorialOrbitNode progress={scrollYProgress} size="compact" />
              </motion.div>
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
          {/* Filled mobile orbit inside the photo edge; caption remains readable. */}
          <div className="pointer-events-none absolute bottom-16 left-2 z-10 lg:hidden" aria-hidden="true">
            <EditorialOrbitNode progress={scrollYProgress} />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute hidden -bottom-6 -left-5 h-24 w-32 rounded-[50%] border border-colus-bright-blue/35 lg:block"
          >
            <div className="absolute left-[16%] top-[20%]">
              <EditorialOrbitNode progress={scrollYProgress} size="compact" />
            </div>
          </div>
          <figcaption className="relative mt-5 text-xs font-semibold uppercase tracking-[0.13em] text-white/55">
            A vida COLUS, vista de perto
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

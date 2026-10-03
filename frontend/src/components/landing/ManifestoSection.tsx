import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LandingMedia } from "./LandingMedia";

const MEDIA_ROOT = "/media/colus/landing";

export function ManifestoSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const mediaScale = useTransform(scrollYProgress, [0.08, 0.48], [0.9, 1]);
  const mediaY = useTransform(scrollYProgress, [0.08, 0.55], [72, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const nodeX = useTransform(scrollYProgress, [0.42, 0.85], ["0%", "280%"]);

  return (
    <section
      ref={ref}
      id="o-colegio"
      data-header-theme="light"
      className="relative min-h-[170vh] scroll-mt-24 overflow-hidden bg-colus-paper"
    >
      <div className="sticky top-0 flex min-h-screen items-center py-24">
        <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-5 md:px-8 lg:grid-cols-12 lg:px-16">
          <motion.div
            style={reduceMotion ? undefined : { opacity: textOpacity }}
            className="self-center lg:col-span-7"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-deep-blue">
              A experiência COLUS
            </p>
            <h2 className="mt-7 max-w-[16ch] font-editorial text-[clamp(42px,4.3vw,68px)] font-medium leading-[1.02] tracking-[-.025em] text-colus-ink">
              Aprender é descobrir o que somos capazes de transformar.
            </h2>
            <p className="mt-8 max-w-[56ch] text-base leading-7 text-colus-muted md:text-lg">
              Curiosidade, conhecimento e confiança ganham espaço quando a aprendizagem se aproxima da vida, das pessoas e do mundo.
            </p>

            <div className="mt-12 h-px max-w-md bg-black/10">
              <motion.span
                style={reduceMotion ? undefined : { x: nodeX }}
                className="block h-3 w-3 -translate-y-[5px] rounded-full bg-colus-orange"
              />
            </div>
          </motion.div>

          <div className="relative lg:col-span-5">
            <motion.div
              style={reduceMotion ? undefined : { scale: mediaScale, y: mediaY }}
              className="relative mx-auto h-[58vh] min-h-[460px] max-w-[480px] overflow-hidden rounded-[48%_52%_22%_18%/28%_26%_18%_22%]"
            >
              <LandingMedia
                kind="image"
                src={`${MEDIA_ROOT}/02-manifesto/COLUS-MANIFESTO-HUMANO-001.webp`}
                alt="Momento humano da experiência COLUS"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-colus-ink/20 via-transparent to-transparent" />
            </motion.div>
            <div className="pointer-events-none absolute -bottom-10 -left-8 h-40 w-64 rounded-[50%] border border-colus-deep-blue/15" />
          </div>
        </div>
      </div>
    </section>
  );
}

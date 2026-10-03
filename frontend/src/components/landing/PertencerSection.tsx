import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LandingMedia } from "./LandingMedia";

const MEDIA_ROOT = "/media/colus/landing";

export function PertencerSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const ringLength = useTransform(scrollYProgress, [0.05, 0.82], [0, 1]);
  const mediaA = useTransform(scrollYProgress, [0.06, 0.25], [0, 1]);
  const mediaB = useTransform(scrollYProgress, [0.24, 0.48], [0, 1]);
  const mediaC = useTransform(scrollYProgress, [0.46, 0.7], [0, 1]);

  return (
    <section
      ref={ref}
      id="comunidade"
      data-header-theme="light"
      className="relative min-h-[120svh] scroll-mt-24 overflow-hidden bg-colus-white py-24 lg:min-h-[130vh]"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
        <div className="relative mx-auto min-h-[92vh] max-w-6xl">
          <div className="relative z-20 max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-orange">Pertencer</p>
            <h2 className="mt-5 max-w-[14ch] font-editorial text-[clamp(40px,4.3vw,68px)] font-medium leading-[1.03] tracking-[-.03em] text-colus-ink">
              Crescer é uma jornada partilhada.
            </h2>
            <p className="mt-6 max-w-[56ch] text-base leading-7 text-colus-muted md:text-lg">
              Escola, alunos e famílias constroem experiências mais fortes quando participam, acompanham e crescem em conjunto.
            </p>
          </div>

          <svg viewBox="0 0 1100 720" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <motion.path
              d="M120 560 C160 240 440 100 690 170 C930 238 984 448 830 610"
              fill="none"
              stroke="#0C5898"
              strokeOpacity=".2"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: reduceMotion ? 1 : ringLength }}
            />
            <motion.path
              d="M220 620 C388 704 720 680 918 492"
              fill="none"
              stroke="#F18136"
              strokeOpacity=".55"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: reduceMotion ? 1 : ringLength }}
            />
          </svg>

          <motion.div style={reduceMotion ? undefined : { opacity: mediaA }} className="absolute bottom-[8%] left-[2%] h-[42%] w-[38%] overflow-hidden rounded-[30px_90px_30px_30px]">
            <LandingMedia
              kind="image"
              src={`${MEDIA_ROOT}/06-pertencer/COLUS-PERTENCER-INTERACAO-001.webp`}
              alt="Interação humana na comunidade escolar COLUS"
            />
          </motion.div>
          <motion.div style={reduceMotion ? undefined : { opacity: mediaB }} className="absolute right-[8%] top-[22%] h-[36%] w-[30%] overflow-hidden rounded-[84px_28px_28px_28px]">
            <LandingMedia
              kind="image"
              src={`${MEDIA_ROOT}/06-pertencer/COLUS-PERTENCER-COMUNIDADE-001.webp`}
              alt="Participação e comunidade na vida escolar"
            />
          </motion.div>
          <motion.div style={reduceMotion ? undefined : { opacity: mediaC }} className="absolute bottom-[3%] right-[20%] h-[30%] w-[24%] overflow-hidden rounded-[28px_28px_70px_28px]">
            <LandingMedia
              kind="image"
              src={`${MEDIA_ROOT}/06-pertencer/COLUS-PERTENCER-COMUNIDADE-002.webp`}
              alt="Momento coletivo de comunidade escolar"
            />
          </motion.div>

          <div className="absolute bottom-[18%] left-[43%] z-20 grid gap-4 text-sm font-semibold text-colus-text">
            <span>Acompanhar</span>
            <span>Participar</span>
            <span>Crescer juntos</span>
          </div>
        </div>
      </div>
    </section>
  );
}

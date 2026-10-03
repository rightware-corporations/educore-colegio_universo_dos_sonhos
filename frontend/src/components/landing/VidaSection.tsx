import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LandingMedia } from "./LandingMedia";

const MEDIA_ROOT = "/media/colus/landing";

export function VidaSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const mainScale = useTransform(scrollYProgress, [0.05, 0.55], [1.03, 1]);
  const detailY = useTransform(scrollYProgress, [0.18, 0.68], [72, -12]);
  const captionOpacity = useTransform(scrollYProgress, [0.12, 0.32], [0, 1]);

  return (
    <section
      ref={ref}
      data-header-theme="light"
      className="relative min-h-[155vh] overflow-hidden bg-colus-paper py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-deep-blue">Vida COLUS</p>
          <h2 className="mt-5 max-w-[14ch] text-[clamp(40px,4.5vw,68px)] font-bold leading-[1.01] tracking-[-.035em] text-colus-ink">
            A escola acontece em movimento.
          </h2>
        </div>

        <motion.div
          style={reduceMotion ? undefined : { scale: mainScale }}
          className="relative mt-12 h-[76vh] min-h-[520px] overflow-hidden rounded-[36px_100px_36px_36px]"
        >
          <LandingMedia
            kind="image"
            src={`${MEDIA_ROOT}/05-vida-colus/COLUS-VIDA-SPORT-001.webp`}
            alt="Momento de desporto e movimento na vida escolar COLUS"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-colus-ink/45 via-transparent to-transparent" />
          <motion.div
            style={reduceMotion ? undefined : { opacity: captionOpacity }}
            className="absolute bottom-7 left-7 max-w-md text-white"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-colus-orange">VIDA COLUS</p>
            <p className="mt-3 text-xl font-semibold leading-8">
              Há aprendizagens, encontros e descobertas que só acontecem quando a escola ganha vida.
            </p>
          </motion.div>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-12">
          <motion.div
            style={reduceMotion ? undefined : { y: detailY }}
            className="overflow-hidden rounded-[28px_28px_70px_28px] md:col-span-5 md:h-[58vh]"
          >
            <LandingMedia
              kind="image"
              src={`${MEDIA_ROOT}/05-vida-colus/COLUS-VIDA-EXPRESSAO-001.webp`}
              alt="Momento de expressão e participação estudantil"
            />
          </motion.div>
          <div className="grid gap-6 md:col-span-7 md:grid-cols-2">
            <div className="overflow-hidden rounded-[70px_28px_28px_28px] md:h-[42vh]">
              <LandingMedia
                kind="image"
                src={`${MEDIA_ROOT}/05-vida-colus/COLUS-VIDA-CULTURA-001.jpg`}
                alt="Momento cultural da comunidade escolar"
              />
            </div>
            <div className="self-end overflow-hidden rounded-[28px_28px_28px_70px] md:h-[46vh]">
              <LandingMedia
                kind="image"
                src={`${MEDIA_ROOT}/05-vida-colus/COLUS-VIDA-SPORT-002.webp`}
                alt="Momento humano e coletivo na vida escolar"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

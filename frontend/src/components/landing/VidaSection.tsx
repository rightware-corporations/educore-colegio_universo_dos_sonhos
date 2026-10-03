import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LandingMedia } from "./LandingMedia";

const MEDIA_ROOT = "/media/colus/landing/colus-assets-final-v03";

function StoryMarker({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em] text-colus-muted">
      <span className="h-2.5 w-2.5 rounded-full bg-colus-orange" />
      <span className="h-px w-8 bg-colus-orange/45" />
      <span>{label}</span>
    </div>
  );
}

export function VidaSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const immersionScale = useTransform(scrollYProgress, [0.05, 0.45], [1.025, 1]);
  const immersionY = useTransform(scrollYProgress, [0.05, 0.45], ["2.5vh", "0vh"]);
  const captionOpacity = useTransform(scrollYProgress, [0.1, 0.28], [0, 1]);

  const rhythmY = useTransform(scrollYProgress, [0.3, 0.68], ["4vh", "-1vh"]);
  const rhythmOpacity = useTransform(scrollYProgress, [0.28, 0.45], [0, 1]);

  const presenceScale = useTransform(scrollYProgress, [0.58, 0.9], [1.02, 1]);
  const presenceOpacity = useTransform(scrollYProgress, [0.58, 0.74], [0, 1]);
  const exitMarkerX = useTransform(scrollYProgress, [0.72, 0.98], ["0%", "56%"]);

  return (
    <section
      ref={ref}
      data-header-theme="light"
      className={`relative overflow-hidden bg-colus-paper py-20 lg:py-24 ${reduceMotion ? "" : "lg:min-h-[155vh]"}`}
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-deep-blue">
            Vida COLUS
          </p>
          <h2 className="mt-5 max-w-[14ch] text-[clamp(38px,4.5vw,68px)] font-bold leading-[1.01] tracking-[-.035em] text-colus-ink">
            A escola acontece em movimento.
          </h2>
        </div>

        <article className="mt-10 lg:mt-12">
          <motion.div
            style={reduceMotion ? undefined : { scale: immersionScale, y: immersionY }}
            className="relative h-[68svh] min-h-[500px] overflow-hidden rounded-[30px_82px_30px_30px] lg:h-[78vh]"
          >
            <LandingMedia
              kind="image"
              src={`${MEDIA_ROOT}/05-vida-colus/COLUS-VIDA-SPORT-001.webp`}
              alt="Momento de desporto e movimento na vida escolar COLUS"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-colus-ink/42 via-transparent to-transparent" />

            <motion.div
              style={reduceMotion ? undefined : { opacity: captionOpacity }}
              className="absolute inset-x-5 bottom-5 max-w-lg text-white sm:inset-x-7 sm:bottom-7"
            >
              <StoryMarker label="Em movimento" />
              <p className="mt-4 text-lg font-semibold leading-7 sm:text-xl sm:leading-8">
                Há aprendizagens, encontros e descobertas que só acontecem quando a escola ganha vida.
              </p>
            </motion.div>
          </motion.div>
        </article>

        <div className="mt-14 lg:mt-20">
          <div className="mb-7 flex items-end justify-between gap-6">
            <StoryMarker label="Ritmo editorial" />
            <p className="hidden max-w-[30ch] text-right text-sm leading-6 text-colus-muted md:block">
              Expressão, cultura e descoberta em diferentes momentos da vida escolar.
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-12 lg:items-start">
            <motion.article
              style={reduceMotion ? undefined : { opacity: rhythmOpacity, y: rhythmY }}
              className="lg:col-span-7"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px_28px_82px_28px] sm:aspect-[3/2] lg:h-[62vh] lg:aspect-auto">
                <LandingMedia
                  kind="image"
                  src={`${MEDIA_ROOT}/05-vida-colus/COLUS-VIDA-EXPRESSAO-001.webp`}
                  alt="Momento de expressão e participação estudantil"
                />
              </div>
              <div className="mt-4">
                <StoryMarker label="Expressão" />
              </div>
            </motion.article>

            <motion.article
              style={reduceMotion ? undefined : { opacity: rhythmOpacity }}
              className="lg:col-span-5 lg:pt-24"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[78px_28px_28px_28px] lg:h-[50vh] lg:aspect-auto">
                <LandingMedia
                  kind="image"
                  src={`${MEDIA_ROOT}/05-vida-colus/COLUS-VIDA-CULTURA-001.jpg`}
                  alt="Momento cultural da comunidade escolar"
                />
              </div>
              <div className="mt-4">
                <StoryMarker label="Criar juntos" />
              </div>
            </motion.article>
          </div>
        </div>

        <article className="mt-16 lg:mt-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <StoryMarker label="Presença" />
              <p className="mt-5 max-w-[30ch] font-editorial text-[clamp(30px,3vw,48px)] font-medium leading-[1.08] tracking-[-.025em] text-colus-ink">
                No fim, ficam as relações que dão sentido à experiência.
              </p>
            </div>

            <motion.div
              style={reduceMotion ? undefined : { opacity: presenceOpacity, scale: presenceScale }}
              className="relative lg:col-span-8"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px_88px_28px_28px] sm:aspect-[16/10] lg:h-[66vh] lg:aspect-auto">
                <LandingMedia
                  kind="image"
                  src={`${MEDIA_ROOT}/05-vida-colus/COLUS-VIDA-SPORT-002.webp`}
                  alt="Momento humano e coletivo na vida escolar"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-colus-ink/20 via-transparent to-transparent" />
              </div>

              <motion.div
                style={reduceMotion ? undefined : { x: exitMarkerX }}
                className="absolute -bottom-5 left-[8%] flex items-center gap-3"
                aria-hidden="true"
              >
                <span className="h-3 w-3 rounded-full bg-colus-orange" />
                <span className="h-px w-16 bg-colus-orange/55" />
              </motion.div>
            </motion.div>
          </div>
        </article>
      </div>
    </section>
  );
}

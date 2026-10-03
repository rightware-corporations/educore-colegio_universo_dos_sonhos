import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { LandingMedia } from "./LandingMedia";

const MEDIA_ROOT = "/media/colus/landing/colus-assets-final-v03";

function ReducedHero() {
  return (
    <section
      id="top"
      data-header-theme="transparent"
      className="relative min-h-screen overflow-hidden bg-colus-ink text-colus-white"
    >
      <div className="mx-auto grid min-h-screen max-w-[1440px] items-center gap-10 px-5 pb-14 pt-28 md:px-8 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-colus-orange">
            Colégio Universo dos Sonhos
          </p>
          <h1 className="mt-6 max-w-[12ch] text-[clamp(44px,7vw,108px)] font-bold leading-[.94] tracking-[-.04em]">
            Juntos Tornamos
            <span className="block font-editorial font-medium text-colus-paper">
              Sonhos Em Realidade
            </span>
          </h1>
          <p className="mt-7 max-w-[52ch] text-base leading-7 text-white/70 md:text-lg">
            Uma experiência de aprendizagem que desperta curiosidade, confiança e visão de futuro.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#o-colegio"
              className="inline-flex min-h-14 items-center gap-3 rounded-full bg-colus-orange px-7 text-sm font-bold text-colus-ink"
            >
              Descobrir o COLUS <ArrowDownRight className="h-4 w-4" />
            </a>
            <a href="#contactos" className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              Marcar uma visita <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="relative lg:col-span-7">
          <div className="absolute inset-16 rounded-full bg-colus-orange/20 blur-3xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[42%_58%_44%_56%/38%_42%_58%_62%] md:aspect-[16/10]">
            <LandingMedia
              kind="video"
              src={`${MEDIA_ROOT}/01-hero/video/COLUS-HERO-VID-001-SPORT-DAY.mp4`}
              poster={`${MEDIA_ROOT}/01-hero/poster/COLUS-HERO-POSTER-001.jpg`}
              alt="Vida escolar COLUS em movimento"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function IntroHeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const background = useTransform(
    scrollYProgress,
    [0, 0.32, 0.58, 1],
    ["#FFF8EF", "#FFF8EF", "#071A2A", "#071A2A"],
  );

  const markScale = useTransform(scrollYProgress, [0, 0.34, 0.68], [1, 1.16, 0.78]);
  const markOpacity = useTransform(scrollYProgress, [0, 0.8, 0.94], [1, 1, 0]);
  const leftLeafX = useTransform(scrollYProgress, [0.12, 0.32], [0, -105]);
  const rightLeafX = useTransform(scrollYProgress, [0.12, 0.32], [0, 105]);
  const leftLeafRotate = useTransform(scrollYProgress, [0.12, 0.32], [0, -10]);
  const rightLeafRotate = useTransform(scrollYProgress, [0.12, 0.32], [0, 10]);
  const lightY = useTransform(scrollYProgress, [0.32, 0.52], [0, -44]);
  const lightScale = useTransform(scrollYProgress, [0.32, 0.52], [1, 1.55]);
  const haloOpacity = useTransform(scrollYProgress, [0.3, 0.54, 0.86], [0, 0.85, 0.5]);

  const mediaOpacity = useTransform(scrollYProgress, [0.44, 0.62], [0, 1]);
  const mediaScale = useTransform(scrollYProgress, [0.44, 0.72], [0.52, 1]);
  const mediaShiftX = useTransform(scrollYProgress, [0.46, 0.82], [-22, 0]);
  const mediaShiftY = useTransform(scrollYProgress, [0.46, 0.82], [36, 0]);

  const kickerOpacity = useTransform(scrollYProgress, [0.56, 0.66], [0, 1]);
  const headlineOpacity = useTransform(scrollYProgress, [0.62, 0.8], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.62, 0.8], [28, 0]);
  const supportingOpacity = useTransform(scrollYProgress, [0.76, 0.88], [0, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0, 1]);

  if (reduceMotion) return <ReducedHero />;

  return (
    <section ref={ref} id="top" className="relative h-[150svh] lg:h-[200vh]">
      <div data-header-theme="hidden" className="pointer-events-none absolute inset-x-0 top-0 h-[105svh] lg:h-[140vh]" />
      <div data-header-theme="transparent" className="pointer-events-none absolute inset-x-0 top-[105svh] h-[45svh] lg:top-[140vh] lg:h-[60vh]" />

      <motion.div style={{ backgroundColor: background }} className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[min(60vw,600px)] w-[min(70vw,640px)] -translate-x-1/2 -translate-y-1/2">
          <motion.div style={{ opacity: markOpacity, scale: markScale }} className="h-full w-full">
            <svg viewBox="0 0 320 260" className="h-full w-full overflow-visible">
              <motion.g style={{ x: leftLeafX, rotate: leftLeafRotate, transformOrigin: "150px 185px" }}>
                <path
                  d="M28 172 C72 150 112 153 154 180 C116 182 83 195 48 222 C39 206 32 190 28 172 Z"
                  fill="#0C5898"
                />
              </motion.g>
              <motion.g style={{ x: rightLeafX, rotate: rightLeafRotate, transformOrigin: "170px 185px" }}>
                <path
                  d="M292 172 C248 150 208 153 166 180 C204 182 237 195 272 222 C281 206 288 190 292 172 Z"
                  fill="#1274B8"
                />
              </motion.g>

              <motion.g
                style={{ y: lightY, scale: lightScale, transformOrigin: "160px 120px" }}
                fill="#F18136"
              >
                <circle cx="160" cy="94" r="31" />
                <rect x="150" y="116" width="20" height="58" rx="10" />
              </motion.g>

              <g fill="#F18136">
                <circle cx="44" cy="58" r="7" />
                <circle cx="83" cy="70" r="6" />
                <circle cx="128" cy="82" r="6" />
                <circle cx="192" cy="82" r="6" />
                <circle cx="237" cy="70" r="6" />
                <circle cx="276" cy="58" r="7" />
              </g>
            </svg>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: haloOpacity }}
          className="pointer-events-none absolute right-[4vw] top-1/2 h-[62vh] w-[58vw] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(241,129,54,.25),rgba(40,153,239,.10)_35%,transparent_68%)] blur-2xl"
        />

        <div className="absolute left-1/2 top-1/2 z-20 h-[58vh] w-[min(72vw,900px)] -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:right-[6vw] lg:w-[52vw] lg:translate-x-0">
          <motion.div
            style={{ opacity: mediaOpacity, scale: mediaScale, x: mediaShiftX, y: mediaShiftY }}
            className="h-full w-full overflow-hidden rounded-[42%_58%_44%_56%/38%_42%_58%_62%]"
          >
            <LandingMedia
              kind="video"
              src={`${MEDIA_ROOT}/01-hero/video/COLUS-HERO-VID-001-SPORT-DAY.mp4`}
              poster={`${MEDIA_ROOT}/01-hero/poster/COLUS-HERO-POSTER-001.jpg`}
              alt="Vida escolar COLUS em movimento"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-colus-ink/20 via-transparent to-transparent" />
          </motion.div>
        </div>

        <div className="absolute inset-0 z-30">
          <div className="mx-auto grid h-full max-w-[1440px] items-center px-5 md:px-8 lg:grid-cols-12 lg:px-16">
            <div className="pt-24 lg:col-span-5 lg:pt-0">
              <motion.p
                style={{ opacity: kickerOpacity }}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-colus-orange"
              >
                Colégio Universo dos Sonhos
              </motion.p>
              <motion.h1
                style={{ opacity: headlineOpacity, y: headlineY }}
                className="mt-6 max-w-[12ch] text-[clamp(44px,7vw,108px)] font-bold leading-[.94] tracking-[-.04em] text-white"
              >
                Juntos Tornamos
                <span className="block font-editorial font-medium text-colus-paper">
                  Sonhos Em Realidade
                </span>
              </motion.h1>
              <motion.p
                style={{ opacity: supportingOpacity }}
                className="mt-7 max-w-[52ch] text-base leading-7 text-white/70 md:text-lg"
              >
                Uma experiência de aprendizagem que desperta curiosidade, confiança e visão de futuro.
              </motion.p>
              <motion.div style={{ opacity: ctaOpacity }} className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href="#o-colegio"
                  className="inline-flex min-h-14 items-center gap-3 rounded-full bg-colus-orange px-7 text-sm font-bold text-colus-ink transition hover:-translate-y-0.5"
                >
                  Descobrir o COLUS <ArrowDownRight className="h-4 w-4" />
                </a>
                <a href="#contactos" className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Marcar uma visita <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-[12vh] right-[8vw] z-40 hidden lg:block">
          <span className="block h-3 w-3 rounded-full bg-colus-orange" />
        </div>
        <div className="pointer-events-none absolute right-[18vw] top-[22vh] z-40 hidden lg:block">
          <span className="block h-2.5 w-2.5 rounded-full border border-white/70" />
        </div>
      </motion.div>
    </section>
  );
}

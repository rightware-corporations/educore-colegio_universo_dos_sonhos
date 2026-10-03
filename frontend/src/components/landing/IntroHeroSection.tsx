import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { LandingMedia } from "./LandingMedia";

const MEDIA_ROOT = "/media/colus/landing/colus-assets-final-v03";

const heroNodes = [
  { label: "Descobrir", href: "#o-colegio", className: "left-[48%] top-[18%]" },
  { label: "Criar", href: "#experiencia", className: "right-[7%] top-[29%]" },
  { label: "Pertencer", href: "#comunidade", className: "right-[16%] bottom-[15%]" },
  { label: "Transformar", href: "#transformar", className: "left-[56%] bottom-[9%]" },
] as const;

function ReducedHero() {
  return (
    <section
      id="top"
      data-header-theme="transparent"
      className="relative min-h-screen overflow-hidden bg-colus-ink text-colus-white"
    >
      <div className="mx-auto grid min-h-screen max-w-[1440px] items-end gap-8 px-5 pb-10 pt-20 md:px-8 lg:grid-cols-12 lg:items-center lg:px-16">
        <div className="order-2 pb-4 lg:order-1 lg:col-span-5 lg:pb-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-colus-orange">
            Colégio Universo dos Sonhos
          </p>
          <h1 className="mt-4 max-w-[12ch] text-[clamp(44px,7vw,108px)] font-bold leading-[.94] tracking-[-.04em]">
            Juntos Tornamos
            <span className="block font-editorial font-medium text-colus-paper">
              Sonhos Em Realidade
            </span>
          </h1>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-6 text-white/70 md:text-lg md:leading-7">
            Uma experiência de aprendizagem que desperta curiosidade, confiança e visão de futuro.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
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

        <div className="relative order-1 mt-4 h-[48svh] min-h-[360px] lg:order-2 lg:col-span-7 lg:mt-0 lg:h-[72vh]">
          <div className="absolute inset-12 rounded-full bg-colus-orange/20 blur-3xl" />
          <div className="relative h-full overflow-hidden rounded-[42%_58%_44%_56%/38%_42%_58%_62%]">
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
    [0, 0.28, 0.42, 0.58, 1],
    ["#FFF8EF", "#FFF8EF", "#F7F4EF", "#071A2A", "#071A2A"],
  );
  const vignetteOpacity = useTransform(scrollYProgress, [0.14, 0.32, 0.56], [0, 0.18, 0.74]);

  const markOpacity = useTransform(scrollYProgress, [0, 0.7, 0.9], [1, 1, 0]);
  const markBreath = useTransform(scrollYProgress, [0, 0.055, 0.11], [1, 1.012, 1]);

  const leafScale = useTransform(scrollYProgress, [0.12, 0.32], [1, 1.65]);
  const leftLeafX = useTransform(scrollYProgress, [0.12, 0.32], ["0vw", "-16vw"]);
  const rightLeafX = useTransform(scrollYProgress, [0.12, 0.32], ["0vw", "16vw"]);
  const leafY = useTransform(scrollYProgress, [0.12, 0.32], ["0vh", "9vh"]);
  const leftLeafRotate = useTransform(scrollYProgress, [0.12, 0.32], [0, -11]);
  const rightLeafRotate = useTransform(scrollYProgress, [0.12, 0.32], [0, 11]);

  const lightY = useTransform(scrollYProgress, [0.32, 0.52], ["0vh", "-7vh"]);
  const lightScale = useTransform(scrollYProgress, [0.32, 0.52], [1, 1.5]);
  const haloOpacity = useTransform(scrollYProgress, [0.3, 0.54, 0.9], [0, 0.82, 0.42]);

  const markDotsOpacity = useTransform(scrollYProgress, [0.42, 0.7], [1, 0]);
  const finalNodesOpacity = useTransform(scrollYProgress, [0.68, 0.86], [0, 1]);

  const mediaOpacity = useTransform(scrollYProgress, [0.44, 0.62], [0, 1]);
  const mediaScale = useTransform(scrollYProgress, [0.44, 0.72], [0.58, 1]);
  const mediaShiftX = useTransform(scrollYProgress, [0.46, 0.82], ["-8vw", "0vw"]);
  const mediaShiftY = useTransform(scrollYProgress, [0.46, 0.82], ["5vh", "0vh"]);

  const axisScale = useTransform(scrollYProgress, [0.52, 0.64], [0, 1]);
  const kickerOpacity = useTransform(scrollYProgress, [0.56, 0.66], [0, 1]);
  const lineOneClip = useTransform(
    scrollYProgress,
    [0.62, 0.76],
    ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
  );
  const lineOneY = useTransform(scrollYProgress, [0.62, 0.76], [18, 0]);
  const lineTwoClip = useTransform(
    scrollYProgress,
    [0.7, 0.84],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const lineTwoY = useTransform(scrollYProgress, [0.7, 0.84], [14, 0]);
  const supportingOpacity = useTransform(scrollYProgress, [0.78, 0.88], [0, 1]);
  const supportingY = useTransform(scrollYProgress, [0.78, 0.88], [14, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.84, 0.94], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.84, 0.94], [12, 0]);

  if (reduceMotion) return <ReducedHero />;

  return (
    <section ref={ref} id="top" className="relative h-[150svh] lg:h-[200vh]">
      <div
        data-header-theme="hidden"
        className="pointer-events-none absolute inset-x-0 top-0 h-[105svh] lg:h-[140vh]"
      />
      <div
        data-header-theme="transparent"
        className="pointer-events-none absolute inset-x-0 top-[105svh] h-[45svh] lg:top-[140vh] lg:h-[60vh]"
      />

      <motion.div style={{ backgroundColor: background }} className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          aria-hidden="true"
          style={{ opacity: vignetteOpacity }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,transparent_34%,rgba(12,88,152,.18)_72%,rgba(7,26,42,.58)_100%)]"
        />

        <div className="pointer-events-none absolute left-1/2 top-[46vh] z-10 aspect-[320/260] w-[60vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 lg:w-[38vw]">
          <motion.div
            style={{ opacity: markOpacity, scale: markBreath }}
            className="h-full w-full"
          >
            <svg viewBox="0 0 320 260" className="h-full w-full overflow-visible">
              <motion.g
                style={{
                  x: leftLeafX,
                  y: leafY,
                  scale: leafScale,
                  rotate: leftLeafRotate,
                  transformOrigin: "150px 185px",
                }}
              >
                <path
                  d="M28 172 C72 150 112 153 154 180 C116 182 83 195 48 222 C39 206 32 190 28 172 Z"
                  fill="#0C5898"
                />
              </motion.g>
              <motion.g
                style={{
                  x: rightLeafX,
                  y: leafY,
                  scale: leafScale,
                  rotate: rightLeafRotate,
                  transformOrigin: "170px 185px",
                }}
              >
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

              <motion.g style={{ opacity: markDotsOpacity }} fill="#F18136">
                <circle cx="44" cy="58" r="7" />
                <circle cx="83" cy="70" r="6" />
                <circle cx="128" cy="82" r="6" />
                <circle cx="192" cy="82" r="6" />
                <circle cx="237" cy="70" r="6" />
                <circle cx="276" cy="58" r="7" />
              </motion.g>
            </svg>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: haloOpacity }}
          className="pointer-events-none absolute right-[-5vw] top-[38%] h-[58vh] w-[78vw] rounded-full bg-[radial-gradient(circle,rgba(241,129,54,.23),rgba(40,153,239,.11)_38%,transparent_68%)] blur-2xl lg:right-[2vw] lg:top-1/2 lg:h-[72vh] lg:w-[58vw] lg:-translate-y-1/2"
        />

        <div className="absolute left-1/2 top-[12svh] z-20 h-[47svh] min-h-[330px] w-[90vw] -translate-x-1/2 lg:left-auto lg:right-[5vw] lg:top-1/2 lg:h-[76vh] lg:min-h-0 lg:w-[54vw] lg:max-w-[920px] lg:translate-x-0 lg:-translate-y-1/2">
          <motion.div
            style={{
              opacity: mediaOpacity,
              scale: mediaScale,
              x: mediaShiftX,
              y: mediaShiftY,
            }}
            className="relative h-full w-full overflow-hidden rounded-[46%_54%_35%_65%/28%_36%_64%_72%] shadow-[0_30px_100px_rgba(0,0,0,.22)]"
          >
            <LandingMedia
              kind="video"
              src={`${MEDIA_ROOT}/01-hero/video/COLUS-HERO-VID-001-SPORT-DAY.mp4`}
              poster={`${MEDIA_ROOT}/01-hero/poster/COLUS-HERO-POSTER-001.jpg`}
              alt="Vida escolar COLUS em movimento"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-colus-ink/28 via-transparent to-transparent" />
          </motion.div>
        </div>

        <div className="absolute inset-0 z-30">
          <div className="mx-auto flex h-full max-w-[1440px] items-end px-5 pb-[6svh] md:px-8 lg:grid lg:grid-cols-12 lg:items-center lg:px-16 lg:pb-0">
            <div className="w-full lg:col-span-5">
              <div className="flex items-center gap-3">
                <motion.span
                  aria-hidden="true"
                  style={{ scaleX: axisScale }}
                  className="h-px w-6 origin-left bg-colus-orange"
                />
                <motion.p
                  style={{ opacity: kickerOpacity }}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-colus-orange md:text-[11px]"
                >
                  Colégio Universo dos Sonhos
                </motion.p>
              </div>

              <h1 className="mt-4 max-w-[12ch] text-[clamp(44px,7vw,108px)] leading-[.94] tracking-[-.04em] text-white lg:mt-6">
                <motion.span
                  style={{ clipPath: lineOneClip, y: lineOneY }}
                  className="block font-bold"
                >
                  Juntos Tornamos
                </motion.span>
                <motion.span
                  style={{ clipPath: lineTwoClip, y: lineTwoY }}
                  className="block font-editorial font-medium text-colus-paper"
                >
                  Sonhos Em Realidade
                </motion.span>
              </h1>

              <motion.p
                style={{ opacity: supportingOpacity, y: supportingY }}
                className="mt-5 max-w-[52ch] text-[15px] leading-6 text-white/70 md:text-lg md:leading-7 lg:mt-7"
              >
                Uma experiência de aprendizagem que desperta curiosidade, confiança e visão de futuro.
              </motion.p>

              <motion.div
                style={{ opacity: ctaOpacity, y: ctaY }}
                className="mt-6 flex flex-wrap items-center gap-5 lg:mt-8"
              >
                <a
                  href="#o-colegio"
                  className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-colus-orange px-7 text-sm font-bold text-colus-ink transition hover:-translate-y-0.5"
                >
                  Descobrir o COLUS
                  <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#contactos"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white"
                >
                  Marcar uma visita
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          style={{ opacity: finalNodesOpacity }}
          className="pointer-events-none absolute inset-0 z-40 hidden lg:block"
          aria-hidden="true"
        >
          {heroNodes.map((node) => (
            <a
              key={node.label}
              href={node.href}
              tabIndex={-1}
              className={`pointer-events-auto group absolute ${node.className}`}
            >
              <span className="flex h-11 items-center gap-2">
                <span className="h-3 w-3 rounded-full border border-white/80 bg-colus-orange shadow-[0_0_0_5px_rgba(241,129,54,.08)]" />
                <span className="translate-x-1 whitespace-nowrap rounded-full bg-colus-ink/72 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white opacity-0 backdrop-blur-sm transition group-hover:translate-x-0 group-hover:opacity-100">
                  {node.label}
                </span>
              </span>
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

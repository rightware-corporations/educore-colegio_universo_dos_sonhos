import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LandingMedia } from "./LandingMedia";

const MEDIA_ROOT = "/media/colus/landing/colus-assets-final-v03";

export function ManifestoSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const pageScaleY = useTransform(scrollYProgress, [0, 0.22], [0.08, 1]);
  const leftPageX = useTransform(scrollYProgress, [0, 0.22], ["-8%", "0%"]);
  const rightPageX = useTransform(scrollYProgress, [0, 0.22], ["8%", "0%"]);

  const bridgePosterOpacity = useTransform(scrollYProgress, [0, 0.18, 0.32], [1, 1, 0]);
  const manifestoMediaOpacity = useTransform(scrollYProgress, [0.15, 0.34], [0, 1]);
  const mediaScale = useTransform(scrollYProgress, [0, 0.42], [1.06, 1]);
  const mediaY = useTransform(scrollYProgress, [0, 0.42], ["8vh", "0vh"]);

  const textOpacity = useTransform(scrollYProgress, [0.18, 0.36], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.18, 0.36], [22, 0]);
  const nodeX = useTransform(scrollYProgress, [0.38, 0.82], ["0%", "280%"]);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden bg-colus-ink ${reduceMotion ? "" : "min-h-[145svh] lg:min-h-[170vh]"}`}
    >
      <div
        data-header-theme="transparent"
        className="pointer-events-none absolute inset-x-0 top-0 h-[42vh]"
      />
      <div
        data-header-theme="light"
        className="pointer-events-none absolute inset-x-0 top-[42vh] bottom-0"
      />
      <div
        id="o-colegio"
        className="pointer-events-none absolute inset-x-0 top-[42vh] scroll-mt-24"
        aria-hidden="true"
      />

      <div className={`relative min-h-screen ${reduceMotion ? "" : "lg:sticky lg:top-0"}`}>
        {!reduceMotion && (
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <motion.div
              style={{ scaleY: pageScaleY, x: leftPageX }}
              className="absolute bottom-0 left-[-4%] h-[115%] w-[56%] origin-bottom rounded-t-[52%] bg-colus-paper"
            />
            <motion.div
              style={{ scaleY: pageScaleY, x: rightPageX }}
              className="absolute bottom-0 right-[-4%] h-[115%] w-[56%] origin-bottom rounded-t-[52%] bg-colus-paper"
            />
          </div>
        )}

        {reduceMotion && <div className="absolute inset-0 bg-colus-paper" />}

        <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1440px] gap-10 px-5 py-24 md:px-8 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-16">
          <motion.div
            style={reduceMotion ? undefined : { opacity: textOpacity, y: textY }}
            className="order-2 self-center lg:order-1 lg:col-span-7"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-deep-blue">
              A experiência COLUS
            </p>
            <h2 className="mt-6 max-w-[16ch] font-editorial text-[clamp(38px,4.3vw,68px)] font-medium leading-[1.02] tracking-[-.025em] text-colus-ink">
              Aprender é descobrir o que somos capazes de transformar.
            </h2>

            <p className="mt-7 max-w-[56ch] text-[15px] leading-7 text-colus-muted md:text-lg">
              Curiosidade, conhecimento e confiança ganham espaço quando a aprendizagem se aproxima da vida, das pessoas e do mundo.
            </p>

            <div className="mt-10 h-px max-w-md bg-black/10">
              <motion.span
                style={reduceMotion ? undefined : { x: nodeX }}
                className="block h-3 w-3 -translate-y-[5px] rounded-full bg-colus-orange"
              />
            </div>
          </motion.div>

          <div className="relative order-1 min-h-[54svh] lg:order-2 lg:col-span-5 lg:min-h-0">
            <motion.div
              style={reduceMotion ? undefined : { scale: mediaScale, y: mediaY }}
              className="relative mx-auto h-[54svh] min-h-[420px] max-w-[500px] overflow-hidden rounded-[48%_52%_22%_18%/28%_26%_18%_22%] lg:h-[68vh]"
            >
              {!reduceMotion && (
                <motion.div
                  style={{ opacity: bridgePosterOpacity }}
                  className="absolute inset-0"
                  aria-hidden="true"
                >
                  <LandingMedia
                    kind="image"
                    src={`${MEDIA_ROOT}/01-hero/poster/COLUS-HERO-POSTER-001.jpg`}
                    alt=""
                  />
                </motion.div>
              )}

              <motion.div
                style={reduceMotion ? undefined : { opacity: manifestoMediaOpacity }}
                className="absolute inset-0"
              >
                <LandingMedia
                  kind="image"
                  src={`${MEDIA_ROOT}/02-manifesto/COLUS-MANIFESTO-HUMANO-001.webp`}
                  alt="Momento humano da experiência COLUS"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-colus-ink/18 via-transparent to-transparent" />
            </motion.div>

            <div className="pointer-events-none absolute -bottom-8 -left-4 h-32 w-56 rounded-[50%] border border-colus-deep-blue/15 lg:-bottom-10 lg:-left-8 lg:h-40 lg:w-64" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-1 top-[18%] h-3 w-3 rounded-full bg-colus-orange lg:right-[2%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

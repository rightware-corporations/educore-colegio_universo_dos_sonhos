import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LandingMedia } from "./LandingMedia";

const MEDIA_ROOT = "/media/colus/landing/colus-assets-final-v03";

export function AprenderSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const discoverOpacity = useTransform(scrollYProgress, [0, 0.38, 0.52], [1, 1, 0]);
  const discoverScale = useTransform(scrollYProgress, [0, 0.46], [1, 0.94]);
  const createOpacity = useTransform(scrollYProgress, [0.38, 0.54, 1], [0, 1, 1]);
  const createY = useTransform(scrollYProgress, [0.38, 0.58], [42, 0]);
  const trailColor = useTransform(scrollYProgress, [0.3, 0.7], ["#0C5898", "#F18136"]);
  const detailOpacity = useTransform(scrollYProgress, [0.1, 0.26, 0.44], [0, 1, 0]);
  const outroOpacity = useTransform(scrollYProgress, [0.82, 1], [0, 1]);

  return (
    <section
      ref={ref}
      id="experiencia"
      data-header-theme="light"
      className={`relative scroll-mt-24 overflow-hidden bg-colus-white ${reduceMotion ? "" : "lg:min-h-[185vh]"}`}
    >
      <div className={reduceMotion ? "block" : "lg:hidden"}>
        <div className="mx-auto max-w-[680px] px-5 py-20 sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-deep-blue">
            Aprender em movimento
          </p>

          <article className="mt-10">
            <p className="text-xs font-bold tracking-[0.18em] text-colus-orange">
              01 / DESCOBRIR
            </p>
            <h2 className="mt-4 max-w-[14ch] text-[clamp(34px,9vw,46px)] font-bold leading-[1.02] tracking-[-.035em] text-colus-ink">
              O conhecimento ganha vida quando existe espaço para explorar.
            </h2>
            <div className="relative mt-7 aspect-[4/5] overflow-hidden rounded-[28px_72px_28px_28px]">
              <LandingMedia
                kind="image"
                src={`${MEDIA_ROOT}/03-aprender/descobrir/COLUS-APRENDER-DESCOBRIR-001.webp`}
                alt="Aprendizagem prática e descoberta no COLUS"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-colus-ink/25 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full bg-colus-white/92 px-4 py-2 text-xs font-semibold text-colus-ink backdrop-blur">
                Aprender fora da sala
              </div>
            </div>
            <div className="ml-5 mt-4 aspect-[16/10] w-[58%] overflow-hidden rounded-[20px_20px_52px_20px] border-[6px] border-colus-white shadow-soft">
              <LandingMedia
                kind="image"
                src={`${MEDIA_ROOT}/03-aprender/descobrir/COLUS-APRENDER-DESCOBRIR-002.webp`}
                alt="Detalhe de investigação e descoberta no COLUS"
              />
            </div>
          </article>

          <div className="relative my-12 ml-4 h-20 w-px bg-gradient-to-b from-colus-deep-blue to-colus-orange">
            <span className="absolute -left-[5px] top-0 h-3 w-3 rounded-full bg-colus-deep-blue" />
            <span className="absolute -bottom-1 -left-[5px] h-3 w-3 rounded-full bg-colus-orange" />
          </div>

          <article>
            <p className="text-xs font-bold tracking-[0.18em] text-colus-orange">
              02 / CRIAR
            </p>
            <h2 className="mt-4 max-w-[14ch] text-[clamp(34px,9vw,46px)] font-bold leading-[1.02] tracking-[-.035em] text-colus-ink">
              Conhecimento, expressão e tecnologia encontram novas formas de ganhar vida.
            </h2>

            <div className="relative mt-7 aspect-[4/5] overflow-hidden rounded-[72px_28px_28px_28px]">
              <LandingMedia
                kind="image"
                src={`${MEDIA_ROOT}/03-aprender/criar/COLUS-APRENDER-CRIAR-001.webp`}
                alt="Experiência prática de criação e aprendizagem no COLUS"
              />
            </div>

            <div className="-mt-16 ml-auto mr-3 aspect-[4/5] w-[42%] overflow-hidden rounded-[22px_22px_58px_22px] border-[6px] border-colus-white shadow-soft">
              <LandingMedia
                kind="image"
                src={`${MEDIA_ROOT}/03-aprender/criar/COLUS-APRENDER-CRIAR-002.webp`}
                alt="Detalhe de uma atividade criativa no COLUS"
              />
            </div>

            <div className="mt-7 flex flex-wrap gap-x-3 gap-y-2 text-[10px] font-bold uppercase tracking-[0.16em] text-colus-muted">
              <span>TIC</span><span>•</span><span>Ciência</span><span>•</span><span>Expressão</span>
            </div>
          </article>
        </div>
      </div>

      <div className={reduceMotion ? "hidden" : "hidden min-h-[185vh] lg:block"}>
        <div className="sticky top-0 min-h-screen py-24">
          <div className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1440px] items-center gap-10 px-16 lg:grid-cols-12">
            <div className="relative z-20 lg:col-span-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-deep-blue">
                Aprender em movimento
              </p>

              <motion.div style={reduceMotion ? undefined : { opacity: discoverOpacity }}>
                <p className="mt-10 text-xs font-bold tracking-[0.18em] text-colus-orange">
                  01 / DESCOBRIR
                </p>
                <h2 className="mt-4 max-w-[13ch] text-[clamp(36px,4vw,58px)] font-bold leading-[1.02] tracking-[-.035em] text-colus-ink">
                  O conhecimento ganha vida quando existe espaço para explorar.
                </h2>
              </motion.div>

              <motion.div
                style={reduceMotion ? undefined : { opacity: createOpacity, y: createY }}
                className="absolute left-0 top-24"
              >
                <p className="text-xs font-bold tracking-[0.18em] text-colus-orange">
                  02 / CRIAR
                </p>
                <h2 className="mt-4 max-w-[13ch] text-[clamp(36px,4vw,58px)] font-bold leading-[1.02] tracking-[-.035em] text-colus-ink">
                  Conhecimento, expressão e tecnologia encontram novas formas de ganhar vida.
                </h2>
              </motion.div>
            </div>

            <div className="relative min-h-[68vh] lg:col-span-8">
              <svg
                viewBox="0 0 800 620"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
              >
                <motion.path
                  d="M48 470 C140 390 192 184 365 208 C500 226 522 465 754 330"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    pathLength: reduceMotion ? 1 : scrollYProgress,
                    stroke: trailColor,
                  }}
                />
                <circle cx="50" cy="468" r="6" fill="#0C5898" />
                <circle cx="754" cy="330" r="6" fill="#F18136" />
              </svg>

              <motion.div
                style={reduceMotion ? undefined : { opacity: discoverOpacity, scale: discoverScale }}
                className="absolute left-0 top-[8%] h-[68%] w-[78%] overflow-hidden rounded-[28px_90px_34px_34px]"
              >
                <LandingMedia
                  kind="image"
                  src={`${MEDIA_ROOT}/03-aprender/descobrir/COLUS-APRENDER-DESCOBRIR-001.webp`}
                  alt="Aprendizagem prática e descoberta no COLUS"
                />
                <div className="absolute bottom-5 left-5 rounded-full bg-colus-white/90 px-4 py-2 text-xs font-semibold text-colus-ink backdrop-blur">
                  Aprender fora da sala
                </div>
              </motion.div>

              <motion.div
                style={reduceMotion ? undefined : { opacity: detailOpacity }}
                className="absolute bottom-[2%] left-[10%] z-20 h-[31%] w-[30%] overflow-hidden rounded-[22px_22px_64px_22px] border-[8px] border-colus-white shadow-soft"
              >
                <LandingMedia
                  kind="image"
                  src={`${MEDIA_ROOT}/03-aprender/descobrir/COLUS-APRENDER-DESCOBRIR-002.webp`}
                  alt="Detalhe de investigação e descoberta no COLUS"
                />
              </motion.div>

              <motion.div
                style={reduceMotion ? undefined : { opacity: createOpacity, y: createY }}
                className="absolute right-0 top-[10%] h-[54%] w-[72%] overflow-hidden rounded-[78px_26px_34px_34px]"
              >
                <LandingMedia
                  kind="image"
                  src={`${MEDIA_ROOT}/03-aprender/criar/COLUS-APRENDER-CRIAR-001.webp`}
                  alt="Experiência prática de criação e aprendizagem no COLUS"
                />
              </motion.div>

              <motion.div
                style={reduceMotion ? undefined : { opacity: createOpacity }}
                className="absolute bottom-[2%] left-[8%] h-[34%] w-[34%] overflow-hidden rounded-[24px_24px_72px_24px] border-[8px] border-colus-white shadow-soft"
              >
                <LandingMedia
                  kind="image"
                  src={`${MEDIA_ROOT}/03-aprender/criar/COLUS-APRENDER-CRIAR-002.webp`}
                  alt="Detalhe de uma atividade criativa no COLUS"
                />
              </motion.div>

              <motion.div
                style={reduceMotion ? undefined : { opacity: outroOpacity }}
                className="absolute bottom-[8%] right-[5%] z-20 flex gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-colus-muted"
              >
                <span>TIC</span><span>•</span><span>Ciência</span><span>•</span><span>Expressão</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-colus-ink/5" />
    </section>
  );
}

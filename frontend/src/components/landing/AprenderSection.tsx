import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LandingMedia } from "./LandingMedia";
import { MobileNarrativePath } from "./MobileNarrativePath";
import { MobileSceneWindow } from "./MobileSceneWindow";
import { DesktopOrbitNode } from "./DesktopOrbitNode";

const MEDIA_ROOT = "/media/colus/landing/colus-assets-final-v03";

export function AprenderSection() {
  const ref = useRef<HTMLElement>(null);
  const trailPathRef = useRef<SVGPathElement>(null);
  const trailX = useMotionValue(40);
  const trailY = useMotionValue(520);
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
  // The single active desktop ring follows the actual Learning Trail; the
  // two tiny endpoints stay as contextual marks, not competing active nodes.
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reduceMotion || !trailPathRef.current) return;
    const path = trailPathRef.current;
    const point = path.getPointAtLength(
      Math.max(0, Math.min(1, progress)) * path.getTotalLength(),
    );
    trailX.set(point.x);
    trailY.set(point.y);
  });

  return (
    <section
      ref={ref}
      id="experiencia"
      data-header-theme="light"
      className="relative scroll-mt-24 overflow-hidden bg-colus-white lg:overflow-visible"
    >

      {/* Mobile learning trail: editorial text lives with the moment it describes. */}
      <div className={reduceMotion ? "block" : "lg:hidden"}>
        <div data-colus-mobile-story="trail" className="relative mx-auto max-w-[680px] bg-colus-ink">
          <MobileNarrativePath kind="trail" />
          <article className="relative isolate min-h-[76svh] overflow-hidden bg-colus-ink sm:rounded-[34px_86px_34px_34px]">
            <MobileSceneWindow>
              <LandingMedia
                kind="image"
                src={MEDIA_ROOT + "/03-aprender/descobrir/COLUS-APRENDER-DESCOBRIR-001.webp"}
                alt="Aprendizagem prática e descoberta no COLUS"
              />
            </MobileSceneWindow>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-colus-ink/95 via-colus-ink/40 to-colus-ink/85" />
            <div className="relative z-10 flex min-h-[76svh] flex-col justify-between px-6 pb-11 pt-16 sm:px-9">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.19em] text-colus-orange">Aprender em movimento</p>
                <h2 className="mt-5 max-w-[13ch] font-editorial text-[clamp(38px,9.5vw,60px)] font-medium leading-[1.02] tracking-[-.04em] text-white">
                  O conhecimento ganha vida quando existe espaço para explorar.
                </h2>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.19em] text-colus-orange">01 / Descobrir</p>
                <p className="mt-3 max-w-[29ch] text-[18px] font-medium leading-7 text-white/95">
                  Aprender é também observar, investigar e descobrir.
                </p>
              </div>
            </div>
          </article>
          <div className="h-3" aria-hidden="true" />
          <article className="relative isolate ml-5 min-h-[68svh] overflow-hidden rounded-[80px_28px_28px_28px] bg-colus-ink sm:ml-0">
            <MobileSceneWindow>
              <LandingMedia
                kind="image"
                src={MEDIA_ROOT + "/03-aprender/criar/COLUS-APRENDER-CRIAR-001.webp"}
                alt="Experiência prática de criação e aprendizagem no COLUS"
              />
            </MobileSceneWindow>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-colus-ink/55 via-colus-ink/5 to-colus-ink/90" />
            <div className="relative z-10 flex min-h-[68svh] flex-col justify-between px-6 pb-10 pt-10">
              <p className="text-[11px] font-bold uppercase tracking-[.19em] text-colus-orange">02 / Criar</p>
              <div>
                <h3 className="max-w-[18ch] font-editorial text-[clamp(31px,7.5vw,43px)] font-medium leading-[1.07] tracking-[-.04em] text-white">
                  Conhecimento, expressão e tecnologia encontram novas formas de ganhar vida.
                </h3>
                <p className="mt-4 max-w-[32ch] text-[16px] font-medium leading-7 text-white/95">
                  Experimentar e construir fazem parte da aprendizagem.
                </p>
              </div>
            </div>
          </article>
          
        </div>
      </div>

      <div className={reduceMotion ? "hidden" : "hidden h-[225vh] lg:block"}>
        <div className="sticky top-0 h-screen overflow-hidden py-24">
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
                data-colus-desktop-learning-trail
                className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
              >
                <motion.path
                  ref={trailPathRef}
                  d="M40 520 C180 525 340 544 540 516 C580 510 618 460 624 404 C642 296 710 172 760 60"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    pathLength: reduceMotion ? 1 : scrollYProgress,
                    stroke: trailColor,
                  }}
                />
                <circle cx="40" cy="520" r="4" fill="#0C5898" opacity=".6" />

                <motion.g style={reduceMotion ? { x: 760, y: 60 } : { x: trailX, y: trailY }}>
                  <DesktopOrbitNode progress={scrollYProgress} tone="orange" size={13} />
                </motion.g>
              </svg>

              <motion.div
                style={reduceMotion ? undefined : { opacity: discoverOpacity, scale: discoverScale }}
                className="absolute left-0 top-[8%] h-[68%] w-[76%] overflow-hidden rounded-[28px_90px_34px_34px]"
              >
                <LandingMedia
                  kind="image"
                  src={`${MEDIA_ROOT}/03-aprender/descobrir/COLUS-APRENDER-DESCOBRIR-001.webp`}
                  alt="Aprendizagem prática e descoberta no COLUS"
                />
                <div className="absolute bottom-5 left-5 z-10 rounded-full bg-colus-white/95 px-4 py-2 text-xs font-semibold text-colus-ink shadow-sm backdrop-blur">
                  Aprender fora da sala
                </div>
              </motion.div>

              <motion.div
                style={reduceMotion ? undefined : { opacity: detailOpacity }}
                className="pointer-events-none absolute bottom-[2%] right-[1%] z-20 h-[27%] w-[26%] overflow-hidden rounded-[22px_22px_64px_22px] border-[8px] border-colus-white shadow-soft"
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

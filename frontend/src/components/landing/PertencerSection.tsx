import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LandingMedia } from "./LandingMedia";

const MEDIA_ROOT = "/media/colus/landing/colus-assets-final-v03";

const relations = [
  ["Acompanhar", "proximidade e presença."],
  ["Participar", "escola vivida também em comunidade."],
  ["Crescer juntos", "confiança, pertença e desenvolvimento."],
] as const;

export function PertencerSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.22], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0, 0.22], [16, 0]);
  const ringLength = useTransform(scrollYProgress, [0.18, 0.52], [0.25, 0.8]);
  const ringFade = useTransform(scrollYProgress, [0.68, 0.9], [1, 0.42]);

  const mediaA = useTransform(scrollYProgress, [0.18, 0.38], [0, 1]);
  const mediaB = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const mediaC = useTransform(scrollYProgress, [0.42, 0.62], [0, 1]);

  const handoffOpacity = useTransform(scrollYProgress, [0.72, 0.92], [0, 1]);
  const handoffScaleY = useTransform(scrollYProgress, [0.72, 0.96], [0.1, 1]);

  return (
    <section
      ref={ref}
      id="comunidade"
      data-header-theme="light"
      className={`relative scroll-mt-24 overflow-hidden bg-colus-white ${reduceMotion ? "" : "lg:min-h-[130vh]"}`}
    >
      <div className={reduceMotion ? "block" : "lg:hidden"}>
        <div className="mx-auto max-w-[680px] px-5 py-20 sm:px-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-orange">
              Pertencer
            </p>
            <h2 className="mt-5 max-w-[14ch] font-editorial text-[clamp(38px,9vw,46px)] font-medium leading-[1.03] tracking-[-.03em] text-colus-ink">
              Crescer é uma jornada partilhada.
            </h2>
            <p className="mt-6 max-w-[56ch] text-[15px] leading-7 text-colus-muted">
              Escola, alunos e famílias constroem experiências mais fortes quando participam, acompanham e crescem em conjunto.
            </p>
          </div>

          <div className="relative mt-12 pl-9">
            <svg
              viewBox="0 0 80 760"
              className="pointer-events-none absolute bottom-0 left-0 top-0 h-full w-16 overflow-visible"
              aria-hidden="true"
            >
              <path
                d="M44 8 C12 120 62 190 31 300 C7 388 62 458 34 566 C20 622 38 682 50 752"
                fill="none"
                stroke="#0C5898"
                strokeOpacity=".24"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="43" cy="84" r="6" fill="#F18136" />
              <circle cx="29" cy="318" r="5" fill="#F18136" />
              <circle cx="39" cy="584" r="6" fill="#F18136" />
            </svg>

            <div className="space-y-8">
              <article>
                <div className="aspect-[4/3] overflow-hidden rounded-[30px_78px_30px_30px]">
                  <LandingMedia
                    kind="image"
                    src={`${MEDIA_ROOT}/06-pertencer/COLUS-PERTENCER-INTERACAO-001.webp`}
                    alt="Interação humana na comunidade escolar COLUS"
                  />
                </div>
                <div className="mt-5">
                  <p className="text-sm font-bold text-colus-ink">Acompanhar</p>
                  <p className="mt-1 text-sm leading-6 text-colus-muted">proximidade e presença.</p>
                </div>
              </article>

              <article>
                <div className="aspect-[3/2] overflow-hidden rounded-[74px_28px_28px_28px]">
                  <LandingMedia
                    kind="image"
                    src={`${MEDIA_ROOT}/06-pertencer/COLUS-PERTENCER-COMUNIDADE-001.webp`}
                    alt="Participação e comunidade na vida escolar"
                  />
                </div>
                <div className="mt-5">
                  <p className="text-sm font-bold text-colus-ink">Participar</p>
                  <p className="mt-1 text-sm leading-6 text-colus-muted">
                    escola vivida também em comunidade.
                  </p>
                </div>
              </article>

              <article>
                <div className="ml-auto aspect-[4/3] w-[82%] overflow-hidden rounded-[28px_28px_74px_28px]">
                  <LandingMedia
                    kind="image"
                    src={`${MEDIA_ROOT}/06-pertencer/COLUS-PERTENCER-COMUNIDADE-002.webp`}
                    alt="Momento coletivo de comunidade escolar"
                  />
                </div>
                <div className="mt-5">
                  <p className="text-sm font-bold text-colus-ink">Crescer juntos</p>
                  <p className="mt-1 text-sm leading-6 text-colus-muted">
                    confiança, pertença e desenvolvimento.
                  </p>
                </div>
              </article>
            </div>

            <div className="ml-3 mt-8 flex h-16 items-start gap-3" aria-hidden="true">
              <span className="mt-1 h-3 w-3 rounded-full bg-colus-orange" />
              <span className="h-full w-px bg-gradient-to-b from-colus-orange to-colus-orange/0" />
            </div>
          </div>
        </div>
      </div>

      <div className={reduceMotion ? "hidden" : "hidden min-h-[130vh] lg:block"}>
        <div className="sticky top-0 min-h-screen overflow-hidden py-20">
          <div className="mx-auto min-h-[calc(100vh-10rem)] max-w-[1440px] px-16">
            <motion.div
              style={reduceMotion ? undefined : { opacity: headlineOpacity, y: headlineY }}
              className="relative z-20 max-w-3xl"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-orange">
                Pertencer
              </p>
              <h2 className="mt-5 max-w-[14ch] font-editorial text-[clamp(48px,4.3vw,68px)] font-medium leading-[1.03] tracking-[-.03em] text-colus-ink">
                Crescer é uma jornada partilhada.
              </h2>
              <p className="mt-6 max-w-[56ch] text-lg leading-7 text-colus-muted">
                Escola, alunos e famílias constroem experiências mais fortes quando participam, acompanham e crescem em conjunto.
              </p>
            </motion.div>

            <div className="relative mx-auto mt-2 min-h-[66vh] max-w-6xl">
              <motion.svg
                viewBox="0 0 1100 690"
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
                style={reduceMotion ? undefined : { opacity: ringFade }}
              >
                <motion.path
                  d="M112 528 C150 230 420 112 666 166 C896 216 984 408 850 580"
                  fill="none"
                  stroke="#0C5898"
                  strokeOpacity=".22"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ pathLength: reduceMotion ? 0.8 : ringLength }}
                />
                <motion.path
                  d="M205 606 C372 685 684 654 908 476"
                  fill="none"
                  stroke="#F18136"
                  strokeOpacity=".56"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ pathLength: reduceMotion ? 0.8 : ringLength }}
                />
                <g fill="#F18136">
                  <circle cx="152" cy="386" r="6" />
                  <circle cx="360" cy="173" r="5" />
                  <circle cx="672" cy="168" r="6" />
                  <circle cx="914" cy="325" r="5" />
                  <circle cx="824" cy="588" r="6" />
                </g>
              </motion.svg>

              <motion.article
                style={reduceMotion ? undefined : { opacity: mediaA }}
                className="absolute bottom-[7%] left-[1%] h-[44%] w-[39%]"
              >
                <div className="h-full overflow-hidden rounded-[30px_90px_30px_30px]">
                  <LandingMedia
                    kind="image"
                    src={`${MEDIA_ROOT}/06-pertencer/COLUS-PERTENCER-INTERACAO-001.webp`}
                    alt="Interação humana na comunidade escolar COLUS"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-colus-text">Acompanhar</p>
              </motion.article>

              <motion.article
                style={reduceMotion ? undefined : { opacity: mediaB }}
                className="absolute right-[5%] top-[10%] h-[36%] w-[29%]"
              >
                <div className="h-full overflow-hidden rounded-[84px_28px_28px_28px]">
                  <LandingMedia
                    kind="image"
                    src={`${MEDIA_ROOT}/06-pertencer/COLUS-PERTENCER-COMUNIDADE-001.webp`}
                    alt="Participação e comunidade na vida escolar"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-colus-text">Participar</p>
              </motion.article>

              <motion.article
                style={reduceMotion ? undefined : { opacity: mediaC }}
                className="absolute bottom-[1%] right-[17%] h-[30%] w-[23%]"
              >
                <div className="h-full overflow-hidden rounded-[28px_28px_70px_28px]">
                  <LandingMedia
                    kind="image"
                    src={`${MEDIA_ROOT}/06-pertencer/COLUS-PERTENCER-COMUNIDADE-002.webp`}
                    alt="Momento coletivo de comunidade escolar"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-colus-text">Crescer juntos</p>
              </motion.article>

              <div className="absolute left-[43%] top-[54%] z-20 max-w-[15rem]">
                {relations.map(([title, copy]) => (
                  <div key={title} className="mb-4">
                    <p className="text-sm font-bold text-colus-ink">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-colus-muted">{copy}</p>
                  </div>
                ))}
              </div>

              <motion.div
                style={
                  reduceMotion
                    ? undefined
                    : { opacity: handoffOpacity, scaleY: handoffScaleY }
                }
                className="absolute -bottom-[18vh] left-[61%] z-10 h-[34vh] w-px origin-top bg-gradient-to-b from-colus-orange via-colus-orange to-transparent"
                aria-hidden="true"
              >
                <span className="absolute -left-[5px] top-0 h-3 w-3 rounded-full bg-colus-orange" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

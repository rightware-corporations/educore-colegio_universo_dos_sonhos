import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
  const ringPathRef = useRef<SVGPathElement>(null);
  const markerX = useMotionValue(112);
  const markerY = useMotionValue(528);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.12], [0.92, 1]);
  const headlineY = useTransform(scrollYProgress, [0, 0.12], [8, 0]);
  const ringLength = useTransform(scrollYProgress, [0.06, 0.68], [0, 1]);
  const ringNodesOpacity = useTransform(scrollYProgress, [0.12, 0.38], [0, 1]);
  const ringFade = useTransform(scrollYProgress, [0.78, 1], [1, 0.7]);

  const mediaA = useTransform(scrollYProgress, [0, 0.15], [0.85, 1]);
  const mediaB = useTransform(scrollYProgress, [0.05, 0.2], [0.8, 1]);
  const mediaC = useTransform(scrollYProgress, [0.09, 0.24], [0.72, 1]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const path = ringPathRef.current;
    if (!path) return;
    const point = path.getPointAtLength(Math.min(progress / 0.72, 1) * path.getTotalLength());
    markerX.set(point.x);
    markerY.set(point.y);
  });

  const handoffOpacity = useTransform(scrollYProgress, [0.72, 0.92], [0, 1]);
  const handoffScaleY = useTransform(scrollYProgress, [0.72, 0.96], [0.1, 1]);

  return (
    <section
      ref={ref}
      id="comunidade"
      data-header-theme="light"
      className="relative scroll-mt-24 overflow-hidden bg-colus-white lg:overflow-visible"
    >

      {/* Mobile: community is a visual journey, not three captioned image cards. */}
      <div className={reduceMotion ? "block" : "lg:hidden"}>
        <div className="mx-auto max-w-[680px] sm:px-6 sm:py-12">
          <article className="relative isolate min-h-[82svh] overflow-hidden bg-colus-ink sm:rounded-[32px_84px_32px_32px]">
            <div className="absolute inset-0">
              <LandingMedia
                kind="image"
                src={MEDIA_ROOT + "/06-pertencer/COLUS-PERTENCER-INTERACAO-001.webp"}
                alt="Interação humana na comunidade escolar COLUS"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-colus-ink/85 via-colus-ink/20 to-colus-ink/95" />
            <div className="relative z-10 flex min-h-[82svh] flex-col justify-between px-6 pb-11 pt-16 sm:px-9">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.19em] text-colus-orange">Pertencer</p>
                <h2 className="mt-5 max-w-[12ch] font-editorial text-[clamp(43px,10.8vw,66px)] font-medium leading-[.98] tracking-[-.04em] text-white">
                  Crescer é uma jornada partilhada.
                </h2>
              </div>
              <p className="max-w-[34ch] text-[16px] font-medium leading-7 text-white/95">
                Escola, alunos e famílias constroem experiências mais fortes quando participam, acompanham e crescem em conjunto.
              </p>
            </div>
          </article>

          <div className="relative ml-8 h-20 w-px bg-gradient-to-b from-colus-orange via-colus-deep-blue/50 to-colus-deep-blue/20" aria-hidden="true">
            <span className="absolute -left-[5px] top-6 h-3 w-3 rounded-full bg-colus-orange" />
          </div>

          <article className="relative isolate ml-6 min-h-[65svh] overflow-hidden rounded-[80px_25px_25px_25px] bg-colus-ink sm:ml-0">
            <div className="absolute inset-0">
              <LandingMedia
                kind="image"
                src={MEDIA_ROOT + "/06-pertencer/COLUS-PERTENCER-COMUNIDADE-001.webp"}
                alt="Participação e comunidade na vida escolar"
                className="object-top"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-colus-ink/95 via-colus-ink/25 to-transparent" />
            <div className="relative z-10 flex min-h-[65svh] flex-col justify-end px-6 pb-10">
              <p className="text-[11px] font-bold uppercase tracking-[.19em] text-colus-orange">01 / Participar</p>
              <h3 className="mt-3 max-w-[12ch] font-editorial text-[clamp(38px,9vw,54px)] font-medium leading-[1.02] tracking-[-.035em] text-white">
                Fazer parte da vida escolar.
              </h3>
              <p className="mt-3 max-w-[30ch] text-[16px] leading-6 text-white/90">
                Escola vivida também em comunidade.
              </p>
            </div>
          </article>

          <div className="relative ml-auto mr-10 h-20 w-px bg-gradient-to-b from-colus-deep-blue/30 to-colus-orange" aria-hidden="true">
            <span className="absolute -left-[5px] bottom-4 h-3 w-3 rounded-full bg-colus-orange" />
          </div>
          <article className="relative isolate mr-8 min-h-[66svh] overflow-hidden rounded-[26px_26px_84px_26px] bg-colus-ink sm:mr-0">
            <div className="absolute inset-0">
              <LandingMedia
                kind="image"
                src={MEDIA_ROOT + "/06-pertencer/COLUS-PERTENCER-COMUNIDADE-002.webp"}
                alt="Momento coletivo de comunidade escolar"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-colus-ink/95 via-colus-ink/25 to-transparent" />
            <div className="relative z-10 flex min-h-[66svh] flex-col justify-end px-6 pb-10">
              <p className="text-[11px] font-bold uppercase tracking-[.19em] text-colus-orange">02 / Crescer juntos</p>
              <h3 className="mt-3 max-w-[13ch] font-editorial text-[clamp(37px,9vw,53px)] font-medium leading-[1.02] tracking-[-.035em] text-white">
                A confiança constrói-se em conjunto.
              </h3>
              <p className="mt-3 max-w-[30ch] text-[16px] leading-6 text-white/90">
                Proximidade, participação e desenvolvimento.
              </p>
            </div>
          </article>
          <div className="ml-8 h-16 w-px bg-gradient-to-b from-colus-orange to-transparent" aria-hidden="true" />
        </div>
      </div>

      <div className={reduceMotion ? "hidden" : "hidden h-[155vh] lg:block"}>
        <div className="sticky top-0 h-screen overflow-hidden py-12 lg:py-14">
          <div className="mx-auto flex h-full max-w-[1440px] flex-col px-16">
            <motion.div
              style={reduceMotion ? undefined : { opacity: headlineOpacity, y: headlineY }}
              className="relative z-20 max-w-3xl shrink-0"
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

            <div className="relative mx-auto mt-5 min-h-0 w-full max-w-6xl flex-1">
              <motion.svg
                viewBox="0 0 1100 690"
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid meet"
                style={reduceMotion ? undefined : { opacity: ringFade }}
              >
                {/* The master calls for a substantial but deliberately open
                    Community Ring: blue relation, orange continuity, moving nodes. */}
                <path
                  d="M112 528 C150 230 420 112 666 166 C896 216 984 408 850 580 C690 675 360 674 205 606"
                  fill="none"
                  stroke="#0C5898"
                  strokeOpacity=".10"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <motion.path
                  ref={ringPathRef}
                  d="M112 528 C150 230 420 112 666 166 C896 216 984 408 850 580 C690 675 360 674 205 606"
                  fill="none"
                  stroke="#0C5898"
                  strokeOpacity=".55"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{ pathLength: reduceMotion ? 1 : ringLength }}
                />
                <motion.path
                  d="M160 554 C205 310 427 177 653 216 C833 250 929 417 804 559"
                  fill="none"
                  stroke="#2899EF"
                  strokeOpacity=".33"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ pathLength: reduceMotion ? 1 : ringLength }}
                />
                <motion.path
                  d="M205 606 C372 672 684 648 908 476"
                  fill="none"
                  stroke="#F18136"
                  strokeOpacity=".72"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ pathLength: reduceMotion ? 1 : ringLength }}
                />
                <motion.g style={{ opacity: reduceMotion ? 1 : ringNodesOpacity }}>
                  <g fill="#F18136">
                    <circle cx="152" cy="386" r="7" />
                    <circle cx="360" cy="173" r="6" />
                    <circle cx="672" cy="168" r="7" />
                    <circle cx="914" cy="325" r="6" />
                    <circle cx="824" cy="588" r="7" />
                  </g>
                  <g fill="none" stroke="#0C5898" strokeOpacity=".28" strokeWidth="2">
                    <circle cx="360" cy="173" r="18" />
                    <circle cx="672" cy="168" r="22" />
                    <circle cx="824" cy="588" r="17" />
                  </g>
                </motion.g>
                {!reduceMotion && (
                  <motion.g style={{ x: markerX, y: markerY }}>
                    <circle r="16" fill="#F18136" fillOpacity=".14" />
                    <circle r="6" fill="#F18136" stroke="#FFF8EF" strokeWidth="2" />
                  </motion.g>
                )}
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
                className="absolute right-[3%] top-[4%] h-[52%] w-[32%]"
              >
                <div className="h-full overflow-hidden rounded-[84px_28px_28px_28px]">
                  <LandingMedia
                    kind="image"
                    src={`${MEDIA_ROOT}/06-pertencer/COLUS-PERTENCER-COMUNIDADE-001.webp`}
                    alt="Participação e comunidade na vida escolar"
                    className="object-top"
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

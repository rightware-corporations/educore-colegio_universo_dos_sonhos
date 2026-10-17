import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { LandingMedia } from "./LandingMedia";
import { MobileNarrativePath } from "./MobileNarrativePath";
import { MobileSceneWindow } from "./MobileSceneWindow";
import { DesktopOrbitNode } from "./DesktopOrbitNode";

const MEDIA_ROOT = "/media/colus/landing/colus-assets-final-v03";

const relations = [
  ["Acompanhar", "proximidade e presença."],
  ["Participar", "escola vivida também em comunidade."],
  ["Crescer juntos", "confiança, pertença e desenvolvimento."],
] as const;

// Six small nodes from the desktop Master Plus, in its 1720×760 coordinate
// system. Render HTML dots separately from the responsive SVG so they stay
// physically ROUND even when the elliptical path scales nonuniformly.
const masterContextNodes = [
  [570, 135], [735, 85], [995, 120],
  [1145, 245], [1040, 545], [765, 590],
] as const;

export function PertencerSection() {
  const ref = useRef<HTMLElement>(null);
  const ringPathRef = useRef<SVGPathElement>(null);
  const markerX = useMotionValue("33.14%");
  const markerY = useMotionValue("17.76%");
  const [communityPhase, setCommunityPhase] = useState(1);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Desktop Master Plus: RELAÇÃO → ARCO NASCE → COMUNIDADE →
  // ESTABILIDADE → ABERTURA. Preserve all three approved media sources.
  const headlineOpacity = useTransform(scrollYProgress, [0.36, 0.55], [0.35, 1]);
  const headlineY = useTransform(scrollYProgress, [0.36, 0.55], [15, 0]);
  const ringLength = useTransform(scrollYProgress, [0.12, 0.34, 0.55], [0, 0.76, 1]);
  const ringNodesOpacity = useTransform(scrollYProgress, [0.18, 0.4], [0, 1]);
  const ringFade = useTransform(scrollYProgress, [0.8, 1], [1, 0.55]);
  const entryLineOpacity = useTransform(scrollYProgress, [0, 0.14, 0.2], [1, 1, 0]);
  const entryLineLength = useTransform(scrollYProgress, [0, 0.14], [0, 1]);

  const mediaA = useTransform(scrollYProgress, [0.04, 0.24], [0.6, 1]);
  const mediaB = useTransform(scrollYProgress, [0.25, 0.43], [0, 1]);
  const mediaC = useTransform(scrollYProgress, [0.38, 0.56], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextPhase = progress < 0.15 ? 1
      : progress < 0.34 ? 2
      : progress < 0.56 ? 3
      : progress < 0.8 ? 4 : 5;
    setCommunityPhase((previous) => previous === nextPhase ? previous : nextPhase);
    const path = ringPathRef.current;
    if (!path || reduceMotion) return;
    const portion = Math.max(0, Math.min(1, (progress - 0.1) / 0.73));
    const point = path.getPointAtLength(portion * path.getTotalLength());
    markerX.set(`${(point.x / 1720) * 100}%`);
    markerY.set(`${(point.y / 760) * 100}%`);
  });

  const handoffOpacity = useTransform(scrollYProgress, [0.78, 0.94], [0, 1]);
  const handoffLength = useTransform(scrollYProgress, [0.78, 0.98], [0, 1]);

  return (
    <section
      ref={ref}
      id="comunidade"
      data-header-theme="light"
      className="relative scroll-mt-24 overflow-hidden bg-colus-white lg:overflow-visible"
    >

      {/* Mobile: community is a visual journey, not three captioned image cards. */}
      <div className={reduceMotion ? "block" : "lg:hidden"}>
        <div data-colus-mobile-story="ring" className="relative mx-auto max-w-[680px] bg-colus-ink">
          <MobileNarrativePath kind="ring" />
          <article className="relative isolate min-h-[67svh] overflow-hidden bg-colus-ink sm:rounded-[32px_84px_32px_32px]">
            <MobileSceneWindow>
              <LandingMedia
                kind="image"
                src={MEDIA_ROOT + "/06-pertencer/COLUS-PERTENCER-INTERACAO-001.webp"}
                alt="Interação humana na comunidade escolar COLUS"
              />
            </MobileSceneWindow>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-colus-ink/85 via-colus-ink/20 to-colus-ink/95" />
            <div className="relative z-10 flex min-h-[67svh] flex-col justify-between px-6 pb-11 pt-16 sm:px-9">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.19em] text-colus-orange">Pertencer</p>
                <h2 className="mt-5 max-w-[12ch] font-editorial text-[clamp(43px,10.8vw,66px)] font-medium leading-[.98] tracking-[-.04em] text-white">
                  Crescer é uma jornada partilhada.
                </h2>
              </div>
              <div className="max-w-[34ch]">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[.2em] text-colus-orange">01 / Acompanhar</p>
                <p className="text-[16px] font-medium leading-7 text-white/95">
                Escola, alunos e famílias constroem experiências mais fortes quando participam, acompanham e crescem em conjunto.
                </p>
              </div>
            </div>
          </article>

          <div className="h-3" aria-hidden="true" />

          <article className="relative isolate ml-6 min-h-[52svh] overflow-hidden rounded-[80px_25px_25px_25px] bg-colus-ink sm:ml-0">
            <MobileSceneWindow>
              <LandingMedia
                kind="image"
                src={MEDIA_ROOT + "/06-pertencer/COLUS-PERTENCER-COMUNIDADE-001.webp"}
                alt="Participação e comunidade na vida escolar"
                className="object-top"
              />
            </MobileSceneWindow>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-colus-ink/95 via-colus-ink/25 to-transparent" />
            <div className="relative z-10 flex min-h-[52svh] flex-col justify-end px-6 pb-10">
              <p className="text-[11px] font-bold uppercase tracking-[.19em] text-colus-orange">02 / Participar</p>
              <h3 className="mt-3 max-w-[12ch] font-editorial text-[clamp(38px,9vw,54px)] font-medium leading-[1.02] tracking-[-.035em] text-white">
                Fazer parte da vida escolar.
              </h3>
              <p className="mt-3 max-w-[30ch] text-[16px] leading-6 text-white/90">
                Escola vivida também em comunidade.
              </p>
            </div>
          </article>

          <div className="h-3" aria-hidden="true" />
          <article className="relative isolate mr-8 min-h-[54svh] overflow-hidden rounded-[26px_26px_84px_26px] bg-colus-ink sm:mr-0">
            <MobileSceneWindow>
              <LandingMedia
                kind="image"
                src={MEDIA_ROOT + "/06-pertencer/COLUS-PERTENCER-COMUNIDADE-002.webp"}
                alt="Momento coletivo de comunidade escolar"
              />
            </MobileSceneWindow>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-colus-ink/95 via-colus-ink/25 to-transparent" />
            <div className="relative z-10 flex min-h-[54svh] flex-col justify-end px-6 pb-10">
              <p className="text-[11px] font-bold uppercase tracking-[.19em] text-colus-orange">03 / Crescer juntos</p>
              <h3 className="mt-3 max-w-[13ch] font-editorial text-[clamp(37px,9vw,53px)] font-medium leading-[1.02] tracking-[-.035em] text-white">
                A confiança constrói-se em conjunto.
              </h3>
              <p className="mt-3 max-w-[30ch] text-[16px] leading-6 text-white/90">
                Proximidade, participação e desenvolvimento.
              </p>
            </div>
          </article>
          
        </div>
      </div>

      <div className={reduceMotion ? "hidden" : "hidden h-[155vh] lg:block"}>
        <div className="sticky top-0 h-screen overflow-hidden py-12 lg:py-14">
          <div className="mx-auto flex h-full max-w-[1440px] flex-col px-16">
            <p className="relative z-20 shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-colus-orange">
              Pertencer
            </p>

            <div data-colus-community-stage data-colus-community-phase={communityPhase} className="relative mx-auto mt-5 min-h-0 w-full max-w-6xl flex-1">
              <motion.svg
                viewBox="0 0 1720 760"
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
                preserveAspectRatio="none"
                style={reduceMotion ? undefined : { opacity: ringFade }}
              >
                {/* Master Plus: 650×500 relational ellipse, intentionally OPEN.
                    Dotted orange arc; six contextual nodes; one active pointer. */}
                <path
                  data-colus-community-ring-ghost
                  d="M570 135 C685 63 850 72 995 120 C1128 174 1218 290 1190 420 C1167 535 1050 600 895 606 C754 612 633 548 570 450 C526 376 527 250 570 185"
                  fill="none" stroke="#F18136" strokeOpacity=".15"
                  strokeWidth="2" strokeDasharray="4 13"
                />
                <motion.path
                  ref={ringPathRef}
                  data-colus-community-ring-path
                  d="M570 135 C685 63 850 72 995 120 C1128 174 1218 290 1190 420 C1167 535 1050 600 895 606 C754 612 633 548 570 450 C526 376 527 250 570 185"
                  fill="none" stroke="#F18136" strokeOpacity=".85"
                  strokeWidth="3" strokeDasharray="4 13" strokeLinecap="round"
                  style={{ pathLength: reduceMotion ? 1 : ringLength }}
                />

                {/* During ABERTURA the last ring segment flows towards the
                    Rise Axis at the same 50% horizontal locus used by Transformar. */}
                <motion.path
                  data-colus-community-rise-handoff
                  d="M765 590 C775 670 844 695 860 760"
                  fill="none" stroke="#F18136" strokeWidth="3" strokeLinecap="round"
                  style={{ pathLength: reduceMotion ? 1 : handoffLength,
                    opacity: reduceMotion ? 1 : handoffOpacity }}
                />
              </motion.svg>

              {/* Separate fixed-size nodes from nonuniform SVG scaling. */}
              <motion.div
                data-colus-community-context-nodes
                style={reduceMotion ? undefined : { opacity: ringNodesOpacity }}
                className="pointer-events-none absolute inset-0 z-10"
                aria-hidden="true"
              >
                {masterContextNodes.map(([x, y], index) => (
                  <span
                    key={index}
                    className="absolute h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-colus-orange"
                    style={{ left: `${(x / 1720) * 100}%`, top: `${(y / 760) * 100}%` }}
                  />
                ))}
              </motion.div>
              <motion.div
                data-colus-community-active-node
                style={reduceMotion
                  ? { left: "33.14%", top: "17.76%" }
                  : { left: markerX, top: markerY }}
                className="pointer-events-none absolute z-20 h-10 w-10 -translate-x-1/2 -translate-y-1/2"
                aria-hidden="true"
              >
                <svg viewBox="-20 -20 40 40" className="h-10 w-10 overflow-visible">
                  <DesktopOrbitNode progress={scrollYProgress} tone="orange" size={14} />
                </svg>
              </motion.div>

              {/* Master Plus: headline + description INSIDE the open ellipse,
                  rather than detached above the image composition. */}
              <motion.div
                data-colus-community-central-copy
                style={reduceMotion ? undefined : { opacity: headlineOpacity, y: headlineY }}
                className="pointer-events-none absolute left-[36%] top-[28%] z-20 w-[30%] text-center"
              >
                <h2 className="font-editorial text-[clamp(28px,3.15vw,46px)] font-medium leading-[1.06] tracking-[-.03em] text-colus-ink">
                  Crescer é uma jornada partilhada.
                </h2>
                <p className="mx-auto mt-5 max-w-[39ch] text-[clamp(11px,1vw,15px)] leading-[1.45] text-colus-muted">
                  Escola, alunos e famílias constroem experiências mais fortes quando participam, acompanham e crescem em conjunto.
                </p>
              </motion.div>

              <motion.article
                data-colus-community-media="1"
                style={reduceMotion ? undefined : { opacity: mediaA }}
                className="absolute left-[4%] top-[14%] h-[38%] w-[23%]"
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
                data-colus-community-media="2"
                style={reduceMotion ? undefined : { opacity: mediaB }}
                className="absolute right-[5%] top-[10%] h-[32%] w-[24%]"
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
                data-colus-community-media="3"
                style={reduceMotion ? undefined : { opacity: mediaC }}
                className="absolute bottom-[12%] right-[9%] h-[29%] w-[23%]"
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

              {/* Three relation beats occupy distinct positions around the ring. */}
              {relations.map(([title, copy], index) => (
                <div
                  data-colus-community-relation={index + 1}
                  key={title}
                  className={["absolute left-[5%] top-[62%] z-20 w-[19%]",
                    "absolute left-[27%] top-[82%] z-20 w-[19%]",
                    "absolute left-[48%] top-[84%] z-20 w-[20%]"][index]}
                >
                  <p className="text-sm font-bold text-colus-ink">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-colus-muted">{copy}</p>
                </div>
              ))}


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

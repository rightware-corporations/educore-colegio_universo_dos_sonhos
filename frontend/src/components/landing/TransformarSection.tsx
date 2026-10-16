import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LandingMedia } from "./LandingMedia";
import { MobileNarrativePath } from "./MobileNarrativePath";
import { MobileSceneWindow } from "./MobileSceneWindow";

const MEDIA_ROOT = "/media/colus/landing/colus-assets-final-v03";

export function TransformarSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const axisLength = useTransform(scrollYProgress, [0.04, 0.92], [0, 1]);
  const first = useTransform(scrollYProgress, [0, 0.18, 0.4, 0.48], [1, 1, 1, 0]);
  const second = useTransform(scrollYProgress, [0.39, 0.47, 0.65, 0.73], [0, 1, 1, 0]);
  const third = useTransform(scrollYProgress, [0.64, 0.72, 1], [0, 1, 1]);
  const horizonOpacity = useTransform(scrollYProgress, [0.86, 0.96], [0, 1]);
  const horizonScaleX = useTransform(scrollYProgress, [0.86, 1], [0.08, 1]);

  const moments = [
    {
      number: "01",
      label: "EXPRESSAR",
      copy: "Voz, criatividade e presença.",
      src: "07-transformar/expressar/COLUS-TRANSFORMAR-EXPRESSAR-001.webp",
      alt: "Estudante em momento de expressão e protagonismo",
    },
    {
      number: "02",
      label: "CONSTRUIR",
      copy: "Transformar ideias em experiências e soluções.",
      src: "07-transformar/construir/COLUS-TRANSFORMAR-CONSTRUIR-001.webp",
      alt: "Atividade prática de construção e aprendizagem",
    },
    {
      number: "03",
      label: "AVANÇAR",
      copy: "Confiança para experimentar novos caminhos.",
      src: "07-transformar/avancar/COLUS-TRANSFORMAR-AVANCAR-001.webp",
      alt: "Momento de realização e confiança estudantil",
    },
  ] as const;

  const desktopMoments = [
    { ...moments[0], opacity: first },
    { ...moments[1], opacity: second },
    { ...moments[2], opacity: third },
  ];

  return (
    <section
      ref={ref}
      id="transformar"
      data-header-theme="dark"
      className="relative overflow-hidden bg-colus-ink text-white lg:overflow-visible"
    >

      {/* Mobile: one vertical narrative, with each stage inscribed in its image. */}
      <div className={reduceMotion ? "block" : "lg:hidden"}>
        <div className="relative mx-auto max-w-[680px] sm:px-6 sm:py-12">
          <MobileNarrativePath kind="axis" />
          <article className="relative isolate min-h-[90svh] overflow-hidden bg-colus-ink-soft sm:rounded-[34px_88px_34px_34px]">
            <MobileSceneWindow>
              <LandingMedia
                kind="image"
                src={MEDIA_ROOT + "/" + moments[0].src}
                alt={moments[0].alt}
              />
            </MobileSceneWindow>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-colus-ink/95 via-colus-ink/40 to-colus-ink/95" />
            <div className="relative z-10 flex min-h-[90svh] flex-col justify-between px-6 pb-11 pt-16 sm:px-9">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.2em] text-colus-orange">Transformar</p>
                <h2 className="mt-5 max-w-[13ch] font-editorial text-[clamp(38px,9vw,60px)] font-medium leading-[1] tracking-[-.04em] text-white">
                  Quando a confiança cresce, novos caminhos tornam-se possíveis.
                </h2>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.2em] text-colus-orange">01 / Expressar</p>
                <p className="mt-3 max-w-[27ch] text-[clamp(19px,5vw,25px)] font-semibold leading-[1.3] text-white">
                  Voz, criatividade e presença.
                </p>
              </div>
            </div>
          </article>

          {moments.slice(1).map((moment, index) => (
            <div key={moment.number}>
              <div className="h-10" aria-hidden="true" />
              <article
                className={
                  "relative isolate overflow-hidden bg-colus-ink-soft " +
                  (index === 0
                    ? "ml-5 min-h-[69svh] rounded-[82px_26px_26px_26px] sm:ml-0"
                    : "mr-7 min-h-[73svh] rounded-[26px_26px_84px_26px] sm:mr-0")
                }
              >
                <MobileSceneWindow>
                  <LandingMedia kind="image" src={MEDIA_ROOT + "/" + moment.src} alt={moment.alt} />
                </MobileSceneWindow>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-colus-ink/95 via-colus-ink/30 to-colus-ink/10" />
                <div className={"relative z-10 flex flex-col justify-between px-6 pb-10 pt-8 " + (index === 0 ? "min-h-[69svh]" : "min-h-[73svh]")}>
                  <p className="text-[11px] font-bold uppercase tracking-[.2em] text-white/75">
                    TRANSFORMAR / {moment.number}
                  </p>
                  <div>
                    <h3 className="font-editorial text-[clamp(40px,10vw,59px)] font-medium leading-none tracking-[-.035em] text-white">
                      {index === 0 ? "Construir" : "Avançar"}
                    </h3>
                    <p className="mt-4 max-w-[28ch] text-[18px] font-medium leading-7 text-white/95">
                      {moment.copy}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          ))}
          <div className="h-6" aria-hidden="true" />
        </div>
      </div>

      <div className={reduceMotion ? "hidden" : "hidden h-[220vh] lg:block"}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_22%,rgba(241,129,54,.18),transparent_28%),linear-gradient(180deg,#FFF8EF_0%,#071A2A_34%,#071A2A_100%)] opacity-95" />
          <svg viewBox="0 0 1400 900" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <motion.path
              d="M690 980 C684 710 720 570 704 390 C692 248 732 146 780 -80"
              fill="none"
              stroke="#F18136"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: reduceMotion ? 1 : axisLength }}
            />
          </svg>

          <motion.div
            style={reduceMotion ? undefined : { opacity: horizonOpacity, scaleX: horizonScaleX }}
            className="pointer-events-none absolute bottom-[12vh] left-1/2 z-10 h-px w-[72vw] max-w-[1040px] -translate-x-1/2 origin-center bg-white/18"
            aria-hidden="true"
          >
            <span className="absolute -right-1 -top-[5px] h-3 w-3 rounded-full bg-colus-orange" />
          </motion.div>

          <div className="relative z-10 mx-auto grid min-h-screen max-w-[1440px] items-center gap-8 px-16 py-24 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-orange">
                Transformar
              </p>
              <h2 className="mt-5 max-w-[13ch] text-[clamp(42px,5.4vw,84px)] font-bold leading-[.98] tracking-[-.04em]">
                Quando a confiança cresce, novos caminhos tornam-se possíveis.
              </h2>
            </div>

            <div className="relative min-h-[66vh] lg:col-span-7">
              {desktopMoments.map((moment) => (
                <motion.article
                  key={moment.number}
                  style={reduceMotion ? undefined : { opacity: moment.opacity }}
                  className="absolute inset-0 overflow-hidden rounded-[34px_90px_34px_34px]"
                >
                  <LandingMedia
                    kind="image"
                    src={`${MEDIA_ROOT}/${moment.src}`}
                    alt={moment.alt}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-colus-ink via-colus-ink/10 to-transparent" />
                  <div className="absolute bottom-8 left-8 max-w-lg">
                    <p className="text-xs font-bold tracking-[0.18em] text-colus-orange">
                      {moment.number} / {moment.label}
                    </p>
                    <p className="mt-4 text-2xl font-semibold leading-8">{moment.copy}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LandingMedia } from "./LandingMedia";

const MEDIA_ROOT = "/media/colus/landing/colus-assets-final-v03";

export function TransformarSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const axisLength = useTransform(scrollYProgress, [0.04, 0.92], [0, 1]);
  const first = useTransform(scrollYProgress, [0.08, 0.24, 0.4], [0, 1, 0]);
  const second = useTransform(scrollYProgress, [0.34, 0.5, 0.66], [0, 1, 0]);
  const third = useTransform(scrollYProgress, [0.58, 0.74, 0.96], [0, 1, 1]);
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
      className={`relative overflow-hidden bg-colus-ink text-white ${reduceMotion ? "" : "lg:min-h-[165vh]"}`}
    >
      <div className={reduceMotion ? "block" : "lg:hidden"}>
        <div className="relative mx-auto max-w-[680px] px-5 py-20 sm:px-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(241,129,54,.16),transparent_25%)]" />

          <div className="relative z-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-orange">
              Transformar
            </p>
            <h2 className="mt-5 max-w-[13ch] text-[clamp(40px,10vw,50px)] font-bold leading-[.98] tracking-[-.04em]">
              Quando a confiança cresce, novos caminhos tornam-se possíveis.
            </h2>

            <div className="relative mt-12">
              <div className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-colus-orange via-colus-bright-blue/55 to-colus-orange/35" />

              <div className="space-y-8">
                {moments.map((moment) => (
                  <article key={moment.number} className="relative pl-12">
                    <span className="absolute left-[13px] top-5 z-20 h-3.5 w-3.5 rounded-full bg-colus-orange shadow-[0_0_0_6px_rgba(241,129,54,.09)]" />
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[28px_72px_28px_28px]">
                      <LandingMedia
                        kind="image"
                        src={`${MEDIA_ROOT}/${moment.src}`}
                        alt={moment.alt}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-colus-ink via-colus-ink/8 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="text-[11px] font-bold tracking-[0.18em] text-colus-orange">
                          {moment.number} / {moment.label}
                        </p>
                        <p className="mt-3 text-xl font-semibold leading-7 text-white">
                          {moment.copy}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={reduceMotion ? "hidden" : "hidden min-h-[165vh] lg:block"}>
        <div className="sticky top-0 min-h-screen overflow-hidden">
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

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

  const moments = [
    {
      number: "01",
      label: "EXPRESSAR",
      copy: "Voz, criatividade e presença.",
      opacity: first,
      src: "07-transformar/expressar/COLUS-TRANSFORMAR-EXPRESSAR-001.webp",
      alt: "Estudante em momento de expressão e protagonismo",
    },
    {
      number: "02",
      label: "CONSTRUIR",
      copy: "Transformar ideias em experiências e soluções.",
      opacity: second,
      src: "07-transformar/construir/COLUS-TRANSFORMAR-CONSTRUIR-001.webp",
      alt: "Atividade prática de construção e aprendizagem",
    },
    {
      number: "03",
      label: "AVANÇAR",
      copy: "Confiança para experimentar novos caminhos.",
      opacity: third,
      src: "07-transformar/avancar/COLUS-TRANSFORMAR-AVANCAR-001.webp",
      alt: "Momento de realização e confiança estudantil",
    },
  ];

  return (
    <section
      ref={ref}
      data-header-theme="dark"
      className="relative min-h-[145svh] overflow-hidden bg-colus-ink text-white lg:min-h-[165vh]"
    >
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

        <div className="relative z-10 mx-auto grid min-h-screen max-w-[1440px] items-center gap-8 px-5 py-24 md:px-8 lg:grid-cols-12 lg:px-16">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-orange">Transformar</p>
            <h2 className="mt-5 max-w-[13ch] text-[clamp(42px,5.4vw,84px)] font-bold leading-[.98] tracking-[-.04em]">
              Quando a confiança cresce, novos caminhos tornam-se possíveis.
            </h2>
          </div>

          <div className="relative min-h-[66vh] lg:col-span-7">
            {moments.map((moment) => (
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
    </section>
  );
}

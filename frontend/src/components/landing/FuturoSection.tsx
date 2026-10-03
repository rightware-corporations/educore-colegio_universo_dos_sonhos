import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LandingMedia } from "./LandingMedia";

const MEDIA_ROOT = "/media/colus/landing/colus-assets-final-v03";

function EngineeringDevice() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_72%_22%,rgba(40,153,239,.18),transparent_24%),linear-gradient(145deg,#0B2436,#071A2A)]">
      <svg viewBox="0 0 720 520" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g fill="none" stroke="rgba(248,251,253,.18)" strokeWidth="1.5">
          <path d="M90 388 L220 160 L360 388 Z" />
          <path d="M360 388 L500 130 L630 388 Z" />
          <circle cx="220" cy="160" r="48" />
          <circle cx="500" cy="130" r="66" />
          <path d="M148 286 H570" />
          <path d="M280 80 V450" />
        </g>
        <g fill="#F18136">
          <circle cx="220" cy="160" r="7" />
          <circle cx="360" cy="388" r="7" />
          <circle cx="500" cy="130" r="7" />
        </g>
      </svg>
      <div className="absolute bottom-8 left-8 h-px w-28 bg-gradient-to-r from-colus-orange/70 to-transparent" aria-hidden="true" />
    </div>
  );
}

export function FuturoSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const op1 = useTransform(scrollYProgress, [0.08, 0.18, 0.3], [0, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.26, 0.38, 0.5], [0, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.46, 0.58, 0.7], [0, 1, 0]);
  const op4 = useTransform(scrollYProgress, [0.66, 0.78, 0.94], [0, 1, 1]);
  const fieldLength = useTransform(scrollYProgress, [0.02, 0.95], [0, 1]);

  const scenes = [
    {
      number: "01",
      label: "TIC",
      copy: "Compreender, criar e usar tecnologia com propósito.",
      media: (
        <LandingMedia
          kind="image"
          src={`${MEDIA_ROOT}/04-futuro/tic/COLUS-FUTURO-TIC-001.jpg`}
          alt="Alunos em contexto de aprendizagem tecnológica"
        />
      ),
    },
    {
      number: "02",
      label: "ENGENHARIA",
      copy: "Transformar ideias em soluções, experiências e construção.",
      media: <EngineeringDevice />,
    },
    {
      number: "03",
      label: "CIÊNCIA",
      copy: "Observar, testar, compreender e ligar conhecimento ao mundo real.",
      media: (
        <LandingMedia
          kind="video"
          src={`${MEDIA_ROOT}/04-futuro/ciencia/COLUS-FUTURO-CIENCIA-VID-001.mp4`}
          poster={`${MEDIA_ROOT}/04-futuro/ciencia/COLUS-FUTURO-CIENCIA-001.webp`}
          alt="Experiência científica realizada em contexto escolar"
        />
      ),
    },
    {
      number: "04",
      label: "SEGURANÇA DIGITAL",
      copy: "Preparar para o futuro também é aprender a agir com responsabilidade no mundo digital.",
      media: (
        <LandingMedia
          kind="image"
          src={`${MEDIA_ROOT}/04-futuro/tic/COLUS-FUTURO-TIC-003.jpg`}
          alt="Contexto de aprendizagem e participação digital"
        />
      ),
    },
  ] as const;

  const desktopScenes = [
    { ...scenes[0], opacity: op1 },
    { ...scenes[1], opacity: op2 },
    { ...scenes[2], opacity: op3 },
    { ...scenes[3], opacity: op4 },
  ];

  return (
    <section
      ref={ref}
      id="futuro"
      data-header-theme="dark"
      className="relative scroll-mt-24 overflow-hidden bg-colus-ink text-white"
    >
      <div className={reduceMotion ? "block" : "lg:hidden"}>
        <div className="relative mx-auto max-w-[680px] px-5 py-20 sm:px-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_8%,rgba(40,153,239,.15),transparent_22%)]" />

          <div className="relative z-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-orange">
              Futuro & Tecnologia
            </p>
            <h2 className="mt-5 max-w-[12ch] text-[clamp(40px,10vw,50px)] font-bold leading-[.98] tracking-[-.04em]">
              O futuro também se aprende.
            </h2>
            <p className="mt-6 max-w-[42ch] text-[15px] leading-7 text-white/60">
              Tecnologia, ciência e engenharia ganham significado quando desenvolvem capacidade, pensamento e responsabilidade.
            </p>

            <div className="mt-10 space-y-6">
              {scenes.map((scene) => (
                <article key={scene.number}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[28px_72px_28px_28px] border border-white/10 bg-colus-ink-soft">
                    <div className="absolute inset-0">{scene.media}</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-colus-ink via-colus-ink/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                      <p className="text-[11px] font-bold tracking-[0.18em] text-colus-orange">
                        {scene.number} / {scene.label}
                      </p>
                      <p className="mt-3 text-xl font-semibold leading-7 text-white">
                        {scene.copy}
                      </p>
                    </div>
                  </div>
                  {scene.number !== "04" && (
                    <div className="ml-6 h-7 w-px bg-gradient-to-b from-colus-bright-blue/45 to-colus-orange/55" />
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={reduceMotion ? "hidden" : "hidden h-[230vh] lg:block"}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_64%_40%,rgba(12,88,152,.46),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(40,153,239,.12),transparent_24%)]" />

          <svg viewBox="0 0 1440 900" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <motion.path
              d="M-80 690 C230 660 340 270 700 340 C1010 400 1040 120 1520 200"
              fill="none"
              stroke="url(#signalGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: reduceMotion ? 1 : fieldLength }}
            />
            <defs>
              <linearGradient id="signalGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F18136" />
                <stop offset="48%" stopColor="#2899EF" />
                <stop offset="100%" stopColor="#0C5898" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative z-10 mx-auto grid min-h-screen max-w-[1440px] items-center gap-10 px-16 py-24 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-orange">
                Futuro & Tecnologia
              </p>
              <h2 className="mt-5 max-w-[12ch] text-[clamp(42px,5.4vw,84px)] font-bold leading-[.98] tracking-[-.04em]">
                O futuro também se aprende.
              </h2>
              <p className="mt-6 max-w-[42ch] text-base leading-7 text-white/60">
                Tecnologia, ciência e engenharia ganham significado quando desenvolvem capacidade, pensamento e responsabilidade.
              </p>
              <div className="mt-10 flex gap-3">
                {["01", "02", "03", "04"].map((value) => (
                  <span key={value} className="text-[11px] font-bold tracking-[0.16em] text-white/35">
                    {value}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[64vh] lg:col-span-8">
              {desktopScenes.map((scene) => (
                <motion.article
                  key={scene.number}
                  style={reduceMotion ? undefined : { opacity: scene.opacity }}
                  className="absolute inset-0 grid content-end overflow-hidden rounded-[32px_82px_32px_32px] border border-white/10 bg-colus-ink-soft"
                >
                  <div className="absolute inset-0">{scene.media}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-colus-ink via-colus-ink/18 to-transparent" />
                  <div className="relative z-10 max-w-xl p-10">
                    <p className="text-xs font-bold tracking-[0.18em] text-colus-orange">
                      {scene.number} / {scene.label}
                    </p>
                    <p className="mt-4 text-2xl font-semibold leading-8 text-white">
                      {scene.copy}
                    </p>
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

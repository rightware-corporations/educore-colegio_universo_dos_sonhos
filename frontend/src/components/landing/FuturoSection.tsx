import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { LandingMedia } from "./LandingMedia";

const MEDIA_ROOT = "/media/colus/landing/colus-assets-final-v03";

/**
 * Science restores the approved video clip instead of substituting the
 * editorial still. The source plays only when the media is visible; LandingMedia
 * pauses on exit and uses the still for reduced motion, save-data or failures.
 *
 * The original MP4 appeared sideways in Edge. Rotate ONLY the video layer;
 * the approved upright poster remains unrotated. The 1.4 scale prevents
 * gaps after rotating a square clip inside the landscape scene window.
 *
 * Verify rotation direction/crop on the actual Edge playback before calling
 * visual fidelity approved. No protected Hero component or media is touched.
 */
function ScienceSceneMedia() {
  return (
    <div className="relative h-full w-full overflow-hidden [&_video]:rotate-90 [&_video]:scale-[1.4]">
      <LandingMedia
        kind="video"
        src={`${MEDIA_ROOT}/04-futuro/ciencia/COLUS-FUTURO-CIENCIA-VID-001.mp4`}
        poster={`${MEDIA_ROOT}/04-futuro/ciencia/COLUS-FUTURO-CIENCIA-001.webp`}
        alt="Experiência científica realizada em contexto escolar"
      />
    </div>
  );
}

function EngineeringDevice() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-colus-ink">
      {/* Validated COLUS activity photo. The engineering-specific illustration
          remains in the signal field outside the media window, not over faces. */}
      <LandingMedia
        kind="image"
        src={`${MEDIA_ROOT}/03-aprender/criar/COLUS-APRENDER-CRIAR-001.webp`}
        alt="Alunos em atividade prática de criação e experimentação"
        className="object-[center_25%]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-colus-ink/60 via-transparent to-transparent" />
    </div>
  );
}

export function FuturoSection() {
  const ref = useRef<HTMLElement>(null);
  const signalPathRef = useRef<SVGPathElement>(null);
  const pointerX = useMotionValue(-80);
  const pointerY = useMotionValue(690);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Only one scene is mounted in the desktop media window at a time.
  // This prevents a previous Engineering device layer covering the TIC / Science
  // / Digital Safety photos while the caption already indicates another scene.
  const [activeScene, setActiveScene] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = latest >= 0.70 ? 3 : latest >= 0.48 ? 2 : latest >= 0.30 ? 1 : 0;
    setActiveScene((current) => current === next ? current : next);
    const path = signalPathRef.current;
    if (path) {
      const point = path.getPointAtLength(latest * path.getTotalLength());
      pointerX.set(point.x);
      pointerY.set(point.y);
    }
  });
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
      media: <ScienceSceneMedia />,
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

  return (
    <section
      ref={ref}
      id="futuro"
      data-header-theme="dark"
      className="relative scroll-mt-24 overflow-hidden bg-colus-ink text-white lg:overflow-visible"
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

      <div className={reduceMotion ? "hidden" : "hidden h-[280vh] lg:block"}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_64%_40%,rgba(12,88,152,.46),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(40,153,239,.12),transparent_24%)]" />

          <svg viewBox="0 0 1440 900" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <motion.path
              ref={signalPathRef}
              d="M-80 690 C230 660 340 270 700 340 C1010 400 1040 120 1520 200"
              fill="none"
              stroke="url(#signalGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: reduceMotion ? 1 : fieldLength }}
            />
            <motion.g style={{ x: pointerX, y: pointerY }} aria-hidden="true">
              <circle r="13" fill="#F18136" fillOpacity="0.14" />
              <circle r="6" fill="#F18136" stroke="#FFF8EF" strokeWidth="1.5" />
            </motion.g>
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
              <motion.article
                key={scenes[activeScene].number}
                data-colus-scene={scenes[activeScene].number}
                initial={{ opacity: 0.15, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 grid content-end overflow-hidden rounded-[32px_82px_32px_32px] border border-white/10 bg-colus-ink-soft"
              >
                <div className="absolute inset-0">{scenes[activeScene].media}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-colus-ink via-colus-ink/18 to-transparent" />
              </motion.article>
              {/* Caption remains outside the media layers, with no clipping. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 rounded-b-[32px] bg-gradient-to-t from-colus-ink/95 via-colus-ink/60 to-transparent px-10 pb-10 pt-20">
                <p className="text-xs font-bold tracking-[0.18em] text-colus-orange">
                  {scenes[activeScene].number} / {scenes[activeScene].label}
                </p>
                <p className="mt-4 max-w-xl text-2xl font-semibold leading-8 text-white">
                  {scenes[activeScene].copy}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

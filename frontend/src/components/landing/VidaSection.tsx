import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LandingMedia } from "./LandingMedia";
import { MobileNarrativePath } from "./MobileNarrativePath";
import { MobileSceneWindow } from "./MobileSceneWindow";

const MEDIA_ROOT = "/media/colus/landing/colus-assets-final-v03";

function StoryMarker({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em] text-colus-muted">
      <span className="h-2.5 w-2.5 rounded-full bg-colus-orange" />
      <span className="h-px w-8 bg-colus-orange/45" />
      <span>{label}</span>
    </div>
  );
}

export function VidaSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const immersionScale = useTransform(scrollYProgress, [0.05, 0.45], [1.025, 1]);
  const immersionY = useTransform(scrollYProgress, [0.05, 0.45], ["2.5vh", "0vh"]);
  const captionOpacity = useTransform(scrollYProgress, [0.1, 0.28], [0, 1]);

  const rhythmY = useTransform(scrollYProgress, [0.3, 0.68], ["4vh", "-1vh"]);
  const rhythmOpacity = useTransform(scrollYProgress, [0.28, 0.45], [0, 1]);

  const presenceScale = useTransform(scrollYProgress, [0.58, 0.9], [1.02, 1]);
  const presenceOpacity = useTransform(scrollYProgress, [0.58, 0.74], [0, 1]);
  const exitMarkerX = useTransform(scrollYProgress, [0.72, 0.98], ["0%", "56%"]);

  return (
    <section
      ref={ref}
      id="vida-colus"
      data-header-theme="light"
      className={`relative overflow-hidden bg-colus-paper lg:py-24 ${reduceMotion ? "" : "lg:min-h-[155vh]"}`}
    >

      {/* Mobile editorial sequence: typography belongs to each image, not a card below it. */}
      <div className="lg:hidden">
        <div className="relative mx-auto max-w-[680px]">
          <MobileNarrativePath kind="marker" />
          <article className="relative isolate min-h-[68svh] overflow-hidden bg-colus-ink">
            <MobileSceneWindow>
              <LandingMedia
                kind="image"
                src={MEDIA_ROOT + "/05-vida-colus/COLUS-VIDA-SPORT-001.webp"}
                alt="Momento de desporto e movimento na vida escolar COLUS"
              />
            </MobileSceneWindow>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-colus-ink/75 via-colus-ink/15 to-colus-ink/95" />
            <div className="relative z-10 flex min-h-[68svh] flex-col justify-between px-6 pb-11 pt-16 sm:px-9">
              <p className="text-[11px] font-bold uppercase tracking-[0.19em] text-colus-orange">Vida COLUS</p>
              <div>
                <h2 className="max-w-[12ch] font-editorial text-[clamp(43px,10.8vw,66px)] font-medium leading-[.98] tracking-[-.04em] text-white">
                  A escola acontece em movimento.
                </h2>
                <p className="mt-5 max-w-[33ch] text-[16px] font-medium leading-7 text-white/95">
                  Há aprendizagens, encontros e descobertas que só acontecem quando a escola ganha vida.
                </p>
              </div>
            </div>
          </article>

          <div className="h-10" aria-hidden="true" />

          <article className="relative isolate ml-5 min-h-[48svh] overflow-hidden rounded-[68px_22px_22px_22px] bg-colus-ink sm:ml-0">
            <MobileSceneWindow>
              <LandingMedia
                kind="image"
                src={MEDIA_ROOT + "/05-vida-colus/COLUS-VIDA-EXPRESSAO-001.webp"}
                alt="Momento de expressão e participação estudantil"
              />
            </MobileSceneWindow>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-colus-ink/95 via-colus-ink/25 to-transparent" />
            <div className="relative z-10 flex min-h-[48svh] flex-col justify-end px-6 pb-9">
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-colus-orange">01 / Expressão</p>
              <h3 className="mt-3 max-w-[12ch] font-editorial text-[clamp(36px,9vw,53px)] font-medium leading-none tracking-[-.035em] text-white">
                Encontrar a própria voz.
              </h3>
            </div>
          </article>

          <div className="h-10" aria-hidden="true" />
          <article className="relative isolate mr-9 min-h-[35svh] overflow-hidden rounded-[24px_72px_24px_24px] bg-colus-ink sm:mr-0">
            <MobileSceneWindow>
              <LandingMedia
                kind="image"
                src={MEDIA_ROOT + "/05-vida-colus/COLUS-VIDA-CULTURA-001.jpg"}
                alt="Momento cultural da comunidade escolar"
              />
            </MobileSceneWindow>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-colus-ink/95 via-colus-ink/20 to-transparent" />
            <div className="relative z-10 flex min-h-[35svh] flex-col justify-end px-6 pb-9">
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-colus-orange">02 / Cultura</p>
              <h3 className="mt-3 max-w-[13ch] font-editorial text-[clamp(35px,8.5vw,50px)] font-medium leading-none tracking-[-.035em] text-white">
                Partilhar o que nos liga.
              </h3>
            </div>
          </article>

          <div className="h-6" aria-hidden="true" />
          <article className="relative isolate ml-5 min-h-[48svh] overflow-hidden rounded-[24px_24px_78px_24px] bg-colus-ink sm:ml-0">
            <MobileSceneWindow>
              <LandingMedia
                kind="image"
                src={MEDIA_ROOT + "/05-vida-colus/COLUS-VIDA-SPORT-002.webp"}
                alt="Momento humano e coletivo na vida escolar"
              />
            </MobileSceneWindow>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-colus-ink/95 via-colus-ink/20 to-transparent" />
            <div className="relative z-10 flex min-h-[48svh] flex-col justify-end px-6 pb-9">
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-colus-orange">03 / Encontro</p>
              <h3 className="mt-3 max-w-[12ch] font-editorial text-[clamp(36px,9vw,52px)] font-medium leading-none tracking-[-.035em] text-white">
                Crescer em conjunto.
              </h3>
            </div>
          </article>
          <div className="h-12" aria-hidden="true" />
        </div>
      </div>

      <div className="hidden lg:block">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-colus-deep-blue">
            Vida COLUS
          </p>
          <h2 className="mt-5 max-w-[14ch] text-[clamp(38px,4.5vw,68px)] font-bold leading-[1.01] tracking-[-.035em] text-colus-ink">
            A escola acontece em movimento.
          </h2>
        </div>

        <article className="mt-10 lg:mt-12">
          <motion.div
            style={reduceMotion ? undefined : { scale: immersionScale, y: immersionY }}
            className="relative h-[58svh] min-h-[420px] overflow-hidden rounded-[30px_82px_30px_30px] lg:h-[78vh]"
          >
            <LandingMedia
              kind="image"
              src={`${MEDIA_ROOT}/05-vida-colus/COLUS-VIDA-SPORT-001.webp`}
              alt="Momento de desporto e movimento na vida escolar COLUS"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-colus-ink/42 via-transparent to-transparent" />

            <motion.div
              style={reduceMotion ? undefined : { opacity: captionOpacity }}
              className="absolute inset-x-5 bottom-5 max-w-lg text-white sm:inset-x-7 sm:bottom-7"
            >
              <StoryMarker label="Em movimento" />
              <p className="mt-4 text-lg font-semibold leading-7 sm:text-xl sm:leading-8">
                Há aprendizagens, encontros e descobertas que só acontecem quando a escola ganha vida.
              </p>
            </motion.div>
          </motion.div>
        </article>

        <div className="mt-14 lg:mt-20">
          <div className="mb-7 flex items-end justify-between gap-6">
            <StoryMarker label="Descoberta" />
            <p className="hidden max-w-[30ch] text-right text-sm leading-6 text-colus-muted md:block">
              Expressão, cultura e descoberta em diferentes momentos da vida escolar.
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-12 lg:items-start">
            <motion.article
              style={reduceMotion ? undefined : { opacity: rhythmOpacity, y: rhythmY }}
              className="lg:col-span-7"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px_28px_82px_28px] sm:aspect-[3/2] lg:h-[62vh] lg:aspect-auto">
                <LandingMedia
                  kind="image"
                  src={`${MEDIA_ROOT}/05-vida-colus/COLUS-VIDA-EXPRESSAO-001.webp`}
                  alt="Momento de expressão e participação estudantil"
                />
              </div>
              <div className="mt-4">
                <StoryMarker label="Expressão" />
              </div>
            </motion.article>

            <motion.article
              style={reduceMotion ? undefined : { opacity: rhythmOpacity }}
              className="lg:col-span-5 lg:pt-24"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[78px_28px_28px_28px] lg:h-[50vh] lg:aspect-auto">
                <LandingMedia
                  kind="image"
                  src={`${MEDIA_ROOT}/05-vida-colus/COLUS-VIDA-CULTURA-001.jpg`}
                  alt="Momento cultural da comunidade escolar"
                />
              </div>
              <div className="mt-4">
                <StoryMarker label="Criar juntos" />
              </div>
            </motion.article>
          </div>
        </div>

        <article className="mt-12 lg:mt-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <StoryMarker label="Em movimento" />
            </div>

            <motion.div
              style={reduceMotion ? undefined : { opacity: presenceOpacity, scale: presenceScale }}
              className="relative lg:col-span-8"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px_88px_28px_28px] sm:aspect-[16/10] lg:h-[66vh] lg:aspect-auto">
                <LandingMedia
                  kind="image"
                  src={`${MEDIA_ROOT}/05-vida-colus/COLUS-VIDA-SPORT-002.webp`}
                  alt="Momento humano e coletivo na vida escolar"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-colus-ink/20 via-transparent to-transparent" />
              </div>

              <motion.div
                style={reduceMotion ? undefined : { x: exitMarkerX }}
                className="absolute -bottom-5 left-[8%] flex items-center gap-3"
                aria-hidden="true"
              >
                <span className="h-3 w-3 rounded-full bg-colus-orange" />
                <span className="h-px w-16 bg-colus-orange/55" />
              </motion.div>
            </motion.div>
          </div>
        </article>
      </div>
      </div>
    </section>
  );
}

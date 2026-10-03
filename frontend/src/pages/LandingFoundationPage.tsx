import { motion, useReducedMotion } from "framer-motion";
import { schoolConfig } from "@/config/school.config";

export function LandingFoundationPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-hidden bg-colus-ink text-colus-white">
      <section className="relative flex min-h-screen items-center px-6 py-20 md:px-12 lg:px-20">
        <div aria-hidden="true" className="absolute -right-24 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full border border-colus-bright-blue/20" />
        <div aria-hidden="true" className="absolute right-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-colus-orange/15 blur-3xl" />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-5xl"
        >
          <p className="mb-8 text-xs font-bold uppercase tracking-[0.22em] text-colus-orange">
            {schoolConfig.legalName}
          </p>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.94] tracking-[-0.04em] md:text-7xl lg:text-8xl">
            Juntos Tornamos
            <span className="mt-2 block font-editorial font-medium text-colus-paper">
              Sonhos Em Realidade
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
            Uma experiência de aprendizagem que desperta curiosidade, confiança
            e visão de futuro.
          </p>
        </motion.div>
      </section>
    </main>
  );
}

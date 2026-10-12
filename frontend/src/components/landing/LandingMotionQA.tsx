import { useEffect, useState } from "react";

// Only enabled in the local Vite dev server with ?motionQA=1.
// The percentages below are computed from actual DOM positions, independently
// from Framer Motion's scrollYProgress, to diagnose missed scroll stages.
const sections = [
  { id: "top", label: "Intro / Hero" },
  { id: "experiencia", label: "Aprender" },
  { id: "futuro", label: "Futuro" },
  { id: "comunidade", label: "Pertencer" },
  { id: "transformar", label: "Transformar" },
] as const;

type SectionMetric = {
  id: string;
  label: string;
  progress: number;
  visible: boolean;
  stickyPosition: string;
  stickyTop: number | null;
  height: number;
};

const enabled =
  import.meta.env.DEV &&
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("motionQA") === "1";

export function LandingMotionQA() {
  const [metrics, setMetrics] = useState<SectionMetric[]>([]);
  const [viewport, setViewport] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let scheduled = 0;
    const measure = () => {
      scheduled = 0;
      const screenHeight = window.innerHeight;
      setViewport(screenHeight);
      setMetrics(
        sections.flatMap(({ id, label }) => {
          const element = document.getElementById(id);
          if (!element) return [];

          const rect = element.getBoundingClientRect();
          const sticky = element.querySelector<HTMLElement>(".sticky");
          const stickyRect = sticky?.getBoundingClientRect();
          const scrollRange = Math.max(1, rect.height - screenHeight);
          const progress = Math.max(0, Math.min(1, -rect.top / scrollRange));

          return [{
            id,
            label,
            progress,
            visible: rect.bottom > screenHeight * 0.2 && rect.top < screenHeight * 0.8,
            stickyPosition: sticky ? window.getComputedStyle(sticky).position : "—",
            stickyTop: stickyRect ? Math.round(stickyRect.top) : null,
            height: Math.round(rect.height),
          }];
        }),
      );
    };

    const requestMeasure = () => {
      if (!scheduled) scheduled = window.requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure);
    requestMeasure();
    return () => {
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
      if (scheduled) window.cancelAnimationFrame(scheduled);
    };
  }, []);

  if (!enabled) return null;

  return (
    <aside
      aria-label="Diagnóstico local de scroll COLUS"
      className="pointer-events-none fixed bottom-4 left-4 z-[100] w-[min(390px,calc(100vw-2rem))] rounded-xl border border-white/20 bg-colus-ink/95 p-4 font-mono text-xs text-white shadow-2xl"
    >
      <p className="mb-2 font-bold text-colus-orange">
        MOTION QA — apenas desenvolvimento — viewport {viewport}px
      </p>
      <div className="grid gap-1">
        {metrics.map((entry) => (
          <div
            key={entry.id}
            className={entry.visible ? "grid grid-cols-[1fr_auto] gap-2 text-white" : "grid grid-cols-[1fr_auto] gap-2 text-white/40"}
          >
            <span>{entry.label} {entry.visible ? "●" : "·"}</span>
            <span className="text-right">
              {(entry.progress * 100).toFixed(0)}% | {entry.height}px | {entry.stickyPosition} {entry.stickyTop ?? "—"}px
            </span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] leading-4 text-white/65">
        progresso DOM | altura da secção | posição sticky e topo em px
      </p>
    </aside>
  );
}

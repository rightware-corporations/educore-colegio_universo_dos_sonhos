import { useEffect, useRef, useState } from "react";

// Dev-only motion trace. No production telemetry, uploads or third-party services.
// Enabled only at http://localhost:8080/?motionQA=1#top.
const enabled =
  import.meta.env.DEV &&
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("motionQA") === "1";

const sections = [
  { id: "top", label: "Intro Morph" },
  { id: "hero", label: "Hero" },
  { id: "o-colegio", label: "Manifesto" },
  { id: "experiencia", label: "Aprender" },
  { id: "futuro", label: "Futuro" },
  { id: "comunidade", label: "Pertencer" },
  { id: "transformar", label: "Transformar" },
  { id: "contactos", label: "Convite / Contactos" },
] as const;

type VideoState = {
  source: string;
  ready: number;
  paused: boolean;
  error: number | null;
  visible: boolean;
  currentTime: number;
};

type Frame = {
  ms: number;
  delta: number;
  scrollY: number;
  section: string;
  progress: number;
  sticky: string;
  stickyTop: number | null;
  heading: string;
  headingVisible: boolean;
  headingTop: number | null;
  videos: VideoState[];
  imagesBroken: number;
  motionNodes: number;
  visibleMotionNodes: number;
  masks: string[];
  sceneLayers: string;
};

function visible(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return false;
  if (rect.bottom <= 0 || rect.top >= window.innerHeight) return false;
  if (rect.right <= 0 || rect.left >= window.innerWidth) return false;

  let current: HTMLElement | null = element;
  while (current) {
    const style = window.getComputedStyle(current);
    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      Number(style.opacity) < 0.2
    ) return false;
    current = current.parentElement;
  }
  return true;
}

function sample(now: number, started: number, lastFrame: number): Frame {
  const center = window.innerHeight * 0.5;
  const options = sections.flatMap(({ id, label }) => {
    const element = document.getElementById(id);
    if (!element) return [];
    const rect = element.getBoundingClientRect();
    return [{ element, rect, label }];
  });

  // Prefer the section covering the viewport centre; otherwise choose nearest.
  const current =
    options.find(({ rect }) => rect.top <= center && rect.bottom > center) ??
    options.reduce<(typeof options)[number] | undefined>((best, option) => {
      if (!best) return option;
      const distance = (entry: typeof option) =>
        Math.abs((entry.rect.top + entry.rect.bottom) / 2 - center);
      return distance(option) < distance(best) ? option : best;
    }, undefined);

  const element = current?.element;
  const rect = current?.rect;
  const progress = rect
    ? Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)))
    : 0;
  const sticky = element?.querySelector<HTMLElement>(".sticky");
  const heading = element?.querySelector<HTMLElement>("h1, h2, h3");
  const videos = Array.from(element?.querySelectorAll<HTMLVideoElement>("video") ?? []);
  const images = Array.from(element?.querySelectorAll<HTMLImageElement>("img") ?? []);
  const motionElements = Array.from(
    element?.querySelectorAll<HTMLElement>(
      '[style*="opacity"], [style*="transform"], [style*="clip-path"]',
    ) ?? [],
  );
  const masks = motionElements
    .map((node) => window.getComputedStyle(node).clipPath)
    .filter((mask) => mask && mask !== "none")
    .slice(0, 3)
    .map((mask) => mask.slice(0, 100));
  const sceneLayers = Array.from(
    element?.querySelectorAll<HTMLElement>("[data-colus-scene]") ?? [],
  )
    .map((node) =>
      (node.dataset.colusScene ?? "?") + ":" +
      Number(window.getComputedStyle(node).opacity).toFixed(2),
    )
    .join(" | ");

  return {
    ms: Math.round(now - started),
    delta: Math.round(now - lastFrame),
    scrollY: Math.round(window.scrollY),
    section: current?.label ?? "Fora das secções medidas",
    progress: Math.round(progress * 100),
    sticky: sticky ? window.getComputedStyle(sticky).position : "—",
    stickyTop: sticky ? Math.round(sticky.getBoundingClientRect().top) : null,
    heading: (heading?.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 85),
    headingVisible: heading ? visible(heading) : false,
    headingTop: heading ? Math.round(heading.getBoundingClientRect().top) : null,
    videos: videos.map((video) => ({
      source: (video.currentSrc || video.src).split("/").pop()?.split("?")[0] ?? "—",
      ready: video.readyState,
      paused: video.paused,
      error: video.error?.code ?? null,
      visible: visible(video),
      currentTime: Math.round(video.currentTime * 10) / 10,
    })),
    imagesBroken: images.filter((img) => img.complete && img.naturalWidth === 0).length,
    motionNodes: motionElements.length,
    visibleMotionNodes: motionElements.filter(visible).length,
    masks,
    sceneLayers,
  };
}

function makeReport(frames: Frame[], errors: string[], mode: string): string {
  const lines = [
    "COLUS — RELATORIO MOTION QA",
    "Gerado em: " + new Date().toISOString(),
    "Modo: " + mode,
    "Viewport: " + window.innerWidth + "x" + window.innerHeight,
    "Reduced motion: " + window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    "Scroll total: " + Math.round(document.documentElement.scrollHeight - window.innerHeight) + "px",
    "Amostras: " + frames.length,
    "Tempo: " + Math.round((frames.at(-1)?.ms ?? 0) / 1000) + "s",
    "Nota: medições DOM no browser; não equivalem a uma avaliação estética da fluidez.",
    "",
  ];

  const framesOver100 = frames.filter((frame) => frame.delta > 100).length;
  lines.push("FRAMES COM INTERVALO >100ms: " + framesOver100);
  lines.push("ERROS DETETADOS: " + errors.length);
  for (const error of errors.slice(0, 25)) lines.push("ERRO: " + error);
  lines.push("");

  const names = Array.from(new Set(frames.map((frame) => frame.section)));
  for (const name of names) {
    const group = frames.filter((frame) => frame.section === name);
    if (group.length === 0) continue;
    lines.push("=== " + name.toUpperCase() + " ===");
    lines.push(
      "Amostras: " + group.length +
      " | progresso: " + Math.min(...group.map((item) => item.progress)) +
      "-" + Math.max(...group.map((item) => item.progress)) + "%"
    );

    // Report a time-ordered selection across the scroll progress of each section.
    // The text exposes changes across the whole animation instead of a static image.
    for (const checkpoint of [0, 10, 25, 40, 50, 60, 75, 90, 100]) {
      const frame = group.reduce((best, candidate) =>
        Math.abs(candidate.progress - checkpoint) < Math.abs(best.progress - checkpoint)
          ? candidate
          : best,
      );
      const videoText = frame.videos.length
        ? frame.videos.map((video) =>
            video.source +
            " [visivel=" + video.visible +
            ", aTocar=" + !video.paused +
            ", ready=" + video.ready +
            ", erro=" + (video.error ?? "nenhum") +
            ", t=" + video.currentTime + "s]"
          ).join(" | ")
        : "sem elemento video nesta secção";
      lines.push(
        "Ponto " + checkpoint + "%: atingido " + frame.progress +
        "%; t=" + frame.ms + "ms; scroll=" + frame.scrollY +
        "px; sticky=" + frame.sticky +
        " top=" + (frame.stickyTop ?? "—") +
        "px; tituloVisivel=" + frame.headingVisible +
        "; tituloTop=" + (frame.headingTop ?? "—") +
        "px; imagensPartidas=" + frame.imagesBroken +
        "; motionVisivel=" + frame.visibleMotionNodes + "/" + frame.motionNodes
      );
      if (frame.masks.length) lines.push("  Clip/mask: " + frame.masks.join(" | "));
      if (frame.sceneLayers) lines.push("  Opacidade por cena: " + frame.sceneLayers);
      if (frame.heading) lines.push("  Texto: " + frame.heading);
      lines.push("  Media: " + videoText);
    }
    lines.push("");
  }

  lines.push("SINAIS A INVESTIGAR:");
  const activeVideoErrors = frames.flatMap((frame) => frame.videos.filter((video) => video.error !== null));
  if (activeVideoErrors.length) {
    lines.push("- Alguns vídeos comunicaram erro do elemento HTMLVideoElement.");
  }
  const heroIssues = frames.filter(
    (frame) =>
      (frame.section === "Intro Morph" || frame.section === "Hero") &&
      frame.progress >= 45 &&
      frame.progress <= 90 &&
      frame.videos.length > 0 &&
      frame.videos.every((video) => !video.visible),
  );
  if (heroIssues.length) {
    lines.push("- O video do Hero esteve invisivel em " + heroIssues.length + " amostras no intervalo 45-90%.");
  }
  if (framesOver100 > 0) {
    lines.push("- Detetados " + framesOver100 + " intervalos >100ms; verificar travagens, separadores em fundo e carga de CPU.");
  }
  if (!heroIssues.length && !activeVideoErrors.length && framesOver100 === 0) {
    lines.push("- Sem erros automaticos nesses criterios. Continua necessaria comparacao com o wireframe.");
  }
  return lines.join("\n");
}

export function LandingMotionQA() {
  const [running, setRunning] = useState(false);
  const [current, setCurrent] = useState("Aguardando teste");
  const [report, setReport] = useState("");
  const [copied, setCopied] = useState(false);
  const frames = useRef<Frame[]>([]);
  const errors = useRef<string[]>([]);
  const active = useRef(false);
  const autoRaf = useRef<number | null>(null);
  const sampleRaf = useRef<number | null>(null);
  const started = useRef(0);
  const previousFrame = useRef(0);
  const lastSample = useRef(0);
  const mode = useRef("manual");

  useEffect(() => {
    if (!enabled) return;
    const onError = (event: Event) => {
      if (!active.current) return;
      const target = event.target;
      if (target instanceof HTMLMediaElement) {
        errors.current.push(
          "media: " + target.currentSrc + " codigo " + (target.error?.code ?? "desconhecido")
        );
      } else if (event instanceof ErrorEvent) {
        errors.current.push("script: " + event.message);
      }
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      if (active.current) errors.current.push("promise: " + String(event.reason));
    };
    window.addEventListener("error", onError, true);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      active.current = false;
      if (autoRaf.current !== null) window.cancelAnimationFrame(autoRaf.current);
      if (sampleRaf.current !== null) window.cancelAnimationFrame(sampleRaf.current);
      window.removeEventListener("error", onError, true);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  if (!enabled) return null;

  const finish = () => {
    active.current = false;
    if (autoRaf.current !== null) window.cancelAnimationFrame(autoRaf.current);
    if (sampleRaf.current !== null) window.cancelAnimationFrame(sampleRaf.current);
    autoRaf.current = null;
    sampleRaf.current = null;
    setReport(makeReport(frames.current, errors.current, mode.current));
    setCurrent("Relatório pronto");
    setRunning(false);
  };

  const start = (selectedMode: "automatico" | "manual") => {
    if (active.current) return;
    frames.current = [];
    errors.current = [];
    mode.current = selectedMode;
    started.current = performance.now();
    previousFrame.current = started.current;
    lastSample.current = 0;
    setReport("");
    setCopied(false);
    setRunning(true);
    setCurrent("A recolher os estados da landing…");
    if (selectedMode === "automatico") window.scrollTo(0, 0);
    active.current = true;

    const tick = (now: number) => {
      if (!active.current) return;
      if (now - lastSample.current >= 70) {
        frames.current.push(sample(now, started.current, previousFrame.current));
        previousFrame.current = now;
        lastSample.current = now;
        if (frames.current.length > 4500) {
          finish();
          return;
        }
        if (frames.current.length % 15 === 0) {
          const last = frames.current[frames.current.length - 1];
          setCurrent(last.section + " · " + last.progress + "% · " + frames.current.length + " amostras");
        }
      }
      sampleRaf.current = window.requestAnimationFrame(tick);
    };
    sampleRaf.current = window.requestAnimationFrame(tick);

    if (selectedMode === "automatico") {
      const total = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const seconds = Math.min(55, Math.max(22, total / Math.max(1, window.innerHeight) * 1.8));
      const duration = seconds * 1000;
      const began = performance.now();
      const advance = (now: number) => {
        if (!active.current) return;
        const fraction = Math.min(1, (now - began) / duration);
        window.scrollTo(0, Math.round(fraction * total));
        if (fraction < 1) {
          autoRaf.current = window.requestAnimationFrame(advance);
        } else {
          autoRaf.current = null;
          // Sample final settled state before exporting the report.
          window.setTimeout(() => {
            if (active.current) finish();
          }, 400);
        }
      };
      autoRaf.current = window.requestAnimationFrame(advance);
    }
  };

  const copyReport = async () => {
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
    } catch {
      setCopied(false);
      setCurrent("Cópia bloqueada; use Descarregar relatório.");
    }
  };

  const downloadReport = () => {
    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "COLUS-motion-qa-relatorio.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <aside
      aria-label="Diagnóstico local de motion COLUS"
      className="fixed bottom-4 left-4 z-[100] w-[min(410px,calc(100vw-2rem))] rounded-xl border border-white/20 bg-colus-ink/95 p-4 font-mono text-xs text-white shadow-2xl"
    >
      <p className="mb-2 font-bold text-colus-orange">MOTION QA — COLUS · apenas desenvolvimento</p>
      <p aria-live="polite" className="mb-3 text-white/75">{current}</p>
      {!running && !report && (
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => start("automatico")} className="rounded-lg bg-colus-orange px-3 py-2 font-bold text-colus-ink">
            Executar teste automático
          </button>
          <button type="button" onClick={() => start("manual")} className="rounded-lg border border-white/35 px-3 py-2">
            Gravar scroll manual
          </button>
        </div>
      )}
      {running && (
        <button type="button" onClick={finish} className="rounded-lg bg-colus-orange px-3 py-2 font-bold text-colus-ink">
          Parar e gerar relatório
        </button>
      )}
      {!running && report && (
        <div className="grid gap-2">
          <p className="text-white/70">Teste concluído. Envie o texto do relatório aqui no chat.</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={copyReport} className="rounded-lg bg-colus-orange px-3 py-2 font-bold text-colus-ink">
              {copied ? "Copiado" : "Copiar relatório"}
            </button>
            <button type="button" onClick={downloadReport} className="rounded-lg border border-white/35 px-3 py-2">
              Descarregar .txt
            </button>
            <button type="button" onClick={() => { setReport(""); setCurrent("Aguardando teste"); }} className="rounded-lg border border-white/35 px-3 py-2">
              Novo teste
            </button>
          </div>
          <p className="text-[10px] text-white/50">
            {report.length} caracteres · registo local · nenhum dado enviado automaticamente
          </p>
        </div>
      )}
      <p className="mt-3 text-[10px] leading-4 text-white/50">
        Mede scroll, frames, sticky, títulos, vídeos e erros. Não altera a edição nem os efeitos da landing.
      </p>
    </aside>
  );
}

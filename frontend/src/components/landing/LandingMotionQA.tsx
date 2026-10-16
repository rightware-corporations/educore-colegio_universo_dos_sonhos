import { useEffect, useRef, useState } from "react";
import { colusMotionQaContract } from "@/config/colusMotionQaContract";
import { colusDesignQaContract } from "@/config/colusDesignQaContract";
import { compactQaSummary } from "@/shared/design-qa/compactQaSummary";
import { colusVisualCheckpoints, colusCheckpointStages } from "@/config/colusVisualCheckpoints";
import { checkpointScrollY, checkpointsAsText } from "@/shared/design-qa/visualCheckpoints";
import {
  evaluateDesignFidelity,
  designFidelityAsText,
  type DesignEvaluation,
  type DesignEvidence,
} from "@/shared/design-qa/designFidelity";
import { collectDesignEvidence, mergeDesignEvidence } from "@/shared/design-qa/domDesignAdapter";
import {
  evaluateMotionQa,
  toMotionQaComparisonText,
  type MotionQaEvaluation,
} from "@/shared/motion-qa/contractEvaluator";

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
  { id: "vida-colus", label: "Vida COLUS" },
  { id: "comunidade", label: "Pertencer" },
  { id: "transformar", label: "Transformar" },
  { id: "vozes-colus", label: "Vozes COLUS" },
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
  sectionId: string;
  progress: number;
  heightVh: number;
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
  visibleMedia: string[];
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
    return [{ id, element, rect, label }];
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
    sectionId: current?.id ?? "",
    progress: Math.round(progress * 100),
    heightVh: rect ? Math.round(rect.height / window.innerHeight * 100) : 0,
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
    visibleMedia: [
      ...images.filter(visible).map((img) => img.currentSrc || img.src),
      ...videos.filter(visible).map((video) => video.currentSrc || video.src),
    ].map((source) => source.split("/").pop()?.split("?")[0] ?? "—"),
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
  const recordedY = frames.map((frame) => frame.scrollY);
  const minY = recordedY.length ? Math.min(...recordedY) : 0;
  const maxY = recordedY.length ? Math.max(...recordedY) : 0;
  const totalY = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const coverage = Math.round((maxY - minY) / totalY * 100);
  const traversed = Array.from(new Set(frames.map((frame) => frame.section)));
  const invalid = mode === "automatico" && (coverage < 70 || traversed.length < 3);
  lines.push("COBERTURA DO SCROLL: " + coverage + "% (" + minY + "-" + maxY + "px)");
  lines.push("SECCOES REGISTADAS: " + traversed.join(" → "));
  lines.push(invalid ? "ESTADO: TESTE INCOMPLETO — os resultados não validam a landing." : "ESTADO: registo efetuado");
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
  if (!invalid && !heroIssues.length && !activeVideoErrors.length && framesOver100 === 0) {
    lines.push("- Sem erros automaticos nesses criterios. Continua necessaria comparacao com o wireframe.");
  }
  return lines.join("\n");
}

export function LandingMotionQA() {
  const [running, setRunning] = useState(false);
  const [current, setCurrent] = useState("Aguardando teste");
  const [report, setReport] = useState("");
  const [comparison, setComparison] = useState<MotionQaEvaluation | null>(null);
  const [designAudit, setDesignAudit] = useState<DesignEvaluation | null>(null);
  const [auditStage, setAuditStage] = useState("Todas");
  const [panelMinimized, setPanelMinimized] = useState(false);
  const [checkpointId, setCheckpointId] = useState("futuro@40");
  const [copied, setCopied] = useState(false);
  const frames = useRef<Frame[]>([]);
  const designSnapshots = useRef<DesignEvidence[][]>([]);
  const errors = useRef<string[]>([]);
  const active = useRef(false);
  const autoRaf = useRef<number | null>(null);
  const sampleRaf = useRef<number | null>(null);
  const started = useRef(0);
  const previousFrame = useRef(0);
  const lastSample = useRef(0);
  const mode = useRef("manual");
  const scrollStyle = useRef<{ html: string; body: string } | null>(null);
  const restoreScrollStyle = () => {
    if (!scrollStyle.current) return;
    document.documentElement.style.scrollBehavior = scrollStyle.current.html;
    document.body.style.scrollBehavior = scrollStyle.current.body;
    scrollStyle.current = null;
  };

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
      restoreScrollStyle();
      window.removeEventListener("error", onError, true);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  if (!enabled) {
    // Make QA discoverable on localhost without cluttering the public build.
    // The full inspector remains gated by ?motionQA=1 and DEV mode.
    return import.meta.env.DEV ? (
      <a
        href="/?motionQA=1#top"
        className="fixed bottom-4 left-4 z-[100] rounded-lg border border-white/25 bg-colus-ink/90 px-3 py-2 font-mono text-[11px] font-semibold text-white/85 shadow-lg transition hover:text-colus-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-colus-orange"
        aria-label="Abrir RIGHTWARE Design e Motion QA no ambiente de desenvolvimento"
      >
        Abrir Design + Motion QA
      </a>
    ) : null;
  }

  const finish = () => {
    active.current = false;
    if (autoRaf.current !== null) window.cancelAnimationFrame(autoRaf.current);
    if (sampleRaf.current !== null) window.cancelAnimationFrame(sampleRaf.current);
    autoRaf.current = null;
    sampleRaf.current = null;
    restoreScrollStyle();
    const minimum = frames.current.length
      ? Math.min(...frames.current.map((frame) => frame.scrollY))
      : 0;
    const maximum = frames.current.length
      ? Math.max(...frames.current.map((frame) => frame.scrollY))
      : 0;
    const coverage = (maximum - minimum) / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const evaluation = evaluateMotionQa(
      frames.current,
      colusMotionQaContract,
      window.innerWidth,
      Math.max(1, document.documentElement.scrollHeight - window.innerHeight),
      (() => {
        const main = document.querySelector("main");
        if (!main) return undefined;
        // The COLUS footer is rendered *inside* <main>. The master budget
        // explicitly excludes its natural height from the narrative total.
        const footer = main.querySelector("footer");
        const height = main.getBoundingClientRect().height -
          (footer?.getBoundingClientRect().height ?? 0);
        return Math.round(Math.max(0, height) / Math.max(1, window.innerHeight) * 100);
      })(),
    );
    setComparison(evaluation);
    setAuditStage("Todas");
    const comparative = toMotionQaComparisonText(evaluation);
    const designResult = evaluateDesignFidelity(
      colusDesignQaContract,
      mergeDesignEvidence([
        ...designSnapshots.current,
        collectDesignEvidence(colusDesignQaContract),
      ]),
      window.innerWidth >= 1024 ? "desktop" : "mobile",
    );
    setDesignAudit(designResult);
    setReport(
      designFidelityAsText(designResult) +
      "\n\n--- MOTION CONTRA ESPECIFICACAO ---\n\n" + comparative +
      "\n\n--- TRACE TEMPORAL (evidência, não aprovação) ---\n\n" +
      makeReport(frames.current, errors.current, mode.current) +
      "\n\n--- CHECKPOINTS VISUAIS PLANEADOS (referências ainda por aprovar) ---\n\n" +
      checkpointsAsText(colusVisualCheckpoints)
    );
    setCurrent(mode.current === "automatico" && coverage < 0.7
      ? "Teste incompleto — scroll não percorreu a página"
      : "Relatório pronto");
    setRunning(false);
  };

  const auditWireframe = () => {
    if (active.current) return;
    const result = evaluateDesignFidelity(
      colusDesignQaContract,
      collectDesignEvidence(colusDesignQaContract),
      window.innerWidth >= 1024 ? "desktop" : "mobile",
    );
    setDesignAudit(result);
    setAuditStage("Todas");
    setComparison(null);
    setReport(
      designFidelityAsText(result) +
      "\n\n--- CHECKPOINTS VISUAIS PLANEADOS (referências ainda por aprovar) ---\n\n" +
      checkpointsAsText(colusVisualCheckpoints)
    );
    setCurrent("Auditoria do wireframe pronta; critérios visuais aguardam revisão.");
    setCopied(false);
  };

  const start = (selectedMode: "automatico" | "manual") => {
    if (active.current) return;
    frames.current = [];
    designSnapshots.current = [collectDesignEvidence(colusDesignQaContract)];
    errors.current = [];
    mode.current = selectedMode;
    started.current = performance.now();
    previousFrame.current = started.current;
    lastSample.current = 0;
    setReport("");
    setComparison(null);
    setDesignAudit(null);
    setCopied(false);
    setRunning(true);
    setCurrent("A recolher os estados da landing…");
    if (selectedMode === "automatico") {
      scrollStyle.current = {
        html: document.documentElement.style.scrollBehavior,
        body: document.body.style.scrollBehavior,
      };
      // The production website uses html {scroll-behavior: smooth}.
      // Repeated scrollTo calls in an animation frame never reach their targets
      // under smooth scrolling. Override it only while this local QA is running.
      document.documentElement.style.scrollBehavior = "auto";
      document.body.style.scrollBehavior = "auto";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    active.current = true;

    const tick = (now: number) => {
      if (!active.current) return;
      if (now - lastSample.current >= 70) {
        frames.current.push(sample(now, started.current, previousFrame.current));
        if (frames.current.length % 12 === 0) {
          designSnapshots.current.push(collectDesignEvidence(colusDesignQaContract));
        }
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
        window.scrollTo({ top: Math.round(fraction * total), left: 0, behavior: "instant" });
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

  const goToCheckpoint = () => {
    if (active.current) return;
    const point = colusVisualCheckpoints.find((entry) => entry.id === checkpointId);
    if (!point) return;
    const section = document.getElementById(point.stageId);
    if (!section) {
      setCurrent("Checkpoint indisponível: âncora " + point.stageId + " não encontrada.");
      return;
    }
    const rect = section.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const destination = checkpointScrollY(
      top,
      rect.height,
      window.innerHeight,
      point.progress,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    // Development-only navigation; no changes to production smooth-scroll.
    window.scrollTo({ top: destination, behavior: "instant" });
    setCurrent("Checkpoint " + point.title + " — comparar manualmente com o master.");
  };

  const copyCompactSummary = async () => {
    try {
      await navigator.clipboard.writeText(compactQaSummary(designAudit, comparison));
      setCopied(true);
      setCurrent("Resumo curto copiado. Cole diretamente na conversa, sem anexar ficheiros.");
    } catch {
      setCopied(false);
      setCurrent("O navegador bloqueou a cópia; verifique a permissão da área de transferência.");
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

  const downloadReport = (format: "txt" | "json") => {
    const content = format === "json"
      ? JSON.stringify({
        contract: colusMotionQaContract,
        evaluation: comparison,
        designContract: colusDesignQaContract,
        designEvaluation: designAudit,
        visualCheckpointPlan: colusVisualCheckpoints,
        metadata: {
          generatedAt: new Date().toISOString(),
          viewport: [window.innerWidth, window.innerHeight],
          mode: mode.current,
          samples: frames.current.length,
          // Raw frames intentionally excluded: keep this JSON digest portable.
        },
      }, null, 2)
      : report;
    const blob = new Blob([content], {
      type: format === "json" ? "application/json;charset=utf-8" : "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "COLUS-motion-qa-contrato." + format;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <aside
      aria-label="Diagnóstico local de motion COLUS"
      className="fixed bottom-4 left-4 z-[100] max-h-[min(75vh,660px)] w-[min(440px,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-white/20 bg-colus-ink/95 p-4 font-mono text-xs text-white shadow-2xl"
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="font-bold text-colus-orange">RIGHTWARE DESIGN + MOTION QA · COLUS</p>
        <button
          type="button"
          onClick={() => setPanelMinimized((value) => !value)}
          className="shrink-0 rounded border border-white/35 px-2 py-1 text-[10px]"
          aria-expanded={!panelMinimized}
        >
          {panelMinimized ? "Abrir QA" : "Minimizar"}
        </button>
      </div>
      {!panelMinimized && (<>
      <p className="mb-2 text-[10px] text-white/55">
        Motion {colusMotionQaContract.id} · v{colusMotionQaContract.version}
        {" | "} Design {colusDesignQaContract.version}
      </p>
      <p aria-live="polite" className="mb-3 text-white/75">{current}</p>
      {!running && !report && (
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={auditWireframe} className="rounded-lg bg-colus-orange px-3 py-2 font-bold text-colus-ink">
            Auditar estado atual
          </button>
          <button type="button" onClick={() => start("automatico")} className="rounded-lg border border-white/35 px-3 py-2">
            Auditar página completa (Design + Motion)
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
          {designAudit && (
            <div className="rounded-lg border border-white/20 bg-white/5 p-3">
              <p className="font-semibold text-white">Fidelidade ao wireframe master V0.18</p>
              <p className="mt-1 text-white/75">
                CONFORME {designAudit.totals.MATCH} · EM FALTA {designAudit.totals.MISSING} ·
                PARCIAL {designAudit.totals.PARTIAL} · DIVERGENTE {designAudit.totals.DIVERGENT} ·
                REVER {designAudit.totals.REVIEW} · NÃO OBSERVADO {designAudit.totals.NOT_OBSERVED}
              </p>
              <p className="mt-2 text-[10px] text-white/60">
                {designAudit.results.length} regras catalogadas · {designAudit.totals.MATCH} correspondências instrumentais ·
                {designAudit.totals.MISSING + designAudit.totals.PARTIAL + designAudit.totals.DIVERGENT} desvios ·
                {designAudit.totals.REVIEW + designAudit.totals.NOT_OBSERVED} verificações pendentes.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <label htmlFor="colus-qa-stage" className="text-[10px] text-white/65">Filtrar secção:</label>
                <select
                  id="colus-qa-stage"
                  value={auditStage}
                  onChange={(event) => setAuditStage(event.target.value)}
                  className="min-w-0 flex-1 rounded border border-white/30 bg-colus-ink px-2 py-2 text-white"
                >
                  <option value="Todas">Todas as secções</option>
                  {Array.from(new Set(designAudit.results.map((item) => item.stage))).map((stage) => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>
              <div className="mt-3 max-h-64 space-y-3 overflow-y-auto">
                {designAudit.results
                  .filter((item) => item.status !== "MATCH" && (auditStage === "Todas" || item.stage === auditStage))
                  .sort((a, b) => {
                    const priority = { P0: 0, P1: 1, P2: 2 };
                    const status = { MISSING: 0, DIVERGENT: 1, PARTIAL: 2, NOT_OBSERVED: 3, REVIEW: 4, MATCH: 5 };
                    return priority[a.priority] - priority[b.priority] || status[a.status] - status[b.status];
                  })
                  .map((item) => (
                  <div key={item.id} className="border-t border-white/10 pt-2">
                    <p className="font-bold text-white">[{item.priority}] {item.status} · {item.stage} / {item.title}</p>
                    <p className="mt-1 text-white/80">Aprovado: {item.expected}</p>
                    <p className="text-white/65">Implementado: {item.observed}</p>
                    <p className="text-white/50">Fonte: {item.source}</p>
                    <p className="text-white/50">Ficheiro: {item.component}</p>
                    <p className="mt-1 text-white/85">Ação: {item.nextStep}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[10px] text-white/55">
                A presença no DOM não equivale à aprovação visual. O Hero aprovado é protegido.
                Auditar apenas o estado atual pode produzir NÃO OBSERVADO para elementos intencionalmente ocultos,
                como o Header na Intro. Use a auditoria completa para verificar todos os estados.
              </p>
            </div>
          )}
          {comparison && (
            <div className="rounded-lg border border-white/20 bg-white/5 p-3">
              <p className="font-semibold text-white">Comparação com o master e o Motion Spec</p>
              <p className="mt-1 text-white/75">
                Cobertura {comparison.coveragePercent}% · PASS {comparison.totals.PASS} ·
                FAIL {comparison.totals.FAIL} ·
                REVER {comparison.totals.REVIEW} ·
                NÃO OBSERVADO {comparison.totals.NOT_OBSERVED}
              </p>
              <div className="mt-3 max-h-56 space-y-3 overflow-y-auto">
                {comparison.checks.filter((check) => check.status !== "PASS").map((check) => (
                  <div key={check.key} className="border-t border-white/10 pt-2">
                    <p className="font-bold text-white">{check.status} · {check.section} / {check.category}</p>
                    <p className="mt-1 text-white/80">Esperado: {check.expected}</p>
                    <p className="text-white/65">Observado: {check.observed}</p>
                    <p className="text-white/50">Fonte: {check.source}</p>
                    <p className="mt-1 text-white/85">Ação: {check.nextStep}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[10px] text-white/55">
                PASS apenas para verificações técnicas; REVIEW não é aprovação visual.
              </p>
            </div>
          )}
          <p className="text-white/70">O relatório compara o desenho aprovado com o DOM. Os testes de Motion acrescentam o percurso temporal.</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={copyCompactSummary} className="rounded-lg bg-colus-orange px-3 py-2 font-bold text-colus-ink">
              {copied ? "Copiado" : "Copiar resumo curto"}
            </button>
            <button type="button" onClick={copyReport} className="rounded-lg border border-white/35 px-3 py-2">
              Copiar relatório completo
            </button>
            <button type="button" onClick={() => downloadReport("txt")} className="rounded-lg border border-white/35 px-3 py-2">
              Relatório .txt
            </button>
            <button type="button" onClick={() => downloadReport("json")} className="rounded-lg border border-white/35 px-3 py-2">
              Contrato + resultados .json
            </button>
            <button type="button" onClick={() => { setReport(""); setCurrent("Aguardando teste"); }} className="rounded-lg border border-white/35 px-3 py-2">
              Novo teste
            </button>
          </div>
          <p className="text-[10px] text-white/50">
            O resumo curto contém os totais e as pendências principais (máx. 2200 caracteres).
            Pode ser colado diretamente na conversa sem gerar um anexo.
            Exportação completa opcional · registo local · nenhum dado enviado automaticamente.
          </p>
        </div>
      )}
      {!running && (
        <div className="mt-4 border-t border-white/20 pt-3">
          <p className="font-semibold text-white">Checkpoints visuais · preparação</p>
          <p className="mt-1 text-[10px] text-white/60">
            Sem imagens de referência aprovadas: navegar não constitui aprovação visual.
          </p>
          <label htmlFor="colus-qa-checkpoint" className="mt-2 block text-[10px] text-white/70">
            Estado para comparar com o master
          </label>
          <select
            id="colus-qa-checkpoint"
            value={checkpointId}
            onChange={(event) => setCheckpointId(event.target.value)}
            className="mt-1 w-full rounded border border-white/30 bg-colus-ink px-2 py-2 text-white"
          >
            {colusCheckpointStages.map((stage) => (
              <optgroup key={stage.stageId} label={stage.title}>
                {colusVisualCheckpoints
                  .filter((item) => item.stageId === stage.stageId)
                  .map((item) => (
                    <option key={item.id} value={item.id}>{item.title}</option>
                  ))}
              </optgroup>
            ))}
          </select>
          {(() => {
            const selected = colusVisualCheckpoints.find((item) => item.id === checkpointId);
            if (!selected) return null;
            return (
              <div className="mt-2 space-y-1 text-[10px] text-white/70">
                <p><strong className="text-white">Esperado:</strong> {selected.expected}</p>
                <p>Fonte: {selected.source}</p>
                <p>Rever: {selected.review.join("; ")}</p>
                <p className="text-colus-orange">Estado: referência visual pendente de aprovação</p>
              </div>
            );
          })()}
          <button
            type="button"
            onClick={goToCheckpoint}
            className="mt-3 rounded-lg border border-colus-orange px-3 py-2 font-bold text-white"
          >
            Ir para checkpoint
          </button>
        </div>
      )}
      <p className="mt-3 text-[10px] leading-4 text-white/50">
        Compara estrutura e conteúdo com células do Draw.io e comportamento com Motion Spec. Revisão estética e de composição continua humana. Nunca modifica a landing.
      </p>
      </>)}
    </aside>
  );
}

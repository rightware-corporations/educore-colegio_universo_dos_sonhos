/**
 * RIGHTWARE Motion QA — pure comparison engine.
 * Framework-independent: no React, Framer Motion or browser APIs.
 * Expected values come from a versioned, project-specific contract.
 */
export type MotionQaStatus = "PASS" | "FAIL" | "REVIEW" | "NOT_OBSERVED";

export interface MotionQaVideo {
  source: string;
  ready: number;
  paused: boolean;
  error: number | null;
  visible: boolean;
  currentTime: number;
}

export interface MotionQaSample {
  ms: number;
  scrollY: number;
  sectionId: string;
  section: string;
  progress: number; // 0-100
  heightVh: number;
  sticky: string;
  headingVisible: boolean;
  imagesBroken: number;
  videos: MotionQaVideo[];
  sceneLayers: string; // "01:1.00", "02:0.75 | ..."
}

export interface MotionQaStage {
  id: string;
  label: string;
  source: string;
  desktopVh?: { min: number; preferred: number; max: number };
  stickyDesktop?: boolean;
  sceneWindows?: Array<{
    from: number;
    to: number;
    scene: string;
    title: string;
  }>;
  humanReview?: string[];
}

export interface MotionQaContract {
  id: string;
  version: string;
  sourceOfTruth: string[];
  desktopMinWidth: number;
  minimumCoveragePercent: number;
  stages: MotionQaStage[];
  extraHumanReview: Array<{ title: string; source: string }>;
}

export interface MotionQaCheck {
  key: string;
  section: string;
  category: "coverage" | "budget" | "sticky" | "media" | "scene" | "readability" | "editorial";
  status: MotionQaStatus;
  expected: string;
  observed: string;
  source: string;
  nextStep: string;
}

export interface MotionQaEvaluation {
  contractId: string;
  version: string;
  coveragePercent: number;
  visited: string[];
  checks: MotionQaCheck[];
  totals: Record<MotionQaStatus, number>;
}

export function evaluateMotionQa(
  samples: MotionQaSample[],
  contract: MotionQaContract,
  viewportWidth: number,
  totalScrollPx: number,
): MotionQaEvaluation {
  const add = (
    section: string,
    category: MotionQaCheck["category"],
    status: MotionQaStatus,
    expected: string,
    observed: string,
    source: string,
    nextStep: string,
  ) => checks.push({
    key: section + ":" + category + ":" + checks.length,
    section,
    category,
    status,
    expected,
    observed,
    source,
    nextStep,
  });

  const checks: MotionQaCheck[] = [];
  const scrollYs = samples.map((sample) => sample.scrollY);
  const delta = scrollYs.length
    ? Math.max(...scrollYs) - Math.min(...scrollYs)
    : 0;
  const coveragePercent = Math.min(100, Math.round(delta / Math.max(1, totalScrollPx) * 100));
  const visited = Array.from(new Set(samples.map((sample) => sample.sectionId))).filter(Boolean);
  const adequateCoverage = coveragePercent >= contract.minimumCoveragePercent && visited.length >= 3;

  add(
    "Global", "coverage",
    adequateCoverage ? "PASS" : "FAIL",
    "Percorrer >= " + contract.minimumCoveragePercent + "% da página e >= 3 secções",
    coveragePercent + "% de scroll · " + visited.length + " secções",
    "RIGHTWARE Motion QA / cobertura e validade da amostra",
    adequateCoverage ? "Prosseguir com os critérios específicos." : "Reexecutar o teste; o relatório não valida as secções não percorridas.",
  );

  const desktop = viewportWidth >= contract.desktopMinWidth;
  for (const stage of contract.stages) {
    const group = samples.filter((sample) => sample.sectionId === stage.id);
    const observed = group.length > 0;
    const label = stage.label;
    const source = stage.source;
    if (!observed) {
      add(label, "coverage", "NOT_OBSERVED",
        "Stage percorrido pelo teste", "Nenhuma amostra",
        source, "Verificar o anchor/selector e voltar a executar com scroll integral.");
      for (const note of stage.humanReview ?? []) {
        add(label, "editorial", "REVIEW", note, "Não observável automaticamente", source,
          "Comparar com o master em desktop e mobile.");
      }
      continue;
    }

    if (desktop && stage.desktopVh) {
      const vh = group.map((sample) => sample.heightVh).sort((a, b) => a - b);
      const actual = vh[Math.floor(vh.length / 2)];
      const budget = stage.desktopVh;
      const pass = actual >= budget.min && actual <= budget.max;
      add(label, "budget", pass ? "PASS" : "FAIL",
        budget.min + "–" + budget.max + "vh (preferido " + budget.preferred + "vh)",
        actual.toFixed(0) + "vh",
        source,
        pass ? "Dentro do intervalo definido." : "Rever altura do stage face ao Scroll Budget; não alterar sem validar o desenho.");
    }

    if (desktop && stage.stickyDesktop) {
      const isSticky = group.some((sample) => sample.sticky === "sticky");
      add(label, "sticky", isSticky ? "PASS" : "FAIL",
        "Sticky ativo durante o stage",
        Array.from(new Set(group.map((sample) => sample.sticky))).join(", "),
        source, isSticky ? "Comportamento CSS declarado." : "Inspecionar overflow de ancestrais e viewport sticky.");
    }

    const hasHeading = group.some((sample) =>
      sample.headingVisible && sample.progress >= 0 && sample.progress <= 85
    );
    add(label, "readability", hasHeading ? "PASS" : "REVIEW",
      "Pelo menos uma headline legível no percurso",
      hasHeading ? "Headline detetada no viewport" : "Não foi detetada headline visível nas amostras",
      source, hasHeading ? "Confirmar legibilidade visual e contraste." : "Inspecionar possível crop, opacidade ou anchor incorreto.");

    const brokenMax = Math.max(...group.map((sample) => sample.imagesBroken));
    const errored = group.flatMap((sample) => sample.videos).filter((video) => video.error !== null);
    add(label, "media", brokenMax === 0 && errored.length === 0 ? "PASS" : "FAIL",
      "Sem imagens partidas nem erro de media",
      brokenMax + " imagens partidas · " + errored.length + " amostras de vídeos com erro",
      source,
      brokenMax === 0 && errored.length === 0
        ? "Confirmar crop e conteúdo por revisão humana; ausência de erro não prova fidelidade."
        : "Corrigir URL, codec, asset ou fallback do media.");

    if (stage.sceneWindows?.length && desktop) {
      for (const windowRule of stage.sceneWindows) {
        // Avoid the boundary by a few percent: transitions can occur within a frame.
        const begin = windowRule.from + 3;
        const end = windowRule.to - 3;
        const points = group.filter((sample) => sample.progress >= begin && sample.progress <= end);
        const active = points.map((sample) => sample.sceneLayers.split("|")
          .map((entry) => entry.trim().split(":")[0])
          .filter(Boolean));
        const withCorrect = active.filter((arr) => arr.length === 1 && arr[0] === windowRule.scene).length;
        const observedScene = Array.from(new Set(active.flat())).join(", ") || "sem cena DOM";
        const status: MotionQaStatus = points.length < 2
          ? "NOT_OBSERVED"
          : withCorrect / points.length >= 0.8 ? "PASS" : "FAIL";
        add(label, "scene", status,
          windowRule.title + " (" + windowRule.scene + ") · " + windowRule.from + "–" + windowRule.to + "% · uma cena ativa",
          points.length + " amostras · cenas DOM: " + observedScene + " · correspondência: " + withCorrect + "/" + points.length,
          source,
          status === "FAIL" ? "Verificar sincronização do scroll, media window e caption." :
          status === "NOT_OBSERVED" ? "Repetir com scroll lento nesta cena." :
          "Confirmar a media e a transformação visual com o master.");
      }
    }

    for (const note of stage.humanReview ?? []) {
      add(label, "editorial", "REVIEW", note,
        "Requer inspeção visual e aprovação humana", source,
        "Comparar com os frames do wireframe. Não converter automaticamente em PASS.");
    }
  }

  for (const manual of contract.extraHumanReview) {
    add("Global", "editorial", "REVIEW", manual.title,
      "Não mensurável exclusivamente com DOM/scroll", manual.source,
      "Validar visualmente com o desenho aprovado e revisão de motion.");
  }

  const totals: Record<MotionQaStatus, number> = {
    PASS: 0, FAIL: 0, REVIEW: 0, NOT_OBSERVED: 0,
  };
  checks.forEach((check) => { totals[check.status] += 1; });
  return { contractId: contract.id, version: contract.version, coveragePercent, visited, checks, totals };
}

export function toMotionQaComparisonText(evaluation: MotionQaEvaluation): string {
  const lines = [
    "RIGHTWARE CONTRACT MOTION QA",
    "Contrato: " + evaluation.contractId + " @ " + evaluation.version,
    "Cobertura: " + evaluation.coveragePercent + "%",
    "Secções: " + evaluation.visited.join(" → "),
    "TOTAL: PASS " + evaluation.totals.PASS +
      " · FAIL " + evaluation.totals.FAIL +
      " · REVIEW " + evaluation.totals.REVIEW +
      " · NOT_OBSERVED " + evaluation.totals.NOT_OBSERVED,
    "",
  ];
  for (const item of evaluation.checks) {
    lines.push("[" + item.status + "] " + item.section + " / " + item.category);
    lines.push("  Esperado: " + item.expected);
    lines.push("  Observado: " + item.observed);
    lines.push("  Fonte: " + item.source);
    lines.push("  Ação: " + item.nextStep);
    lines.push("");
  }
  return lines.join("\n");
}

/**
 * RIGHTWARE visual comparison checkpoint planner.
 * Does not generate screenshots or claim visual equivalence.
 * Checkpoints are inspection destinations pending an approved pixel baseline.
 */
export interface VisualCheckpointStage {
  stageId: string;
  title: string;
  source: string;
  expected: string;
  percentages: number[];
  review: string[];
}

export interface VisualCheckpoint {
  id: string;
  stageId: string;
  title: string;
  progress: number;
  source: string;
  expected: string;
  review: string[];
  baselineStatus: "PENDING_APPROVED_REFERENCE";
}

export function compileVisualCheckpoints(stages: VisualCheckpointStage[]): VisualCheckpoint[] {
  return stages.flatMap((stage) => {
    const steps = Array.from(new Set(stage.percentages)).sort((a, b) => a - b);
    if (!steps.length || steps.some((p) => !Number.isFinite(p) || p < 0 || p > 100)) {
      throw new Error("Invalid checkpoint progress for " + stage.stageId);
    }
    return steps.map((progress) => ({
      id: stage.stageId + "@" + progress,
      stageId: stage.stageId,
      title: stage.title + " · " + progress + "%",
      progress,
      source: stage.source,
      expected: stage.expected,
      review: stage.review,
      baselineStatus: "PENDING_APPROVED_REFERENCE" as const,
    }));
  });
}

/**
 * Compute a deterministic scroll destination for a stage with a sticky scroll
 * range. For a natural-flow stage shorter than the viewport there are no
 * distinct 0/25/50/75/100 scrub states; target the centre instead.
 */
export function checkpointScrollY(
  stageDocumentTop: number,
  stageHeight: number,
  viewportHeight: number,
  progress: number,
  documentMaxScroll: number,
): number {
  const height = Math.max(0, stageHeight);
  const viewport = Math.max(1, viewportHeight);
  const range = Math.max(0, height - viewport);
  const position = range > 0
    ? stageDocumentTop + range * Math.min(100, Math.max(0, progress)) / 100
    : stageDocumentTop - (viewport - height) / 2;
  return Math.round(Math.min(Math.max(0, position), Math.max(0, documentMaxScroll)));
}

export function checkpointsAsText(checkpoints: VisualCheckpoint[]): string {
  const lines = [
    "RIGHTWARE VISUAL CHECKPOINT PLAN — REVISÃO HUMANA PENDENTE",
    "Estes pontos não são screenshots nem pixel-diffs validados.",
    "Para cada ponto: guardar referência master aprovada, viewport e screenshot browser do mesmo estado.",
    "",
  ];
  checkpoints.forEach((c) => {
    lines.push("[REVIEW] " + c.title + " / " + c.id);
    lines.push("  Referência: " + c.source);
    lines.push("  Esperado: " + c.expected);
    lines.push("  Inspecionar: " + c.review.join("; "));
  });
  return lines.join("\n");
}

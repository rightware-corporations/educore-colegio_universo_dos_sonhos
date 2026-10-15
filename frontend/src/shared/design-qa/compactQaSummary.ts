/**
 * RIGHTWARE compact diagnostic for direct chat paste.
 *
 * Full exports remain available, but never require users to upload giant
 * textual reports for normal issue triage. All output is deterministic and
 * includes explicit truncation counts.
 */
import type { DesignEvaluation, DesignResult } from "./designFidelity";
import type { MotionQaEvaluation, MotionQaCheck } from "../motion-qa/contractEvaluator";

const SHORT_LIMIT = 2200;
const singleLine = (text: string): string => text.replace(/\s+/g, " ").trim();
const brief = (text: string, max = 100): string => {
  const value = singleLine(text);
  return value.length > max ? value.slice(0, max - 1) + "…" : value;
};

function priority(result: DesignResult): number {
  return ({ P0: 0, P1: 1, P2: 2 })[result.priority];
}
const designOrder: Record<DesignResult["status"], number> = {
  MISSING: 0, DIVERGENT: 1, PARTIAL: 2, NOT_OBSERVED: 3, REVIEW: 4, MATCH: 5,
};

export function compactQaSummary(
  design: DesignEvaluation | null,
  motion: MotionQaEvaluation | null,
  maxLength = SHORT_LIMIT,
): string {
  const max = Math.max(600, maxLength);
  const header = [
    "COLUS / RIGHTWARE QA — RESUMO CURTO",
    "Copiado diretamente do painel; sem anexos. MATCH/PASS técnico não significa aprovação visual.",
  ];

  const findings: string[] = [];
  if (design) {
    header.push(
      "DESIGN: MATCH " + design.totals.MATCH +
      " | MISSING " + design.totals.MISSING +
      " | PARTIAL " + design.totals.PARTIAL +
      " | DIVERGENT " + design.totals.DIVERGENT +
      " | REVIEW " + design.totals.REVIEW +
      " | NOT_OBSERVED " + design.totals.NOT_OBSERVED
    );
    const actionable = design.results
      .filter((entry) => ["MISSING", "PARTIAL", "DIVERGENT", "NOT_OBSERVED"].includes(entry.status))
      .sort((a, b) => designOrder[a.status] - designOrder[b.status] || priority(a) - priority(b));
    actionable.forEach((entry) => findings.push(
      "D " + entry.status + " [" + entry.priority + "] " + brief(entry.stage, 28) +
      "/" + brief(entry.id, 42) + ": " + brief(entry.observed, 120)
    ));
  } else {
    header.push("DESIGN: não executado.");
  }

  if (motion) {
    header.push(
      "MOTION: PASS " + motion.totals.PASS +
      " | FAIL " + motion.totals.FAIL +
      " | REVIEW " + motion.totals.REVIEW +
      " | NOT_OBSERVED " + motion.totals.NOT_OBSERVED +
      " | cobertura " + motion.coveragePercent + "%" +
      (motion.globalMeasuredVh === undefined ? "" : " | narrativa " + motion.globalMeasuredVh + "vh")
    );
    const faulty = motion.checks.filter((item) => item.status === "FAIL" || item.status === "NOT_OBSERVED");
    faulty.forEach((entry) => findings.push(
      "M " + entry.status + " " + brief(entry.section, 30) +
      "/" + entry.category + ": " + brief(entry.observed, 115)
    ));
    const rhythm = motion.checks.filter((item) =>
      item.status === "REVIEW" && item.category === "budget"
    );
    rhythm.forEach((entry) => findings.push(
      "R RITMO " + brief(entry.section, 30) + ": " + brief(entry.observed, 70)
    ));
  } else {
    header.push("MOTION: não executado.");
  }

  const intro = header.join("\n") + "\nPENDÊNCIAS:\n";
  let result = intro;
  let included = 0;
  for (const line of findings) {
    const next = line + "\n";
    // Reserve room for an explicit count of entries omitted.
    if (result.length + next.length + 90 > max) break;
    result += next;
    included++;
  }
  const omitted = findings.length - included;
  if (!findings.length) result += "Sem pendências instrumentais detetadas (revisão visual continua necessária).\n";
  if (omitted > 0) result += "… " + omitted + " pendência(s) omitida(s) por limite de tamanho; relatório completo no painel.\n";
  return result.slice(0, max);
}

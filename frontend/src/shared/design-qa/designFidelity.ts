/**
 * RIGHTWARE Design Fidelity QA — pure, framework-independent comparison.
 * Expected values are transcribed from an approved master and never inferred
 * from the rendered application being assessed.
 */
export type DesignStatus = "MATCH" | "MISSING" | "PARTIAL" | "DIVERGENT" | "REVIEW" | "NOT_OBSERVED";
export type DesignRuleType = "presence" | "count" | "text" | "asset" | "sequence" | "review";
export type DesignViewport = "all" | "desktop" | "mobile";

export interface DesignRule {
  id: string;
  stage: string;
  title: string;
  expected: string;
  source: string; // approved master cell + specialized document
  component: string;
  type: DesignRuleType;
  selector?: string;
  minimum?: number;
  expectedText?: string;
  expectedAsset?: string;
  ids?: string[];
  viewport?: DesignViewport;
  /** A feature may only be observable when this context exists (e.g. the Hero header). */
  observeWhenSelector?: string;
  priority: "P0" | "P1" | "P2";
}

export interface DesignContract {
  id: string;
  version: string;
  sources: string[];
  rules: DesignRule[];
}

export interface DesignEvidence {
  ruleId: string;
  matches: number;
  texts: string[];
  assets: string[];
  foundOrder: string[];
  unavailable?: boolean;
  unavailableReason?: string;
}

export interface DesignResult {
  id: string;
  stage: string;
  title: string;
  expected: string;
  observed: string;
  source: string;
  component: string;
  priority: DesignRule["priority"];
  status: DesignStatus;
  nextStep: string;
}

export interface DesignEvaluation {
  contractId: string;
  version: string;
  results: DesignResult[];
  totals: Record<DesignStatus, number>;
}

function normalized(text: string): string {
  return text.normalize("NFKC").toLocaleLowerCase("pt").replace(/\s+/g, " ").trim();
}

export function evaluateDesignFidelity(
  contract: DesignContract,
  evidence: DesignEvidence[],
  viewport: DesignViewport,
): DesignEvaluation {
  const lookup = new Map(evidence.map((entry) => [entry.ruleId, entry]));
  const results: DesignResult[] = contract.rules.map((rule) => {
    const applicable = !rule.viewport || rule.viewport === "all" || rule.viewport === viewport;
    const found = lookup.get(rule.id);
    let status: DesignStatus = "NOT_OBSERVED";
    let observed = "Não recolhido";
    let nextStep = "Executar a recolha de evidências no viewport aplicável.";

    if (rule.type === "review") {
      status = "REVIEW";
      observed = "Requer comparação visual com o estado do master.";
      nextStep = "Conferir geometria, conteúdo, crop e continuidade no Draw.io; aprovar manualmente.";
    } else if (!applicable) {
      observed = "Regra destinada ao viewport " + rule.viewport;
      nextStep = "Executar o teste no breakpoint apropriado.";
    } else if (found?.unavailable || !found) {
      observed = found?.unavailableReason ?? "Evidência não recolhida no estado atual do navegador.";
      nextStep = rule.observeWhenSelector
        ? "Avaliar a secção que apresenta este elemento; uma ausência temporária não significa que falta no projeto."
        : "Rever seletor/instrumentação e repetir o teste; não declarar aprovação.";
    } else if (rule.type === "sequence") {
      const expected = rule.ids ?? [];
      const actual = found.foundOrder;
      observed = actual.length ? actual.join(" → ") : "Nenhuma secção localizada";
      const matched = expected.every((value, index) => actual[index] === value);
      status = !actual.length ? "MISSING" : matched ? "MATCH" : "DIVERGENT";
      nextStep = matched ? "Sequência DOM conforme master." : "Corrigir ou rever a sequência da narrativa em LandingFoundationPage.";
    } else if (found.matches === 0) {
      status = "MISSING";
      observed = "Elemento não encontrado no DOM.";
      nextStep = "Implementar o elemento aprovado ou documentar uma exceção formal.";
    } else if (rule.type === "presence") {
      status = "MATCH";
      observed = found.matches + " elemento(s) localizados";
      nextStep = "Presença estrutural conforme; posição e aparência dependem de revisão visual.";
    } else if (rule.type === "count") {
      const minimum = rule.minimum ?? 1;
      status = found.matches >= minimum ? "MATCH" : "PARTIAL";
      observed = found.matches + " de pelo menos " + minimum + " elementos";
      nextStep = status === "MATCH" ? "Quantidade estrutural conforme." : "Completar componentes previstos no master.";
    } else if (rule.type === "text") {
      const actual = normalized(found.texts.join(" "));
      const expected = normalized(rule.expectedText ?? "");
      const ok = !!expected && actual.includes(expected);
      status = ok ? "MATCH" : "DIVERGENT";
      observed = actual.slice(0, 190) || "Elemento encontrado sem texto";
      nextStep = ok ? "Texto detectado; confirmar fidelidade editorial." : "Rever copy aprovado ou legibilidade do elemento.";
    } else if (rule.type === "asset") {
      const pattern = rule.expectedAsset ?? "";
      const matches = found.assets.some((asset) => asset.includes(pattern));
      status = matches && pattern ? "MATCH" : found.assets.length ? "DIVERGENT" : "PARTIAL";
      observed = found.assets.join(" · ") || "Sem source de media no elemento";
      nextStep = status === "MATCH"
        ? "Referência de asset encontrada; validar carregamento e enquadramento."
        : "Consultar Asset Gate antes de substituir media; não alterar o Hero aprovado.";
    }

    return {
      id: rule.id, stage: rule.stage, title: rule.title,
      expected: rule.expected, observed, source: rule.source,
      component: rule.component, priority: rule.priority, status, nextStep,
    };
  });

  const totals: Record<DesignStatus, number> = {
    MATCH: 0, MISSING: 0, PARTIAL: 0, DIVERGENT: 0, REVIEW: 0, NOT_OBSERVED: 0,
  };
  results.forEach((item) => { totals[item.status] += 1; });
  return { contractId: contract.id, version: contract.version, results, totals };
}

export function designFidelityAsText(evaluation: DesignEvaluation): string {
  const output = [
    "RIGHTWARE DESIGN FIDELITY QA",
    "Contrato: " + evaluation.contractId + " @ " + evaluation.version,
    "MATCH " + evaluation.totals.MATCH +
      " · MISSING " + evaluation.totals.MISSING +
      " · PARTIAL " + evaluation.totals.PARTIAL +
      " · DIVERGENT " + evaluation.totals.DIVERGENT +
      " · REVIEW " + evaluation.totals.REVIEW +
      " · NOT_OBSERVED " + evaluation.totals.NOT_OBSERVED,
    "Notas: MATCH refere apenas a regra instrumental; não constitui aprovação visual.",
    "",
  ];
  for (const item of evaluation.results) {
    output.push("[" + item.status + "][" + item.priority + "] " + item.stage + " / " + item.title);
    output.push("  Esperado: " + item.expected);
    output.push("  Observado: " + item.observed);
    output.push("  Fonte: " + item.source);
    output.push("  Componente: " + item.component);
    output.push("  Próxima ação: " + item.nextStep, "");
  }
  return output.join("\n");
}

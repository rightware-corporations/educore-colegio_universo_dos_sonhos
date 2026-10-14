/**
 * Browser observation adapter for Design Fidelity QA.
 * This file reads DOM evidence only; it never changes application layout,
 * computed styles, media playback or Framer Motion state.
 */
import type { DesignContract, DesignEvidence } from "./designFidelity";

function renderedByCss(node: Element): boolean {
  let element: Element | null = node;
  while (element) {
    const style = window.getComputedStyle(element);
    if (style.display === "none" || style.visibility === "hidden" || style.visibility === "collapse") {
      return false;
    }
    element = element.parentElement;
  }
  return true;
}

function sources(node: Element): string[] {
  const elements = [node, ...Array.from(node.querySelectorAll("img, video, source, picture"))];
  const paths: string[] = [];
  for (const element of elements) {
    const currentSrc = element instanceof HTMLImageElement || element instanceof HTMLVideoElement
      ? element.currentSrc
      : null;
    const values = [
      element.getAttribute("src"),
      element.getAttribute("poster"),
      element.getAttribute("srcset"),
      currentSrc,
    ];
    values.filter((v): v is string => !!v).forEach((value) => paths.push(value));
  }
  return Array.from(new Set(paths));
}

export function collectDesignEvidence(
  contract: DesignContract,
  doc: Document = document,
): DesignEvidence[] {
  return contract.rules.filter((rule) => rule.type !== "review").map((rule) => {
    if (rule.type === "sequence") {
      const targetIds = new Set(rule.ids ?? []);
      const foundOrder = Array.from(doc.querySelectorAll("[id]"))
        .map((item) => item.id)
        .filter((id) => targetIds.has(id));
      return { ruleId: rule.id, matches: foundOrder.length, texts: [], assets: [], foundOrder };
    }
    if (!rule.selector) {
      return { ruleId: rule.id, matches: 0, texts: [], assets: [], foundOrder: [], unavailable: true,
        unavailableReason: "Regra sem seletor DOM definido." };
    }
    if (rule.observeWhenSelector && !doc.querySelector(rule.observeWhenSelector)) {
      return {
        ruleId: rule.id, matches: 0, texts: [], assets: [], foundOrder: [],
        unavailable: true,
        unavailableReason: "O contexto '" + rule.observeWhenSelector + "' ainda não está montado nesta fase do scroll.",
      };
    }
    try {
      const elements = Array.from(doc.querySelectorAll(rule.selector)).filter(renderedByCss);
      return {
        ruleId: rule.id,
        matches: elements.length,
        texts: elements.map((element) => (element.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 2800)),
        assets: Array.from(new Set(elements.flatMap(sources))),
        foundOrder: [],
      };
    } catch {
      return { ruleId: rule.id, matches: 0, texts: [], assets: [], foundOrder: [], unavailable: true };
    }
  });
}


/**
 * Combines sequential page observations. A temporary unmounted header must not
 * be classified as "MISSING" if it later appears when the Intro has ended.
 * For a structural rule, keep the strongest available observed evidence.
 */
export function mergeDesignEvidence(snapshots: DesignEvidence[][]): DesignEvidence[] {
  const grouped = new Map<string, DesignEvidence[]>();
  for (const snapshot of snapshots) {
    for (const item of snapshot) {
      const items = grouped.get(item.ruleId) ?? [];
      items.push(item);
      grouped.set(item.ruleId, items);
    }
  }

  return Array.from(grouped, ([ruleId, items]) => {
    const available = items.filter((item) => !item.unavailable);
    if (available.length === 0) {
      return { ...items[items.length - 1], ruleId, unavailable: true };
    }
    const texts = [...new Set(available.flatMap((item) => item.texts))];
    const assets = [...new Set(available.flatMap((item) => item.assets))];
    const maxOrder = available.reduce((best, item) =>
      item.foundOrder.length > best.length ? item.foundOrder : best, [] as string[]);
    return {
      ruleId,
      matches: Math.max(...available.map((item) => item.matches)),
      texts,
      assets,
      foundOrder: maxOrder,
    };
  });
}

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
    const media = element as HTMLImageElement | HTMLVideoElement | HTMLSourceElement;
    const values = [
      element.getAttribute("src"),
      element.getAttribute("poster"),
      element.getAttribute("srcset"),
      media.currentSrc ?? null,
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
      return { ruleId: rule.id, matches: 0, texts: [], assets: [], foundOrder: [], unavailable: true };
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

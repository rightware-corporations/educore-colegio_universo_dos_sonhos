import type { MotionQaContract } from "@/shared/motion-qa/contractEvaluator";

/**
 * COLUS baseline: transcription of design decisions, not a snapshot of current code.
 * Never silently amend these values to make a failing implementation appear correct.
 * Master V0.18 (blob 73bb21915fd8537f461573fdecba7397162ae6fd),
 * Motion Spec V1.0, Scroll Budget, Motion Hierarchy and Asset Gate V0.3.
 */
const motion = "docs/colus/design/landing/motion-spec-tecnico-colus.md";
const budget = "docs/colus/design/landing/scroll-budget-colus.md";
const master = "docs/colus/design/landing/landing-colus-master.drawio";
const hierarchy = "docs/colus/design/landing/motion-hierarchy-colus.md";

export const colusMotionQaContract: MotionQaContract = {
  id: "COLUS/LANDING/MASTER-V0.18",
  version: "1.0.0",
  sourceOfTruth: [
    master,
    motion,
    budget,
    hierarchy,
    "docs/colus/design/landing/asset-final-selection-colus-v03.md",
  ],
  desktopMinWidth: 1024,
  minimumCoveragePercent: 70,
  stages: [
    {
      id: "top", label: "Intro / Hero", source: master + " · intro_90 / hero_98 · " + motion + " §5",
      desktopVh: { min: 180, preferred: 200, max: 220 },
      stickyDesktop: true,
      humanReview: [
        "Mark → livro → abertura → media Hero → texto, com pausa legível e logo oficial preservado.",
        "O mesmo vídeo aprovado permanece visível sem interrupção ou duplicação de Hero.",
      ],
    },
    {
      id: "o-colegio", label: "Manifesto", source: master + " · hero_131 · " + motion + " §6",
      desktopVh: { min: 150, preferred: 170, max: 180 },
      humanReview: ["Handoff Hero → Manifesto sem salto de media; transição para Warm Paper e node."],
    },
    {
      id: "experiencia", label: "Aprender", source: master + " · learn_168 / learn_198 · " + motion + " §7 · " + budget,
      desktopVh: { min: 170, preferred: 185, max: 195 },
      stickyDesktop: true,
      humanReview: [
        "Descobrir → Criar; Learning Trail acompanha a media e a legenda 'Aprender fora da sala' nunca fica tapada.",
      ],
    },
    {
      id: "futuro", label: "Futuro & Tecnologia",
      source: master + " · future_21 / future_56 / future_104 · " + motion + " §8",
      desktopVh: { min: 210, preferred: 230, max: 240 },
      stickyDesktop: true,
      sceneWindows: [
        { from: 10, to: 30, scene: "01", title: "TIC", mediaMustInclude: "COLUS-FUTURO-TIC-001" },
        { from: 30, to: 48, scene: "02", title: "Engenharia" },
        { from: 48, to: 70, scene: "03", title: "Ciência", mediaMustInclude: "COLUS-FUTURO-CIENCIA-VID-001" },
        { from: 70, to: 88, scene: "04", title: "Segurança Digital", mediaMustInclude: "COLUS-FUTURO-TIC-003" },
      ],
      humanReview: [
        "Um único campo/Scene Window; media ocupa a janela completa, sem mock persistente sobre rostos.",
        "Engenharia é device-led no Motion Spec; qualquer adaptação fotográfica requer decisão de design explícita.",
        "Ciência deve ter vídeo ativo com poster fallback: poster estático temporário é desvio conhecido e não aprovação final.",
        "Signal Field + nodes devem progredir; a janela entrega Story Marker à Vida COLUS.",
      ],
    },
    {
      id: "vida-colus", label: "Vida COLUS", source: motion + " §9 · " + budget + " §3",
      desktopVh: { min: 140, preferred: 155, max: 165 },
      humanReview: ["Living Reel natural: máximo dois media visíveis, sem autoplay indevido, story marker conduz a Pertencer."],
    },
    {
      id: "comunidade", label: "Pertencer", source: master + " · belong_9127–9136 / belong_9165 · " + motion + " §10",
      desktopVh: { min: 115, preferred: 130, max: 140 },
      humanReview: [
        "Community Ring rico mas deliberadamente aberto, com marcador e nodes; sem órbita permanente.",
        "Rostos completos no crop editorial; Acompanhar → Participar → Crescer juntos; arco abre e entrega Rise Axis.",
      ],
    },
    {
      id: "transformar", label: "Transformar", source: master + " · transform_9376 · " + motion + " §11",
      desktopVh: { min: 150, preferred: 165, max: 175 },
      stickyDesktop: true,
      humanReview: ["Expressar → Construir → Avançar; Rise Axis termina como Horizon Node, sem um único painel dominante."],
    },
    {
      id: "vozes-colus", label: "Vozes COLUS", source: master + " · voices_9555 · " + motion + " §12",
      desktopVh: { min: 100, preferred: 100, max: 160 },
      humanReview: ["Voice in Focus; não inventar citações de alunos/famílias. Voz autorizada ou placeholder explicitamente editorial."],
    },
    {
      id: "contactos", label: "Convite Final", source: master + " · invite_9758 · " + motion + " §13",
      desktopVh: { min: 90, preferred: 95, max: 100 },
      humanReview: ["Node → Halo → marca → headline → CTA → contacto; Footer separado e sem coreografia de entrada."],
    },
  ],
  extraHumanReview: [
    {
      title: "Fast wheel/trackpad, scroll para cima e anchors não podem criar estado inválido.",
      source: motion + " §23 · " + budget + " §9–10",
    },
    {
      title: "Mobile e tablet seguem composição própria, sem sticky longo nem perda de texto.",
      source: motion + " §16–17 · " + budget + " §5–6",
    },
    {
      title: "Reduced Motion: Hero final direto, media poster, paths finais e conteúdo completo.",
      source: motion + " §18",
    },
    {
      title: "Máximo um vídeo grande ativo, pausa fora de viewport e fallbacks funcionais.",
      source: motion + " §19 / §22",
    },
    {
      title: "Fidelidade visual final requer avaliação humana do ritmo, crop, máscara e handoffs.",
      source: hierarchy + " §5 · " + master,
    },
  ],
};

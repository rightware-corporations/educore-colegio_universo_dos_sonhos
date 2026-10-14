import {
  compileVisualCheckpoints,
  type VisualCheckpointStage,
} from "@/shared/design-qa/visualCheckpoints";

const master = "docs/colus/design/landing/landing-colus-master.drawio";
const motion = "docs/colus/design/landing/motion-spec-tecnico-colus.md";
const budget = "docs/colus/design/landing/scroll-budget-colus.md";

/**
 * Inspection destinations derived from the approved design documents.
 * The percentage is a place to inspect, NOT an assertion about a precise
 * animation state unless the Motion Spec explicitly defines that boundary.
 *
 * The Hero / Intro and their original video/edit are protected.
 */
export const colusCheckpointStages: VisualCheckpointStage[] = [
  {
    stageId: "top", title: "Intro Morph / Hero protegido",
    source: master + " · intro_90 / hero_98; " + motion + " §5",
    expected: "Marca oficial → abertura → janela orgânica com o vídeo COLUS original e headline legível.",
    percentages: [0, 25, 50, 75, 100],
    review: ["Preservar vídeo COLUS-HERO-VID-001-SPORT-DAY.mp4 e a edição aprovada", "Geometria da máscara e continuidade", "Sem flash/cópia concorrente no handoff"],
  },
  {
    stageId: "hero", title: "Hero estável protegido",
    source: master + " · hero_98 / hero_103–108",
    expected: "Headline à esquerda, vídeo original na forma orgânica à direita e CTA da visita.",
    percentages: [0, 50, 100],
    review: ["Composição e crop aprovados", "Vídeo original a reproduzir", "Não substituir nem reeditar"],
  },
  {
    stageId: "o-colegio", title: "Manifesto",
    source: master + " · hero_123 / hero_131; " + motion + " §6",
    expected: "Handoff Hero → Manifesto → Warm Paper com node de continuidade.",
    percentages: [0, 25, 50, 75, 100],
    review: ["Headline completa", "Transição de fundo", "Continuidade do node e media"],
  },
  {
    stageId: "experiencia", title: "Aprender em Movimento",
    source: master + " · learn_141–171; " + motion + " §7",
    expected: "Descobrir → Criar; Learning Trail e legenda 'Aprender fora da sala' legíveis.",
    percentages: [0, 25, 50, 75, 100],
    review: ["Imagem secundária não tapa a legenda", "Troca real das cenas", "Sem colisão de textos ou imagens"],
  },
  {
    stageId: "futuro", title: "Futuro & Tecnologia",
    source: master + " · future_21 / future_56; " + motion + " §8",
    expected: "Uma única Scene Window, cenas TIC → Engenharia → Ciência → Segurança Digital e Signal Field funcional.",
    percentages: [0, 20, 40, 60, 80, 100],
    review: ["20% TIC / 40% Engenharia / 60% Ciência / 80% Segurança Digital", "Asset certo e orientação correta", "Node percorre Signal Field; sem mock fixo sobre pessoas"],
  },
  {
    stageId: "vida-colus", title: "Vida COLUS",
    source: master + " · life_18–52; " + motion + " §9",
    expected: "Fotoensaio editorial de media dominante e apoio, com Story Marker.",
    percentages: [0, 25, 50, 75, 100],
    review: ["Ritmo natural (não presumir sticky)", "Media e legendas completas", "Story Marker conduz a Pertencer"],
  },
  {
    stageId: "comunidade", title: "Pertencer",
    source: master + " · belong_9127–9136 / belong_9165; " + motion + " §10",
    expected: "Community Ring aberto, nós e três momentos Acompanhar, Participar e Crescer juntos.",
    percentages: [0, 25, 50, 75, 100],
    review: ["Ring rico e sem clipping", "Rostos corretamente enquadrados", "Saída em direção ao Rise Axis"],
  },
  {
    stageId: "transformar", title: "Transformar",
    source: master + " · transform_9326–9335; " + motion + " §11",
    expected: "Expressar → Construir → Avançar com Rise Axis e Horizon Node.",
    percentages: [0, 25, 50, 75, 100],
    review: ["Três momentos distinguíveis", "Ritmo de leitura", "Sem um único painel persistente"],
  },
  {
    stageId: "vozes-colus", title: "Vozes COLUS",
    source: master + " · voices_9509–9555; " + motion + " §12",
    expected: "Voice in Focus; testemunhos reais apenas com autorização ou placeholder editorial explícito.",
    percentages: [0, 50, 100],
    review: ["Densidade editorial", "Sem depoimentos inventados", "Node acompanha a linha"],
  },
  {
    stageId: "contactos", title: "Convite Final",
    source: master + " · invite_9724–9764; " + motion + " §13",
    expected: "Node → halo → símbolo oficial COLUS → convite e CTA; Footer independente.",
    percentages: [0, 50, 100],
    review: ["Marca oficial sem alteração", "CTA legível", "Footer não herda animação de entrada"],
  },
];

export const colusVisualCheckpoints = compileVisualCheckpoints(colusCheckpointStages);

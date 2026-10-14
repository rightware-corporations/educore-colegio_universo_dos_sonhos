import type { DesignContract, DesignRule } from "@/shared/design-qa/designFidelity";

const master = "docs/colus/design/landing/landing-colus-master.drawio";
const motion = "docs/colus/design/landing/motion-spec-tecnico-colus.md";
const consolidated = "docs/colus/design/landing/master-high-fidelity-consolidation-colus.md";
const assets = "docs/colus/design/landing/asset-final-selection-colus-v03.md";

const source = (cells: string, extra = "") =>
  master + " · células " + cells + (extra ? " · " + extra : "");

const rule = (item: DesignRule): DesignRule => item;

export const colusDesignQaContract: DesignContract = {
  id: "COLUS/DESIGN-FIDELITY/MASTER-V0.18",
  version: "1.0.0",
  sources: [master, consolidated, motion, assets],
  rules: [
    rule({
      id: "NARRATIVE-ORDER", stage: "Global", title: "Ordem da narrativa",
      expected: "Intro → Hero → Manifesto → Aprender → Futuro → Vida → Pertencer → Transformar → Vozes → Convite",
      source: source("master_9005", consolidated + " §2"), component: "LandingFoundationPage.tsx",
      type: "sequence", ids: ["top", "hero", "o-colegio", "experiencia", "futuro", "vida-colus",
        "comunidade", "transformar", "vozes-colus", "contactos"], priority: "P0",
    }),
    rule({
      id: "BRAND-LOGO", stage: "Hero", title: "Logótipo COLUS oficial",
      expected: "Logo institucional raster, não redesenhado",
      source: source("hero_101–102", consolidated + " §6"), component: "LandingHeader.tsx / ColusOfficialLogo.tsx",
      type: "asset", selector: "header img", observeWhenSelector: "header",
      expectedAsset: "COLUS-BRAND-LOGO-RASTER-001.jpg", priority: "P0",
    }),
    rule({
      id: "HERO-HEADLINE", stage: "Hero", title: "Headline aprovada",
      expected: "Juntos Tornamos Sonhos Em Realidade",
      source: source("hero_103–104", consolidated + " §6"), component: "IntroHeroSection.tsx",
      type: "text", selector: "#hero h1, #top h1",
      expectedText: "Juntos Tornamos", priority: "P0",
    }),
    rule({
      id: "HERO-PRIMARY-VIDEO", stage: "Hero", title: "Vídeo aprovado do Hero — PROTEGIDO",
      expected: "Vídeo original COLUS-HERO-VID-001-SPORT-DAY.mp4 preservado no Hero",
      source: source("hero_108", assets), component: "IntroHeroSection.tsx / LandingMedia.tsx",
      type: "asset", selector: "#top video, #hero video",
      expectedAsset: "COLUS-HERO-VID-001-SPORT-DAY.mp4", priority: "P0",
    }),
    rule({
      id: "HERO-CTA-VISIT", stage: "Hero", title: "CTA de visita",
      expected: "Marcar uma visita → #contactos",
      source: consolidated + " §7", component: "IntroHeroSection.tsx",
      type: "presence", selector: '#top a[href="#contactos"], #hero a[href="#contactos"]', priority: "P0",
    }),
    rule({
      id: "HERO-MORPH", stage: "Hero", title: "Forma, edição e continuidade aprovadas — PROTEGIDAS",
      expected: "Morph do livro para media orgânica, vídeo original, headline à esquerda; não refazer sem autorização",
      source: source("intro_90 / hero_98", motion + " §5–6"),
      component: "IntroHeroSection.tsx",
      type: "review", priority: "P0",
    }),
    rule({
      id: "MANIFESTO-TITLE", stage: "Manifesto", title: "Headline editorial",
      expected: "Aprender é descobrir o que somos capazes de transformar.",
      source: source("hero_123"), component: "ManifestoSection.tsx",
      type: "text", selector: "#o-colegio",
      expectedText: "somos capazes de transformar", priority: "P1",
    }),
    rule({
      id: "MANIFESTO-HANDOFF", stage: "Manifesto", title: "Handoff narrativo Hero → Manifesto",
      expected: "Handoff com media, node residual e transição para Warm Paper",
      source: source("hero_131", motion + " §6"), component: "ManifestoSection.tsx",
      type: "review", priority: "P1",
    }),
    rule({
      id: "LEARN-DISCOVER", stage: "Aprender", title: "Cena 01 Descobrir",
      expected: "Cena Descobrir com aprendizagem prática",
      source: source("learn_141–149"), component: "AprenderSection.tsx",
      type: "text", selector: "#experiencia", expectedText: "descobrir", priority: "P0",
    }),
    rule({
      id: "LEARN-CREATE", stage: "Aprender", title: "Cena 02 Criar",
      expected: "Cena Criar com media própria e transição",
      source: source("learn_150–166"), component: "AprenderSection.tsx",
      type: "text", selector: "#experiencia", expectedText: "criar", priority: "P0",
    }),
    rule({
      id: "LEARN-CAPTION", stage: "Aprender", title: "Legenda da experiência",
      expected: "Aprender fora da sala sem ser tapado pela miniatura",
      source: source("learn_147–149"), component: "AprenderSection.tsx",
      type: "text", selector: "#experiencia", expectedText: "Aprender fora da sala", priority: "P0",
    }),
    rule({
      id: "LEARN-PHOTOS", stage: "Aprender", title: "Janelas de media",
      expected: "Duas janelas/editorial media e detalhe, sem colisão com o texto",
      source: source("learn_147–170"), component: "AprenderSection.tsx",
      type: "count", selector: "#experiencia img, #experiencia video", minimum: 2, priority: "P1",
    }),
    rule({
      id: "LEARN-TRAIL", stage: "Aprender", title: "Learning Trail com Nodes e transição",
      expected: "Trail azul → laranja, media swap, pausas em Descobrir/Criar",
      source: source("learn_155–171", motion + " §7"), component: "AprenderSection.tsx",
      type: "review", priority: "P1",
    }),
    rule({
      id: "FUTURE-TITLE", stage: "Futuro", title: "Headline de Futuro",
      expected: "O futuro também se aprende.",
      source: source("future_5 / future_19"), component: "FuturoSection.tsx",
      type: "text", selector: "#futuro", expectedText: "O futuro também se aprende", priority: "P0",
    }),
    rule({
      id: "FUTURE-SINGLE-WINDOW", stage: "Futuro", title: "Janela de cena única",
      expected: "Uma janela visual ativa no desktop, não quatro cards sobrepostos",
      source: source("future_21 / future_56", motion + " §8"), component: "FuturoSection.tsx",
      type: "count", selector: "#futuro [data-colus-scene]", minimum: 1, maximum: 1,
      viewport: "desktop", priority: "P0",
    }),
    rule({
      id: "FUTURE-TIC", stage: "Futuro", title: "Cena 01 TIC",
      expected: "TIC presente com media associada",
      source: source("future_23–29", assets), component: "FuturoSection.tsx",
      type: "text", selector: "#futuro", expectedText: "TIC", priority: "P0",
    }),
    rule({
      id: "FUTURE-ENGINEERING", stage: "Futuro", title: "Cena 02 Engenharia",
      expected: "Engenharia com media/device e texto editorial correspondente",
      source: source("future_31–37", motion + " §8"), component: "FuturoSection.tsx",
      type: "text", selector: "#futuro", expectedText: "Engenharia", priority: "P0",
    }),
    rule({
      id: "FUTURE-SCIENCE", stage: "Futuro", title: "Cena 03 Ciência",
      expected: "Ciência com vídeo controlado e poster de fallback",
      source: source("future_39–45", motion + " §8 / §19"), component: "FuturoSection.tsx",
      type: "text", selector: "#futuro", expectedText: "Ciência", priority: "P0",
    }),
    rule({
      id: "FUTURE-SAFETY", stage: "Futuro", title: "Cena 04 Segurança Digital",
      expected: "Segurança Digital com imagem própria e texto",
      source: source("future_47–49"), component: "FuturoSection.tsx",
      type: "text", selector: "#futuro", expectedText: "Segurança Digital", priority: "P0",
    }),
    rule({
      id: "FUTURE-GRAPH", stage: "Futuro", title: "Signal Field e máscara",
      expected: "Field/Nodes/same Scene Window; campo atrás da media, não mock persistente por cima de rostos",
      source: source("future_54–59"), component: "FuturoSection.tsx",
      type: "review", priority: "P0",
    }),
    rule({
      id: "LIFE-TITLE", stage: "Vida COLUS", title: "Vida COLUS editorial",
      expected: "A escola acontece em movimento.",
      source: source("life_18 / life_56"), component: "VidaSection.tsx",
      type: "text", selector: "#vida-colus", expectedText: "A escola acontece", priority: "P1",
    }),
    rule({
      id: "LIFE-MEDIA", stage: "Vida COLUS", title: "Fotoensaio",
      expected: "Media dominante e apoio, ritmo editorial não simétrico",
      source: source("life_20 / life_33 / life_43"), component: "VidaSection.tsx",
      type: "count", selector: "#vida-colus img, #vida-colus video", minimum: 2, priority: "P1",
    }),
    rule({
      id: "LIFE-STORY", stage: "Vida COLUS", title: "Story Markers → Pertencer",
      expected: "Story Markers e ponte humana sem grelha simétrica nem carousel",
      source: source("life_44–52", motion + " §9"), component: "VidaSection.tsx",
      type: "review", priority: "P1",
    }),
    rule({
      id: "BELONG-TITLE", stage: "Pertencer", title: "Headline Comunidade",
      expected: "Crescer é uma jornada partilhada.",
      source: source("belong_9113"), component: "PertencerSection.tsx",
      type: "text", selector: "#comunidade", expectedText: "jornada partilhada", priority: "P1",
    }),
    rule({
      id: "BELONG-RING", stage: "Pertencer", title: "Community Ring",
      expected: "Ring deliberadamente aberto, nós em arco e saída para Rise Axis",
      source: source("belong_9127–9136 / belong_9165", motion + " §10"), component: "PertencerSection.tsx",
      type: "review", priority: "P0",
    }),
    rule({
      id: "BELONG-ACTS", stage: "Pertencer", title: "Acompanhar / Participar / Crescer juntos",
      expected: "Três etapas humanas previstas no master",
      source: source("belong_9124–9126"), component: "PertencerSection.tsx",
      type: "text", selector: "#comunidade", expectedText: "Crescer juntos", priority: "P1",
    }),
    rule({
      id: "TRANSFORM-HEADLINE", stage: "Transformar", title: "Progressão aspiracional",
      expected: "Quando a confiança cresce, novos caminhos tornam-se possíveis.",
      source: source("transform_9320"), component: "TransformarSection.tsx",
      type: "text", selector: "#transformar", expectedText: "Quando a confiança cresce", priority: "P1",
    }),
    rule({
      id: "TRANSFORM-THREE", stage: "Transformar", title: "Expressar / Construir / Avançar",
      expected: "Três momentos com media própria, sem um painel sempre dominante",
      source: source("transform_9326–9335", motion + " §11"), component: "TransformarSection.tsx",
      type: "review", priority: "P0",
    }),
    rule({
      id: "VOICES-HEADLINE", stage: "Vozes COLUS", title: "Voz humana em foco",
      expected: "Secção Vozes COLUS presente",
      source: source("voices_9509–9513"), component: "TestimonialsSection.tsx",
      type: "text", selector: "#vozes-colus", expectedText: "Vozes COLUS", priority: "P1",
    }),
    rule({
      id: "VOICES-TRUST", stage: "Vozes COLUS", title: "Depoimentos reais autorizados",
      expected: "Um testemunho por vez; não fabricar citações; placeholder claro até aprovação",
      source: source("voices_9515–9532", motion + " §12"), component: "TestimonialsSection.tsx",
      type: "review", priority: "P0",
    }),
    rule({
      id: "INVITE-TITLE", stage: "Convite Final", title: "Convite à visita",
      expected: "Venha conhecer de perto o Universo dos Sonhos.",
      source: source("invite_9724"), component: "ContactFooter.tsx",
      type: "text", selector: "#contactos", expectedText: "Venha conhecer de perto", priority: "P1",
    }),
    rule({
      id: "INVITE-CONTACT", stage: "Convite Final", title: "Contactos e visita",
      expected: "CTA Marcar uma visita e faixa de contacto antes do Footer",
      source: source("invite_9726 / invite_9764"), component: "ContactFooter.tsx",
      type: "presence", selector: '#contactos a[href^="mailto:"]', priority: "P1",
    }),
    rule({
      id: "FOOTER-EDUCORE-LOGO", stage: "Footer", title: "Lockup oficial EduCore",
      expected: "Logo EduCore oficial, não apenas palavra em texto",
      source: source("footer_9904", consolidated + " §8"), component: "ContactFooter.tsx",
      type: "presence", selector: 'footer img[alt*="EduCore"], footer svg[aria-label*="EduCore"]', priority: "P0",
    }),
    rule({
      id: "FOOTER-NAV-ARCHITECTURE", stage: "Footer", title: "Quatro grupos de navegação",
      expected: "4 grupos de navegação do padrão EduCore (identidade e arquitetura preservadas)",
      source: source("footer_9907–9914 / footer_9933 / footer_mobile_16"),
      component: "ContactFooter.tsx", type: "count",
      selector: "footer nav", minimum: 4, priority: "P0",
    }),
    rule({
      id: "FOOTER-LABEL-LANGUAGE", stage: "Footer", title: "Idioma e nomes dos grupos — decisão aberta",
      expected: "Manter os quatro grupos; validar os títulos quando a decisão OPEN-01 for fechada",
      source: source("footer_mobile_15", consolidated + " §8"),
      component: "ContactFooter.tsx", type: "review", priority: "P1",
    }),
    rule({
      id: "FOOTER-RIGHTWARE-LOGO", stage: "Footer", title: "Lockup oficial RIGHTWARE",
      expected: "Logo RIGHTWARE e A RIGHTWARE Product",
      source: source("footer_9916–9918", consolidated + " §8"), component: "ContactFooter.tsx",
      type: "presence", selector: 'footer img[alt*="RIGHTWARE"], footer svg[aria-label*="RIGHTWARE"]',
      priority: "P0",
    }),
    rule({
      id: "FOOTER-COPYRIGHT", stage: "Footer", title: "Copyright COLUS",
      expected: "© 2026 Colégio Universo dos Sonhos. Todos os direitos reservados.",
      source: source("footer_9921"), component: "ContactFooter.tsx",
      type: "text", selector: "footer",
      expectedText: "© 2026 Colégio Universo dos Sonhos", priority: "P1",
    }),
    rule({
      id: "FOOTER-REFLOW", stage: "Footer", title: "Padrão mobile e legal",
      expected: "EduCore → navegação → RIGHTWARE → redes → legal; targets >=44px",
      source: source("footer_mobile_16"), component: "ContactFooter.tsx",
      type: "review", priority: "P1",
    }),
  ],
};

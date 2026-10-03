export const schoolConfig = {
  id: "colus",
  legalName: "Colégio Universo dos Sonhos",
  displayName: "COLUS",
  descriptor: "Colégio Universo dos Sonhos",
  locale: "pt-MZ",
  timezone: "Africa/Maputo",
  currency: "MZN",
  brand: {
    orange: "#F18136",
    deepBlue: "#0C5898",
    brightBlue: "#2899EF",
    warmPaper: "#FFF8EF",
    warmWhite: "#FFFCF8",
    deepInk: "#071A2A",
  },
} as const;

export type SchoolConfig = typeof schoolConfig;

import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        editorial: ["Newsreader", "Georgia", "serif"],
      },
      colors: {
        colus: {
          orange: "#F18136",
          "deep-blue": "#0C5898",
          "bright-blue": "#2899EF",
          paper: "#FFF8EF",
          white: "#FFFCF8",
          ink: "#071A2A",
          "ink-soft": "#0B2436",
          text: "#102231",
          muted: "#65727C",
        },
      },
      boxShadow: {
        soft: "0 24px 80px rgba(7,26,42,.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;

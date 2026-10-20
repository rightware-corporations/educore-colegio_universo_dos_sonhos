import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Manrope","system-ui","sans-serif"], heading: ["Manrope","system-ui","sans-serif"], display: ["Newsreader","Georgia","serif"] },
      colors: {
        primary: "hsl(var(--primary) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        card: "hsl(var(--card) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        "muted-foreground": "hsl(var(--muted-foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        warning: "hsl(var(--warning) / <alpha-value>)",
        success: "hsl(var(--success) / <alpha-value>)",
        destructive: "hsl(var(--destructive) / <alpha-value>)",
      }
    }
  }, plugins: []
} satisfies Config;

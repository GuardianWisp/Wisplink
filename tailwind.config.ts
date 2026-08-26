import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        faint: "rgb(var(--color-faint) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        "line-strong": "rgb(var(--color-line-strong) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.03em",
        wideish: "0.08em",
        label: "0.16em",
      },
      maxWidth: {
        studio: "1800px",
      },
      transitionTimingFunction: {
        studio: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        900: "900ms",
        1100: "1100ms",
      },
    },
  },
  plugins: [],
};

export default config;

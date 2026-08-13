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
        paper: "#FFFFFF",
        ink: "#111111",
        muted: "#777777",
        faint: "#A3A3A1",
        line: "#E6E6E4",
        "line-strong": "#D6D6D3",
        panel: "#F1F1EF",
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

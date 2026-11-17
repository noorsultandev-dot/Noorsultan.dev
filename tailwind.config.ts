import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#03050a", 900: "#070b14", 850: "#0b1120", 800: "#0f172a", 700: "#1a2236" },
        neon: { cyan: "#22d3ee", violet: "#a78bfa", green: "#4ade80", pink: "#f472b6", amber: "#fbbf24" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34,211,238,.25), 0 0 32px -6px rgba(34,211,238,.45)",
        "glow-violet": "0 0 0 1px rgba(167,139,250,.25), 0 0 32px -6px rgba(167,139,250,.45)",
      },
    },
  },
  plugins: [],
};
export default config;

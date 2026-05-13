import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          950: "#0a0a0b",
          900: "#121214",
          850: "#18181b",
          800: "#1f1f23",
          700: "#2a2a30",
        },
        gold: {
          DEFAULT: "#c9a962",
          light: "#e4d4a5",
          dim: "#8a7644",
        },
        crimson: {
          DEFAULT: "#9b2335",
          glow: "#c43b4f",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "noir-radial":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(155,35,53,0.12), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(201,169,98,0.06), transparent)",
      },
    },
  },
  plugins: [],
};

export default config;

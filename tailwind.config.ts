import type { Config } from "tailwindcss";

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        font1: ["asap", "sans-serif"],
        fontb: ["saira", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          200: "#d6b4b4",
          300: "#c89b9b",
          400: "#ad6969",
          500: "#d20c08",
          600: "#b80b07",
          700: "#9e0906",
          800: "#840805",
          900: "#6a0704",
        },
        second: {
          500: "#FF8B00",
          600: "#FF7A00",
          700: "#FF6900",
          800: "#FF5800",
          900: "#FF4700",
        },
        noir: {
          900: "#020202",
          800: "#0a0a0a",
          700: "#121212",
          600: "#1a1a1a",
          500: "#222222",
          400: "#2a2a2a",
          300: "#323232",
          200: "#3a3a3a",
          100: "#424242",
        },
      },
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        font1: ["coolvetica", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
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
    },
  },
  plugins: [],
} satisfies Config;

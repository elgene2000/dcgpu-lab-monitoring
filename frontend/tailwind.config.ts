import { Manrope } from "next/font/google";
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      clashDisplay: ["Clash Display", "sans-serif"],
      manrope: ["Manrope", "sans-serif"],
    },
    extend: {
      colors: {
        "spun-pearl": {
          "50": "#f6f8fA",
          "100": "#edeff2",
          "200": "#dddfe0",
          "300": "#c9ced8",
          "400": "#b2b6c7",
          "500": "#a8abbe",
          "600": "#888aa3",
          "700": "#74758e",
          "800": "#606173",
          "900": "#50515f",
          "950": "#2f3037",
        },
        primary: {},
        secondary: {
          DEFAULT: "#ffffff",
          dark: "#1f2430",
        },
        background: {
          DEFAULT: "#f6f8fA",
          dark: "#181A25",
        },
        text: {
          DEFAULT: "#313132",
          dark: "#ffffff",
        },
        light: {
          sidebar: {
            border: "#A8ABBE",
          },
        },
        dark: {
          sidebar: {
            border: "#2E313D",
            text: "#A3A9B0",
            accent: "#313741",
          },
          card: {
            border: "#2E313D",
          },
        },
        foreground: "var(--foreground)",
        sidebar: {
          DEFAULT: "#ffffff",
          foreground: "#A8ABBE",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          dark: "#1f2430",
          accent: "#F1F3F4",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "#ededf1",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        shimmer: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        scan: {
          "0%": { top: "-100%" },
          "100%": { top: "100%" },
        },
        flicker: {
          "0%, 100%": {
            opacity: "1",
            transform: "none",
          },
          "5%": {
            opacity: "0.6",
            transform: "translate(1px, -1px) skew(0.5deg)",
          },
          "10%": {
            opacity: "0.8",
            transform: "translate(-1px, 1px) skew(-0.5deg)",
          },
          "15%": {
            opacity: "0.7",
            transform: "translate(0.5px, -0.5px) skew(1deg)",
          },
          "20%": {
            opacity: "0.7",
            transform: "translate(-0.5px, 0.5px) skew(-1deg)",
          },
          "25%": {
            opacity: "0.7",
            transform: "translate(1px, 1px) skew(1.5deg)",
          },
          "30%": {
            opacity: "0.9",
            transform: "none",
          },
        },
      },
      animation: {
        flicker: "flicker 3s infinite",
        scan: "scan 2s linear infinite",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
} satisfies Config;

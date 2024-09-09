/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#286FFD",
        "primary-dark": "#2F5CEA",
        "primary-light": "#27A3FF",
        secondary: "#EAB308",
        background: colors.white,
        surface: "#E9E9E9",
        "surface-dark": "#c2c2c2",
        error: "#EF4444",
        "dm-background": "#020617",
        "dm-surface": "#1E293B",
        "dm-surface-dark": "#0F172A",
        "dm-surface-light": "#334155",
        // outside chatbox colors
        opaqueBlack: "rgb(var(--opaque-black) / 0.3)",
        footerOpaqueBlack: "rgb(var(--opaque-black) / 0.8)",
      },
      container: {
        center: true,
      },
      screens: {
        xs: "475px",
        "3xl": "1920px",
      },
      backgroundImage: {
        "city-hall": "url(/src/assets/images/bg.jpg)",
      },
      fontFamily: {
        helvetica: "Helvetica",
        "helvetica-oblique": "Helvetica Oblique",
        "helvetica-compressed": "Helvetica Compressed",
        "helvetica-rounded-bold": "Helvetica Rounded Bold",
        "helvetica-bold": "Helvetica Bold",
        "helvetica-bold-oblique": "Helvetica Bold Oblique",
        "helvetica-light": "Helvetica Light",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

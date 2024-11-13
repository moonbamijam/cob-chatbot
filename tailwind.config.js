/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#286FFD",
        "primary-dark": "#2F5CEA",
        "primary-light": "#1983ff",
        secondary: "#EAB308",
        tertiary: "#EE3851",
        background: "#FDFCFA",
        surface: "#E9E9E9",
        "surface-dark": "#c2c2c2",
        error: "#EF4444",
        "dm-background": "#020617",
        "dm-surface": "#1E293B",
        "dm-surface-dark": "#0F172A",
        "dm-surface-light": "#334155",
      },
      container: {
        center: true,
      },
      screens: {
        xs: "475px",
        "3xl": "1920px",
      },
      animation: {
        "open-modal": "open-modal 300ms ease-in-out",
      },
      backgroundImage: {
        "city-hall": "url(/static/assets/images/bg.jpg)",
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

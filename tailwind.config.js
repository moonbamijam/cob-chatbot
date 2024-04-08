/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A9B5FE",
        secondary: "#E7F1FE",
        highlight: "#286FFD",
        extra: "#85BBFB",
        opaqueBlack: "rgb(var(--opaque-black) / 0.3)",
        footerOpaqueBlack: "rgb(var(--opaque-black) / 0.8)",
      },
      container: {
        center: true,
      },
      screens: {
        xs: "475px",
      },
      backgroundImage: {
        "city-hall": "url(/src/assets/bg.jpg)",
      },
      fontFamily: {
        raleway: [
          "Raleway",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
};

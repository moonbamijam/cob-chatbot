/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dummyprimary: "#A9B5FE",
        dummysecondary: "#E7F1FE",
        dummyhighlight: "#286FFD",
        dummyextra: "#85BBFB",
      },
      container: {
        center: true,
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};

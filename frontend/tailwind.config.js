
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { pmi: { DEFAULT: "#d00000", 50: "#ffe5e5", 100: "#ffb3b3", 200: "#ff8080", 300: "#ff4d4d", 400: "#ff1a1a", 500: "#e60000", 600: "#d00000", 700: "#b30000", 800: "#990000", 900: "#660000" } } } },
  plugins: [],
}

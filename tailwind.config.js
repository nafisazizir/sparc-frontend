/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "jordy-blue": {
          50: "#f2f7fc",
          100: "#e1ecf8",
          200: "#c9def4",
          300: "#a5caeb",
          400: "#73a9df",
          500: "#5a8fd7",
          600: "#4676ca",
          700: "#3c63b9",
          800: "#365297",
          900: "#304778",
          950: "#212c4a",
        },
      },
    },
  },
  plugins: [],
};

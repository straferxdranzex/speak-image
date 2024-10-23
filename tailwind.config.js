/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppins: "Poppins",
        segoe: "var(--segoe-font)",
      },
      colors: {
        primary: {
          DEFAULT: "var(--primary-400)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
        },
        background: "var(--bg-color)",
        foreground: "var(--foreground-color)",
        text: "var(--text-color)",
        border: "var(--border-color)",
        text: {
          DEFAULT: "var(--text-color)",
          light: "var(--text-light)",
        },
        card: {
          DEFAULT: "var(--card-color)",
          2: "var(--card-color2)",
          hover: "var(--card-hover-color)",
        },
      },
    },
  },
  plugins: [],
};

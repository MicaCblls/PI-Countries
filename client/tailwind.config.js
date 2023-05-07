/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Noah: ["Noah Text", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "0",
      },
    },
    screens: {
      xsm: "300px",
      sm: "640px",
      md: "780px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        optionBg: "#eef2ff",
        navBg: "#e2e8f0",
        activeBg: "#ddd6fe",
        colorPrimary: "#6366f1",
        colorSecondary: "#ede9fe",
        disabledColor: "#c7d2fe",
        errorColor: "#c51b1b",
        successColor: "#1bc579",
        text: "#0f172a",
      },
      backgroundImage: {
        // EXAMPLE
        // hero: "url('/img/hero/hero-bg.png')",
      },
    },
  },
  plugins: [],
};

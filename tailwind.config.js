/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#173B32",
          light: "#20493F",
          dark: "#0F2A23",
        },
        ivory: "#F7F3EA",
        beige: "#E8DFD0",
        sand: "#CDBB9A",
        gold: {
          DEFAULT: "#B89A62",
          light: "#CBAE7C",
          dark: "#9B7F4C",
        },
        charcoal: "#252823",
        softwhite: "#FCFBF8",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "'Playfair Display'", "Georgia", "serif"],
        sans: ["'Jost'", "'Inter'", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      boxShadow: {
        soft: "0 2px 24px rgba(23,59,50,0.08)",
        card: "0 1px 12px rgba(37,40,35,0.06)",
      },
      borderRadius: {
        sm2: "2px",
      },
    },
  },
  plugins: [],
};

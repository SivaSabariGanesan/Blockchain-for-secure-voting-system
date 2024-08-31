/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        grid: "grid 15s linear infinite",
      },
      backgroundImage: {
        'hero': "url('../app/img/indian.jpg')",
      },
    },
  },
  plugins: [],
}

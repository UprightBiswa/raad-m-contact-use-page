// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./assets/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

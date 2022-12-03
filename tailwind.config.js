/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend:{
      colors: {
        "black": "#1b1b1b",
        "blue": "#5271FF",
        "red": "#FF0000",
        "white": "#ffffff"
      }
    }
  },
  plugins: [],
}

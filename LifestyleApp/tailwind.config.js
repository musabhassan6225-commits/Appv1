/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        romance: {
          light: '#FFF5F5',
          base: '#FFD1D1',
          dark: '#FF8A8A',
          gold: '#D4AF37',
        },
      },
    },
  },
  plugins: [],
}
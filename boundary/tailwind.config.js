/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'purple1' : '#392F5A',
        'purple2' : '#8B5FBF',
        'purple3' : '#C989EB',
        'purple4' : '#F7AEF8',
        'purple5' : '#FDC5F5'
      }
    },
  },
  plugins: [],
}
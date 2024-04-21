const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors : {
        'custom_purple1' : '#392F5A',
        'custom_purple2': '#8B5FBF',
        'custom_purple3' : '#C989EB',
        'custom_purple4' : '#F7AEF8',
        'custom_purple5' : '#FDC5F5' 
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}


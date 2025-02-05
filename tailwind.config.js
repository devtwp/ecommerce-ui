/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}" // Importante para que Tailwind escanee los archivos de Angular
  ],
  theme: {
    extend: {
      fontFamily: {
        calistoga: ['Calistoga', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

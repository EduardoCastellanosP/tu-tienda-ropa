/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Montserrat Extra Bold para títulos
        heading: ['Montserrat', 'sans-serif'],
        // Montserrat Medium para cuerpo de texto
        body: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
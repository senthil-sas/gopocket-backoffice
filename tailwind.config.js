/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  plugins: [],
}
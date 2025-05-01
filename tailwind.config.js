/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6D28D9', // Deep purple for headers/buttons
        secondary: '#A78BFA', // Lighter purple for user messages
        accent: '#F472B6', // Pinkish-purple for highlights
        background: '#F5F3FF', // Very light purple background
      },
    },
  },
  plugins: [],
}
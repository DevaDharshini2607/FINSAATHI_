/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        'brand-blue': '#3b509aff', // Vibrant Blue (Tailwind Blue-600)
        'brand-dark': '#2a2b36ee', // Dark Blue (Tailwind Blue-900)
        'brand-light-blue': '#9fbce5ff', // Very light blue background
        'soft-green': '#45947aff', // Growth/Success
        'surface-light': '#F8FAFC', // Slate 50 - Clean professional background
        'text-main': '#1e383bff',
        'text-muted': '#054483ff',
      },
      animation: {
        'orbit': 'orbit 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}

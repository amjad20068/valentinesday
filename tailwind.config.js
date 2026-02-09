/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        // New Theme Colors
        peach: {
          100: '#ffdde1',
          200: '#ffccd2',
          300: '#ffb3bc',
          400: '#ff99a8',
          500: '#ee9ca7',
        },
        hotpink: '#ff4d6d',
        glass: 'rgba(255, 255, 255, 0.8)',
      },
      fontFamily: {
        sans: ['"Comic Neue"', '"Fredoka"', 'sans-serif'], // Cute round fonts
        handwriting: ['"Patrick Hand"', 'cursive'],
      },
      backgroundImage: {
        'valentine-gradient': 'linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}

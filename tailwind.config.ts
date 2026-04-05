import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','Arial','sans-serif'],
      },
      colors: {
        ink: {
          1: '#0b0b0b',
          2: '#111214',
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.06)',
        softdark: '0 20px 40px rgba(0,0,0,0.35)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config

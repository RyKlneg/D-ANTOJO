import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dantojo': {
          'beige': '#F5F0E8',
          'cream': '#FDF8F3',
          'tan': '#E8DED0',
          'brown': '#8B7355',
          'coffee': '#5C4A3A',
          'dark': '#3D2E1F',
          'gold': '#C9A962',
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
        'premium': '0 20px 60px -15px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}

export default config

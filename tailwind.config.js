/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffbf0',
          100: '#fef7e0',
          200: '#fdedb8',
          300: '#fce087',
          400: '#fad154',
          500: '#f9c74f',
          600: '#f4a261',
          700: '#e76f51',
          800: '#d62828',
          900: '#8b0000',
        },
        champagne: {
          50: '#fefdfb',
          100: '#fdf9f0',
          200: '#faf2db',
          300: '#f7e6a6',
          400: '#f4d971',
          500: '#f1cc3c',
          600: '#d4af37',
          700: '#b8941f',
          800: '#9c7914',
          900: '#805f0a',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'cursive': ['Yellowtail', 'cursive'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      letterSpacing: {
        'tightest': '-.075em',
        'tighter': '-.05em',
        'tight': '-.025em',
        'normal': '0',
        'wide': '.025em',
        'wider': '.05em',
        'widest': '.1em',
        'ultra': '.25em',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGentle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
} 
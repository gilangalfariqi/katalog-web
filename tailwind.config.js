/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FDFAF7',
          100: '#FAF6F1',
          200: '#F5EFE9',
          300: '#F0E9E2',
          400: '#E9DFD4',
        },
        beige: {
          50: '#FAF9F6',
          100: '#F8F4F0',
          200: '#F2EDE8',
          300: '#EDE6DF',
          400: '#E3DCCA',
        },
        brown: {
          900: '#1A1412',
          800: '#2D2420',
          700: '#5C4D42',
          600: '#8B5E3C',
          500: '#A67B5B',
          400: '#D4A373',
          300: '#E6C9AD',
          200: '#F0DFD0',
          100: '#F9F4F0',
        },
        gold: {
          50: 'rgb(253 242 191 / <alpha-value>)',
          100: 'rgb(253 248 177 / <alpha-value>)',
          200: 'rgb(250 240 151 / <alpha-value>)',
          300: 'rgb(246 229 113 / <alpha-value>)',
          400: '#D4A373',
          500: '#E8B923',
          600: 'rgb(216 164 22 / <alpha-value>)',
          700: 'rgb(192 147 19 / <alpha-value>)',
          800: 'rgb(168 129 17 / <alpha-value>)',
          900: 'rgb(144 111 / <alpha-value>)',
          950: 'rgb(113 87 / <alpha-value>)',
          glow: 'rgba(232, 185, 35, 0.15)',
        },
        primary: {
          DEFAULT: '#8B5E3C',
          dark: '#6B4F3B',
          light: '#A67B5B',
        },
        background: '#FAF6F1',
        surface: '#FFFFFF',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        luxury: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'accent-glow': '0 0 20px rgba(212, 163, 115, 0.25)',
        'accent-glow-lg': '0 0 40px rgba(212, 163, 115, 0.35)',
        'gold-glow': '0 0 20px rgba(232, 185, 35, 0.3)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        'section': '6rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'hover-lift': 'hoverLift 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        hoverLift: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-4px) scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
};

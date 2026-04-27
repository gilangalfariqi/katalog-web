/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5E3C',
          dark: '#6B4F3B',
          light: '#A67B5B',
        },
        secondary: {
          DEFAULT: '#F5E9DC',
        },
        background: {
          DEFAULT: '#FAF6F1',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          light: '#F7F2EC',
        },
        accent: {
          DEFAULT: '#D4A373',
          glow: 'rgba(212, 163, 115, 0.3)',
        },
        text: {
          DEFAULT: '#2D2420',
          soft: '#5C4D42',
          muted: '#8B7D6F',
        },
      },
      boxShadow: {
        'accent-glow': '0 0 20px rgba(212, 163, 115, 0.25)',
        'accent-glow-lg': '0 0 40px rgba(212, 163, 115, 0.35)',
      },
    },
  },
  plugins: [],
};

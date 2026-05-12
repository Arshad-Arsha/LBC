/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#D4AF37',
          600: '#B8960C',
          700: '#92700A',
          800: '#6B5208',
          900: '#44330A',
        },
        dark: {
          50:  '#1a1a1a',
          100: '#141414',
          200: '#0f0f0f',
          300: '#0a0a0a',
          400: '#050505',
          500: '#000000',
        },
        cream: '#FAF6EE',
        champagne: '#F7E7CE',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"Inter"', 'sans-serif'],
        accent:  ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'fade-up':      'fadeUp 0.7s ease forwards',
        'fade-in':      'fadeIn 1s ease forwards',
        'shimmer':      'shimmer 2.5s infinite',
        'float':        'float 6s ease-in-out infinite',
        'cursor-pulse': 'cursorPulse 1.2s ease-in-out infinite',
        'spin-slow':    'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp:   { '0%': { opacity: 0, transform: 'translateY(40px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:   { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        shimmer:  { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        float:    { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        cursorPulse: { '0%,100%': { transform: 'scale(1)', opacity: 1 }, '50%': { transform: 'scale(1.4)', opacity: 0.7 } },
      },
      backdropBlur: { xs: '2px' },
      backgroundImage: {
        'gold-gradient':  'linear-gradient(135deg, #D4AF37 0%, #F5E06E 50%, #B8960C 100%)',
        'dark-gradient':  'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        'glass':          'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        'gold-glow':  '0 0 30px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.15)',
        'gold-sm':    '0 0 12px rgba(212,175,55,0.3)',
        'glass':      '0 8px 32px rgba(0,0,0,0.4)',
        'card':       '0 20px 60px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}

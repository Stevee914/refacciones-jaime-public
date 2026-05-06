/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'j-red':      '#E1251B',  // Retail Red — primary CTA
        'j-orange':   '#F15A24',  // Logo Orange — accent / secondary CTA
        'j-red-deep': '#A81818',  // Deep Red — hover states
        'j-black':    '#111111',  // Charcoal — headers, text
        'j-graphite': '#252525',  // Graphite — dark sections
        'j-gray':     '#EFEFEF',  // Light Gray — page background
        'j-warm':     '#F7F3EE',  // Warm White — cards / light bg
        'j-steel':    '#707070',  // Steel Gray — secondary text
        'j-white':    '#FFFFFF',  // Pure White
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.35' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'hero-in': {
          '0%':   { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'card-in': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'hero-img-settle': {
          '0%':   { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1.0)' },
        },
        'shine': {
          '0%':   { left: '-120%' },
          '100%': { left: '220%' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 2.5s ease-in-out infinite',
        'float':      'float 5s ease-in-out infinite',
        'float-slow': 'float-slow 11s ease-in-out infinite',
        'hero-in':    'hero-in 0.75s ease-out both',
        'card-in':    'card-in 0.6s ease-out both',
        'hero-img-settle': 'hero-img-settle 0.9s ease-out both',
        'shine':           'shine 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

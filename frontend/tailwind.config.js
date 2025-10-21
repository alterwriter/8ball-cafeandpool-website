/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        latte: '#F5E9E2',
        charcoal: '#2B2A33',
        teal: '#4F9390',
        gold: '#D2A24C',
      },
      fontFamily: {
        heading: ['"Poppins"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 45px rgba(15, 23, 42, 0.15)',
      },
    },
  },
  plugins: [],
};

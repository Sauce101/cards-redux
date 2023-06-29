/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        tall: { raw: '(max-height: 799px)' },
        tall2x: { raw: '(min-height: 800px)' },
        tall3x: { raw: '(min-height: 1024px)' },
        tall4x: { raw: '(min-height: 1300px)' },
      },
    },
  },
  plugins: [],
};

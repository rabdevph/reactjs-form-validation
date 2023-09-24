/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        form: '5px 5px',
      },
      fontSize: {
        '2xs': ['0.625rem'],
      },
      minHeight: {
        svh: '100svh',
      },
    },
  },
  plugins: [],
};

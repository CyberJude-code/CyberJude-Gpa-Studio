/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        glass: '0 20px 50px rgba(15, 23, 42, 0.18)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(56, 189, 248, 0.16), transparent 40%), linear-gradient(135deg, rgba(59,130,246,0.25), rgba(168,85,247,0.15))',
      },
    },
  },
  plugins: [],
};

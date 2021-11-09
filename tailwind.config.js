module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#011eff',
        secondary: '#000000'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

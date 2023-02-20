/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xl: { max: '1100px' },
        lg: { max: '820px' },
        md: { max: '640px' },
        sm: { max: '440px' },
        'semi-md': '840px'
      }
    },
    variants: {
      backgroundColor: ['active'],
      textColor: ['active']
    }
  },
  plugins: []
};

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderRadius: {
        custom: '100px',
      },
      colors: {
        'brand-bg-white': '#FBFBF9',
        'brand-dark-yellow': '#D9D4A7',
        'brand-white': '#F0F0EA',
        'brand-text-purple': '#21093A',
        'brand-dark-purple': '#AA93FF',
        'brand-light-purple': '#E3D2FF',
        'brand-bg-disabled-grey': '#DEDEDE',
        'brand-text-disabled-grey': '#9C9C9C',
        'brand-border-grey': '#c6b5e2',
        'brand-input-active': '#603789',
      },
      fontSemibold: {
        'font-weight': '400px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

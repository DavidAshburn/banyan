const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        inter: ['Inter Tight', 'sans-serif'],
        josefin: ['Josefin Slab', 'serif'],
      },
      colors: {
        light: '#d5fdef',
        bright: '#61ffdf',
        dull: '#95f0dd',
        dark: '#275c51',
        coral: '#f87954',
        offwhite: '#fff3f0',
        lcoral: '#fce1d9',
        mcoral: '#ffcebf',
      },
    },
  },
};

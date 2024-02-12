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
        accent: '#3b82f6',
        dark: '#3730a3',
        light: '#c7d2fe',
        bright: '#4f46e5',
        dull: '#a5b4fc',
        coral: '#f87954',
        cylight: '#d5fdef',
        cybright: '#61ffdf',
        cydull: '#95f0dd',
        cydark: '#275c51',
      },
    },
  },
};

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
        accent: '#bbf7d0',
        dark: '#1e40af',
        light: '#bfdbfe',
        bright: '#2563eb',
        dull: '#bae6fd',
        coral: '#f87954',
        cylight: '#d5fdef',
        cybright: '#61ffdf',
        cydull: '#95f0dd',
        cydark: '#275c51',
      },
    },
  },
};

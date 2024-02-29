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
        dark: '#292524',
        light: '#e8eef2',
        accent: '#166556',
        accent2: '#219781',
        alert: '#f87954',
        info: '#6a66a3'
      },
    },
  },
};

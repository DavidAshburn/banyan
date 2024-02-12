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
        
        accent: '#dcfce7',
        accent2: '#bbf7d0',
        accent3: '#86efac',
        accentdark: '#059669',
        dark: '#292524',
        light: '#f5f5f4',
        bright: '#78716c',
        dull: '#e7e5e4',
        coral: '#f87954',
        cylight: '#d5fdef',
        cybright: '#61ffdf',
        cydull: '#95f0dd',
        cydark: '#275c51',
      },
    },
  },
};

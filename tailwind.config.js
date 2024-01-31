const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        'inter': ['Inter Tight', 'sans-serif'],
        'josefin': ['Josefin Slab', 'serif']
      },
    },
    colors: {
      'light': '#d5fdef',
      'dark': '#275c51'
    }
  }
}

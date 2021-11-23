module.exports = {
  mode: 'jit',
  darkMode: 'class', // or 'media' or false
  prefix: '<%= prompts.prefix %>',
  purge: {
    enable: process.env.NODE_ENV === 'production',
    content: ['./src/index.template.html', './src/**/*.{vue,ts,tsx}'],
  },
  theme: {
    rotate: {
      '-360': '-360deg',
      '-270': '-270deg',
      '-180': '-180deg',
      '-135': '-1350deg',
      '-90': '-90deg',
      '-45': '-45deg',
      0: '0',
      45: '45deg',
      90: '90deg',
      135: '135deg',
      180: '180deg',
      270: '270deg',
      360: '360deg',
    },
    extend: {
      zIndex: {
        '-1': '-1',
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px',
      },
      spacing: {
        100: '25rem',
        101: '25.25rem',
        102: '25.5rem',
        103: '25.75rem',
        104: '26rem',
      },
      letterSpacing: {
        fullbutton: '0.5em',
      },
      maxWidth: {
        '9rem': '9rem',
      },
      transitionDuration: {
        800: '800ms',
      },
    },
  },
  variants: {},
  plugins: [],
}

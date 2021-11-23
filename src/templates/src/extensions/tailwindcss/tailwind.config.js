module.exports = {
  mode: 'jit',
  darkMode: 'class', // or 'media' or false
  prefix: 'qa-',
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
  plugins: [createEnterPlugin()],
}
/**
 * Used for animation when the element is displayed
 * @param maxOutput The larger the maxOutput output, the larger the generated css volume
 */
function createEnterPlugin(maxOutput = 6) {
  const createCss = (index, d = 'x') => {
    const upd = d.toUpperCase()
    return {
      [`*> .enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(50px)`,
      },
      [`*> .-enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(-50px)`,
      },
      [`* > .enter-${d}:nth-child(${index}),* > .-enter-${d}:nth-child(${index})`]: {
        'z-index': `${10 - index}`,
        opacity: '0',
        animation: `enter-${d}-animation 0.4s ease-in-out 0.3s`,
        'animation-fill-mode': 'forwards',
        'animation-delay': `${(index * 1) / 10}s`,
      },
    }
  }
  const handler = ({ addBase }) => {
    const addRawCss = {}
    for (let index = 1; index < maxOutput; index++) {
      Object.assign(addRawCss, {
        ...createCss(index, 'x'),
        ...createCss(index, 'y'),
      })
    }
    addBase({
      ...addRawCss,
      ['@keyframes enter-x-animation']: {
        to: {
          opacity: '1',
          transform: 'translateX(0)',
        },
      },
      ['@keyframes enter-y-animation']: {
        to: {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    })
  }
  return { handler }
}

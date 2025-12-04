import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dksh-red': '#d31710',
        'dksh-dark-red': '#9f180f',
        'dksh-darker-red': '#a11009',
        'dksh-blue': '#99bfe5',
        'dksh-dark-blue': '#0f3a85',
        'dksh-medium-blue': '#12518e',
        'dksh-light-blue': '#1461a8',
        'dksh-navy': '#00284e',
        'dksh-teal': '#025676',
        'dksh-yellow': '#ffd23a',
        'dksh-light-yellow': '#ffffb3',
        'dksh-light-pink': '#fceae9',
        'dksh-peach': '#f9bbb1',
        'dksh-pale-blue': '#e4ebf1',
        'dksh-mint': '#c6dcd8',
        'dksh-off-white': '#f5f5f5',
        'dksh-light-gray': '#f1f5f8',
        'dksh-gray': '#6a6a6a',
        'dksh-dark-gray': '#212121',
        'dksh-black': '#191919',
        'dksh-green-dark': '#144b2d',
        'dksh-green-sage': '#446550',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        zilla: ['var(--font-zilla)', 'Zilla Slab', 'serif'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '18px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '32px' }],
        '2xl': ['24px', { lineHeight: '36px' }],
        '3xl': ['28px', { lineHeight: '40px' }],
        '4xl': ['32px', { lineHeight: '44px' }],
        '5xl': ['40px', { lineHeight: '52px' }],
        '6xl': ['64px', { lineHeight: '52px' }],
        '7xl': ['84px', { lineHeight: '52px' }],
        '8xl': ['96px', { lineHeight: '90px' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'button': '12px',
      },
      minWidth: {
        'button': '300px',
      },
    },
  },
  plugins: [],
}
export default config


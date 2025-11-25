import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Psychology-driven color palette
        primary: {
          '50': '#E6F7FF',
          '100': '#BAE7FF',
          '200': '#91D5FF',
          '300': '#69C0FF',
          '400': '#40A9FF',
          '500': '#1890FF',
          '600': '#096DD9',
          '700': '#0050B3',
          '800': '#003A8C',
          '900': '#002766',
        },
        accent: {
          cyan: '#00D9FF',
          'cyan-light': '#0CFFE1',
          green: '#0FFF50',
          'green-light': '#39FF14',
          pink: '#F472B6',
          'pink-light': '#FB7185',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.2)',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 12px 48px 0 rgba(31, 38, 135, 0.5)',
        neuro: '5px 5px 10px #0a0f1a, -5px -5px 10px #1e3a5c',
        'neuro-inset': 'inset 5px 5px 10px #0a0f1a, inset -5px -5px 10px #1e3a5c',
        glow: '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-lg': '0 0 30px rgba(0, 217, 255, 0.5)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 1.5s ease-in-out infinite',
        'gradient': 'gradientShift 3s ease infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.5' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

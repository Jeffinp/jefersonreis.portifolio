// tailwind.config.cjs
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { // Usando um objeto para variações de cor
          DEFAULT: 'rgb(var(--resume-primary-color-rgb))', // Cor padrão
        },
        secondary: 'rgb(var(--resume-secondary-color-rgb))',
        accent: 'rgb(var(--resume-accent-color-rgb))',
        text: {
          DEFAULT: 'rgb(var(--resume-text-color-rgb))',
          secondary: 'rgb(var(--resume-text-color-secondary-rgb))',
        },
        background: {
          DEFAULT: 'rgb(var(--resume-background-color-rgb))',
          light: 'rgb(var(--resume-background-color-light-rgb))',
        },
        card: 'rgb(var(--resume-card-background-rgb))',
        hover: 'rgb(var(--resume-hover-color-rgb))',
        active: 'rgb(var(--resume-active-color-rgb))',
        focus: 'rgb(var(--resume-focus-color-rgb))',
        success: 'rgb(var(--resume-success-color-rgb))',
        warning: 'rgb(var(--resume-warning-color-rgb))',
        error: 'rgb(var(--resume-error-color-rgb))',
        info: 'rgb(var(--resume-info-color-rgb))',
        border: {
          DEFAULT: 'rgb(var(--resume-border-color-rgb))',
          light: 'rgb(var(--resume-border-color-light-rgb))',
        },
      },
      animation: {
        'fill-skill-bar': 'fill-skill-bar 1s ease-in-out forwards',
        'slowZoom': 'slowZoom 30s ease-in-out infinite alternate',
        'titleGlow': 'titleGlow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        'fill-skill-bar': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--skill-percentage)' },
        },
        'slowZoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        'titleGlow': {
          'from': {
            textShadow: '0 0 2px rgba(var(--resume-primary-color-rgb), 0.3)',
          },
          'to': {
            textShadow: '0 0 10px rgba(var(--resume-primary-color-rgb), 0.6)',
          },
        },
      },
    },
  },
  plugins: [],
}
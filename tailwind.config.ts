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
        // Lennox Fields Brand Colors - Inspired by Journaling Template
        'primary-sage': '#75856f', // Muted sage from template
        'warm-sand': '#b49a83', // Warm sand accent
        'soft-rose': '#C09191',
        'warm-gray': '#A39690',
        'warm-cream': '#faf9f7', // Background from template
        'accent-gold': '#9B8C5A',
        'earth-green': '#6B8E4E',
        'text-dark': '#3f3f3f', // Dark gray from template
        'text-light': '#F5F5F5',

        // Clinical UI Colors
        'clinical-blue': '#4A90A4',
        'alert-red': '#D64545',
        'success-green': '#5C8B73',
        'warning-amber': '#D4A574',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        body: ['Calibri', 'var(--font-inter)', 'sans-serif'],
        accent: ['var(--font-quicksand)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #faf9f7 0%, #e8e8e8 100%)',
        'gradient-sage': 'linear-gradient(135deg, #75856f 0%, #6B8E4E 100%)',
        'gradient-sand': 'linear-gradient(90deg, #b49a83 0%, #d8c5b0 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 25px rgba(0, 0, 0, 0.12)',
        'strong': '0 8px 35px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}

export default config

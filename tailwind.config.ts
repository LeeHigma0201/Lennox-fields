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
        // Lennox Fields Brand Colors — synced with /Lennox Fields Design System/colors_and_type.css
        'primary-sage': '#75856F', // Hero brand. Buttons, links, accents.
        'earth-green': '#6B8E4E', // Hover/active state for sage.
        'warm-sand': '#8A7362', // Secondary accent.
        'soft-rose': '#C09191', // Tertiary accent. Care, warmth.
        'accent-gold': '#7A6E44', // Premium / editorial.

        // Surfaces
        'warm-cream': '#FAF9F7',
        'cream': '#FAF9F7', // Alias
        'paper': '#F4F1EB', // Layered surface
        'linen': '#EDE7DC', // Deeper paper

        // Ink
        'ink': '#2A2A28', // Headlines, near-black
        'text-dark': '#3F3F3F',
        'warm-gray': '#6B6560',
        'rule': '#D4CDBF', // Hairlines
        'text-light': '#F5F5F5',

        // Clinical UI Colors
        'clinical-blue': '#4A90A4',
        'crisis-clay': '#B85C3F', // True crisis only
        'alert-red': '#B85C3F', // Alias for legacy callsites
        'success-green': '#5C8B73',
        'warning-amber': '#D4A574',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #faf9f7 0%, #f5e8e8 100%)',
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

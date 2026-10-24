/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // â”€â”€ New Teal Palette â”€â”€
        ink: {
          DEFAULT: '#0A1319',
        },
        surface: {
          DEFAULT: '#11586B',
          muted: '#3F616A',
        },
        accent: {
          DEFAULT: '#59ACB7',
          bright: '#71D5D9',
          hover: '#4E9BA5',
        },
        paper: {
          DEFAULT: '#BDEAEB',
          muted: '#567B81',
        },
        teal: {
          950: '#0A1319',
          900: '#11586B',
          800: '#3F616A',
          600: '#567B81',
          500: '#59ACB7',
          400: '#71D5D9',
          200: '#BDEAEB',
        },
        // â”€â”€ Legacy tokens remapped â”€â”€
        void: {
          DEFAULT: '#0A1319',
          900:     '#0A1319',
        },
        deepspace: {
          DEFAULT: '#11586B',
        },
        warmwhite: {
          DEFAULT: '#BDEAEB',
          muted:   '#567B81',
        },
        acid: {
          DEFAULT: '#71D5D9',
          hover:   '#59ACB7',
          glow:    'rgba(113, 213, 217, 0.5)',
        },
        cobalt: {
          DEFAULT: '#11586B',
        },
        violet: {
          DEFAULT: '#59ACB7',
          glow:    'rgba(89, 172, 183, 0.4)',
        },
        cyan: {
          DEFAULT: '#71D5D9',
          glow:    'rgba(113, 213, 217, 0.4)',
        },
        magenta: {
          DEFAULT: '#567B81',
          glow:    'rgba(86, 123, 129, 0.4)',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Syne', 'sans-serif'],
        syne:    ['Syne', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'acid-glow':    '0 0 35px rgba(113, 213, 217, 0.45)',
        'violet-glow':  '0 0 35px rgba(89, 172, 183, 0.4)',
        'cyan-glow':    '0 0 35px rgba(113, 213, 217, 0.4)',
        'magenta-glow': '0 0 35px rgba(86, 123, 129, 0.4)',
        'teal-glow':    '0 0 35px rgba(113, 213, 217, 0.45)',
      },
    },
  },
  plugins: [],
}
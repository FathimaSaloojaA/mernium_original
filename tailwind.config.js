/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#07080D',
          900: '#07080D',
        },
        deepspace: {
          DEFAULT: '#0D1020',
        },
        warmwhite: {
          DEFAULT: '#F4F1E8',
          muted: '#B8B8B2',
        },
        acid: {
          DEFAULT: '#C7FF3D',
          hover: '#B2F020',
          glow: 'rgba(199, 255, 61, 0.5)',
        },
        violet: {
          DEFAULT: '#7657FF',
          glow: 'rgba(118, 87, 255, 0.4)',
        },
        cyan: {
          DEFAULT: '#42DFFF',
          glow: 'rgba(66, 223, 255, 0.4)',
        },
        magenta: {
          DEFAULT: '#C83CFF',
          glow: 'rgba(200, 60, 255, 0.4)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Syne', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'acid-glow': '0 0 35px rgba(199, 255, 61, 0.4)',
        'violet-glow': '0 0 35px rgba(118, 87, 255, 0.4)',
        'cyan-glow': '0 0 35px rgba(66, 223, 255, 0.4)',
        'magenta-glow': '0 0 35px rgba(200, 60, 255, 0.4)',
      },
    },
  },
  plugins: [],
}

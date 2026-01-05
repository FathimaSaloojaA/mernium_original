/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#09090B',
          50: '#18181b',
          900: '#09090B',
        },
        paper: {
          DEFAULT: '#F2EFE7',
          muted: '#B8B8B2',
        },
        acid: {
          DEFAULT: '#C7FF3D',
          hover: '#b0f020',
          glow: 'rgba(199, 255, 61, 0.4)',
        },
        cobalt: {
          DEFAULT: '#5146E5',
          glow: 'rgba(81, 70, 229, 0.4)',
        },
        silver: '#B8B8B2',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Syne', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-acid-cobalt': 'linear-gradient(135deg, #C7FF3D 0%, #5146E5 100%)',
      },
      boxShadow: {
        'acid-glow': '0 0 35px rgba(199, 255, 61, 0.4)',
        'cobalt-glow': '0 0 35px rgba(81, 70, 229, 0.4)',
      },
    },
  },
  plugins: [],
}

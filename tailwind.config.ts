import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Inter', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        orion: {
          bg: "#0b0b0d",
          panel: "#141417",
          border: "#232328",
          text: "#EDEDF2",
          sub: "#B8B8C2",
          red: "#E50914"
        }
      },
      boxShadow: {
        soft: "0 12px 36px rgba(0,0,0,.35)"
      }
    },
  },
  plugins: [],
} satisfies Config;

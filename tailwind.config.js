/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 东方能量品牌色系
        earth: {
          50:  '#fdf8f0',
          100: '#faefd9',
          200: '#f4dab0',
          300: '#ecc07d',
          400: '#e39f48',
          500: '#d9892a',
          600: '#c06e1e',
          700: '#9f541a',
          800: '#81431c',
          900: '#6a391a',
        },
        sage: {
          50:  '#f3f8f0',
          100: '#e4f0db',
          200: '#cae1bb',
          300: '#a5cb8f',
          400: '#7bb063',
          500: '#5a9443',
          600: '#457633',
          700: '#375e2b',
          800: '#2e4c25',
          900: '#274020',
        },
        sand: {
          50:  '#fdfaf5',
          100: '#faf3e7',
          200: '#f3e4cb',
          300: '#e9cfa3',
          400: '#dcb472',
          500: '#d09a4a',
          600: '#c1833d',
          700: '#a16832',
          800: '#82532d',
          900: '#6a4527',
        },
        warm: {
          50:  '#fff8f1',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
        }
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        serif: ['Noto Serif SC', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
    },
  },
  plugins: [],
}

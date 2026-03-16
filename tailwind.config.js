/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fffbf0',
          100: '#fef3d0',
          200: '#fce49a',
          300: '#f9cf58',
          400: '#f5b820',
          500: '#e8a00a',
          600: '#cc7d04',
          700: '#a85c07',
          800: '#8a480d',
          900: '#723c11',
          950: '#431f05',
        },
        forest: {
          50:  '#f0faf2',
          100: '#dcf5e2',
          200: '#bbebc7',
          300: '#8ed9a2',
          400: '#5bc077',
          500: '#38a354',
          600: '#278442',
          700: '#216937',
          800: '#1e542d',
          900: '#1a4527',
          950: '#0d2616',
        },
        ink: {
          50:  '#f6f6f7',
          100: '#e2e3e6',
          200: '#c5c7cc',
          300: '#a0a3ac',
          400: '#7d8190',
          500: '#636677',
          600: '#4e5163',
          700: '#41424f',
          800: '#383844',
          900: '#31323b',
          950: '#1c1c23',
        },
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
        serif: ['Noto Serif SC', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow-brand': '0 0 40px rgba(248, 176, 32, 0.3)',
        'glow-forest': '0 0 40px rgba(56, 163, 84, 0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.07)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.14)',
        'nav': '0 1px 0 rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
}

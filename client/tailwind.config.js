/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1F3864',
        saffron: '#B45309',
        success: '#15803D',
        warning: '#D97706',
        danger: '#B91C1C',
        appbg: '#F7F8FA',
        card: '#FFFFFF',
        info: '#EDF2F9',
        warm: '#FFF4E5',
        rule: '#E4E9F2',
        muted: '#6B7280',
        ink: '#1A1A1A',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
        sheet: '24px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(31,56,100,0.06), 0 1px 2px rgba(31,56,100,0.04)',
        softlg: '0 8px 24px rgba(31,56,100,0.10)',
        frame: '0 24px 70px rgba(31,56,100,0.28)',
      },
      fontVariantNumeric: {
        tabular: 'tabular-nums',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.4s infinite linear',
      },
    },
  },
  plugins: [],
}

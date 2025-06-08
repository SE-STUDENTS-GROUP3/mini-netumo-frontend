/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // Add any other file paths that contain Tailwind classes
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          DEFAULT: '#3B82F6',
          500: '#3B82F6',
          600: '#2563EB',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          DEFAULT: '#EF4444',
          500: '#EF4444',
          600: '#DC2626',
        },
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          DEFAULT: '#10B981',
          500: '#10B981',
          600: '#059669',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          DEFAULT: '#F59E0B',
          500: '#F59E0B',
          600: '#D97706',
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideDown: 'slideDown 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Optional: if using form elements
    require('@tailwindcss/typography'), // Optional: if using prose
  ],
}

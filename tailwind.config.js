/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F9FA',
        surface: '#F8F9FA',
        'surface-card': '#F8F9FC',
        'surface-low': '#FFFFFF',
        'on-surface': '#121317',
        'on-surface-variant': '#45474D',
        primary: '#121317',
        'primary-hover': '#2F3034',
        'on-primary': '#FFFFFF',
        overlay: 'rgba(33, 34, 38, 0.06)',
        'overlay-strong': 'rgba(255, 255, 255, 0.85)',
        outline: 'rgba(33, 34, 38, 0.06)',
      },
      fontFamily: {
        sans: ["'Google Sans Flex'", "'Google Sans'", '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ["'Google Sans Flex'", "'Google Sans'", '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ["'Google Sans Flex'", "'Google Sans'", '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '36px',
        full: '9999px',
      },
      spacing: {
        xs: '4px',
        sm: '6px',
        md: '16px',
        lg: '24px',
        xl: '36px',
        gutter: '8px',
        section: '120px',
      },
    },
  },
  plugins: [],
}

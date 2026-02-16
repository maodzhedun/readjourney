/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
      colors: {
        primary: '#f9f9f9',
        secondary: '#1f1f1f',
        accent: '#e90516',
        muted: '#686868',
        border: '#3e3e3e',
        'input-bg': '#262626',
        bg: '#141414',
      },
    },
  },
  plugins: [],
};

module.exports = {
  content: ['./**/*.{tsx,jsx}', '**/use*.{ts,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DMSans_400Regular'],
        'sans-italic': ['DMSans_400Regular_Italic'],
        'sans-bold': ['DMSans_700Bold'],
        'sans-bold-italic': ['DMSans_700Bold_Italic'],
        'sans-semibold': ['DMSans_500Medium'],
        'sans-semibold-italic': ['DMSans_500Medium_Italic'],
        mono: ['Courier New', 'monospace'],
      },
      colors: {
        notification_red: '#ef361e',
      },
      lineHeight: {
        4.5: '1.25rem',
      },
      maxWidth: {
        '3/4': '75%',
      },
      borderRadius: {},
      letterSpacing: {},
      spacing: {},
    },
  },
  plugins: [],
};

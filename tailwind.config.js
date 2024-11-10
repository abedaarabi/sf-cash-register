module.exports = {
  theme: {
    extend: {
      colors: {
        indigo: {
          50: '#EEF2FF',
          // ... other shades
          600: '#6366F1',
          700: '#4F46E5',
        }
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
} 
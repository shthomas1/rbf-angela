const theme = {
  colors: {
    primary: '#4361ee',       // Changed the primary color to be less purple
    primaryLight: '#4895ef',
    primaryDark: '#3a0ca3',
    secondary: '#f72585',     // Changed to a more vibrant pink
    secondaryLight: '#f94144',
    secondaryDark: '#f94144',
    tertiary: '#4cc9f0',
    dark: '#0a192f',          // Darker background
    light: '#f8f9fa',         // Lighter background
    gray: '#64748b',
    grayLight: '#e2e8f0',
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
  },
  fonts: {
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',  // Added extra breakpoint for large screens
  },
  spacing: {
    section: {
      desktop: '6rem 0',      // Reduced spacing on desktop
      mobile: '4rem 0',
    }
  },
  maxWidth: '1140px',         // Narrower max-width for better readability
};

export default theme;
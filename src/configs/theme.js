import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A4CFF'
    },
    secondary: {
      main: '#051B6C'
    },
    white: {
      main: '#ffffff'
    },
    black: {
      main: '#000000'
    },
    text: {
      primary: '#000000',
      disabled: '#6A6F75'
    },
    background: {
      default: '#FFF',
      paper: '#FAFAFA'
    },
    action: {
      disabled: '#C0C0C0',
      disabledBackground: '#C0C0C0'
    }
  },
  typography: {
    allVariants: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: {
        xs: '.75rem',
        sm: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem'
      }
    }
  },
  shape: {
    borderRadius: 20
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  }
});

export default theme;

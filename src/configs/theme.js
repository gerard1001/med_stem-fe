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
      fontFamily: ['Inter', 'sans-serif'].join(',')
      // fontSize: {
      //   xs: '.75rem',
      //   sm: '.875rem',
      //   base: '1rem',
      //   lg: '1.125rem',
      //   xl: '1.25rem',
      //   '2xl': '1.5rem',
      //   '3xl': '1.875rem',
      //   '4xl': '2.25rem',
      //   '5xl': '3rem',
      //   '6xl': '4rem'
      // }
    }
  },
  shape: {
    borderRadius: 5
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-size: 30px;
        }
      `
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '0.75rem',
          letterSpacing: '-0.05em',
          lineHeight: 1.2
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          ['& .Mui-focused']: {
            border: 'none'
          }
        }
      }
    },
    MuiFormGroup: {
      defaultProps: {
        row: true
      },
      styleOverrides: {
        root: {
          flexWrap: 'nowrap'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize'
          // fontSize: '18px'
        }
      }
    }
  }
});

export default theme;

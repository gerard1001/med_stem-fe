import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light: '#71A9F7',
      main: '#1A4CFF',
      dark: '#214ADD'
    },
    secondary: {
      light: '#0800AF',
      main: '#051B6C'
    },
    white: {
      main: '#ffffff'
    },
    black: {
      main: '#2E3033'
    },
    gray: {
      light: '#EEF1F5',
      main: '#6A6F75'
    },
    text: {
      primary: '#2E3033',
      disabled: '#6A6F75'
    },
    action: {
      // disabled: '#C0C0C0',
      disabledBackground: '#C0C0C0'
    }
  },
  typography: {
    allVariants: {
      fontFamily: 'Inter, sans-serif'
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
          '& .Mui-focused': {
            border: 'none'
          },
          borderRadius: '10px'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '10px'
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
          borderRadius: '16px',
          textTransform: 'capitalize',
          paddingLeft: '1rem',
          paddingRight: '1rem'
          // fontSize: '18px'
        },
        outlined: {
          borderWidth: '1px',
          borderColor: 'primary.main',
          ':hover': {
            borderWidth: '1px',
            backgroundColor: '#d2dbff'
          }
        }
      }
    },
    MuiTableCell: {
      head: {
        backgroundColor: 'red !important'
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'primary.dark'
        }
      }
    }
  }
});

export default theme;

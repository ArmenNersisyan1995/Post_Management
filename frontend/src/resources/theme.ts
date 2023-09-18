import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#358fa2',
      contrastText: '#fff',
    },
    secondary: {
      light: '#E4E4E4',
      main: '#646571',
      dark: '#303141',
      contrastText: '#fff',
    },
    warning: {
      light: '#FCEAB8',
      main: '#F9A53E',
      dark: '#F6943E',
      contrastText: '#fff',
    },
    error: {
      light: '#F8B9C4',
      main: '#E9425E',
      dark: '#A62636',
      contrastText: '#fff',
    },
    grey: {
      100: '#F3F3F3',
      200: '#E4E4E4',
      400: '#CBCBCF',
      500: '#97979F',
      600: '#646571',
      700: '#303141',
    },
    action: {
      disabled: '',
      disabledBackground: '',
    },
  },

  typography: {
    h6: {
      lineHeight: 1.2,
    },
  },

  components: {

    MuiDrawer: {
      styleOverrides: {
        root: {
          '.MuiDrawer-paper': {
          },
          color: '#344052',
        },
      },
    },

    MuiTablePagination: {
      styleOverrides: {
        root: {
          overflow: 'hidden',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            opacity: 0.5,
          },
        },
      },
    },
  },
});

export default theme;

import { ThemeOptions } from '@mui/material';

const muiTheme: ThemeOptions = {
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontFamily: 'Montserrat',
      fontSize: '60px',
      fontWeight: 500,
    },
    h2: {
      fontFamily: 'Montserrat',
      fontSize: '38px',
      fontWeight: 400,
      display: 'block',
    },
    h3: {
      fontFamily: 'Montserrat',
      fontSize: '24px',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Montserrat',
      fontSize: '20px',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Montserrat',
      fontSize: '16px',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Montserrat',
      fontSize: '16px',
      fontWeight: 'normal',
    },
    body1: {
      fontFamily: 'Montserrat',
      fontSize: '14px',
      fontWeight: 'normal',
      display: 'block',
    },
    body2: {
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 'normal',
    },
    caption: {
      fontFamily: 'Open Sans',
      fontSize: '12px',
      fontWeight: 'normal',
    },
    button: {
      textTransform: 'none',
      fontFamily: 'Open Sans',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    subtitle1: {
      fontFamily: 'Open Sans',
      fontSize: '12px',
      fontWeight: 'bold',
    },
    // subtitle2: {
    //   ...subtitle2Styles,
    // },
    overline: {
      fontFamily: 'Open Sans',
      fontSize: '12px',
      fontWeight: 600,
      textTransform: 'capitalize',
    },
  },
};

export default muiTheme;

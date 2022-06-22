import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Routes from 'routes';
import muiTheme from 'theme';

const App = () => {
  const theme = createTheme(muiTheme);
  return (
    <Router>
      <CookiesProvider>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <ToastContainer />
            <Routes />
          </ThemeProvider>
        </RecoilRoot>
      </CookiesProvider>
    </Router>
  );
};

export default App;

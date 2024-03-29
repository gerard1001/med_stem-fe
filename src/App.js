import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './configs/routes';
import theme from './configs/theme';
import store from './redux/store';

// const cache = createCache({
//   key: 'css'
// });

function App() {
  return (
    // <CacheProvider value={cache}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <RouterProvider router={routes} />
          <ToastContainer theme="colored" />
        </LocalizationProvider>
      </Provider>
    </ThemeProvider>
    // </CacheProvider>
  );
}

export default App;

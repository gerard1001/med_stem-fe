import { ThemeProvider } from '@mui/material';
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './configs/routes';
import theme from './configs/theme';
import './index.css';
import store from './redux/store';

global.React = React;

const container = document.getElementById('root');
ReactDOMClient.createRoot(container).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <RouterProvider router={routes} />
      <ToastContainer theme="colored" />
    </Provider>
  </ThemeProvider>
);

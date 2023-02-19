import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './redux/store';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root');
ReactDOMClient.createRoot(container).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer theme="colored" />
    </BrowserRouter>
  </Provider>
);

import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import './index.css';

global.React = React;

const container = document.getElementById('root');
ReactDOMClient.createRoot(container).render(<App />);

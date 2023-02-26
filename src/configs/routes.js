import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Analytics from '../pages/Analytics';
import Dashboard from '../pages/Dashboard';
import LandingPage from '../pages/LandingPage';
import SchedulePage from '../pages/SchedulePage';
import Form from '../pages/Form';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    children: []
  },
  {
    path: '/form',
    element: <Form />,
    children: []
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: '',
        element: <Analytics />
      },
      {
        path: 'schedule',
        element: <SchedulePage />
      }
    ]
  }
]);

export default routes;

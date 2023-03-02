import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Analytics from '../pages/Analytics';
import Dashboard from '../pages/Dashboard';
import LandingPage from '../pages/LandingPage';
import SchedulePage from '../pages/SchedulePage';
import Form from '../pages/Form';
import About from '../pages/About';
import FindDoctor from '../pages/FindDoctor';
import SpecialityDoctor from '../pages/SpecialityDoctor';
import DoctorPage from '../pages/DoctorPage';
import DashboardSideBar from '../components/DashboardSideBar';
import PatientProfile from '../pages/PatientProfile';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    children: []
  },
  {
    path: '/about',
    element: <About />,
    children: []
  },
  {
    path: '/signup',
    element: <Form />,
    children: []
  },
  {
    path: '/find_doctor',
    element: <FindDoctor />,
    children: []
  },
  {
    path: '/doctor_page/:id',
    element: <DoctorPage />,
    children: []
  },
  {
    path: '/speciality/:id',
    element: <SpecialityDoctor />,
    children: []
  },
  {
    path: '/patient_profile',
    element: <PatientProfile />,
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

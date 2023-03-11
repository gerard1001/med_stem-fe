import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
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
import PatientAppointments from '../pages/PatientAppointments';
import Login from '../pages/Login';
import DoctorProfile from '../pages/DoctorProfile';
import Calendar from '../components/Calendar';
import PatientsCalendar from '../pages/PatientsCalendar';
import DoctorPatient from '../pages/DoctorPatient';
import DoctorSignupForm from '../components/DoctorSignupForm';
import AddSpecialityForm from '../components/AddSpecialityForm';
import AdminCalendar from '../pages/AdminCalendar';
import Account from '../pages/Account';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/signup',
    element: <Form />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/find_doctor',
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <FindDoctor />
      },
      {
        path: 'doctor_page/:id',
        element: <DoctorPage />
      },
      {
        path: 'speciality/:id',
        element: <SpecialityDoctor />
      },
      {
        path: 'appointment/:id',
        element: <PatientsCalendar />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'patient',
        element: <Outlet />
      },
      {
        path: 'account',
        element: <Account />
      },
      {
        path: 'appointments',
        element: <PatientAppointments />
      },
      {
        path: 'analytics',
        element: <Analytics />
      },
      {
        path: 'schedule',
        element: <SchedulePage />
      },
      {
        path: 'add',
        element: <Outlet />,
        children: [
          {
            path: 'speciality',
            element: <AddSpecialityForm />
          },
          {
            path: 'schedule',
            element: <AdminCalendar />
          },
          {
            path: 'doctor',
            element: <DoctorSignupForm />
          }
        ]
      }
    ]
  },

  {
    path: '/doctor',
    element: <DoctorPatient />,
    children: []
  }, // will be sent to its appropriate page shortlly
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);

export default routes;

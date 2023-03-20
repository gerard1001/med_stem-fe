import React from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import AddSpecialityForm from '../components/AddSpecialityForm';
import DoctorSignupForm from '../components/DoctorSignupForm';
import About from '../pages/About';
import Account from '../pages/Account';
import AdminCalendar from '../pages/AdminCalendar';
import Analytics from '../pages/Analytics';
import Bill from '../pages/Bill';
import Dashboard from '../pages/Dashboard';
import DoctorPage from '../pages/DoctorPage';
import DoctorPatient from '../pages/DoctorPatient';
import FindDoctor from '../pages/FindDoctor';
import Form from '../pages/Form';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import PatientAppointments from '../pages/PatientAppointments';
import PatientsCalendar from '../pages/PatientsCalendar';
import SchedulePage from '../pages/SchedulePage';
import SpecialityDoctor from '../pages/SpecialityDoctor';
import AppointmentPage from '../components/Appointment/AppointmentPage';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import PatientSignupForm from '../components/PatientSignupForm';

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
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset',
    element: <ResetPassword />
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
        path: 'account',
        element: <Account />
      },
      {
        path: 'appointments',
        element: <PatientAppointments />
      },
      {
        path: 'patient',
        element: <DoctorPatient />
      },
      {
        path: 'analytics',
        element: <Analytics />
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
          },
          {
            path: 'patient',
            element: <PatientSignupForm />
          }
        ]
      }
    ]
  },

  // Later redirects

  {
    path: '/doctor',
    element: <DoctorPatient />,
    children: []
  },
  {
    path: '/dashboard/appointments/:id',
    element: <AppointmentPage />
  },

  // removed

  // {
  //   path: 'schedule',
  //   element: <SchedulePage />
  // },
  // {
  //   path: 'bill',
  //   element: <Bill />
  // },
  // {
  //   path: '/test1',
  //   element: <PatientProfile />,
  //   children: []
  // },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);

export default routes;

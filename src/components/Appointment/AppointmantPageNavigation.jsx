import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  toPreviousAppointments,
  toExpectedAppointments,
  toAdminPatientExpectedAppointments,
  toAdminPatientPersonalDetails,
  toAdminPatientPreviousAppointments
} from '../../redux/reducers/step.reducer';

const AppointmantPageNavigation = ({ appointment }) => {
  const step = useSelector((state) => state.step.appointment_step);
  const admin_step = useSelector((state) => state.step.admin_patient_step);
  const dispatch = useDispatch();
  const isClient =
    JSON.parse(localStorage.getItem('userLoginData'))?.user?.Role.role ===
    'client';
  const nav = useNavigate();
  return (
    <div>
      {isClient && (
        <Box className="flex items-center gap-10 mt-8 mb-5">
          <Typography
            variant="subtitle1"
            fontWeight="600"
            fontSize="17px"
            className={`${
              step === 0 && 'text-primary underline'
            }  cursor-pointer`}
            onClick={() => {
              nav('/dashboard/appointments');
              dispatch(toExpectedAppointments());
            }}
          >
            Expected Appointments
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="600"
            fontSize="17px"
            className={`${
              step === 1 && 'text-primary underline'
            }  cursor-pointer`}
            onClick={() => {
              nav('/dashboard/appointments');
              dispatch(toPreviousAppointments());
            }}
          >
            Previous Appointments
          </Typography>
        </Box>
      )}
      {!isClient && (
        <Box className="flex items-center gap-10 mt-8 mb-5">
          <Typography
            variant="subtitle1"
            fontWeight="600"
            fontSize="17px"
            className={`${
              admin_step === 0 && 'text-primary underline'
            }  cursor-pointer`}
            onClick={() => {
              nav(`/dashboard/patient/profile/${appointment.client_id}`);
              dispatch(toAdminPatientPersonalDetails());
            }}
          >
            Personal Information
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="600"
            fontSize="17px"
            className={`${
              admin_step === 1 && 'text-primary underline'
            }  cursor-pointer`}
            onClick={() => {
              nav(`/dashboard/patient/profile/${appointment.client_id}`);
              dispatch(toAdminPatientExpectedAppointments());
            }}
          >
            Expected Appointments
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="600"
            fontSize="17px"
            className={`${
              admin_step === 2 && 'text-primary underline'
            }  cursor-pointer`}
            onClick={() => {
              nav(`/dashboard/patient/profile/${appointment.client_id}`);
              dispatch(toAdminPatientPreviousAppointments());
            }}
          >
            Previous Appointments
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default AppointmantPageNavigation;

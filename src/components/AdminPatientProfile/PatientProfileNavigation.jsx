import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toAdminPatientExpectedAppointments,
  toAdminPatientPersonalDetails,
  toAdminPatientPreviousAppointments
} from '../../redux/reducers/step.reducer';
import { Box, Typography } from '@mui/material';

const PatientProfileNavigation = () => {
  const step = useSelector((state) => state.step.admin_patient_step);
  const patient = useSelector((state) => state.patient.single_data.data);

  const dispatch = useDispatch();

  return (
    <div>
      <Box className="flex flex-center gap-3">
        <Typography variant="h6">Profile</Typography>
        <Typography variant="h6">-</Typography>
        <Typography variant="h6">
          {patient?.first_name} {patient?.last_name}
        </Typography>
      </Box>
      <Box className="flex items-center gap-10 mt-8 mb-5">
        <Typography
          variant="subtitle1"
          fontWeight="600"
          fontSize="18px"
          className={`${
            step === 0 && 'text-primary underline'
          }  cursor-pointer`}
          onClick={() => {
            dispatch(toAdminPatientPersonalDetails());
          }}
        >
          Personal information
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight="600"
          fontSize="18px"
          className={`${
            step === 1 && 'text-primary underline'
          }  cursor-pointer`}
          onClick={() => {
            dispatch(toAdminPatientExpectedAppointments());
          }}
        >
          Expected Appointments
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight="600"
          fontSize="18px"
          className={`${
            step === 2 && 'text-primary underline'
          }  cursor-pointer`}
          onClick={() => {
            dispatch(toAdminPatientPreviousAppointments());
          }}
        >
          Previous Appointments
        </Typography>
      </Box>
    </div>
  );
};

export default PatientProfileNavigation;

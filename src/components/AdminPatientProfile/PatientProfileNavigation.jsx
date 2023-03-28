import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toAdminPatientExpectedAppointments,
  toAdminPatientMedicalHistory,
  toAdminPatientPersonalDetails,
  toAdminPatientPreviousAppointments,
  toDoctorPatientMedicalHistory
} from '../../redux/reducers/step.reducer';
import { Box, Typography } from '@mui/material';
import BackButton from '../BackButton';

const PatientProfileNavigation = () => {
  const step = useSelector((state) => state.step.admin_patient_step);
  const patient = useSelector((state) => state.patient?.single_data?.data);

  const isDoctor =
    JSON.parse(localStorage.getItem('userLoginData'))?.user?.Role.role ===
    'doctor';
  const isAdmin =
    JSON.parse(localStorage.getItem('userLoginData'))?.user?.Role.role ===
    'admin';

  const dispatch = useDispatch();

  return (
    <div>
      <Box className="flex flex-center gap-3">
        <BackButton />
        <Typography variant="h6">Profile</Typography>
        <Typography variant="h6">-</Typography>
        <Typography variant="h6">
          {patient?.first_name} {patient?.last_name}
        </Typography>
      </Box>
      <Box className="flex items-center gap-10 mt-8 mb-5 md:overflow-auto">
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
        {/* {isDoctor && ( */}
        <Typography
          variant="subtitle1"
          fontWeight="600"
          fontSize="17px"
          className={`${
            step === 3 && 'text-primary underline'
          }  cursor-pointer`}
          onClick={() => {
            // isAdmin && dispatch(toAdminPatientMedicalHistory());
            dispatch(toDoctorPatientMedicalHistory());
          }}
        >
          Medical History
        </Typography>
        {/* )} */}
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

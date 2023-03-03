import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toPersonalInfo,
  toContactInfo,
  toMedicalHistory
} from '../../redux/reducers/step.reducer';
import { Box, Typography } from '@mui/material';

const PatientProfileNavigation = () => {
  const step = useSelector((state) => state.step.profile_step);
  const patient = useSelector((state) => state.patient.single_data.data);

  const dispatch = useDispatch();

  console.log(step, '***********');

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
            dispatch(toPersonalInfo());
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
            dispatch(toContactInfo());
          }}
        >
          Account details
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight="600"
          fontSize="18px"
          className={`${
            step === 2 && 'text-primary underline'
          }  cursor-pointer`}
          onClick={() => {
            dispatch(toMedicalHistory());
          }}
        >
          Medical History
        </Typography>
      </Box>
    </div>
  );
};

export default PatientProfileNavigation;

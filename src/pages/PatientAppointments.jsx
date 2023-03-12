import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import ExpectedAppointment from '../components/PatientAppointmentSteps/ExpectedAppointment';
import PreviousAppointment from '../components/PatientAppointmentSteps/PreviousAppointment';
import AppointmentDisplay from '../components/PatientAppointmentSteps/AppointmentDisplay';

const PatientAppointments = () => {
  const step = useSelector((state) => state.step.appointment_step);
  return (
    <Box className="w-full h-full p-16 md:p-8  mx-auto max-w-[1200px]">
      {step === 0 && <ExpectedAppointment />}
      {step === 1 && <PreviousAppointment />}
    </Box>
  );
};

export default PatientAppointments;

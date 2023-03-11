import { Box } from '@mui/material';
import React from 'react';
import PatientProfile from './PatientProfile';

const Account = () => {
  return (
    <Box className="w-full h-full max-w-[1200px] mx-auto p-16 md:p-8">
      <PatientProfile />
    </Box>
  );
};

export default Account;

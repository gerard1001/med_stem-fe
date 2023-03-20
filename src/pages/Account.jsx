import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import AdminProfile from './AdminProfile';
import DoctorProfile from './DoctorProfile';
import PatientProfile from './PatientProfile';

const Account = () => {
  const { loginData } = useSelector((state) => state.user);

  const role = loginData?.Role?.role;

  return (
    <Box className="w-full h-full max-w-[2000px] mx-auto p-8 md:p-4">
      {role === 'client' && <PatientProfile />}
      {role === 'admin' && <AdminProfile />}
      {role === 'doctor' && <DoctorProfile />}
    </Box>
  );
};

export default Account;

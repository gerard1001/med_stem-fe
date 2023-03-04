import React from 'react';
import DashboardSideBar from '../components/DashboardSideBar';
import { useSelector, useDispatch } from 'react-redux';
import { getOneDoctor } from '../redux/reducers/doctor.reducer';
import { Box, Typography } from '@mui/material';

const DoctorProfile = () => {
  const doctor = useSelector((state) => state.doctor.single_data.data);

  const dispatch = useDispatch();

  const doctorId = '64ff1279-8b59-4143-8e6c-a0c8f38bf9d5';

  React.useEffect(() => {
    dispatch(getOneDoctor(doctorId));
  }, []);

  return (
    <Box className="pl-[220px] md:pl-0 pt-20">
      <DashboardSideBar />
      <Box className="w-[90%] bg-slate-500 block mx-auto">
        <Box>
          <Typography variant="h6">Profile and Settings</Typography>
        </Box>
        <Box className="flex flex-row items-start w-[90%] mx-auto h-[90vh] bg-yellow-500">
          <Box className="h-[90vh] bg-emerald-500"></Box>
          <Box className="h-[90vh] bg-sky-400"></Box>
          <Box className="h-[90vh] bg-fuchsia-500"></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorProfile;

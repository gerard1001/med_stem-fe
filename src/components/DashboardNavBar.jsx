import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FiChevronLeft } from 'react-icons/fi';
import { useSelector } from 'react-redux';

function DashboardNavBar({
  rightSideBarContent,
  toggleRightSideBar,
  toggleLeftSideBar
}) {
  const loggedInUser = useSelector((state) => state.user.loginData);
  const doctorLoginData = useSelector(
    (state) => state.doctor?.single_data?.data
  );
  const [isDoctor, setIsDoctor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [doctorName, setDoctorName] = useState('Not Available');

  useEffect(() => {
    if (loggedInUser?.role_id === 2) {
      setIsDoctor(true);
      setDoctorName(loggedInUser.loginData?.last_name);
    }
    if (loggedInUser?.role_id === 1) {
      setIsAdmin(true);
      setDoctorName(loggedInUser.loginData?.last_name);
    }
  }, [loggedInUser]);
  useEffect(() => {
    if (doctorLoginData) {
      setDoctorName(doctorLoginData.last_name);
    }
  }, [doctorLoginData]);

  return (
    <Box
      className="flex flex-row items-center justify-between border-b border-primary min-h-[64px] pl-6"
      sx={{
        width: '100%',
        height: '64px'
      }}
    >
      <Box className="flex flex-row items-center">
        <IconButton
          onClick={toggleLeftSideBar}
          sx={{ display: { md: 'none', xs: 'block' } }}
        >
          <FaBars />
        </IconButton>
        <Typography
          variant="subtitle1"
          color="primary"
          fontWeight="bold"
          fontSize={{ xs: '17.5px', md: '20px' }}
        >
          MedStem
        </Typography>
      </Box>
      <Box className="pr-5">
        <Typography variant="subtitle1" color="primary">
          <p className="leading-5">Hello,</p>
          {isDoctor && <p className="leading-5">Dr. {doctorName}</p>}
          {isAdmin && <p className="leading-5">Admin {doctorName}</p>}

          {rightSideBarContent && (
            <IconButton
              sx={{
                position: 'absolute',
                backgroundColor: '#9b9b9b2d',
                color: '#000',
                top: '80px',
                right: '24px',
                display: { md: 'none', xs: 'block' }
              }}
              onClick={toggleRightSideBar}
            >
              <FiChevronLeft />
            </IconButton>
          )}
        </Typography>
      </Box>
    </Box>
  );
}

export default DashboardNavBar;

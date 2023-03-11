import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { FaBars } from 'react-icons/fa';
import { FiChevronLeft } from 'react-icons/fi';

function DashboardNavBar({
  rightSideBarContent,
  toggleRightSideBar,
  toggleLeftSideBar
}) {
  return (
    <Box
      className="flex flex-row items-center justify-between border-b border-primary"
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
          fontSize="16px"
        >
          MedStem
        </Typography>
      </Box>
      <Box className="pr-5">
        <Typography variant="subtitle1" color="primary">
          <p className="leading-5">Hello,</p>
          <p className="leading-5">Dr. Kim</p>

          {rightSideBarContent && (
            <IconButton
              sx={{
                position: 'absolute',
                backgroundColor: '#9b9b9b2d',
                color: '#000',
                top: '64px',
                right: '16px',
                display: { md: 'none', xs: 'block' }
              }}
            >
              <FiChevronLeft onClick={toggleRightSideBar} />
            </IconButton>
          )}
        </Typography>
      </Box>
    </Box>
  );
}

export default DashboardNavBar;

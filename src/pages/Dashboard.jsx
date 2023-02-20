import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import DashboardNavBar from '../components/DashboardNavBar';

function Dashboard() {
  return (
    <Box>
      <DashboardNavBar />
      {/* You will have to rework here and make the sidebars and main content into sections that can be reusable
          Maybe by creating a component that is called page that accept main, rightsidebar, leftsidebar and their function to open or
          close them thenuse this component here.
       */}
      <Outlet />
    </Box>
  );
}

export default Dashboard;

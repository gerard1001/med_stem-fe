import { Box, Drawer, useMediaQuery } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import DashboardLeftSideBar from '../components/DashboardLeftSideBar';
import DashboardNavBar from '../components/DashboardNavBar';
import HomeNavBar from '../components/HomeNavBar';
import DashboardContextProvider, {
  DashboardContext
} from '../context/DashboardContext';
import { setLoginData } from '../redux/reducers/user.reducer';

const Dashboard = () => {
  const { pathname } = useLocation();
  const userData = JSON.parse(localStorage.getItem('userLoginData'));

  const dispatch = useDispatch();
  const [openLeftSideBar, setOpenLeftSideBar] = useState(false);
  const [openRightSideBar, setOpenRightSideBar] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isClient = userData?.user?.Role?.role === 'client';

  const { rightSideBarContent, rightSideBarSize } =
    useContext(DashboardContext);

  const toggleLeftSideBar = () => {
    setOpenLeftSideBar((open) => !open);
  };
  const toggleRightSideBar = () => {
    setOpenRightSideBar((open) => !open);
  };

  useEffect(() => {
    if (!isMobile && !openLeftSideBar) {
      setOpenLeftSideBar(true);
    } else {
      setOpenLeftSideBar(false);
    }
    if (!isMobile && !openRightSideBar && rightSideBarContent) {
      setOpenRightSideBar(true);
    } else {
      setOpenRightSideBar(false);
    }
  }, [isMobile]);
  useEffect(() => {
    dispatch(setLoginData(userData?.user));
  }, []);

  if (!userData?.token) {
    return <Navigate to="/login" replace />; // redirect to login if not logged in
  }
  if (pathname === '/dashboard') {
    switch (userData.user.Role.role) {
      case 'client':
        return <Navigate to="/dashboard/account" replace />;
      case 'doctor':
        return <Navigate to="/dashboard/analytics" replace />;
      default:
        return <Navigate to="/dashboard/analytics" replace />;
    }
  }

  return (
    <Box className="flex flex-col w-full h-full overflowy-hidden">
      {isClient ? (
        <HomeNavBar />
      ) : (
        <DashboardNavBar
          rightSideBarContent={rightSideBarContent}
          toggleRightSideBar={toggleRightSideBar}
          toggleLeftSideBar={toggleLeftSideBar}
        />
      )}
      <Box className="flex flex-row w-full grow overflow-y-auto bg-[#F5F5F5]">
        {!isClient && (
          <Drawer
            open={openLeftSideBar}
            anchor="left"
            variant={isMobile ? 'temporary' : 'permanent'}
            onClose={() => {
              setOpenLeftSideBar(false);
            }}
            sx={{
              '& .MuiDrawer-paper': {
                maxWidth: '250px',
                width: '100%'
              }
            }}
            classes={{
              paper: 'relative'
            }}
            ModalProps={{
              keepMounted: false
            }}
            className="transition duration-150 ease-in-out"
          >
            <DashboardLeftSideBar toggleLeftSideBar={toggleLeftSideBar} />
          </Drawer>
        )}
        <Box className="flex-1 h-full overflow-y-auto bg-[]">
          <Outlet />
        </Box>
        {rightSideBarContent && (
          <Drawer
            open={openRightSideBar}
            anchor="right"
            variant={isMobile ? 'temporary' : 'permanent'}
            onClose={() => {
              setOpenRightSideBar(false);
            }}
            sx={{
              '& .MuiDrawer-paper': {
                maxWidth: rightSideBarSize || '250px',
                width: '100%'
              }
            }}
            classes={{
              paper: isMobile ? 'absolute' : 'relative'
            }}
            ModalProps={{
              keepMounted: false
            }}
            className="transition duration-150 ease-in-out"
          >
            {rightSideBarContent}
          </Drawer>
        )}
      </Box>
    </Box>
  );
};

export default () => (
  <DashboardContextProvider>
    <Dashboard />
  </DashboardContextProvider>
);

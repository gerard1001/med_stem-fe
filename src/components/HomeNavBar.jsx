// import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import * as IoIcons from 'react-icons/io5';
import * as FaIcons from 'react-icons/fa';
// import { Box } from '@mui/material';

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

// const headerItems = ['Home', 'About us', 'Find a Doctor'];

// const HomeNavBar = () => {
//   const [onHome, setOnHome] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   return <div></div>;
// };

// export default HomeNavBar;

// <>
//   <div
//     className={`bg-white md:flex hidden  items-center justify-between text-primary fixed z-40 left-0 right-0 top-0 px-10 py-3 shadow-md border border-[#71A9F7]`}
//   >
//     <div className="text-xl font-bold ">MedStem</div>
//     <div>
//       <ul className="flex items-center gap-10 text-[18px] ">
//         <li
//           className={`${
//             onHome ? 'font-bold border-b border-primary' : ''
//           } cursor-pointer`}
//         >
//           Home
//         </li>
//         <li className="cursor-pointer">About us</li>
//         <li className="cursor-pointer">Find a Doctor</li>
//       </ul>
//     </div>
//     <div>
//       {!isLoggedIn ? (
//         <ul className="flex items-center text-[18px] gap-10">
//           <li className="cursor-pointer">Log In</li>
//           <li className="border border-primary px-4 py-1.5 rounded-xl cursor-pointer hover:bg-[#d2dbff] hover:border-white">
//             Sign Up
//           </li>
//         </ul>
//       ) : (
//         <ul className="flex items-center text-[18px] gap-10">
//           <li className="cursor-pointer">
//             <FiIcons.FiSearch />
//           </li>
//           <li className="cursor-pointer">Appointment</li>
//           <li className="cursor-pointer">Account</li>
//         </ul>
//       )}
//     </div>
//   </div>
//   <div
//     className={`bg-white md:hidden flex flex-col items-center justify-between text-primary fixed z-40 left-0 right-0 top-0 px-10 py-3 shadow-md border border-[#71A9F7]`}
//   >
//     <div>
//       <ul className="flex flex-col items-center gap-10 text-[18px] ">
//         <li
//           className={`${
//             onHome ? 'font-bold border-b border-primary' : ''
//           } cursor-pointer`}
//         >
//           Home
//         </li>
//         <li className="cursor-pointer">About us</li>
//         <li className="cursor-pointer">Find a Doctor</li>
//       </ul>
//     </div>
//     <div>
//       {!isLoggedIn ? (
//         <ul className="flex items-center text-[18px] gap-10">
//           <li className="cursor-pointer">Log In</li>
//           <li className="border border-primary px-4 py-1.5 rounded-xl cursor-pointer hover:bg-[#d2dbff] hover:border-white">
//             Sign Up
//           </li>
//         </ul>
//       ) : (
//         <ul className="flex items-center text-[18px] gap-10">
//           <li className="cursor-pointer">
//             <FiIcons.FiSearch />
//           </li>
//           <li className="cursor-pointer">Appointment</li>
//           <li className="cursor-pointer">Account</li>
//         </ul>
//       )}
//     </div>
//   </div>
//   {/* <div className="bg-white  flex z-10 items-center justify-between text-primary fixed left-0 right-0 top-0 px-10 py-3 shadow-md border border-[#71A9F7]">
//     <div className="font-bold">MedStem</div>
//     {!lapBar ? (
//       <Box className="text-secondary" onClick={() => setlapBar(true)}>
//         <FaIcons.FaBars />
//       </Box>
//     ) : (
//       <Box className="text-secondary" onClick={() => setlapBar(false)}>
//         <FaIcons.FaTimes />
//       </Box>
//     )}
//   </div> */}
// </>

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

const navItems = ['Home', 'About Us', 'Find a Doctor'];
const userItems = ['Login', 'Sign up'];

const HomeNavBar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const nav = useNavigate();

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {' '}
        <Typography variant="h6" color="primary" sx={{ my: 2 }}>
          MedStem
        </Typography>
        <IconButton
          color="primary"
          aria-label="open drawer"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <IoIcons.IoCloseSharp />
        </IconButton>
      </Box>

      <Divider />
      <List sx={{ color: '#1A4CFF' }}>
        {navItems.map((item, idx) => (
          <ListItem
            key={item}
            onClick={() => {
              idx === 0
                ? nav('/')
                : idx === 1
                ? nav('/about')
                : nav('/find_doctor');
            }}
          >
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
            <Divider />
          </ListItem>
        ))}
        {userItems.map((item, idx) => (
          <ListItem key={item}>
            <ListItemButton
              sx={{
                textAlign: 'center',
                ...(idx === 1 && {
                  border: '1px solid #1A4CFF',
                  borderRadius: '10px'
                })
              }}
              onClick={() => {
                idx === 0 ? nav('/') : nav('/signup');
              }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
            <Divider />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', fontSize: '20px' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#ffff' }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            variant="h6"
            component="div"
            color="primary"
            sx={{
              display: { sm: 'block' }
            }}
            onClick={() => {
              nav('/about');
            }}
          >
            MedStem
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block', gap: 2 } }}>
            {navItems.map((item, idx) => (
              <Button
                key={item}
                color="primary"
                onClick={() => {
                  idx === 0
                    ? nav('/')
                    : idx === 1
                    ? nav('/about')
                    : nav('/find_doctor');
                }}
              >
                {item}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {userItems.map((item, idx) => (
              <Button
                key={item}
                color="primary"
                sx={{
                  ...(idx === 1 && {
                    border: '1px solid #1A4CFF'
                  })
                }}
                onClick={() => {
                  idx === 0 ? nav('/') : idx === 1 ? nav('/signup') : nav('/');
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <FaIcons.FaBars />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: {
              xs: 'block'
            },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '100%',
              height: 'fit-content'
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default HomeNavBar;

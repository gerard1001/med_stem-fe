import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Drawer,
  Typography
} from '@mui/material';
import { AiOutlineUser } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { FiHome, FiLogOut, FiUsers } from 'react-icons/fi';
import { RiCalendarTodoLine, RiBillLine } from 'react-icons/ri';
import { VscGraphLine } from 'react-icons/vsc';
import { FaBars } from 'react-icons/fa';
import { IoCalculatorOutline } from 'react-icons/io5';
import { BsPlusCircle } from 'react-icons/bs';
const listItems = [
  {
    listIcon: <FiUsers className="text-[20px]" />,
    listText: 'Patients'
  },
  {
    listIcon: <RiCalendarTodoLine className="text-[20px]" />,
    listText: 'Schedule'
  },
  {
    listIcon: <VscGraphLine className="text-[20px]" />,
    listText: 'Analytics'
  },
  {
    listIcon: <IoCalculatorOutline className="text-[20px]" />,
    listText: 'Calculator'
  },
  {
    listIcon: <BsPlusCircle className="text-[20px]" />,
    listText: 'Add'
  }
];

const accItems = [
  {
    listIcon: <AiOutlineUser className="text-[20px]" />,
    listText: 'Account'
  },
  {
    listIcon: <FiLogOut className="text-[20px]" />,
    listText: 'Log out'
  }
];

const DashboardSideBar = () => {
  const [open, setOpen] = useState(false);

  const toggleSlider = () => {
    setOpen((open) => !open);
  };

  const sideList = () => (
    <Box
      className={`w-[220px] h-[calc(100vh-64px)] border-r border-[#0093df] overflow-auto flex flex-col`}
      component="div"
    >
      <Box
        className="h-[64px] relative"
        sx={{ display: { md: 'none', xs: 'block' } }}
      >
        <IconButton
          onClick={toggleSlider}
          sx={{
            position: 'absolute',
            transform: 'translate(-10%, -50%)',
            top: '50%',
            right: '20px'
          }}
        >
          <GrClose />
        </IconButton>
      </Box>
      <Divider />
      <Box className="h-[calc(100%-64px)] min-h-[60vh] flex flex-col justify-between">
        <Box className="h-[55%]">
          <List>
            {listItems.map((listItem, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{listItem.listIcon}</ListItemIcon>
                <ListItemText primary={listItem.listText} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box className="h-[45%]  border-t border-[#0093df]">
          <List>
            {accItems.map((listItem, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{listItem.listIcon}</ListItemIcon>
                <ListItemText primary={listItem.listText} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
  console.log({ open });
  return (
    <>
      <CssBaseline />

      <Box component="nav">
        <AppBar
          position="static"
          sx={{
            backgroundColor: '#ffff',
            boxShadow: 'none',
            borderBottom: '1px solid #0093df78'
          }}
        >
          <Toolbar sx={{ paddingX: { md: '24px', xs: '2px' } }}>
            <Box className="flex items-center justify-between w-[100%]">
              <Box className="flex items-center">
                <IconButton
                  onClick={toggleSlider}
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
              <Box>
                <Typography variant="subtitle1" color="primary">
                  Hello,
                  <br /> Dr. Kim
                </Typography>
              </Box>
            </Box>
            <Drawer
              open={open}
              anchor="left"
              onClose={toggleSlider}
              sx={{ display: { md: 'none', xs: 'block' }, width: '220px' }}
            >
              {sideList()}
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        component="nav"
        className="w-fit"
        sx={{ display: { md: 'block', xs: 'none' } }}
      >
        <Box>{sideList()}</Box>
      </Box>
    </>
  );
};

export default DashboardSideBar;

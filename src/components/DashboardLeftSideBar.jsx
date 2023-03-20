import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsPlusCircle } from 'react-icons/bs';
import { FiLogOut, FiUsers } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { IoCalculatorOutline } from 'react-icons/io5';
import { RiBillLine, RiCalendarTodoLine } from 'react-icons/ri';
import { VscGraphLine } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const listItems = (role) => {
  const common = [
    // {
    //   listIcon: <RiCalendarTodoLine className="text-[20px]" />,
    //   listText: 'Schedule',
    //   url: '/dashboard/schedule'
    // },
    {
      listIcon: <FiUsers className="text-[20px]" />,
      listText: 'Patients',
      url: '/dashboard/patient'
    },
    {
      listIcon: <VscGraphLine className="text-[20px]" />,
      listText: 'Analytics',
      url: '/dashboard/analytics'
    }
  ];
  if (role === 'admin') {
    return [
      ...common,
      // {
      //   listIcon: <IoCalculatorOutline className="text-[20px]" />,
      //   listText: 'Calculator',
      //   url: '/dashboard/calculator'
      // },
      {
        listIcon: <BsPlusCircle className="text-[20px]" />,
        listText: 'Add'
      }
    ];
  }
  if (role === 'doctor') {
    return [
      ...common
      // {
      //   listIcon: <RiBillLine className="text-[20px]" />,
      //   listText: 'Bill',
      //   url: '/dashboard/bill'
      // }
    ];
  }

  return [];
};
const accItems = [
  {
    listIcon: <AiOutlineUser className="text-[20px]" />,
    listText: 'Account',
    url: '/dashboard/account'
  }
];

const DashboardLeftSideBar = ({ toggleLeftSideBar }) => {
  const nav = useNavigate();
  const { loginData } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        className="relative w-full min-w-[220px] h-full border-r border-[#0093df] overflow-auto flex flex-col bg-[#fff] "
        component="div"
      >
        <Box
          className="h-[64px] items-center justify-center"
          sx={{ display: { md: 'none', xs: 'flex' } }}
        >
          <IconButton
            onClick={toggleLeftSideBar}
            sx={{
              padding: 1
            }}
          >
            <GrClose />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: '#0093df' }} />
        <Box className="h-[calc(100%-64px)] bg-white flex flex-col justify-between">
          <Box className="h-[55%]">
            <List>
              {listItems(loginData?.Role.role).map((listItem, index) => (
                <ListItem
                  role="button"
                  id="demo-positioned-button"
                  aria-controls={
                    openMenu && listItem.listText === 'Add'
                      ? 'demo-positioned-menu'
                      : undefined
                  }
                  className="cursor-pointer hover:bg-[#caedff] hover:text-primary"
                  aria-haspopup="true"
                  aria-expanded={openMenu && index === 4 ? 'true' : undefined}
                  onClick={
                    listItem.listText === 'Add'
                      ? handleClick
                      : () => nav(listItem.url)
                  }
                  key={listItem.listText}
                >
                  <ListItemIcon>{listItem.listIcon}</ListItemIcon>
                  <ListItemText primary={listItem.listText} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Divider sx={{ borderColor: '#0093df' }} />
          <Box className="h-[45%]  border-t border-[#0093df]">
            <List>
              {accItems.map((listItem) => (
                <ListItem
                  onClick={() => nav(listItem.url)}
                  className="cursor-pointer hover:bg-[#caedff] hover:text-primary"
                >
                  <ListItemIcon>{listItem.listIcon}</ListItemIcon>
                  <ListItemText primary={listItem.listText} />
                </ListItem>
              ))}
              <ListItem
                onClick={() => {
                  localStorage.removeItem('userLoginData');
                  nav('/login');
                }}
                className="cursor-pointer hover:bg-[#caedff] hover:text-primary"
              >
                <ListItemIcon>
                  <FiLogOut className="text-[20px]" />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem
          className="text-[16px] text-slate-500"
          onClick={() => {
            handleClose();
            nav('/dashboard/add/speciality');
          }}
        >
          {' '}
          <BsPlusCircle className="text-[16px] mr-2" />{' '}
          <Typography variant="body1" fontSize="16px" sx={{ marginX: '10px' }}>
            Speciality
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            nav('/dashboard/add/doctor');
          }}
          className="text-[16px] text-slate-500"
        >
          {' '}
          <BsPlusCircle className="text-[16px] mr-2" />{' '}
          <Typography variant="body1" fontSize="16px" sx={{ marginX: '10px' }}>
            Doctor
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            nav('/dashboard/patient');
          }}
          className="text-[16px] text-slate-500"
        >
          {' '}
          <BsPlusCircle className="text-[16px] mr-2" />{' '}
          <Typography variant="body1" fontSize="16px" sx={{ marginX: '10px' }}>
            Patient
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            nav('/dashboard/add/schedule');
          }}
          className="text-[16px] text-slate-500"
        >
          {' '}
          <BsPlusCircle className="text-[16px] mr-2" />{' '}
          <Typography variant="body1" fontSize="16px" sx={{ marginX: '10px' }}>
            Work schedule
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default DashboardLeftSideBar;

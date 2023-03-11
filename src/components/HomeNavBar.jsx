import * as React from 'react';
import * as FiIcons from 'react-icons/fi';
import * as IoIcons from 'react-icons/io5';
import * as FaIcons from 'react-icons/fa';
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
import { useSelector, useDispatch } from 'react-redux';

const navItems = ['Home', 'About Us', 'Find a Doctor'];
const userItems = ['Login', 'Sign up'];

const HomeNavBar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isLoggedIn = !!localStorage.getItem('userLoginData');

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
        {isLoggedIn ? (
          <Box className="md:flex md:flex-col-reverse">
            <ListItem
              sx={{
                textAlign: 'center',
                width: { md: '100%', xs: '14px' },
                ml: '40%'
              }}
            >
              <ListItemButton
                sx={{
                  textAlign: 'center'
                }}
              >
                <ListItemText primary={<FiIcons.FiSearch />} />
              </ListItemButton>
              <Divider />
            </ListItem>
            <ListItem>
              <ListItemButton
                sx={{
                  textAlign: 'center'
                }}
                onClick={() => {
                  nav('/dashboard/patient/appointments');
                }}
              >
                <ListItemText primary="Appointment" />
              </ListItemButton>
              <Divider />
            </ListItem>
            <ListItem>
              <ListItemButton
                sx={{
                  textAlign: 'center'
                }}
                onClick={() => {
                  nav('/dashboard/patient');
                }}
              >
                <ListItemText primary="Account" />
              </ListItemButton>
              <Divider />
            </ListItem>
          </Box>
        ) : (
          <>
            {' '}
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
                    idx === 0 ? nav('/login') : nav('/signup');
                  }}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
                <Divider />
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', fontSize: '20px' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#fff' }}>
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
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex', gap: 2 },
              fontSize: '18px'
            }}
          >
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
                sx={{ color: '#1A4CFF', fontSize: '18px', mx: 2 }}
              >
                {item}
              </Button>
            ))}
          </Box>

          {true ? (
            <Box
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontSize: '18px',
                mx: 2
              }}
            >
              <Button
                color="primary"
                sx={{ color: '#1A4CFF', fontSize: '18px', mx: 2 }}
              >
                <FiIcons.FiSearch />
              </Button>
              <Button
                color="primary"
                sx={{ color: '#1A4CFF', fontSize: '18px', mx: 2 }}
                onClick={() => {
                  nav('/dashboard/patient/appointments');
                }}
              >
                Appointment
              </Button>
              <Button
                color="primary"
                sx={{ color: '#1A4CFF', fontSize: '18px', mx: 2 }}
                onClick={() => {
                  nav('/dashboard/patient');
                }}
              >
                Account
              </Button>
            </Box>
          ) : (
            <Box
              sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '18px' }}
            >
              {userItems.map((item, idx) => (
                <Button
                  key={item}
                  color="primary"
                  sx={{
                    fontSize: '18px',
                    mx: 2,
                    ...(idx === 1 && {
                      border: '1px solid #1A4CFF'
                    })
                  }}
                  onClick={() => {
                    idx === 0
                      ? nav('/login')
                      : idx === 1
                      ? nav('/signup')
                      : nav('/');
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}

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

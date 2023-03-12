import { Box, IconButton, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';
import * as IoIcons from 'react-icons/im';
import { useNavigate } from 'react-router';
import StepForm from '../components/ClientSignUpSteps/StepForm';
import HomeNavBar from '../components/HomeNavBar';

const Form = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [status, setStatus] = React.useState();

  const getStatus = (data) => {
    setStatus(data);
  };

  return (
<<<<<<< HEAD
    <HomeNavBar>
      <div className="">
        <Box
          className={`${
            status === 2 ? 'max-w-[1400px]' : 'max-w-[800px]'
          } mx-auto w-[80%] md:w-[98%] pb-16`}
=======
    <div className="">
      <HomeNavBar />
      <Box
        className={`${
          status === 2 ? 'max-w-[1400px]' : 'max-w-[800px]'
        } mx-auto w-[80%] md:w-[98%] pb-16`}
      >
        <Paper
          sx={{
            marginTop: { md: theme.spacing(8) },
            marginBottom: { md: theme.spacing(8), xs: theme.spacing(3) },
            paddingX: { md: theme.spacing(3), xs: theme.spacing(0.5) },
            paddingY: { md: theme.spacing(3), xs: theme.spacing(1) },
            border: '1px solid #0093df',
            borderRadius: { md: 5, xs: 1 },
            position: 'relative'
          }}
          className={`${status === 2 && 'mt-1'}`}
>>>>>>> b7a3a51 (Dashboard changes)
        >
          <Paper
            sx={{
              marginTop: { md: theme.spacing(8) },
              marginBottom: { md: theme.spacing(8), xs: theme.spacing(3) },
              paddingX: { md: theme.spacing(3), xs: theme.spacing(0.5) },
              paddingY: { md: theme.spacing(3), xs: theme.spacing(1) },
              border: '1px solid #0093df',
              borderRadius: { md: 5, xs: 1 },
              position: 'relative'
            }}
            className={`${status === 2 && 'mt-1'}`}
          >
            <IconButton
              onClick={() => {
                navigate('/');
              }}
              className="absolute right-5 top-5  bg-[#bfbfbf] text-[#7b7b7b] text-[14px] rounded-md p-1 cursor-pointer"
            >
              <IoIcons.ImCross />
            </IconButton>
            <StepForm getStatus={getStatus} />
          </Paper>
        </Box>
      </div>
    </HomeNavBar>
  );
};

export default Form;

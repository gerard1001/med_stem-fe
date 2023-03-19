import { Box, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';
import { useNavigate } from 'react-router';
import StepForm from '../components/ClientSignUpSteps/StepForm';
import CloseXButton from '../components/CloseXButton';
import HomeNavBar from '../components/HomeNavBar';

const Form = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [status, setStatus] = React.useState();

  const getStatus = (data) => {
    setStatus(data);
  };

  return (
    <HomeNavBar>
      <Box
        className={`${
          status === 2 ? 'max-w-[1400px]' : 'max-w-[800px]'
        } mx-auto w-[80%] md:w-[98%] min-h-full flex flex-col items-center justify-center sm:p-2 p-4`}
      >
        <Paper
          sx={{
            // marginTop: { md: theme.spacing(8) },
            // marginBottom: { md: theme.spacing(8), xs: theme.spacing(3) },
            paddingX: theme.spacing(3),
            paddingY: theme.spacing(3),
            border: '1px solid #0093df',
            borderRadius: { md: 5, xs: 1 },
            position: 'relative'
          }}
          className={`${status === 2 && 'mt-1'} w-full`}
        >
          <CloseXButton
            onClick={() => {
              navigate('/');
            }}
          />
          <StepForm getStatus={getStatus} />
        </Paper>
      </Box>
    </HomeNavBar>
  );
};

export default Form;

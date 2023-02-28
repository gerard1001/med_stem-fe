import { Box, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';
import * as IoIcons from 'react-icons/im';
import HomeNavBar from '../components/HomeNavBar';
import StepForm from '../components/ClientSignUpSteps/StepForm';
import { Controller, useFormContext } from 'react-hook-form';

const Form = () => {
  const theme = useTheme();
  const [status, setStatus] = React.useState();

  const getStatus = (data) => {
    setStatus(data);
  };

  return (
    <div className="">
      <HomeNavBar />
      <Box
        className={`${
          status === 2 ? 'max-w-[1400px]' : 'max-w-[800px]'
        } mx-auto w-[80%] md:w-[98%]`}
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
        >
          <div className="absolute right-5 top-5  bg-[#bfbfbf] text-[#7b7b7b] text-[14px] rounded-md p-1">
            <IoIcons.ImCross />
          </div>
          <StepForm getStatus={getStatus} />
        </Paper>
      </Box>
    </div>
  );
};

export default Form;

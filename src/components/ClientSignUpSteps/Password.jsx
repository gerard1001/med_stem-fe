import React, { Fragment } from 'react';
import {
  Box,
  Button,
  MenuItem,
  InputLabel,
  Select,
  //   FormControl,
  TextField,
  Grid
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import * as IoIcons from 'react-icons/io5';
import { Controller, useFormContext } from 'react-hook-form';

const Password = ({}) => {
  const {
    control,
    setValue,
    formState: { errors },
    trigger
  } = useFormContext();

  const handleNext = () => {
    trigger(['password', 'confirm']).then((value) => {
      if (value) {
        setValue('activeStep', 5);
      }
    });
  };

  const handleBack = () => {
    setValue('activeStep', 3);
  };

  return (
    <Fragment>
      <div className="font-bold ml-[3%] md:text-center">Password</div>
      <FormControl sx={{ margin: 'auto', display: 'block' }} variant="standard">
        <Box spacing={2} className="block w-[100%] mx-auto">
          <Box className="w-[80%] mx-auto" style={{ margin: 'auto' }}>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  variant="outlined"
                  fullWidth
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  error={!!errors.password}
                  helperText={!!errors.password && errors.password.message}
                  required
                  size="small"
                />
              )}
            />
            <Controller
              control={control}
              name="confirm"
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  variant="outlined"
                  fullWidth
                  label="Confirm password"
                  placeholder="Confirm password"
                  margin="normal"
                  error={!!errors.confirm}
                  helperText={!!errors.confirm && errors.confirm.message}
                  required
                  size="small"
                />
              )}
            />
          </Box>
        </Box>
      </FormControl>
      <div className="relative flex items-center mt-12 justify-center">
        <div
          className="border-[#2b8aff] rounded-[10px] text-primary border w-fit px-3 py-1 absolute left-5 text-[16px] cursor-pointer hover:border-none hover:bg-[#a2ccff]"
          onClick={handleBack}
        >
          <IoIcons.IoArrowBack />
        </div>
        <Button
          onClick={handleNext}
          variant="contained"
          style={{
            background: '#1A4CFF',
            color: 'white',
            textTransform: 'capitalize'
          }}
          type="submit"
          className={`bg-[#1A4CFF] capitalize text-white`}
        >
          Complete
        </Button>
        <div className="border-[#2b8aff] rounded-[10px] border w-fit px-3 absolute right-5 text-[16px]">
          5/5
        </div>
      </div>
    </Fragment>
  );
};

export default Password;

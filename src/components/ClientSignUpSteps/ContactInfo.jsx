import React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import * as IoIcons from 'react-icons/io5';
import { countries } from '../../utils/dummyData';
import { Controller, useFormContext } from 'react-hook-form';
import LoadingButton from '../LoadingButton';
import BackButton from '../BackButton';

const ContactInfo = ({}) => {
  const {
    control,
    register,
    formState: { errors },
    trigger,
    setValue
  } = useFormContext();

  const handleNext = () => {
    trigger([
      'email',
      'country',
      'address_1',
      'address_2',
      'city',
      'phone'
    ]).then((value) => {
      if (value) {
        setValue('activeStep', 2);
      }
    });
  };

  const handleBack = () => {
    setValue('activeStep', 0);
  };

  return (
    <div className="max-w-[800px]">
      {' '}
      <div className="font-bold ml-[3%] md:text-center ">
        Contact Information
      </div>
      <Box spacing={2}>
        <Box
          spacing={2}
          className="flex flex-row items-center justify-evenly md:flex-col w-[100%]"
        >
          <Box className="block w-[45%] md:w-full md:max-w-[400px]">
            <Box className="w-[100%] min-w-[220px]">
              <Controller
                control={control}
                name="country"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="Country"
                      name="country"
                      placeholder="Enter your country name"
                      margin="normal"
                      error={!!errors.country}
                      helperText={!!errors.country && errors.country.message}
                      required
                      size="small"
                    />
                  );
                }}
              />
            </Box>
            <Box className="w-[100%] min-w-[220px]">
              <Controller
                control={control}
                name="city"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="city"
                      name="city"
                      placeholder="Enter your city name"
                      margin="normal"
                      error={!!errors.city}
                      helperText={!!errors.city && errors.city.message}
                      required
                      size="small"
                    />
                  );
                }}
              />
            </Box>
            <Box className="w-[100%] min-w-[220px]">
              <Controller
                control={control}
                name="address_1"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="Address 1"
                      name="Address 1"
                      placeholder="Enter your address 1 name"
                      margin="normal"
                      error={!!errors.address_1}
                      helperText={
                        !!errors.address_1 && errors.address_1.message
                      }
                      required
                      size="small"
                    />
                  );
                }}
              />
            </Box>
          </Box>
          <Box className="block w-[45%] md:w-full md:max-w-[400px]">
            <Box className="w-[100%] min-w-[220px]">
              <Controller
                control={control}
                name="address_2"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="Address 2"
                      name="Address 2"
                      placeholder="Enter your address 2 name"
                      margin="normal"
                      error={!!errors.address_2}
                      helperText={
                        !!errors.address_2 && errors.address_2.message
                      }
                      required
                      size="small"
                    />
                  );
                }}
              />
            </Box>
            <Box className="w-[100%] min-w-[220px]">
              <Controller
                control={control}
                name="phone"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="phone"
                      name="phone"
                      placeholder="Phone number"
                      margin="normal"
                      error={!!errors.phone}
                      helperText={!!errors.phone && errors.phone.message}
                      required
                      size="small"
                    />
                  );
                }}
              />
            </Box>
            <Box className="w-[100%] min-w-[220px]">
              <Controller
                control={control}
                name="email"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="email"
                      name="email"
                      placeholder="Enter your email name"
                      margin="normal"
                      error={!!errors.email}
                      helperText={!!errors.email && errors.email.message}
                      required
                      size="small"
                    />
                  );
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <div className="relative flex items-center mt-12 justify-between">
        {/* <Box
          className="border-[#2b8aff] rounded-xl text-primary border w-fit px-5 py-1 absolute left-5 text-[16px] cursor-pointer hover:border-[#a2ccff] hover:bg-[#a2ccff]"
          onClick={handleBack}
        >
          <IoIcons.IoArrowBack />
        </Box> */}
        <BackButton className="w-fit left-5" onClick={handleBack} />
        <LoadingButton
          className="px-10"
          variant="contained"
          onClick={handleNext}
        >
          Continue
        </LoadingButton>
        <div className="border-[#2b8aff] rounded-[10px] border w-fit px-3 py-1 right-5 text-[16px]">
          2/5
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

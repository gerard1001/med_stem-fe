import React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import * as IoIcons from 'react-icons/io5';
import { countries } from '../../utils/dummyData';
import { Controller, useFormContext } from 'react-hook-form';

const ContactInfo = ({}) => {
  const {
    control,
    register,
    formState: { errors },
    trigger,
    setValue
  } = useFormContext();

  const handleNext = () => {
    trigger(['email', 'country', 'address_1', 'city', 'phone']).then(
      (value) => {
        if (value) {
          setValue('activeStep', 2);
        }
      }
    );
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
          className="flex flex-row items-start justify-evenly md:flex-col w-[100%]"
        >
          <Box className="block w-[45%] md:w-full md:max-w-[400px]">
            <Box>
              {/* <Autocomplete
                id="country-select-demo"
                sx={{ padding: 0, minWidth: '220px' }}
                margin="normal"
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    label="Country"
                    name="country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password'
                    }}
                    value={country}
                    margin="normal"
                    // onChange={handleChange}
                    onChange={(e) => {
                      const val = e.target.innerText.split(" (");
                      setCountry(val[0]);
                    }}
                    error={!!formErrors.country}
                    helperText={formErrors.country}
                    size="small"
                  />
                )}
              /> */}
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
            <Box>
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
            <Box>
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
          <Box className="block w-[45%] md:w-full md:max-w-[400px]">
            <Box>
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
            <Box>
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
            </Box>{' '}
          </Box>
        </Box>
      </Box>
      <div className="relative flex items-center mt-12 justify-center">
        <Box
          className="border-[#2b8aff] rounded-[10px] text-primary border w-fit px-3 py-1 absolute left-5 text-[16px] cursor-pointer hover:border-none hover:bg-[#a2ccff]"
          onClick={handleBack}
        >
          <IoIcons.IoArrowBack />
        </Box>
        <Button
          variant="contained"
          style={{
            background: '#1A4CFF',
            color: 'white',
            textTransform: 'capitalize'
          }}
          onClick={handleNext}
          className={`bg-[#1A4CFF] capitalize text-white`}
        >
          Continue
        </Button>
        <div className="border-[#2b8aff] rounded-[10px] border w-fit px-3 absolute right-5 text-[16px]">
          2/5
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

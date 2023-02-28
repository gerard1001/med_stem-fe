import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import React, { Fragment } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const PersonalInfo = ({}) => {
  const isValid = true;

  const {
    control,
    register,
    formState: { errors },
    trigger,
    setValue
  } = useFormContext();

  const handleNext = () => {
    trigger([
      'first_name',
      'last_name',
      'gender',
      'marital_status',
      'id_number',
      'birth_date'
    ]).then((value) => {
      if (value) {
        setValue('activeStep', 1);
      }
    });
  };

  return (
    <Box>
      <div className="font-bold ml-[3%] md:text-center">
        Personal Information
      </div>
      <Box className="flex flex-row items-center justify-evenly md:flex-col w-[100%]">
        <Box className="block w-[45%] md:w-full md:max-w-[400px]">
          <Box className="w-[100%] min-w-[220px]">
            <Controller
              control={control}
              name="first_name"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    label="Family name"
                    placeholder="Family name"
                    margin="normal"
                    error={!!errors.first_name}
                    helperText={
                      !!errors.first_name && errors.first_name.message
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
              name="last_name"
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label="Given name"
                  placeholder="Given name"
                  margin="normal"
                  error={!!errors.last_name}
                  helperText={errors.last_name && errors.last_name.message}
                  required
                  size="small"
                />
              )}
            />
          </Box>
          <Box className="w-[100%] min-w-[220px]">
            <Controller
              control={control}
              name="id_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label="ID number"
                  placeholder="ID number"
                  margin="normal"
                  error={!!errors.id_number}
                  helperText={errors.id_number && errors.id_number.message}
                  required
                  size="small"
                />
              )}
            />
          </Box>
        </Box>
        <Box className="block w-[45%]  md:w-full md:max-w-[400px]">
          <Box className="w-[100%] min-w-[220px]">
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <FormControl
                  variant="outlined"
                  margin="normal"
                  className="w-[100%] min-w-[220px]"
                  size="small"
                >
                  <InputLabel required>Gender</InputLabel>
                  <Select
                    {...field}
                    label="Gender"
                    labelId="demo-simple-select-label"
                    error={!!errors.gender}
                    // helperText={errors.gender && errors.gender.message}
                    size="small"
                  >
                    <MenuItem value="male">male</MenuItem>
                    <MenuItem value="female">female</MenuItem>
                  </Select>
                  <FormHelperText error={true}>
                    {errors.gender && errors.gender.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Box>
          <Box className="w-[100%] min-w-[220px]">
            <Controller
              control={control}
              name="birth_date"
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  variant="outlined"
                  fullWidth
                  // label="Birth date"
                  // placeholder="Birth date"
                  margin="normal"
                  error={!!errors.birth_date}
                  helperText={errors.birth_date && errors.birth_date.message}
                  required
                  size="small"
                />
              )}
            />
          </Box>
          <Box className="w-[100%] min-w-[220px]">
            <Controller
              control={control}
              name="marital_status"
              render={({ field }) => (
                <FormControl
                  variant="outlined"
                  margin="normal"
                  className="w-[100%] min-w-[220px]"
                  size="small"
                >
                  <InputLabel required>Marital status</InputLabel>
                  <Select
                    {...field}
                    label="Marital Status"
                    id="demo-simple-select"
                    error={!!errors.marital_status}
                    // helperText={
                    //   errors.marital_status && errors.marital_status.message
                    // }
                    size="small"
                  >
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="married">Married</MenuItem>
                  </Select>
                  <FormHelperText error={true}>
                    {errors.marital_status && errors.marital_status.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Box>
        </Box>
      </Box>
      <div
        style={{ display: 'flex', marginTop: 50, justifyContent: 'center' }}
        className="relative"
      >
        <Button
          variant="contained"
          disabled={!isValid}
          style={
            isValid
              ? {
                  background: '#1A4CFF',
                  color: 'white',
                  textTransform: 'capitalize'
                }
              : {
                  background: '#c0c0c0',
                  color: 'white',
                  textTransform: 'capitalize'
                }
          }
          onClick={handleNext}
          className={`${
            isValid ? 'bg-[#1A4CFF]' : 'bg-[#c0c0c0]'
          } capitalize text-white`}
        >
          Continue
        </Button>
        <div className="border-[#2b8aff] rounded-[10px] border w-fit px-3 absolute right-5 text-[16px]">
          1/5
        </div>
      </div>
    </Box>
  );
};

export default PersonalInfo;

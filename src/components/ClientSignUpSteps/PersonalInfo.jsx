import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { subYears } from 'date-fns';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import LoadingButton from '../LoadingButton';

const PersonalInfo = () => {
  const isValid = true;

  const {
    control,
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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'auto',
            sm: '1fr 1fr'
          },
          gap: 3,
          paddingTop: 3
        }}
      >
        <Box className="w-full">
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
                  error={!!errors.first_name}
                  helperText={!!errors.first_name && errors.first_name.message}
                  size="small"
                />
              );
            }}
          />
        </Box>
        <Box className="w-full">
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
                error={!!errors.last_name}
                helperText={errors.last_name && errors.last_name.message}
                size="small"
              />
            )}
          />
        </Box>
        <Box className="w-full">
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
                error={!!errors.id_number}
                helperText={errors.id_number && errors.id_number.message}
                size="small"
              />
            )}
          />
        </Box>
        <Box className="w-full">
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <FormControl variant="outlined" className="w-full" size="small">
                <InputLabel>Gender</InputLabel>
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
                <FormHelperText error>
                  {errors.gender && errors.gender.message}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Box>
        <Box className="w-full">
          <Controller
            control={control}
            name="birth_date"
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Birth date"
                size="small"
                minDate={subYears(new Date(), 100)}
                // maxDate={}
                disableFuture
                slotProps={{
                  textField: {
                    size: 'small',
                    variant: 'outlined',
                    fullWidth: true,
                    error: !!errors.birth_date,
                    helperText: errors.birth_date && errors.birth_date.message
                  }
                }}
                // required
                // sx={{
                //   width: '110px',
                //   '& .MuiInputBase-input': {
                //     padding: '5px 10px',
                //     backgroundColor: '#E7E7E7',
                //     borderRadius: '5px 0 0 5px'
                //   },
                //   '& .MuiFormLabel-root': {
                //     top: '-10px'
                //   },
                //   '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                //     top: '0px'
                //   },
                //   '& .MuiInputBase-root': {
                //     paddingY: 0,
                //     borderRadius: '5px'
                //   }
                // }}
              />
              // <TextField
              //   {...field}
              //   type="date"
              //   variant="outlined"
              //   fullWidth
              //   // label="Birth date"
              //   // placeholder="Birth date"
              //   error={!!errors.birth_date}
              //   helperText={errors.birth_date && errors.birth_date.message}
              //   required
              //   size="small"
              // />
            )}
          />
        </Box>
        <Box className="w-full">
          <Controller
            control={control}
            name="marital_status"
            render={({ field }) => (
              <FormControl variant="outlined" className="w-full" size="small">
                <InputLabel>Marital status</InputLabel>
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
                <FormHelperText error>
                  {errors.marital_status && errors.marital_status.message}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Box>
      </Box>
      <div
        style={{ display: 'flex', marginTop: 50, justifyContent: 'center' }}
        className="relative"
      >
        <LoadingButton
          className="px-10"
          variant="contained"
          disabled={!isValid}
          onClick={handleNext}
        >
          Continue
        </LoadingButton>
        {/* <Button
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
        </Button> */}
        <div className="border-[#2b8aff] rounded-[10px] border w-fit px-3 py-1 absolute right-5 text-[16px]">
          1/5
        </div>
      </div>
    </Box>
  );
};

export default PersonalInfo;

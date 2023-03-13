import { Box, Button, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import React, { Fragment } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import * as IoIcons from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axiosInstance from '../../axios/axios.instance';
import BackButton from '../BackButton';
import LoadingButton from '../LoadingButton';

const Password = ({ data }) => {
  const navigate = useNavigate();
  const {
    control,
    setValue,
    formState: { errors, isDirty, isValid },
    trigger
  } = useFormContext();

  const dispatch = useDispatch();

  const handleBack = () => {
    setValue('activeStep', 3);
  };

  const info = data.info;

  const yesValues = Object.keys(info).filter(
    (key) => info[key].value === 'yes'
  );

  const resultArray = yesValues.map((key) => {
    const valueObject = info[key];
    return `${key}#%#%${valueObject.details || ''}`;
  });
  const med_info = resultArray.join('#&#&');

  const finalData = data;

  finalData.arr = med_info;
  finalData.id_number = parseInt(finalData.id_number, 10);
  delete finalData.info;
  delete finalData.activeStep;

  const handleSubmit = (event) => {
    event.preventDefault();
    trigger(['password', 'confirm']).then(async (value) => {
      try {
        const response = await axiosInstance.post(
          `${process.env.BACKEND_URL}/users/client/register`,
          finalData
        );

        toast.success(response.data.message, {
          onClose: () => {
            navigate('/login', { replace: true });
          }
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    });
  };

  return (
    <>
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
      <div className="relative flex items-center mt-12 justify-between">
        <BackButton className="w-fit left-5" onClick={handleBack} />
        <LoadingButton
          disabled={!isValid}
          className="px-10"
          variant="contained"
          onClick={handleSubmit}
        >
          Complete
        </LoadingButton>
        {/* <Box
          component="div"
          className="border-[#2b8aff] rounded-[10px] text-primary border w-fit px-3 py-1 absolute left-5 text-[16px] cursor-pointer hover:border-none hover:bg-[#a2ccff]"
          onClick={handleBack}
        >
          <IoIcons.IoArrowBack />
        </Box>
        <Button
          disabled={!isDirty && !isValid}
          onClick={handleSubmit}
          variant="contained"
          style={{
            background: '#1A4CFF',
            color: 'white',
            textTransform: 'capitalize'
          }}
          type="submit"
          className="bg-[#1A4CFF] capitalize text-white"
        >
          Complete
        </Button> */}
        <div className="border-[#2b8aff] rounded-[10px] border w-fit px-3 py-1 right-5 text-[16px]">
          5/5
        </div>
      </div>
    </>
  );
};

export default Password;

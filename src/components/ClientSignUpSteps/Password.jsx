import { Box, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axiosInstance from '../../axios/axios.instance';
import BackButton from '../BackButton';
import LoadingButton from '../LoadingButton';

const Password = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    control,
    setValue,
    getValues,
    formState: { errors, isValid },
    trigger,
    reset
  } = useFormContext();

  const handleBack = () => {
    setValue('activeStep', 3);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = getValues();
    const { info } = data;
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

    trigger(['password', 'confirm']).then(async () => {
      try {
        setLoading(true);
        const response = await axiosInstance
          .post(`${process.env.BACKEND_URL}/users/client/register`, finalData)
          .finally(() => {
            setLoading(false);
          });

        reset();

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
          <Box
            className="w-[80%] mx-auto flex flex-col items-center"
            style={{ margin: 'auto' }}
          >
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  variant="outlined"
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  error={!!errors.password}
                  helperText={!!errors.password && errors.password.message}
                  required
                  size="small"
                  className="max-w-[300px] w-full"
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
                  label="Confirm password"
                  placeholder="Confirm password"
                  margin="normal"
                  error={!!errors.confirm}
                  helperText={!!errors.confirm && errors.confirm.message}
                  required
                  size="small"
                  className="max-w-[300px] w-full"
                />
              )}
            />
          </Box>
        </Box>
      </FormControl>
      <div className="relative flex items-center mt-12 justify-between">
        <BackButton className="w-fit left-5" onClick={handleBack} />
        <LoadingButton
          loading={loading}
          disabled={!isValid}
          className="px-10"
          variant="contained"
          onClick={handleSubmit}
        >
          Complete
        </LoadingButton>
        <div className="border-[#2b8aff] rounded-[10px] border w-fit px-3 py-1 right-5 text-[16px]">
          5/5
        </div>
      </div>
    </>
  );
};

export default Password;

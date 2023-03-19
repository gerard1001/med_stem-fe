import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import axiosInstance from '../axios/axios.instance';
import CloseXButton from '../components/CloseXButton';
import HomeNavBar from '../components/HomeNavBar';
import LoadingButton from '../components/LoadingButton';

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required!')
});

function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  // Redirect to dashboard if already logged in
  const userData = JSON.parse(localStorage.getItem('userLoginData'));
  if (userData?.token) {
    return <Navigate to="/dashboard" />;
  }

  const onSubmit = async ({ email }) => {
    try {
      setLoading(true);
      const response = await axiosInstance
        .post('/users/forgot-password', {
          email
        })
        .finally(() => {
          setLoading(false);
        });

      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <HomeNavBar>
      <Box className="w-full h-full flex flex-col items-center justify-center xs:p-2 p-4 overflow-auto">
        <Box
          sx={{
            border: '1px solid #797979',
            borderRadius: '10px',
            position: 'relative'
          }}
          className="max-w-[380px] w-full flex flex-col items-center gap-3 p-8"
        >
          <CloseXButton
            onClick={() => {
              navigate('/login');
            }}
          />
          <Typography component="h1" variant="h6" fontWeight="700">
            Forgot your password
          </Typography>
          <Typography variant="subtitle1">Enter your email to reset</Typography>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="email"
                size="small"
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
                {...field}
              />
            )}
          />
          <LoadingButton
            loading={loading}
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
            className="max-w-[150px] w-full"
          >
            Send
          </LoadingButton>
        </Box>
      </Box>
    </HomeNavBar>
  );
}

export default ForgotPassword;

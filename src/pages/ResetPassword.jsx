import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import axiosInstance from '../axios/axios.instance';
import CloseXButton from '../components/CloseXButton';
import HomeNavBar from '../components/HomeNavBar';
import LoadingButton from '../components/LoadingButton';

const schema = yup.object().shape({
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*[\s]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, no space, and be at least 8 characters long.'
    )
    .required(),
  confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passords must match')
    .required()
});

function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const token = searchParams.get('token');

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
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const onSubmit = async ({ password }) => {
    try {
      setLoading(true);
      const response = await axiosInstance
        .patch(`/users/reset-password/${token}`, {
          password
        })
        .finally(() => {
          setLoading(false);
        });
      toast.success(response.data.message, {
        onClose: () => {
          navigate('/login');
        }
      });
    } catch (error) {
      let { message } = error.response.data;
      if (message.trim().toLowerCase() === 'jwt expired') {
        message = 'Your token has expired, request to reset password again.';
      }
      toast.error(message);
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
            Reset your password
          </Typography>
          <Typography variant="subtitle1">
            Enter your new password to reset
          </Typography>
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                type="password"
                label="Password"
                size="small"
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
                {...field}
              />
            )}
          />
          <Controller
            name="confirm"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                size="small"
                error={!!errors.confirm}
                helperText={errors.confirm && errors.confirm.message}
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
            Reset
          </LoadingButton>
        </Box>
      </Box>
    </HomeNavBar>
  );
}

export default ResetPassword;

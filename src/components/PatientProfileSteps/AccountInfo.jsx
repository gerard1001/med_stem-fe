import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import axiosInstance from '../../axios/axios.instance';
import { getOnePatient } from '../../redux/reducers/patient.reducer';
import Loader from '../Loader/Loader';
import PatientProfileNavigation from './PatientProfileNavigation';

const schema = yup.object().shape({
  current_password: yup.string().required(),
  new_password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*[\s]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, no space, and be at least 8 characters long.'
    )
    .required(),
  repeat_new_password: yup
    .string()
    .oneOf([yup.ref('new_password'), null], 'Passwords must match')
    .required()
});

const AccountInfo = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const patientData = useSelector((state) => state.patient?.single_data.data);
  const [picture, setPicture] = useState(null);
  const [picUrl, setPicUrl] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUploadFile = async (e) => {
    e.preventDefault();
    try {
      setLoadingUpload(true);
      const formData = new FormData();
      formData.append('picture', picture);
      await axiosInstance
        .patch(`/users/client/${patientData.client_id}`, formData)
        .then(() => {
          dispatch(getOnePatient(patientData.client_id));
        })
        .finally(() => {
          setLoadingUpload(false);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleChangePassword = async (data) => {
    try {
      const newData = data;
      delete newData.repeat_new_password;
      setLoadingReset(true);
      await axiosInstance
        .patch(`/users/client/reset/${patientData.client_id}`, newData)
        .then((response) => {
          toast.success(response.data.message);
        })
        .finally(() => {
          resetField('current_password');
          resetField('new_password');
          resetField('repeat_new_password');
          setLoadingReset(false);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (picture) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPicUrl(e.target.result);
      };
      reader.readAsDataURL(picture);
    }
  }, [picture]);

  return (
    <div>
      <Box className="w-full">
        <PatientProfileNavigation />

        <Box className="mt-8 mb-5">
          <Typography variant="subtitle1" fontWeight="600" fontSize="18px">
            Change password
          </Typography>
        </Box>
        <Box className="flex flex-row md:flex-col">
          <Box className="w-[80%] md:w-[100%]">
            <Typography
              variant="subtitle1"
              fontSize="17px"
              sx={{ width: { md: '50%', sm: '70%' } }}
            >
              The password must be between 8 and 32 characters long and include
              at least one uppercase letter, one lowercase letter, and one
              number.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                mt: '20px'
              }}
            >
              <Controller
                name="current_password"
                control={control}
                defaultvalue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Current password"
                    placeholder="Current password"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: '20px', maxWidth: '300px' }}
                    error={!!errors.current_password}
                    helperText={
                      !!errors.current_password &&
                      errors.current_password.message
                    }
                  />
                )}
              />
              <FormControl
                sx={{ maxWidth: '300px' }}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  New password
                </InputLabel>
                <Controller
                  name="new_password"
                  control={control}
                  defaultvalue=""
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      error={!!errors.new_password}
                      helperText={
                        !!errors.new_password && errors.new_password.message
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <AiFillEyeInvisible className="text-[20px]" />
                            ) : (
                              <AiFillEye className="text-[20px]" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="New password"
                    />
                  )}
                />
                <FormHelperText error>
                  {errors.new_password && errors.new_password.message}
                </FormHelperText>
              </FormControl>
              <FormControl
                sx={{ maxWidth: '300px' }}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Repeat new password
                </InputLabel>
                <Controller
                  name="repeat_new_password"
                  control={control}
                  defaultvalue=""
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      error={!!errors.repeat_new_password}
                      helperText={
                        !!errors.repeat_new_password &&
                        errors.repeat_new_password.message
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <AiFillEyeInvisible className="text-[20px]" />
                            ) : (
                              <AiFillEye className="text-[20px]" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Repeat new password"
                    />
                  )}
                />
                <FormHelperText error>
                  {errors.repeat_new_password &&
                    errors.repeat_new_password.message}
                </FormHelperText>
              </FormControl>
              <Button
                sx={{
                  marginTop: '40px',
                  width: '120px',
                  color: '#1A4CFF',
                  border: '1px solid #1A4CFF',
                  borderRadius: '20px',
                  ':hover': { backgroundColor: '#a2ccff', border: 'none' }
                }}
                disabled={loadingReset}
                onClick={handleSubmit(handleChangePassword)}
              >
                {!loadingReset ? 'Change' : <Loader />}
              </Button>
            </Box>
          </Box>
          <Box className="w-[20%] md:mb-[80px] md:w-[100%] md:mt-10 flex flex-col items-center">
            <Box className="p-10 rounded-[50%] bg-[#a2ccff] relative overflow-hidden cursor-pointer">
              <FiUser className="text-[60px]" />
              {(picUrl || (patientData && patientData.picture)) && (
                <img
                  className="w-full h-full absolute top-0 left-0 z-10"
                  src={picUrl || patientData?.picture}
                  alt=""
                />
              )}
              {!loadingUpload && (
                <input
                  onChange={(e) => {
                    setPicture(e.target.files[0]);
                  }}
                  id="picture"
                  type="file"
                  accept="image/*"
                  className="w-full h-full absolute top-0 left-0 opacity-0 z-20 cursor-pointer"
                />
              )}
            </Box>
            <Box>
              <Button
                role="button"
                component="label"
                htmlFor="picture"
                onClick={(e) => {
                  picture && handleUploadFile(e);
                }}
                disabled={loadingUpload}
                sx={{
                  marginTop: '40px',
                  width: '120px',
                  color: '#1A4CFF',
                  border: '1px solid #1A4CFF',
                  borderRadius: '20px',
                  marginX: 'auto',
                  ':hover': { backgroundColor: '#a2ccff', border: 'none' }
                }}
              >
                {loadingUpload ? 'Uploading...' : !picture ? 'Upload' : 'Send'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AccountInfo;

/* eslint-disable no-nested-ternary */
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
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import * as yup from 'yup';
import EditAdminDoctorPersonalProfileModal from './EditAdminDoctorPersonalProfileModal';
import Loader from './Loader/Loader';

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
const defaultValues = {
  current_password: '',
  new_password: '',
  repeat_new_password: ''
};

const AdminDoctorAccountPage = ({
  info = {},
  image,
  uploadImage = () => {},
  changePassword = () => {},
  handleEdit = () => {},
  loadingUpload = false,
  loadingReset = false
}) => {
  const [picture, setPicture] = useState(null);
  const [picUrl, setPicUrl] = useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChangePassword = async (data) => {
    changePassword(data, () => {
      resetField('current_password');
      resetField('new_password');
      resetField('repeat_new_password');
    });
  };
  const handleUploadFile = async (e) => {
    e.preventDefault();
    await uploadImage(picture, () => {
      setPicture(null);
    });
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
    <>
      <Box className="w-full">
        <Typography variant="h6" sx={{ mb: '20px' }} noWrap>
          Profile and Settings
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'auto',
              sm: 'repeat(auto-fit, minmax(300px, 1fr))'
            },
            gap: 3
          }}
          className="items-start w-full"
        >
          <Box className="w-full">
            <Typography
              variant="subtitle1"
              fontWeight="600"
              sx={{ my: '20px' }}
            >
              Personal Information
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gap: 1,
                gridTemplateColumns: 'repeat(2, 1fr)'
              }}
            >
              <Typography variant="subtitle1" sx={{ color: '#6A6F75' }}>
                Family name
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#000' }}>
                {info.family_name || '-'}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#6A6F75' }}>
                Given name
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#000' }}>
                {info.given_name || '-'}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#6A6F75' }}>
                Gender
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#000' }}>
                {info.gender || '-'}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#6A6F75' }}>
                Date Of Birth
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#000' }}>
                {(info.birth_date &&
                  format(new Date(info.birth_date), 'dd.MM.yyyy')) ||
                  '-'}
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              fontWeight="600"
              sx={{ my: '20px' }}
            >
              Contact Information
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gap: 1,
                gridTemplateColumns: 'repeat(2, 1fr)'
              }}
            >
              <Typography variant="subtitle1" sx={{ color: '#6A6F75' }}>
                Email
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#000' }}>
                {info.email || '-'}
              </Typography>
            </Box>
            <Button
              sx={{
                marginTop: '40px',
                maxWidth: '120px',
                width: '100%',
                color: '#1A4CFF',
                border: '1px solid #1A4CFF',
                borderRadius: '20px',
                ':hover': { backgroundColor: '#a2ccff', border: 'none' }
              }}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Edit
            </Button>
          </Box>
          <Box className="w-full">
            <Typography
              variant="subtitle1"
              fontWeight="600"
              sx={{ my: '20px' }}
            >
              Change Password
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ my: '20px', color: '#6A6F75' }}
            >
              The password must be between 8 and 32 characters long and include
              at least one uppercase letter, one lowercase letter, and one
              number.
            </Typography>
            <Box className="flex flex-col gap-[20px] mt-[20px]">
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
                  maxWidth: '240px',
                  width: '100%',
                  color: '#1A4CFF',
                  border: '1px solid #1A4CFF',
                  borderRadius: '20px',
                  ':hover': { backgroundColor: '#a2ccff', border: 'none' }
                }}
                disabled={loadingReset}
                onClick={handleSubmit(handleChangePassword)}
              >
                {!loadingReset ? 'Change password' : <Loader />}
              </Button>
            </Box>
          </Box>
          <Box className="w-full">
            <Box className="w-[100%] lg:mt-10 flex flex-col items-center">
              <Box className="p-10 rounded-[50%] bg-[#e8f0fe] relative overflow-hidden cursor-pointer">
                <FiUser className="text-[60px] text-slate-500" />
                {(picUrl || image) && (
                  <img
                    className="w-full h-full absolute top-0 left-0 z-10"
                    src={picUrl || image}
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
                  {loadingUpload
                    ? 'Uploading...'
                    : !picture
                    ? 'Upload'
                    : 'Send'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <EditAdminDoctorPersonalProfileModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        handleOnSubmit={async (data, setLoading) => {
          await handleEdit(data, setLoading, () => setOpenModal(false));
        }}
        info={info}
      />
    </>
  );
};

export default AdminDoctorAccountPage;

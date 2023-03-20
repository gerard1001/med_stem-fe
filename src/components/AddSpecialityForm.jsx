/* eslint-disable no-nested-ternary */
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import {
  getDepartmentList,
  makeDepartment
} from '../redux/reducers/department.reducer';
import Loader from './Loader/Loader';

const schema = yup.object().shape({
  department_name: yup.string().required('Name is required'),
  speciality_name: yup.string().required('Name is required')
});
const defaultValues = {
  department_name: '',
  speciality_name: ''
};

const AddSpecialityForm = () => {
  const dispatch = useDispatch();
  const [picture, setPicture] = useState(null);
  const [picUrl, setPicUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors }
  } = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const onSubmit = ({ department_name, speciality_name }) => {
    if (!picture) {
      return toast.error('Picture is required');
    }
    const formData = new FormData();
    formData.append('department_name', department_name);
    formData.append('speciality_name', speciality_name);
    formData.append('picture', picture);

    setLoading(true);
    dispatch(makeDepartment(formData)).then(() => {
      setLoading(false);
      reset();
      setPicture(null);
      setPicUrl(null);
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
    <Box className="p-8 md:p-4 pt-16 w-full max-w-[900px] mx-auto relative h-full flex flex-col">
      <Typography variant="h6" className="md:text-center">
        Add Speciality
      </Typography>
      <Box
        spacing={1}
        className="flex flex-row gap-8 items-center justify-evenly md:flex-col w-[100%]"
      >
        <Box className="w-full flex flex-col gap-4">
          <Controller
            name="department_name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                variant="outlined"
                size="small"
                fullWidth
                error={!!errors.department_name}
                helperText={errors.department_name?.message}
              />
            )}
          />
          <Controller
            name="speciality_name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="About"
                variant="outlined"
                fullWidth
                multiline
                minRows={3}
                maxRows={5}
                error={!!errors.speciality_name}
                helperText={errors.speciality_name?.message}
              />
            )}
          />
        </Box>
        <Box className="flex flex-col items-center">
          <Box className="p-10 rounded-[50%] bg-[#e8f0fe] relative overflow-hidden cursor-pointer">
            <FiUser className="text-[60px] text-slate-500" />
            {picUrl && (
              <img
                className="w-full h-full absolute top-0 left-0 z-10"
                src={picUrl}
                alt="selected"
              />
            )}
            <input
              onChange={(e) => {
                setPicture(e.target.files[0]);
              }}
              name="picture"
              id="picture"
              type="file"
              accept="image/*"
              className="w-full h-full absolute top-0 left-0 opacity-0 z-20 cursor-pointer"
            />
          </Box>
          <Box>
            <Button
              role="button"
              component="label"
              htmlFor="picture"
              sx={{
                marginTop: '10px',
                width: '120px',
                color: '#1A4CFF',
                border: '1px solid #1A4CFF',
                borderRadius: '20px',
                marginX: 'auto',
                ':hover': { backgroundColor: '#a2ccff', border: 'none' }
              }}
            >
              upload
            </Button>
          </Box>
        </Box>
      </Box>
      <Stack
        direction="row-reverse"
        className="w-full h-full max-h-[400px] items-end"
      >
        <Box className="md:flex md:items-center md:justify-center">
          <Button
            type="submit"
            sx={{
              width: { md: '120px', xs: '80px' },
              color: '#1A4CFF',
              border: '1px solid #1A4CFF',
              borderRadius: '20px',
              marginTop: '30px',
              marginX: 'auto',
              ':hover': { backgroundColor: '#a2ccff', border: 'none' }
            }}
            className="mx-auto"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {!loading ? 'Save' : <Loader />}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default AddSpecialityForm;

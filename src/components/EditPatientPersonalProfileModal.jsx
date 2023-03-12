import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import _ from 'lodash';
import { useEffect } from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import axiosInstance from '../axios/axios.instance';
import {
  getOnePatient,
  updatePatientData
} from '../redux/reducers/patient.reducer';
import CloseXButton from './CloseXButton';
import LoadingButton from './LoadingButton';

const schema = yup.object({
  id_number: yup.number('Id number must be a number'),
  birth_date: yup.date(),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Gender must be male or female'),
  marital_status: yup
    .string()
    .oneOf(
      ['single', 'married'],
      'Marital status can be only single or married'
    ),

  country: yup.string(),
  city: yup.string(),
  address_1: yup.string(),
  address_2: yup.string(),
  phone_number: yup.number('Phone must be a number'),
  email: yup.string().email()
});

const EditPatientPersonalProfileModal = ({
  open,
  onClose,
  patientData = {}
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields, isValid }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const handleOnSubmit = async (data) => {
    try {
      setLoading(true);
      await axiosInstance
        .patch(`/users/client/${patientData.client_id}`, data)
        .then(() => {
          dispatch(getOnePatient(patientData.client_id)).then(() => {
            onClose();
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const {
      id_number,
      birth_date,
      gender,
      marital_status,
      country,
      city,
      address_1,
      address_2,
      phone_number,
      email
    } = patientData;
    // console.log('format', format(birth_date, 'yyyy-MM-dd'));
    id_number && setValue('id_number', parseInt(id_number, 10));
    birth_date && setValue('birth_date', '2023-04-10');
    birth_date &&
      setValue('birth_date', format(new Date(birth_date), 'yyyy-MM-dd'));
    gender && setValue('gender', gender);
    marital_status && setValue('marital_status', marital_status);
    country && setValue('country', country);
    city && setValue('city', city);
    address_1 && setValue('address_1', address_1);
    address_2 && setValue('address_2', address_2);
    phone_number && setValue('phone_number', parseInt(phone_number, 10));
    email && setValue('email', email);
  }, [patientData]);

  return (
    <Modal
      open={open}
      onClose={() => {
        !loading && onClose();
        reset();
      }}
      className="flex flex-col items-center justify-center"
      sx={{
        '& .MuiFormControl-root': {
          margin: 0
        }
      }}
    >
      <Box className="flex flex-col w-full justify-center items-center gap-4 max-w-[600px] bg-white border border-primary shadow-2 rounded-[20px] relative py-10 px-12 m-4 overflow-y-auto">
        <CloseXButton
          onClick={() => {
            !loading && onClose();
          }}
        />

        {/* Personnal Information Section */}
        <Typography className="w-full font-semibold text-lg text-center">
          Personnal Information
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
          }}
        >
          <Controller
            control={control}
            name="id_number"
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value}
                variant="outlined"
                fullWidth
                label="ID number"
                placeholder="ID number"
                error={!!errors.id_number}
                helperText={errors.id_number && errors.id_number.message}
                required
                size="small"
              />
            )}
          />
          <Controller
            control={control}
            name="birth_date"
            render={({ field }) => (
              <TextField
                {...field}
                // onChange={(e)=>{console.log(e)}}
                type="date"
                variant="outlined"
                fullWidth
                // label="Birth date"
                // placeholder="Birth date"
                error={!!errors.birth_date}
                helperText={errors.birth_date && errors.birth_date.message}
                required
                size="small"
              />
            )}
          />
          <Controller
            control={control}
            name="gender"
            defaultValue="male"
            render={({ field }) => (
              <FormControl variant="outlined" className="w-[100%]" size="small">
                <InputLabel required>Gender</InputLabel>
                <Select
                  {...field}
                  label="Gender"
                  labelId="demo-simple-select-label"
                  error={!!errors.gender}
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
          <Controller
            control={control}
            name="marital_status"
            defaultValue="single"
            render={({ field }) => (
              <FormControl variant="outlined" className="w-[100%]" size="small">
                <InputLabel required>Marital status</InputLabel>
                <Select
                  {...field}
                  label="Marital Status"
                  id="demo-simple-select"
                  error={!!errors.marital_status}
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

        {/* Contact Information Section */}
        <Typography className="w-full font-semibold text-lg text-center">
          Contact Information
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
          }}
        >
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
                  error={!!errors.country}
                  helperText={!!errors.country && errors.country.message}
                  required
                  size="small"
                />
              );
            }}
          />
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
                  error={!!errors.city}
                  helperText={!!errors.city && errors.city.message}
                  required
                  size="small"
                />
              );
            }}
          />
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
                  error={!!errors.address_1}
                  helperText={!!errors.address_1 && errors.address_1.message}
                  required
                  size="small"
                />
              );
            }}
          />
          <Controller
            control={control}
            name="address_2"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label="Address 2"
                  name="Address 2"
                  placeholder="Enter your address 2 name"
                  error={!!errors.address_2}
                  helperText={!!errors.address_2 && errors.address_2.message}
                  required
                  size="small"
                />
              );
            }}
          />
          <Controller
            control={control}
            name="phone_number"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label="phone"
                  placeholder="Phone number"
                  error={!!errors.phone}
                  helperText={!!errors.phone && errors.phone.message}
                  required
                  size="small"
                />
              );
            }}
          />
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
                  error={!!errors.email}
                  helperText={!!errors.email && errors.email.message}
                  required
                  size="small"
                />
              );
            }}
          />
        </Box>

        <LoadingButton
          variant="contained"
          loading={loading}
          disabled={_.isEmpty(dirtyFields) || !isValid}
          className="bg-[#1A4CFF] text-white w-[180px]"
          onClick={handleSubmit(handleOnSubmit)}
        >
          Make Appointment
        </LoadingButton>
      </Box>
    </Modal>
  );
};

export default EditPatientPersonalProfileModal;

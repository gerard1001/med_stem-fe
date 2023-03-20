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
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import axiosInstance from '../axios/axios.instance';
import { getOnePatient } from '../redux/reducers/patient.reducer';
import CloseXButton from './CloseXButton';
import LoadingButton from './LoadingButton';

const schema = yup.object({
  family_name: yup.string(),
  given_name: yup.string(),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Gender must be male or female'),
  birth_date: yup.date(),
  email: yup.string().email()
});
const defaultValues = {
  family_name: '',
  given_name: '',
  birth_date: format(new Date(), 'yyyy-MM-dd'),
  email: ''
};

const EditAdminDoctorPersonalProfileModal = ({
  open,
  onClose,
  info = {},
  handleOnSubmit = (data, setLoading) => {
    console.log(data);
  }
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
    defaultValues,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    const { family_name, given_name, gender, birth_date, email } = info;
    family_name && setValue('family_name', family_name);
    given_name && setValue('given_name', given_name);
    gender && setValue('gender', gender);
    birth_date &&
      setValue('birth_date', format(new Date(birth_date), 'yyyy-MM-dd'));
    email && setValue('email', email);
  }, [info]);

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
            name="family_name"
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value}
                variant="outlined"
                fullWidth
                label="Family Name"
                placeholder="Family Name"
                error={!!errors.family_name}
                helperText={errors.family_name && errors.family_name.message}
                required
                size="small"
              />
            )}
          />
          <Controller
            control={control}
            name="given_name"
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value}
                variant="outlined"
                fullWidth
                label="Given Name"
                placeholder="Given Name"
                error={!!errors.given_name}
                helperText={errors.given_name && errors.given_name.message}
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
            name="birth_date"
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                variant="outlined"
                fullWidth
                label="Birth Date"
                // label="Birth date"
                // placeholder="Birth date"
                error={!!errors.birth_date}
                helperText={errors.birth_date && errors.birth_date.message}
                required
                size="small"
              />
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
            name="email"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label="Email"
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
          className="w-[180px]"
          onClick={handleSubmit((data) => handleOnSubmit(data, setLoading))}
        >
          Save
        </LoadingButton>
      </Box>
    </Modal>
  );
};

export default EditAdminDoctorPersonalProfileModal;

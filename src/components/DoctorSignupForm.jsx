import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { subYears } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { getDepartmentList } from '../redux/reducers/department.reducer';
import { registerDoctor } from '../redux/reducers/doctor.reducer';
import Loader from './Loader/Loader';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  id_number: yup.string().min(8).max(16).required(),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Gender must be male or female')
    .required(),
  birth_date: yup
    .date()
    .typeError('Invalid Date')
    .min(subYears(new Date(), 100))
    .max(new Date())
    .required('Birth Date is required'),
  category: yup.string(),
  education: yup.string(),
  experience_years: yup.number(),
  cost_per_appointment: yup.number(),
  about: yup.string()
});

const DoctorSignupForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [departmentName, setDepartmentName] = React.useState([]);
  const [picture, setPicture] = React.useState(null);
  const [picUrl, setPicUrl] = React.useState(null);
  const departments = useSelector((state) => state.department);
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleChangeSelectInput = (event) => {
    const {
      target: { value }
    } = event;
    setDepartmentName(typeof value === 'string' ? value.split(',') : value);
  };

  const onSubmit = ({
    first_name,
    last_name,
    id_number,
    email,
    birth_date,
    gender,
    // salary,
    // department_id,
    experience_years,
    category,
    cost_per_appointment,
    about,
    education
  }) => {
    const department_id = departments?.data?.data
      ?.filter((item) => departmentName.includes(item.department_name))
      .map((item) => item.department_id);

    const formData = new FormData();
    if (department_id) {
      formData.append('department_id', department_id);
    }

    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('id_number', parseInt(id_number, 10));
    formData.append('gender', gender);
    formData.append('birth_date', new Date(birth_date));
    formData.append('picture', picture);
    formData.append('email', email);
    formData.append('category', category);
    formData.append('education', education);
    formData.append('experience_years', parseInt(experience_years, 10));
    formData.append('cost_per_appointment', parseInt(cost_per_appointment, 10));
    formData.append('about', about);

    // formData.append('salary', salary);
    setLoading(true);
    dispatch(registerDoctor(formData)).then(({ error }) => {
      if (!error) {
        reset();
        setPicture(null);
        setPicUrl(null);
      }
      setLoading(false);
    });
  };

  React.useEffect(() => {
    dispatch(getDepartmentList());
  }, []);
  React.useEffect(() => {
    if (picture) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPicUrl(e.target.result);
      };
      reader.readAsDataURL(picture);
    }
  }, [picture]);

  return (
    <Box className="md:p-4 p-8 flex flex-col w-full max-w-[1200px] mx-auto">
      <Typography
        variant="h6"
        sx={{ mb: '20px', textAlign: { md: 'left', xs: 'center' } }}
        className=""
      >
        Add Doctor
      </Typography>
      <Typography
        variant="subtitle1"
        fontWeight="600"
        sx={{ textAlign: { md: 'left', xs: 'center' } }}
      >
        Personal Information
      </Typography>
      <Box
        spacing={2}
        className="flex flex-row items-center justify-evenly md:flex-col w-[100%] gap-4 max-w-[1200px]"
      >
        <Box
          sx={{
            display: 'grid',
            flexDirection: 'column',
            width: '100%',
            gridTemplateColumns: {
              xs: 'auto',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr'
            },
            gap: 3
          }}
        >
          <Box className="w-[100%]">
            <Controller
              name="first_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Family Name"
                  variant="outlined"
                  sx={{ width: '100%', maxWidth: '400px' }}
                  size="small"
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                />
              )}
            />
          </Box>
          <Box className="w-[100%]">
            <Controller
              name="last_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Given Name"
                  variant="outlined"
                  sx={{ width: '100%', maxWidth: '400px' }}
                  size="small"
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                />
              )}
            />
          </Box>
          <Box className="w-[100%]">
            <Controller
              name="id_number"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="ID Nnumber"
                  variant="outlined"
                  sx={{ width: '100%', maxWidth: '400px' }}
                  size="small"
                  error={!!errors.id_number}
                  helperText={errors.id_number?.message}
                />
              )}
            />
          </Box>
          <Box className="w-[100%]">
            <Controller
              control={control}
              name="gender"
              defaultValue=""
              render={({ field }) => (
                <FormControl
                  variant="outlined"
                  margin="normal"
                  sx={{ margin: 0, maxWidth: '400px' }}
                  className="w-[100%]"
                  size="small"
                >
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
                    {errors.gender && errors.gender?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Box>
          <Box className="w-[100%]">
            <Controller
              control={control}
              name="birth_date"
              defaultValue=""
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Birth date"
                  size="small"
                  minDate={subYears(new Date(), 100)}
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
                />
              )}
            />
          </Box>
          <Box className="w-[100%]">
            {' '}
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  sx={{ width: '100%', maxWidth: '400px' }}
                  size="small"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Box>
        </Box>
        <Box className="flex flex-col items-center">
          <Box className="p-10 rounded-[50%] bg-[#e8f0fe] relative overflow-hidden cursor-pointer">
            <FiUser className="text-[60px] text-slate-500" />
            {picUrl && (
              <img
                className="w-full h-full absolute top-0 left-0 z-10"
                src={picUrl}
                alt=""
              />
            )}
            <input
              value=''
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

      <Typography
        variant="subtitle1"
        fontWeight="600"
        sx={{ my: '20px', textAlign: { md: 'left', xs: 'center' } }}
      >
        Contact Information
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'auto',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr'
          },
          gap: 3,
          maxWidth: '1200px'
        }}
      >
        <Box className="w-[100%]">
          <Controller
            name="departmentName"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <FormControl size="small" className="w-full">
                <InputLabel id="demo-multiple-checkbox-label">
                  Speciality
                </InputLabel>
                <Select
                  {...field}
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  size="small"
                  sx={{ width: '100%', maxWidth: '350px' }}
                  multiple
                  onChange={(event) => {
                    handleChangeSelectInput(event);
                    field.onChange(event.target.value);
                  }}
                  input={<OutlinedInput label="Speciality" />}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {departments?.data?.data?.map((name) => (
                    <MenuItem
                      key={name.department_id}
                      value={name.department_name}
                    >
                      <Checkbox
                        checked={
                          departmentName.indexOf(name.department_name) > -1
                        }
                      />
                      <ListItemText primary={name.department_name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Box>
        <Box className="w-[100%]">
          <Controller
            name="category"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Category"
                variant="outlined"
                size="small"
                sx={{ width: '100%', maxWidth: '350px', mb: 1 }}
                error={!!errors.category}
                helperText={errors.category?.message}
              />
            )}
          />
        </Box>

        <Box className="w-[100%]">
          <Controller
            name="education"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Education"
                variant="outlined"
                size="small"
                sx={{
                  width: '100%',
                  maxWidth: '350px'
                }}
                error={!!errors.education}
                helperText={errors.education?.message}
              />
            )}
          />
        </Box>
        <Box className="w-[100%]">
          <Controller
            name="experience_years"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Years Of Experience"
                variant="outlined"
                size="small"
                sx={{ width: '100%', maxWidth: '350px' }}
                error={!!errors.experience_years}
                helperText={errors.experience_years?.message}
              />
            )}
          />
        </Box>

        <Box className="w-[100%]">
          <Controller
            name="cost_per_appointment"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Cost Per Appointment"
                variant="outlined"
                size="small"
                sx={{ width: '100%', maxWidth: '350px' }}
                error={!!errors.cost_per_appointment}
                helperText={errors.cost_per_appointment?.message}
              />
            )}
          />
        </Box>
      </Box>

      <Typography
        variant="subtitle1"
        fontWeight="600"
        // sx={{ my: '20px' }}
        sx={{ my: '20px', textAlign: { md: 'left', xs: 'center' } }}
      >
        About
      </Typography>

      <Controller
        name="about"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="About"
            variant="outlined"
            // size="medium"
            multiline
            fullWidth
            minRows={3}
            maxRows={5}
            error={!!errors.about}
            helperText={errors.about?.message}
            className="md:w-full md:max-w-[350px] mx-auto"
          />
        )}
      />
      <Stack direction="row-reverse" className="items-endw-full">
        <Button
          type="submit"
          sx={{
            width: { md: '120px', xs: '80px' },
            color: '#1A4CFF',
            border: '1px solid #1A4CFF',
            borderRadius: '20px',
            marginTop: '30px',
            // marginX: 'auto',
            ':hover': { backgroundColor: '#a2ccff', border: 'none' }
          }}
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {!loading ? 'Save' : <Loader />}
        </Button>
      </Stack>
    </Box>
  );
};

export default DoctorSignupForm;

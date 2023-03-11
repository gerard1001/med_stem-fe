import React from 'react';
import { getDepartmentList } from '../redux/reducers/department.reducer';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiUser } from 'react-icons/fi';
import {
  Typography,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  FormHelperText,
  TextField,
  Button,
  Box
} from '@mui/material';
import { registerDoctor } from '../redux/reducers/doctor.reducer';

const schema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  id_number: yup.string().min(8).max(16).required(),
  email: yup.string().email().required(),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Gender must be male or female')
    .required(),
  marital_status: yup
    .string()
    .oneOf(
      ['single', 'married'],
      'Marital status can be only single or married'
    ),
  birth_date: yup.date().required(),
  salary: yup.number(),
  experience_years: yup.number(),
  cost_per_appointment: yup.number(),
  education: yup.string(),
  about: yup.string()
});

const DoctorSignupForm = () => {
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

  const [picture, setPicture] = React.useState({
    file: [],
    filepreview: null
  });
  const [departmentName, setDepartmentName] = React.useState([]);

  const dispatch = useDispatch();

  const handleChangeSelectInput = (event) => {
    const {
      target: { value }
    } = event;
    setDepartmentName(typeof value === 'string' ? value.split(',') : value);
  };

  const department_id = departments?.data?.data
    ?.filter((item) => departmentName.includes(item.department_name))
    .map((item) => item.department_id);

  React.useEffect(() => {
    dispatch(getDepartmentList());
  }, []);

  const handleInputChange = (e) => {
    setPicture({
      ...picture,
      file: e.target.files[0],
      filepreview: URL.createObjectURL(e.target.files[0])
    });
  };

  const handleUpload = () => {
    document.getElementById('file-input').click();
  };

  let doctorInfo = {};
  doctorInfo.department_id = department_id?.join(', ');
  delete doctorInfo.departmentName;

  const onSubmit = ({
    first_name,
    last_name,
    id_number,
    email,
    birth_date,
    gender,
    salary,
    department_id,
    experience_years,
    category,
    cost_per_appointment,
    about,
    education,
    picture
  }) => {
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('id_number', id_number);
    formData.append('email', email);
    formData.append('birth_date', birth_date);
    formData.append('gender', gender);
    formData.append('salary', salary);
    formData.append('department_id', doctorInfo.department_id);
    formData.append('experience_years', experience_years);
    formData.append('category', category);
    formData.append('cost_per_appointment', cost_per_appointment);
    formData.append('about', about);
    formData.append('education', education);
    formData.append('picture', picture);

    dispatch(registerDoctor(formData));
    reset({
      first_name: '',
      last_name: '',
      id_number: '',
      email: '',
      birth_date: '',
      gender: '',
      salary: '',
      department_id: '',
      experience_years: '',
      category: '',
      cost_per_appointment: '',
      about: '',
      education: '',
      picture: ''
    });
  };

  return (
    <Box>
      <Box className=" pt-20 w-[90%] mx-auto lg:pl-0 relative pb-10 mb-10">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            className="flex flex-row items-center justify-evenly md:flex-col w-[100%]"
          >
            <Box className="flex flex-col gap-4 w-[40%] md:w-full md:max-w-[400px] p-2 border-box">
              <Box className="w-[100%] min-w-[220px]">
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
              <Box className="w-[100%] min-w-[220px]">
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
              <Box className="w-[100%] min-w-[220px]">
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
            </Box>
            <Box className="flex flex-col gap-4 p-2 w-[40%] md:w-full md:max-w-[400px]">
              <Box className="w-[100%] min-w-[220px]" sx={{ height: '40px' }}>
                <Controller
                  control={control}
                  name="gender"
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl
                      variant="outlined"
                      margin="normal"
                      sx={{ margin: 0, maxWidth: '400px' }}
                      className="w-[100%] min-w-[220px]"
                      size="small"
                    >
                      <InputLabel required>Gender</InputLabel>
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
                      <FormHelperText error={true}>
                        {errors.gender && errors.gender?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Box>
              <Box className="w-[100%] min-w-[220px]" sx={{ height: '40px' }}>
                <Controller
                  control={control}
                  name="birth_date"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      variant="outlined"
                      sx={{ width: '100%', margin: 0, maxWidth: '400px' }}
                      // label="Birth date"
                      // placeholder="Birth date"
                      margin="normal"
                      size="small"
                      error={!!errors.birth_date}
                      helperText={
                        errors.birth_date && errors.birth_date.message
                      }
                      required
                    />
                  )}
                />
              </Box>
              <Box className="w-[100%] min-w-[220px]">
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
            <Box className="block w-[20%] md:mt-5 md:w-full md:max-w-[400px]">
              <Controller
                name="picture"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    type="file"
                    id="file-input"
                    sx={{ display: 'none' }}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e.target.files[0]);
                    }}
                  />
                )}
              />
              <Box className="flex flex-col gap-2 items-center w-fit mx-auto">
                {picture.filepreview !== null ? (
                  <img
                    src={picture.filepreview}
                    alt="UploadImage"
                    className="w-[150px] h-[150px] mx-auto lg:w-[150px] lg:h-[150px] rounded-[50%]"
                  />
                ) : (
                  <Box className="rounded-[50%] bg-[#e8f0fe] w-[150px] h-[150px] md:w-[80px]  md:h-[80px] relative">
                    <FiUser className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-[30px] mr-0 w-[30px] text-slate-500 mx-auto" />
                  </Box>
                )}

                <Button
                  onClick={handleUpload}
                  sx={{
                    color: '#fff',
                    width: { md: '120px', xs: '80px' },
                    color: '#1A4CFF',
                    border: '1px solid #1A4CFF',
                    borderRadius: '20px',
                    marginX: 'auto',
                    ':hover': { backgroundColor: '#a2ccff', border: 'none' }
                  }}
                >
                  Upload
                </Button>
              </Box>
            </Box>
          </Box>

          <Typography
            variant="subtitle1"
            fontWeight="600"
            sx={{ my: '20px', textAlign: { md: 'left', xs: 'center' } }}
          >
            Personal Information
          </Typography>

          <Box
            spacing={2}
            className="flex flex-row items-start lg:items-center justify-evenly md:flex-col w-[100%] flex-grow gap-2"
          >
            <Box className="flex flex-col gap-4 w-1/3 md:w-full md:max-w-[350px]">
              <Box className="w-[100%] min-w-[220px]">
                <Controller
                  name="departmentName"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <FormControl
                      size="small"
                      sx={{ width: { lg: 350, md: '237.67px', xs: '100%' } }}
                    >
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
                                departmentName.indexOf(name.department_name) >
                                -1
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
              <Box className="w-[100%] min-w-[220px]">
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
            </Box>

            <Box className="flex flex-col gap-4 w-1/3 md:w-full md:max-w-[350px]">
              <Box className="w-[100%] min-w-[220px]">
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
              <Box className="w-[100%] min-w-[220px]">
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
            </Box>

            <Box className="flex flex-col gap-4 w-1/3 md:w-full md:max-w-[350px]">
              <Box className="w-[100%] min-w-[220px]">
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
          </Box>

          <Typography variant="subtitle1" fontWeight="600" sx={{ my: '20px' }}>
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
                sx={{ height: '120px', width: '100%', maxWidth: '680px' }}
                error={!!errors.about}
                helperText={errors.about?.message}
              />
            )}
          />
          <Button
            type="submit"
            sx={{
              position: 'absolute',
              bottom: '0',
              right: '30px',
              color: '#fff',
              width: { md: '120px', xs: '80px' },
              color: '#1A4CFF',
              border: '1px solid #1A4CFF',
              borderRadius: '20px',
              marginTop: '30px',
              marginX: 'auto',
              ':hover': { backgroundColor: '#a2ccff', border: 'none' }
            }}
          >
            Save
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default DoctorSignupForm;

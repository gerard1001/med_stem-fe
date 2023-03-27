import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { subYears } from 'date-fns';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import axiosInstance from '../axios/axios.instance';
import { getInfoList } from '../redux/reducers/info.reducer';
import CloseXButton from './CloseXButton';
import Loader from './Loader/Loader';
import LoadingButton from './LoadingButton';

const defaultValues = {
  activeStep: 0,
  first_name: '',
  last_name: '',
  id_number: '',
  email: '',
  gender: '',
  marital_status: '',
  birth_date: '',
  country: '',
  address_1: '',
  address_2: '',
  city: '',
  phone_number: '',
  password: '',
  info: {}
};

const schema = yup.object({
  first_name: yup.string().min(4).max(16).required(),
  last_name: yup.string().min(4).max(16).required(),
  id_number: yup.number('Id number must be a number').required(),
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
    )
    .required(),
  birth_date: yup
    .date()
    .typeError('Invalid Date')
    .min(subYears(new Date(), 100))
    .max(new Date())
    .required(),
  country: yup.string().required(),
  address_1: yup.string().required(),
  address_2: yup.string().required(),
  city: yup.string().required(),
  phone_number: yup.string().min(4).max(12).required()
});

const PatientSignupForm = () => {
  const dispatch = useDispatch();
  const [clickedIdx, setClickedIdx] = React.useState(0);
  const [showDetails, setShowDetails] = React.useState(false);
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(schema)
  });
  const med_info = useSelector((state) => state.info);

  const gen_med_info = med_info?.data?.data?.filter(
    (values) => values.info_type !== 'special'
  );
  const spec_med_info = med_info?.data?.data?.filter(
    (values) => values.info_type === 'special'
  );

  const handleOpenCreateCycle = () => {
    setOpenCreateModal(true);
  };
  const handleCloseCreateModel = () => {
    setOpenCreateModal(false);
  };

  const onSubmit = async (data) => {
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

    try {
      setLoading(true);
      const response = await axiosInstance
        .post(`${process.env.BACKEND_URL}/users/client/register`, finalData)
        .finally(() => {
          setLoading(false);
        });

      reset();

      toast.success('Patient account was created successfully');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  React.useEffect(() => {
    dispatch(getInfoList());
  }, [dispatch]);

  return (
    <Box className="md:p-4 p-8 flex flex-col w-full max-w-[1200px] mx-auto">
      <Typography
        variant="h6"
        sx={{ textAlign: { md: 'left', xs: 'center' } }}
        className=""
      >
        Add Patient
      </Typography>
      <Typography
        variant="subtitle1"
        fontWeight="600"
        sx={{ mt: 3, mb: 1, textAlign: { md: 'left', xs: 'center' } }}
      >
        Personal Information
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
        <Box className="w-full">
          <Controller
            control={control}
            name="first_name"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label="Family name"
                  placeholder="Family name"
                  error={!!errors.first_name}
                  helperText={!!errors.first_name && errors.first_name.message}
                  size="small"
                />
              );
            }}
          />
        </Box>
        <Box className="w-full">
          <Controller
            control={control}
            name="last_name"
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                fullWidth
                label="Given name"
                placeholder="Given name"
                error={!!errors.last_name}
                helperText={errors.last_name && errors.last_name.message}
                size="small"
              />
            )}
          />
        </Box>
        <Box className="w-full">
          <Controller
            control={control}
            name="id_number"
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                fullWidth
                label="ID number"
                placeholder="ID number"
                error={!!errors.id_number}
                helperText={errors.id_number && errors.id_number.message}
                size="small"
              />
            )}
          />
        </Box>
        <Box className="w-full">
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <FormControl variant="outlined" className="w-full" size="small">
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
                <FormHelperText error>
                  {errors.gender && errors.gender.message}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Box>
        <Box className="w-full">
          <Controller
            control={control}
            name="birth_date"
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
        <Box className="w-full">
          <Controller
            control={control}
            name="marital_status"
            render={({ field }) => (
              <FormControl variant="outlined" className="w-full" size="small">
                <InputLabel required>Marital status</InputLabel>
                <Select
                  {...field}
                  label="Marital Status"
                  id="demo-simple-select"
                  error={!!errors.marital_status}
                  // helperText={
                  //   errors.marital_status && errors.marital_status.message
                  // }
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
      </Box>

      <Typography
        variant="subtitle1"
        fontWeight="600"
        sx={{ mt: 3, mb: 1, textAlign: { md: 'left', xs: 'center' } }}
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
        <Box className="w-full">
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
                  size="small"
                />
              );
            }}
          />
        </Box>
        <Box className="w-full">
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
                  size="small"
                />
              );
            }}
          />
        </Box>
        <Box className="w-full">
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
                  size="small"
                />
              );
            }}
          />
        </Box>
        <Box className="w-full">
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
                  size="small"
                />
              );
            }}
          />
        </Box>
        <Box className="w-full">
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
                  size="small"
                />
              );
            }}
          />
        </Box>
        <Box className="w-full">
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
                  size="small"
                />
              );
            }}
          />
        </Box>
      </Box>

      <Typography
        variant="subtitle1"
        fontWeight="600"
        sx={{ mt: 3, textAlign: { md: 'left', xs: 'center' } }}
      >
        Medical Information
      </Typography>
      {med_info?.loading && (
        <Box className="w-[80px] h-[80px] mx-auto ">
          <Loader />
        </Box>
      )}
      {!med_info?.loading && (
        <Box className="pr-4">
          {gen_med_info?.map((values, idx) => (
            <div key={values.info_id}>
              <Box className="flex flex-row items-center">
                <FormControl
                  id="form-control"
                  sx={{
                    my: 1,
                    display: { md: 'flex', xs: 'block' },
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%'
                  }}
                  variant="standard"
                >
                  <Typography
                    id="demo-error-radios"
                    sx={{ width: '100%', mr: 2 }}
                    className="line-clamp-4"
                  >
                    {values.info_name}
                  </Typography>
                  <Controller
                    control={control}
                    defaultValue="no"
                    name={`info.${values.info_id}.value`}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        aria-labelledby="demo-error-radios"
                        id="demo-radios"
                        row
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'row'
                        }}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          type="submit"
                          label="yes"
                          onClick={() => {
                            setShowDetails((state) => ({
                              ...state,
                              [idx]: true
                            }));
                            setClickedIdx(idx);
                          }}
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="no"
                          onClick={() => {
                            setClickedIdx(idx);
                            setShowDetails((state) => ({
                              ...state,
                              [idx]: false
                            }));
                          }}
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
                <LoadingButton
                  disabled={!showDetails[idx]}
                  onClick={() => {
                    setClickedIdx(idx);
                    handleOpenCreateCycle();
                  }}
                  variant="text"
                  className="capitalize"
                >
                  Details
                </LoadingButton>
              </Box>
              {clickedIdx === idx && (
                <Modal
                  open={openCreateModal}
                  onClose={handleCloseCreateModel}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box className="absolute w-[90%] max-w-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                    <Paper
                      sx={{
                        padding: {
                          xs: '40px 10% 2px',
                          md: '40px 40px 2px'
                        },
                        maxWidth: '480px',
                        position: 'relative'
                      }}
                    >
                      <CloseXButton onClick={handleCloseCreateModel} />
                      <Typography
                        variant="h6"
                        align="justify"
                        sx={{ textAlign: 'center' }}
                      >
                        Medical History
                      </Typography>
                      <Typography
                        align="justify"
                        sx={{ textAlign: 'center', mb: 3 }}
                      >
                        {values.info_name}
                      </Typography>
                      <Controller
                        control={control}
                        defaultValue=""
                        name={`info.${values.info_id}.details`}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            variant="outlined"
                            label="Description"
                            placeholder="Description"
                            size="small"
                            fullWidth
                            multiline
                            rows={2}
                            maxRows={4}
                          />
                        )}
                      />

                      <LoadingButton
                        onClick={() => {
                          handleCloseCreateModel();
                        }}
                        style={{
                          textTransform: 'capitalize',
                          fontWeight: 'bold',
                          display: 'block',
                          margin: '20px auto'
                        }}
                        variant="contained"
                      >
                        Submit
                      </LoadingButton>
                    </Paper>
                  </Box>
                </Modal>
              )}
            </div>
          ))}
        </Box>
      )}

      <Typography
        variant="subtitle1"
        fontWeight="600"
        sx={{ mt: 3, textAlign: { md: 'left', xs: 'center' } }}
      >
        Other Medical Information
      </Typography>
      {med_info?.loading && (
        <Box className="w-[80px] h-[80px] mx-auto ">
          <Loader />
        </Box>
      )}
      {!med_info?.loading && (
        <Box className="md:px-2">
          {spec_med_info?.map((values, idx) => (
            <Box key={values.info_description}>
              <Box key={values.info_id} className="block">
                <FormControl
                  id="form-control"
                  sx={{ marginTop: 3 }}
                  variant="standard"
                >
                  <FormLabel id="demo-error-radios">
                    {values.info_name}
                  </FormLabel>
                  <Controller
                    name={`info.${values.info_id}.value`}
                    defaultValue="no"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        aria-labelledby="demo-error-radios"
                        id="demo-radios"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          type="submit"
                          label="yes"
                          onClick={() => {
                            setShowDetails(() => ({
                              ...showDetails,
                              [`info.${values.info_id}.value`]: true
                            }));
                          }}
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="no"
                          onClick={() => {
                            setShowDetails(() => ({
                              ...showDetails,
                              [`info.${values.info_id}.value`]: false
                            }));
                          }}
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
                <Controller
                  control={control}
                  defaultValue=""
                  name={`info.${values.info_id}.details`}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label=""
                      placeholder=""
                      margin="normal"
                      style={{ background: '#e7e7e7', borderRadius: '10px' }}
                      size="medium"
                      disabled={!showDetails[`info.${values.info_id}.value`]}
                    />
                  )}
                />
              </Box>
            </Box>
          ))}
        </Box>
      )}
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
          onClick={handleSubmit(onSubmit, console.log)}
          disabled={loading}
        >
          {!loading ? 'Save' : <Loader />}
        </Button>
      </Stack>
    </Box>
  );
};

export default PatientSignupForm;

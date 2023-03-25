/* eslint-disable array-callback-return */
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import axiosInstance from '../../axios/axios.instance';
import {
  getInfoClientList,
  getInfoList
} from '../../redux/reducers/info.reducer';
import { getOnePatient } from '../../redux/reducers/patient.reducer';
import CloseXButton from '../CloseXButton';
import Loader from '../Loader/Loader';
import LoadingButton from '../LoadingButton';
import PatientProfileNavigation from './PatientProfileNavigation';

const MedicalHistory = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const patientData = useSelector((state) => state.patient.single_data.data);
  const { client: med_info } = useSelector((state) => state.info);
  const { loginData } = useSelector((state) => state.user);

  const { control, getValues, register, setValue, watch, reset } = useForm({
    mode: 'all'
  });
  const form = watch();

  const spec_med_info = med_info?.filter(
    (values) => values.info_type === 'special'
  );

  const gen_med_info = med_info?.filter(
    (values) => values.info_type !== 'special'
  );

  React.useEffect(() => {
    dispatch(getInfoClientList(loginData?.client_id));
  }, []);

  const handleDetailModal = (value) => {
    if (!value) {
      setOpenDetailModal(null);
      setCurrentValue(null);
    } else {
      setOpenDetailModal(true);
      setCurrentValue(value);
    }
  };

  const handleSubmit = async () => {
    const info = getValues();

    const yesValues = Object.keys(info).filter(
      (key) => info[key].value === 'yes'
    );

    const resultArray = yesValues.map((key) => {
      const valueObject = info[key];
      return `${key}#%#%${valueObject.details || ''}`;
    });
    const info_id = resultArray.join('#&#&');
    const { client_id } = patientData;

    try {
      setLoading(true);
      await axiosInstance
        .post(`${process.env.BACKEND_URL}/client_medicalinfo/`, {
          info_id,
          client_id
        })
        .then(() => {
          dispatch(getInfoClientList(patientData.client_id)).then(() => {
            setLoading(false);
            // reset();
            setIsEditing(false);
          });
        });
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    med_info?.map((value) => {
      const detail =
        value.patients && value.patients[0]?.Client_MedicalInfo?.description;

      setValue(`${value.info_id}.details`, detail || '', {
        shouldValidate: true
      });
      setValue(
        `${value.info_id}.value`,
        value.patients?.length > 0 ? 'yes' : 'no',
        { shouldValidate: true }
      );
    });
  }, [med_info]);

  return (
    <div>
      <Box className="w-full">
        <PatientProfileNavigation />
        {med_info ? (
          <Box className="pb-8 mb-24">
            <Box className="mt-8 mb-5 flex flex-row items-center justify-between">
              <Typography variant="subtitle1" fontWeight="600" fontSize="18px">
                Have you ever had any of the following?
              </Typography>
              {!isEditing && (
                <Button
                  sx={{
                    width: '80px',
                    height: '30px',
                    color: '#1A4CFF',
                    border: '1px solid #1A4CFF',
                    borderRadius: '20px',
                    ':hover': {
                      backgroundColor: 'primary.dark',
                      color: '#fff'
                    }
                  }}
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  Edit
                </Button>
              )}
            </Box>
            <Box>
              {gen_med_info?.map((value) => {
                return (
                  <Box
                    className="flex flex-row items-center h-[50px] lg:h-min"
                    key={value.info_id}
                  >
                    <FormControl
                      id="form-control"
                      sx={{
                        my: 3,
                        display: { md: 'flex', xs: 'block' },
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%'
                      }}
                      variant="standard"
                      disabled={!isEditing}
                    >
                      <Typography
                        id="demo-error-radios"
                        sx={{ width: '100%' }}
                        className="line-clamp-4"
                      >
                        {value.info_name}
                      </Typography>
                      <Controller
                        control={control}
                        name={`${value.info_id}.value`}
                        defaultValue={value.patients?.length > 0 ? 'yes' : 'no'}
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
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio />}
                              label="no"
                            />
                          </RadioGroup>
                        )}
                      />
                    </FormControl>
                    <LoadingButton
                      className="capitalize"
                      variant="text"
                      disabled={
                        !form[value.info_id] ||
                        form[value.info_id].value !== 'yes'
                      }
                      onClick={() => {
                        handleDetailModal(value);
                      }}
                    >
                      Details
                    </LoadingButton>
                  </Box>
                );
              })}
            </Box>
            <Box>
              <Box className="mt-8 mb-5 flex flex-row items-center justify-between">
                <Typography
                  variant="subtitle1"
                  fontWeight="600"
                  fontSize="18px"
                >
                  Other Medical History
                </Typography>
              </Box>
              <Box className="flex flex-col items-start gap-8">
                {spec_med_info?.map((value) => {
                  return (
                    <Box
                      className="flex flex-col items-start w-[100%]"
                      key={value.info_id}
                    >
                      <Box className="flex flex-row items-center w-[100%] h-[50px] lg:h-min">
                        <FormControl
                          id="form-control"
                          sx={{
                            marginY: 3,
                            display: { md: 'flex', xs: 'block' },
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%'
                          }}
                          variant="standard"
                          disabled={!isEditing}
                        >
                          <Typography
                            id="demo-error-radios"
                            sx={{ width: '100%' }}
                            className="line-clamp-4"
                          >
                            {value.info_name}
                          </Typography>
                          <Controller
                            control={control}
                            name={`${value.info_id}.value`}
                            defaultValue={
                              value.patients?.length > 0 ? 'yes' : 'no'
                            }
                            render={({ field }) => (
                              <RadioGroup
                                {...field}
                                onChange={(value) => {
                                  isEditing && field.onChange(value);
                                }}
                                aria-labelledby="demo-error-radios"
                                id="demo-radios"
                                row
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  flexDirection: 'row'
                                }}
                                className=""
                              >
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  type="submit"
                                  label="yes"
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="no"
                                />
                              </RadioGroup>
                            )}
                          />
                        </FormControl>
                        <LoadingButton
                          className="capitalize"
                          disabled={
                            !form[value.info_id] ||
                            form[value.info_id].value !== 'yes'
                          }
                          onClick={() => {
                            handleDetailModal(value);
                          }}
                          variant="text"
                        >
                          Details
                        </LoadingButton>
                      </Box>
                      <Typography
                        id="demo-error-radios"
                        sx={{ width: '100%' }}
                        className="line-clamp-4"
                      >
                        If Yes please provide details:
                      </Typography>
                      <TextField
                        {...register(`${value?.info_id}.details`)}
                        className="bg-[#E7E7E7] w-[80%]"
                        disabled={
                          !isEditing ||
                          !form[value.info_id] ||
                          form[value.info_id].value !== 'yes'
                        }
                      />
                    </Box>
                  );
                })}
              </Box>
              <Stack direction="row-reverse" className="w-full" pt={3}>
                {isEditing && (
                  <Button
                    sx={{
                      width: '80px',
                      height: '30px',
                      color: '#1A4CFF',
                      border: '1px solid #1A4CFF',
                      borderRadius: '20px',
                      ':hover': {
                        backgroundColor: 'primary.dark',
                        color: '#fff'
                      }
                    }}
                    onClick={() => {
                      handleSubmit();
                    }}
                    disabled={loading}
                  >
                    {!loading ? 'Save' : <Loader />}
                  </Button>
                )}
              </Stack>
            </Box>
          </Box>
        ) : (
          <Box className="flex flex-row justify-center">
            <Box className="w-[70px] h-[70px]">
              <Loader />
            </Box>
          </Box>
        )}
      </Box>

      <Modal
        open={openDetailModal}
        onClose={() => {
          setOpenDetailModal(true);
        }}
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
            <CloseXButton
              onClick={() => {
                setOpenDetailModal(false);
              }}
            />
            <Typography
              variant="h6"
              align="justify"
              sx={{ textAlign: 'center' }}
            >
              Medical History
            </Typography>
            <Typography align="justify" sx={{ textAlign: 'center', mb: 3 }}>
              {currentValue?.info_name}
            </Typography>
            <Controller
              control={control}
              name={`${currentValue?.info_id}.details`}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  label="Description"
                  placeholder="Description"
                  size="small"
                  disabled={!isEditing}
                  fullWidth
                  multiline
                  rows={2}
                  maxRows={4}
                />
              )}
            />

            <LoadingButton
              onClick={() => {
                setOpenDetailModal(false);
              }}
              color="primary"
              style={{
                textTransform: 'capitalize',
                fontWeight: 'bold',
                display: 'block',
                margin: '20px auto'
              }}
              className="mx-auto max-w-[150px] w-full"
              variant="contained"
              disabled={!isEditing}
            >
              Submit
            </LoadingButton>
          </Paper>
        </Box>
      </Modal>
    </div>
  );
};

export default MedicalHistory;

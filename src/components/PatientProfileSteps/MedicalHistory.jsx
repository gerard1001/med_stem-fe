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
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { med_info } from '../../utils/dummyData';
import PatientProfileNavigation from './PatientProfileNavigation';
import * as yup from 'yup';
import { FiCornerLeftDown } from 'react-icons/fi';
import CloseXButton from '../CloseXButton';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../axios/axios.instance';
import { getOnePatient } from '../../redux/reducers/patient.reducer';
import { getInfoList } from '../../redux/reducers/info.reducer';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

const schema = yup.object().shape({});

const MedicalHistory = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const patientData = useSelector((state) => state.patient.single_data.data);
  const med_info = useSelector((state) => state.info);

  const spec_med_info = med_info?.data?.data?.filter(
    (values) => values.info_type === 'special'
  );

  const gen_med_info = med_info?.data?.data?.filter(
    (values) => values.info_type !== 'special'
  );

  React.useEffect(() => {
    dispatch(getInfoList());
  }, []);

  const { control, getValues, register, watch } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });
  const form = watch();

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
    const client_id = patientData.client_id;

    try {
      setLoading(true);
      await axiosInstance
        .post(`${process.env.BACKEND_URL}/client_medicalinfo/`, {
          info_id,
          client_id
        })
        .then(() => {
          dispatch(getOnePatient(patientData.client_id));
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const availableInfo = patientData?.medical_info?.map((item) => item.info_id);

  return (
    <div>
      <Box className="w-full">
        <PatientProfileNavigation />
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
                      defaultValue={
                        availableInfo?.includes(value.info_id) ? 'yes' : 'no'
                      }
                      render={({ field }) => (
                        <RadioGroup
                          {...field}
                          aria-labelledby="demo-error-radios"
                          id="demo-radios"
                          row
                          // name={value.info_id}
                          // value={field.value}
                          // onChange={(event) => {
                          //   isEditing && field.onChange(event.target.value);
                          // }}
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
                  <Button
                    style={{
                      backgroundColor: '#fafcfd',
                      color: '#000',
                      textTransform: 'capitalize'
                    }}
                    className="capitalize"
                    disabled={
                      !isEditing ||
                      getValues(`${value.info_id}.value`) !== 'yes'
                    }
                    onClick={() => {
                      handleDetailModal(value);
                    }}
                  >
                    Details
                  </Button>
                </Box>
              );
            })}
          </Box>
          <Box>
            <Box className="mt-8 mb-5 flex flex-row items-center justify-between">
              <Typography variant="subtitle1" fontWeight="600" fontSize="18px">
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
                          render={({ field }) => (
                            <RadioGroup
                              {...field}
                              defaultValue={
                                availableInfo?.includes(value.info_id)
                                  ? 'yes'
                                  : 'no'
                              }
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
                      <Button
                        style={{
                          backgroundColor: '#fafcfd',
                          color: '#000',
                          textTransform: 'capitalize'
                        }}
                        className="capitalize"
                        disabled={
                          !isEditing ||
                          getValues(`${value.info_id}.value`) !== 'yes'
                        }
                        onClick={() => {
                          handleDetailModal(value);
                        }}
                      >
                        Details
                      </Button>
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
                        getValues(`${value.info_id}.value`) !== 'yes'
                      }
                      defaultValue=""
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
                >
                  {!loading ? 'Save' : <Loader />}
                </Button>
              )}
            </Stack>
          </Box>
        </Box>
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
          <main className="">
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
              <Typography align="justify" sx={{ textAlign: 'center' }}>
                {currentValue?.info_name}
              </Typography>
              <Controller
                control={control}
                defaultValue=""
                name={`${currentValue?.info_id}.details`}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    label="Description"
                    placeholder="Description"
                    margin="normal"
                    size="small"
                  />
                )}
              />

              <Button
                onClick={() => {
                  setOpenDetailModal(false);
                }}
                color="primary"
                style={{
                  backgroundColor: '#0093df',
                  color: '#fff',
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  display: 'block',
                  margin: '20px auto',
                  padding: '5px 20px'
                }}
                className="hover:bg-black mx-auto"
              >
                Submit
              </Button>
            </Paper>
          </main>
        </Box>
      </Modal>
    </div>
  );
};

export default MedicalHistory;

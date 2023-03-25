import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  styled,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  Table,
  TableBody,
  Button,
  IconButton,
  Modal,
  TextField,
  InputLabel,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  ListItemText,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  Radio
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOneAppointment,
  updateAppointment
} from '../../redux/reducers/appointment.reducer';
import {
  addRecommendation,
  getRecommendations,
  removeRecommendation
} from '../../redux/reducers/recommendation.reducer';
import HomeNavBar from '../HomeNavBar';
import AppointmantPageNavigation from './AppointmantPageNavigation';
import { BsPlusCircleFill } from 'react-icons/bs';
import AddNewAppointmentData from './AddNewAppointmentData';
import CloseXButton from '../CloseXButton';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';
import {
  cureduration,
  dayfrequency,
  weekfrequency
} from '../../utils/dummyData';
import Loader from '../Loader/Loader';
import { IoCloseSharp } from 'react-icons/io5';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#E7E7E7',
  ...theme.typography.body2,
  padding: '2px 5px',
  boxShadow: 'none',
  borderRadius: 'none'
}));

const DoctorAppointmentPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const recommendation = useSelector((state) => state.recommendation);
  const [openDrugModal, setOpenDrugModal] = useState(false);
  const [openRecommendationModal, setOpenRecommendationModal] = useState(false);
  const [recName, setRecName] = useState(false);
  const [checked, setChecked] = useState([]);
  const [defaultComplaints, setDefaultComplaints] = useState('');
  const [defaultDiagnosis, setDefaultDiagnosis] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [inputEntered, setInputEntered] = useState(false);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleRecommendationInput = (event) => {
    const {
      target: { value }
    } = event;
    setRecName(value);
  };

  const handleOpenDrugModal = () => setOpenDrugModal(true);
  const handleCloseDrugModal = () => setOpenDrugModal(false);

  const handleOpenRecommendationModal = () => setOpenRecommendationModal(true);
  const handleCloseRecommendationModal = () =>
    setOpenRecommendationModal(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset
  } = useForm({});

  const appointment = useSelector(
    (state) => state.appointment.entities.undefined
  );

  let urlId = window.location.href.substring(
    window.location.href.lastIndexOf('/') + 1
  );

  let appointmentId;

  urlId.includes('?')
    ? (appointmentId = urlId.slice(0, urlId.lastIndexOf('?')))
    : (appointmentId = urlId);

  useEffect(() => {
    dispatch(getOneAppointment(appointmentId));
  }, [appointmentId, urlId, dispatch]);

  useEffect(() => {
    dispatch(getRecommendations());
  }, []);

  useEffect(() => {
    setDefaultComplaints(appointment?.data?.complaints);
    setDefaultDiagnosis(appointment?.data?.diagnosis);
    if (appointment?.data?.diagnosis || appointment?.data?.complaints) {
      setIsStarted(false);
    }
  }, [appointment, appointmentId, urlId]);

  const date = new Date(appointment?.data?.work_day?.date);

  const drugs =
    !Array.isArray(appointment?.data?.drugs) && appointment?.data?.drugs
      ? JSON.parse(appointment?.data?.drugs)
      : [];

  const recommendations =
    !Array.isArray(appointment?.data?.recommendations) &&
    appointment?.data?.recommendations
      ? JSON.parse(appointment?.data?.recommendations)
      : [];

  const existingRecommendations = recommendations?.map((value) => {
    return value;
  });

  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear()
  ];

  const handleStartAppointment = () => {
    setIsStarted(true);
  };

  const onSubmitAppointmentData = async ({ complaints, diagnosis }) => {
    setLoading(true);
    const body = {
      complaints: complaints,
      diagnosis: diagnosis
    };
    const data = { appointmentId, body };
    dispatch(updateAppointment(data)).then(() => {
      dispatch(getOneAppointment(appointmentId));
    });
    // reset();
  };

  const onSubmitDrugData = ({
    name,
    dosage,
    frequency_per_day,
    frequency_per_week,
    duration,
    start_date,
    end_date,
    explanation
  }) => {
    const body = {
      drugs: [
        {
          name,
          dosage,
          frequency_per_day: frequency_per_day[0],
          frequency_per_week: frequency_per_week[0],
          duration: duration[0],
          start_date: format(new Date(start_date), 'MM-dd-yyyy'),
          end_date: format(new Date(start_date), 'MM-dd-yyyy'),
          explanation
        }
      ]
    };

    const data = { appointmentId, body };

    dispatch(updateAppointment(data)).then(() => {
      dispatch(getOneAppointment(appointmentId)).then(() => {
        handleCloseDrugModal();
      });
    });
    reset();
  };

  const onSubmitRecommendationData = () => {
    const body = {
      recommendations: checked
    };

    const data = { appointmentId, body };

    dispatch(updateAppointment(data)).then(() => {
      dispatch(getOneAppointment(appointmentId)).then(() => {
        handleCloseRecommendationModal();
      });
    });
    setChecked([]);
    reset();
  };

  const onSubmitNewRecommendation = ({ recommendation_name }) => {
    const body = {
      recommendation_name
    };

    const data = { body };

    dispatch(addRecommendation(data)).then(() => {
      dispatch(getRecommendations());
    });
    reset();
  };

  const onSubmitRemoveRecommendation = (idx) => {
    const data = {
      appointmentId: appointmentId,
      recommendationIndex: idx
    };

    dispatch(removeRecommendation(data)).then(() => {
      dispatch(getOneAppointment(appointmentId));
      dispatch(getRecommendations());
      setChecked([]);
    });
    reset();
  };

  return (
    <Box className="bg-[#F5F5F5] min-h-[100vh]">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitAppointmentData)}
        className="p-10 max-w-[1200px] w-[85%] sm:w-[100%] sm:p-4 flex flex-col gap-4 items-start relative pb-20"
      >
        <Box className="flex flex-center gap-3 font-semibold">
          <Typography variant="h6">Appointments</Typography>
          <Typography variant="h6">-</Typography>
          <Typography variant="h6">
            {appointment?.data?.client?.first_name}{' '}
            {appointment?.data?.client?.last_name}
          </Typography>
        </Box>
        <AppointmantPageNavigation appointment={appointment?.data} />
        <Box className="flex w-fit gap-5 items-start flex-row sm:flex-col sm:gap-2">
          <Typography variant="subtitle1" fontSize="17px">
            Date: {day}.{month}.{year}
          </Typography>
          <Typography variant="subtitle1" fontSize="17px">
            ID: {appointment?.data?.appointment_number}
          </Typography>
        </Box>
        {!isStarted &&
          !appointment?.data?.complaints &&
          !appointment?.data?.diagnosis && (
            <Button
              className="border border-primary"
              sx={{
                color: '#fff',
                width: 'fit-content',
                color: '#1A4CFF',
                border: '1px solid #1A4CFF',
                borderRadius: '10px',
                ':hover': {
                  backgroundColor: '#a2ccff',
                  border: '1px solid #a2ccff'
                },
                '& .MuiButtonBase-root': {
                  height: 25
                }
              }}
              onClick={handleStartAppointment}
            >
              Start Appointment
            </Button>
          )}

        {isStarted && (!defaultDiagnosis || !defaultComplaints) && (
          <AddNewAppointmentData
            handleOpenDrugModal={handleOpenDrugModal}
            handleOpenRecommendationModal={handleOpenRecommendationModal}
          />
        )}

        {(appointment?.data?.complaints ||
          appointment?.data?.diagnosis ||
          (Array.isArray(appointment?.data?.drugs) &&
            !appointment?.data?.drugs)) && (
          <Box className="w-[100%] sm:p-0 flex flex-col gap-4 items-start">
            <Box className="flex w-full gap-2 items-start flex-col">
              <Typography variant="subtitle1" fontWeight={600}>
                Complaints
              </Typography>
              <Box className="p-4 w-full border border-[#71a9f7] bg-white rounded-[8px] leading-3 min-h-[50px]">
                {/* <Typography
                  variant="subtitle1"
                  className="leading-5 text-[15px]"
                >
                  {appointment?.data?.complaints}
                </Typography> */}
                <Controller
                  control={control}
                  name="complaints"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      defaultValue={defaultComplaints}
                      multiline
                      minRows={!appointment?.data?.complaints && 3}
                      maxRows={!appointment?.data?.complaints && 5}
                      onInput={setInputEntered(true)}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        spellCheck: false
                      }}
                      className="w-full border-none"
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-root': {
                          borderRadius: '5px'
                        },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '5px'
                        }
                      }}
                    />
                  )}
                />
              </Box>
            </Box>

            <Box className="flex w-full gap-2 items-start flex-col">
              <Typography variant="subtitle1" fontWeight={600}>
                Diagnosis
              </Typography>
              <Box className="p-4 w-full border border-[#71A9F7] bg-white rounded-[8px] leading-3  min-h-[50px]">
                {/* <Typography
                  variant="subtitle1"
                  className="leading-5 text-[15px]"
                >
                  {appointment?.data?.diagnosis}
                </Typography> */}
                <Controller
                  control={control}
                  name="diagnosis"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      defaultValue={defaultDiagnosis}
                      multiline
                      minRows={!appointment?.data?.diagnosis && 3}
                      maxRows={!appointment?.data?.diagnosis && 5}
                      onInput={setInputEntered(true)}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        spellCheck: false
                      }}
                      className="w-full border-none"
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-root': {
                          borderRadius: '5px'
                        },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '5px'
                        }
                      }}
                    />
                  )}
                />
              </Box>
            </Box>

            <Box className="flex w-full gap-2 items-start justify-between flex-col">
              <Box className="flex w-full gap-2 items-center justify-between flex-row">
                <Typography variant="subtitle1" fontWeight={600}>
                  Drugs
                </Typography>
                <IconButton
                  className="w-fit flex items-center gap-1 text-[14px]"
                  onClick={handleOpenDrugModal}
                >
                  <BsPlusCircleFill className="text-primary" /> Add medecine
                </IconButton>
              </Box>
              <Box className="p-4 w-full border border-[#71A9F7] bg-white rounded-[8px] leading-3  min-h-[80px] max-h-[360px] overflow-auto">
                {!Array.isArray(appointment?.data?.drugs) &&
                  appointment?.data?.drugs && (
                    <TableContainer component={Paper} elevation={0}>
                      <Table
                        stickyHeader
                        sx={{
                          minWidth: 650,
                          backgroundColor: '#fff',
                          height: 'fit',
                          overflow: 'auto'
                        }}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{ fontSize: '14px', fontWeight: 550 }}
                            >
                              Name
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{ fontSize: '14px', fontWeight: 550 }}
                            >
                              Dosage
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{ fontSize: '14px', fontWeight: 550 }}
                            >
                              Frequency
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{ fontSize: '14px', fontWeight: 550 }}
                            >
                              Duration
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{ fontSize: '14px', fontWeight: 550 }}
                            >
                              Date
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{ fontSize: '14px', fontWeight: 550 }}
                            >
                              Explanation
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {drugs?.map((row, idx) => (
                            <TableRow
                              key={idx + 1}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0
                                }
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="left" sx={{ fontSize: '14px' }}>
                                {row.dosage}
                              </TableCell>
                              <TableCell align="left" sx={{ fontSize: '14px' }}>
                                {row.frequency_per_day}
                              </TableCell>
                              <TableCell align="left" sx={{ fontSize: '14px' }}>
                                {row.duration}
                              </TableCell>
                              <TableCell
                                align="left"
                                sx={{
                                  fontSize: '14px'
                                }}
                              >
                                {row.start_date}
                              </TableCell>
                              <TableCell
                                align="left"
                                sx={{
                                  fontSize: '14px'
                                }}
                                className="truncate max-w-[100px]"
                              >
                                {row.explanation}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
              </Box>
            </Box>

            <Box className="flex w-full gap-2 items-start flex-col">
              <Box className="flex w-full gap-2 items-center justify-between flex-row">
                <Typography variant="subtitle1" fontWeight={600}>
                  Recommendations
                </Typography>
                {!recommendations[0] && (
                  <IconButton
                    className="w-fit flex items-center gap-1 text-[14px]"
                    onClick={handleOpenRecommendationModal}
                  >
                    <BsPlusCircleFill className="text-primary" /> Add
                    recommendation
                  </IconButton>
                )}
              </Box>

              <Box className="p-4 w-full border border-[#71A9F7] bg-white rounded-[8px] flex flex-row items-center flex-wrap flex-grow gap-2  min-h-[80px] max-h-[360px] ">
                {recommendations?.map((item, idx) => {
                  return (
                    <Box
                      key={idx + 1}
                      className="relative bg-[#ececec] rounded-[5px] px-3 py-[3px] pr-8 cursor-pointer"
                    >
                      {item}
                      <IconButton
                        className="text-[#686868] ml-0 absolute right-[6px] top-[8px] w-fit h-fit p-[1px] bg-slate-300 hover:bg-slate-400"
                        onClick={() => {
                          // setRecommendationIndex(idx);
                          onSubmitRemoveRecommendation(idx);
                        }}
                      >
                        <IoCloseSharp className="font-light text-sm" />
                      </IconButton>
                    </Box>
                  );
                })}
                {recommendations[0] && (
                  <IconButton
                    className="w-fit flex items-center gap-1 text-[14px]"
                    onClick={handleSubmit(handleOpenRecommendationModal)}
                  >
                    <BsPlusCircleFill className="text-primary" />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
        )}
        {inputEntered && (defaultComplaints || defaultDiagnosis) && (
          <Box className="relative w-full h-fit min-h-[40px]">
            <Box className="absolute right-0 w-fit flex items-center justify-end gap-5">
              <Button
                type="submit"
                className=" bottom-2 right-2 mt-10"
                size="small"
                sx={{
                  color: '#fff',
                  width: '80px',
                  color: '#1A4CFF',
                  border: '1px solid #1A4CFF',
                  borderRadius: '10px',
                  marginX: 'auto',
                  ':hover': {
                    backgroundColor: '#a2ccff',
                    border: '1px solid #a2ccff'
                  },
                  '& .MuiButtonBase-root': {
                    height: 25
                  }
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      <Modal
        open={openDrugModal}
        onClose={handleCloseDrugModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute translate-x-[-50%] border border-[#71A9F7] rounded-2xl translate-y-[-50%] top-[50%] left-[50%] w-[80%] sm:w-[99%] max-w-[640px] border-none p-8 xs:p-2 bg-white max-h-[540px] overflow-auto">
          <Box className="flex flex-col items-center gap-8">
            <form
              onSubmit={handleSubmit(onSubmitDrugData)}
              className="flex flex-col w-[100%] gap-2 items-center justify-between rounded-[8px] leading-3"
            >
              <Box className="flex w-full gap-3 items-center justify-between flex-row">
                <Typography
                  fontWeight={700}
                  variant="subtitle1"
                  className="leading-5 text-[17px]"
                >
                  Add Drug
                </Typography>
                <Box className="">
                  <CloseXButton onClick={handleCloseDrugModal} />
                </Box>
              </Box>

              <Box className="border rounded-[10px] p-5 xs:p-1 flex flex-col items-start gap-5">
                <Box className="w-full flex items-center gap-4 flex-nowrap md:flex-wrap border-box sm:justify-center">
                  <Box className="flex flex-col items-start  md:w-full">
                    <Typography
                      variant="subtitle2"
                      fontSize="13px"
                      className="mb-2"
                    >
                      Drug Name
                    </Typography>
                    <Controller
                      control={control}
                      name="name"
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          multiline
                          placeholder="Name of medecine"
                          sx={{
                            width: '100%',
                            '& .MuiInputBase-input': {
                              padding: '5px 10px',
                              backgroundColor: '#E7E7E7',
                              borderRadius: '5px 0 0 5px'
                            },
                            '& .MuiFormLabel-root': {
                              top: '-10px'
                            },
                            '& .MuiInputBase-root': {
                              padding: 0,
                              borderRadius: '5px'
                            },
                            '& .MuiOutlinedInput-root': {
                              padding: 0
                            }
                          }}
                        />
                      )}
                    />
                  </Box>

                  <Box className="flex flex-col items-start  md:w-full">
                    <Typography
                      variant="subtitle2"
                      fontSize="13px"
                      className="mb-2"
                    >
                      Dosage
                    </Typography>
                    <Controller
                      control={control}
                      name="dosage"
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          placeholder="Dosage quantity"
                          fullWidth
                          multiline
                          sx={{
                            width: '100%',
                            '& .MuiInputBase-input': {
                              padding: '5px 10px',
                              backgroundColor: '#E7E7E7',
                              borderRadius: '5px 0 0 5px'
                            },
                            '& .MuiFormLabel-root': {
                              top: '-10px'
                            },
                            '& .MuiInputBase-root': {
                              padding: 0,
                              borderRadius: '5px'
                            }
                          }}
                        />
                      )}
                    />
                  </Box>

                  <Box className="flex flex-col items-start  md:w-full">
                    <Typography
                      variant="subtitle2"
                      fontSize="13px"
                      className="truncate mb-2"
                    >
                      Frequency per week
                    </Typography>
                    <Controller
                      name="frequency_per_week"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => (
                        <FormControl
                          size="small"
                          className="w-full"
                          sx={{
                            '& .MuiInputBase-input': {
                              padding: '5px 10px',
                              backgroundColor: '#E7E7E7',
                              borderRadius: '5px'
                            },
                            '& .MuiFormLabel-root': {
                              top: '-4px'
                            },
                            '& .MuiInputLabel-formControl': {
                              top: '-4px'
                            },
                            '& .MuiInputLabel-formControl': {
                              top: '-4px'
                            },
                            '& .MuiInputLabel-root': {
                              top: '-4px'
                            },
                            '& .MuiInputBase-root': {
                              borderRadius: '5px'
                            }
                          }}
                        >
                          <InputLabel id="demo-multiple-checkbox-label">
                            Select
                          </InputLabel>
                          <Select
                            {...field}
                            required
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            size="small"
                            multiple
                            // onChange={(event) => {
                            //   handleChangeSelectInput(event);
                            //   field.onChange(event.target.value);
                            // }}
                            className="rounded-[5px]"
                            sx={{
                              '& .MuiInputBase-input': {
                                padding: '5px 10px',
                                backgroundColor: '#E7E7E7',
                                borderRadius: '5px'
                              },
                              '& .MuiFormLabel-root': {
                                top: '-4px'
                              },
                              '& .MuiInputLabel-formControl': {
                                top: '-4px'
                              },
                              '& .MuiInputLabel-formControl': {
                                top: '-4px'
                              },
                              '& .MuiInputLabel-root': {
                                top: '-4px'
                              },
                              '& .MuiInputBase-root': {
                                borderRadius: '5px'
                              }
                            }}
                            input={<OutlinedInput label="Select" />}
                            renderValue={(selected) => selected.join(', ')}
                          >
                            {weekfrequency.map((name, idx) => (
                              <MenuItem key={idx} value={name}>
                                <ListItemText primary={name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Box>
                </Box>
                <Box className="w-[100%] flex items-center gap-4 flex-nowrap md:flex-wrap border-box sm:justify-center">
                  <Box className="flex flex-col items-start w-2/7 md:w-full">
                    <Typography
                      variant="subtitle2"
                      fontSize="13px"
                      className="truncate mb-2"
                    >
                      Frequency per day
                    </Typography>
                    <Controller
                      name="frequency_per_day"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => (
                        <FormControl
                          size="small"
                          className="w-full"
                          sx={{
                            '& .MuiInputBase-input': {
                              padding: '5px 10px',
                              backgroundColor: '#E7E7E7',
                              borderRadius: '5px'
                            },
                            '& .MuiFormLabel-root': {
                              top: '-4px'
                            },
                            '& .MuiInputLabel-formControl': {
                              top: '-4px'
                            },
                            '& .MuiInputLabel-formControl': {
                              top: '-4px'
                            },
                            '& .MuiInputLabel-root': {
                              top: '-4px'
                            },
                            '& .MuiInputBase-root': {
                              borderRadius: '5px'
                            }
                          }}
                        >
                          <InputLabel id="demo-multiple-checkbox-label">
                            Select
                          </InputLabel>
                          <Select
                            {...field}
                            required
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            size="small"
                            multiple
                            // onChange={(event) => {
                            //   handleChangeSelectInput(event);
                            //   field.onChange(event.target.value);
                            // }}
                            className="rounded-[5px]"
                            sx={{
                              '& .MuiInputBase-input': {
                                padding: '5px 10px',
                                backgroundColor: '#E7E7E7',
                                borderRadius: '5px'
                              },
                              '& .MuiFormLabel-root': {
                                top: '-4px'
                              },
                              '& .MuiInputBase-root': {
                                borderRadius: '5px'
                              }
                            }}
                            input={<OutlinedInput label="Select" />}
                            renderValue={(selected) => selected.join(', ')}
                          >
                            {dayfrequency.map((name, idx) => (
                              <MenuItem key={idx} value={name}>
                                <ListItemText primary={name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Box>

                  <Box className="flex flex-col items-start w-2/7 md:w-full">
                    <Typography
                      variant="subtitle2"
                      fontSize="13px"
                      className="truncate mb-2 min-w-[100px]"
                    >
                      Duration
                    </Typography>
                    <Controller
                      name="duration"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => (
                        <FormControl
                          size="small"
                          className="w-full"
                          sx={{
                            '& .MuiInputBase-input': {
                              padding: '5px 10px',
                              backgroundColor: '#E7E7E7',
                              borderRadius: '5px'
                            },
                            '& .MuiFormLabel-root': {
                              top: '-4px'
                            },
                            '& .MuiInputLabel-formControl': {
                              top: '-4px'
                            },
                            '& .MuiInputLabel-formControl': {
                              top: '-4px'
                            },
                            '& .MuiInputLabel-root': {
                              top: '-4px'
                            },
                            '& .MuiInputBase-root': {
                              borderRadius: '5px'
                            }
                          }}
                        >
                          <InputLabel id="demo-multiple-checkbox-label">
                            Select
                          </InputLabel>
                          <Select
                            {...field}
                            required
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            size="small"
                            multiple
                            // onChange={(event) => {
                            //   handleChangeSelectInput(event);
                            //   field.onChange(event.target.value);
                            // }}
                            className="rounded-[5px]"
                            sx={{
                              '& .MuiInputBase-input': {
                                padding: '5px 10px',
                                backgroundColor: '#E7E7E7',
                                borderRadius: '5px'
                              },
                              '& .MuiFormLabel-root': {
                                top: '-4px'
                              },
                              '& .MuiInputBase-root': {
                                borderRadius: '5px'
                              }
                            }}
                            input={<OutlinedInput label="Select" />}
                            renderValue={(selected) => selected.join(', ')}
                          >
                            {cureduration.map((name, idx) => (
                              <MenuItem key={idx} value={name}>
                                <ListItemText primary={name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Box>

                  <Box className="flex flex-col items-start w-2/7 md:w-full">
                    <Typography
                      variant="subtitle2"
                      fontSize="13px"
                      className="mb-2"
                    >
                      Start Date
                    </Typography>
                    <Controller
                      control={control}
                      name="start_date"
                      defaultValue={format(new Date(), 'dd.MM.yyyy')}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          type="date"
                          min={new Date()}
                          variant="filled"
                          margin="normal"
                          size="small"
                          // error={!!errors.end_date}
                          // helperText={
                          //   errors.end_date && errors.end_date.message
                          // }
                          required
                          className=""
                          sx={{
                            '& .MuiInputBase-input': {
                              padding: '5px 10px',
                              backgroundColor: '#E7E7E7',
                              borderRadius: '5px 0 0 5px'
                            },
                            '& .MuiFormLabel-root': {
                              top: '-10px'
                            },
                            '& .MuiInputBase-root': {
                              paddingY: 0,
                              borderRadius: '5px'
                            }
                          }}
                        />
                      )}
                    />
                  </Box>

                  <Box className="flex flex-col items-start w-2/7  md:w-full">
                    <Typography
                      variant="subtitle2"
                      fontSize="13px"
                      className="mb-2"
                    >
                      End date
                    </Typography>
                    <Controller
                      control={control}
                      name="end_date"
                      defaultValue={format(new Date(), 'dd.MM.yyyy')}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          type="date"
                          min={new Date()}
                          variant="filled"
                          margin="normal"
                          size="small"
                          // error={!!errors.end_date}
                          // helperText={
                          //   errors.end_date && errors.end_date.message
                          // }
                          required
                          className=""
                          sx={{
                            '& .MuiInputBase-input': {
                              padding: '5px 10px',
                              backgroundColor: '#E7E7E7',
                              borderRadius: '5px 0 0 5px'
                            },
                            '& .MuiFormLabel-root': {
                              top: '-10px'
                            },
                            '& .MuiInputBase-root': {
                              paddingY: 0,
                              borderRadius: '5px'
                            }
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>
              </Box>

              <Box className="border w-full rounded-[10px] p-5 xs:p-1 flex flex-col items-start gap-5">
                <Box className="flex flex-col items-start  w-full">
                  <Typography
                    variant="subtitle2"
                    fontSize="13px"
                    className="mb-2"
                  >
                    Explanation
                  </Typography>
                  <Controller
                    control={control}
                    name="explanation"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={5}
                        sx={{
                          width: '100%',
                          '& .MuiInputBase-input': {
                            padding: '5px 10px',
                            backgroundColor: '#E7E7E7',
                            borderRadius: '5px 0 0 5px'
                          },
                          '& .MuiFormLabel-root': {
                            top: '-10px'
                          },
                          '& .MuiInputBase-root': {
                            padding: 0,
                            borderRadius: '5px'
                          },
                          '& .MuiOutlinedInput-root': {
                            padding: 0
                          }
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>

              <Box className="relative w-full h-fit min-h-[40px]">
                <Box className="absolute right-0 w-fit flex items-center justify-end gap-5">
                  <Button
                    type="submit"
                    sx={{
                      color: '#fff',
                      width: { md: '100px', xs: '80px' },
                      border: '1px solid #1A4CFF',
                      backgroundColor: '#1A4CFF',
                      borderRadius: '10px',
                      marginX: 'auto',
                      ':hover': { backgroundColor: '#1201ff', border: 'none' }
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    onClick={handleCloseDrugModal}
                    sx={{
                      color: '#fff',
                      width: { md: '100px', xs: '80px' },
                      color: '#1A4CFF',
                      border: '1px solid #1A4CFF',
                      borderRadius: '10px',
                      marginX: 'auto',
                      ':hover': { backgroundColor: '#a2ccff', border: 'none' }
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openRecommendationModal}
        onClose={handleCloseRecommendationModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute translate-x-[-50%] border border-[#71A9F7] rounded-2xl translate-y-[-50%] top-[50%] left-[50%] w-[80%] sm:w-[99%] max-w-[640px] border-none p-8 xs:p-2 bg-white">
          <Box className="flex flex-col items-center gap-8">
            <form
              onSubmit={handleSubmit(onSubmitRecommendationData)}
              className="flex flex-col w-[100%] gap-2 items-center justify-between rounded-[8px] leading-3"
            >
              <Box className="flex w-full gap-3 items-center justify-between flex-row">
                <Typography
                  fontWeight={700}
                  variant="subtitle1"
                  className="leading-5 text-[17px]"
                >
                  Add Recommendation
                </Typography>
                <Box className="">
                  <CloseXButton onClick={handleCloseRecommendationModal} />
                </Box>
              </Box>

              <Box className="border w-full rounded-[10px] p-5 xs:p-1 flex flex-row items-start gap-5 flex-wrap min-h-[120px] max-h-[280px] overflow-auto">
                {recommendation?.loading && <Loader />}
                {!recommendation?.loading &&
                  recommendation?.data?.data?.map((value, idx) => {
                    const labelId = `checkbox-list-label-${value.recommendation_name}`;
                    return (
                      <Box
                        key={value.recommendation_id}
                        className={`relative bg-[#F5F5F5] rounded-[5px] px-3 py-2 pr-8 ${
                          existingRecommendations?.includes(
                            value.recommendation_name
                          )
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'
                        } `}
                        onClick={handleToggle(
                          !existingRecommendations?.includes(
                            value.recommendation_name
                          ) && value.recommendation_name
                        )}
                      >
                        <Radio
                          edge="end"
                          checked={
                            checked.indexOf(value.recommendation_name) !== -1 ||
                            existingRecommendations?.includes(
                              value.recommendation_name
                            )
                          }
                          disabled={existingRecommendations?.includes(
                            value.recommendation_name
                          )}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                          className="text-black ml-0 p-0 absolute right-5 top-[6px] w-[12px]"
                          sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: '1em'
                            }
                          }}
                        />
                        {value.recommendation_name}
                      </Box>
                    );
                  })}
              </Box>

              <Box className="border w-full rounded-[10px] p-5 xs:p-1 flex flex-col items-start gap-5">
                <Box className="flex flex-col items-start  w-full">
                  <Typography
                    variant="subtitle2"
                    fontSize="16px"
                    className="mb-2"
                  >
                    Add new recommendation
                  </Typography>
                  <Box className="relative w-full h-fit">
                    <Controller
                      control={control}
                      name="recommendation_name"
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          multiline
                          minRows={3}
                          maxRows={5}
                          onChange={(event) => {
                            handleRecommendationInput(event);
                            field.onChange(event.target.value);
                          }}
                          sx={{
                            width: '100%',
                            '& .MuiInputBase-input': {
                              padding: '5px 10px',
                              backgroundColor: '#E7E7E7',
                              borderRadius: '5px 0 0 5px'
                            },
                            '& .MuiFormLabel-root': {
                              top: '-10px'
                            },
                            '& .MuiInputBase-root': {
                              padding: 0,
                              borderRadius: '5px'
                            },
                            '& .MuiOutlinedInput-root': {
                              padding: 0
                            }
                          }}
                        />
                      )}
                    />
                    {recName && (
                      <Button
                        onClick={handleSubmit(onSubmitNewRecommendation)}
                        className="absolute bottom-2 right-2"
                        size="small"
                        sx={{
                          color: '#fff',
                          width: '80px',
                          color: '#1A4CFF',
                          border: '1px solid #1A4CFF',
                          borderRadius: '10px',
                          marginX: 'auto',
                          ':hover': {
                            backgroundColor: '#a2ccff',
                            border: '1px solid #a2ccff'
                          },
                          '& .MuiButtonBase-root': {
                            height: 25
                          }
                        }}
                      >
                        Add
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box className="relative w-full h-fit min-h-[40px]">
                <Box className="absolute right-0 w-fit flex flex-grow items-center justify-end gap-5">
                  {checked[0] && (
                    <Button
                      type="submit"
                      sx={{
                        color: '#fff',
                        width: { md: '100px', xs: '80px' },
                        border: '1px solid #1A4CFF',
                        backgroundColor: '#1A4CFF',
                        borderRadius: '10px',
                        marginX: 'auto',
                        ':hover': {
                          backgroundColor: '#1201ff',
                          border: '1px solid #a2ccff'
                        }
                      }}
                    >
                      Add
                    </Button>
                  )}

                  <Button
                    onClick={handleCloseRecommendationModal}
                    sx={{
                      color: '#fff',
                      width: { md: '100px', xs: '80px' },
                      color: '#1A4CFF',
                      border: '1px solid #1A4CFF',
                      borderRadius: '10px',
                      marginX: 'auto',
                      ':hover': {
                        backgroundColor: '#a2ccff',
                        border: '1px solid #a2ccff'
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DoctorAppointmentPage;

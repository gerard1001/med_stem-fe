/* eslint-disable no-underscore-dangle */
import {
  Box,
  Typography,
  Modal,
  Divider,
  Button,
  Grid,
  TextField,
  Radio
} from '@mui/material';
import { format, getDay, getMonth, getYear, isEqual } from 'date-fns';
import React, { forwardRef, memo, useEffect, useState } from 'react';
import { BsBox2Heart, BsPlus } from 'react-icons/bs';
import Calendar from '.';
import CloseXButton from '../CloseXButton';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Stack } from '@mui/system';
import {
  IoCloseCircle,
  IoCloseCircleOutline,
  IoCloseCircleSharp,
  IoCloseOutline
} from 'react-icons/io5';
import { DatePicker } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { createSchedule } from '../../redux/reducers/schedule.reducer';
import { getOneDoctor } from '../../redux/reducers/doctor.reducer';
import { getDoctorWorkDays } from '../../redux/reducers/workDays.reducer';
import {
  createVacation,
  getDoctorVacations
} from '../../redux/reducers/vacation.reducer';
import {
  createDayoff,
  getDoctorDayoffs
} from '../../redux/reducers/dayoff.reducer';

const schema = yup.object().shape({
  // from_date: yup.date().typeError('Invalid date').required(),
  // to_date: yup.date().typeError('Invalid date').required()
  // dayoff_date: yup.string().required()
  // from: yup.string().required(),
  // to: yup.string().required()
});

const AdminCalendarComponent = forwardRef(
  (
    {
      handleDayClick = () => {},
      selectedDate,
      loading = false,
      viewDate = new Date(),
      slots,
      vacationSlots,
      dayoffSlots,
      newSlots
    },
    ref
  ) => {
    useEffect(() => {
      ref.current.calendar.gotoDate(new Date(viewDate));
    }, [viewDate, ref]);

    return (
      <Calendar
        ref={ref}
        dayCellContent={({ isOther, date }) => {
          console.log({ slots });
          const formattedDate = format(new Date(date), 'yyyy-MM-dd');
          const availableAppointments =
            slots && slots[formattedDate] && slots[formattedDate].length;
          const availableVacations =
            vacationSlots &&
            vacationSlots[formattedDate] &&
            vacationSlots[formattedDate].length;
          const availableDayoffs =
            dayoffSlots &&
            dayoffSlots[formattedDate] &&
            dayoffSlots[formattedDate].length;
          const from =
            newSlots &&
            newSlots[formattedDate] &&
            newSlots[formattedDate].day.from;
          const to =
            newSlots &&
            newSlots[formattedDate] &&
            newSlots[formattedDate].day.to;
          const rangeHours = `${from} - ${to}`;
          const dayData =
            newSlots && newSlots[formattedDate] && newSlots[formattedDate].day;
          return (
            <Daycell
              {...{
                isOther,
                date,
                selectedDate,
                handleDayClick,
                loading,
                availableAppointments,
                availableVacations,
                availableDayoffs,
                rangeHours,
                dayData,
                viewDate
              }}
            />
          );
        }}
      />
    );
  }
);

const Daycell = memo(
  ({
    date,
    isOther,
    selectedDate,
    handleDayClick,
    loading,
    availableAppointments,
    availableVacations,
    availableDayoffs,
    rangeHours,
    dayData,
    viewDate
  }) => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state) => state.user?.searchQueryRedux);
    const isSelected = isEqual(new Date(selectedDate), new Date(date));
    const isGrayed = !availableAppointments || availableAppointments === 0;
    const isVacant = availableVacations;
    const isDayoff = availableDayoffs;
    const [openScheduleModal, setOpenScheduleModal] = useState(false);
    const [onSchedule, setOnSchedule] = useState(true);
    const [onVacation, setOnVacation] = useState(() => !onSchedule && true);
    const [newDate, setNewDate] = useState('');
    const [newDay, setNewDay] = useState('');
    const [dataloading, setDataLoading] = useState(false);

    const handleOpenScheduleModal = () => setOpenScheduleModal(true);
    const handleCloseScheduleModal = () => setOpenScheduleModal(false);
    const handleToSchedule = () => setOnSchedule(true);
    const handleFromSchedule = () => setOnSchedule(false);
    const {
      handleSubmit,
      control,
      formState: { errors },
      trigger,
      reset
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmitDayoffData = ({ dayoff_date }) => {
      console.log({
        doctor_id: searchQuery,
        dayoff_date
      });
      dispatch(
        createDayoff({
          doctor_id: searchQuery,
          dayoff_date: format(new Date(dayoff_date), 'MM-dd-yyyy')
        })
      ).then(() => {
        dispatch(getDoctorDayoffs({ id: searchQuery })).then(() => {
          handleCloseScheduleModal();
          reset();
        });
      });
    };

    const onSubmitVacationData = ({ from_date, to_date }) => {
      dispatch(
        createVacation({
          doctor_id: searchQuery,
          from_date: format(new Date(from_date), 'MM-dd-yyyy'),
          to_date: format(new Date(to_date), 'MM-dd-yyyy')
        })
      ).then(() => {
        dispatch(getDoctorVacations({ id: searchQuery })).then(() => {
          handleCloseScheduleModal();
          reset();
        });
      });
    };

    const onSubmitScheduleData = ({
      start_date,
      end_date,
      days,
      from,
      to,
      appointment_duration
    }) => {
      setDataLoading(true);
      dispatch(
        createSchedule({
          doctor_id: searchQuery,
          start_date: newDate,
          end_date: newDate,
          days: newDay,
          from,
          to,
          appointment_duration: 30
        })
      )
        .then(() => {
          dispatch(
            getDoctorWorkDays({
              id: searchQuery
              // month: getMonth(viewDate),
              // year: getYear(viewDate)
            })
          );
        })
        .then(() => {
          setDataLoading(false);
          handleCloseScheduleModal();
        });
    };

    useEffect(() => {
      if (dayData) {
        setOnSchedule(false);
      }
    }, [dayData]);

    useEffect(() => {
      setNewDate(format(new Date(date), 'MM-dd-yyyy'));
      setNewDay(new Date(date).toDateString().split(' ')[0]);
    }, [date]);

    return (
      <Box
        className="text-green flex flex-col p-1 cursor-default"
        sx={(theme) => ({
          width: '100%',
          height: '100%',
          border: `1px solid transparent`,
          ...(isGrayed && { backgroundColor: '#F7F8FA' })
        })}
        onClick={() => {
          !loading && !isOther && handleDayClick(new Date(date));
        }}
      >
        <Box className="grow px-[10px]">
          <Typography>{date.getDate()}</Typography>
        </Box>
        {searchQuery && (
          <Box
            className={`flex flex-col px-2 py-1 my-1 rounded-[4px] ${
              isVacant
                ? 'h-[calc(100%-24px)] bg-[#ffe2ff] cursor-default'
                : isDayoff
                ? 'h-[calc(100%-24px)] bg-[#a6f9ff] cursor-default'
                : 'bg-[#d8edff] hover:bg-[#bbdfff] cursor-pointer'
            }`}
            bgcolor="#d8edff"
            onClick={() => {
              !isVacant && !isDayoff && handleOpenScheduleModal();
            }}
          >
            {!isVacant && !isDayoff ? (
              <BsPlus className="w-[35px] text-[20px] mx-auto" />
            ) : (
              <Box className="w-full h-full flex items-center justify-center">
                {isVacant ? (
                  <Typography variant="h6" textAlign="center">
                    Vacation
                  </Typography>
                ) : (
                  <Typography variant="h6" textAlign="center">
                    Dayoff
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        )}

        <Box
          className={`flex flex-col px-2 py-1 rounded-[4px] ${
            isGrayed && 'opacity-0'
          } ${(isVacant || isDayoff) && 'hidden'}`}
          bgcolor="gray.light"
        >
          <Typography fontSize="17px" fontWeight={600}>
            {availableAppointments || '0'}
          </Typography>
          <Typography
            color="gray.main"
            className="text-xs leading-tight max-h-[14.39px]"
          >
            {rangeHours}
          </Typography>
        </Box>
        <Modal
          open={openScheduleModal}
          onClose={handleCloseScheduleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute translate-x-[-50%] rounded-none translate-y-[-50%] top-[50%] left-[50%] w-[80%] sm:w-[99%] max-w-[540px] border-none bg-white">
            <Box className="flex flex-col items-center gap-8">
              <form
                onSubmit={handleSubmit(
                  !onVacation && !onSchedule
                    ? onSubmitVacationData
                    : onVacation && !onSchedule
                    ? onSubmitDayoffData
                    : onSubmitScheduleData
                )}
                className="flex flex-col w-[100%] gap-2 items-center justify-between rounded-[8px]leading-3 pb-6"
              >
                <Box className="flex w-full gap-3 items-center justify-between flex-row px-6 py-4 pb-1">
                  <Typography
                    variant="subtitle1"
                    className="leading-5 text-[20px]"
                  >
                    {format(new Date(date), 'MM.dd.yyyy')}
                  </Typography>
                  <Box className="">
                    <IoCloseCircleOutline
                      className="text-[25px]"
                      onClick={handleCloseScheduleModal}
                    />
                  </Box>
                </Box>
                <Divider className="w-full" />
                <Box className="flex w-full gap-2 items-center justify-start flex-row px-6 py-1">
                  <Stack
                    role="button"
                    component={Button}
                    border="1px solid"
                    backgroundColor="#e9f5ff"
                    borderRadius="10px"
                    variant="text"
                    direction="row"
                    className={`gap-2 items-center text-[16px] ${
                      onSchedule ? 'text-[#6a858a]' : 'text-[#797979] '
                    } border  ${
                      onSchedule ? 'border-[#6a858a]' : 'border-[#e9f5ff]'
                    } ${
                      dayData
                        ? 'cursor-not-allowed text-[#acacac] bg-[#e9f5ff]'
                        : 'cursor-pointer bg-[#e2e7eb]'
                    }`}
                    flexWrap="nowrap"
                    onClick={handleToSchedule}
                  >
                    Work Schedule
                  </Stack>
                  <Stack
                    role="button"
                    component={Button}
                    border="1px solid"
                    backgroundColor="#e9f5ff"
                    borderRadius="10px"
                    variant="text"
                    direction="row"
                    className={`gap-2 items-center cursor-pointer text-[16px]  ${
                      !onSchedule ? 'text-[#6a858a]' : 'text-[#797979] '
                    } border  ${
                      !onSchedule ? 'border-[#6a858a]' : 'border-[#e9f5ff]'
                    }`}
                    flexWrap="nowrap"
                    onClick={handleFromSchedule}
                  >
                    Vacation
                  </Stack>
                </Box>
                <Box className="w-full flex flex-col gap-1 items-start p-6 py-0">
                  {onSchedule ? (
                    <Box>
                      <Typography
                        variant="subtitle1"
                        className="text-[18px] text-[#797979]"
                        fontWeight="400"
                      >
                        Select time
                      </Typography>{' '}
                    </Box>
                  ) : (
                    <Box className={`flex items-center gap-6 pl-2`}>
                      <Box
                        className={`flex items-center cursor-pointer`}
                        onClick={() => setOnVacation(false)}
                      >
                        <Radio
                          edge="start"
                          tabIndex={-1}
                          disableRipple
                          checked={!onVacation}
                          className="text-[#b0b7c5] w-[30px]"
                          sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: '1.4em'
                            }
                          }}
                        />
                        <Typography
                          variant="subtitle1"
                          className="text-[18px] text-[#797979]"
                          fontWeight="400"
                        >
                          Vacation
                        </Typography>
                      </Box>
                      <Box
                        className={`flex items-center cursor-pointer`}
                        onClick={() => setOnVacation(true)}
                      >
                        <Radio
                          edge="start"
                          tabIndex={-1}
                          disableRipple
                          checked={onVacation}
                          className="text-[#b0b7c5] w-[30px]"
                          sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: '1.4em'
                            }
                          }}
                        />
                        <Typography
                          variant="subtitle1"
                          className="text-[18px] text-[#797979]"
                          fontWeight="400"
                        >
                          Dayoff
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {onSchedule ? (
                    <Box className="flex items-center gap-3">
                      {' '}
                      <Box>
                        <Controller
                          control={control}
                          name="from"
                          defaultValue="00:00"
                          render={({ field }) => (
                            <TextField
                              {...field}
                              type="time"
                              variant="outlined"
                              sx={{
                                width: '150px',
                                margin: 0,
                                '& .MuiInputBase-input': {
                                  margin: 0,
                                  backgroundColor: '#E7E7E7',
                                  borderRadius: '5px'
                                },
                                '& .MuiFormLabel-root': {
                                  top: '-4px'
                                },
                                '& .MuiInputBase-root': {
                                  paddingY: 0,
                                  borderRadius: '5px'
                                }
                              }}
                              margin="normal"
                              size="small"
                              error={!!errors.from}
                              helperText={errors.from && errors.from.message}
                            />
                          )}
                        />
                      </Box>
                      <Box>
                        <Controller
                          control={control}
                          name="to"
                          defaultValue="23:00"
                          render={({ field }) => (
                            <TextField
                              {...field}
                              type="time"
                              variant="outlined"
                              sx={{
                                width: '150px',
                                margin: 0,
                                '& .MuiInputBase-input': {
                                  margin: 0,
                                  backgroundColor: '#E7E7E7',
                                  borderRadius: '5px'
                                },
                                '& .MuiFormLabel-root': {
                                  top: '-4px'
                                },
                                '& .MuiInputBase-root': {
                                  paddingY: 0,
                                  borderRadius: '5px'
                                }
                              }}
                              margin="normal"
                              size="small"
                              error={!!errors.to}
                              helperText={errors.to && errors.to.message}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                  ) : (
                    <>
                      {' '}
                      {!onVacation ? (
                        <Box className="flex items-center gap-3">
                          {' '}
                          <Box>
                            <Controller
                              control={control}
                              name="from_date"
                              defaultValue={new Date(newDate)}
                              render={({ field }) => (
                                <DatePicker
                                  {...field}
                                  type="date"
                                  label="From"
                                  min={new Date()}
                                  variant="filled"
                                  margin="normal"
                                  size="small"
                                  minDate={new Date()}
                                  slotProps={{
                                    textField: {
                                      error: !!errors.from_date,
                                      helperText:
                                        errors.from_date &&
                                        errors.from_date.message
                                    }
                                  }}
                                  className=""
                                  sx={{
                                    width: '150px',
                                    '& .MuiInputBase-input': {
                                      padding: '5px 10px 12px',
                                      backgroundColor: '#E7E7E7',
                                      borderRadius: '5px 0 0 5px'
                                    },
                                    '& .MuiFormLabel-root': {
                                      top: '-7px'
                                    },
                                    '& .MuiInputLabel-root.MuiInputLabel-shrink':
                                      {
                                        top: '5px'
                                      },
                                    '& .MuiInputBase-root': {
                                      paddingY: 0,
                                      borderRadius: '5px',
                                      background: '#E7E7E7'
                                    }
                                  }}
                                />
                              )}
                            />
                          </Box>
                          <Box>
                            <Controller
                              control={control}
                              name="to_date"
                              defaultValue=""
                              render={({ field }) => (
                                <DatePicker
                                  {...field}
                                  type="date"
                                  label="To"
                                  min={new Date()}
                                  variant="filled"
                                  margin="normal"
                                  size="small"
                                  minDate={new Date()}
                                  required
                                  slotProps={{
                                    textField: {
                                      error: !!errors.to_date,
                                      helperText:
                                        errors.to_date && errors.to_date.message
                                    }
                                  }}
                                  className=""
                                  sx={{
                                    width: '150px',
                                    '& .MuiInputBase-input': {
                                      padding: '5px 10px 12px',
                                      backgroundColor: '#E7E7E7',
                                      borderRadius: '5px 0 0 5px'
                                    },
                                    '& .MuiFormLabel-root': {
                                      top: '-7px'
                                    },
                                    '& .MuiInputLabel-root.MuiInputLabel-shrink':
                                      {
                                        top: '0px'
                                      },
                                    '& .MuiInputBase-root': {
                                      paddingY: 0,
                                      borderRadius: '5px',
                                      background: '#E7E7E7'
                                    }
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                      ) : (
                        <Box className="flex items-center gap-3">
                          {' '}
                          <Box>
                            <Controller
                              control={control}
                              name="dayoff_date"
                              defaultValue={new Date(newDate)}
                              render={({ field }) => (
                                <DatePicker
                                  {...field}
                                  type="date"
                                  label="Dayoff Date"
                                  min={new Date()}
                                  variant="filled"
                                  margin="normal"
                                  size="small"
                                  minDate={new Date()}
                                  slotProps={{
                                    textField: {
                                      error: !!errors.dayoff_date,
                                      helperText:
                                        errors.dayoff_date &&
                                        errors.dayoff_date.message
                                    }
                                  }}
                                  className=""
                                  sx={{
                                    width: '150px',
                                    '& .MuiInputBase-input': {
                                      padding: '5px 10px 12px',
                                      backgroundColor: '#E7E7E7',
                                      borderRadius: '5px 0 0 5px'
                                    },
                                    '& .MuiFormLabel-root': {
                                      top: '-7px'
                                    },
                                    '& .MuiInputLabel-root.MuiInputLabel-shrink':
                                      {
                                        top: '5px'
                                      },
                                    '& .MuiInputBase-root': {
                                      paddingY: 0,
                                      borderRadius: '5px',
                                      background: '#E7E7E7'
                                    }
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
                <Box className="relative w-full h-fit min-h-[40px] p-6 py-0">
                  <Box className="absolute right-6 w-fit flex flex-grow items-center justify-end gap-5">
                    <Button
                      onClick={handleCloseScheduleModal}
                      sx={{
                        color: '#fff',
                        width: { md: '100px', xs: '80px' },
                        color: '#1A4CFF',
                        border: '1px solid #1A4CFF',
                        borderRadius: '20px',
                        marginX: 'auto',
                        ':hover': {
                          backgroundColor: '#a2ccff',
                          border: '1px solid #a2ccff'
                        }
                      }}
                    >
                      Cancel
                    </Button>{' '}
                    <Button
                      type="submit"
                      disabled={!searchQuery}
                      sx={{
                        color: '#fff',
                        width: { md: '100px', xs: '80px' },
                        border: '1px solid #1A4CFF',
                        backgroundColor: '#1A4CFF',
                        borderRadius: '20px',
                        marginX: 'auto',
                        ':hover': {
                          backgroundColor: '#1201ff',
                          border: '1px solid #a2ccff'
                        }
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  }
);

export default AdminCalendarComponent;

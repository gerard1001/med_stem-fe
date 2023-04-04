/* eslint-disable no-underscore-dangle */
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  Modal,
  Radio,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format, isEqual, toDate } from 'date-fns';
import React, { forwardRef, memo, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsPlus } from 'react-icons/bs';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Calendar from '.';
import {
  createDayoff,
  getDoctorDayoffs
} from '../../redux/reducers/dayoff.reducer';
import { createSchedule } from '../../redux/reducers/schedule.reducer';
import {
  createVacation,
  getDoctorVacations
} from '../../redux/reducers/vacation.reducer';
import { getDoctorWorkDays } from '../../redux/reducers/workDays.reducer';

const vacationSchema = yup.object().shape({
  from_date: yup.date().typeError('Invalid date').required(),
  to_date: yup.date().typeError('Invalid date').required()
});

const scheduleSchema = yup.object().shape({});

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
    const isPassed = new Date(date).getTime() >= new Date().getTime();
    const isVacant = availableVacations;
    const isDayoff = availableDayoffs;
    const [openScheduleModal, setOpenScheduleModal] = useState(false);
    const anchorEl = useRef(null);
    const [onSchedule, setOnSchedule] = useState(true);
    const [onVacation, setOnVacation] = useState(() => !onSchedule && true);
    const [newDate, setNewDate] = useState('');
    const [newDay, setNewDay] = useState('');
    const [dataloading, setDataLoading] = useState(false);

    const handleOpenScheduleModal = (e) => {
      anchorEl.current = e.currentTarget;
      setOpenScheduleModal(true);
    };
    const handleCloseScheduleModal = () => {
      setOpenScheduleModal(false);
      anchorEl.current = null;
    };
    const handleToSchedule = () => setOnSchedule(true);
    const handleFromSchedule = () => setOnSchedule(false);
    const {
      handleSubmit,
      control,
      formState: { errors },
      trigger,
      reset
    } = useForm({
      resolver: yupResolver(
        !onSchedule && !onVacation ? vacationSchema : scheduleSchema
      )
    });

    const onSubmitDayoffData = ({ dayoff_date }) => {
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
          ...(isGrayed
            ? { backgroundColor: '#F7F8FA' }
            : { backgroundColor: '#fff' })
        })}
        // onClick={() => {
        //   !loading && !isOther && handleDayClick(new Date(date));
        // }}
      >
        <Box className="grow px-[10px]">
          <Typography>{date.getDate()}</Typography>
        </Box>
        {searchQuery && isPassed && (
          <Box
            className={`flex flex-col px-2 py-1 my-1 rounded-[4px] ${
              isVacant
                ? 'h-[calc(100%-24px)] bg-[#FBE5E5] cursor-default'
                : isDayoff
                ? 'h-[calc(100%-24px)] bg-[#DAF7A6] cursor-default'
                : 'bg-[#d8edff] hover:bg-[#bbdfff] cursor-pointer'
            }`}
            onClick={(e) => {
              // !loading && !isOther && handleDayClick(new Date(date));
              !isVacant && !isDayoff && handleOpenScheduleModal(e);
            }}
          >
            {!isVacant && !isDayoff ? (
              <BsPlus className="w-[35px] text-[20px] mx-auto" />
            ) : (
              <Box className="w-full h-full flex items-center justify-center">
                {isVacant ? (
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    color="#333"
                  >
                    Vacation
                  </Typography>
                ) : (
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    color="#333"
                  >
                    Dayoff
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        )}

        <Box
          className={`flex flex-col px-2 py-1 rounded-[4px] min-h-[49px] h-max overflow-y-auto ${
            (isVacant || isDayoff) && 'hidden'
          }`}
          bgcolor="gray.light"
        >
          {!isGrayed && (
            <>
              <Typography fontSize="17px" fontWeight={600}>
                {availableAppointments || '0'}
              </Typography>
              <Typography
                title={rangeHours}
                color="gray.main"
                className="text-xs leading-tight truncate"
              >
                {rangeHours}
              </Typography>
            </>
          )}
        </Box>

        <Menu
          anchorEl={anchorEl.current}
          open={openScheduleModal}
          onClose={handleCloseScheduleModal}
          classes={{
            paper: 'max-w-[400px] w-full h-max'
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          MenuListProps={{
            'aria-labelledby': 'modal-modal-title',
            'aria-describedby': 'modal-modal-description',
            disablePadding: true
          }}
        >
          {/* <Box className="absolute translate-x-[-50%] rounded-none translate-y-[-50%] top-[50%] left-[50%] w-[80%] sm:w-[99%] max-w-[540px] border-none bg-white"> */}
          <Box className="rounded-none w-full border-none bg-white">
            <form
              onSubmit={handleSubmit(
                !onVacation && !onSchedule
                  ? onSubmitVacationData
                  : onVacation && !onSchedule
                  ? onSubmitDayoffData
                  : onSubmitScheduleData
              )}
              className="flex flex-col w-[100%] gap-2 items-center justify-between rounded-[8px] leading-3 pb-6"
            >
              <Box className="flex w-full gap-3 items-center justify-between flex-row px-6 py-4 pb-2">
                <Typography
                  variant="subtitle1"
                  className="leading-none text-[20px]"
                >
                  {format(new Date(date), 'MM.dd.yyyy')}
                </Typography>
                <IconButton onClick={handleCloseScheduleModal} className="p-0">
                  <IoCloseCircleOutline className="text-[25px]" />
                </IconButton>
              </Box>
              <Divider className="w-full" />
              <Box className="flex w-full gap-2 items-center justify-start flex-row px-6 py-1">
                <Stack
                  role="button"
                  component={Button}
                  disabled={!!dayData}
                  border="1px solid"
                  backgroundColor="#EEF1F5"
                  borderRadius="10px"
                  variant="text"
                  direction="row"
                  className={`items-center text-[16px] px-3 py-1 text-[#728EB4] min-w-0 ${
                    onSchedule
                      ? 'border-[rgba(114, 142, 180, 0.65)]'
                      : 'border-[#EEF1F5]'
                  } `}
                  // ${
                  //   dayData
                  //     ? 'cursor-not-allowed text-[#acacac] bg-[#e9f5ff]'
                  //     : 'cursor-pointer bg-[#e2e7eb]'
                  // }
                  flexWrap="nowrap"
                  onClick={handleToSchedule}
                >
                  Work Schedule
                </Stack>
                <Stack
                  role="button"
                  component={Button}
                  border="1px solid"
                  backgroundColor="#F0F0F0"
                  borderRadius="10px"
                  variant="text"
                  direction="row"
                  className={`items-center text-[16px] px-3 py-1 text-[#A2A4A7] border min-w-0 ${
                    !onSchedule ? 'border-[#A2A4A7]' : 'border-[#F0F0F0]'
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
                  <Box className="w-full flex items-center gap-3">
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
                            maxWidth: '150px',
                            width: '100%',
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
                            maxWidth: '150px',
                            width: '100%',
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
                ) : (
                  <>
                    {!onVacation ? (
                      <Box className="flex items-center gap-3">
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
                                  maxWidth: '150px',
                                  width: '100%',
                                  '& .MuiInputBase-input': {
                                    padding: '7px 10px',
                                    backgroundColor: '#E7E7E7',
                                    borderRadius: '5px 0 0 5px'
                                  },
                                  '& .MuiFormLabel-root': {
                                    top: '-9px'
                                  },
                                  '& .MuiFormLabel-root.MuiInputLabel-shrink': {
                                    top: '0px'
                                  },
                                  '& .MuiInputBase-root': {
                                    paddingY: 0,
                                    backgroundColor: '#E7E7E7',
                                    borderRadius: '5px'
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
                                  maxWidth: '150px',
                                  width: '100%',
                                  '& .MuiInputBase-input': {
                                    padding: '7px 10px',
                                    backgroundColor: '#E7E7E7',
                                    borderRadius: '5px 0 0 5px'
                                  },
                                  '& .MuiFormLabel-root': {
                                    top: '-9px'
                                  },
                                  '& .MuiFormLabel-root.MuiInputLabel-shrink': {
                                    top: '0px'
                                  },
                                  '& .MuiFormHelperText-root': {
                                    marginBottom: '-15px'
                                  },
                                  '& .MuiInputBase-root': {
                                    paddingY: 0,
                                    backgroundColor: '#E7E7E7',
                                    borderRadius: '5px'
                                  }
                                }}
                              />
                            )}
                          />
                        </Box>
                      </Box>
                    ) : (
                      <Box className="flex items-center gap-3">
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
                                  maxWidth: '150px',
                                  width: '100%',
                                  '& .MuiInputBase-input': {
                                    padding: '7px 10px',
                                    backgroundColor: '#E7E7E7',
                                    borderRadius: '5px 0 0 5px'
                                  },
                                  '& .MuiFormLabel-root': {
                                    top: '-9px'
                                  },
                                  '& .MuiFormLabel-root.MuiInputLabel-shrink': {
                                    top: '0px'
                                  },
                                  '& .MuiInputBase-root': {
                                    paddingY: 0,
                                    backgroundColor: '#E7E7E7',
                                    borderRadius: '5px'
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
              <Box className="w-full p-6 py-0 pt-3 flex flex-row-reverse gap-3">
                <Button
                  type="submit"
                  disabled={
                    !searchQuery || (onVacation && onSchedule) || !toDate
                  }
                  sx={{
                    color: '#fff',
                    width: { md: '100px', xs: '80px' },
                    border: '1px solid #1A4CFF',
                    backgroundColor: '#1A4CFF',
                    borderRadius: '20px',
                    // marginX: 'auto',
                    ':hover': {
                      backgroundColor: '#1201ff',
                      border: '1px solid #a2ccff'
                    }
                  }}
                >
                  Add
                </Button>
                <Button
                  onClick={handleCloseScheduleModal}
                  sx={{
                    width: { md: '100px', xs: '80px' },
                    color: '#1A4CFF',
                    border: '1px solid #1A4CFF',
                    borderRadius: '20px',
                    // marginX: 'auto',
                    ':hover': {
                      backgroundColor: '#a2ccff',
                      border: '1px solid #a2ccff'
                    }
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Menu>
      </Box>
    );
  }
);

export default AdminCalendarComponent;

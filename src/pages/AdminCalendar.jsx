import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
  Drawer,
  useMediaQuery,
  IconButton
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsPlusCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Calendar from '../components/Calendar';
import CalendarMonthYearSelector from '../components/Calendar/CalendarMonthYearSelector';
import {
  addMinutes,
  format,
  getHours,
  getMonth,
  getYear,
  isFuture,
  isPast,
  isToday,
  subMinutes
} from 'date-fns';
import { toast } from 'react-toastify';
import { DatePicker } from '@mui/x-date-pickers';
import SmallSearchBar from '../components/SmallSearchBar';
import { getDoctorList, getOneDoctor } from '../redux/reducers/doctor.reducer';
import { createSchedule } from '../redux/reducers/schedule.reducer';
import { days } from '../utils/dummyData';
import { FiChevronLeft } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import AdminCalendarRightSideBar from '../components/AdminCalendarRightSideBar';
import AdminCalendarComponent from '../components/Calendar/AdminCalendarComponent';
import {
  getDoctorWorkDays,
  selectWorkDaysDoctors
} from '../redux/reducers/workDays.reducer';
import { getDoctorVacations } from '../redux/reducers/vacation.reducer';
import { getDoctorDayoffs } from '../redux/reducers/dayoff.reducer';

function AdminCalendar() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor);
  const calendarRef = useRef(null);
  const [viewDate, setViewDate] = useState(new Date());
  const [openRightSideBar, setOpenRightSideBar] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const searchQuery = useSelector((state) => state.user?.searchQueryRedux);
  const workDays = useSelector(
    (state) => selectWorkDaysDoctors(state, searchQuery)?.workDays
  );
  const dayoffs = useSelector(
    (state) => state.dayoff.entities[searchQuery]?.dayoffs
  );
  const vacations = useSelector(
    (state) => state.vacation.entities[searchQuery]?.vacations
  );

  const vacationDates = vacations?.flatMap((vacation) => {
    const start = Date.parse(vacation.from_date);
    const end = Date.parse(vacation.to_date);
    const day = 24 * 60 * 60 * 1000;

    const dateArray = [];
    for (let time = start; time <= end; time += day) {
      dateArray.push(format(new Date(time), 'yyyy-MM-dd'));
    }

    return dateArray;
  });

  const vacationSlots = {};
  const dayoffSlots = {};

  vacationDates?.forEach((date) => {
    vacationSlots[date] = ['vacation'];
  });

  dayoffs?.forEach((date) => {
    dayoffSlots[format(new Date(date.dayoff_date), 'yyyy-MM-dd')] = ['dayoff'];
  });

  const filteredData = doctors?.data?.data?.map((obj) => ({
    ...obj,
    label: `${obj.first_name} ${obj.last_name}, ${obj.doctor_id}`
  }));

  const toggleRightSideBar = () => {
    setOpenRightSideBar((open) => !open);
  };
  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const selectedWorkDay = workDays?.filter((values) => {
    return (
      format(new Date(values.date), 'yyyy-MM-dd') ===
      format(new Date(selectedDate), 'yyyy-MM-dd')
    );
  });

  function addSubstractTime(hour, minute, minutesToAdd, operation) {
    hour = parseInt(hour, 10);
    minute = parseInt(minute, 10);
    minutesToAdd = parseInt(minutesToAdd, 10);

    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    const newDate =
      operation === 's'
        ? subMinutes(date, minutesToAdd)
        : addMinutes(date, minutesToAdd);
    return format(newDate, 'HH:mm');
  }

  useEffect(() => {
    const workDaysSlots = {};
    workDays?.forEach((workDay) => {
      const slots = [];
      const { from, to, date, appointments } = workDay;
      if (isToday(new Date(date)) || isFuture(new Date(date))) {
        const duration = workDay.schedule.appointment_duration;
        // const { appointments } = workDay.schedule;
        let taken = [];
        appointments.forEach((appointment) => {
          if (appointment.is_canceled) return;
          taken.push(appointment.appointment_period);
        });
        taken = taken.sort((a, b) => (a < b ? -1 : 1));
        const [fromHour, fromMinute] = from.trim().split(':');
        const [toHour, toMinute] = to.trim().split(':');

        const lastSlot = `${addSubstractTime(
          toHour,
          toMinute,
          duration,
          's'
        )} - ${toHour}:${toMinute}`;
        let currentSlot = `${fromHour}:${fromMinute} - ${addSubstractTime(
          fromHour,
          fromMinute,
          duration
        )}`;
        if (isToday(new Date(date))) {
          const Hour = getHours(new Date());
          currentSlot = `${Hour + 1}:00 - ${addSubstractTime(
            Hour + 1,
            '00',
            duration
          )}`;
        }

        while (true) {
          if (currentSlot >= lastSlot) {
            break;
          }
          if (currentSlot === taken[0]) {
            taken.shift();
          } else {
            slots.push(currentSlot);
          }
          if (currentSlot.split(' - ')[1] === '13:00') {
            currentSlot = `14:00 - ${addSubstractTime(14, 0, duration)}`;
          } else {
            const slotLastPart = currentSlot.split('-')[1].trim();
            const splitLastSlotPart = slotLastPart.split(':');
            currentSlot = `${slotLastPart} - ${addSubstractTime(
              splitLastSlotPart[0],
              splitLastSlotPart[1],
              duration
            )}`;
          }
        }
        workDaysSlots[format(new Date(date), 'yyyy-MM-dd')] = slots;
      }
    });
    setSlots(workDaysSlots);
  }, [workDays]);

  const newSlots = {};
  for (const date in slots) {
    for (let i = 0; i < workDays?.length; i++) {
      const formattedFrom = workDays[i].from.split(':');
      const formattedTo = workDays[i].to.split(':');
      if (
        format(new Date(workDays[i].date), 'yyyy-MM-dd') ===
        format(new Date(date), 'yyyy-MM-dd')
      ) {
        newSlots[date] = {
          slots: slots[date],
          day: {
            _id: workDays[i]._id,
            date: workDays[i].date,
            from: `${formattedFrom[0]}:${formattedFrom[1]}`,
            to: `${formattedTo[0]}:${formattedTo[1]}`,
            schedule_id: workDays[i].schedule_id,
            doctor_id: workDays[i].doctor_id
          }
        };
        break;
      }
    }
  }

  useEffect(() => {
    dispatch(getDoctorList());
  }, []);

  useEffect(() => {
    setSelectedDate(null);
    setLoading(true);
    dispatch(
      getDoctorWorkDays({
        id: searchQuery,
        month: getMonth(viewDate) + 1,
        year: getYear(viewDate)
      })
    ).then(({ error }) => {
      if (error) {
        // toast.error(error.message);
      }
      setLoading(false);
    });

    dispatch(
      getDoctorVacations({
        id: searchQuery,
        month: getMonth(viewDate) + 1,
        year: getYear(viewDate)
      })
    ).then(({ error }) => {
      if (error) {
        // toast.error(error.message);
      }
      setLoading(false);
    });

    dispatch(
      getDoctorDayoffs({
        id: searchQuery,
        month: getMonth(viewDate) + 1,
        year: getYear(viewDate)
      })
    ).then(({ error }) => {
      if (error) {
        // toast.error(error.message);
      }
      setLoading(false);
    });
  }, [searchQuery, viewDate]);

  return (
    <Box
      className="flex flex-row items-start"
      sx={openRightSideBar ? { marginRight: { md: '250px', xs: '0' } } : {}}
    >
      <Box className="sm:p-4 pt-16 px-8 flex flex-col flex-wrap w-[100%] gap-2 sm:gap-0">
        <IconButton
          onClick={toggleRightSideBar}
          sx={{
            position: 'absolute',
            backgroundColor: '#9b9b9b2d',
            color: '#000',
            top: '60px',
            right: '16px',
            display: { md: 'none', xs: 'block' }
          }}
        >
          <FiChevronLeft />
        </IconButton>
        <Stack
          direction="row"
          gap={{ xs: 1, sm: 3 }}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          mb={{ xs: 2, sm: 0 }}
          className="w-full"
        >
          <Stack
            direction="row"
            className="items-center sm:w-full overflow-visible px-4"
          >
            <Typography
              fontSize={{ xs: 16, sm: 20 }}
              fontWeight="500"
              mt="10px"
              className="leading-none"
              noWrap
            >
              Add work schedule
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="end" className="sm:w-full">
            <CalendarMonthYearSelector
              viewDate={viewDate}
              setViewDate={setViewDate}
            />
          </Stack>{' '}
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          className="w-full items-center px-4"
          flexWrap="wrap"
          gap={1}
        >
          <Stack direction="row" className="gap-3 items-center grow">
            <Typography fontSize={{ xs: 20 }} className="leading-none" noWrap>
              Select doctor
            </Typography>

            <SmallSearchBar
              filteredData={filteredData}
              inputValue={selectedDoctor}
              setInputValue={setSelectedDoctor}
            />
          </Stack>
          <Stack
            role="button"
            component={Button}
            onClick={() => {
              toggleRightSideBar();
            }}
            variant="text"
            direction="row"
            className="gap-2 items-center cursor-pointer text-[20px] text-black -mr-4"
            flexWrap="nowrap"
          >
            <BsPlusCircle /> Work Schedule
          </Stack>
        </Stack>

        <Box className="sm:px-0 px-5 w-full overflow-auto">
          <AdminCalendarComponent
            ref={calendarRef}
            {...{
              handleDayClick,
              selectedDate,
              loading,
              viewDate,
              slots,
              vacationSlots,
              dayoffSlots,
              workDays,
              newSlots
            }}
          />
        </Box>
      </Box>
      {openRightSideBar && (
        <Drawer
          open={openRightSideBar}
          anchor="right"
          variant={isMobile ? 'temporary' : 'permanent'}
          onClose={() => {
            setOpenRightSideBar(false);
          }}
          sx={{
            '& .MuiDrawer-paper': {
              maxWidth: '250px',
              width: '100%'
            }
          }}
          classes={{
            paper: isMobile ? 'absolute' : 'relative'
          }}
          ModalProps={{
            keepMounted: false
          }}
          className="transition duration-150 ease-in-out"
        >
          <Box
            className="min-h-[64px] items-center justify-center"
            sx={{ display: { md: 'none', xs: 'flex' } }}
          >
            <IconButton
              onClick={toggleRightSideBar}
              sx={{
                padding: 1
              }}
            >
              <GrClose />
            </IconButton>
          </Box>
          <AdminCalendarRightSideBar
            viewDate={viewDate}
            toggleRightSideBar={toggleRightSideBar}
          />
        </Drawer>
      )}
    </Box>
  );
}

export default AdminCalendar;

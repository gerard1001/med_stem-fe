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
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';
import SmallSearchBar from '../components/SmallSearchBar';
import { getDoctorList, getOneDoctor } from '../redux/reducers/doctor.reducer';
import { createSchedule } from '../redux/reducers/schedule.reducer';
import { days } from '../utils/dummyData';
import { FiChevronLeft } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import AdminCalendarRightSideBar from '../components/AdminCalendarRightSideBar';
import AdminCalendarComponent from '../components/Calendar/AdminCalendarComponent';

function AdminCalendar() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor);
  const calendarRef = useRef(null);
  const [viewDate, setViewDate] = useState(new Date());
  const [workDays, setWorkDays] = useState([]);
  const [openRightSideBar, setOpenRightSideBar] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const doctor = useSelector((state) => state.doctor);
  const doctorData = doctor?.single_data?.data;

  console.log(workDays, 'workDays');
  console.log(searchQuery, 'searchQuery');

  // function addSubstractTime(hour, minute, minutesToAdd, operation) {
  //   hour = parseInt(hour, 10);
  //   minute = parseInt(minute, 10);
  //   minutesToAdd = parseInt(minutesToAdd, 10);

  //   const date = new Date();
  //   date.setHours(hour);
  //   date.setMinutes(minute);
  //   const newDate =
  //     operation === 's'
  //       ? subMinutes(date, minutesToAdd)
  //       : addMinutes(date, minutesToAdd);
  //   return format(newDate, 'HH:mm');
  // }

  // useEffect(() => {
  //   const workDaysSlots = {};
  //   workDays?.forEach((workDay) => {
  //     const slots = [];
  //     const { from, to, date, appointments } = workDay;
  //     if (isToday(new Date(date)) || isFuture(new Date(date))) {
  //       const duration = workDay.schedule.appointment_duration;
  //       // const { appointments } = workDay.schedule;
  //       let taken = [];
  //       appointments.forEach((appointment) => {
  //         if (appointment.is_canceled) return;
  //         taken.push(appointment.appointment_period);
  //       });
  //       taken = taken.sort((a, b) => (a < b ? -1 : 1));
  //       const [fromHour, fromMinute] = from.trim().split(':');
  //       const [toHour, toMinute] = to.trim().split(':');

  //       const lastSlot = `${addSubstractTime(
  //         toHour,
  //         toMinute,
  //         duration,
  //         's'
  //       )} - ${toHour}:${toMinute}`;
  //       let currentSlot = `${fromHour}:${fromMinute} - ${addSubstractTime(
  //         fromHour,
  //         fromMinute,
  //         duration
  //       )}`;
  //       if (isToday(new Date(date))) {
  //         const Hour = getHours(new Date());
  //         currentSlot = `${Hour + 1}:00 - ${addSubstractTime(
  //           Hour + 1,
  //           '00',
  //           duration
  //         )}`;
  //       }

  //       while (true) {
  //         if (currentSlot >= lastSlot) {
  //           break;
  //         }
  //         if (currentSlot === taken[0]) {
  //           taken.shift();
  //         } else {
  //           slots.push(currentSlot);
  //         }
  //         if (currentSlot === '17:00') {
  //           currentSlot = `17:00 - ${addSubstractTime(17, 0, duration)}`;
  //         } else {
  //           const slotLastPart = currentSlot.split('-')[1].trim();
  //           const splitLastSlotPart = slotLastPart.split(':');
  //           currentSlot = `${slotLastPart} - ${addSubstractTime(
  //             splitLastSlotPart[0],
  //             splitLastSlotPart[1],
  //             duration
  //           )}`;
  //         }
  //       }
  //       workDaysSlots[format(new Date(date), 'yyyy-MM-dd')] = slots;
  //     }
  //   });
  //   setSlots(workDaysSlots);
  // }, [workDays]);

  const filteredData = doctors?.data?.data?.map((obj) => ({
    ...obj,
    label: `${obj.first_name} ${obj.last_name}, ${obj.doctor_id}`
  }));

  const toggleRightSideBar = () => {
    setOpenRightSideBar((open) => !open);
  };

  useEffect(() => {
    dispatch(getDoctorList());
  }, []);
  // useEffect(() => {
  //   calendarRef.current.calendar.gotoDate(new Date(viewDate));
  // }, [viewDate]);
  // useEffect(() => {
  //   dispatch(getOneDoctor(searchQuery));
  // });
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
              viewDate,
              slots
            }}
            // dayCellContent={(props) => (
            //   <Box
            //     className="text-green flex flex-col"
            //     sx={{
            //       width: '100%',
            //       height: '100%'
            //     }}
            //   >
            //     <Box className="grow px-[10px]">
            //       <Typography>{props.date.getDate()}</Typography>
            //     </Box>
            //     {/* If active step we add the plus sign */}
            //   </Box>
            // )}
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
            setWorkDays={setWorkDays}
            setSearchQuery={setSearchQuery}
            viewDate={viewDate}
          />
        </Drawer>
      )}
    </Box>
  );
}

export default AdminCalendar;

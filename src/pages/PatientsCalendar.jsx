import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { addDays, getDate, getDay, isEqual } from 'date-fns';
import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import Calendar from '../components/Calendar';
import CalendarMonthYearSelector from '../components/Calendar/CalendarMonthYearSelector';
import { DashboardContext } from '../context/DashboardContext';
import { setSelectedDate } from '../redux/reducers/calendar.reducer';

const data = [
  addDays(new Date(), 0),
  addDays(new Date(), 3),
  addDays(new Date(), 7),
  addDays(new Date(), 11)
];

function PatientsCalendar() {
  const calendarRef = useRef(null);
  const [viewDate, setViewDate] = useState(new Date());
  const [openRightSideBar, setOpenRightSideBar] = useState(null);
  const selectedDate = useSelector((state) => state.calendar.selectedDate);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const toggleRightSideBar = () => {
    setOpenRightSideBar((open) => !open);
  };

  useEffect(() => {
    calendarRef.current.calendar.gotoDate(new Date(viewDate));
  }, [viewDate]);

  return (
    <Box className="flex flex-row w-full h-full">
      <Box className="sm:p-4 p-8 flex flex-col grow sm:gap-0 gap-3 overflow-y-auto">
        <IconButton
          sx={{
            position: 'absolute',
            backgroundColor: '#9b9b9b2d',
            color: '#000',
            top: '60px',
            right: '16px',
            display: { md: 'none', xs: 'block' }
          }}
        >
          <FiChevronLeft onClick={toggleRightSideBar} />
        </IconButton>
        <Stack
          direction="row"
          gap={{ xs: 1, sm: 3 }}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          mb={{ xs: 2, sm: 5 }}
        >
          <Stack
            direction="row"
            className="gap-3 items-center sm:w-full overflow-hidden"
          >
            <BackButton />
            <Typography
              fontSize={{ xs: 16, sm: 32 }}
              className="leading-none"
              noWrap
            >
              Select date and time
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="end" className="sm:w-full">
            <CalendarMonthYearSelector
              viewDate={viewDate}
              setViewDate={setViewDate}
            />
          </Stack>
        </Stack>
        <Box className="sm:px-0 px-20">
          <Calendar
            ref={calendarRef}
            dayCellContent={(props) => {
              return <Daycell selectedDate={selectedDate} {...props} />;
            }}
          />
        </Box>
      </Box>
      <Drawer
        open={openRightSideBar}
        anchor="right"
        variant={isMobile ? 'temporary' : 'permanent'}
        onClose={() => {
          setOpenRightSideBar(false);
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: '250px'
          }
        }}
        // classes={{
        //   paper: 'relative'
        // }}
        ModalProps={{
          keepMounted: false
        }}
        className="transition duration-150 ease-in-out"
      >
        <CalendarRightSideBar />
      </Drawer>
    </Box>
  );
}

function checkIsIn(arr, date2) {
  let isIn = false;

  arr.forEach((date1) => {
    if (new Date(date1).toDateString() === new Date(date2).toDateString()) {
      isIn = true;
    }
  });

  return isIn;
}

const Daycell = memo(({ date, isOther, selectedDate, ...props }) => {
  const dispatch = useDispatch();

  const isSelected = isEqual(new Date(selectedDate), new Date(date));
  const isGrayed = checkIsIn(data, new Date(date));
  // console.log('isGrayed', isGrayed, date, data);

  return (
    <Box
      className="text-green flex flex-col p-1 cursor-pointer"
      sx={(theme) => ({
        width: '100%',
        height: '100%',
        border: `1px solid transparent`,
        ...(isGrayed && { backgroundColor: '#F7F8FA' }),
        ...(isSelected && { borderColor: theme.palette.primary.light })
      })}
      onClick={() => {
        !isGrayed &&
          !isOther &&
          dispatch(setSelectedDate(new Date(date).toISOString()));
      }}
    >
      <Box className="grow px-[10px]">
        <Typography>{date.getDate()}</Typography>
      </Box>
      {!isGrayed && (
        <Box
          className="flex flex-col px-2 py-1 rounded-[4px]"
          bgcolor="gray.light"
        >
          <Typography>8</Typography>
          <Typography color="gray.main" className="text-xs leading-tight">
            available apointments
          </Typography>
        </Box>
      )}
    </Box>
  );
});

const CalendarRightSideBar = () => {
  const appointmentHours = [
    '09:00 - 09:30',
    '09:00 - 09:30',
    '09:00 - 09:30',
    '09:00 - 09:30'
  ];
  return (
    <List disablePadding className="border-l border-primary w-full h-full">
      {appointmentHours.map((hour) => (
        <ListItemText
          className="border-b border-primary"
          primary={hour}
          classes={{ primary: 'p-3 text-center' }}
        />
      ))}
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Button variant="contained" color="primary" className="bg-primary m-4">
          Make Appointment
        </Button>
      </Stack>
    </List>
  );
};

export default PatientsCalendar;

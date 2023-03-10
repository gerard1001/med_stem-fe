import { Box, Stack, Typography } from '@mui/material';
import { addDays, getDate, getDay, isEqual } from 'date-fns';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import Calendar from '../components/Calendar';
import CalendarMonthYearSelector from '../components/Calendar/CalendarMonthYearSelector';
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
  const selectedDate = useSelector((state) => state.calendar.selectedDate);

  useEffect(() => {
    calendarRef.current.calendar.gotoDate(new Date(viewDate));
  }, [viewDate]);

  console.log({ viewDate, calendarRef });

  return (
    <Box className="sm:p-4 p-8 flex flex-col sm:gap-0 gap-3">
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
  );
}

function checkIsIn(arr, date2) {
  let isIn = false;
  // if (!date2) return isIn;

  arr.forEach((date1) => {
    // console.log(
    //   'isEqual',
    //   new Date(date1).toDateString(),
    //   new Date(date2).toDateString()
    // );
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

export default PatientsCalendar;

import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import BackButton from '../components/BackButton';
import Calendar from '../components/Calendar';
import CalendarMonthYearSelector from '../components/CalendarMonthYearSelector';

function PatientsCalendar() {
  const calendarRef = useRef(null);
  const [anchor, setAnchor] = useState(null);
  const [viewDate, setViewDate] = useState(new Date());
  const viewDateRef = useRef(viewDate);

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
          dayCellContent={(props) => (
            // console.log(props, 'props');
            <Box
              className="text-green flex flex-col"
              sx={{
                width: '100%',
                height: '100%'
              }}
            >
              <Box className="grow px-[10px]">
                <Typography>{props.date.getDate()}</Typography>
              </Box>
              {/* If active step we ad the plus sign */}

              <Box
                className="flex flex-col px-2 py-1 rounded-[4px]"
                bgcolor="gray.light"
              >
                <Typography>8</Typography>
                <Typography color="gray.main" className="text-xs leading-tight">
                  available apointments
                </Typography>
              </Box>
            </Box>
          )}
        />
      </Box>
    </Box>
  );
}

export default PatientsCalendar;

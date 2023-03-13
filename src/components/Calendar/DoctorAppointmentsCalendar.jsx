/* eslint-disable no-underscore-dangle */
import { Box, Typography } from '@mui/material';
import { getDay, isEqual } from 'date-fns';
import React, { forwardRef, memo, useEffect } from 'react';
import Calendar from '.';

const DoctorAppointmentsCalendar = forwardRef(
  (
    {
      handleDayClick = () => {},
      selectedDate,
      loading = false,
      viewDate = new Date()
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
          return (
            <Daycell
              {...{ isOther, date, selectedDate, handleDayClick, loading }}
            />
          );
        }}
      />
    );
  }
);

const Daycell = memo(
  ({ date, isOther, selectedDate, handleDayClick, loading }) => {
    const isSelected = isEqual(new Date(selectedDate), new Date(date));
    const isGrayed = getDay(date) === 0 || getDay(date) === 6;

    return (
      <Box
        className="text-green flex flex-col p-1 cursor-pointer"
        sx={(theme) => ({
          width: '100%',
          height: '100%',
          border: `1px solid transparent`,
          ...(isGrayed && { backgroundColor: '#F7F8FA' }),
          ...(isSelected && { borderColor: theme.palette.primary.main })
        })}
        onClick={() => {
          !loading &&
            !isGrayed &&
            !isOther &&
            handleDayClick(new Date(date).toISOString());
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
  }
);

export default DoctorAppointmentsCalendar;

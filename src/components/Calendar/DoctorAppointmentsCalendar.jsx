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
      viewDate = new Date(),
      workdays
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
              {...{
                isOther,
                date,
                selectedDate,
                handleDayClick,
                loading,
                workdays
              }}
            />
          );
        }}
      />
    );
  }
);

const Daycell = memo(
  ({ date, isOther, selectedDate, handleDayClick, loading, workdays }) => {
    const isSelected = isEqual(new Date(selectedDate), new Date(date));
    // const isGrayed = getDay(date) === 0 || getDay(date) === 6;

    const isDisabledDay = (date, arr) => {
      const dayOfWeek = date;

      return (
        arr &&
        (dayOfWeek === arr[0] ||
          dayOfWeek === arr[1] ||
          dayOfWeek === arr[2] ||
          dayOfWeek === arr[3] ||
          dayOfWeek === arr[4] ||
          dayOfWeek === arr[5] ||
          dayOfWeek === arr[6] ||
          dayOfWeek === arr[7] ||
          dayOfWeek === arr[8] ||
          dayOfWeek === arr[9] ||
          dayOfWeek === arr[10] ||
          dayOfWeek === arr[11] ||
          dayOfWeek === arr[12] ||
          dayOfWeek === arr[13] ||
          dayOfWeek === arr[14] ||
          dayOfWeek === arr[15] ||
          dayOfWeek === arr[16] ||
          dayOfWeek === arr[17] ||
          dayOfWeek === arr[18] ||
          dayOfWeek === arr[19] ||
          dayOfWeek === arr[20] ||
          dayOfWeek === arr[21] ||
          dayOfWeek === arr[22] ||
          dayOfWeek === arr[23] ||
          dayOfWeek === arr[24] ||
          dayOfWeek === arr[25] ||
          dayOfWeek === arr[26] ||
          dayOfWeek === arr[27] ||
          dayOfWeek === arr[28] ||
          dayOfWeek === arr[29] ||
          dayOfWeek === arr[30] ||
          dayOfWeek === arr[31] ||
          dayOfWeek === arr[32] ||
          dayOfWeek === arr[33] ||
          dayOfWeek === arr[34] ||
          dayOfWeek === arr[35] ||
          dayOfWeek === arr[36])
      );
    };

    let datestr = workdays?.map((values) => {
      return new Date(values.date).toLocaleDateString();
    });

    const isGrayed = !isDisabledDay(
      new Date(date).toLocaleDateString(),
      datestr
    );

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

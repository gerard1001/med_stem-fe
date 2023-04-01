/* eslint-disable no-underscore-dangle */
import { Box, Typography } from '@mui/material';
import { format, getDay, isEqual } from 'date-fns';
import React, { forwardRef, memo, useEffect } from 'react';
import Calendar from '.';

const DoctorAppointmentsCalendar = forwardRef(
  (
    {
      handleDayClick = () => {},
      selectedDate,
      loading = false,
      viewDate = new Date(),
      slots,
      vacationSlots,
      dayoffSlots
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
          return (
            <Daycell
              {...{
                isOther,
                date,
                selectedDate,
                handleDayClick,
                loading,
                availableAppointments,
                availableDayoffs,
                availableVacations
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
    availableDayoffs,
    availableVacations
  }) => {
    const isSelected = isEqual(new Date(selectedDate), new Date(date));
    const isGrayed = !availableAppointments || availableAppointments === 0;
    const isVacant = availableVacations;
    const isDayoff = availableDayoffs;

    return (
      <Box
        className={`text-green flex flex-col p-1 ${
          isGrayed || isVacant || isDayoff ? 'cursor-default' : 'cursor-pointer'
        }`}
        sx={(theme) => ({
          width: '100%',
          height: '100%',
          border: `1px solid transparent`,
          ...((isGrayed || isDayoff || isVacant) && {
            backgroundColor: '#F7F8FA'
          }),
          ...(isSelected && { borderColor: theme.palette.primary.main })
        })}
        onClick={() => {
          !loading &&
            !isGrayed &&
            !isVacant &&
            !isDayoff &&
            !isOther &&
            handleDayClick(new Date(date));
        }}
      >
        <Box className="grow px-[10px]">
          <Typography>{date.getDate()}</Typography>
        </Box>
        <Box
          className={`flex flex-col px-2 py-1 rounded-[4px] ${
            (isGrayed || isVacant || isDayoff) && 'opacity-0'
          }  
          `}
          bgcolor="gray.light"
        >
          <Typography>{availableAppointments || '0'}</Typography>
          <Typography color="gray.main" className="text-xs leading-tight">
            available apointments
          </Typography>
        </Box>
      </Box>
    );
  }
);

export default DoctorAppointmentsCalendar;

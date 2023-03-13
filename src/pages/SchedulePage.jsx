import { Box, Stack, Typography } from '@mui/material';
import { getMonth, getYear } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CalendarMonthYearSelector from '../components/Calendar/CalendarMonthYearSelector';
import DoctorAppointmentsCalendar from '../components/Calendar/DoctorAppointmentsCalendar';
import SelectDoctor from '../components/SelectDoctor';
import { getDoctorList } from '../redux/reducers/doctor.reducer';
import { getDoctorWorkDays } from '../redux/reducers/workDays.reducer';

const SchedulePage = () => {
  const calendarRef = useRef();
  const dispatch = useDispatch();
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  console.log(selectedDoctor);
  const [loading, setLoading] = useState(false);
  const doctors = useSelector((state) => state.doctor?.data?.data);
  const { id: doctorId } = useParams();

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    dispatch(getDoctorList());
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getDoctorWorkDays({
        id: doctorId,
        month: getMonth(viewDate),
        year: getYear(viewDate)
      })
    ).then(() => {
      setLoading(false);
    });
  }, [doctorId]);

  return (
    <Box className="p-8">
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={2}
        width="100%"
        flexWrap="wrap"
        pb={2}
      >
        <Typography className="text-black text-2xl font-semibold leading-0 opacity-70">
          Schedule
        </Typography>
        <Stack direction="row-reverse" className="xs:w-full sm:w-max">
          <CalendarMonthYearSelector {...{ setViewDate, viewDate, loading }} />
        </Stack>
      </Stack>
      <SelectDoctor
        selected={selectedDoctor}
        setSelected={setSelectedDoctor}
        doctors={doctors}
      />
      {/* <SelectPatient /> */}
      <DoctorAppointmentsCalendar
        ref={calendarRef}
        {...{ loading, selectedDate, handleDayClick, viewDate }}
      />
    </Box>
  );
};

export default SchedulePage;

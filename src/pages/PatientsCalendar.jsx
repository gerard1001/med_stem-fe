/* eslint-disable no-underscore-dangle */
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { getDay, getDaysInMonth, getMonth, isEqual } from 'date-fns';
import _ from 'lodash';
import React, { memo, useEffect, useRef, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import CreateAppointmentModal from '../components/Appointment/CreateAppointmentModal';
import BackButton from '../components/BackButton';
import Calendar from '../components/Calendar';
import CalendarMonthYearSelector from '../components/Calendar/CalendarMonthYearSelector';
import DoctorAppointmentsCalendar from '../components/Calendar/DoctorAppointmentsCalendar';
import {
  getDoctorAppointments,
  selectAppointmentsById
} from '../redux/reducers/appointment.reducer';
import { setSelectedDate } from '../redux/reducers/calendar.reducer';
import { getOneDoctor } from '../redux/reducers/doctor.reducer';
import {
  getDoctorWorkDays,
  selectWorkDaysDoctors
} from '../redux/reducers/workDays.reducer';

// const formatData = (workDays, appointments, date, doctor) => {
//   const totalDays = getDaysInMonth(getMonth(date));
//   const currentDay = 0;
//   let data = {};

//   workDays.forEach((workDay) => {
//     const itsAppointment = _.filter(appointments, (o) => o._id === workDay._id);
//     if (itsAppointment.length > 0) {
//       const slots = itsAppointment.map(
//         (appointment) => appointment.appointment_period
//       );
//       data = {
//         ...data,
//         [workDay._id]: { slots, from: workDay.from, to: workDay.to }
//       };
//     }
//   });

//   let finalData = {};

//   Object.keys(data).forEach(() => {});
// };

function PatientsCalendar() {
  const dispatch = useDispatch();
  const { id: doctorId } = useParams();
  const calendarRef = useRef(null);
  const [viewDate, setViewDate] = useState(new Date());
  const [openRightSideBar, setOpenRightSideBar] = useState(null);
  const [loading, setLoading] = useState(false);
  const selectedDate = useSelector((state) => state.calendar.selectedDate);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const workDays = useSelector((state) =>
    selectWorkDaysDoctors(state, doctorId)
  );
  const appointments = useSelector((state) =>
    selectAppointmentsById(state, doctorId)
  );

  console.log(calendarRef, 'calendarRef');

  const toggleRightSideBar = () => {
    setOpenRightSideBar((open) => !open);
  };
  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getOneDoctor(doctorId));
    dispatch(getDoctorWorkDays({ id: doctorId })).then(({ error }) => {
      if (error) {
        toast.error(error.message);
      }
    });
    dispatch(getDoctorAppointments(doctorId)).then(({ error }) => {
      if (error) {
        toast.error(error.message);
      }
      setLoading(false);
    });
  }, [doctorId]);
  useEffect(() => {}, [doctorId]);

  return (
    <Box className="flex flex-row w-full h-full">
      <Box className="sm:p-4 p-8 flex flex-col grow sm:gap-0 gap-3 overflow-y-auto">
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
          <DoctorAppointmentsCalendar
            ref={calendarRef}
            {...{ handleDayClick, selectedDate, loading, viewDate }}
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
        <CalendarRightSideBar {...{ loading }} />
      </Drawer>
    </Box>
  );
}

const CalendarRightSideBar = ({ loading }) => {
  const appointmentHours = [
    '09:00 - 09:30',
    '09:00 - 09:31',
    '09:00 - 09:32',
    '09:00 - 09:33'
  ];
  const [selectedTime, setSelectedTime] = useState(appointmentHours[0]);
  const [openModal, setOpenModal] = useState(false);
  const doctor = useSelector((state) => state.doctor.single_data.data);

  return (
    <>
      <List disablePadding className="border-l border-primary w-full h-full">
        {appointmentHours.map((hour, index) => (
          <>
            <ListItemButton
              key={hour}
              onClick={() => {
                !loading && setSelectedTime(hour);
              }}
              className="border-b border-primary p-3 text-center"
              selected={hour === selectedTime}
            >
              <ListItemText primary={hour} />
            </ListItemButton>
            <Divider key={hour + index} sx={{ borderColor: 'primary.main' }} />
          </>
        ))}
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            className="bg-primary m-4"
            onClick={() => {
              !loading && setOpenModal(true);
            }}
          >
            Make Appointment
          </Button>
        </Stack>
      </List>
      <CreateAppointmentModal
        open={openModal || false}
        {...{
          doctorName: {
            firstName: doctor?.first_name,
            lastName: doctor?.last_name
          },
          specialities: doctor?.departments.map((dep) => dep.speciality_name),
          onClose: () => {
            setOpenModal(false);
          },
          selectedTime
        }}
      />
    </>
  );
};

export default PatientsCalendar;

/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
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
import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import CreateAppointmentModal from '../components/Appointment/CreateAppointmentModal';
import BackButton from '../components/BackButton';
import CalendarMonthYearSelector from '../components/Calendar/CalendarMonthYearSelector';
import DoctorAppointmentsCalendar from '../components/Calendar/DoctorAppointmentsCalendar';
import HomeNavBar from '../components/HomeNavBar';
import { getOneDoctor } from '../redux/reducers/doctor.reducer';
import { getOnePatient } from '../redux/reducers/patient.reducer';
import {
  setSelectedDoctorDataRedux,
  setSelectedPatientDataRedux,
  setSelectedWorkDay
} from '../redux/reducers/user.reducer';
import {
  getDoctorWorkDays,
  selectWorkDaysDoctors
} from '../redux/reducers/workDays.reducer';

function PatientsCalendar() {
  const dispatch = useDispatch();
  const { id: doctorId } = useParams();
  const clientId = JSON.parse(localStorage.getItem('userLoginData'))?.user
    ?.client_id;
  const calendarRef = useRef(null);
  const [viewDate, setViewDate] = useState(new Date());
  const [openRightSideBar, setOpenRightSideBar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState(null);
  // const selectedDate = useSelector((state) => state.calendar.selectedDate);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const workDays = useSelector(
    (state) => selectWorkDaysDoctors(state, doctorId)?.workDays
  );
  const doctor = useSelector((state) => state.doctor);
  const patient = useSelector((state) => state.patient);

  const doctorData = doctor?.single_data?.data;
  const patientData = patient?.single_data?.data;

  const toggleRightSideBar = () => {
    setOpenRightSideBar((open) => !open);
  };
  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const selectedWorkDay = workDays?.filter((values) => {
    return values.date === selectedDate;
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
      const { from, to, date } = workDay;
      if (isToday(new Date(date)) || isFuture(new Date(date))) {
        const duration = workDay.schedule.appointment_duration;
        const { appointments } = workDay.schedule;
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
          if (currentSlot === '17:00') {
            currentSlot = `17:00 - ${addSubstractTime(17, 0, duration)}`;
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
  useEffect(() => {
    dispatch(getOneDoctor(doctorId));
    dispatch(getOnePatient(clientId));
  }, [doctorId]);
  useEffect(() => {
    setLoading(true);
    dispatch(
      getDoctorWorkDays({
        id: doctorId,
        month: getMonth(viewDate) + 1,
        year: getYear(viewDate)
      })
    ).then(({ error }) => {
      if (error) {
        toast.error(error.message);
      }
      setLoading(false);
    });
  }, [doctorId, viewDate]);
  useEffect(() => {
    dispatch(setSelectedDoctorDataRedux(doctorData));
    dispatch(setSelectedPatientDataRedux(patientData));
    dispatch(setSelectedWorkDay(selectedWorkDay && selectedWorkDay[0]));
  }, [doctorData, patientData, selectedWorkDay]);

  return (
    <HomeNavBar>
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
              {...{
                handleDayClick,
                selectedDate,
                loading,
                viewDate,
                slots
              }}
            />
          </Box>
        </Box>
        {selectedDate && slots && (
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
            <CalendarRightSideBar {...{ loading, slots, viewDate }} />
          </Drawer>
        )}
      </Box>
    </HomeNavBar>
  );
}

const CalendarRightSideBar = ({ loading, slots, viewDate }) => {
  const dispatch = useDispatch();
  const [selectedTime, setSelectedTime] = useState();
  const [openModal, setOpenModal] = useState(false);
  const doctor = useSelector((state) => state.doctor.single_data.data);
  console.log(selectedTime, 'selectedTime');

  const selectedPatientData = useSelector(
    (state) => state.user.selectedPatient
  );
  const selectedWorkDayData = useSelector(
    (state) => state.user.selectedWorkDay
  );
  const handleAfterSubmit = async () => {
    return new Promise((res, rej) => {
      dispatch(
        getDoctorWorkDays({
          id: doctor.doctor_id,
          month: getMonth(viewDate) + 1,
          year: getYear(viewDate)
        })
      ).then(() => {
        res();
      });
    });
  };

  const appointmentHours =
    slots && selectedWorkDayData
      ? slots[format(new Date(selectedWorkDayData.date), 'yyyy-MM-dd')]
      : [];

  return (
    <>
      <List disablePadding className="border-l border-primary w-full h-full">
        {appointmentHours?.map((hour) => (
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
            <Divider
              key={`${hour} divider `}
              sx={{ borderColor: 'primary.main' }}
            />
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
          doctorData: {
            doctorId: doctor?.doctor_id,
            firstName: doctor?.first_name,
            lastName: doctor?.last_name
          },
          patientData: {
            patientId: selectedPatientData?.client_id,
            firstName: selectedPatientData?.first_name,
            lastName: selectedPatientData?.last_name
          },
          workDayData: {
            workDayId: selectedWorkDayData?._id
          },
          scheduleData: {
            scheduleId: selectedWorkDayData?.schedule_id
          },
          specialities: doctor?.departments.map((dep) => dep.speciality_name),
          onClose: () => {
            setOpenModal(false);
          },
          selectedTime,
          handleAfterSubmit
        }}
      />
    </>
  );
};

export default PatientsCalendar;

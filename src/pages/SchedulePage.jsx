import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import { getMonth, getYear } from 'date-fns';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CreateAppointmentModal from '../components/Appointment/CreateAppointmentModal';
import CalendarMonthYearSelector from '../components/Calendar/CalendarMonthYearSelector';
import DoctorAppointmentsCalendar from '../components/Calendar/DoctorAppointmentsCalendar';
import SelectDoctor from '../components/SelectDoctor';
import SelectPatient from '../components/SelectPatient';
import { DashboardContext } from '../context/DashboardContext';
import { getDoctorList } from '../redux/reducers/doctor.reducer';
import { getPatientList } from '../redux/reducers/patient.reducer';
import { getDoctorWorkDays } from '../redux/reducers/workDays.reducer';

const SchedulePage = () => {
  const calendarRef = useRef();
  const dispatch = useDispatch();
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const doctors = useSelector((state) => state.doctor?.data?.data);
  const patients = useSelector((state) => state.patient?.data?.data);
  const { id: doctorId } = useParams();

  const { setRightSideBarContent } = useContext(DashboardContext);

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    setRightSideBarContent(<CalendarRightSideBar loading={loading} />);
    dispatch(getDoctorList()).then(({ payload }) => {
      setSelectedDoctor(payload?.data[0]);
    });
    dispatch(getPatientList()).then(({ payload }) => {
      console.log(payload?.data[0], 'payload');
      setSelectedPatient(payload?.data[0]);
    });

    return () => {
      setRightSideBarContent(null);
    };
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
        className="pb-4"
      />
      <SelectPatient
        selected={selectedPatient}
        setSelected={setSelectedPatient}
        patients={patients}
        className="pb-4"
      />
      {/* <SelectPatient /> */}
      <DoctorAppointmentsCalendar
        ref={calendarRef}
        {...{ loading, selectedDate, handleDayClick, viewDate }}
      />
    </Box>
  );
};

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

export default SchedulePage;

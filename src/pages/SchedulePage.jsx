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
import { getDoctorList, getOneDoctor } from '../redux/reducers/doctor.reducer';
import { getPatientList } from '../redux/reducers/patient.reducer';
import { getDoctorWorkDays } from '../redux/reducers/workDays.reducer';
import {
  setSelectedDoctorDataRedux,
  setSelectedPatientDataRedux,
  setSelectedWorkDay
} from '../redux/reducers/user.reducer';
import getTimePeriods from '../utils/generateTimePeriods';

const SchedulePage = () => {
  const calendarRef = useRef();
  const dispatch = useDispatch();
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [workdays, setWorkdays] = useState(null);
  const [loading, setLoading] = useState(false);
  const doctors = useSelector((state) => state.doctor?.data?.data);
  const patients = useSelector((state) => state.patient?.data?.data);
  const days = useSelector((state) => state.workDays);
  const oneDoctor = useSelector((state) => state.doctor?.single_data?.data);
  // const { id: doctorId } = useParams();

  const { setRightSideBarContent } = useContext(DashboardContext);

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    setDoctorId(selectedDoctor?.doctor_id);
    dispatch(getOneDoctor(selectedDoctor?.doctor_id));
  }, [selectedDoctor]);

  useEffect(() => {
    setWorkdays(days?.entities[doctorId]?.workDays);
  }, [days, doctorId]);

  const dates = workdays?.map((values) => values.date);

  const selectedWorkDay = workdays?.filter((values) => {
    return values.date === selectedDate;
  });

  useEffect(() => {
    setRightSideBarContent(
      <CalendarRightSideBar loading={loading} doc={selectedDoctor} />
    );
    dispatch(getDoctorList()).then(({ payload }) => {
      setSelectedDoctor(payload?.data[0]);
    });
    dispatch(getPatientList()).then(({ payload }) => {
      setSelectedPatient(payload?.data[0]);
    });

    return () => {
      setRightSideBarContent(null);
    };
  }, []);

  useEffect(() => {
    dispatch(setSelectedDoctorDataRedux(selectedDoctor));
    dispatch(setSelectedPatientDataRedux(selectedPatient));
    dispatch(setSelectedWorkDay(selectedWorkDay && selectedWorkDay[0]));
  }, [selectedDoctor, selectedPatient, selectedWorkDay]);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getDoctorWorkDays({
        id: doctorId,
        month: getMonth(viewDate) + 1,
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
        {...{ loading, selectedDate, handleDayClick, viewDate, workdays }}
      />
    </Box>
  );
};

const CalendarRightSideBar = ({ loading, slots, viewDate }) => {
  const dispatch = useDispatch();
  const [selectedTime, setSelectedTime] = useState();
  const [openModal, setOpenModal] = useState(false);
  const doctor = useSelector((state) => state.doctor.single_data.data);

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

  useEffect(() => {
    setSelectedTime(null);
  }, [viewDate, slots, selectedWorkDayData]);

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
            disabled={!selectedTime}
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
            workDayId: selectedWorkDayData?._id,
            workDayDate: selectedWorkDayData?.date
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

// const CalendarRightSideBar = ({ loading }) => {
//   const appointmentHours = [
//     '09:00 - 09:30',
//     '09:00 - 09:31',
//     '09:00 - 09:32',
//     '09:00 - 09:33'
//   ];
//   const dispatch = useDispatch();
//   const [selectedTime, setSelectedTime] = useState('');
//   const [openModal, setOpenModal] = useState(false);
//   const [startingHour, setStartingHour] = useState('08:00:00');
//   const [endingHour, setEndingHour] = useState('18:00:00');
//   const [duration, setDuration] = useState(30);
//   // const [remainingSlots, setRemainingSlots] = useState([]);
//   const doctor = useSelector((state) => state.doctor.single_data.data);

//   const selectedDoctordata = useSelector((state) => state.user.selectedDoctor);
//   const selectedPatientData = useSelector(
//     (state) => state.user.selectedPatient
//   );
//   const selectedWorkDayData = useSelector(
//     (state) => state.user.selectedWorkDay
//   );

//   // alert(selectedDoctordata?.doctor_id);

//   useEffect(() => {
//     dispatch(getOneDoctor(selectedDoctordata?.doctor_id));
//   }, [selectedDoctordata]);

//   useEffect(() => {
//     setStartingHour(selectedWorkDayData?.from);
//     setEndingHour(selectedWorkDayData?.to);
//     setDuration(selectedWorkDayData?.schedule?.appointment_duration);
//   }, [selectedWorkDayData]);

//   const availableSlots =
//     selectedWorkDayData && startingHour && endingHour && duration
//       ? getTimePeriods(startingHour, endingHour, duration)
//       : [];

//   const takenAppointmentsOnWorkDay = doctor?.appointments?.filter((values) => {
//     return values._id === selectedWorkDayData?._id;
//   });
//   const takenAppointmentsOnWorkDayPeriod = takenAppointmentsOnWorkDay?.map(
//     (values) => {
//       return values.appointment_period;
//     }
//   );
//   const takenAppointments = doctor?.appointments?.map((values) => {
//     return values.appointment_period;
//   });

//   const remainingSlots = availableSlots?.filter(
//     (element) => !takenAppointmentsOnWorkDayPeriod.includes(element)
//   );

//   return (
//     <>
//       <List disablePadding className="border-l border-primary w-full h-full">
//         {remainingSlots ? (
//           remainingSlots?.map((hour, index) => (
//             <Box key={hour}>
//               <ListItemButton
//                 onClick={() => {
//                   !loading && setSelectedTime(hour);
//                 }}
//                 className="border-b border-primary p-3 text-center"
//                 selected={hour === selectedTime}
//               >
//                 <ListItemText primary={hour} />
//               </ListItemButton>
//               <Divider
//                 key={hour + index}
//                 sx={{ borderColor: 'primary.main' }}
//               />
//             </Box>
//           ))
//         ) : (
//           <Typography>No work day has been selected</Typography>
//         )}
//         <Stack direction="row" alignItems="center" justifyContent="center">
//           <Button
//             disabled={
//               !selectedWorkDayData ||
//               !selectedPatientData ||
//               !selectedDoctordata ||
//               !selectedTime
//             }
//             variant="contained"
//             color="primary"
//             className="bg-primary m-4"
//             onClick={() => {
//               !loading && setOpenModal(true);
//             }}
//           >
//             Make Appointment
//           </Button>
//         </Stack>
//       </List>
//       <CreateAppointmentModal
//         open={openModal || false}
//         {...{
//           doctorData: {
//             doctorId: selectedDoctordata?.doctor_id,
//             firstName: selectedDoctordata?.first_name,
//             lastName: selectedDoctordata?.last_name
//           },
//           specialities: selectedDoctordata?.departments.map(
//             (dep) => dep.speciality_name
//           ),
//           patientData: {
//             patientId: selectedPatientData?.client_id,
//             firstName: selectedPatientData?.first_name,
//             lastName: selectedPatientData?.last_name
//           },
//           workDayData: {
//             workDayId: selectedWorkDayData?._id
//           },
//           scheduleData: {
//             scheduleId: selectedWorkDayData?.schedule_id
//           },
//           onClose: () => {
//             setOpenModal(false);
//           },
//           selectedTime
//         }}
//       />
//     </>
//   );
// };

export default SchedulePage;

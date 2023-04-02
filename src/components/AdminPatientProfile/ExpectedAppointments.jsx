import {
  Box,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { cancelAppointment } from '../../redux/reducers/appointment.reducer';
import { getPatientAppointments } from '../../redux/reducers/patient.appointment.reducer';
import { toAdminPatientExpectedAppointments } from '../../redux/reducers/step.reducer';
import CloseXButton from '../CloseXButton';
import LoadingButton from '../LoadingButton';
import PatientProfileNavigation from './PatientProfileNavigation';

const ExpectedAppointments = () => {
  const dispatch = useDispatch();
  const [clickedIdx, setClickedIdx] = React.useState(0);
  const [appointIdx, setAppointIdx] = React.useState(null);
  const [appointDoc, setDoctor] = React.useState(null);
  const [appointSpec, setSpeciality] = React.useState(null);
  const [appointDate, setAppointDate] = React.useState(null);
  const [appointNum, setAppointNum] = React.useState(null);
  const [appointTime, setAppointTime] = React.useState(null);
  const patient = useSelector((state) => state.patient.single_data.data);
  const appoints = useSelector((state) => state.patient_appointment);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => !loading && setOpen(false);

  const isDoctor =
    JSON.parse(localStorage.getItem('userLoginData'))?.user?.Role.role ===
    'doctor';

  const doctorId = JSON.parse(localStorage.getItem('userLoginData'))?.user
    ?.doctor_id;

  const clientId = patient?.client_id;

  const expectedapps = appoints?.data?.data?.filter((values) => {
    if (isDoctor) {
      return (
        values.doctor_id === doctorId &&
        format(new Date(values?.work_day?.date), 'MM-dd-yyyy') >
          format(new Date(), 'MM-dd-yyyy') &&
        !values.is_canceled
      );
    }
    return (
      format(new Date(values?.work_day?.date), 'MM-dd-yyyy') >
        format(new Date(), 'MM-dd-yyyy') && !values.is_canceled
    );
  });

  React.useEffect(() => {
    // dispatch(getOnePatient(clientId));
    dispatch(getPatientAppointments(clientId));
  }, [clientId, appointIdx]);

  const handleCancelAppointment = async () => {
    setLoading(true);
    dispatch(cancelAppointment(appointIdx)).then(() => {
      dispatch(getPatientAppointments(clientId)).then(() => {
        setLoading(false);
        handleClose();
      });
    });
  };

  const nav = useNavigate();

  const appointmentData = [
    {
      name: 'Appointment Date',
      value: appointDate
    },
    {
      name: 'Appointment time',
      value: appointTime
    },
    {
      name: 'Appointment ID',
      value: appointNum
    },
    {
      name: 'Doctor',
      value: appointDoc
    },
    {
      name: 'Speciality',
      value: appointSpec?.speciality_name
    }
  ];

  return (
    <div>
      <Box className="w-full p-20 sm:p-4 max-w-[1400px]">
        <PatientProfileNavigation />
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            backgroundColor: '#F5F5F5',
            maxHeight: '65vh',
            overflow: 'auto'
          }}
        >
          <Table
            sx={{
              minWidth: 650,
              overflow: 'auto',
              marginBottom: '40px'
            }}
            aria-label="simple table"
            stickyHeader
          >
            <TableHead
              className="bg-slate-300"
              sx={{
                backgroundColor: '#F5F5F5'
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: '#F5F5F5',
                    color: '#2E3033',
                    fontSize: { md: '17px', xs: '14px' }
                  }}
                >
                  Doctor name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: '#F5F5F5',
                    color: '#2E3033',
                    fontSize: { md: '17px', xs: '14px' }
                  }}
                >
                  Speciality
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: '#F5F5F5',
                    color: '#2E3033',
                    fontSize: { md: '17px', xs: '14px' }
                  }}
                >
                  Appointment num
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: '#F5F5F5',
                    color: '#2E3033',
                    fontSize: { md: '17px', xs: '14px' }
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: '#F5F5F5',
                    color: '#2E3033',
                    fontSize: { md: '17px', xs: '14px' }
                  }}
                >
                  Options
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="max-[400px] overflow-auto">
              {expectedapps
                ? expectedapps?.map((row, idx) => (
                    <>
                      <TableRow
                        key={row.appointment_number}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          className="cursor-pointer"
                          sx={{
                            color: '#2E3033',
                            fontSize: { md: '17px', xs: '14px' }
                          }}
                        >
                          {row.doctor.first_name} {row.doctor.last_name}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="cursor-pointer"
                          sx={{
                            color: '#2E3033',
                            fontSize: { md: '17px', xs: '14px' }
                          }}
                        >
                          {row.doctor.departments[0]?.speciality_name || '...'}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="cursor-pointer"
                          sx={{
                            color: '#2E3033',
                            fontSize: { md: '17px', xs: '14px' }
                          }}
                        >
                          {row.appointment_number}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: '#2E3033',
                            fontSize: { md: '17px', xs: '14px' }
                          }}
                        >
                          {new Date(row.work_day?.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="center">
                          <Box className="text-[#797979] text-[12px] flex flex-wrap items-center justify-center gap-2 overflow-auto">
                            <Typography
                              style={{
                                color: '#2E3033',
                                textTransform: 'capitalize',
                                cursor: 'pointer',
                                fontSize: { md: '17px', xs: '14px' },
                                margin: '0 5px'
                              }}
                              onClick={() => {
                                dispatch(toAdminPatientExpectedAppointments());
                                nav(
                                  `${
                                    isDoctor
                                      ? `/dashboard/doctor/appointments/${row.appointment_id}`
                                      : `/dashboard/appointments/${row.appointment_id}`
                                  }`
                                );
                              }}
                            >
                              Check
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default ExpectedAppointments;

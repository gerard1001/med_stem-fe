import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  Table,
  TableBody,
  Modal,
  Stack
} from '@mui/material';
import { getOnePatient } from '../../redux/reducers/patient.reducer';
import { getPatientAppointments } from '../../redux/reducers/patient.appointment.reducer';
import { cancelAppointment } from '../../redux/reducers/appointment.reducer';
import EditAppointmentModal from '../Appointment/CancelAppointmentModal';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import PatientProfileNavigation from './PatientProfileNavigation';
import { toAdminPatientExpectedAppointments } from '../../redux/reducers/step.reducer';
import LoadingButton from '../LoadingButton';

const ExpectedAppointments = () => {
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

  const handleShow = () => {
    console.log(appointDate, appointDoc, appointNum, appointSpec, appointTime);
  };

  const isDoctor =
    JSON.parse(localStorage.getItem('userLoginData'))?.user?.Role.role ===
    'doctor';

  const clientId = patient?.client_id;

  const expectedapps = appoints?.data?.data?.filter((values) => {
    return new Date(values?.work_day?.date) > new Date() && !values.is_canceled;
  });

  const dispatch = useDispatch();

  const handleCancelAppointment = () => {
    // setLoading(true);
    dispatch(cancelAppointment(appointIdx)).then(() => {
      setLoading(false);
      dispatch(getPatientAppointments(clientId)).then(() => handleClose());
    });
    handleClose();
  };

  React.useEffect(() => {
    // dispatch(getOnePatient(clientId));
    dispatch(getPatientAppointments(clientId));
  }, [clientId, patient]);

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
            backgroundColor: '#F5F5F5'
          }}
        >
          <Table
            sx={{
              minWidth: 650,
              overflow: 'auto',
              marginBottom: '40px',
              maxHeight: '55vh',
              overflow: 'auto'
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: '#2E3033',
                    fontSize: { md: '17px', xs: '14px' }
                  }}
                >
                  Doctor name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: '#2E3033',
                    fontSize: { md: '17px', xs: '14px' }
                  }}
                >
                  Speciality
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: '#2E3033',
                    fontSize: { md: '17px', xs: '14px' }
                  }}
                >
                  Appointment num
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: '#2E3033',
                    fontSize: { md: '17px', xs: '14px' }
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: '#2E3033',
                    fontSize: { md: '17px', xs: '14px' }
                  }}
                >
                  Options
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
                            <Typography
                              style={{
                                color: '#2E3033',
                                textTransform: 'capitalize',
                                cursor: 'pointer',
                                fontSize: { md: '17px', xs: '14px' }
                              }}
                              onClick={() => {
                                setAppointIdx(row.appointment_id);
                                setDoctor(
                                  `${row.doctor.first_name} ${row.doctor.last_name}`
                                );
                                setSpeciality(row.doctor.departments[0]);
                                setAppointDate(
                                  new Date(
                                    row.work_day.date
                                  ).toLocaleDateString()
                                );
                                setAppointNum(row.appointment_number);
                                setAppointTime(row.appointment_period);
                                setClickedIdx(idx);
                                handleOpen();
                                handleShow();
                              }}
                            >
                              cancel
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                      {clickedIdx === idx && (
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          className="flex flex-col items-center justify-center"
                          sx={{
                            '& .MuiFormControl-root': {}
                          }}
                        >
                          <Box className="flex flex-col w-[500px] sm:w-[98%] justify-center items-center gap-4 bg-white border border-primary shadow-2 rounded-[20px] relative py-10 px-4 m-4 overflow-y-auto">
                            <Typography className="w-full font-semibold text-lg text-center">
                              Appointment Cancelation
                            </Typography>

                            <Box>
                              <Stack direction="row" gap={6} width="100%">
                                <Stack>
                                  {appointmentData.map(({ name, value }) => (
                                    <Typography
                                      key={name}
                                      className="truncate font-semibold "
                                    >
                                      {name}
                                    </Typography>
                                  ))}
                                </Stack>
                                <Stack>
                                  {appointmentData?.map(({ value }) => (
                                    <Typography
                                      component={Link}
                                      key={value}
                                      className="truncate"
                                    >
                                      {value}
                                      {/* Edit */}
                                    </Typography>
                                  ))}
                                </Stack>
                              </Stack>
                            </Box>

                            <Box>
                              <LoadingButton
                                loading={loading}
                                className="max-w-fit w-full"
                                onClick={() => {
                                  handleCancelAppointment();
                                }}
                              >
                                Cancel appointment
                              </LoadingButton>
                            </Box>
                          </Box>
                        </Modal>
                      )}
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

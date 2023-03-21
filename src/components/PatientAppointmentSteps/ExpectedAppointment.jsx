import React from 'react';
import { Box, Typography } from '@mui/material';
import PatientAppointmentNavigation from './PatientAppoinmentNavigation';
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
import { cancelAppointment } from '../../redux/reducers/patient.appointment.reducer';
import EditAppointmentModal from '../Appointment/CancelAppointmentModal';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const ExpectedAppointment = () => {
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleShow = () => {
    console.log(appointDate, appointDoc, appointNum, appointSpec, appointTime);
  };

  const clientId = JSON.parse(localStorage.getItem('userLoginData'))?.user
    ?.client_id;

  const expectedapps = appoints?.data?.data?.filter((values) => {
    return new Date(values?.work_day?.date) > new Date() && !values.is_canceled;
  });
  const dispatch = useDispatch();

  const handleCancelAppointment = () => {
    dispatch(cancelAppointment(appointIdx));
  };

  React.useEffect(() => {
    dispatch(getOnePatient(clientId));
    dispatch(getPatientAppointments(clientId));
  }, [clientId]);

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
      <Box className="w-full">
        <PatientAppointmentNavigation />
        <TableContainer component={Paper} elevation={0}>
          <Table
            sx={{
              minWidth: 650,
              backgroundColor: '#fff',
              overflow: 'auto',
              marginBottom: '40px',
              maxHeight: '55vh',
              overflow: 'auto'
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#797979', fontSize: '14px' }}>
                  Doctor name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: '#797979', fontSize: '14px' }}
                >
                  Speciality
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: '#797979', fontSize: '14px' }}
                >
                  Appointment num
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: '#797979', fontSize: '14px' }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: '#797979', fontSize: '14px' }}
                >
                  Options
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expectedapps ? (
                expectedapps?.map((row, idx) => (
                  <>
                    <TableRow
                      key={row.appointment_number}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className="cursor-pointer"
                        onClick={() => {
                          nav(`${row.appointment_id}`);
                        }}
                      >
                        {row.doctor.first_name} {row.doctor.last_name}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="cursor-pointer"
                        sx={{ color: '#797979', fontSize: '14px' }}
                        onClick={() => {
                          nav(`${row.appointment_id}`);
                        }}
                      >
                        {row.doctor.departments[0].speciality_name}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="cursor-pointer"
                        sx={{ color: '#797979', fontSize: '14px' }}
                      >
                        {row.appointment_number}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ color: '#797979', fontSize: '14px' }}
                        onClick={() => {
                          nav(`${row.appointment_id}`);
                        }}
                      >
                        {new Date(row.work_day?.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          color: '#797979',
                          fontSize: '12px',
                          display: 'flex',
                          flexWrap: 'wrap',
                          overflow: 'auto',
                          gap: '4px'
                        }}
                      >
                        <Typography
                          style={{
                            backgroundColor: '#fafcfd',
                            color: '#797979',
                            textTransform: 'capitalize',
                            cursor: 'pointer',
                            fontSize: '14px',
                            margin: '0 5px'
                          }}
                        >
                          Edit
                        </Typography>
                        <Typography
                          style={{
                            backgroundColor: '#fafcfd',
                            color: '#797979',
                            textTransform: 'capitalize',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                          onClick={() => {
                            console.log({ row });
                            setAppointIdx(row.appointment_id);
                            setDoctor(
                              `${row.doctor.first_name} ${row.doctor.last_name}`
                            );
                            setSpeciality(row.doctor.departments[0]);
                            setAppointDate(
                              new Date(row.work_day.date).toLocaleDateString()
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
                          '& .MuiFormControl-root': {
                            margin: 0
                          }
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
                            <Button
                              className="bg-[#1A4CFF] text-white w-fit"
                              onClick={() => {
                                handleClose();
                                handleCancelAppointment();
                              }}
                            >
                              Cancel appointment
                            </Button>
                          </Box>
                        </Box>
                      </Modal>
                    )}
                  </>
                ))
              ) : (
                <Typography>No expected appointments</Typography>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default ExpectedAppointment;

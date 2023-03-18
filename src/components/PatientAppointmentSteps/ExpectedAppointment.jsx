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
  Modal
} from '@mui/material';
import { getOnePatient } from '../../redux/reducers/patient.reducer';
import { getPatientAppointments } from '../../redux/reducers/patient.appointment.reducer';
import { cancelAppointment } from '../../redux/reducers/patient.appointment.reducer';
import { useNavigate } from 'react-router';

const ExpectedAppointment = () => {
  const [clickedIdx, setClickedIdx] = React.useState(0);
  const [appointIdx, setAppointIdx] = React.useState(0);
  const patient = useSelector((state) => state.patient.single_data.data);
  const appoints = useSelector((state) => state.patient_appointment);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                        onClick={() => {
                          nav(`${row.appointment_id}`);
                        }}
                      >
                        {row.doctor.first_name} {row.doctor.last_name}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ color: '#797979', fontSize: '14px' }}
                        onClick={() => {
                          nav(`${row.appointment_id}`);
                        }}
                      >
                        {row.doctor.departments[0].speciality_name}
                      </TableCell>
                      <TableCell
                        align="left"
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
                            setAppointIdx(row.appointment_id);
                            setClickedIdx(idx);
                            handleOpen();
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
                        <Box className="flex flex-col w-[fit] justify-center items-center gap-4 bg-white border border-primary shadow-2 rounded-[20px] relative py-10 px-12 m-4 overflow-y-auto">
                          <Typography className="w-full font-semibold text-lg text-center">
                            Cancel appointment
                          </Typography>

                          <Box className="flex flex-center justify-evenly w-full gap-2">
                            <Box>
                              <Button
                                className="border border-[#1A4CFF] text-[#1A4CFF] w-[120px]"
                                onClick={handleClose}
                              >
                                Back
                              </Button>
                            </Box>
                            <Box>
                              <Button
                                className="bg-[#1A4CFF] text-white w-[120px]"
                                onClick={() => {
                                  handleClose();
                                  handleCancelAppointment();
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
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

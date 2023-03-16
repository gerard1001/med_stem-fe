import React from 'react';
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
  TableBody
} from '@mui/material';
import { getOnePatient } from '../../redux/reducers/patient.reducer';
import { getPatientAppointments } from '../../redux/reducers/patient.appointment.reducer';
import PatientAppointmentNavigation from './PatientAppoinmentNavigation';

const PreviousAppointment = () => {
  const patient = useSelector((state) => state.patient.single_data.data);
  const appoints = useSelector((state) => state.patient_appointment);

  const clientId = JSON.parse(localStorage.getItem('userLoginData'))?.user
    ?.client_id;

  const prevapps = appoints?.data?.data?.filter((values) => {
    return new Date(values?.work_day?.date) < new Date();
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getOnePatient(clientId));
    dispatch(getPatientAppointments(clientId));
  }, [clientId]);
  return (
    <div>
      <Box className="w-full">
        <PatientAppointmentNavigation />
        <TableContainer component={Paper} elevation={0}>
          <Table
            sx={{
              minWidth: 650,
              backgroundColor: '#fff',
              height: '55vh',
              overflow: 'auto',
              marginBottom: '40px'
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
              {prevapps?.map((row) => (
                <TableRow
                  key={row.appointment_number}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  id="row-height"
                >
                  <TableCell className="cell-height" component="th" scope="row">
                    {row.doctor.first_name} {row.doctor.last_name}
                  </TableCell>
                  <TableCell
                    className="cell-height"
                    align="left"
                    sx={{ color: '#797979', fontSize: '14px' }}
                  >
                    {row.doctor.departments[0].speciality_name}
                  </TableCell>
                  <TableCell
                    className="cell-height"
                    align="left"
                    sx={{ color: '#797979', fontSize: '14px' }}
                  >
                    {row.appointment_number}
                  </TableCell>
                  <TableCell
                    className="cell-height"
                    align="left"
                    sx={{ color: '#797979', fontSize: '14px' }}
                  >
                    {new Date(row.work_day?.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="cell-height" align="left">
                    cancel
                    {/* <Box
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
                          fontSize: '14px'
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
                      >
                        cancel
                      </Typography>
                    </Box> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default PreviousAppointment;

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';
import { prev_appointments } from '../../utils/dummyData';
import PatientAppointmentNavigation from './PatientAppoinmentNavigation';

const PreviousAppointment = () => {
  return (
    <div>
      <Box className="w-full">
        <PatientAppointmentNavigation />
        <TableContainer component={Paper} elevation={0}>
          <Table
            sx={{ minWidth: 650, backgroundColor: '#fff' }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#797979' }}>Doctor name</TableCell>
                <TableCell align="left" sx={{ color: '#797979' }}>
                  Speciality
                </TableCell>
                <TableCell align="left" sx={{ color: '#797979' }}>
                  Appointment num
                </TableCell>
                <TableCell align="left" sx={{ color: '#797979' }}>
                  Date
                </TableCell>
                <TableCell align="left" sx={{ color: '#797979' }}>
                  Options
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prev_appointments.map((row) => (
                <TableRow
                  key={row.appointment_number}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.doctor.first_name} {row.doctor.last_name}
                  </TableCell>
                  <TableCell align="left">{row.doctor.speciality}</TableCell>
                  <TableCell align="left">{row.appointment_number}</TableCell>
                  <TableCell align="left">{row.appointment_date}</TableCell>
                  <TableCell align="left">
                    <Button
                      style={{
                        backgroundColor: '#fafcfd',
                        color: '#797979',
                        textTransform: 'capitalize'
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{
                        backgroundColor: '#fafcfd',
                        color: '#797979',
                        textTransform: 'capitalize'
                      }}
                    >
                      cancel
                    </Button>
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

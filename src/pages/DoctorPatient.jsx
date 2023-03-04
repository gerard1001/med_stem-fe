import React from 'react';
import { Box } from '@mui/material';
import PatientAppointmentNavigation from './PatientAppoinmentNavigation';
import { expected_appointments } from '../utils/dummyData';
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

const DoctorPatient = () => {
  return (
    <div>
      <Box className="w-[80%] mx-auto max-w-[1200px]">
        <PatientAppointmentNavigation />
        <TableContainer component={Paper}>
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
              {expected_appointments.map((row) => (
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

export default DoctorPatient;

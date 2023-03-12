import React from 'react';
import { Box, Typography } from '@mui/material';
import PatientAppointmentNavigation from './PatientAppoinmentNavigation';
import { expected_appointments } from '../../utils/dummyData';
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

const ExpectedAppointment = () => {
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
              {expected_appointments.map((row) => (
                <TableRow
                  key={row.appointment_number}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.doctor.first_name} {row.doctor.last_name}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ color: '#797979', fontSize: '14px' }}
                  >
                    {row.doctor.speciality}
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
                  >
                    {row.appointment_date}
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

export default ExpectedAppointment;

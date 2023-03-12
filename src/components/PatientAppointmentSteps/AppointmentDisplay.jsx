import React from 'react';
import PatientAppointmentNavigation from './PatientAppoinmentNavigation';
import {
  Button,
  Box,
  Paper,
  Typography,
  TextareaAutosize,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  Table,
  TableBody
} from '@mui/material';
import { expected_appointments, recoms } from '../../utils/dummyData';

const AppointmentDisplay = () => {
  return (
    <div>
      <Box className="w-full px-32 md:px-10 mx-auto max-w-[1200px] bg-[#f5f5f5]">
        <PatientAppointmentNavigation />
        <Box>
          <Box className="flex flex-row gap-5">
            <Typography>Date: 12.02.03</Typography>
            <Typography>ID: A058945 </Typography>
          </Box>
          <Box className="flex flex-col gap-2">
            <Typography
              variant="subtitle1"
              fontWeight="600"
              fontSize="18px"
              mt={2}
            >
              Complaints
            </Typography>
            <Box className="border border-[#71A9F7] rounded-[10px] p-4">
              Undoubtedly, eccentricity is theoretically possible. The motion,
              despite external influences, attracts a distant azimuth , the
              speed of a comet at perihelion, paradoxical though it may seem,
              oscillates an interplanetary meteorite .
            </Box>
          </Box>
          <Box className="flex flex-col gap-2">
            <Typography
              variant="subtitle1"
              fontWeight="600"
              fontSize="18px"
              mt={2}
            >
              Diagnosis
            </Typography>
            <Box className="border border-[#71A9F7] rounded-[10px] p-4">
              Subclinical hypothyroidism. Latent iron deficiency
            </Box>
          </Box>
          <Box className="flex flex-col gap-2">
            <Typography
              variant="subtitle1"
              fontWeight="600"
              fontSize="18px"
              mt={2}
            >
              Complaints
            </Typography>
            <Box className="border border-[#71A9F7] rounded-[10px] p-4">
              <TableContainer component={Paper} elevation={0}>
                <Table
                  sx={{ minWidth: 650, backgroundColor: '#F5F5F5' }}
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
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
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
          </Box>
          <Box className="flex flex-col gap-2">
            <Typography
              variant="subtitle1"
              fontWeight="600"
              fontSize="18px"
              mt={2}
            >
              Recommendations
            </Typography>
            <Box className="border border-[#71A9F7] rounded-[10px] p-4 flex items-center flex-nowrap gap-2">
              {recoms.map((value) => {
                return (
                  <Box className="bg-[#E7E7E7] px-2 py-1 rounded-sm">
                    {value}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AppointmentDisplay;

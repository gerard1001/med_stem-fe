import React, { useState, useEffect, useMemo } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { filterData } from './ExpectedAppointment';

const PreviousAppointment = () => {
  const patient = useSelector((state) => state.patient.single_data.data);
  const appoints = useSelector((state) => state.patient_appointment);
  const [query, setQuery] = useState('');

  const clientId = JSON.parse(localStorage.getItem('userLoginData'))?.user
    ?.client_id;

  const prevapps = appoints?.data?.data?.filter((values) => {
    return new Date(values?.work_day?.date) < new Date();
  });

  const filteredPrevAppointments = useMemo(
    () => filterData(query, prevapps),
    [query, prevapps]
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getOnePatient(clientId));
    dispatch(getPatientAppointments(clientId));
  }, [clientId]);

  const nav = useNavigate();
  return (
    <div>
      <Box className="w-full">
        <PatientAppointmentNavigation setQuery={setQuery} />
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ backgroundColor: '#F5F5F5' }}
        >
          <Table
            sx={{
              minWidth: 650,
              overflow: 'auto',
              marginBottom: '40px'
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
              {filteredPrevAppointments?.map((row) => (
                <TableRow
                  key={row.appointment_number}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                  id="row-height"
                >
                  <TableCell
                    className="cell-height"
                    component="th"
                    scope="row"
                    sx={{
                      color: '#2E3033',
                      fontSize: { md: '17px', xs: '14px' }
                    }}
                  >
                    {row.doctor.first_name} {row.doctor.last_name}
                  </TableCell>
                  <TableCell
                    className="cell-height"
                    align="center"
                    sx={{
                      color: '#2E3033',
                      fontSize: { md: '17px', xs: '14px' }
                    }}
                  >
                    {row.doctor.departments[0].speciality_name}
                  </TableCell>
                  <TableCell
                    className="cell-height"
                    align="center"
                    sx={{
                      color: '#2E3033',
                      fontSize: { md: '17px', xs: '14px' }
                    }}
                  >
                    {row.appointment_number}
                  </TableCell>
                  <TableCell
                    className="cell-height"
                    align="center"
                    sx={{
                      color: '#2E3033',
                      fontSize: { md: '17px', xs: '14px' }
                    }}
                  >
                    {new Date(row.work_day?.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="cell-height" align="center">
                    <Typography
                      style={{
                        width: '100%',
                        textAlign: 'center',
                        color: '#2E3033',
                        textTransform: 'capitalize',
                        cursor: 'pointer',
                        fontSize: { md: '17px', xs: '14px' }
                      }}
                      onClick={() => {
                        nav(`${row.appointment_id}`);
                      }}
                    >
                      Check
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

export default PreviousAppointment;

import React from 'react';
import PatientProfileNavigation from './PatientProfileNavigation';
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
import { useNavigate } from 'react-router-dom';
import { toAdminPatientPreviousAppointments } from '../../redux/reducers/step.reducer';
import { format } from 'date-fns';

const PreviousAppointments = () => {
  const patient = useSelector((state) => state.patient.single_data.data);
  const appoints = useSelector((state) => state.patient_appointment);

  const clientId = patient?.client_id;

  const doctorId = JSON.parse(localStorage.getItem('userLoginData'))?.user
    ?.doctor_id;

  const isDoctor =
    JSON.parse(localStorage.getItem('userLoginData'))?.user?.Role.role ===
    'doctor';

  const prevapps = appoints?.data?.data?.filter((values) => {
    if (isDoctor) {
      return (
        values.doctor_id === doctorId &&
        format(new Date(values?.work_day?.date), 'MM-dd-yyyy') <
          format(new Date(), 'MM-dd-yyyy')
      );
    } else {
      return (
        format(new Date(values?.work_day?.date), 'MM-dd-yyyy') <
        format(new Date(), 'MM-dd-yyyy')
      );
    }
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPatientAppointments(clientId));
  }, [clientId]);

  const nav = useNavigate();
  return (
    <div>
      <Box className="w-full p-20 sm:p-4">
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
              {prevapps?.map((row) => (
                <TableRow
                  key={row.appointment_number}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    fontSize: { md: '17px', xs: '14px' }
                  }}
                  id="row-height"
                >
                  <TableCell
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
                    align="center"
                    sx={{
                      color: '#2E3033',
                      fontSize: { md: '17px', xs: '14px' }
                    }}
                  >
                    {row.doctor.departments[0]?.speciality_name}
                  </TableCell>
                  <TableCell
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
                        color: '#2E3033',
                        textTransform: 'capitalize',
                        cursor: 'pointer',
                        fontSize: { md: '17px', xs: '14px' }
                      }}
                      onClick={() => {
                        dispatch(toAdminPatientPreviousAppointments());
                        nav(`/dashboard/appointments/${row.appointment_id}`);
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

export default PreviousAppointments;

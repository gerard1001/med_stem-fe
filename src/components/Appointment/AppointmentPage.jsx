import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  styled,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  Table,
  TableBody
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOneAppointment } from '../../redux/reducers/appointment.reducer';
import { dayCalendarSkeletonClasses } from '@mui/x-date-pickers';
import PatientAppointmentNavigation from '../PatientAppointmentSteps/PatientAppoinmentNavigation';
import HomeNavBar from '../HomeNavBar';
import { useNavigate } from 'react-router';
import {
  toPreviousAppointments,
  toExpectedAppointments
} from '../../redux/reducers/step.reducer';
import AppointmantPageNavigation from './AppointmantPageNavigation';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#E7E7E7',
  ...theme.typography.body2,
  padding: '2px 5px',
  boxShadow: 'none',
  borderRadius: 'none'
}));

const AppointmentPage = () => {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.step.appointment_step);
  const appointment = useSelector(
    (state) => state.appointment.entities.undefined
  );

  let urlId = window.location.href.substring(
    window.location.href.lastIndexOf('/') + 1
  );

  let appointmentId;

  urlId.includes('?')
    ? (appointmentId = urlId.slice(0, urlId.lastIndexOf('?')))
    : (appointmentId = urlId);

  useEffect(() => {
    dispatch(getOneAppointment(appointmentId));
  }, [appointmentId, urlId]);

  const date = new Date(appointment?.data?.work_day?.date);
  const drugs = !appointment?.data?.drugs[0]
    ? appointment?.data?.drugs
    : JSON.parse(appointment?.data?.drugs);
  const recommendations = !appointment?.data?.recommendations[0]
    ? appointment?.data?.recommendations
    : JSON.parse(appointment?.data?.recommendations);

  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear()
  ];

  const nav = useNavigate();
  return (
    <Box className="bg-[#F5F5F5] min-h-[100vh]">
      <Box className="p-10 max-w-[1200px] w-[85%] sm:w-[100%] sm:p-4 flex flex-col gap-4 items-start">
        <Box className="flex flex-center gap-3 font-semibold">
          <Typography variant="h6">Appointments</Typography>
          <Typography variant="h6">-</Typography>
          <Typography variant="h6">
            {appointment?.data?.client?.first_name}{' '}
            {appointment?.data?.client?.last_name}
          </Typography>
        </Box>
        <AppointmantPageNavigation appointment={appointment?.data} />
        <Box className="flex w-fit gap-5 items-start flex-row sm:flex-col sm:gap-2">
          <Typography variant="subtitle1" fontSize="17px">
            Date: {day}.{month}.{year}
          </Typography>
          <Typography variant="subtitle1" fontSize="17px">
            ID: {appointment?.data?.appointment_number}
          </Typography>
        </Box>

        <Box className="flex w-full gap-2 items-start flex-col">
          <Typography variant="subtitle1" fontWeight={600}>
            Complaints
          </Typography>
          <Box className="p-4 w-full border border-[#71A9F7] bg-white rounded-[8px] leading-3">
            <Typography variant="subtitle1" className="leading-5 text-[15px]">
              {appointment?.data?.complaints ? (
                appointment?.data?.complaints
              ) : (
                <Box className="text-center">No complaints were found</Box>
              )}
            </Typography>
          </Box>
        </Box>

        <Box className="flex w-full gap-2 items-start flex-col">
          <Typography variant="subtitle1" fontWeight={600}>
            Diagnosis
          </Typography>
          <Box className="p-4 w-full border border-[#71A9F7] bg-white rounded-[8px] leading-3">
            <Typography variant="subtitle1" className="leading-5 text-[15px]">
              {appointment?.data?.diagnosis ? (
                appointment?.data?.diagnosis
              ) : (
                <Box className="text-center">No diagnosis were found</Box>
              )}
            </Typography>
          </Box>
        </Box>

        <Box className="flex w-full gap-2 items-start flex-col">
          <Typography variant="subtitle1" fontWeight={600}>
            Drugs
          </Typography>
          <Box className="p-4 w-full border border-[#71A9F7] bg-white rounded-[8px] leading-3">
            {appointment?.data?.drugs !== [] ? (
              <TableContainer component={Paper} elevation={0}>
                <Table
                  sx={{
                    minWidth: 650,
                    backgroundColor: '#fff',
                    height: 'fit',
                    overflow: 'auto'
                  }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: '14px' }}>Name</TableCell>
                      <TableCell align="left" sx={{ fontSize: '14px' }}>
                        Dosage
                      </TableCell>
                      <TableCell align="left" sx={{ fontSize: '14px' }}>
                        Frequency
                      </TableCell>
                      <TableCell align="left" sx={{ fontSize: '14px' }}>
                        Duration
                      </TableCell>
                      <TableCell align="left" sx={{ fontSize: '14px' }}>
                        Date
                      </TableCell>
                      <TableCell align="left" sx={{ fontSize: '14px' }}>
                        Explanation
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {drugs?.map((row, idx) => (
                      <>
                        <TableRow
                          key={row.appointment_number}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 }
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="left" sx={{ fontSize: '14px' }}>
                            {row.dosage}
                          </TableCell>
                          <TableCell align="left" sx={{ fontSize: '14px' }}>
                            {row.frequency_per_day}
                          </TableCell>
                          <TableCell align="left" sx={{ fontSize: '14px' }}>
                            {row.duration}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              fontSize: '14px'
                            }}
                          >
                            {row.start_date}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              fontSize: '14px'
                            }}
                            className="truncate max-w-[100px]"
                          >
                            {row.explanation}
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box className="text-center">No drugs were found</Box>
            )}
          </Box>
        </Box>

        <Box className="flex w-full gap-2 items-start flex-col">
          <Typography variant="subtitle1" fontWeight={600}>
            Recommendations
          </Typography>
          <Box className="p-4 w-full border border-[#71A9F7] bg-white rounded-[8px] flex flex-row items-center flex-wrap flex-grow gap-2">
            {appointment?.data?.recommendations !== [] ? (
              <>
                {recommendations?.map((item) => {
                  return (
                    <Grid item xs={4} className="w-fit">
                      <Item>
                        <Typography
                          variant="subtitle1"
                          fontWeight="500"
                          fontSize="14px"
                        >
                          {item}
                        </Typography>
                      </Item>
                    </Grid>
                  );
                })}
              </>
            ) : (
              <Box className="text-center">No recommendations were found</Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppointmentPage;

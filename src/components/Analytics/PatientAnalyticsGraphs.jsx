import { Box, styled, Typography } from '@mui/material';
import clsx from 'clsx';
import React, { memo, useMemo } from 'react';
import { Chart } from 'react-google-charts';
import genderAnalyticsHelper from './helpers/genderAnalyticsHelper';
import ageAnalyticsHelper from './helpers/ageAnalyticsHelper';
import patientPerDayAnalyticsHelper from './helpers/patientPerDayAnalyticsHelper';
import patientVisitsAnalyticsHelpers from './helpers/patientVisitsAnalyticsHelpers';
import patientAppointmentAnalyticsHelpers from './helpers/patientAppointmentsAnalyticsHelpers';

const GraphBox = styled(({ name, children, className, ...props }) => (
  <Box
    className={clsx('w-full h-full', className)}
    sx={{
      borderRadius: '20px',
      paddingBottom: '40px',
      border: '1px solid #71A9F7'
    }}
    {...props}
  >
    <Typography className="text-dark text-sm m-4 leading-tight">
      {name}
    </Typography>
    {children}
  </Box>
))(() => ({}));

const PatientAnalyticsGraphs = memo(
  ({ isAdmin, patients, doctors, appointments, range }) => {
    // gender analytics data
    const genderPatientsData = useMemo(
      () => genderAnalyticsHelper(patients, 'patients'),
      [patients]
    );
    // age analytics data
    const agePatientsData = useMemo(
      () => ageAnalyticsHelper(patients, 'patients'),
      [patients]
    );
    const patientPerDayPatientsData = useMemo(
      () => patientPerDayAnalyticsHelper(patients, range, isAdmin),
      [patients, range]
    );
    // const visitCountPatientsData = useMemo(
    //   () =>
    //     patientAppointmentAnalyticsHelpers(
    //       patients,
    //       doctors,
    //       appointments,
    //       range,
    //       isAdmin
    //     ),
    //   [patients, doctors, range, appointments]
    // );

    return (
      <>
        <GraphBox name="Gender">
          <Chart
            chartType="PieChart"
            data={genderPatientsData}
            options={{
              backgroundColor: '',
              slices: [{ color: '#1D91C0' }, { color: '#225EA8' }],
              legend: 'none',
              chartArea: { width: '100%', height: '90%' }
            }}
          />
        </GraphBox>
        <GraphBox name="Age">
          <Chart
            chartType="ColumnChart"
            data={agePatientsData}
            options={{
              backgroundColor: '',
              hAxis: {
                gridlines: { color: 'transparent' }
              },
              vAxis: {
                gridlines: { color: 'transparent' }
              },
              legend: {
                position: 'none'
              },
              chartArea: {
                width: '80%',
                height: '80%'
              }
            }}
          />
        </GraphBox>
        <GraphBox name="Amount of patients per day">
          <Chart
            chartType="AreaChart"
            data={patientPerDayPatientsData}
            options={{
              backgroundColor: '',
              hAxis: {
                gridlines: { color: 'transparent' }
              },
              vAxis: {
                gridlines: { color: 'transparent' }
              },
              legend: {
                position: 'none'
              },
              chartArea: {
                width: '80%',
                height: '80%'
              }
            }}
          />
        </GraphBox>
        {/* <GraphBox name="Diagnosis per doctor">
          <Chart
            chartType="ColumnChart"
            data={visitCountPatientsData}
            options={{
              backgroundColor: '',
              hAxis: {
                gridlines: { color: 'transparent' }
              },
              vAxis: {
                gridlines: { color: 'transparent' }
              },
              legend: {
                position: 'none'
              },
              chartArea: {
                width: '80%',
                height: '80%'
              }
            }}
          />
        </GraphBox> */}
      </>
    );
  }
);

export default PatientAnalyticsGraphs;

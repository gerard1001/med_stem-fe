import { Box, styled, Typography } from '@mui/material';
import clsx from 'clsx';
import React, { memo, useMemo } from 'react';
import { Chart } from 'react-google-charts';
import genderAnalyticsHelper from './helpers/genderAnalyticsHelper';
import ageAnalyticsHelper from './helpers/ageAnalyticsHelper';
import visitedDoctorsAnalyticsHelper from './helpers/visitedDoctorsAnalyticsHelper';
import genderDepartmentAnalyticsHelpers from './helpers/genderDepartmentAnalyticsHelpers';
import doctorsInDepAnalyticsHelper from './helpers/doctorsInDepAnalyticsHelper';

const GraphBox = styled(
  ({ name, classes = {}, children, className, ...props }) => (
    <Box
      className={clsx('w-full h-full', className)}
      sx={{
        borderRadius: '20px',
        border: '1px solid #71A9F7'
      }}
      {...props}
    >
      <Typography className="text-dark text-sm m-4 leading-tight">
        {name}
      </Typography>
      <Box className={classes.graphBox}>{children}</Box>
    </Box>
  )
)(() => ({}));

const DoctorAnalyticsGraphs = memo(({ doctors, departments, range }) => {
  // gender analytics data
  const genderDoctorsData = useMemo(
    () => genderAnalyticsHelper(doctors, 'doctors'),
    [doctors]
  );
  // age analytics data
  const ageDoctorsData = useMemo(
    () => ageAnalyticsHelper(doctors, 'doctors'),
    [doctors]
  );
  const mostVisitedDoctorsData = useMemo(
    () => visitedDoctorsAnalyticsHelper(doctors, range),
    [doctors, range]
  );
  const genderDepartmentDoctorsData = useMemo(
    () => genderDepartmentAnalyticsHelpers(doctors),
    [doctors]
  );
  const doctorsInDepartmentData = useMemo(
    () => doctorsInDepAnalyticsHelper(doctors, departments),
    [doctors, departments]
  );

  return (
    <>
      <GraphBox name="Gender">
        <Chart
          chartType="PieChart"
          data={genderDoctorsData}
          // height="200px"
          // width="250px"
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
          data={ageDoctorsData}
          // height="200px"
          // width="250px"
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
      <GraphBox name="Top 5 most visited doctors">
        <Chart
          chartType="BarChart"
          data={mostVisitedDoctorsData}
          // height="200px"
          // width="250px"
          options={{
            backgroundColor: '',
            hAxis: {
              gridlines: { color: '#E0E6F1' }
            },
            vAxis: {
              gridlines: { color: '#E0E6F1' }
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
      <GraphBox
        name="Amount of female and male doctors per department"
        classes={{
          graphBox: 'pb-1'
        }}
      >
        <Chart
          chartType="ColumnChart"
          data={genderDepartmentDoctorsData}
          options={{
            backgroundColor: '',
            hAxis: {
              gridlines: { color: 'transparent' }
            },
            vAxis: {
              gridlines: { color: 'transparent' }
            },
            legend: {
              position: 'bottom'
            },
            colors: ['#6A8DE9', '#16F0E7'],
            chartArea: {
              width: '80%',
              height: '65%'
            }
          }}
        />
      </GraphBox>
      <GraphBox name="Amount of doctors per department">
        <Chart
          chartType="ColumnChart"
          data={doctorsInDepartmentData}
          options={{
            backgroundColor: '',
            hAxis: {
              gridlines: { color: 'transparent' }
            },
            vAxis: {
              gridlines: { color: 'transparent' }
            },
            legend: {
              position: 'bottom'
            },
            chartArea: {
              width: '80%',
              height: '80%'
            }
          }}
        />
      </GraphBox>
    </>
  );
});

export default DoctorAnalyticsGraphs;

import {
  Box,
  Button,
  capitalize,
  Hidden,
  Menu,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { DateField, DatePicker } from '@mui/x-date-pickers';
import clsx from 'clsx';
import {
  addYears,
  format,
  isBefore,
  subMonths,
  subWeeks,
  subYears
} from 'date-fns';
import _ from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import SelectDateRangeMenu from '../components/Analytics/SelectDateRangeMenu';
import LoadingButton from '../components/LoadingButton';
import { Chart } from 'react-google-charts';
import genderAnalyticsHelper from '../components/Analytics/helpers/genderAnalyticsHelper';
import ageAnalyticsHelper from '../components/Analytics/helpers/ageAnalyticsHelper';

const formatDoctorName = (doctor) => {
  if (doctor) {
    const { last_name } = doctor;
    return `Dr. ${capitalize(last_name)}`;
  }
};

const StyledSelect = styled((props) => (
  <Select
    MenuProps={{
      PaperProps: {
        elevation: 0,
        sx: {
          borderRadius: '10px',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          backgroundColor: '#E7E7E7'
        }
      }
    }}
    size="small"
    {...props}
  />
))(() => ({
  overflow: 'hidden',
  '&.Mui-focused:has( .MuiSelect-iconOpen)': {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  '& .MuiInputBase-input': {
    backgroundColor: '#E7E7E7'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '& .MuiSelect-select': {
    borderRadius: 0
  }
}));
const GraphBox = styled(({ name, children, className, ...props }) => (
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
    {children}
  </Box>
))(() => ({}));

function Analytics() {
  const [selectedToggler, setSelectedToggler] = useState(true);
  const selectedDoctorRef = useRef(null);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const selectedPeriodRef = useRef();
  const [selectedPeriod, setSelectedPeriod] = useState('This week');
  const selectPeriodRef = useRef();
  const [selectPeriodOpen, setSelectPeriodOpen] = useState(false);
  const patients = useSelector((state) => state.patient?.data?.data);
  const doctors = useSelector((state) => state.doctor?.data?.data);

  console.log(
    patients,
    doctors,
    selectedDoctorRef.current,
    selectedPeriodRef.current,
    'patients, doctors,'
  );

  const toggleToggler = () => {
    setSelectedToggler((value) => !value);
  };

  const newPatients = useMemo(
    () =>
      selectedToggler &&
      patients?.filter((patient) =>
        isBefore(new Date(patient?.createdAt), subWeeks(new Date(), 2))
      ),
    [patients, selectedToggler]
  );
  const newDoctors = useMemo(
    () =>
      !selectedToggler &&
      doctors?.filter((doctor) =>
        isBefore(new Date(doctor?.createdAt), subWeeks(new Date(), 2))
      ),
    [patients, selectedToggler]
  );

  // gender analytics data
  const genderPatientsData = useMemo(
    () => genderAnalyticsHelper(patients),
    [patients]
  );
  const genderDoctorsData = useMemo(
    () => genderAnalyticsHelper(doctors),
    [doctors]
  );
  // age analytics data
  const agePatientsData = useMemo(
    () => ageAnalyticsHelper(patients),
    [patients]
  );
  const ageDoctorsData = useMemo(() => ageAnalyticsHelper(doctors), [doctors]);

  useEffect(() => {
    if (doctors) {
      setSelectedDoctor(doctors[0].last_name);
    }
  }, [doctors]);
  useEffect(() => {
    selectedDoctorRef.current = _.find(doctors, { last_name: selectedDoctor });
  }, [selectedDoctor, doctors]);
  useEffect(() => {
    switch (selectedPeriod) {
      case 'This week':
        selectedPeriodRef.current = [new Date(), subWeeks(new Date(), 1)];
        break;
      case 'Last month':
        selectedPeriodRef.current = [new Date(), subMonths(new Date(), 1)];
        break;
      case 'Last 3 month':
        selectedPeriodRef.current = [new Date(), subMonths(new Date(), 3)];
        break;
      case 'Last year':
        selectedPeriodRef.current = [new Date(), subYears(new Date(), 1)];
        break;
      default:
        if (Array.isArray(selectedPeriod)) {
          selectedPeriodRef.current = selectedPeriod;
        }
    }
  }, [selectedPeriod]);

  return (
    <>
      <Box className="w-full h-full p-10 sm:p-3">
        <Typography variant="h6" sx={{ mb: '20px' }} noWrap>
          Analytics
        </Typography>

        {/* Analytics selectors */}
        <Stack direction="row" className="gap-3 flex-wrap w-full">
          <Box
            component={Button}
            role="button"
            onClick={toggleToggler}
            className="text-dark bg-[#E7E7E7] rounded-xl"
          >
            <Typography>Patients</Typography>
            <Box
              sx={{
                backgroundColor: selectedToggler ? '#000' : 'transparent'
              }}
              className="ml-2 w-[16px] h-[16px] rounded-full border-dark border"
            />
          </Box>
          <StyledSelect
            className="max-w-[200px] w-full"
            value={selectedDoctor || ''}
            onChange={(e) => {
              setSelectedDoctor(e.target.value);
            }}
          >
            {!doctors || doctors.length < 0 ? (
              <MenuItem value="">No Doctors</MenuItem>
            ) : (
              doctors.map((doctor) => (
                <MenuItem key={doctor.doctor_id} value={doctor.last_name}>
                  {formatDoctorName(doctor)}
                </MenuItem>
              ))
            )}
          </StyledSelect>
          <StyledSelect
            className="max-w-[200px] w-full"
            value={selectedPeriod}
            onChange={(e) => {
              setSelectedPeriod(e.target.value);
            }}
          >
            <MenuItem value="This week">This week</MenuItem>
            <MenuItem value="Last month">Last month</MenuItem>
            <MenuItem value="Last 3 month">Last 3 month</MenuItem>
            <MenuItem value="Last year">Last year</MenuItem>
            <MenuItem
              ref={selectPeriodRef}
              value=""
              onClickCapture={(e) => {
                e.stopPropagation();
                setSelectPeriodOpen(true);
                console.log(selectPeriodRef);
              }}
            >
              Select period
            </MenuItem>
          </StyledSelect>
        </Stack>

        {/* Analytics sample data cards */}
        <Stack direction="row" className="w-full gap-3 mt-3" flexWrap="wrap">
          <Stack
            direction="column"
            className="p-4 gap-1 bg-[#EDF0F2] w-full max-w-[175px] h-[119px] rounded-xl"
          >
            <Typography className="text-[18px]">
              New {selectedToggler ? 'Patients' : 'Doctors'}
            </Typography>
            <Typography className="text.dark text-[40px] font-semibold leading-none">
              {selectedToggler
                ? newPatients?.length || 0
                : newDoctors?.length || 0}
            </Typography>
          </Stack>
          <Stack
            direction="column"
            className="p-4 gap-1 bg-[#EDF0F2] w-full max-w-[175px] h-[119px] rounded-xl"
          >
            <Typography className="text-[18px]">
              Total {selectedToggler ? 'Patients' : 'Doctors'}
            </Typography>
            <Typography className="text.dark text-[40px] font-semibold leading-none">
              {selectedToggler ? patients?.length || 0 : doctors?.length || 0}
            </Typography>
          </Stack>
        </Stack>

        {/* Analytics Graphs */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'auto', sm: '1fr 1fr' },
            gap: 3,
            maxWidth: '1900px',
            width: '100%',
            marginX: 'auto',
            height: 'max-content',
            mt: 2
          }}
        >
          <GraphBox name="Gender">
            <Chart
              chartType="PieChart"
              data={genderPatientsData}
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
              data={agePatientsData}
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
                },
                colors: [
                  '#86B0CC',
                  '#0C2C84',
                  '#225EA8',
                  '#41B6C4',
                  '#1D91C0',
                  '#A3CBE5',
                  '#A3CBE5'
                ]
              }}
            />
          </GraphBox>
          <GraphBox name="Top 5 most visited doctors" />
          <GraphBox name="Amount of female and male doctors per department" />
          <GraphBox name="Amount of doctors per department" />
        </Box>
      </Box>
      <SelectDateRangeMenu
        {...{
          selectPeriodOpen,
          selectPeriodRef,
          setSelectPeriodOpen,
          setSelectedPeriod
        }}
      />
    </>
  );
}

export default Analytics;

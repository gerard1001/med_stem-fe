import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  FormHelperText,
  MenuItem,
  ListItemText,
  Checkbox
} from '@mui/material';
import { styled } from '@mui/material/styles';
import BackButton from '../components/BackButton';
import Calendar from '../components/Calendar';
import CalendarMonthYearSelector from '../components/CalendarMonthYearSelector';
import { useSelector, useDispatch } from 'react-redux';
import { getDoctorList } from '../redux/reducers/doctor.reducer';
import { filterData } from './FindDoctor';
import SmallSearchBar from '../components/SmallSearchBar';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { days } from '../utils/dummyData';
import { createSchedule } from '../redux/reducers/schedule.reducer';
import DashboardSidebar from '../components/DashboardSideBar';
import { BsPlusCircle } from 'react-icons/bs';

const schema = yup.object().shape({
  doctor_id: yup.string(),
  start_date: yup.string(),
  end_date: yup.string(),
  days: yup.string(),
  from: yup.string(),
  to: yup.string(),
  appointment_duration: yup.number()
});

function AdminCalendar() {
  const doctors = useSelector((state) => state.doctor);
  const calendarRef = useRef(null);
  const [anchor, setAnchor] = useState(null);
  const [viewDate, setViewDate] = useState(new Date());
  const viewDateRef = useRef(viewDate);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [dayName, setDayName] = React.useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    calendarRef.current.calendar.gotoDate(new Date(viewDate));
  }, [viewDate]);

  const filteredData = doctors?.data?.data?.map((obj) => ({
    ...obj,
    label: `${obj.first_name} ${obj.last_name}`
  }));

  console.log({ searchQuery });

  const dispatch = useDispatch();

  const handleChangeSelectInput = (event) => {
    const {
      target: { value }
    } = event;
    setDayName(typeof value === 'string' ? value.split(',') : value);
  };

  // const days=day

  console.log({ dayName });

  React.useEffect(() => {
    dispatch(getDoctorList());
  }, []);

  const onSubmit = ({
    start_date,
    end_date,
    days,
    from,
    to,
    appointment_duration
  }) => {
    dispatch(
      createSchedule({
        doctor_id: searchQuery?.doctor_id,
        start_date,
        end_date,
        days: dayName?.join(', '),
        from,
        to,
        appointment_duration
      })
    );
  };

  const resetData = () => {
    reset();
  };

  return (
    <Box className="flex flex-row items-start pl-[220px] pr-[300px] ">
      <DashboardSidebar />
      <Box className="sm:p-4 pt-16 px-8 flex flex-col w-[100%] sm:gap-0 gap-3">
        <Stack
          direction="row"
          gap={{ xs: 1, sm: 3 }}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          mb={{ xs: 2, sm: 0 }}
        >
          <Stack
            direction="row"
            className="gap-3 items-center sm:w-full overflow-visible p-4"
          >
            <Typography
              fontSize={{ xs: 16, sm: 20 }}
              className="leading-none"
              noWrap
            >
              Add work schedule
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="end" className="sm:w-full">
            <CalendarMonthYearSelector
              viewDate={viewDate}
              setViewDate={setViewDate}
            />
          </Stack>{' '}
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          className="gap-3 items-center sm:w-full overflow-visible p-4"
        >
          <Stack
            direction="row"
            className="gap-3 items-center overflow-visible"
            maxHeight={60}
          >
            <Typography
              fontSize={{ xs: 16, sm: 20 }}
              className="leading-none"
              noWrap
            >
              Select doctor
            </Typography>

            <SmallSearchBar
              filteredData={filteredData}
              setSearchQuery={setSearchQuery}
            />
          </Stack>
          <Stack direction="row" className="flex items-center gap-1">
            <BsPlusCircle className="text-[20px]" /> Work Schedule
          </Stack>
        </Stack>

        <Box className="sm:px-0 px-5">
          <Calendar
            ref={calendarRef}
            dayCellContent={(props) => (
              // console.log(props, 'props');
              <Box
                className="text-green flex flex-col"
                sx={{
                  width: '100%',
                  height: '100%'
                }}
              >
                <Box className="grow px-[10px]">
                  <Typography>{props.date.getDate()}</Typography>
                </Box>
                {/* If active step we add the plus sign */}
              </Box>
            )}
          />
        </Box>
      </Box>
      <Box className="w-[300px] p-2 z-50 bg-white fixed right-0 top-16 bottom-0 h-[calc(100vh-64px)] border-l border-t border-sky-400">
        <form onSubmit={handleSubmit(onSubmit)} className="w-[100%] p-2 z-50">
          <Grid container rowSpacing={1} columnSpacing={1}>
            <Grid xs={12} pt={3} pl={1}>
              <Typography variant="body1" fontWeight="600">
                Select time period
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="start_date"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    variant="outlined"
                    sx={{ width: '100%', margin: 0, maxWidth: '400px' }}
                    margin="normal"
                    size="small"
                    error={!!errors.start_date}
                    helperText={errors.start_date && errors.start_date.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="end_date"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    min={new Date()}
                    variant="outlined"
                    sx={{ width: '100%', margin: 0, maxWidth: '400px' }}
                    margin="normal"
                    size="small"
                    error={!!errors.end_date}
                    helperText={errors.end_date && errors.end_date.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid xs={12} pt={1} pl={1}>
              <Typography variant="body1" fontWeight="600">
                Work days
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="dayName"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <FormControl size="small" sx={{ width: '140px' }}>
                    <InputLabel id="demo-multiple-checkbox-label">
                      Work Days
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      size="small"
                      sx={{ width: '100%', maxWidth: '350px' }}
                      multiple
                      onChange={(event) => {
                        handleChangeSelectInput(event);
                        field.onChange(event.target.value);
                      }}
                      input={<OutlinedInput label="Work Days" />}
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {days.map((name, idx) => (
                        <MenuItem key={idx} value={name}>
                          <Checkbox checked={dayName.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid xs={12} pt={1} pl={1}>
              <Typography variant="body1" fontWeight="600">
                Work hours
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="from"
                defaultValue="09:00"
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="time"
                    variant="outlined"
                    sx={{ width: '100%', margin: 0, maxWidth: '400px' }}
                    margin="normal"
                    size="small"
                    error={!!errors.end_date}
                    helperText={errors.end_date && errors.end_date.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="to"
                defaultValue="18:00"
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="time"
                    variant="outlined"
                    sx={{ width: '100%', margin: 0, maxWidth: '400px' }}
                    margin="normal"
                    size="small"
                    error={!!errors.end_date}
                    helperText={errors.end_date && errors.end_date.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid xs={12} pt={1} pl={1}>
              <Typography variant="body1" fontWeight="600">
                Duration of Appointment
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Controller
                control={control}
                name="appointment_duration"
                defaultValue=""
                render={({ field }) => (
                  <FormControl
                    variant="outlined"
                    margin="normal"
                    sx={{ margin: 0, maxWidth: '400px' }}
                    className="w-[100%] min-w-[220px]"
                    size="small"
                  >
                    <InputLabel required>Select time</InputLabel>
                    <Select
                      {...field}
                      label="Duration of Appointment"
                      labelId="demo-simple-select-label"
                      error={!!errors.appointment_duration}
                      size="small"
                    >
                      <MenuItem value={15}>15 min</MenuItem>
                      <MenuItem value={30}>30 min</MenuItem>
                      <MenuItem value={60}>1 h</MenuItem>
                    </Select>
                    <FormHelperText error={true}>
                      {errors.appointment_duration &&
                        errors.appointment_duration?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <Stack
            direction="row"
            className="absolute bottom-[10vh] right-2 left-2 w-[90%] flex items-center justify-evenly"
          >
            <Button
              onClick={resetData}
              sx={{
                color: '#fff',
                width: { md: '100px', xs: '80px' },
                color: '#1A4CFF',
                border: '1px solid #1A4CFF',
                borderRadius: '20px',
                marginX: 'auto',
                ':hover': { backgroundColor: '#a2ccff', border: 'none' }
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              sx={{
                color: '#fff',
                width: { md: '100px', xs: '80px' },
                borderRadius: '20px'
              }}
              className={`bg-[#1A4CFF] capitalize text-white`}
            >
              Add
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default AdminCalendar;

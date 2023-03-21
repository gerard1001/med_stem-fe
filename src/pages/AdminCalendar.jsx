import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
  Drawer,
  useMediaQuery,
  IconButton
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsPlusCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Calendar from '../components/Calendar';
import CalendarMonthYearSelector from '../components/Calendar/CalendarMonthYearSelector';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';
import SmallSearchBar from '../components/SmallSearchBar';
import { getDoctorList } from '../redux/reducers/doctor.reducer';
import { createSchedule } from '../redux/reducers/schedule.reducer';
import { days } from '../utils/dummyData';
import { FiChevronLeft } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';

const schema = yup.object().shape({
  doctor_id: yup.string(),
  start_date: yup.string(),
  end_date: yup.string(),
  days: yup.string(),
  from: yup.string(),
  to: yup.string(),
  appointment_duration: yup.number()
});

const RightSideBar = () => {
  const [dayName, setDayName] = React.useState([]);
  const searchQuery = useSelector((state) => state.user?.searchQueryRedux);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleChangeSelectInput = (event) => {
    const {
      target: { value }
    } = event;
    setDayName(typeof value === 'string' ? value.split(',') : value);
  };

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
    console.log({ start_date, end_date, days, from, to, appointment_duration });
    reset();
  };

  const resetData = () => {
    reset();
  };
  return (
    <Box className="w-[250px] z-50 bg-white fixed right-0 top-16 bottom-0 h-[calc(100vh-64px)] border-l border-t border-sky-400">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[100%] h-full min-h-[90vh] p-2 z-50 flex flex-col justify-between gap-5"
      >
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid xs={12} pt={3} pl={1}>
            <Typography variant="body1" fontWeight="500" mt="10px">
              Select time period
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="start_date"
              defaultValue=""
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="From"
                  margin="normal"
                  size="small"
                  error={!!errors.start_date}
                  helperText={errors.start_date && errors.start_date.message}
                  required
                  sx={{
                    width: '110px',
                    '& .MuiInputBase-input': {
                      padding: '5px 10px',
                      backgroundColor: '#E7E7E7',
                      borderRadius: '5px 0 0 5px'
                    },
                    '& .MuiFormLabel-root': {
                      top: '-10px'
                    },
                    '& .MuiInputBase-root': {
                      paddingY: 0,
                      borderRadius: '5px'
                    }
                  }}
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
                <DatePicker
                  {...field}
                  type="date"
                  label="To"
                  min={new Date()}
                  variant="filled"
                  margin="normal"
                  size="small"
                  error={!!errors.end_date}
                  helperText={errors.end_date && errors.end_date.message}
                  required
                  className=""
                  sx={{
                    width: '110px',
                    '& .MuiInputBase-input': {
                      padding: '5px 10px',
                      backgroundColor: '#E7E7E7',
                      borderRadius: '5px 0 0 5px'
                    },
                    '& .MuiFormLabel-root': {
                      top: '-10px'
                    },
                    '& .MuiInputBase-root': {
                      paddingY: 0,
                      borderRadius: '5px'
                    }
                  }}
                />
              )}
            />
          </Grid>
          <Grid xs={12} pt={1} pl={1}>
            <Typography variant="body1" fontWeight="500" mt="10px">
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
                    required
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    size="small"
                    multiple
                    onChange={(event) => {
                      handleChangeSelectInput(event);
                      field.onChange(event.target.value);
                    }}
                    className="rounded-[5px]"
                    sx={{
                      width: '120px',
                      '& .MuiInputBase-input': {
                        padding: '5px 10px',
                        backgroundColor: '#E7E7E7',
                        borderRadius: '5px'
                      },
                      '& .MuiFormLabel-root': {
                        top: '-4px'
                      },
                      '& .MuiInputBase-root': {
                        borderRadius: '5px'
                      }
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
            <Typography variant="body1" fontWeight="500" mt="10px">
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
                  sx={{
                    width: '100px',
                    '& .MuiInputBase-input': {
                      padding: '5px 10px',
                      backgroundColor: '#E7E7E7',
                      borderRadius: '5px'
                    },
                    '& .MuiFormLabel-root': {
                      top: '-4px'
                    },
                    '& .MuiInputBase-root': {
                      paddingY: 0,
                      borderRadius: '5px'
                    }
                  }}
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
                  sx={{
                    width: '100px',
                    '& .MuiInputBase-input': {
                      padding: '5px 10px',

                      backgroundColor: '#E7E7E7',
                      borderRadius: '5px'
                    },
                    '& .MuiFormLabel-root': {
                      top: '-4px'
                    },
                    '& .MuiInputBase-root': {
                      paddingY: 0,
                      borderRadius: '5px'
                    }
                  }}
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
            <Typography variant="body1" fontWeight="500" mt="10px">
              Duration of Appointment
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="appointment_duration"
              defaultValue=""
              render={({ field }) => (
                <FormControl
                  variant="outlined"
                  margin="normal"
                  sx={{ margin: 0, maxWidth: '400px' }}
                  className="w-[100%]"
                  size="small"
                >
                  <InputLabel required>Select time</InputLabel>
                  <Select
                    {...field}
                    label="Duration of Appointment"
                    labelId="demo-simple-select-label"
                    error={!!errors.appointment_duration}
                    size="small"
                    className="rounded-[5px]"
                    sx={{
                      width: '120px',
                      '& .MuiInputBase-input': {
                        padding: '5px 10px',
                        backgroundColor: '#E7E7E7',
                        borderRadius: '5px'
                      },
                      '& .MuiFormLabel-root': {
                        top: '-4px'
                      },
                      '& .MuiInputLabel-root': {
                        top: '-4px'
                      },
                      '& .MuiInputBase-root': {
                        borderRadius: '5px'
                      }
                    }}
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
          className="w-[90%] flex items-center justify-evenly"
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
  );
};

function AdminCalendar() {
  const doctors = useSelector((state) => state.doctor);
  const calendarRef = useRef(null);
  const [anchor, setAnchor] = useState(null);
  const [viewDate, setViewDate] = useState(new Date());
  const viewDateRef = useRef(viewDate);
  const [searchQuery, setSearchQuery] = React.useState('');
  // const [searchQueryRedux, setSearchQueryRedux] = React.useState('');
  const [openRightSideBar, setOpenRightSideBar] = useState(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    calendarRef.current.calendar.gotoDate(new Date(viewDate));
  }, [viewDate]);

  const filteredData = doctors?.data?.data?.map((obj) => ({
    ...obj,
    label: `${obj.first_name} ${obj.last_name}`
  }));

  const dispatch = useDispatch();

  const toggleRightSideBar = () => {
    setOpenRightSideBar((open) => !open);
  };

  React.useEffect(() => {
    dispatch(getDoctorList());
  }, []);

  return (
    <Box
      className="flex flex-row items-start"
      sx={{ marginRight: { md: '250px', xs: '0' } }}
    >
      <Box className="sm:p-4 pt-16 px-8 flex flex-col w-[100%] sm:gap-0">
        <IconButton
          onClick={toggleRightSideBar}
          sx={{
            position: 'absolute',
            backgroundColor: '#9b9b9b2d',
            color: '#000',
            top: '60px',
            right: '16px',
            display: { md: 'none', xs: 'block' }
          }}
        >
          <FiChevronLeft />
        </IconButton>
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
            className="items-center sm:w-full overflow-visible px-4"
          >
            <Typography
              fontSize={{ xs: 16, sm: 20 }}
              fontWeight="500"
              mt="10px"
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
          className="flex flex-row sm:flex-col sm:items-start items-center sm:w-full overflow-visible p-4 xs:p-0"
        >
          <Stack
            direction="row"
            className="gap-3 w-1/2 sm:w-full items-center overflow-visible"
            maxHeight={60}
          >
            <Typography
              fontSize={{ xs: 16 }}
              className="leading-none xs:hidden"
              noWrap
            >
              Select doctor
            </Typography>

            <SmallSearchBar
              filteredData={filteredData}
              setSearchQuery={setSearchQuery}
            />
          </Stack>
          <Stack
            direction="row"
            className="flex items-center justify-center gap-1 w-1/2 sm:w-full"
          >
            <BsPlusCircle className="text-[20px] xs:my-5" /> Work Schedule
          </Stack>
        </Stack>

        <Box className="sm:px-0 px-5">
          <Calendar
            ref={calendarRef}
            dayCellContent={(props) => (
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
      <Drawer
        open={openRightSideBar}
        anchor="right"
        variant={isMobile ? 'temporary' : 'permanent'}
        onClose={() => {
          setOpenRightSideBar(false);
        }}
        sx={{
          '& .MuiDrawer-paper': {
            maxWidth: '250px',
            width: '100%'
          }
        }}
        classes={{
          paper: isMobile ? 'absolute' : 'relative'
        }}
        ModalProps={{
          keepMounted: false
        }}
        className="transition duration-150 ease-in-out"
      >
        <Box
          className="min-h-[64px] items-center justify-center"
          sx={{ display: { md: 'none', xs: 'flex' } }}
        >
          <IconButton
            onClick={toggleRightSideBar}
            sx={{
              padding: 1
            }}
          >
            <GrClose />
          </IconButton>
        </Box>
        <RightSideBar />
      </Drawer>
    </Box>
  );
}

export default AdminCalendar;

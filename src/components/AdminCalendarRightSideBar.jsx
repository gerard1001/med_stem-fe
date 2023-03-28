import React, { useEffect, useState } from 'react';
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
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format, getMonth, getYear } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { getOneDoctor } from '../redux/reducers/doctor.reducer';
import { createSchedule } from '../redux/reducers/schedule.reducer';
import {
  getDoctorWorkDays,
  selectWorkDaysDoctors
} from '../redux/reducers/workDays.reducer';
import { days } from '../utils/dummyData';

const schema = yup.object().shape({
  start_date: yup.date().typeError('Invalid date').required(),
  end_date: yup.date().typeError('Invalid date').required(),
  from: yup.string().required(),
  to: yup.string().required(),
  appointment_duration: yup.number().required(),
  dayName: yup.array().min(1, 'On minimun day to select').required()
});

const AdminCalendarRightSideBar = () => {
  const dispatch = useDispatch();
  const [dayName, setDayName] = React.useState([]);
  const searchQuery = useSelector((state) => state.user?.searchQueryRedux);

  const doctor = useSelector((state) => state.doctor);

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
    console.log({
      doctor_id: searchQuery,
      start_date: format(new Date(start_date), 'MM-dd-yyyy'),
      end_date: format(new Date(end_date), 'MM-dd-yyyy'),
      days: dayName?.join(', '),
      from,
      to,
      appointment_duration
    });
    dispatch(
      createSchedule({
        doctor_id: searchQuery,
        start_date: format(new Date(start_date), 'MM-dd-yyyy'),
        end_date: format(new Date(end_date), 'MM-dd-yyyy'),
        days: dayName?.join(', '),
        from,
        to,
        appointment_duration
      })
    ).then(() => {
      dispatch(getOneDoctor(searchQuery));
    });

    reset();
  };

  useEffect(() => {
    dispatch(
      getDoctorWorkDays({
        id: searchQuery
        // month: getMonth(viewDate),
        // year: getYear(viewDate)
      })
    );
  }, [searchQuery]);

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
          <Grid xs={12} pt={3} pl={1} item>
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
                  minDate={new Date()}
                  slotProps={{
                    textField: {
                      error: !!errors.start_date,
                      helperText: errors.start_date && errors.start_date.message
                    }
                  }}
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
                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                      top: '0px'
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
                  minDate={new Date()}
                  slotProps={{
                    textField: {
                      error: !!errors.end_date,
                      helperText: errors.end_date && errors.end_date.message
                    }
                  }}
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
                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                      top: '0px'
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
          <Grid xs={12} pt={1} pl={1} item>
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
                <FormControl
                  size="small"
                  sx={{ width: '140px' }}
                  error={!!errors.dayName}
                  helperText={errors.dayName && errors.dayName.message}
                >
                  <InputLabel
                    sx={{
                      fontSize: '1rem',
                      top: '-4px',
                      '&.MuiInputLabel-shrink': { top: 0 }
                    }}
                    id="demo-multiple-checkbox-label"
                  >
                    Work Days
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    size="small"
                    multiple
                    onChange={(event) => {
                      handleChangeSelectInput(event);
                      field.onChange(event.target.value);
                    }}
                    error={!!errors.dayName}
                    helperText={errors.dayName && errors.dayName.message}
                    className="rounded-[5px]"
                    sx={{
                      width: '120px',
                      fontSize: '1rem',
                      '& .MuiInputBase-input': {
                        padding: '5px 10px',
                        backgroundColor: '#E7E7E7',
                        borderRadius: '5px'
                      },
                      '& .MuiInputBase-root': {
                        borderRadius: '5px'
                      }
                    }}
                    input={
                      <OutlinedInput
                        size="small"
                        label="Work Days"
                        sx={{
                          '& .MuiFormLabel-root': {
                            top: '-4px'
                          },
                          '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                            top: '0px'
                          }
                        }}
                      />
                    }
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
          <Grid xs={12} pt={1} pl={1} item>
            <Typography variant="body1" fontWeight="500">
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
                    margin: 0,
                    '& .MuiInputBase-input': {
                      margin: 0,
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
                  error={!!errors.from}
                  helperText={errors.from && errors.from.message}
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
                    margin: 0,
                    '& .MuiInputBase-input': {
                      margin: 0,
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
                  error={!!errors.to}
                  helperText={errors.to && errors.to.message}
                />
              )}
            />
          </Grid>
          <Grid xs={12} pl={1} item>
            <Typography variant="body1" fontWeight="500">
              Duration of Appointment
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="appointment_duration"
              defaultValue=""
              render={({ field }) => (
                <FormControl
                  variant="outlined"
                  margin="normal"
                  sx={{ margin: 0 }}
                  className="w-[100%]"
                  size="small"
                >
                  <InputLabel
                    sx={{
                      fontSize: '1rem',
                      top: '-4px',
                      '&.MuiInputLabel-shrink': { top: 0 }
                    }}
                  >
                    Select time
                  </InputLabel>
                  <Select
                    {...field}
                    label="Select time"
                    labelId="demo-simple-select-label"
                    error={!!errors.appointment_duration}
                    size="small"
                    className="rounded-[5px]"
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        padding: '5px 10px',
                        backgroundColor: '#E7E7E7',
                        borderRadius: '5px'
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
                  <FormHelperText error>
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
            className="bg-[#1A4CFF] capitalize text-white"
          >
            Add
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AdminCalendarRightSideBar;

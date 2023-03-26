import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toPreviousAppointments,
  toExpectedAppointments
} from '../../redux/reducers/step.reducer';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { IoCloseSharp, IoSearch } from 'react-icons/io5';
import { getOnePatient } from '../../redux/reducers/patient.reducer';
import InputAdornment from '@mui/material/InputAdornment';

const PatientAppointmentNavigation = ({ setQuery }) => {
  const step = useSelector((state) => state.step.appointment_step);
  const patient = useSelector((state) => state.patient.single_data.data);
  const [searchValue, setSearchValue] = React.useState('');

  useEffect(() => {
    setQuery(searchValue);
  }, [searchValue]);

  const isClient =
    JSON.parse(localStorage.getItem('userLoginData'))?.user?.Role.role ===
    'client';
  const clientId = JSON.parse(localStorage.getItem('userLoginData'))?.user
    ?.client_id;

  const [hideSearch, setHideSearch] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getOnePatient(clientId));
  }, []);

  return (
    <div>
      <Box className="flex flex-center gap-3 font-semibold">
        <Typography variant="h6">Appointments</Typography>
        <Typography variant="h6">-</Typography>
        <Typography variant="h6">
          {patient?.first_name} {patient?.last_name}
        </Typography>
      </Box>
      <Box className="flex items-center gap-10 mt-8 mb-5">
        <Typography
          variant="subtitle1"
          fontWeight="600"
          fontSize="17px"
          className={`${
            step === 0 && 'text-primary underline'
          }  cursor-pointer`}
          onClick={() => {
            dispatch(toExpectedAppointments());
          }}
        >
          Expected Appointments
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight="600"
          fontSize="17px"
          className={`${
            step === 1 && 'text-primary underline'
          }  cursor-pointer`}
          onClick={() => {
            dispatch(toPreviousAppointments());
          }}
        >
          Previous Appointments
        </Typography>
      </Box>
      <Box className="relative w-full max-w-[320px] h-min mb-4 mt-2">
        <TextField
          id="search-bar"
          className="text"
          variant="outlined"
          size="small"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IoSearch className="text-[20px] font-bold" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  className="-mr-4"
                  onClick={() => {
                    setSearchValue('');
                  }}
                >
                  <IoCloseSharp className="text-[16px] font-bold" />
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{
            backgroundColor: '#EDF0F2',
            borderRadius: '10px',
            width: '100%',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none'
            }
          }}
        />
      </Box>
    </div>
  );
};

export default PatientAppointmentNavigation;

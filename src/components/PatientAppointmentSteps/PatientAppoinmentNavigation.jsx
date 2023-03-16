import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toPreviousAppointments,
  toExpectedAppointments
} from '../../redux/reducers/step.reducer';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { IoCloseSharp, IoSearch } from 'react-icons/io5';
import { getOnePatient } from '../../redux/reducers/patient.reducer';

const PatientAppointmentNavigation = () => {
  const step = useSelector((state) => state.step.appointment_step);
  const patient = useSelector((state) => state.patient.single_data.data);

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
      <Box className="flex flex-center gap-3">
        <Typography variant="h6">Profile</Typography>
        <Typography variant="h6">-</Typography>
        <Typography variant="h6">
          {patient?.first_name} {patient?.last_name}
        </Typography>
      </Box>
      <Box className="flex items-center gap-10 mt-8 mb-5">
        <Typography
          variant="subtitle1"
          fontWeight="600"
          fontSize="18px"
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
          fontSize="18px"
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
      <Box className="relative w-full, max-w-[320px] h-min mb-4 mt-2">
        <TextField
          id="search-bar"
          className="text"
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: '#EDF0F2',
            borderRadius: '10px',
            width: '100%'
          }}
          onInput={() => {
            setHideSearch(true);
          }}
          onEmptied={() => {
            setHideSearch(false);
          }}
        />
        <IconButton
          type="submit"
          aria-label="search"
          sx={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            padding: 0,
            border: '1px solid #797979'
          }}
          className="right-0"
        >
          <IoCloseSharp className="text-[16px] font-bold" />
        </IconButton>
        {!hideSearch && (
          <IconButton
            type="submit"
            aria-label="search"
            sx={{
              position: 'absolute',
              width: 'fit-content',
              transform: 'translateY(-50%)',
              top: '50%',
              left: '10px',
              padding: 0
            }}
            className="right-0"
          >
            <IoSearch className="text-[20px] font-bold" />
          </IconButton>
        )}
      </Box>
    </div>
  );
};

export default PatientAppointmentNavigation;

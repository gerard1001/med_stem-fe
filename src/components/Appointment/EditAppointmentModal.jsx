import { Box, Grid, Modal, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios/axios.instance';
import CloseXButton from '../CloseXButton';
import LoadingButton from '../LoadingButton';

const formatLastName = (name) => {
  if (!name) return '';
  const splitName = name.split(/[ ]+/gi).filter((item) => item !== '');

  return splitName
    .map((name, index) => {
      if (index !== splitName.length - 1) {
        return `${name[0].toUpperCase()}.`;
      }
      return name;
    })
    .join(' ');
};

const EditAppointmentModal = ({
  open,
  onClose,
  selectedTime,
  doctorName: { firstName, lastName },
  specialities
}) => {
  const [loading, setLoading] = useState(false);
  const appointmentData = [
    {
      name: 'Appointment Date',
      value: format(Date.now(), 'MM.dd.yyyy')
    },
    {
      name: 'Appointment time',
      value: selectedTime
    },
    {
      name: 'Doctor',
      value: `${firstName} ${formatLastName(lastName)}`
    },
    {
      name: 'Speciality',
      value: specialities?.join(', ')
    }
  ];

  const handleSubmit = () => {
    // const data = axiosInstance.post('/appointments', {});
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex flex-col items-center justify-center"
    >
      <Box className="flex flex-col justify-center items-center gap-4 max-w-[600px] bg-white border border-primary shadow-2 rounded-[20px] relative py-10 px-12">
        <CloseXButton onClick={onClose} />
        <Typography className="w-full font-semibold text-lg text-center">
          Appointment Confirmation
        </Typography>
        <Stack direction="row" gap={6} width="100%">
          <Stack>
            {appointmentData.map(({ name }) => (
              <Typography key={name} className="truncate">
                {name}
              </Typography>
            ))}
          </Stack>
          <Stack>
            {appointmentData.map(({ value }) => (
              <Typography key={value} className="truncate">
                {value}
              </Typography>
            ))}
          </Stack>
          <Stack>
            {Array.from(Array(4)).map(({ val }) => (
              <Typography component={Link} key={val} className="truncate">
                edit
              </Typography>
            ))}
          </Stack>
        </Stack>
        {/* <LoadingButton
          variant="contained"
          loading={loading}
          className="bg-[#1A4CFF] text-white w-[180px]"
          onClick={handleSubmit}
        >
          Make Appointment
        </LoadingButton> */}
      </Box>
    </Modal>
  );
};

export default EditAppointmentModal;

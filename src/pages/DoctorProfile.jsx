import React from 'react';
import DashboardSideBar from '../components/DashboardSideBar';
import { useSelector, useDispatch } from 'react-redux';
import { getOneDoctor } from '../redux/reducers/doctor.reducer';
import { Box, Typography, TextField, Button } from '@mui/material';
import { FiUser } from 'react-icons/fi';

const DoctorProfile = () => {
  const doctor = useSelector((state) => state.doctor.single_data.data);

  const dispatch = useDispatch();

  const doctorId = '64ff1279-8b59-4143-8e6c-a0c8f38bf9d5';

  React.useEffect(() => {
    dispatch(getOneDoctor(doctorId));
  }, []);

  return (
    <Box className="pl-[220px] md:pl-0 pt-20">
      <DashboardSideBar />
      <Box className="w-[90%] block mx-auto">
        <Box>
          <Typography variant="h6" sx={{ mb: '20px' }}>
            Profile and Settings
          </Typography>
        </Box>
        <Box className="flex flex-row lg:flex-col items-start w-[100%] mx-auto md:w-[90%]">
          <Box className="md:w-[90%] w-1/3">
            <Typography
              variant="subtitle1"
              fontWeight="600"
              sx={{ my: '20px' }}
            >
              Personal Information
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gap: 1,
                gridTemplateColumns: 'repeat(2, 1fr)'
              }}
            >
              <Typography variant="subtitle1" sx={{ color: '#6A6F75' }}>
                Family name
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#000' }}>
                Kim
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#6A6F75' }}>
                Given name
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#000' }}>
                Davis
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#6A6F75' }}>
                Gender
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#000' }}>
                male
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#6A6F75' }}>
                Date Of Birth
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#000' }}>
                03.09.1999
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              fontWeight="600"
              sx={{ my: '20px' }}
            >
              Contact Information
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gap: 1,
                gridTemplateColumns: 'repeat(2, 1fr)'
              }}
            >
              <Typography variant="subtitle1" sx={{ color: '#6A6F75' }}>
                Email
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#000' }}>
                example@email.com
              </Typography>
            </Box>
            <Button
              sx={{
                marginTop: '40px',
                color: '#fff',
                width: '120px',
                color: '#1A4CFF',
                border: '1px solid #1A4CFF',
                borderRadius: '20px',
                ':hover': { backgroundColor: '#a2ccff', border: 'none' }
              }}
            >
              Edit
            </Button>
          </Box>
          <Box className="md:w-[90%] w-1/3">
            <Typography
              variant="subtitle1"
              fontWeight="600"
              sx={{ my: '20px' }}
            >
              Change Password
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ my: '20px', color: '#6A6F75' }}
            >
              The password must be between 8 and 32 characters long and include
              at least one uppercase letter, one lowercase letter, and one
              number.
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateRows: 'repeat(3, 1fr)',
                gap: '20px',
                mt: '20px'
              }}
            >
              <TextField
                label="Current password"
                placeholder="Current password"
                variant="outlined"
                size="small"
                sx={{ borderRadius: '20px', maxWidth: '300px' }}
              />
              <TextField
                label="New password"
                placeholder="New password"
                variant="outlined"
                size="small"
                sx={{ borderRadius: '20px', maxWidth: '300px' }}
              />
              <TextField
                label="Repeat new password"
                placeholder="Repeat new password"
                variant="outlined"
                size="small"
                sx={{ borderRadius: '20px', maxWidth: '300px' }}
              />
              <Button
                sx={{
                  marginTop: { md: '40px', xs: '15px' },
                  color: '#fff',
                  width: '240px',
                  color: '#1A4CFF',
                  border: '1px solid #1A4CFF',
                  borderRadius: '20px',
                  ':hover': { backgroundColor: '#a2ccff', border: 'none' }
                }}
              >
                Change password
              </Button>
            </Box>
          </Box>
          <Box className="md:w-[90%] w-1/3">
            <Box className="w-[100%] md:mb-[80px] md:w-[100%] md:mt-10 flex flex-col items-center">
              <Box className="p-10 rounded-[50%] bg-[#a2ccff]">
                <FiUser className="text-[60px]" />
              </Box>
              <Box>
                <Button
                  sx={{
                    marginTop: '40px',
                    color: '#fff',
                    width: '120px',
                    color: '#1A4CFF',
                    border: '1px solid #1A4CFF',
                    borderRadius: '20px',
                    marginX: 'auto',
                    ':hover': { backgroundColor: '#a2ccff', border: 'none' }
                  }}
                >
                  Upload
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorProfile;

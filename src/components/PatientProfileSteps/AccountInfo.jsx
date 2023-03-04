import React from 'react';
import PatientProfileNavigation from './PatientProfileNavigation';
import { Box, Button, Typography, Paper, Grid, TextField } from '@mui/material';
import HomeNavBar from '../HomeNavBar';
import { FiUser } from 'react-icons/fi';

const AccountInfo = () => {
  return (
    <div>
      <Box className="w-[80%] max-w-[1200px] mx-auto">
        <PatientProfileNavigation />

        <Box className="mt-8 mb-5">
          <Typography variant="subtitle1" fontWeight="600" fontSize="18px">
            Change password
          </Typography>
        </Box>
        <Box className="flex flex-row md:flex-col">
          <Box className="w-[80%] md:w-[100%]">
            <Typography
              variant="subtitle1"
              fontSize="17px"
              sx={{ width: { md: '50%', sm: '70%' } }}
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
                  marginTop: '40px',
                  color: '#fff',
                  width: '120px',
                  color: '#1A4CFF',
                  border: '1px solid #1A4CFF',
                  borderRadius: '20px',
                  ':hover': { backgroundColor: '#a2ccff', border: 'none' }
                }}
              >
                Change
              </Button>
            </Box>
          </Box>
          <Box className="w-[20%] md:mb-[80px] md:w-[100%] md:mt-10 flex flex-col items-center">
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
    </div>
  );
};

export default AccountInfo;

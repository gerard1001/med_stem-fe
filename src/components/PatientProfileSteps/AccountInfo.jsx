import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import PatientProfileNavigation from './PatientProfileNavigation';

const AccountInfo = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <Box className="w-full">
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
              <FormControl
                sx={{ maxWidth: '300px' }}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <AiFillEyeInvisible className="text-[20px]" />
                        ) : (
                          <AiFillEye className="text-[20px]" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="New password"
                />
              </FormControl>
              <FormControl
                sx={{ maxWidth: '300px' }}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <AiFillEyeInvisible className="text-[20px]" />
                        ) : (
                          <AiFillEye className="text-[20px]" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Repeat new password"
                />
              </FormControl>
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

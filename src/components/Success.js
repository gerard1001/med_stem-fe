import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Success = () => (
  <Box className="p-3">
    <Typography variant="h4" align="center">
      You were successfully registered to MedStem!
    </Typography>
    <Typography component="p" align="center" className="mt-30">
      Check your inbox to verify your email.
    </Typography>
  </Box>
);

export default Success;

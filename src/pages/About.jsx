import React from 'react';
import HomeNavBar from '../components/HomeNavBar';
import { Box, Typography } from '@mui/material';

const About = () => {
  return (
    <div>
      <HomeNavBar />
      <Box className="flex item-start w-[80%] md:w-[90%] md:flex-col max-w-[1200px] mx-auto">
        <Box className="w-1/2 md:w-[100%] flex flex-col items-start gap-8">
          <Typography variant="h6">About us</Typography>
          <Typography variant="subtitle1">
            Green clinic- это многопрофильный медицинский центр, предоставляющий
            доступную высококачественную медицинскую помощь населению, и
            возможность пройти полное обследование y врачей различного профиля,
            так же при необходимости, получить лечение в стационаре (провести
            операцию по бесплатной квоте ), по лучшим международным стандартам и
            технологиям.
          </Typography>
        </Box>
        <Box className="w-1/2 md:w-[100%]"></Box>
      </Box>
    </div>
  );
};

export default About;

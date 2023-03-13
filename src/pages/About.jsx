import React from 'react';
import HomeNavBar from '../components/HomeNavBar';
import { Box, Typography } from '@mui/material';

const About = () => {
  return (
    <HomeNavBar>
      <div>
        {/* <Box className="p-8"> */}
        <Box className="flex flex-col items-start max-w-[800px] mx-auto p-8">
          <Typography variant="h6" color="primary" className="pb-3 text-xl">
            About us
          </Typography>
          <Typography variant="subtitle1" className="py-3">
            Welcome to Medstem, your reliable partner in providing affordable
            and high-quality medical care to the population. Our mission is to
            make healthcare accessible to everyone, regardless of their
            socioeconomic status, by leveraging the latest advancements in
            medical technology and expertise.
          </Typography>
          <Typography variant="subtitle1" className="py-3">
            We offer a comprehensive medical system that allows you to make
            appointments with doctors of various profiles, ensuring that you
            receive the best possible care for your specific health needs. Our
            system is user-friendly and designed to provide seamless access to
            medical care, making it easy for you to get the help you need when
            you need it.
          </Typography>
          <Typography variant="subtitle1" className="py-3">
            At Medstem, we believe that access to medical care is a fundamental
            right, and we are committed to making this a reality for everyone.
            We work tirelessly to ensure that our services are affordable,
            high-quality, and accessible to all, so that you can enjoy good
            health and well-being.
          </Typography>
          {/* flex item-start w-[80%] md:w-[90%] md:flex-col mx-auto */}
        </Box>
        {/* </Box> */}
      </div>
    </HomeNavBar>
  );
};

export default About;

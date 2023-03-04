import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneDoctor } from '../redux/reducers/doctor.reducer';
import HomeNavBar from '../components/HomeNavBar';
import { Box, Typography, Button } from '@mui/material';
import * as IoIcons from 'react-icons/io5';
import Loader from '../components/Loader/Loader';

const DoctorPage = () => {
  const doctor = useSelector((state) => state.doctor);

  const dispatch = useDispatch();

  let urlId = window.location.href.substring(
    window.location.href.lastIndexOf('/') + 1
  );

  let doctorId;

  urlId.includes('?')
    ? (doctorId = urlId.slice(0, urlId.lastIndexOf('?')))
    : (doctorId = urlId);
  React.useEffect(() => {
    dispatch(getOneDoctor(doctorId));
  }, []);

  const doctorData = doctor?.single_data?.data;

  const handleBack = () => {
    history.back();
  };

  return (
    <Box className="">
      <HomeNavBar />
      <Box className="flex w-[80%] lg:w-[100%] md:p-4 md:flex-col md:items-center mt-10 md:mt-1 mx-auto md:pt-12">
        <Box className="w-4/5 md:w-[100%] relative flex flex-row md:flex-col items-start">
          <Box className="w-[10%]">
            <Box
              className="border-[#2b8aff] rounded-[10px] text-primary border w-fit px-4 py-1 absolute left-5 md:left-1 text-[16px] cursor-pointer hover:border-none hover:bg-[#a2ccff]"
              onClick={handleBack}
            >
              <IoIcons.IoArrowBack />
            </Box>
          </Box>
          {doctor?.loading && (
            <Box className="w-[80px] h-[80px] mx-auto mt-[220px] md:mt-[120px]">
              <Loader />
            </Box>
          )}
          {!doctor?.loading && (
            <Box className="w-[90%] flex items-start md:flex-col">
              <Box className="w-[40%] md:w-[100%] mx-auto md:mb-10 md:mt-10">
                <img
                  src={doctorData?.picture}
                  alt=""
                  className="w-[80%] max-w-[240px] object-cover rounded-[50%]"
                  style={{ aspectRatio: '1 / 1' }}
                />
              </Box>
              <Box className="w-[60%] md:w-[100%] flex flex-col items-start gap-4">
                <Box>
                  <Typography variant="h6">
                    {`${doctorData?.first_name} ${doctorData?.last_name}`}, MD
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-[#050e17] font-bold"
                  >
                    {`${doctorData?.first_name} ${doctorData?.last_name}`}, MD
                  </Typography>
                </Box>
                <br />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontSize: '20px' }}>
                    About {`${doctorData?.first_name} ${doctorData?.last_name}`}
                    , MD
                  </Typography>
                  <Typography className="text-[#050e17]">
                    Total experience (years): {doctorData?.experience_years}
                  </Typography>
                  <Typography className="text-[#050e17]">
                    Category of doctor: {doctorData?.category}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontSize: '20px' }}>
                    Medical Education
                  </Typography>
                  <Typography variant="body1" className="text-[#222]">
                    {doctorData?.about}
                  </Typography>
                </Box>
                <Box className="mt-10">
                  <Typography variant="body1" className="text-[#050e17]">
                    Cost per appointment: {doctorData?.cost_per_appointment}$
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        <Box className="w-1/5 md:w-[100%] flex items-end flex-col-reverse">
          <Button
            onClick={() => {
              nav(`/`);
            }}
            sx={{
              marginTop: '40px',
              backgroundColor: '#1A4CFF',
              color: '#fff',
              maxWidth: '220px',
              ':hover': { backgroundColor: '#1A4CFA' }
            }}
          >
            Make appointment{' '}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorPage;

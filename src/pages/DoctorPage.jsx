import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import * as IoIcons from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import HomeNavBar from '../components/HomeNavBar';
import Loader from '../components/Loader/Loader';
import { getOneDoctor } from '../redux/reducers/doctor.reducer';
import BackButton from '../components/BackButton';

const DoctorPage = () => {
  const navigate = useNavigate();
  const doctor = useSelector((state) => state.doctor);

  const dispatch = useDispatch();

  const { id: doctorId } = useParams();

  React.useEffect(() => {
    dispatch(getOneDoctor(doctorId));
  }, []);

  const doctorData = doctor?.single_data?.data;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box className="">
      <HomeNavBar />
      <Box className="flex w-[100%]  max-w-[1200px] px-32 md:px-[10%] sm:px-4 pb-32 md:flex-col md:items-center mt-10 md:mt-1 mx-auto md:pt-12">
        <Box className="w-4/5 md:w-[100%] relative flex flex-row md:flex-col items-start mb-16">
          <Box className="w-[10%]">
            <BackButton className="w-fit left-5" onClick={handleBack} />
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
                    className="text-[#050e17] font-bold line-clamp-3"
                  >
                    {`${doctorData?.departments
                      .map((value) => value.speciality_name)
                      .join(', ')}`}
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
              navigate(`/find_doctor/appointment/${doctorId}`);
            }}
            sx={{
              marginTop: '40px',
              backgroundColor: '#1A4CFF',
              color: '#fff',
              maxWidth: '220px',
              ':hover': { backgroundColor: '#1A4CFA' }
            }}
            className="bg-[#1A4CFF] capitalize text-white"
          >
            Make appointment{' '}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorPage;

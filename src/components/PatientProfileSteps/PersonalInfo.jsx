import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePatient } from '../../redux/reducers/patient.reducer';
import { Box, Button, Typography, Paper, Grid, styled } from '@mui/material';
import Loader from '../Loader/Loader';
import PatientProfileNavigation from './PatientProfileNavigation';
import { AiOutlineNodeIndex } from 'react-icons/ai';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: 'none',
  borderRadius: 'none'
}));

const PatientInfo = () => {
  const patient = useSelector((state) => state.patient);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getOnePatient());
  }, []);

  const patientData = patient?.single_data?.data;
  return (
    <div>
      <Box className="w-[80%] mx-auto">
        {patient?.loading && (
          <Box className="w-[80px] h-[80px] mx-auto mt-[220px] md:mt-[120px]">
            <Loader />
          </Box>
        )}
        {!patient?.loading && (
          <Box className="">
            <PatientProfileNavigation />
            <Box sx={{ width: { md: '50%' } }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Item>
                    <Typography variant="body2">ID number</Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight="500"
                      fontSize="17px"
                    >
                      {patientData?.id_number}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <Typography variant="body2">Date of Birth</Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight="500"
                      fontSize="17px"
                    >
                      {new Date(patientData?.birth_date).toLocaleDateString()}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    {' '}
                    <Typography variant="body2">Gender</Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight="500"
                      fontSize="17px"
                      className="capitalize"
                    >
                      {patientData?.gender}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    {' '}
                    <Typography variant="body2">Marital Status</Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight="500"
                      fontSize="17px"
                      className="capitalize"
                    >
                      {patientData?.marital_status}
                    </Typography>
                  </Item>
                </Grid>
              </Grid>
            </Box>
            <Box className="mt-8 mb-5">
              <Typography variant="subtitle1" fontWeight="600" fontSize="18px">
                Contact Information
              </Typography>
            </Box>
            <Box sx={{ width: { md: '50%' } }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Item>
                    <Typography variant="body2">Country</Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight="500"
                      fontSize="17px"
                    >
                      {patientData?.country}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <Typography variant="body2">City</Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight="500"
                      fontSize="17px"
                    >
                      {patientData?.city || '-'}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    {' '}
                    <Typography variant="body2">Address 1</Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight="500"
                      fontSize="17px"
                      className="capitalize"
                    >
                      {patientData?.address_1}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    {' '}
                    <Typography variant="body2">Address 2</Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight="500"
                      fontSize="17px"
                      className="capitalize"
                    >
                      {patientData?.address_2}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    {' '}
                    <Typography variant="body2">Phone Number</Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight="500"
                      fontSize="17px"
                      className="capitalize"
                    >
                      {patientData?.phone_number}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    {' '}
                    <Typography variant="body2">Email</Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight="500"
                      fontSize="17px"
                      className="capitalize"
                    >
                      {patientData?.email}
                    </Typography>
                  </Item>
                </Grid>
              </Grid>
            </Box>
            <Button
              sx={{
                marginTop: '40px',
                color: '#fff',
                width: '120px',
                display: 'block',
                color: '#1A4CFF',
                border: '2px solid #1A4CFF',
                borderRadius: '20px',
                marginX: 'auto',
                ':hover': { backgroundColor: '#a2ccff' }
              }}
            >
              Edit
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default PatientInfo;

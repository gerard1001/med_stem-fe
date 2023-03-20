import { Box, Button, Grid, Paper, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePatient } from '../../redux/reducers/patient.reducer';
import EditPatientPersonalProfileModal from '../EditPatientPersonalProfileModal';
import Loader from '../Loader/Loader';
import PatientProfileNavigation from './PatientProfileNavigation';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundColor: 'transparent',
  padding: theme.spacing(1),
  boxShadow: 'none',
  borderRadius: 'none'
}));

const PatientInfo = () => {
  const patient = useSelector((state) => state.patient);
  const [openEditModal, setOpenEditModal] = useState(false);

  const patientData = patient?.single_data?.data;
  return (
    <div>
      <Box className="w-full">
        <Box className="pb-16">
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
              {/* <Grid item xs={6}>
                  <Item>
                    {' '}
                    <Typography variant="body2">Address 1</Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight="500"
                      fontSize="17px"
                      className="capitalize"
                    >
                      {patientData?.address_2}
                    </Typography>
                  </Item>
                </Grid> */}
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
              width: '120px',
              display: 'block',
              color: '#1A4CFF',
              border: '1px solid #1A4CFF',
              borderRadius: '20px',
              marginX: 'auto',
              ':hover': { backgroundColor: '#a2ccff' }
            }}
            onClick={() => {
              setOpenEditModal(true);
            }}
          >
            Edit
          </Button>
        </Box>
      </Box>
      <EditPatientPersonalProfileModal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
        }}
        patientData={patientData}
      />
    </div>
  );
};

export default PatientInfo;

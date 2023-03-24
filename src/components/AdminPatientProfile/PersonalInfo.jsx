import {
  Box,
  Button,
  Grid,
  Paper,
  styled,
  Typography,
  Modal
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  getOnePatient,
  deletePatientAccount
} from '../../redux/reducers/patient.reducer';
import EditPatientPersonalProfileModal from '../EditPatientPersonalProfileModal';
import Loader from '../Loader/Loader';
import PatientProfileNavigation from './PatientProfileNavigation';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: 'none',
  borderRadius: 'none'
}));

const PatientInfo = () => {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient);
  const patientData = patient?.single_data?.data;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [patientId, setPatientId] = React.useState(patientData?.client_id);
  const handleOpen = () => setOpenDeleteModal(true);
  const handleClose = () => setOpenDeleteModal(false);

  const nav = useNavigate();

  const handleDeleteAccount = () => {
    dispatch(deletePatientAccount(patientId));
    nav('/dashboard/patient');
  };

  const isAdmin =
    JSON.parse(localStorage.getItem('userLoginData'))?.user?.Role.role ===
    'admin';

  return (
    <div>
      <Box className="w-full p-20 sm:p-4">
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
          {isAdmin && (
            <Box className="flex items-end flex-grow justify-end gap-4">
              <Button
                sx={{
                  marginTop: '40px',
                  width: '120px',
                  color: '#1A4CFF',
                  border: '1px solid #1A4CFF',
                  borderRadius: '10px',
                  ':hover': { backgroundColor: '#a2ccff' }
                }}
                onClick={() => {
                  setOpenEditModal(true);
                }}
              >
                Edit
              </Button>
              <Button
                sx={{
                  marginTop: '40px',
                  width: '120px',
                  color: '#1A4CFF',
                  border: '1px solid #1A4CFF',
                  borderRadius: '10px',
                  ':hover': { backgroundColor: '#a2ccff' }
                }}
                onClick={handleOpen}
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <EditPatientPersonalProfileModal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
        }}
        patientData={patientData}
      />
      <Modal
        open={openDeleteModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] w-80 border border-sky-400 p-4 py-8 bg-white rounded-2xl">
          <Typography
            id="modal-modal-title"
            variant="h6"
            fontWeight={600}
            textAlign="center"
            component="h2"
          >
            Delete patient profile?
          </Typography>
          <Box className="w-full flex items-center justify-evenly mt-10 gap-4">
            <Button
              onClick={handleDeleteAccount}
              className="bg-[#1A4CFF] text-white w-1/2  rounded-lg"
            >
              Yes
            </Button>
            <Button
              onClick={handleClose}
              className="bg-[#b1b1b1] text-black w-1/2 rounded-lg"
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PatientInfo;

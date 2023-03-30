import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  styled,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  Table,
  TableBody,
  Button,
  IconButton,
  Modal,
  TextField
} from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  getOneAppointment,
  updateAppointment
} from '../../redux/reducers/appointment.reducer';
import { BsPlusCircleFill } from 'react-icons/bs';
import { Controller, useForm } from 'react-hook-form';

const AddNewAppointmentData = ({
  handleOpenDrugModal,
  handleOpenRecommendationModal
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openComplaintsModal, setOpenComplaintsModal] = useState(false);
  const [openDiagnosisModal, setOpenDiagnosisModal] = useState(false);

  const urlId = window.location.href.substring(
    window.location.href.lastIndexOf('/') + 1
  );

  let appointmentId;

  urlId.includes('?')
    ? (appointmentId = urlId.slice(0, urlId.lastIndexOf('?')))
    : (appointmentId = urlId);

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset
  } = useForm({});

  const onSubmit = async ({ complaints }) => {
    setLoading(true);
    const body = { complaints: complaints };

    const data = { appointmentId, body };
    dispatch(updateAppointment(data)).then(() => {
      dispatch(getOneAppointment(appointmentId)).then(() => {
        handleCloseComplaintsModal();
      });
    });
  };

  const onSubmitDiagnosis = async ({ diagnosis }) => {
    setLoading(true);
    const body = { diagnosis: diagnosis };
    const data = { appointmentId, body };
    dispatch(updateAppointment(data)).then(() => {
      dispatch(getOneAppointment(appointmentId)).then(() => {
        handleCloseDiagnosisModal();
      });
    });
  };

  const handleOpenComplaintsModal = () => setOpenComplaintsModal(true);
  const handleCloseComplaintsModal = () => setOpenComplaintsModal(false);

  const handleOpenDiagnosisModal = () => setOpenDiagnosisModal(true);
  const handleCloseDiagnosisModal = () => setOpenDiagnosisModal(false);

  return (
    <>
      <Box className="bg-emelard-400 w-full p-3 flex flex-col items-start gap-8">
        <Box className="flex w-[100%] gap-2 p-4 items-center justify-between border border-[#797979] bg-white rounded-[8px] leading-3">
          <Typography variant="subtitle1" className="leading-5 text-[15px]">
            Complaints
          </Typography>
          <IconButton
            className="w-fit flex items-center gap-1 text-[14px]"
            onClick={handleOpenComplaintsModal}
          >
            <BsPlusCircleFill className="text-primary" /> Add
          </IconButton>
        </Box>
        <Box className="flex w-[100%] gap-2 p-4 items-center justify-between border border-[#797979] bg-white rounded-[8px] leading-3">
          <Typography variant="subtitle1" className="leading-5 text-[15px]">
            Diagnosis
          </Typography>
          <IconButton
            className="w-fit flex items-center gap-1 text-[14px]"
            onClick={handleOpenDiagnosisModal}
          >
            <BsPlusCircleFill className="text-primary" /> Add
          </IconButton>
        </Box>
        <Box className="flex w-[100%] gap-2 p-4 items-center justify-between border border-[#797979] bg-white rounded-[8px] leading-3">
          <Typography variant="subtitle1" className="leading-5 text-[15px]">
            Drugs
          </Typography>
          <IconButton
            className="w-fit flex items-center gap-1 text-[14px]"
            onClick={handleOpenDrugModal}
          >
            <BsPlusCircleFill className="text-primary" /> Add
          </IconButton>
        </Box>
        <Box className="flex w-[100%] gap-2 p-4 items-center justify-between border border-[#797979] bg-white rounded-[8px] leading-3">
          <Typography variant="subtitle1" className="leading-5 text-[15px]">
            Recommendations
          </Typography>
          <IconButton
            className="w-fit flex items-center gap-1 text-[14px]"
            onClick={handleOpenRecommendationModal}
          >
            <BsPlusCircleFill className="text-primary" /> Add
          </IconButton>
        </Box>
      </Box>
      <Modal
        open={openComplaintsModal}
        onClose={handleCloseComplaintsModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] w-[80%] max-w-[720px] border-none p-8 bg-white"
        >
          <Box className="flex flex-col items-center gap-8">
            <Box className="flex w-[100%] gap-2 p-4 px-8 items-center justify-between border border-[#797979] bg-white rounded-[8px] leading-3">
              <Typography variant="subtitle1" className="leading-5 text-[15px]">
                Complaints
              </Typography>
              <Typography className="text-[14px]">Add</Typography>
            </Box>
            <Box className="flex flex-col w-[100%] gap-2 items-center justify-between rounded-[8px] leading-3">
              <Box className="flex w-full gap-3 items-center justify-between flex-row">
                <Typography
                  fontSize={600}
                  variant="subtitle1"
                  className="leading-5 text-[15px]"
                >
                  Complaints
                </Typography>
                <Box className="w-fit flex items-center gap-1 text-[14px]">
                  <Button
                    className="text-black"
                    onClick={handleCloseComplaintsModal}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add</Button>
                </Box>
              </Box>
              <Controller
                control={control}
                name="complaints"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    required
                    minRows={3}
                    maxRows={5}
                    className="w-full"
                  />
                )}
              />
            </Box>
          </Box>
        </form>
      </Modal>
      <Modal
        open={openDiagnosisModal}
        onClose={handleCloseDiagnosisModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form
          onSubmit={handleSubmit(onSubmitDiagnosis)}
          className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] w-[80%] max-w-[720px] border-none p-8 bg-white"
        >
          <Box className="flex flex-col items-center gap-8">
            <Box className="flex w-[100%] gap-2 p-4 px-8 items-center justify-between border border-[#797979] bg-white rounded-[8px] leading-3">
              <Typography variant="subtitle1" className="leading-5 text-[15px]">
                Diagnosis
              </Typography>
              <Typography className="text-[14px]">Add</Typography>
            </Box>
            <Box className="flex flex-col w-[100%] gap-2 items-center justify-between rounded-[8px] leading-3">
              <Box className="flex w-full gap-3 items-center justify-between flex-row">
                <Typography
                  fontSize={600}
                  variant="subtitle1"
                  className="leading-5 text-[15px]"
                >
                  Diagnosis
                </Typography>
                <Box className="w-fit flex items-center gap-1 text-[14px]">
                  <Button
                    className="text-black"
                    onClick={handleCloseDiagnosisModal}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add</Button>
                </Box>
              </Box>
              <Controller
                control={control}
                name="diagnosis"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    className="w-full"
                  />
                )}
              />
            </Box>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default AddNewAppointmentData;

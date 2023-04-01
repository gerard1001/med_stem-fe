import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Divider,
  IconButton,
  Button,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { BsPencil, BsPlusCircle, BsTrash } from 'react-icons/bs';
import { set } from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import CloseXButton from './CloseXButton';
import {
  getDoctorWorkDays,
  updateSheduleWorkDays
} from '../redux/reducers/workDays.reducer';
import {
  deleteScheduleById,
  getScheduleByDoctorId
} from '../redux/reducers/schedule.reducer';
import LoadingButton from './LoadingButton';
import { format } from 'date-fns';

const AdminScheduleActionRightSideBar = ({
  toggleRightSideBar,
  availableSchedules,
  searchQuery,
  handleToCreateSChedule
}) => {
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [scheduleId, setScheduleId] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const [loading, setLoading] = useState(false);

  const days = availableSchedules?.map((values) =>
    values.work_days?.map((day) => {
      const obj = {};
      obj[`${day.schedule_id}`] = day.day;
      return obj;
    })
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset
  } = useForm({});

  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => !loading && setOpenEditModal(false);

  const handleOpendeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => !loading && setOpenDeleteModal(false);

  function getSchedules(schedules) {
    const result = {};
    const orderedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    schedules?.forEach((schedule) => {
      const { schedule_id, work_days } = schedule;
      const uniqueDays = [...new Set(work_days?.map((day) => day.day))];
      const sortedDays = uniqueDays.sort((a, b) => {
        return orderedDays.indexOf(a) - orderedDays.indexOf(b);
      });
      result[schedule_id] = sortedDays.join(', ');
    });

    return result;
  }

  const result = getSchedules(availableSchedules);

  const onEditTime = ({ from, to }) => {
    console.log({
      scheduleId,
      from,
      to
    });
    const body = { from, to };
    const data = {
      id: scheduleId,
      body
    };

    setLoading(true);
    dispatch(updateSheduleWorkDays(data)).then(() => {
      dispatch(getScheduleByDoctorId(searchQuery)).then(() => {
        dispatch(getDoctorWorkDays({ id: searchQuery })).then(() => {
          setLoading(false);
          handleCloseEditModal();
        });
      });
    });
  };

  const onDeleteSchedule = () => {
    setLoading(true);
    dispatch(deleteScheduleById(scheduleId)).then(() => {
      dispatch(getScheduleByDoctorId(searchQuery)).then(() => {
        dispatch(getDoctorWorkDays({ id: searchQuery })).then(() => {
          setLoading(false);
          handleCloseDeleteModal();
        });
      });
    });
  };

  return (
    <Box className="w-[250px] z-50 bg-white fixed right-0 top-16 bottom-0 h-[calc(100vh-64px)] border-l border-t border-sky-400">
      {availableSchedules?.map((value, idx) => {
        const days = value.work_days.day;
        console.log(days);
        return (
          <>
            <Box className="py-4 pl-2 pr-2">
              <Box className="w-fit p-2 rounded-[5px] flex items-center justify-between gap-2 bg-[#F7F7F7] text-[13px] mb-1">
                {result[value.schedule_id]}
              </Box>
              <Box className="flex items-center justify-between gap-2">
                <Box>
                  <Typography className="text-[14px] truncate">
                    {value.work_days[0].from.slice(0, -3)} -{' '}
                    {value.work_days[0].to.slice(0, -3)} - Regularly
                  </Typography>
                </Box>
                <Box className="flex items-center">
                  <IconButton
                    onClick={() => {
                      setScheduleId(value.schedule_id);
                      setStartHour(value.work_days[0].from);
                      setEndHour(value.work_days[0].to);
                      setStartDate(value.start_date);
                      setEndDate(value.end_date);
                      handleOpenEditModal();
                    }}
                  >
                    <BsPencil className="text-[14px]" />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setScheduleId(value.schedule_id);
                      handleOpendeleteModal();
                    }}
                  >
                    <BsTrash className="text-[14px]" />
                  </IconButton>
                </Box>
              </Box>
            </Box>{' '}
            <Divider />
          </>
        );
      })}
      <Stack
        role="button"
        component={Button}
        onClick={() => {
          handleToCreateSChedule();
        }}
        variant="text"
        direction="row"
        className="gap-2 items-center cursor-pointer text-[15px] text-black -mr-4 mt-5"
        flexWrap="nowrap"
      >
        <BsPlusCircle /> Work Schedule
      </Stack>
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form
          onSubmit={handleSubmit(onEditTime)}
          className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] w-[80%] max-w-[350px] border-none p-8 bg-white rounded-[10px] border border-primary"
        >
          {' '}
          <CloseXButton onClick={handleCloseEditModal} />
          <Box className="flex flex-col items-center gap-8">
            <Box className="flex flex-col w-[100%] gap-2 items-center justify-between rounded-[8px] leading-3">
              <Box className="flex w-full gap-3 items-center justify-between flex-col mt-5">
                <Typography
                  fontSize={600}
                  variant="subtitle1"
                  className="leading-5 text-[18px] text-center font-semibold"
                >
                  Update schedule regular time
                </Typography>
                <Typography
                  fontSize={600}
                  variant="subtitle1"
                  className="leading-5 text-[14px] text-center"
                >
                  {format(new Date(startDate), 'dd.MM.yyyy')} -{' '}
                  {format(new Date(endDate), 'dd.MM.yyyy')}
                </Typography>
              </Box>
              <Box className="flex flex-row items-center gap-2">
                <Box className="flex flex-col items-start gap-1">
                  <Typography
                    variant="subtitle1"
                    className="leading-5 text-[14px] font-semibold"
                  >
                    From
                  </Typography>
                  <Controller
                    control={control}
                    name="from"
                    defaultValue={startHour}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="time"
                        variant="outlined"
                        sx={{
                          width: '120px',
                          margin: 0,
                          '& .MuiInputBase-input': {
                            margin: 0,
                            backgroundColor: '#E7E7E7',
                            borderRadius: '5px'
                          },
                          '& .MuiFormLabel-root': {
                            top: '-4px'
                          },
                          '& .MuiInputBase-root': {
                            paddingY: 0,
                            borderRadius: '5px'
                          }
                        }}
                        margin="normal"
                        size="small"
                        error={!!errors.from}
                        helperText={errors.from && errors.from.message}
                      />
                    )}
                  />
                </Box>
                <Box className="flex flex-col items-start gap-1">
                  <Typography
                    variant="subtitle1"
                    className="leading-5 text-[14px] font-semibold"
                  >
                    To
                  </Typography>
                  <Controller
                    control={control}
                    name="to"
                    defaultValue={endHour}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="time"
                        variant="outlined"
                        sx={{
                          width: '120px',
                          margin: 0,
                          '& .MuiInputBase-input': {
                            margin: 0,
                            backgroundColor: '#E7E7E7',
                            borderRadius: '5px'
                          },
                          '& .MuiFormLabel-root': {
                            top: '-4px'
                          },
                          '& .MuiInputBase-root': {
                            paddingY: 0,
                            borderRadius: '5px'
                          }
                        }}
                        margin="normal"
                        size="small"
                        error={!!errors.from}
                        helperText={errors.from && errors.from.message}
                      />
                    )}
                  />
                </Box>
              </Box>

              <Box className="w-fit flex items-center justify-end gap-5 mt-5">
                <LoadingButton
                  type="submit"
                  loading={loading}
                  className="rounded-[20px] w-[100px]"
                >
                  Save
                </LoadingButton>
                <Button
                  onClick={handleCloseEditModal}
                  sx={{
                    color: '#fff',
                    width: { md: '100px', xs: '80px' },
                    color: '#1A4CFF',
                    border: '1px solid #1A4CFF',
                    borderRadius: '10px',
                    marginX: 'auto',
                    ':hover': { backgroundColor: '#a2ccff', border: 'none' }
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Modal>
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] w-[80%] max-w-[320px] border-none p-8 bg-white rounded-[10px] border border-primary">
          <Box className="flex flex-col items-center gap-8">
            <Box className="flex flex-col w-[100%] gap-2 items-center justify-between rounded-[8px] leading-3">
              <CloseXButton onClick={handleCloseDeleteModal} />
              <Typography
                fontSize={600}
                textAlign="center"
                variant="subtitle1"
                className="leading-5 text-[18px] text-center font-semibold"
              >
                Delete this schedule?
              </Typography>

              <Box className="w-fit flex items-center justify-end gap-5 mt-5">
                <LoadingButton
                  loading={loading}
                  onClick={onDeleteSchedule}
                  className="w-[100px]"
                >
                  Delete
                </LoadingButton>
                <Button
                  onClick={() => {
                    handleToCreateSChedule();
                    handleCloseDeleteModal();
                  }}
                  sx={{
                    color: '#fff',
                    width: { md: '100px', xs: '80px' },
                    color: '#1A4CFF',
                    border: '1px solid #1A4CFF',
                    borderRadius: '10px',
                    marginX: 'auto',
                    ':hover': { backgroundColor: '#a2ccff', border: 'none' }
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminScheduleActionRightSideBar;

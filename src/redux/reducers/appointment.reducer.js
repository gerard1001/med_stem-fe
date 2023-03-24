import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../../axios/axios.instance';

const appointmentAdapter = createEntityAdapter();

export const makeAppointment = createAsyncThunk(
  'appointments/add',
  async (data) => {
    const response = await axiosInstance
      .post(`${process.env.BACKEND_URL}/appointments`, data)
      .then((res) => {
        toast.success('successfully added appointment');
        res.data;
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }
);

export const getOneAppointment = createAsyncThunk(
  'appointments/getOne',
  async (appointmentId) => {
    const response = await axiosInstance.get(
      `${process.env.BACKEND_URL}/appointments/${appointmentId}`
    );
    return response.data;
  }
);

export const {
  selectAll: selectAppointments,
  selectById: selectAppointmentsById
} = appointmentAdapter.getSelectors((state) => state.appointment);

export const getDoctorAppointments = createAsyncThunk(
  'Appointments/Doctor/get',
  async (id) => {
    try {
      const response = await axiosInstance.get(`/appointments/doctor/${id}`);
      return { id, appointments: response.data.data };
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const updateAppointment = createAsyncThunk(
  'Appointments/update',
  async (data) => {
    try {
      const response = await axiosInstance.patch(
        `/appointments/${data.appointmentId}`,
        data.body
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: appointmentAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getDoctorAppointments.fulfilled]: appointmentAdapter.upsertOne,
    [getOneAppointment.fulfilled]: appointmentAdapter.upsertOne,
    [updateAppointment.fulfilled]: appointmentAdapter.upsertOne
  }
});

export default appointmentSlice.reducer;

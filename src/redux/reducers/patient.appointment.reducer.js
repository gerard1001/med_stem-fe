import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios.instance';
import { toast } from 'react-toastify';

const initialState = {
  loading: false,
  data: [],
  single_data: {},
  error: ''
};

export const getPatientAppointments = createAsyncThunk(
  'appointments/getAppointments',
  async (patientId) =>
    axios
      .get(`${process.env.BACKEND_URL}/appointments/client/${patientId}`)
      .then((res) => res.data)
);

export const cancelAppointment = createAsyncThunk(
  'appointments/cancelAppointment',
  async (id) => {
    try {
      const response = await axios.get(
        `${process.env.BACKEND_URL}/appointments/cancel/${id}`
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

const patientAppointmentSlice = createSlice({
  name: 'patient_appointment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPatientAppointments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPatientAppointments.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(getPatientAppointments.rejected, (state, action) => {
      state.loading = false;
      state.data = {};
      state.error = action.error.message;
    });
  }
});

export default patientAppointmentSlice.reducer;

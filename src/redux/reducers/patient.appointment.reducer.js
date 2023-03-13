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
    console.log(id, 'IDIDIDID');
    const res = await axios.get(
      `${process.env.BACKEND_URL}/appointments/cancel/${id}`
    );
    // .then((res) => res.data);

    console.log(res, '%%^%^%^%^^%^%^%^^');

    return res;
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
    builder.addCase(cancelAppointment.pending, (state, action) => {
      state.loading = true;
      state.single_data = {};
    });
    builder.addCase(cancelAppointment.fulfilled, (state, action) => {
      toast.success('Appointment successfully cancelled');
      console.log(action);
      state.loading = false;
      state.single_data = action.payload;
      state.error = '';
    });
    builder.addCase(cancelAppointment.rejected, (state, action) => {
      toast.error(action.error.message);
      console.log(action);
      console.log(state);
      state.loading = false;
      state.single_data = {};
      state.error = action.error.message;
    });
  }
});

export default patientAppointmentSlice.reducer;

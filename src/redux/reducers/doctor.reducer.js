import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  loading: false,
  data: [],
  single_data: {},
  error: ''
};

export const registerDoctor = createAsyncThunk(
  'users/registerDoctor',
  async (data) => {
    const response = await axios
      .post(`${process.env.BACKEND_URL}/users/doctor/register`, data)
      .then((res) => {
        console.log(res);
        res.data;
      })
      .catch((error) => {
        console.log({ error });
        throw Error(error.response.data.message);
      });
  }
);

export const getDoctorList = createAsyncThunk('users/fetchDoctors', async () =>
  axios.get(`${process.env.BACKEND_URL}/users/doctors`).then((res) => res.data)
);

export const getOneDoctor = createAsyncThunk(
  'users/fetchDoctor',
  async (doctorId) =>
    axios
      .get(`${process.env.BACKEND_URL}/users/doctors/${doctorId}`)
      .then((res) => res.data)
);

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDoctorList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDoctorList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(getDoctorList.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
    builder.addCase(getOneDoctor.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOneDoctor.fulfilled, (state, action) => {
      state.loading = false;
      state.single_data = action.payload;
      state.error = '';
    });
    builder.addCase(getOneDoctor.rejected, (state, action) => {
      state.loading = false;
      state.single_data = {};
      state.error = action.error.message;
    });
    builder.addCase(registerDoctor.pending, (state, action) => {
      state.loading = true;
      state.single_data = {};
    });
    builder.addCase(registerDoctor.fulfilled, (state, action) => {
      toast.success('Registration successful');
      console.log(action);
      state.loading = false;
      state.single_data = action.payload;
      state.error = '';
    });
    builder.addCase(registerDoctor.rejected, (state, action) => {
      toast.error(action.error.message);
      console.log(action);
      state.loading = false;
      state.single_data = {};
      state.error = action.error.message;
    });
  }
});

export default doctorSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../../axios/axios.instance';

const initialState = {
  loading: false,
  data: [],
  single_data: {},
  error: ''
};

export const registerDoctor = createAsyncThunk(
  'users/registerDoctor',
  async (data) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.BACKEND_URL}/users/doctor/register`,
        data
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

export const getDoctorList = createAsyncThunk('users/fetchDoctors', async () =>
  axiosInstance
    .get(`${process.env.BACKEND_URL}/users/doctors`)
    .then((res) => res.data)
);

export const getOneDoctor = createAsyncThunk(
  'users/fetchDoctor',
  async (doctorId) => {
    const response = await axiosInstance.get(
      `${process.env.BACKEND_URL}/users/doctors/${doctorId}`
    );
    return response.data;
  }
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
  }
});

export default doctorSlice.reducer;

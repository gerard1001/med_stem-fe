import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../axios/axios.instance';

const initialState = {
  loading: false,
  data: [],
  single_data: {},
  error: ''
};

export const createSchedule = createAsyncThunk(
  'schedule/createSchedule',
  async (data) => {
    try {
      const response = await axios.post(`/schedule`, data);
      return response;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const getScheduleByDoctorId = createAsyncThunk(
  'schedule/getSchedule',
  async (id) => {
    try {
      const response = await axios.get(`/schedule/doctor/${id}`);
      return response;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const deleteScheduleById = createAsyncThunk(
  'schedule/deleteSchedule',
  async (id) => {
    try {
      const response = await axios.delete(`/schedule/${id}`);
      return response;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getScheduleByDoctorId.pending, (state, action) => {
      state.loading = true;
      state.single_data = {};
    });
    builder.addCase(getScheduleByDoctorId.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(getScheduleByDoctorId.rejected, (state, action) => {
      state.loading = false;
      state.single_data = {};
      state.error = action.error.message;
    });
    builder.addCase(createSchedule.pending, (state, action) => {
      state.loading = true;
      state.single_data = {};
    });
    builder.addCase(createSchedule.fulfilled, (state, action) => {
      toast.success('Schedule successfully created');
      state.loading = false;
      state.single_data = action.payload;
      state.error = '';
    });
    builder.addCase(createSchedule.rejected, (state, action) => {
      toast.error(action.error.message);
      state.loading = false;
      state.single_data = {};
      state.error = action.error.message;
    });
    builder.addCase(deleteScheduleById.pending, (state, action) => {
      state.loading = true;
      state.single_data = {};
    });
    builder.addCase(deleteScheduleById.fulfilled, (state, action) => {
      toast.success('Schedule successfully deleted');
      state.loading = false;
      state.single_data = action.payload;
      state.error = '';
    });
    builder.addCase(deleteScheduleById.rejected, (state, action) => {
      toast.error(action.error.message);
      state.loading = false;
      state.single_data = {};
      state.error = action.error.message;
    });
  }
});

export default scheduleSlice.reducer;

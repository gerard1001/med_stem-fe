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

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  }
});

export default scheduleSlice.reducer;

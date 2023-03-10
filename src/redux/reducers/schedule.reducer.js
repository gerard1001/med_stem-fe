import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
      // alert('OPOPOPPOPO');
      console.log(data, 'DATADDDATATADTADTDADTATD');
      const response = await axios.post(`/schedule`, data);

      console.log(response);
      return response;
    } catch (error) {
      console.log(error, '%&*(*)()&^%&$^');
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
      console.log(action);
      state.loading = true;
      state.single_data = {};
    });
    builder.addCase(createSchedule.fulfilled, (state, action) => {
      console.log(action);
      state.loading = false;
      state.single_data = action.payload;
      state.error = '';
    });
    builder.addCase(createSchedule.rejected, (state, action) => {
      alert(action.error.message);
      console.log(action);
      state.loading = false;
      state.single_data = {};
      state.error = action.error.message;
    });
  }
});

export default scheduleSlice.reducer;

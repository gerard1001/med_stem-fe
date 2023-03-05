import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  data: [],
  error: ''
};

export const getInfoList = createAsyncThunk('info/fetchInfo', async () =>
  axios.get(`${process.env.BACKEND_URL}/medical_info`).then((res) => res.data)
);

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInfoList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getInfoList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(getInfoList.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  }
});

export default infoSlice.reducer;

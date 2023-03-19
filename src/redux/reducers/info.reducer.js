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

export const getInfoClientList = createAsyncThunk(
  'info/client/fetchInfo',
  async (id) =>
    axios
      .get(`${process.env.BACKEND_URL}/medical_info/client/${id}`)
      .then((res) => res.data.data)
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
    builder.addCase(getInfoClientList.fulfilled, (state, { payload }) => {
      return {
        ...state,
        client: payload
      };
    });
  }
});

export default infoSlice.reducer;

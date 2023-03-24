import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios.instance';

const initialState = {
  loading: false,
  data: [],
  error: ''
};

export const addRecommendation = createAsyncThunk(
  'recommendation/create',
  async (data) =>
    axios.post(`/recommendation`, data.body).then((res) => res.data)
);

export const getRecommendations = createAsyncThunk(
  'recommendation/fetch',
  async () => axios.get(`/recommendation`).then((res) => res.data)
);

export const removeRecommendation = createAsyncThunk(
  'recommendation/remove',
  async (data) =>
    axios
      .patch(
        `/appointments/${data.appointmentId}/recommendation/${data.recommendationIndex}`
      )
      .then((res) => res.data)
);

const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addRecommendation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addRecommendation.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(addRecommendation.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
    builder.addCase(getRecommendations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRecommendations.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(getRecommendations.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
    builder.addCase(removeRecommendation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeRecommendation.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(removeRecommendation.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  }
});

export default recommendationSlice.reducer;

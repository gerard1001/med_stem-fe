import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios.instance';

const initialState = {
  loading: false,
  data: [],
  error: ''
};

export const addRecommendation = createAsyncThunk(
  'recommendation/create',
  async (data) => {
    try {
      const response = await axios.post(`/recommendation`, data.body);
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

export const getRecommendations = createAsyncThunk(
  'recommendation/fetch',
  async () => {
    try {
      const res = await axios.get(`/recommendation`);
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

export const removeRecommendation = createAsyncThunk(
  'recommendation/remove',
  async (data) => {
    try {
      const response = await axios
        .patch(
          `/appointments/${data.appointmentId}/recommendation/${data.recommendationIndex}`
        )
        .then((res) => res.data);
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

export const removeDrug = createAsyncThunk('drug/remove', async (data) => {
  try {
    const response = await axios
      .patch(`/appointments/${data.appointmentId}/drug/${data.drugIndex}`)
      .then((res) => res.data);
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.response.data.message);
  }
});

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
    builder.addCase(removeDrug.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeDrug.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(removeDrug.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  }
});

export default recommendationSlice.reducer;

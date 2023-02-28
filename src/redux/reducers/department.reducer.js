import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  data: [],
  error: ''
};

export const getDepartmentList = createAsyncThunk(
  'departments/fetchDepartments',
  async () => {
    return axios.get('http://localhost:3030/api/v1/department').then((res) => {
      return res.data;
    });
  }
);

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDepartmentList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDepartmentList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(getDepartmentList.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  }
});

export default departmentSlice.reducer;

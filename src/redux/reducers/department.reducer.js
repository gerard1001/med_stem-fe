import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios.instance';
import { toast } from 'react-toastify';

const initialState = {
  loading: false,
  data: [],
  error: ''
};

export const makeDepartment = createAsyncThunk(
  'department/add',
  async (data) => {
    const response = await axiosInstance
      .post(`${process.env.BACKEND_URL}/department`, data)
      .then((res) => {
        toast.success('successfully added department');
        res.data;
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }
);

export const getDepartmentList = createAsyncThunk(
  'departments/fetchDepartments',
  async () =>
    axiosInstance
      .get(`${process.env.BACKEND_URL}/department`)
      .then((res) => res.data)
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

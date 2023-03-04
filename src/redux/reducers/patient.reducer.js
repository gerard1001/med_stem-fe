import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  data: [],
  single_data: {},
  error: ''
};

export const getPatientList = createAsyncThunk(
  'users/fetchPatients',
  async () => {
    return axios
      .get('http://localhost:3030/api/v1/users/clients')
      .then((res) => {
        return res.data;
      });
  }
);

export const getOnePatient = createAsyncThunk(
  'users/fetchPatient',
  async (patientId) => {
    return axios
      .get(
        `http://localhost:3030/api/v1/users/clients/64fc1233-8b59-5643-8e9a-c9a8f38bf6b6`
      )
      .then((res) => {
        return res.data;
      });
  }
);

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPatientList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPatientList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(getPatientList.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
    builder.addCase(getOnePatient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOnePatient.fulfilled, (state, action) => {
      state.loading = false;
      state.single_data = action.payload;
      state.error = '';
    });
    builder.addCase(getOnePatient.rejected, (state, action) => {
      state.loading = false;
      state.single_data = {};
      state.error = action.error.message;
    });
  }
});

export default patientSlice.reducer;

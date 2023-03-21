import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios.instance';
import { toast } from 'react-toastify';

const initialState = {
  loading: false,
  data: [],
  single_data: {},
  error: ''
};

export const registerClient = createAsyncThunk(
  'users/registerClient',
  async (data) => {
    const response = await axios
      .post(`${process.env.BACKEND_URL}/users/client/register`, data)
      .then((res) => {
        res.data;
      })
      .catch((error) => {
        throw Error(error.response.data.message);
      });
  }
);

export const getPatientList = createAsyncThunk(
  'users/fetchPatients',
  async () =>
    axios
      .get(`${process.env.BACKEND_URL}/users/clients`)
      .then((res) => res.data)
);

export const getOnePatient = createAsyncThunk(
  'users/fetchPatient',
  async (patientId) =>
    axios
      .get(`${process.env.BACKEND_URL}/users/clients/${patientId}`)
      .then((res) => res.data)
);

export const deletePatientAccount = createAsyncThunk(
  'users/deletePatient',
  async (patientId) =>
    axios
      .delete(`${process.env.BACKEND_URL}/users/client/${patientId}`)
      .then((res) => {
        console.log(res.data, 'ACTION');
        res.data;
      })
);

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    updatePatientData: (state, action) => {
      state.single_data = action;
    }
  },
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
    builder.addCase(registerClient.pending, (state, action) => {
      state.loading = true;
      state.single_data = {};
    });
    builder.addCase(registerClient.fulfilled, (state, action) => {
      toast.success('Registration successful');
      state.loading = false;
      state.single_data = action.payload;
      state.error = '';
    });
    builder.addCase(registerClient.rejected, (state, action) => {
      toast.error(action.error.message);
      state.loading = false;
      state.single_data = {};
      state.error = action.error.message;
    });
    builder.addCase(deletePatientAccount.pending, (state, action) => {
      state.loading = true;
      state.single_data = {};
    });
    builder.addCase(deletePatientAccount.fulfilled, (state, action) => {
      toast.success('Successfully deleted patient');
      state.loading = false;
      state.single_data = action.payload;
      state.error = '';
    });
    builder.addCase(deletePatientAccount.rejected, (state, action) => {
      toast.error(action.error.message);
      console.log(action, 'ACTION');
      state.loading = false;
      state.single_data = {};
      state.error = action.error.message;
    });
  }
});

export const { updatePatientData } = patientSlice.actions;

export default patientSlice.reducer;

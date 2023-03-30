import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../axios/axios.instance';

const initialState = {
  loading: false,
  data: [],
  single_data: {},
  error: ''
};

export const createVacation = createAsyncThunk(
  'vacation/createVacation',
  async (data) => {
    try {
      const response = await axios.post(`/vacations`, data);
      return response;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const getDoctorVacations = createAsyncThunk(
  'vacation/doctor/get',
  async ({ id, month, year }) => {
    const params = { month, year };
    try {
      const response = await axios.get(`/vacations/doctor/${id}`, {
        params
      });
      return {
        id,
        vacations: response.data.data
      };
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const vacationAdapter = createEntityAdapter();

export const { selectById: selectVacationDoctor } =
  vacationAdapter.getSelectors((state) => state.vacations);

const vacationSlice = createSlice({
  name: 'vacation',
  initialState: vacationAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getDoctorVacations.fulfilled]: vacationAdapter.upsertOne,
    [createVacation.fulfilled]: vacationAdapter.upsertOne
  }
});

export default vacationSlice.reducer;

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

export const createDayoff = createAsyncThunk(
  'dayoff/createDayoff',
  async (data) => {
    try {
      const response = await axios.post(`/dayoffs`, data);
      return response;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const getDoctorDayoffs = createAsyncThunk(
  'dayoff/doctor/get',
  async ({ id, month, year }) => {
    const params = { month, year };
    try {
      const response = await axios.get(`/dayoffs/doctor/${id}`, {
        params
      });
      return {
        id,
        dayoffs: response.data.data
      };
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const dayOffAdapter = createEntityAdapter();

export const { selectById: selectDayoffDoctor } = dayOffAdapter.getSelectors(
  (state) => state.dayoffs
);

const dayoffSlice = createSlice({
  name: 'dayoff',
  initialState: dayOffAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getDoctorDayoffs.fulfilled]: dayOffAdapter.upsertOne,
    [createDayoff.fulfilled]: dayOffAdapter.upsertOne
  }
});

export default dayoffSlice.reducer;

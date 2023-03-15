import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios.instance';

export const getDoctorWorkDays = createAsyncThunk(
  'workDays/doctor/get',
  async ({ id, month, year }) => {
    const params = { month, year };
    try {
      const response = await axiosInstance.get(`/work_days/doctor/${id}`, {
        params
      });
      console.log(response, 'RESPONSE');
      return {
        id,
        workDays: response.data.data
      };
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const workDaysAdapter = createEntityAdapter();

export const { selectById: selectWorkDaysDoctors } =
  workDaysAdapter.getSelectors((state) => state.workDays);

const workDaysSlice = createSlice({
  name: 'workDays',
  initialState: workDaysAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getDoctorWorkDays.fulfilled]: workDaysAdapter.upsertOne
  }
});

export default workDaysSlice.reducer;

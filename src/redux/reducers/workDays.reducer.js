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
      return {
        id,
        workDays: response.data.data
      };
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const updateSheduleWorkDays = createAsyncThunk(
  'workDays/schedule/get',
  async (data) => {
    try {
      const response = await axiosInstance.patch(
        `/work_days/schedule/${data.id}`,
        data.body
      );
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
    [getDoctorWorkDays.fulfilled]: workDaysAdapter.upsertOne,
    [updateSheduleWorkDays.fulfilled]: workDaysAdapter.upsertOne
  }
});

export default workDaysSlice.reducer;

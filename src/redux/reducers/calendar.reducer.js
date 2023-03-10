import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDate: null
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, { payload }) => ({
      ...state,
      selectedDate: payload
    })
  }
});

export const { setSelectedDate } = calendarSlice.actions;

export default calendarSlice.reducer;

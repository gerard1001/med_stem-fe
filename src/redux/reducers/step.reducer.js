import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 0
};

const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    toPersonalInfo: (state) => {
      state.step = 0;
    },
    toContactInfo: (state) => {
      state.step = 1;
    },
    toMedicalHistory: (state) => {
      state.step = 2;
    }
  }
});

export const { toPersonalInfo, toContactInfo, toMedicalHistory } =
  stepSlice.actions;

export default stepSlice.reducer;

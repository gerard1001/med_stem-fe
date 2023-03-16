import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginData: null,
  selectedDoctor: null,
  selectedPatient: null,
  selectedWorkDay: null,
  searchQueryRedux: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginData: (state, { payload }) => {
      state.loginData = payload;
    },
    setSelectedDoctorDataRedux: (state, { payload }) => {
      state.selectedDoctor = payload;
    },
    setSelectedPatientDataRedux: (state, { payload }) => {
      state.selectedPatient = payload;
    },
    setSelectedWorkDay: (state, { payload }) => {
      state.selectedWorkDay = payload;
    },
    setSearchQueryRedux: (state, { payload }) => {
      state.searchQueryRedux = payload;
    }
  },
  extraReducers: {}
});

export const {
  setLoginData,
  setSelectedDoctorDataRedux,
  setSelectedPatientDataRedux,
  setSelectedWorkDay,
  setSearchQueryRedux
} = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginData: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginData: (state, { payload }) => {
      state.loginData = payload;
    }
  },
  extraReducers: {}
});

export const { setLoginData } = userSlice.actions;

export default userSlice.reducer;

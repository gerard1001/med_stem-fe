import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsersAction: (state, payload) => ({})
  }
});

export const { getUsersAction } = userSlice.actions;

export default userSlice.reducer;

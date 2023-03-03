import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsersAction: (state, payload) => {
      console.log(state, payload);
    },
    setLoggedIn: (state, payload) => {
      state.isLoggedIn = true;
    },
    setLoggedOut: (state, payload) => {
      state.isLoggedIn = false;
    }
  }
});

export const { getUsersAction, setLoggedIn, setLoggedOut } = userSlice.actions;

export default userSlice.reducer;

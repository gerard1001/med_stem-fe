import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios/axios.instance';
import { toast } from 'react-toastify';

const initialState = {
  isLoggedIn: false,
  loginData: {}
};

export const loginUser = createAsyncThunk('users/loginUser', async (data) => {
  try {
    console.log(data, 'DATA');
    const response = await axios.post(`/users/login`, data);

    if (response.status === 201) {
      localStorage.setItem(
        'userLoginData',
        JSON.stringify(response?.data?.data)
      );
    }
    console.log(response);

    return response;
  } catch (error) {
    throw Error(error.response.data.message);
  }
});

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
    },
    setLoginData: (state, payload) => {
      state.loginData = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
      state.single_data = {};
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      // alert('Signin successful');
      toast.success('Signin successful');
      console.log(action);
      console.log(state);
      state.loading = false;
      state.loginData = action.payload;
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      toast.error(action.error.message);
      console.log(action);
      state.loading = false;
      state.loginData = {};
      state.error = action.error.message;
    });
  }
});

export const { getUsersAction, setLoggedIn, setLoggedOut, setLoginData } =
  userSlice.actions;

export default userSlice.reducer;

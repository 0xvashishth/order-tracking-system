import { createSlice } from '@reduxjs/toolkit'
import { signupUser, userLogin } from './authActions'
import Cookies from "js-cookie"

const initialState = {
  loading: false,
  userInfo: localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false
      state.userInfo = null
      state.error = null
      localStorage.clear();
      Cookies.remove('token')
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload.user
      if(!payload.user)
        localStorage.removeItem("userInfo");
      else{
        localStorage.setItem("userInfo", JSON.stringify(payload.user));
      }
    },
  },
  extraReducers: builder => {
    // login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true
      state.error = null
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false
      state.userInfo = payload.user
      localStorage.setItem("userInfo", JSON.stringify(payload.user));
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
    });
    // signup user
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true
      state.error = null
    });
    builder.addCase(signupUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userInfo = payload.user;
      localStorage.setItem("userInfo", JSON.stringify(payload.user));
    });
    builder.addCase(signupUser.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
    });
  }
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer

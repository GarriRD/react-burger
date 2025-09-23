import { createSlice } from "@reduxjs/toolkit";
import userSlice, { getUser } from "./user-slice";
import { deleteCookie } from "services/utils";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    logged: false,
    loginError: null,
    sending: false,
  },
  reducers: {
    login: state => {
      state.logged = true;
      state.loginError = false;
      state.sending = false;

      return state;
    },
    logout: state => {
      deleteCookie('token');
      deleteCookie('refreshToken');

      state.logged = false;
      state.loginError = false;
      state.sending = false;

      return state;
    },
    resetSending: state => {
      state.loginError = null
      state.sending = false

      return state;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;

      return state;
    },
    setSending: (state, action) => {
      state.sending = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(getUser.pending, state => {
      state.logged = false;
      state.loginError = null;
      state.sending = true;
      
    }).addCase(getUser.fulfilled, state => {
      state.logged = true;
      state.sending = false;
      state.loginError = null;

    }).addCase(getUser.rejected, (state, action) => {
      state.logged = false;
      state.loginError = action.payload
      state.sending = false;

    }).addCase(userSlice.actions.setUser, state => {
      state.logged = true;
      state.loginError = false;
      state.sending = false;
      
    })
  }
})


export default authSlice;
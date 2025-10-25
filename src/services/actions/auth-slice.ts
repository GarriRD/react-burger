import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import userSlice, { getUser } from "./user-slice";
import { deleteCookie } from "services/utils";

type SliceState = {
  logged: Boolean;
  loginError: string | null;
  sending: Boolean;
}

const login: CaseReducer<SliceState, PayloadAction<void>> = state => {
  state.logged = true;
  state.loginError = null;
  state.sending = false;

  return state;
};

const logout: CaseReducer<SliceState, PayloadAction<void>> = state => {
  deleteCookie('token');
  deleteCookie('refreshToken');

  state.logged = false;
  state.loginError = null;
  state.sending = false;

  return state;
};

const resetSending: CaseReducer<SliceState, PayloadAction<void>> = state => {
  state.loginError = null
  state.sending = false

  return state;
};

const setLoginError: CaseReducer<SliceState, PayloadAction<string>> = (state, action) => {
  state.loginError = action.payload;

  return state;
};

const setSending: CaseReducer<SliceState, PayloadAction<boolean>> = (state, action) => {
  state.sending = action.payload;
};

export const initState: SliceState = {
  logged: false,
  loginError: null,
  sending: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    login,
    logout,
    resetSending,
    setLoginError,
    setSending
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
      state.loginError = action.payload ? action.payload : null;
      state.sending = false;

    }).addCase(userSlice.actions.setUser, state => {
      state.logged = true;
      state.loginError = null;
      state.sending = false;
      
    })
  }
})


export default authSlice;
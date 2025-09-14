import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser, patchUser, renewToken } from "services/auth";
import { getCookie, setCookie } from "services/utils";
import authSlice from "./auth-slice";


const tokenThunk = async (abortSignal, thunkApi) => {
  let token = getCookie('token');

  if(!token) {
    const refreshToken = getCookie('refreshToken');
    
    if(!refreshToken) {
      return { success: false, payload: 'Необходима авторизация' };
    }
    
    const newToken = await renewToken(refreshToken, abortSignal);
    if(!newToken.success) {
      return { success: false, payload: 'Необходима авторизация' };
    }
    setCookie('token', newToken.accessToken, { expires: 20 * 60 });
    setCookie('refreshToken', newToken.refreshToken, { expires: 24 * 60 * 60 });
    token = newToken.accessToken;
  }

  return {success: true, payload: token};
};

const getUser = createAsyncThunk('user/get', 
  async (abortSignal, thunkApi) => {
    
    let token = await tokenThunk(abortSignal, thunkApi);
    
    if(!token.success) {
      return thunkApi.rejectWithValue(token.payload);
    }

    const user = await fetchUser(token.payload, abortSignal);

    if(!user.success) {
      return thunkApi.rejectWithValue(user.message);
    }
    
    return user.user;
});


const updateUser = createAsyncThunk('user/patch',
  async ([userForm, abortSignal], thunkApi) => {
    let token = await tokenThunk(abortSignal, thunkApi);

    if(!token.success) {
      return token.payload;
    }

    const user = await patchUser(token.payload, userForm, abortSignal);
    if(!user.success) {
      return thunkApi.rejectWithValue(user.message);
    }

    return user.user;

  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    refreshing: false,
    refreshError: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.refreshing = false;
      state.refreshError = null;

      return state;
    }
  },
  extraReducers: builder => {
    builder.addCase(updateUser.pending, state => {
      state.refreshing = true;
      state.refreshError = null;

    }).addCase(updateUser.fulfilled, (state, action) => {
      state.refreshing = false;
      state.refreshError = null;
      state.user = action.payload;

    }).addCase(updateUser.rejected, (state, action) => {
      state.refreshing = false;
      state.refreshError = action.payload;

    }).addCase(authSlice.actions.logout, state => {
      state.user = null;
      state.refreshing = false;
      state.refreshError = false;

    }).addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.refreshing = false;
      state.refreshError = null;
    })
  }
});

export default userSlice;
export { getUser, updateUser };
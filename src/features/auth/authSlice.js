import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'features/api/axioInstance';
import { getToken, setToken } from 'helper/getToken';
import { showToast } from 'utils/ToastProvider';

const initialState = {
  user: null,
  loading: false,
  token: getToken()
};

export const loginUserAsync = createAsyncThunk('auth/loginUser', async (loginCredential) => {
  const response = await axiosInstance.post('/auth/signin', loginCredential);
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.clear();
      state.user = null;
      state.token = null;
      window.location.reload();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          setToken(action.payload.data.data?.token);
          localStorage.setItem('loggedinUser', btoa(JSON.stringify(action.payload.data.data)));
          showToast(action?.payload?.data?.message, 'success');
        }
        state.loading = false;
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

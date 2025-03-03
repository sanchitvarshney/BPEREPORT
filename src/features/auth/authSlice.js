import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'features/api/axioInstance';
import { getToken, setToken } from 'helper/getToken';
import { showToast } from 'utils/ToastProvider';

const initialState = {
  user: null,
  loading: false,
  token: getToken(),
  sendVarificationcodeloading: false,
  resetPasswordLoading: false,
  qrStatus: null
};

export const loginUserAsync = createAsyncThunk('auth/loginUser', async (loginCredential) => {
  const response = await axiosInstance.post('/auth/signin', loginCredential);
  return response;
});

export const resetPasswordAsync = createAsyncThunk('auth/updatePassword', async (paylaod) => {
  const response = await axiosInstance.put('/user/update-password', paylaod);
  return response;
});
export const sendVerificationCodeAsync = createAsyncThunk('auth/getPasswordOtp', async (payload) => {
  const response = await axiosInstance.get('/user/get-password-otp/', {
    params: {
      emailId: payload.emailId
    }
  });
  return response;
});

export const verifyOtpAsync = createAsyncThunk("auth/verifyOtpAsync", async (paylaod) => {
  const response = await axiosInstance.post("/auth/verify", paylaod);
  return response;
})

export const getQRStatus = createAsyncThunk("auth/getQRStatus", async () => {
  const response = await axiosInstance.get(`auth/qrCode`);
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
        if(!action.payload.data.data){
          state.qrStatus = action.payload.data;
          localStorage.setItem('qrStatus', (JSON.stringify(action.payload.data)));
        }
        state.loading = false;
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(verifyOtpAsync.pending, (state) => {
        state.qrCodeLoading = true;
      })
      .addCase(verifyOtpAsync.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          setToken(action.payload.data.data?.token);

          localStorage.setItem("loggedinUser", btoa(JSON.stringify(action.payload.data.data)));
        }
        if(!action.payload.data.data){
          state.qrStatus = action.payload.data;
        }
        state.qrCodeLoading = false;
      })
      .addCase(verifyOtpAsync.rejected, (state) => {
        state.qrCodeLoading = false;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.resetPasswordLoading = true;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          showToast(action?.payload?.data?.message, 'success');
        }
        state.resetPasswordLoading = false;
      })
      .addCase(resetPasswordAsync.rejected, (state) => {
        state.resetPasswordLoading = false;
      })
      .addCase(sendVerificationCodeAsync.pending, (state) => {
        state.sendVarificationcodeloading = true;
      })
      .addCase(sendVerificationCodeAsync.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          showToast(action?.payload?.data?.message, 'success');
        }
        state.sendVarificationcodeloading = false;
      })
      .addCase(sendVerificationCodeAsync.rejected, (state) => {
        state.sendVarificationcodeloading = false;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'features/api/axioInstance';

const initialState = {
  totalProductLoading: false,
  totalProduct: null,
  totalComponentLoading: false,
  totalComponent: null,
  deviceOnLocation: null,
  deviceOnLocationLoading: false
};

export const getTotalProduct = createAsyncThunk('totalDevice/gettotaldevice', async (payload) => {
  const response = await axiosInstance.get(`/bpe/dashboard/device/deviceInCompany?startDate=${payload.from}&endDate=${payload.to}`);
  return response;
});
export const getTotalComponent = createAsyncThunk('totalDevice/getTotalComponent', async (payload) => {
  const response = await axiosInstance.get(`/bpe/dashboard/component/componentInCompany?startDate=${payload.from}&endDate=${payload.to}`);
  return response;
});
export const getdeviceOnLocation = createAsyncThunk('totalDevice/getdeviceOnLocation', async (payload) => {
  const response = await axiosInstance.get(`/bpe/dashboard/device/deviceLocation?startDate=${payload.from}&endDate=${payload.to}`);
  return response;
});
const reportSlice = createSlice({
  name: 'totalDevice',
  initialState,
  reducers: {
    clearTotalDevice: (state) => {
      state.totalProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalProduct.pending, (state) => {
        state.totalProductLoading = true;
        state.totalProduct = null;
      })
      .addCase(getTotalProduct.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.totalProduct = action.payload.data.data;
        }
        state.totalProductLoading = false;
      })
      .addCase(getTotalProduct.rejected, (state) => {
        state.totalProductLoading = false;
        state.totalProduct = null;
      })
      .addCase(getTotalComponent.pending, (state) => {
        state.totalComponentLoading = true;
        state.totalComponent = null;
      })
      .addCase(getTotalComponent.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.totalComponent = action.payload.data.data;
        }
        state.totalComponentLoading = false;
      })
      .addCase(getTotalComponent.rejected, (state) => {
        state.totalComponentLoading = false;
        state.totalComponent = null;
      })
      .addCase(getdeviceOnLocation.pending, (state) => {
        state.deviceOnLocationLoading = true;
        state.deviceOnLocation = null;
      })
      .addCase(getdeviceOnLocation.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.deviceOnLocation = action.payload.data.data;
        }
        state.deviceOnLocationLoading = false;
      })
      .addCase(getdeviceOnLocation.rejected, (state) => {
        state.deviceOnLocationLoading = false;
        state.deviceOnLocation = null;
      });
  }
});

export const { clearTotalDevice } = reportSlice.actions;
export default reportSlice.reducer;

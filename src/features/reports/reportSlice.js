import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'features/api/axioInstance';

const initialState = {
  totalProductLoading: false,
  totalProduct: null,
  totalComponentLoading: false,
  totalComponent: null,
  deviceOnLocation: null,
  deviceOnLocationLoading: false,
  totalComponentInBPE: null,
  totalComponentInBPELoading: false,
  totalComponentInMSC: null,
  totalComponentInMSCLoading: false,
  totalDispatchDevices: null,
  totalDispatchDevicesLoading: false,
  componentReportLoading: false,
};

export const getTotalProduct = createAsyncThunk('totalDevice/gettotaldevice', async (payload) => {
  const response = await axiosInstance.get(
    `/bpe/dashboard/device/deviceInCompany?startDate=${payload?.from}&endDate=${payload?.to}&type=${payload?.type}`
  );
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
export const getTotalComponentInBPE = createAsyncThunk('totalDevice/getTotalComponentInBPE', async (payload) => {
  const response = await axiosInstance.get(`/bpe/dashboard/component/componentInBPE?startDate=${payload.from}&endDate=${payload.to}`);
  return response;
});
export const getTotalComponentInMSC = createAsyncThunk('totalDevice/getTotalComponentInMSC', async (payload) => {
  const response = await axiosInstance.get(`/bpe/dashboard/component/componentInMsc?startDate=${payload.from}&endDate=${payload.to}`);
  return response;
});
export const getTotalDispatchDevices = createAsyncThunk('totalDevice/getTotalDispatchDevices', async (payload) => {
  const response = await axiosInstance.get(`/bpe/dashboard/dishpatch/dishpatchInCompany?startDate=${payload.from}&endDate=${payload.to}`);
  return response;
});
export const getComponentReport = createAsyncThunk('totalDevice/getComponentReport', async (payload) => {
  const response = await axiosInstance.get(`/bpe/dashboard/component/componentReport?startDate=${payload.from}&endDate=${payload.to}`);
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
      })
      .addCase(getTotalComponentInBPE.pending, (state) => {
        state.totalComponentInBPELoading = true;
        state.totalComponentInBPE = null;
      })
      .addCase(getTotalComponentInBPE.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.totalComponentInBPE = action.payload.data.data;
        }
        state.totalComponentInBPELoading = false;
      })
      .addCase(getTotalComponentInBPE.rejected, (state) => {
        state.totalComponentInBPELoading = false;
        state.totalComponentInBPE = null;
      })
      .addCase(getTotalComponentInMSC.pending, (state) => {
        state.totalComponentInMSCLoading = true;
        state.totalComponentInMSC = null;
      })
      .addCase(getTotalComponentInMSC.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.totalComponentInMSC = action.payload.data.data;
        }
        state.totalComponentInMSCLoading = false;
      })
      .addCase(getTotalComponentInMSC.rejected, (state) => {
        state.totalComponentInMSCLoading = false;
        state.totalComponentInMSC = null;
      })
      .addCase(getTotalDispatchDevices.pending, (state) => {
        state.totalDispatchDevicesLoading = true;
        state.totalDispatchDevices = null;
      })
      .addCase(getTotalDispatchDevices.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.totalDispatchDevices = action.payload.data.data;
        }
        state.totalDispatchDevicesLoading = false;
      })
      .addCase(getTotalDispatchDevices.rejected, (state) => {
        state.totalDispatchDevicesLoading = false;
        state.totalDispatchDevices = null;
      })
      .addCase(getComponentReport.pending, (state) => {
        state.componentReportLoading = true;
        state.componentReport = null;
      })
      .addCase(getComponentReport.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.componentReport = action.payload.data;
        }
        state.componentReportLoading = false;
      })
      .addCase(getComponentReport.rejected, (state) => {
        state.componentReportLoading = false;
        state.componentReport = null;
      });
  }
});

export const { clearTotalDevice } = reportSlice.actions;
export default reportSlice.reducer;

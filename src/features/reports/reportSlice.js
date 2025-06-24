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
  serialNoForCompanyData: null,
  serialNoForCompanyDataLoading: false,
  totalBERDevices: null,
  totalBERDevicesLoading: false,
  dispatchDataReport: null,
  componentSummaryLoading: false,
  componentSummary: null,
  rejectionReportLoading: false,
  rejectionReport: null,
  bpeIssue: null,
  bpeIssueLoading: false,
  bpeIssueResolveLoading: false,
  wrongDeviceDetail: null,
  wrongDeviceDetailLoading: false,
  getMINReportData: null,
  minReportLoading: false,
  componentsOnLocation: null,
  componentsOnLocationLoading: false,
  issueReportData: null,
  issueReportLoading: false,
  uploadIssueExcelLoading: false,
  updateIssueExcelLoading: false,
  deviceAnalysisReport: null,
  deviceAnalysisReportLoading: false,
  trcReport: null,
  trcReportLoading: false,
  dispatchreport: null,
  dispatchreportLoading: false,
  batteryQcData: null,
  batteryQcLoading: false,
  swipeMachineReport: null,
  swipeMachineReportLoading: false,
  swipeMachineReportPage: 1,
  swipeMachineReportTotalPages: 0,
  swipeMachineReportTotalRecords: 0,
  swipeFunctionalReport: null,
  swipeFunctionalReportLoading: false,
  swipeFunctionalReportPage: 1,
  swipeFunctionalReportTotalPages: 0,
  swipeFunctionalReportTotalRecords: 0,
  allComponentReportLoading: false,
  totalRecords: 0,
  totalPages: 0
};

export const getTotalProduct = createAsyncThunk('totalDevice/gettotaldevice', async (payload) => {
  const response = await axiosInstance.get(
    `/bpe/dashboard/device/deviceInCompany?startDate=${payload?.from}&endDate=${payload?.to}&type=${payload?.type}&deviceType=${payload?.deviceType}`
  );
  return response;
});

export const getWrongDeviceDetail = createAsyncThunk('totalDevice/getWrongDeviceDetail', async (payload) => {
  const { from, to, partner, page = 1, limit = 10 } = payload;
  const response = await axiosInstance.get(
    `/wrongDevice/fetch/?fromDate=${from}&toDate=${to}&deliveryPartner=${partner}&page=${page}&limit=${limit}`
  );
  return response;
});

export const getMINReport = createAsyncThunk('report/getMINReport', async (payload) => {
  const response = await axiosInstance.get(
    `/deviceMinV2/deviceInwardReport?fromDt=${payload.from}&toDt=${payload.to}&partner=${payload.partner}&page=${payload.page}&limit=${payload.limit}`
  );
  return response;
});

export const getTotalComponent = createAsyncThunk('totalDevice/getTotalComponent', async (payload) => {
  const response = await axiosInstance.get(`/bpe/dashboard/component/componentInCompany?startDate=${payload.from}&endDate=${payload.to}&page=${payload.page}&limit=${payload.limit}`);
  return response;
});

export const getdeviceOnLocation = createAsyncThunk('totalDevice/getdeviceOnLocation', async (payload) => {
  const response = await axiosInstance.get(
    `/bpe/dashboard/device/${payload.url}?startDate=${payload.from}&endDate=${payload.to}&type=${payload.type}`
  );
  return response;
});
export const getComponentsOnLocation = createAsyncThunk('totalDevice/getComponentsOnLocation', async (payload) => {
  const response = await axiosInstance.get(
    `/bpe/dashboard/component/componentDepartmentWiseStock?startDate=${payload.from}&endDate=${payload.to}`
  );
  return response;
});
export const getTotalComponentInBPE = createAsyncThunk('totalDevice/getTotalComponentInBPE', async (payload) => {
  const response = await axiosInstance.get(`/bpe/dashboard/component/componentInBPE?startDate=${payload.from}&endDate=${payload.to}&page=${payload.page}&limit=${payload.limit}`);
  return response;
});
export const getTotalComponentInMSC = createAsyncThunk('totalDevice/getTotalComponentInMSC', async (payload) => {
  const response = await axiosInstance.get(`/bpe/dashboard/component/componentInMsc?startDate=${payload.from}&endDate=${payload.to}&page=${payload.page}&limit=${payload.limit}`);
  return response;
});
export const getTotalDispatchDevices = createAsyncThunk('totalDevice/getTotalDispatchDevices', async (payload) => {
  const response = await axiosInstance.get(
    `/bpe/dashboard/dishpatch/dishpatchInCompany?startDate=${payload.from}&endDate=${payload.to}&type=${payload.type}`
  );
  return response;
});
export const getComponentSummary = createAsyncThunk('totalDevice/getComponentSummary', async (payload) => {
  const response = await axiosInstance.get(
    `/bpe/dashboard/component/componentSummaryReport?startDate=${payload.from}&endDate=${payload.to}&loc_out=${payload.location}&page=${payload.page}&limit=${payload.limit}`
  );
  return response;
});
export const getRejectionReport = createAsyncThunk('totalDevice/getRejectionReport', async (payload) => {
  const response = await axiosInstance.get(`/report/r11?issue_type=${payload.issueType}&from_date=${payload.from}&to_date=${payload.to}`);
  return response;
});
export const getTotalBERDevices = createAsyncThunk('totalDevice/getTotalBERDevices', async (payload) => {
  const response = await axiosInstance.get(`/bpe/dashboard/device/deviceInBer?startDate=${payload.from}&endDate=${payload.to}`);
  return response;
});
export const getComponentReport = createAsyncThunk('totalDevice/getComponentReport', async (payload) => {
  const response = await axiosInstance.get(
    `/bpe/dashboard/component/componentReport?startDate=${payload.from}&endDate=${payload.to}&deviceType=${payload.type}&page=${payload.page}&limit=${payload.limit}`
  );
  return response;
});

// export const getAllComponentReport = createAsyncThunk('totalDevice/getAllComponentReport', async (payload) => {
//   const response = await axiosInstance.get(
//     `/bpe/dashboard/component/componentReport/download?startDate=${payload.from}&endDate=${payload.to}&deviceType=${payload.type}`
//   );
//   return response;
// });

export const getAllComponentReport = createAsyncThunk('totalDevice/getAllComponentReport', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(
      `/bpe/dashboard/component/componentReport/download?startDate=${data.from}&endDate=${data.to}&deviceType=${data.type}`,
      {
        responseType: 'blob'
      }
    );

    // Create blob URL and trigger download
    const blob = new Blob([response.data], { type: 'application/zip' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Report_${data.type}.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    // Return success response
    return {
      success: true,
      data: null,
      message: 'ZIP downloaded successfully'
    };
  } catch (error) {
    // Return error response using rejectWithValue
    return rejectWithValue({
      success: false,
      data: null,
      message: error.message || 'Failed to download ZIP',
      error: error
    });
  }
});

export const getBatteryQCReport = createAsyncThunk('totalDevice/getBatteryQCReport', async (payload) => {
  const response = await axiosInstance.get(`/report/r3BatteryQcReport?fromDate=${payload.from}&toDate=${payload.to}&limit=${payload.limit}&page=${payload.page}`);
  return response;
});

export const getTrcComponentReport = createAsyncThunk('totalDevice/getTrcComponentReport', async (payload) => {
  const response = await axiosInstance.get(`/bpe/dashboard/component/trcConsumptionReport?from=${payload.from}&to=${payload.to}&page=${payload.page}&limit=${payload.limit}`);
  return response;
});

export const getDeviceSummary = createAsyncThunk('query/getDeviceSummary', async (id) => {
  const response = await axiosInstance.get(`/query/q6/devicetimeline?srlOrImei=${id}`);
  return response;
});

export const getDeviceSerialNoForCompany = createAsyncThunk('totalDevice/getDeviceSerialNoForCompany', async (payload) => {
  const response = await axiosInstance.get(
    `/bpe/dashboard/device/deviceSerialNoForCompany?startDate=${payload.from}&endDate=${payload.to}&device_key=${payload.deviceKey}&type=${payload.type}`
  );
  return response;
});
export const getDispatchDeviceSerialNo = createAsyncThunk('totalDevice/getDispatchDeviceSerialNo', async (payload) => {
  const response = await axiosInstance.get(
    `/bpe/dashboard/dishpatch/deviceSerialNoForDispatch?startDate=${payload.from}&endDate=${payload.to}&deviceKey=${payload.deviceKey}`
  );
  return response;
});

export const getBpeIssue = createAsyncThunk('totalDevice/getBpeIssue', async (payload) => {
  const response = await axiosInstance.get(`/bpeIssue/getIssue?startDate=${payload.from}&endDate=${payload.to}`);
  return response;
});

export const getBpeIssueReport = createAsyncThunk('totalDevice/getBpeIssueReport', async (payload) => {
  const response = await axiosInstance.get(`/bpeIssue/report?startDate=${payload.from}&endDate=${payload.to}&page=${payload.page}&limit=${payload.limit}`);
  return response;
});

export const getIssueExcel = createAsyncThunk('totalDevice/getIssueExcel', async (payload) => {
  const response = await axiosInstance.get(`/bpeIssue/getIssueExcel?startDate=${payload.from}&endDate=${payload.to}`);
  return response;
});

export const updateIssueExcel = createAsyncThunk('totalDevice/updateIssueExcel', async (payload) => {
  const response = await axiosInstance.post(`/bpeIssue/updateIssue`, payload);
  return response;
});

export const getDeviceAnalysis = createAsyncThunk('report/getR13Report', async (payload) => {
  const response = await axiosInstance.get(`/analytics/device/report?fromDate=${payload.from}&toDate=${payload.to}`);
  return response;
});

export const uploadIssueExcel = createAsyncThunk('totalDevice/uploadIssueExcel', async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance.post(`/bpeIssue/uploadIssue`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data' // Set appropriate headers
    }
  });
  return response;
});

export const solvedBpeIssue = createAsyncThunk('totalDevice/solvedBpeIssue', async (payload) => {
  const response = await axiosInstance.post(`/bpeIssue/solvedIssue`, payload);
  return response;
});

export const getBERDeviceSerialNo = createAsyncThunk('totalDevice/getBERDeviceSerialNo', async (payload) => {
  const response = await axiosInstance.get(
    `/bpe/dashboard/device/deviceSerialNoForBer?startDate=${payload.from}&endDate=${payload.to}&deviceKey=${payload.deviceKey}`
  );
  return response;
});

export const getr5Report = createAsyncThunk('report/getr5Report', async (query) => {
  const response = await axiosInstance.get(
    query.type === 'DEVICE'
      ? `/report/r5/DEVICE?deviceId=${query.device}`
      : `/report/r5/DATE?from=${query.from}&to=${query.to}&type=${query.type}&page=${query.page}&limit=${query.limit}`
  );
  return response;
});

export const getSwipeMachineReport = createAsyncThunk('report/getSwipeMachineReport', async (payload) => {
  const response = await axiosInstance.get(
    `/swipeMachine/report/${payload.partnerValue}?fromDate=${payload.fromDate}&toDate=${payload.toDate}&page=${payload.page}&limit=${payload.limit}`
  );
  return response;
});

export const getSwipeFunctionalReport = createAsyncThunk('report/getSwipeFunctionalReport', async (payload) => {
  const response = await axiosInstance.get(
    `/swipeMachine/report?startDate=${payload.fromDate}&endDate=${payload.toDate}&page=${payload.page}&limit=${payload.limit}&device=${payload.deviceId}&type=${payload.type}`
  );
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
      .addCase(getr5Report.pending, (state) => {
        state.dispatchreportLoading = true;
        state.dispatchreport = null;
      })
      .addCase(getr5Report.fulfilled, (state, action) => {
        state.dispatchreportLoading = false;
        if (action.payload.data.success) {
          state.dispatchreport = action.payload.data;
        }
      })
      .addCase(getr5Report.rejected, (state) => {
        state.dispatchreportLoading = false;
        state.dispatchreport = null;
      })
      .addCase(getBatteryQCReport.pending, (state) => {
        state.batteryQcLoading = true;
        state.batteryQcData = null;
      })
      .addCase(getBatteryQCReport.fulfilled, (state, action) => {
        state.batteryQcLoading = false;
        if (action.payload.data.success) {
          state.batteryQcData = action.payload.data;
        }
      })
      .addCase(getBatteryQCReport.rejected, (state, action) => {
        state.batteryQcLoading = false;
        state.batteryQcData = null;
      })
      .addCase(getWrongDeviceDetail.pending, (state) => {
        state.wrongDeviceDetailLoading = true;
        // state.wrongDeviceDetail = null;
      })
      .addCase(getWrongDeviceDetail.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.wrongDeviceDetail = action.payload.data;
        }
        state.wrongDeviceDetailLoading = false;
      })
      .addCase(getWrongDeviceDetail.rejected, (state) => {
        state.wrongDeviceDetailLoading = false;
        // state.wrongDeviceDetail = null;
      })
      .addCase(getDeviceAnalysis.pending, (state) => {
        state.deviceAnalysisReportLoading = true;
        state.deviceAnalysisReport = null;
      })
      .addCase(getDeviceAnalysis.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.deviceAnalysisReport = action.payload.data.data;
        }
        state.deviceAnalysisReportLoading = false;
      })
      .addCase(getDeviceAnalysis.rejected, (state) => {
        state.deviceAnalysisReportLoading = false;
        state.deviceAnalysisReport = null;
      })
      .addCase(getDeviceSummary.pending, (state) => {
        state.deviceSummaryLoading = true;
        state.deviceSummary = null;
      })
      .addCase(getDeviceSummary.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.deviceSummary = action.payload.data.data;
        }
        state.deviceSummaryLoading = false;
      })
      .addCase(getDeviceSummary.rejected, (state) => {
        state.deviceSummaryLoading = false;
        state.deviceSummary = null;
      })
      .addCase(getBpeIssueReport.pending, (state) => {
        state.issueReportDataLoading = true;
        state.issueReportData = null;
      })
      .addCase(getBpeIssueReport.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.issueReportData = action.payload.data;
        }
        state.issueReportDataLoading = false;
      })
      .addCase(getBpeIssueReport.rejected, (state) => {
        state.issueReportDataLoading = false;
        state.issueReportData = null;
      })
      .addCase(updateIssueExcel.pending, (state) => {
        state.updateIssueExcelLoading = true;
      })
      .addCase(updateIssueExcel.fulfilled, (state) => {
        state.updateIssueExcelLoading = false;
      })
      .addCase(updateIssueExcel.rejected, (state) => {
        state.updateIssueExcelLoading = false;
      })
      .addCase(uploadIssueExcel.pending, (state) => {
        state.uploadIssueExcelLoading = true;
      })
      .addCase(uploadIssueExcel.fulfilled, (state) => {
        state.uploadIssueExcelLoading = false;
      })
      .addCase(uploadIssueExcel.rejected, (state) => {
        state.uploadIssueExcelLoading = false;
      })
      .addCase(getMINReport.pending, (state) => {
        state.minReportLoading = true;
        // state.getMINReportData = null;
      })
      .addCase(getMINReport.fulfilled, (state, action) => {
        state.minReportLoading = false;
        if (action.payload.data.success) {
          state.getMINReportData = action.payload.data;
        }
      })
      .addCase(getMINReport.rejected, (state) => {
        state.minReportLoading = false;
        // state.getMINReportData = null;
      })
      .addCase(getTotalComponent.pending, (state) => {
        state.totalComponentLoading = true;
        // state.totalComponent = null;
      })
      .addCase(getTotalComponent.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.totalComponent = action.payload.data;
        }
        state.totalComponentLoading = false;
      })
      .addCase(getTotalComponent.rejected, (state) => {
        state.totalComponentLoading = false;
        // state.totalComponent = null;
      })
      .addCase(getBpeIssue.pending, (state) => {
        state.bpeIssueLoading = true;
        state.bpeIssue = null;
      })
      .addCase(getBpeIssue.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.bpeIssue = action.payload.data.data;
        }
        state.bpeIssueLoading = false;
      })
      .addCase(getBpeIssue.rejected, (state) => {
        state.bpeIssueLoading = false;
        state.bpeIssue = null;
      })
      .addCase(getDeviceSerialNoForCompany.pending, (state) => {
        state.serialNoForCompanyDataLoading = true;
        state.serialNoForCompanyData = null;
      })
      .addCase(getDeviceSerialNoForCompany.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.serialNoForCompanyData = action.payload.data.data;
        }
        state.serialNoForCompanyDataLoading = false;
      })
      .addCase(getDeviceSerialNoForCompany.rejected, (state) => {
        state.serialNoForCompanyDataLoading = false;
        state.serialNoForCompanyData = null;
      })
      .addCase(solvedBpeIssue.pending, (state) => {
        state.bpeIssueResolveLoading = true;
        state.serialNoForCompanyData = null;
      })
      .addCase(solvedBpeIssue.fulfilled, (state) => {
        state.bpeIssueResolveLoading = false;
      })
      .addCase(solvedBpeIssue.rejected, (state) => {
        state.bpeIssueResolveLoading = false;
        state.serialNoForCompanyData = null;
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
      .addCase(getComponentsOnLocation.pending, (state) => {
        state.componentOnLocationLoading = true;
        state.componentsOnLocation = null;
      })
      .addCase(getComponentsOnLocation.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.componentsOnLocation = action.payload.data.data;
        }
        state.componentOnLocationLoading = false;
      })
      .addCase(getComponentsOnLocation.rejected, (state) => {
        state.componentOnLocationLoading = false;
        state.componentsOnLocation = null;
      })
      .addCase(getTotalComponentInBPE.pending, (state) => {
        state.totalComponentInBPELoading = true;
        // state.totalComponentInBPE = null;
      })
      .addCase(getTotalComponentInBPE.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.totalComponentInBPE = action.payload.data;
        }
        state.totalComponentInBPELoading = false;
      })
      .addCase(getTotalComponentInBPE.rejected, (state) => {
        state.totalComponentInBPELoading = false;
        // state.totalComponentInBPE = null;
      })
      .addCase(getTotalComponentInMSC.pending, (state) => {
        state.totalComponentInMSCLoading = true;
        // state.totalComponentInMSC = null;
      })
      .addCase(getTotalComponentInMSC.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.totalComponentInMSC = action.payload.data;
        }
        state.totalComponentInMSCLoading = false;
      })
      .addCase(getTotalComponentInMSC.rejected, (state) => {
        state.totalComponentInMSCLoading = false;
        // state.totalComponentInMSC = null;
      })
      .addCase(getTotalDispatchDevices.pending, (state) => {
        state.dispatchDataReportLoading = true;
        state.dispatchDataReport = null;
      })
      .addCase(getTotalDispatchDevices.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.dispatchDataReport = action.payload.data.data;
        }
        state.dispatchDataReportLoading = false;
      })
      .addCase(getTotalDispatchDevices.rejected, (state) => {
        state.dispatchDataReport = false;
        state.dispatchDataReportLoading = null;
      })
      .addCase(getDispatchDeviceSerialNo.pending, (state) => {
        state.totalDispatchDevicesLoading = true;
        state.totalDispatchDevices = null;
      })
      .addCase(getDispatchDeviceSerialNo.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.totalDispatchDevices = action.payload.data.data;
        }
        state.totalDispatchDevicesLoading = false;
      })
      .addCase(getDispatchDeviceSerialNo.rejected, (state) => {
        state.totalDispatchDevicesLoading = false;
        state.totalDispatchDevices = null;
      })
      .addCase(getRejectionReport.pending, (state) => {
        state.rejectionReportLoading = true;
        state.rejectionReport = null;
      })
      .addCase(getRejectionReport.fulfilled, (state, action) => {
        // if (action.payload.data.success) {
        state.rejectionReport = action.payload.data;
        // }
        state.rejectionReportLoading = false;
      })
      .addCase(getRejectionReport.rejected, (state) => {
        state.rejectionReportLoading = false;
        state.rejectionReport = null;
      })
      .addCase(getComponentSummary.pending, (state) => {
        state.componentSummaryLoading = true;
        // state.componentSummary = null;
      })
      .addCase(getComponentSummary.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.componentSummary = action.payload.data;
        }
        state.componentSummaryLoading = false;
      })
      .addCase(getComponentSummary.rejected, (state) => {
        state.componentSummaryLoading = false;
        // state.componentSummary = null;
      })
      .addCase(getTotalBERDevices.pending, (state) => {
        state.totalBERReportLoading = true;
        state.BERReportData = null;
      })
      .addCase(getTotalBERDevices.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.BERReportData = action.payload.data.data;
        }
        state.totalBERReportLoading = false;
      })
      .addCase(getTotalBERDevices.rejected, (state) => {
        state.totalBERReportLoading = false;
        state.BERReportData = null;
      })
      .addCase(getBERDeviceSerialNo.pending, (state) => {
        state.totalBERDevicesLoading = true;
        state.totalBERDevices = null;
      })
      .addCase(getBERDeviceSerialNo.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.totalBERDevices = action.payload.data.data;
        }
        state.totalBERDevicesLoading = false;
      })
      .addCase(getBERDeviceSerialNo.rejected, (state) => {
        state.totalBERDevicesLoading = false;
        state.totalBERDevices = null;
      })
      .addCase(getComponentReport.pending, (state) => {
        state.componentReportLoading = true;
        // state.componentReport = null;
      })
      .addCase(getComponentReport.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.componentReport = action.payload.data;
        }
        state.componentReportLoading = false;
      })
      .addCase(getComponentReport.rejected, (state) => {
        state.componentReportLoading = false;
        // state.componentReport = null;
      })
      .addCase(getAllComponentReport.pending, (state) => {
        state.allComponentReportLoading = true;
      })
      .addCase(getAllComponentReport.fulfilled, (state, action) => {
        state.allComponentReportLoading = false;
      })
      .addCase(getAllComponentReport.rejected, (state) => {
        state.allComponentReportLoading = false;
      })
      .addCase(getTrcComponentReport.pending, (state) => {
        state.trcReportLoading = true;
        // state.trcReport = null;
      })
      .addCase(getTrcComponentReport.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.trcReport = action.payload.data;
        }
        state.trcReportLoading = false;
      })
      .addCase(getTrcComponentReport.rejected, (state) => {
        state.trcReportLoading = false;
        // state.trcReport = null;
      })
      .addCase(getSwipeMachineReport.pending, (state) => {
        state.swipeMachineReportLoading = true;
        state.swipeMachineReport = null;
      })
      .addCase(getSwipeMachineReport.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.swipeMachineReport = action.payload.data.data;
          state.swipeMachineReportPage = action.payload.data.page;
          state.swipeMachineReportTotalPages = action.payload.data.totalPages;
          state.swipeMachineReportTotalRecords = action.payload.data.totalRecords;
        }
        state.swipeMachineReportLoading = false;
      })
      .addCase(getSwipeMachineReport.rejected, (state) => {
        state.swipeMachineReportLoading = false;
        state.swipeMachineReport = null;
      })
      .addCase(getSwipeFunctionalReport.pending, (state) => {
        state.swipeFunctionalReportLoading = true;
        state.swipeFunctionalReport = null;
      })
      .addCase(getSwipeFunctionalReport.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.swipeFunctionalReport = action.payload.data.data;
          state.swipeFunctionalReportPage = action.payload.data.page;
          state.swipeFunctionalReportTotalPages = action.payload.data.totalPages;
          state.swipeFunctionalReportTotalRecords = action.payload.data.totalRecords;
        }
        state.swipeFunctionalReportLoading = false;
      })
      .addCase(getSwipeFunctionalReport.rejected, (state) => {
        state.swipeFunctionalReportLoading = false;
        state.swipeFunctionalReport = null;
      });
  }
});

export const { clearTotalDevice } = reportSlice.actions;
export default reportSlice.reducer;

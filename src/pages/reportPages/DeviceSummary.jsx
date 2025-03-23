import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getDeviceSummary } from 'features/reports/reportSlice';
import { Download } from '@mui/icons-material';
import { exportToExcel } from 'helper/excelExport';
import DeviceSummaryTable from 'components/table/DeviceSummaryTable';

const DeviceSummary = () => {
  const { deviceSummaryLoading, deviceSummary } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [imei, setImei] = useState();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <TextField label="Enter IMEI/Serial No" value={imei} onChange={(e) => setImei(e.target.value)} />

        <LoadingButton
          loading={deviceSummaryLoading}
          onClick={() => {
            dispatch(getDeviceSummary(imei));
          }}
          variant="contained"
        >
          <FilterAltOutlinedIcon fontSize={'small'} sx={{ mr: '10px' }} />
          Search
        </LoadingButton>
        <Button
          disabled={!deviceSummary}
          variant="contained"
          color="success"
          onClick={() => {
            if (deviceSummary) {
              exportToExcel(deviceSummary, `Device Summary`);
            }
          }}
        >
          <Download fontSize={'small'} sx={{ mr: '10px' }} />
          Download
        </Button>
        {deviceSummary && (
          <div>
            <Typography>IMEI: {deviceSummary?.[0]?.imei}</Typography>
            <Typography>Serial No: {deviceSummary?.[0]?.serial}</Typography>
          </div>
        )}
      </Box>
      <DeviceSummaryTable />
    </LocalizationProvider>
  );
};

export default DeviceSummary;

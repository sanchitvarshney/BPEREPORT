import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getTotalComponentInBPE, getTotalDispatchDevices } from 'features/reports/reportSlice';
import { Download } from '@mui/icons-material';
import { exportToExcel } from 'helper/excelExport';
import { DatePicker } from 'antd';
import TotalDispatchDEviceTable from 'components/table/TotalDispatchDEviceTable';
const { RangePicker } = DatePicker;
const AssemblyConsumption = () => {
  const { totalDispatchDevices, totalDispatchDevicesLoading } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <RangePicker
          format={'DD/MM/YYYY'}
          value={dateRange.from && dateRange.to ? [dateRange.from, dateRange.to] : null}
          onChange={(range) => {
            if (range) {
              setDateRange({ from: range[0], to: range[1] });
            } else {
              setDateRange({ from: null, to: null });
            }
          }}
          presets={[
            { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
            { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
            { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
            { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] }
          ]}
        />

        <LoadingButton
          loading={totalDispatchDevicesLoading}
          onClick={() => {
            if (dateRange.from && dateRange.to) {
              dispatch(
                getTotalDispatchDevices({ from: dayjs(dateRange.from).format('DD-MM-YYYY'), to: dayjs(dateRange.to).format('DD-MM-YYYY') })
              );
            } else {
              showToast('Please select date', 'error');
            }
          }}
          variant="contained"
        >
          <FilterAltOutlinedIcon fontSize={'small'} sx={{ mr: '10px' }} />
          Search
        </LoadingButton>
        <Button
          disabled={!totalDispatchDevices}
          variant="contained"
          color="success"
          onClick={() => {
            if (totalDispatchDevices) {
              exportToExcel(totalDispatchDevices, 'Total Material In BPE ');
            }
          }}
        >
          <Download fontSize={'small'} sx={{ mr: '10px' }} />
          Download
        </Button>
      </Box>
      <TotalDispatchDEviceTable />
    </LocalizationProvider>
  );
};

export default AssemblyConsumption;

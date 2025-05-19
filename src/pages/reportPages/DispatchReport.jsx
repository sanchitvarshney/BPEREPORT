import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getr5Report } from 'features/reports/reportSlice';
import { Download } from '@mui/icons-material';
import { exportToExcel } from 'helper/excelExport';
import { DatePicker } from 'antd';
import DispatchReportTable from 'components/table/DispatchReportTable';
const { RangePicker } = DatePicker;
const DispatchReport = () => {
  const { dispatchreport, dispatchreportLoading } = useSelector((state) => state.report);
  const isSwipeModule = window.location.pathname.includes('swipe');
  
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
          loading={dispatchreportLoading}
          onClick={() => {
            if (dateRange.from && dateRange.to) {
              dispatch(
                getr5Report({ from: dayjs(dateRange.from).format('DD-MM-YYYY'), to: dayjs(dateRange.to).format('DD-MM-YYYY'),type:isSwipeModule ? 'swipeMachine' : 'soundBox' })
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
          disabled={!dispatchreport}
          variant="contained"
          color="success"
          onClick={() => {
            if (dispatchreport) {
              exportToExcel(dispatchreport, 'Dispatch Report');
            }
          }}
        >
          <Download fontSize={'small'} sx={{ mr: '10px' }} />
          Download
        </Button>
      </Box>
      <DispatchReportTable />
    </LocalizationProvider>
  );
};

export default DispatchReport;

import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, Button, Pagination, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getSwipeFunctionalReport } from 'features/reports/reportSlice';
import { exportDynamicDataToExcel } from 'helper/excelExport';
import { DatePicker } from 'antd';
import { Download } from '@mui/icons-material';
import SwipeFunctionalReportTable from 'components/table/SwipeFunctionalReportTable';
import { useSocketContext } from '../../contexts/SocketContext';
import SelectDeviceWithType from '../../reusable/SelectDeviceWithType';
import SelectComponent from '../../reusable/SelectComponent';
const { RangePicker } = DatePicker;

const SwipeFunctionalReport = () => {
  const { swipeFunctionalReportLoading, swipeFunctionalReport, swipeFunctionalReportTotalPages } = useSelector((state) => state.report);
  const { emitSwipeFunctionalReport } = useSocketContext();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [type, setType] = useState('DEVICE');
  const [device, setDevice] = useState(null);
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });

  const handlePageChange = (event, value) => {
    setPage(value);
    if (dateRange.from && dateRange.to) {
      dispatch(
        getSwipeFunctionalReport({
          fromDate: dayjs(dateRange.from).format('DD-MM-YYYY'),
          toDate: dayjs(dateRange.to).format('DD-MM-YYYY'),
          page: value,
          limit,
          deviceId: device?.id,
          type:type,
        })
      );
    }
  };

  const handleDownload = () => {
    if (!dateRange?.from || !dateRange?.to) {
      showToast('Please select a date range', 'error');
      return;
    }
    emitSwipeFunctionalReport({ from: dayjs(dateRange.from).format('DD-MM-YYYY'), to: dayjs(dateRange.to).format('DD-MM-YYYY') });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="">
        <Box sx={{ display: 'flex', gap: '10px', paddingTop: '20px', }}>
          <FormControl fullWidth sx={{ maxWidth: '100px' }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type"
              onChange={(e) => {setType(e.target.value); setDevice(null)}}
              sx={{ height: '56px' }}
            >
              <MenuItem value={'DEVICE'}>Device</MenuItem>
              <MenuItem value={'PART'}>Part</MenuItem>
            </Select>
          </FormControl>
          {type === 'DEVICE' ? (
            <FormControl fullWidth sx={{ maxWidth: '250px' }}>
              <SelectDeviceWithType value={device} onChange={setDevice} type="swipeMachine" sx={{ height: '40px' }} />
            </FormControl>
          ) : (
            <FormControl fullWidth sx={{ maxWidth: '250px' }}>
              <SelectComponent value={device} onChange={(e) => setDevice(e)} label="Select Part" sx={{ height: '40px' }} />
            </FormControl>
          )}
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
            loading={swipeFunctionalReportLoading}
            onClick={() => {
              if (dateRange.from && dateRange.to) {
                setPage(1);
                dispatch(
                  getSwipeFunctionalReport({
                    fromDate: dayjs(dateRange.from).format('DD-MM-YYYY'),
                    toDate: dayjs(dateRange.to).format('DD-MM-YYYY'),
                    page: 1,
                    limit,
                    deviceId: device?.id,
                    type:type,
                  })
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
            disabled={!swipeFunctionalReport}
            variant="contained"
            color="success"
            onClick={() => {
              if (swipeFunctionalReport) {
                exportDynamicDataToExcel(swipeFunctionalReport, 'Swipe Machine Functional Report');
              }
            }}
          >
            <Download fontSize={'small'} sx={{ mr: '10px' }} />
            Download
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              handleDownload();
            }}
          >
            <Download fontSize={'small'} sx={{ mr: '10px' }} />
            Download All
          </Button>
        </Box>
        <SwipeFunctionalReportTable />
        {swipeFunctionalReportTotalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={swipeFunctionalReportTotalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default SwipeFunctionalReport;

import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box } from '@mui/material';
import TotalDEviceInCompanyTable from 'components/table/TotalDEviceInCompanyTable';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getTotalProduct } from 'features/reports/reportSlice';

const TotalDeviceInCompany = () => {
  const { totalProductLoading } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [value, setValue] = useState(null); // From Date
  const [value1, setValue1] = useState(null); // To Date

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        {/* From Date Picker */}
        <DatePicker
          label="From Date"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          maxDate={dayjs()} // Disable future dates for From Date
        />

        {/* To Date Picker */}
        <DatePicker
          label="To Date"
          value={value1}
          onChange={(newValue) => setValue1(newValue)}
          maxDate={value ? dayjs(value) : dayjs()} // Disable future dates based on From Date
        />

        <LoadingButton
        
          loading={totalProductLoading}
          onClick={() => {
            if (value && value1) {
              dispatch(
                getTotalProduct({
                  from: dayjs(value).format('DD-MM-YYYY'),
                  to: dayjs(value1).format('DD-MM-YYYY')
                })
              );
            } else {
              showToast('Please select date', 'error');
            }
          }}
          variant="contained"
        >
          <FilterAltOutlinedIcon fontSize={'small'} sx={{ mr: '10px' }} />
          button
        </LoadingButton>
      </Box>
      <TotalDEviceInCompanyTable />
    </LocalizationProvider>
  );
};

export default TotalDeviceInCompany;

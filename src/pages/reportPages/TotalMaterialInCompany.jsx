import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getTotalComponent } from 'features/reports/reportSlice';
import TotalComponentInCompanyTable from 'components/table/TotalComponentInCompanyTable';
import { Download } from '@mui/icons-material';
import { exportToExcel } from 'helper/excelExport';

const TotalMaterialInCompany = () => {
  const { totalComponentLoading, totalComponent } = useSelector((state) => state.report);
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
        />

        {/* To Date Picker */}
        <DatePicker label="To Date" value={value1} onChange={(newValue) => setValue1(newValue)} />

        <LoadingButton
          loading={totalComponentLoading}
          onClick={() => {
            if (value && value1) {
              dispatch(
                getTotalComponent({
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
          Search
        </LoadingButton>
        <Button
          disabled={!totalComponent}
          variant="contained"
          color="success"
          onClick={() => {
            if (totalComponent) {
              exportToExcel(totalComponent, 'Total Material In Company');
            }
          }}
        >
          <Download fontSize={'small'} sx={{ mr: '10px' }} />
          Download
        </Button>
      </Box>
      <TotalComponentInCompanyTable />
    </LocalizationProvider>
  );
};

export default TotalMaterialInCompany;

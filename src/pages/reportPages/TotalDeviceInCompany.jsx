import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, Button, InputLabel } from '@mui/material';
import TotalDEviceInCompanyTable from 'components/table/TotalDEviceInCompanyTable';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getTotalProduct } from 'features/reports/reportSlice';
import { exportToExcel } from 'helper/excelExport';
import { Download } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const TotalDeviceInCompany = () => {
  const { totalProductLoading, totalProduct } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [value, setValue] = useState(null); // From Date
  const [value1, setValue1] = useState(null); // To Date
  const [type, setType] = React.useState('both');

  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        {/* From Date Picker */}
        <DatePicker label="From Date" value={value} onChange={(newValue) => setValue(newValue)} />

        {/* To Date Picker */}
        <DatePicker label="To Date" value={value1} onChange={(newValue) => setValue1(newValue)} />
        <FormControl fullWidth sx={{ maxWidth: '250px' }}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={type} label="Type" onChange={handleChange}>
            <MenuItem value={'both'}>All</MenuItem>
            <MenuItem value={'withoutv2'}> Without AWB</MenuItem>
            <MenuItem value={'onlyv2'}> Only AWB</MenuItem>
          </Select>
        </FormControl>

        <LoadingButton
          loading={totalProductLoading}
          onClick={() => {
            if (value && value1) {
              dispatch(
                getTotalProduct({
                  from: dayjs(value).format('DD-MM-YYYY'),
                  to: dayjs(value1).format('DD-MM-YYYY'),
                  type
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
          disabled={!totalProduct}
          variant="contained"
          color="success"
          onClick={() => {
            if (totalProduct) {
              exportToExcel(totalProduct, 'Total Device In Company');
            }
          }}
        >
          <Download fontSize={'small'} sx={{ mr: '10px' }} />
          Download
        </Button>
      </Box>
      <TotalDEviceInCompanyTable />
    </LocalizationProvider>
  );
};

export default TotalDeviceInCompany;

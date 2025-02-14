import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const TotalDeviceInCompany = () => {
  const { totalProductLoading, totalProduct } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [type, setType] = React.useState('both');
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });

  const handleChange = (event) => {
    setType(event.target.value);
  };
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

        <FormControl fullWidth sx={{ maxWidth: '250px' }}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={type} label="Type" onChange={handleChange}>
            <MenuItem value={'both'}>All</MenuItem>
            <MenuItem value={'onlyv2'}> AWB</MenuItem>
            <MenuItem value={'withoutv2'}> Non-AWB</MenuItem>
          </Select>
        </FormControl>

        <LoadingButton
          loading={totalProductLoading}
          onClick={() => {
            if (dateRange.from && dateRange.to) {
              dispatch(
                getTotalProduct({ from: dayjs(dateRange.from).format('DD-MM-YYYY'), to: dayjs(dateRange.to).format('DD-MM-YYYY'), type })
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
      <TotalDEviceInCompanyTable dateRange = {dateRange}  type = {type} />
    </LocalizationProvider>
  );
};

export default TotalDeviceInCompany;

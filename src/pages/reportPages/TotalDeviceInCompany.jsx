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
import { useSocketContext } from '../../contexts/SocketContext';
import { useEffect } from 'react';

const TotalDeviceInCompany = () => {
  const { totalProductLoading, totalProduct } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [type, setType] = React.useState('both');
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });
  const { emitDeviceInWareHouseDownload, onDownloadReport } = useSocketContext();

  useEffect(() => {
    onDownloadReport(() => {
      setLoading(false);
      showToast('Report downloaded successfully', 'success');
    });
  }, [onDownloadReport]);

  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', gap: '10px', paddingTop: '20px' }}>
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
            <MenuItem value={'BER'}> BER</MenuItem>
            <MenuItem value={'OFFICE'}>OFFICE</MenuItem>
            <MenuItem value={'REGULAR'}> REGULAR</MenuItem>
            <MenuItem value={'ALL'}> ALL</MenuItem>
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
              exportToExcel(totalProduct, 'Device In Warehoure');
            }
          }}
        >
          <Download fontSize={'small'} sx={{ mr: '10px' }} />
          Download
        </Button>
        <Button
          disabled={ !totalProduct}
          variant="contained"
          color="success"
          onClick={() => {
            setLoading(true);
            if (!dateRange.from || !dateRange.to) {
              showToast('Please select a date range', 'error');
            } else {
              emitDeviceInWareHouseDownload({
                startDate: dayjs(dateRange.from).format('DD-MM-YYYY'),
                endDate: dayjs(dateRange.to).format('DD-MM-YYYY'),
                device_key: 'ALL',
                type: type
              });
              showToast('Download started', 'success');
            }
          }}
        >
          <Download fontSize={'small'} sx={{ mr: '10px' }} />
          Download All
        </Button>
      </Box>

      <TotalDEviceInCompanyTable dateRange={dateRange} type={type} />
    </LocalizationProvider>
  );
};

export default TotalDeviceInCompany;

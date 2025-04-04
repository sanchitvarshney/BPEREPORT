import React, { useState, useMemo } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, InputLabel, Button, FormControl, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getWrongDeviceDetail } from 'features/reports/reportSlice';
import { exportDynamicDataToExcel } from 'helper/excelExport';
import { DatePicker } from 'antd';
import { Download } from '@mui/icons-material';
import WrongDeviceDetailTable from 'components/table/WrongDeviceDetailTable';
const { RangePicker } = DatePicker;

const TotalWrongDevice = () => {
  const { wrongDeviceDetailLoading, wrongDeviceDetail } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [partner, setPartner] = React.useState('eCOM');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [wrongDeviceDateRange, setWrongDeviceDateRange] = useState({
    from: null,
    to: null
  });

  // Get unique categories from the data
  const categories = useMemo(() => {
    if (!wrongDeviceDetail?.data) return [];

    const uniqueCategories = new Set();
    wrongDeviceDetail.data.forEach((item) => {
      if (item.Category) {
        uniqueCategories.add(item.Category);
      }
    });

    return Array.from(uniqueCategories).sort();
  }, [wrongDeviceDetail]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="">
        <Box sx={{ display: 'flex', gap: '10px', paddingTop: '20px' }}>
          <RangePicker
            format={'DD/MM/YYYY'}
            value={wrongDeviceDateRange.from && wrongDeviceDateRange.to ? [wrongDeviceDateRange.from, wrongDeviceDateRange.to] : null}
            onChange={(range) => {
              if (range) {
                setWrongDeviceDateRange({ from: range[0], to: range[1] });
              } else {
                setWrongDeviceDateRange({ from: null, to: null });
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
            <InputLabel id="partner-select-label">Partner</InputLabel>
            <Select labelId="partner-select-label" value={partner} onChange={(e) => setPartner(e.target.value)} label="Partner">
              <MenuItem value="eKart">eKart</MenuItem>
              <MenuItem value="eCOM">eCOM</MenuItem>
              <MenuItem value="DTDC">DTDC</MenuItem>
              <MenuItem value="dVery">Delhivery</MenuItem>
              <MenuItem value="ALL">ALL</MenuItem>
            </Select>
          </FormControl>
          <LoadingButton
            loading={wrongDeviceDetailLoading}
            onClick={() => {
              if (wrongDeviceDateRange.from && wrongDeviceDateRange.to && partner) {
                dispatch(
                  getWrongDeviceDetail({
                    from: dayjs(wrongDeviceDateRange.from).format('DD-MM-YYYY'),
                    to: dayjs(wrongDeviceDateRange.to).format('DD-MM-YYYY'),
                    partner
                  })
                );
              } else {
                showToast('Please select date and Partner', 'error');
              }
            }}
            variant="contained"
          >
            <FilterAltOutlinedIcon fontSize={'small'} sx={{ mr: '10px' }} />
            Search
          </LoadingButton>
          <Button
            disabled={!wrongDeviceDetail}
            variant="contained"
            color="success"
            onClick={() => {
              if (wrongDeviceDetail) {
                exportDynamicDataToExcel(wrongDeviceDetail, 'Wrong Device Detail');
              }
            }}
          >
            <Download fontSize={'small'} sx={{ mr: '10px' }} />
            Download
          </Button>
          {wrongDeviceDetail?.data && categories.length > 0 && (
            <FormControl sx={{ minWidth: 250 }}>
              <InputLabel>Filter by Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Filter by Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
                sx={{
                  background: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2'
                  }
                }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
        <WrongDeviceDetailTable categoryFilter={categoryFilter} />
      </div>
    </LocalizationProvider>
  );
};

export default TotalWrongDevice;

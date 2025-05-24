import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, InputLabel,Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getMINReport } from 'features/reports/reportSlice';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePicker } from 'antd';
import TotalMINDeviceTable from 'components/table/TotalMINDeviceTable';
const { RangePicker } = DatePicker;
import { Download } from '@mui/icons-material';
import { exportToExcel } from 'helper/excelExport';

const TotalMINDevice = () => {
  const { wrongDeviceDetailLoading,getMINReportData } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [partner, setPartner] = React.useState('eCOM');
  const [wrongDeviceDateRange, setWrongDeviceDateRange] = useState({
    from: null,
    to: null
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className=''>
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
              <MenuItem value="expb">XpressBees</MenuItem>
              <MenuItem value="ALL">All</MenuItem>
              {/* Add other partners as required */}
            </Select>
          </FormControl>
          <LoadingButton
            loading={wrongDeviceDetailLoading}
            onClick={() => {
              if (wrongDeviceDateRange.from && wrongDeviceDateRange.to && partner) {
                dispatch(
                  getMINReport({
                    from: dayjs(wrongDeviceDateRange.from).format('YYYY-MM-DD'),
                    to: dayjs(wrongDeviceDateRange.to).format('YYYY-MM-DD'),
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
          disabled={!getMINReportData}
          variant="contained"
          color="success"
          onClick={() => {
            if (getMINReportData) {
              exportToExcel(getMINReportData, `Device AWB Report (${partner})`,partner);
            }
          }}
        >
          <Download fontSize={'small'} sx={{ mr: '10px' }} />
          Download
        </Button>
        </Box>
        <TotalMINDeviceTable partner={partner}/>
      </div>
    </LocalizationProvider>
  );
};

export default TotalMINDevice;

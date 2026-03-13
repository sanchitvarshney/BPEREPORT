import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Box, Button, Card, FormControl, Typography } from '@mui/material';
import { showToast } from 'utils/ToastProvider';
import { Download } from '@mui/icons-material';
import { DatePicker } from 'antd';
import { useSocketContext } from '../../contexts/SocketContext';
import SelectSku from 'reusable/SelectSku';
const { RangePicker } = DatePicker;
const MasterCarten = ({ isSwipe = false }) => {
  const [sku, setSku] = useState('');
  const { emitCartonReportDownload, isConnected } = useSocketContext();

  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });

  const handleDownload = () => {
    if (!dateRange?.from || !dateRange?.to) {
      showToast('Please select a date range', 'error');
      return;
    }
    emitCartonReportDownload({
      from: dayjs(dateRange.from).format('DD-MM-YYYY'),
      to: dayjs(dateRange.to).format('DD-MM-YYYY'),
      type: isSwipe ? 'SWIPE' : 'SOUNDBOX',
      sku:sku?.sku
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 'calc(100vh - 220px)', width: '100%' }}>
        <Card
          sx={{
            p: 2,
            width: '100%',
            maxWidth: { xs: 450, lg: 520 },
            border: '1px solid #ddd'
          }}
        >
          <Box sx={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
            <Typography variant="h4">Master Carton Report for {isSwipe ? 'Swipe' : 'Soundbox' }</Typography>
            <RangePicker
              style={{ width: '100%' }}
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

            <FormControl fullWidth sx={{ width: '100%' }}>
              <SelectSku varient="outlined" onChange={(e) => setSku(e)} value={sku} />
            </FormControl>

            <Button disabled={!isConnected} variant="contained" color="success" onClick={handleDownload}>
              <Download fontSize={'small'} sx={{ mr: '10px' }} />
              Download
            </Button>
          </Box>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default MasterCarten;

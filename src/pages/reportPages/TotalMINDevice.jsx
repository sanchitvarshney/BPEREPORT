import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, InputLabel, Button, FormControl, Select, MenuItem, TablePagination, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getMINReport } from 'features/reports/reportSlice';
import { DatePicker } from 'antd';
import TotalMINDeviceTable from 'components/table/TotalMINDeviceTable';
const { RangePicker } = DatePicker;
import { Download } from '@mui/icons-material';
import {useSocketContext} from '../../contexts/SocketContext';

const TotalMINDevice = () => {
  const { wrongDeviceDetailLoading, getMINReportData } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [partner, setPartner] = React.useState('eCOM');
  const {emitDeviceInwardReport,isConnected} =   useSocketContext();
  const [wrongDeviceDateRange, setWrongDeviceDateRange] = useState({
    from: null,
    to: null
  });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  // Extract data from the response structure - handle different possible structures
  const pagination = getMINReportData?.pagination || getMINReportData?.data?.pagination || {};


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
      
      dispatch(
        getMINReport({
          from: dayjs(wrongDeviceDateRange.from).format('YYYY-MM-DD'),
          to: dayjs(wrongDeviceDateRange.to).format('YYYY-MM-DD'),
          partner,
          page: newPage + 1, // API expects 1-based pagination
          limit
        })
      );

  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    setPage(0);
    // Dispatch new API call with the new limit
    if (wrongDeviceDateRange.from && wrongDeviceDateRange.to && partner) {
      dispatch(
        getMINReport({
          from: dayjs(wrongDeviceDateRange.from).format('YYYY-MM-DD'),
          to: dayjs(wrongDeviceDateRange.to).format('YYYY-MM-DD'),
          partner,
          page: 1,
          limit: newLimit
        })
      );
    }
  };

  const handleDownload = () => {
    if (!wrongDeviceDateRange?.from || !wrongDeviceDateRange?.to) {
      showToast('Please select a date range', 'error');
      return;
    }
    emitDeviceInwardReport({ fromDt: dayjs(wrongDeviceDateRange.from).format('YYYY-MM-DD'), toDt: dayjs(wrongDeviceDateRange.to).format('YYYY-MM-DD'),partner:partner });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="">
        <Box sx={{ display: 'flex', gap: '10px', paddingTop: '20px', flexWrap: 'wrap' }}>
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
                setPage(0); // Reset to first page when searching
                dispatch(
                  getMINReport({
                    from: dayjs(wrongDeviceDateRange.from).format('YYYY-MM-DD'),
                    to: dayjs(wrongDeviceDateRange.to).format('YYYY-MM-DD'),
                    partner,
                    page: 1,
                    limit
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
            disabled={!isConnected }
            variant="contained"
            color="success"
            onClick={() => {
             handleDownload()
            }}
          >
            <Download fontSize={'small'} sx={{ mr: '10px' }} />
            Download
          </Button>
        </Box>

        <TotalMINDeviceTable partner={partner}/>

        {/* Show pagination when there are records */}
        {getMINReportData && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TablePagination
              count={pagination?.totalRecords}
              page={page}
              onPageChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              rowsPerPage={limit}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        )}

        {/* Display pagination info */}
        {getMINReportData?.data?.length === 0 && getMINReportData && (
          <Box sx={{ textAlign: 'center', mt: 4, p: 3 }}>
            <Typography variant="h6" color="text.secondary">
              No records found for the selected criteria
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your date range or partner selection
            </Typography>
          </Box>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default TotalMINDevice;

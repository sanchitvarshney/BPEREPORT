import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, InputLabel, Button, FormControl, Select, MenuItem, TablePagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getSwipeMachineReport } from 'features/reports/reportSlice';
import { exportDynamicDataToExcel } from 'helper/excelExport';
import { DatePicker } from 'antd';
import { Download } from '@mui/icons-material';
import SwipeMINReportTable from 'components/table/SwipeMINReportTable';
import {useSocketContext} from '../../contexts/SocketContext';
const { RangePicker } = DatePicker;

const SwipeMINReport = () => {
  const { swipeMachineReportLoading, swipeMachineReport, swipeMachineReportTotalPages } = useSelector(
    (state) => state.report
  );
  const {swipeMachineInward,isConnected} =   useSocketContext();

  const dispatch = useDispatch();
  const [partner, setPartner] = React.useState('eCOM');
  const [page, setPage] = useState(1);
  const [limit,setLimit] = useState(10);
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });

  const handlePageChange = (event, value) => {
    setPage(value);
    if (dateRange.from && dateRange.to && partner) {
      dispatch(
        getSwipeMachineReport({
          partnerValue: partner,
          fromDate: dayjs(dateRange.from).format('DD-MM-YYYY'),
          toDate: dayjs(dateRange.to).format('DD-MM-YYYY'),
          page: value,
          limit
        })
      );
    }
  };

  const handleDownload = () => {
    if (!dateRange?.from || !dateRange?.to) {
      showToast('Please select a date range', 'error');
      return;
    }
    swipeMachineInward({ fromDate: dayjs(dateRange.from).format('DD-MM-YYYY'), toDate: dayjs(dateRange.to).format('DD-MM-YYYY'),partner:partner });
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setLimit(newRowsPerPage);
    setPage(1);
    if (dateRange.from && dateRange.to) {
      dispatch(
        getSwipeMachineReport({
          partnerValue: partner,
          fromDate: dayjs(dateRange.from).format('DD-MM-YYYY'),
          toDate: dayjs(dateRange.to).format('DD-MM-YYYY'),
          page: 1,
          limit: newRowsPerPage
        })
      );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="">
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
            loading={swipeMachineReportLoading}
            onClick={() => {
              if (dateRange.from && dateRange.to && partner) {
                setPage(1);
                dispatch(
                  getSwipeMachineReport({
                    partnerValue: partner,
                    fromDate: dayjs(dateRange.from).format('DD-MM-YYYY'),
                    toDate: dayjs(dateRange.to).format('DD-MM-YYYY'),
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
            disabled={!isConnected}
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
        <SwipeMINReportTable />
        {swipeMachineReportTotalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TablePagination
              count={swipeMachineReportTotalPages}
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
      </div>
    </LocalizationProvider>
  );
};

export default SwipeMINReport;

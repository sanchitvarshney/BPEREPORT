import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, Button, TablePagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import {getComponentSummary } from 'features/reports/reportSlice';
import { Download } from '@mui/icons-material';
import { DatePicker } from 'antd';
import ComponentSummaryTable from 'components/table/ComponentSummaryTable';
const { RangePicker } = DatePicker;
import {useSocketContext} from '../../contexts/SocketContext';

const TotalDispatchdevices = () => {
  const { componentSummary, componentSummaryLoading } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });
  const {emitComponentSummaryDownload,isConnected} =   useSocketContext();
  const location = window.location.pathname.includes('assembly')? 'Assembly' : 'TRC';
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const pagination = componentSummary?.pagination || {}
  const isTrcModule = window.location.pathname.includes('trc')
  
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    dispatch(getComponentSummary({ from: dayjs(dateRange.from).format('YYYY-MM-DD'), to: dayjs(dateRange.to).format('YYYY-MM-DD'),location, page: newPage + 1, limit: limit }));
  };
  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
    dispatch(getComponentSummary({ from: dayjs(dateRange.from).format('YYYY-MM-DD'), to: dayjs(dateRange.to).format('YYYY-MM-DD'),location, page: 1, limit: parseInt(event.target.value, 10) }));
  };

  const handleDownload = () => {
    if (!dateRange?.from || !dateRange?.to) {
      showToast('Please select a date range', 'error');
      return;
    }
    emitComponentSummaryDownload({ startDate: dayjs(dateRange.from).format('YYYY-MM-DD'), endDate: dayjs(dateRange.to).format('YYYY-MM-DD'),loc_out:isTrcModule?"":"Assembly" });
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', gap: '10px', mt: '10px'  }}>
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

        <LoadingButton
          loading={componentSummaryLoading}
          onClick={() => {
            if (dateRange.from && dateRange.to) {
              dispatch(
                getComponentSummary({ from: dayjs(dateRange.from).format('YYYY-MM-DD'), to: dayjs(dateRange.to).format('YYYY-MM-DD'),location, page: 1, limit: 10   })
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
      <ComponentSummaryTable  />
      {componentSummary && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <TablePagination
        count={pagination.totalRecords || 0}
        page={page}
        onPageChange={handlePageChange}
        color="primary"
        showFirstButton
        showLastButton
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} of ${count} (Page ${pagination.currentPage} of ${pagination.totalPages})`
        }
      />
      </Box>}
    </LocalizationProvider>
  );
};

export default TotalDispatchdevices;

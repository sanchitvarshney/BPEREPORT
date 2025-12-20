import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, Button, TablePagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getr5Report } from 'features/reports/reportSlice';
import { Download } from '@mui/icons-material';
import { exportToExcel } from 'helper/excelExport';
import { DatePicker } from 'antd';
import DispatchReportTable from 'components/table/DispatchReportTable';
import { useSocketContext } from '../../contexts/SocketContext';
const { RangePicker } = DatePicker;
const DispatchReport = () => {
  const { dispatchreport, dispatchreportLoading } = useSelector((state) => state.report);
  const isSwipeModule = window.location.pathname.includes('swipe');
  const { emitR5ReportDownload, isConnected, emitDownloadr5Report } = useSocketContext();

  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleDownload = () => {
    if (!dateRange?.from || !dateRange?.to) {
      showToast('Please select a date range', 'error');
      return;
    }
    emitR5ReportDownload({
      from: dayjs(dateRange.from).format('DD-MM-YYYY'),
      to: dayjs(dateRange.to).format('DD-MM-YYYY'),
      productType: isSwipeModule ? 'swipeMachine' : 'soundBox',
      type: 'DATE'
    });
  };
  const handleDownloadAll = () => {
    if (!dateRange?.from || !dateRange?.to) {
      showToast('Please select a date range', 'error');
      return;
    }

    // Check if date range is more than 1 month
    const fromDate = dayjs(dateRange.from);
    const toDate = dayjs(dateRange.to);
    const diffInMonths = toDate.diff(fromDate, 'month', true);

    if (diffInMonths > 1) {
      showToast('Date range cannot exceed 1 month for Download All', 'error');
      return;
    }
    if (isSwipeModule) {
      emitDownloadr5Report({
        from: fromDate.format('DD-MM-YYYY'),
        to: toDate.format('DD-MM-YYYY'),
        type: 'All',
        deviceType:"SWIPE"
      });
    } else {
      emitDownloadr5Report({
        from: fromDate.format('DD-MM-YYYY'),
        to: toDate.format('DD-MM-YYYY'),
        type: 'All'
      });
    }
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    if (dateRange.from && dateRange.to) {
      dispatch(
        getr5Report({
          from: dayjs(dateRange.from).format('DD-MM-YYYY'),
          to: dayjs(dateRange.to).format('DD-MM-YYYY'),
          type: isSwipeModule ? 'swipeMachine' : 'soundBox',
          page: 1,
          limit: newRowsPerPage
        })
      );
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
    if (dateRange.from && dateRange.to) {
      dispatch(
        getr5Report({
          from: dayjs(dateRange.from).format('DD-MM-YYYY'),
          to: dayjs(dateRange.to).format('DD-MM-YYYY'),
          type: isSwipeModule ? 'swipeMachine' : 'soundBox',
          page: newPage + 1,
          limit: rowsPerPage
        })
      );
    }
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

        <LoadingButton
          loading={dispatchreportLoading}
          onClick={() => {
            if (dateRange.from && dateRange.to) {
              dispatch(
                getr5Report({
                  from: dayjs(dateRange.from).format('DD-MM-YYYY'),
                  to: dayjs(dateRange.to).format('DD-MM-YYYY'),
                  type: isSwipeModule ? 'swipeMachine' : 'soundBox',
                  page: 1,
                  limit: 10
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
          disabled={!isConnected}
          variant="contained"
          color="success"
          onClick={() => {
            handleDownload();
          }}
        >
          <Download fontSize={'small'} sx={{ mr: '10px' }} />
          Download
        </Button>
      {!isSwipeModule &&     <Button
          disabled={!isConnected}
          variant="contained"
          color="success"
          onClick={() => {
            handleDownloadAll();
          }}
        >
          <Download fontSize={'small'} sx={{ mr: '10px' }} />
          Download All
        </Button>}
      </Box>
      <DispatchReportTable />
      {dispatchreport?.pagination && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TablePagination
            count={dispatchreport?.pagination?.totalRecords}
            page={page - 1}
            onPageChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) => {
              const currentPage = page;
              const totalPages = Math.ceil(count / rowsPerPage);
              return `${from}-${to} of ${count} (Page ${currentPage} of ${totalPages})`;
            }}
          />
        </Box>
      )}
    </LocalizationProvider>
  );
};

export default DispatchReport;

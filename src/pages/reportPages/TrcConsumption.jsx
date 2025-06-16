import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, Button, TablePagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getTrcComponentReport } from 'features/reports/reportSlice';
import { Download } from '@mui/icons-material';
import { exportToExcel } from 'helper/excelExport';
import { DatePicker } from 'antd';
import DynamicComponentTable from 'components/table/DynamicAssemblyTable';
const { RangePicker } = DatePicker;
const TrcConsumption = () => {
  const { trcReport, trcReportLoading } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalRecords: 0,
    currentPage: 1
  });
  const [records, setRecords] = useState([]);
  const handleDownload = () => {
    // Prepare data for export
    const dataForExport = trcReport?.data?.map((device) => ({
      "IMEI No": device["IMEI No"],
      "Serial No": device["Serial No"],
      ...device.Components.reduce((acc, component) => {
      acc[trcReport?.components?.filter((componentData) => componentData["Part No"]===component["Part No"])[0]["Part Name"] + " (" + component["Part No"]+")"] = component.Quantity;
        return acc;
      }, {})
    }));

    // Call the exportToExcel function (pass data for export and filename)
    exportToExcel(dataForExport, 'TRC Consumption');
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    dispatch(getTrcComponentReport({ from: dayjs(dateRange.from).format('YYYY-MM-DD'), to: dayjs(dateRange.to).format('YYYY-MM-DD'), page: newPage + 1, limit: limit }));
  };
  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
    dispatch(getTrcComponentReport({ from: dayjs(dateRange.from).format('YYYY-MM-DD'), to: dayjs(dateRange.to).format('YYYY-MM-DD'), page: 1, limit: parseInt(event.target.value, 10) }));
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', gap: '10px' , mt: '10px' }}>
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
          loading={trcReportLoading}
          onClick={() => {
            if (dateRange.from && dateRange.to) {
              dispatch(
                getTrcComponentReport({ from: dayjs(dateRange.from).format('YYYY-MM-DD'), to: dayjs(dateRange.to).format('YYYY-MM-DD'), page: 1, limit: 10 })
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
          disabled={!trcReport}
          variant="contained"
          color="success"
          onClick={handleDownload} 
        >
          <Download fontSize={'small'} sx={{ mr: '10px' }} />
          Download
        </Button>
      </Box>
      <DynamicComponentTable data={trcReport?.data || []} components={trcReport?.components || []} loading={trcReportLoading} />
      {trcReport && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <TablePagination
        count={pagination.totalPages || 0}
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

export default TrcConsumption;

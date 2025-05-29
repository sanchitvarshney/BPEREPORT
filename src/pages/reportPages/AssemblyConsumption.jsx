import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getComponentReport,getAllComponentReport } from 'features/reports/reportSlice';
import { Download } from '@mui/icons-material';
import { exportToExcel } from 'helper/excelExport';
import { DatePicker } from 'antd';
import DynamicComponentTable from 'components/table/DynamicAssemblyTable';
const { RangePicker } = DatePicker;
const AssemblyConsumption = () => {
  const { componentReport, componentReportLoading,allComponentReportLoading } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });
  const [page, setPage] = useState(1);

  const isSwipe = window.location.pathname.includes('swipe');

  const handleDownload = () => {
    if (dateRange.from && dateRange.to) {
      dispatch(getAllComponentReport({
        from: dayjs(dateRange.from).format('YYYY-MM-DD'),
      to: dayjs(dateRange.to).format('YYYY-MM-DD'),
      type: isSwipe ? 'SWIPE_MACHINE' : 'soundbox',
    }))
    }
    else {
      showToast('Please select date', 'error');
    }
    // Prepare data for export
    // const dataForExport = componentReport?.data?.map((device) => ({
    //   'IMEI No': device['IMEI No'],
    //   'Serial No': device['Serial No'],
    //   ...device.Components.reduce((acc, component) => {
    //     acc[component['Part Name'] + ' (' + component['Part No'] + ')'] = component.Quantity;
    //     return acc;
    //   }, {})
    // }));

    // Call the exportToExcel function (pass data for export and filename)
    exportToExcel(dataForExport, 'Assembly Consumption');
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    if (dateRange.from && dateRange.to && partner) {
      dispatch(
        getComponentReport({
          from: dayjs(dateRange.from).format('YYYY-MM-DD'),
          to: dayjs(dateRange.to).format('YYYY-MM-DD'),
          type: isSwipe ? 'SWIPE_MACHINE' : 'soundbox',
          page: value,
          limit: 10,
        })
      );
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: 'flex', gap: '10px', mt: '10px' }}>
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
            loading={componentReportLoading}
            onClick={() => {
              if (dateRange.from && dateRange.to) {
                dispatch(
                  getComponentReport({
                    from: dayjs(dateRange.from).format('YYYY-MM-DD'),
                    to: dayjs(dateRange.to).format('YYYY-MM-DD'),
                    type: isSwipe ? 'SWIPE_MACHINE' : 'soundbox',
                    page: 1,
                    limit: 10,
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
          <LoadingButton disabled={!dateRange.from || !dateRange.to} variant="contained" color="success" onClick={handleDownload} loading={allComponentReportLoading}>
            <Download fontSize={'small'} sx={{ mr: '10px' }} />
            Download
          </LoadingButton>
        </Box>
        <DynamicComponentTable
          data={componentReport?.data || []}
          components={componentReport?.components || []}
          loading={componentReportLoading}
        />
      </LocalizationProvider>
      {componentReport?.data > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={componentReport?.data}
            page={page}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </>
  );
};

export default AssemblyConsumption;

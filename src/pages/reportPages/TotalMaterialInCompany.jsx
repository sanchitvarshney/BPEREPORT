import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, Button, TablePagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getTotalComponent } from 'features/reports/reportSlice';
import TotalComponentInCompanyTable from 'components/table/TotalComponentInCompanyTable';
import { Download } from '@mui/icons-material';
import { exportToExcel } from 'helper/excelExport';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const TotalMaterialInCompany = () => {
  const { totalComponentLoading, totalComponent } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const pagination = totalComponent?.pagination || {};
  console.log('pagination:', pagination);

  const [records, setRecords] = useState([]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    dispatch(getTotalComponent({ from: dayjs(dateRange.from).format('DD-MM-YYYY'), to: dayjs(dateRange.to).format('DD-MM-YYYY'), page: newPage + 1, limit: limit }));
  };
  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value)
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
    dispatch(getTotalComponent({ from: dayjs(dateRange.from).format('DD-MM-YYYY'), to: dayjs(dateRange.to).format('DD-MM-YYYY'), page: 1, limit: parseInt(event.target.value, 10) }));
  };
console.log(pagination,totalComponent)
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
          loading={totalComponentLoading}
          onClick={() => {
            if (dateRange.from && dateRange.to) {
              dispatch(
                getTotalComponent({
                  from: dayjs(dateRange.from).format('DD-MM-YYYY'),
                  to: dayjs(dateRange.to).format('DD-MM-YYYY'),
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
          disabled={!totalComponent}
          variant="contained"
          color="success"
          onClick={() => {
            if (totalComponent) {
              exportToExcel(totalComponent, 'Total Material In Company');
            }
          }}
        >
          <Download fontSize={'small'} sx={{ mr: '10px' }} />
          Download
        </Button>
      </Box>
      <TotalComponentInCompanyTable />

      {pagination.totalRecords > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TablePagination
        count={pagination.totalRecords}
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
      </Box>
      )}
    </LocalizationProvider>
  );
};

export default TotalMaterialInCompany;

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Download } from '@mui/icons-material';
import { Button,TablePagination } from '@mui/material';
import { CustomNoRowsOverlay } from '../../components/table/CustomNoRowsOverlay';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { showToast } from 'utils/ToastProvider';
import { LoadingButton } from '@mui/lab';
import { getBpeIssue, getBpeIssueReport } from 'features/reports/reportSlice';
import UploadFileModal from 'reusable/UploadFileModal';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import {useSocketContext} from '../../contexts/SocketContext';

export default function BPEIssueReport() {
  const { issueReportData, issueReportDataLoading } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const rows =
    issueReportData?.data?.map((item, index) => ({
      id: index + 1,
      imei: item.imei,
      serialNo: item.serial,
      submitDate: item.submitDt,
      submitRemark: item.submitRemark,
      resolveDate: item.resDt,
      resolveRemark: item.resRemark,
      txnId: item.txnId,
      issue: item.issue,
      resolveStatus: item.resolveStatus,
      insertBy: item.user_name,
      fromLocation: item.fromLocation
    })) || [];

  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false); // For File Upload Instructions Modal
  const [comment, setComment] = useState('');
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const pagination = issueReportData?.pagination || {}
  const {emitBpeIssueReportDownload,isConnected} =   useSocketContext();

  const handleDownload = () => {
    if (!dateRange?.from || !dateRange?.to) {
      showToast('Please select a date range', 'error');
      return;
    }
    emitBpeIssueReportDownload({ startDate: dayjs(dateRange.from).format('YYYY-MM-DD'), endDate: dayjs(dateRange.to).format('YYYY-MM-DD')});
  };

  const handleCloseModal = () => {
    setOpenRejectModal(false);
    setOpenApproveModal(false);
    setOpenUploadModal(false); // Close the file upload modal
    setComment('');
  };

  useEffect(() => {
    dispatch(getBpeIssue());
  }, [dispatch]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    dispatch(
      getBpeIssueReport({ from: dayjs(dateRange.from).format('YYYY-MM-DD'), to: dayjs(dateRange.to).format('YYYY-MM-DD'), page: newPage + 1, limit: limit }));
  };
  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
    dispatch(
      getBpeIssueReport({ from: dayjs(dateRange.from).format('YYYY-MM-DD'), to: dayjs(dateRange.to).format('YYYY-MM-DD'), page: 1, limit: parseInt(event.target.value, 10) }));
  };

  const columns = [
    { field: 'id', headerName: '#' },
    { field: 'imei', headerName: 'IMEI', flex: 1 },
    { field: 'serialNo', headerName: 'Serial No', flex: 1 },
    { field: 'issue', headerName: 'Issue', flex: 1 },
    { field: 'submitDate', headerName: 'Issue Date', flex: 1 },
    { field: 'submitRemark', headerName: 'Issue Remark', flex: 1 },
    { field: 'resolveStatus', headerName: 'Resolve Status', flex: 1 },
    { field: 'resolveRemark', headerName: 'Resolve Remark', flex: 1 },
    { field: 'resolveDate', headerName: 'Resolve Date', flex: 1 },
    { field: 'insertBy', headerName: 'Resolved By', flex: 1 }
  ];

  return (
  
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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

          <LoadingButton
            loading={issueReportDataLoading}
            onClick={() => {
              if (dateRange.from && dateRange.to) {
                dispatch(
                  getBpeIssueReport({ from: dayjs(dateRange.from).format('YYYY-MM-DD'), to: dayjs(dateRange.to).format('YYYY-MM-DD'),page:1,limit:10 })
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
        </Box>

        <Box sx={{ height: 'calc(100vh - 300px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
          <DataGrid
            loading={issueReportDataLoading}
            rows={rows || []}
            columns={columns}
            // sx={{
            //   '& .MuiDataGrid-cell': {
            //     borderBottom: '1px solid #ddd', // Horizontal row borders
            //     borderRight: '1px solid #ddd' // Vertical column borders
            //   },
            //   '& .MuiDataGrid-columnHeaders': {
            //     borderBottom: '1px solid #ddd', // Header separator
            //     background: '#1976d2 !important'
            //   },
            //   '& .MuiDataGrid-footerContainer': {
            //     borderTop: '1px solid #ddd' // Add a top border
            //   }
            // }}
            // initialState={{
            //   pagination: {
            //     paginationModel: {
            //       pageSize: 30
            //     }
            //   }
            // }}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay
            }}
            hideFooter={true}
            // pageSizeOptions={[20]}
          />

          {/* Modal for Upload Instructions */}
          <UploadFileModal open={openUploadModal} onClose={handleCloseModal} />
        </Box>
        {issueReportData && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
}

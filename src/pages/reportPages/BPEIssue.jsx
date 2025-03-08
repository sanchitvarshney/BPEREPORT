import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Modal, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CustomNoRowsOverlay } from '../../components/table/CustomNoRowsOverlay';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { showToast } from 'utils/ToastProvider';
import { LoadingButton } from '@mui/lab';
import { solvedBpeIssue, getBpeIssue, getIssueExcel } from 'features/reports/reportSlice';
import UploadFileModal from 'reusable/UploadFileModal';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export default function BPEIssue() {
  const { bpeIssue, bpeIssueLoading, bpeIssueResolveLoading } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const rows =
    bpeIssue?.map((item, index) => ({
      id: index + 1,
      imei: item.imei,
      serialNo: item.serial,
      issue: item.issue,
      txnId: item.transaction,
      insertBy: item.insertBy,
      insertDate: item.insertDt,
      fromLocation: item.fromLocation,
      pendingRemark: item.pendingRemark
    })) || [];

  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false); // For File Upload Instructions Modal
  const [modalData, setModalData] = useState(null);
  const [comment, setComment] = useState('');
  const [exportLoading, setExportLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false); // State for import loading
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });

  const handleApproveClick = (rowData) => {
    setModalData(rowData);
    setOpenApproveModal(true);
  };

  const handleRejectClick = (rowData) => {
    setModalData(rowData);
    setOpenRejectModal(true);
  };

  const handleSubmitApprove = () => {
    dispatch(solvedBpeIssue({ txn: modalData.txnId, status: 'Y', remark: comment })).then((res) => {
      if (res.payload.data.status === 'success' || res.payload.data.success === true) {
        showToast(res.payload.data.message || 'BPE Issue approved successfully', 'success');
        dispatch(getBpeIssue());
        setOpenApproveModal(false);
        setComment('');
      }
    });
  };

  const handleSubmitReject = () => {
    if (!comment) {
      showToast('Please provide a comment before rejecting.', 'error');
      return;
    }

    dispatch(solvedBpeIssue({ txn: modalData.txnId, status: 'REJ', remark: comment })).then((res) => {
      if (res.payload.data.status === 'success' || res.payload.data.success === true) {
        showToast(res.payload.data.message || 'BPE Issue rejected successfully', 'success');
        dispatch(getBpeIssue());
        setOpenRejectModal(false);
        setComment('');
      }
    });
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

  const columns = [
    { field: 'id', headerName: '#' },
    { field: 'imei', headerName: 'IMEI', flex: 1 },
    { field: 'serialNo', headerName: 'Serial No', flex: 1 },
    { field: 'fromLocation', headerName: 'FromLocation', flex: 1 },
    { field: 'issue', headerName: 'Issue', flex: 1 },
    { field: 'pendingRemark', headerName: 'Pending Remark', flex: 1 },
    { field: 'insertBy', headerName: 'Insert By', flex: 1 },
    { field: 'insertDate', headerName: 'Insert Date', flex: 1 },
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   width: 250,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Button
    //           variant="contained"
    //           color="success"
    //           onClick={() => handleApproveClick(params.row)}
    //           size="medium"
    //           style={{ marginRight: '8px' }}
    //           startIcon={<CheckIcon />}
    //         >
    //           Approve
    //         </Button>

    //         <Button
    //           variant="contained"
    //           color="warning"
    //           onClick={() => handleRejectClick(params.row)}
    //           size="medium"
    //           startIcon={<CancelIcon />}
    //         >
    //           Pending
    //         </Button>
    //       </>
    //     );
    //   }
    // }
  ];

  const handleExportClick = () => {
    if (!dateRange.from || !dateRange.to) return showToast('Please select a date range', 'error');
    setExportLoading(true);
    dispatch(getIssueExcel({ from: dayjs(dateRange.from).format('YYYY-MM-DD'), to: dayjs(dateRange.to).format('YYYY-MM-DD') })).then(
      (res) => {
        if (res.payload.data.success) {
          window.open(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/${res.payload.data.data}`, '_blank');
          setExportLoading(false);
        } else {
          setExportLoading(false);
        }
      }
    );
  };

  // Import function to handle file upload

  return (
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
            // loading={totalProductLoading}
            onClick={() => {
              if (dateRange.from && dateRange.to) {
                dispatch(getBpeIssue({ from: dayjs(dateRange.from).format('YYYY-MM-DD'), to: dayjs(dateRange.to).format('YYYY-MM-DD') }));
              } else {
                showToast('Please select date', 'error');
              }
            }}
            variant="contained"
          >
            <FilterAltOutlinedIcon fontSize={'small'} sx={{ mr: '10px' }} />
            Search
          </LoadingButton>
          <LoadingButton
            variant="contained"
            sx={{
              mr: 1,
              backgroundColor: '#b7144d', // Custom color for Import button (Blue)
              '&:hover': {
                backgroundColor: '#9c1443' // Custom hover color
              }
            }}
            startIcon={<FileUploadIcon />}
            onClick={() => setOpenUploadModal(true)} // Open the modal when clicked
            loading={importLoading}
          >
            Import
          </LoadingButton>
          <LoadingButton
            variant="contained"
            startIcon={<FileDownloadIcon />}
            sx={{
              backgroundColor: '#0f7f39',
              '&:hover': {
                backgroundColor: '#0e5a2b'
              }
            }}
            onClick={handleExportClick}
            loading={exportLoading}
          >
            Export
          </LoadingButton>
        </Box>

        <Box sx={{ height: 'calc(100vh - 250px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
          <DataGrid
            loading={bpeIssueLoading || bpeIssueResolveLoading}
            rows={rows || []}
            columns={columns}
            sx={{
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #ddd', // Horizontal row borders
                borderRight: '1px solid #ddd' // Vertical column borders
              },
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: '1px solid #ddd', // Header separator
                background: '#1976d2 !important'
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '1px solid #ddd' // Add a top border
              }
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 30
                }
              }
            }}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay
            }}
            pageSizeOptions={[20]}
          />

          {/* Modal for Upload Instructions */}
          <UploadFileModal open={openUploadModal} onClose={handleCloseModal} />

          {/* Modal for Approve Action */}
          <Modal
            open={openApproveModal}
            onClose={handleCloseModal}
            aria-labelledby="approve-modal-title"
            aria-describedby="approve-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2
              }}
            >
              <Typography id="approve-modal-title" variant="h6" component="h2">
                Approve Action
              </Typography>

              {modalData && (
                <>
                  <Typography sx={{ mt: 2 }}>
                    <strong>IMEI:</strong> {modalData.imei}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    <strong>Serial No:</strong> {modalData.serialNo}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    <strong>Issue:</strong> {modalData.issue}
                  </Typography>
                </>
              )}

              <Typography id="approve-modal-description" sx={{ mt: 2 }}>
                Optional: Provide a comment for approval:
              </Typography>

              <TextField
                label="Comment"
                multiline
                fullWidth
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mt: 2 }}
              />

              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={handleCloseModal} variant="outlined">
                  Cancel
                </Button>
                <Button onClick={handleSubmitApprove} variant="contained" color="success" loading={bpeIssueResolveLoading}>
                  Submit
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* Modal for Reject Action */}
          <Modal
            open={openRejectModal}
            onClose={handleCloseModal}
            aria-labelledby="reject-modal-title"
            aria-describedby="reject-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2
              }}
            >
              <Typography id="reject-modal-title" variant="h6" component="h2">
                Pending Action
              </Typography>

              {modalData && (
                <>
                  <Typography sx={{ mt: 2 }}>
                    <strong>IMEI:</strong> {modalData.imei}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    <strong>Serial No:</strong> {modalData.serialNo}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    <strong>Issue:</strong> {modalData.issue}
                  </Typography>
                </>
              )}

              <Typography id="reject-modal-description" sx={{ mt: 2 }}>
                Please provide a comment for rejection:
              </Typography>

              <TextField
                label="Comment"
                multiline
                fullWidth
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mt: 2 }}
              />

              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={handleCloseModal} variant="outlined">
                  Cancel
                </Button>
                <Button onClick={handleSubmitReject} variant="contained" color="primary" loading={bpeIssueResolveLoading}>
                  Submit
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </LocalizationProvider>
  );
}

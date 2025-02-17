import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Modal, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { CustomNoRowsOverlay } from '../../components/table/CustomNoRowsOverlay';
import { showToast } from 'utils/ToastProvider';
import { solvedBpeIssue } from 'features/reports/reportSlice';
import { getBpeIssue } from 'features/reports/reportSlice';

export default function TotalDispatchDEviceTable() {
  const { bpeIssue, bpeIssueLoading, bpeIssueResolveLoading } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const rows = bpeIssue?.map((item, index) => ({
    id: index + 1,
    imei: item.imei,
    serialNo: item.serial,
    issue: item.issue,
    txnId: item.transaction
  })) || [];

  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [modalData, setModalData] = useState(null); 
  const [comment, setComment] = useState(''); 

  const handleApproveClick = (rowData) => {
    setModalData(rowData); 
    setOpenApproveModal(true); 
  };

  const handleRejectClick = (rowData) => {
    setModalData(rowData); 
    setOpenRejectModal(true);  
  };

  const handleSubmitApprove = () => {
    dispatch(solvedBpeIssue({ txn: modalData.txnId, status: "Y", remark: comment })).then((res) => {
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

    dispatch(solvedBpeIssue({ txn: modalData.txnId, status: "REJ", remark: comment })).then((res) => {
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
    setComment('');
  };

  useEffect(() => {
    dispatch(getBpeIssue());
  }, [dispatch]);

  const columns = [
    { field: 'id', headerName: '#' },
    { field: 'imei', headerName: 'IMEI', flex: 1 },
    { field: 'serialNo', headerName: 'Serial No', flex: 1 },
    { field: 'issue', headerName: 'Issue', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      width: 250,  
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="success"  
              onClick={() => handleApproveClick(params.row)}
              size="medium"
              style={{ marginRight: '8px' }} 
              startIcon={<CheckIcon />}
            >
              Approve
            </Button>

            <Button
              variant="contained"
              color="error" 
              onClick={() => handleRejectClick(params.row)} 
              size="medium"
              startIcon={<CancelIcon />}
            >
              Reject
            </Button>
          </>
        );
      }
    }
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 170px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
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
            borderRadius: 2,
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
            borderRadius: 2,
          }}
        >
          <Typography id="reject-modal-title" variant="h6" component="h2">
            Reject Action
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
            <Button onClick={handleSubmitReject} variant="contained" color="error" loading={bpeIssueResolveLoading}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
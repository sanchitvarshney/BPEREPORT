import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Modal, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import dayjs from 'dayjs';
import { showToast } from 'utils/ToastProvider';
import { solvedBpeIssue } from 'features/reports/reportSlice';
import { getBpeIssue } from 'features/reports/reportSlice';

export default function TotalDispatchDEviceTable({ dateRange }) {
  const { bpeIssue, bpeIssueLoading } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const rows = bpeIssue?.map((item, index) => ({
    id: index + 1,
    imei: item.imei,
    serialNo: item.serial,
    issue: item.issue,
    txnId: item.transaction
  })) || [];

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null); // For storing the selected row data
  const [comment, setComment] = useState(''); // For storing the reject comment

  const handleApproveClick = (txnId) => {
    dispatch(solvedBpeIssue({ txn: txnId, status: "Y" })).then((res) => {
      console.log(res);
    });
  };

  const handleRejectClick = (txnId) => {
    setModalData(txnId); // Store the txnId for rejection
    setOpenModal(true);  // Open modal for rejection
  };

  const handleSubmitReject = () => {
    if (!comment) {
      showToast('Please provide a comment before rejecting.', 'error');
      return;
    }

    dispatch(solvedBpeIssue({ txn: modalData, status: "REJ", remark:comment })).then((res) => {
      console.log(res);
      setOpenModal(false);
      setComment(''); // Reset comment after submit
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
      width: 250,  // Increased width to accommodate both buttons
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="success"  // Green color for approve button
              onClick={() => handleApproveClick(params.row.txnId).then((res)=>{
                console.log(res)
                if(res.payload.status === 'success'){
                  showToast('BPE Issue approved successfully', 'success');
                  dispatch(getBpeIssue());
                }
              })}
              size="medium"
              style={{ marginRight: '8px' }} // Add some space between buttons
              startIcon={<CheckIcon />}
            >
              Approve
            </Button>

            <Button
              variant="contained"
              color="error"  // Red color for reject button
              onClick={() => handleRejectClick(params.row.txnId).then((res)=>{
                console.log(res)
                if(res.payload.status === 'success'){
                  showToast('BPE Issue rejected successfully', 'success');
                  dispatch(getBpeIssue());
                }
              })}
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
        loading={bpeIssueLoading}
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
        pageSizeOptions={[20]}
      />

      {/* Modal for Reject Action */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
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
          <Typography id="modal-title" variant="h6" component="h2">
            Reject Action
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
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
            <Button onClick={handleSubmitReject} variant="contained" color="error">
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

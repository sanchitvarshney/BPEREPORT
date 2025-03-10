import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { useDispatch,useSelector } from 'react-redux';
import { Typography, Modal, Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { showToast } from 'utils/ToastProvider';
import { LoadingButton } from '@mui/lab';
import { uploadIssueExcel, updateIssueExcel } from 'features/reports/reportSlice';
import ShowBERUploadData from 'components/table/ShowBERUploadData';

export default function UploadFileModal({ open, onClose }) {
  const { uploadIssueExcelLoading,updateIssueExcelLoading } = useSelector((state) => state.report);
  const [importLoading, setImportLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showUploadedData, setShowUploadedData] = useState(false);
  const [uploadedData, setUploadedData] = useState([]);
  const dispatch = useDispatch();
  const handleImportClick = (event) => {
    const file = event.target.files[0];
    if (!file) {
      showToast('Please select a file to import.', 'error');
      return;
    }
    event.target.value = null;
    setImportLoading(true);
    dispatch(uploadIssueExcel(file)).then((res) => {
      if (res.payload.data.success) {
        showToast('File imported successfully.', 'success');
        setUploadedData(res.payload.data.data);
        setShowUploadedData(true);
        // dispatch(getBpeIssue()); // Reload the BPE Issues after import
      } else {
        showToast('File import failed.', 'error');
      }
      setImportLoading(false);
    });
  };

  const onSubmitData = () => {
    setSubmitLoading(true);
    dispatch(updateIssueExcel(uploadedData)).then((res) => {
      if (res.payload.data.status === 'success' || res.payload.data.success === true) {
        showToast(res.payload.data.message || 'BPE Issue updated successfully', 'success');
        setShowUploadedData(false);
        onClose();
      }
    });
    setSubmitLoading(false);
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="upload-modal-title" aria-describedby="upload-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 4,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'linear-gradient(to right, #f9f9f9, #ffffff)' // Gradient background for the modal
        }}
      >
        {/* Modal Title */}
        <Typography
          id="upload-modal-title"
          variant="h5"
          component="h2"
          sx={{
            mb: 2,
            fontWeight: 900,
            color: '#2a2a2a',
            textAlign: 'center',
            letterSpacing: 1
          }}
        >
          <strong>Upload Instructions</strong>
        </Typography>

        {/* Instructions Section */}
        <Typography sx={{ fontWeight: 600, mb: 1, color: '#555' }}>Instructions:</Typography>
        <Typography sx={{ mb: 1, color: '#777' }}>1. All columns are mandatory.</Typography>
        <Typography sx={{ mb: 1, color: '#777' }}>
          2. If you approve, write <strong>"APR"</strong> in the status column.
        </Typography>
        {/* <Typography sx={{ mb: 1, color: '#777' }}>
          3. If you reject, write <strong>"REJ"</strong> in the status column.
        </Typography> */}

        {/* File Upload Section */}
        <Typography
          id="upload-modal-description"
          sx={{
            mt: 3,
            mb: 2,
            fontWeight: 600,
            color: '#555',
            textAlign: 'center'
          }}
        >
          Select an Excel file to upload:
        </Typography>

        {/* File Upload Button */}
        <Box
          sx={{
            width: '100%',
            borderRadius: 2,
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2
          }}
        >
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleImportClick} // Handle file import
            style={{
              display: 'none'
            }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <LoadingButton
              variant="contained"
              component="span"
              color="primary"
              sx={{
                borderRadius: 20,
                padding: '8px 24px',
                fontWeight: 600,
                letterSpacing: 1,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#1976d2',
                  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)'
                }
              }}
              loading={uploadIssueExcelLoading}
            >
              <FileUploadIcon sx={{ mr: 1 }} />
              Upload File
            </LoadingButton>
          </label>
        </Box>

        <ShowBERUploadData
          open={showUploadedData}
          onClose={()=>setShowUploadedData(false)}
          data={uploadedData || []}
          loading={submitLoading}
          updateIssueExcelLoading={updateIssueExcelLoading}
          onSubmitData={onSubmitData}
        />
        {/* Close Button Section */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            color="secondary"
            sx={{
              borderRadius: 20,
              fontWeight: 600,
              letterSpacing: 1,
              padding: '8px 24px',
              '&:hover': {
                backgroundColor: '#f44336',
                color: '#fff'
              }
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

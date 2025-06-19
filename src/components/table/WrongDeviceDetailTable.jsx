import * as React from 'react';
import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

export default function WrongDeviceDetailTable({ categoryFilter, records = [], header = [], loading = false }) {
  const [openImagePopup, setOpenImagePopup] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loadingImage, setLoadingImage] = useState(true);
  const { wrongDeviceDetailLoading } = useSelector((state) => state.report);

  // Create dynamic columns based on header
  const columns = useMemo(() => {
    if (!header || header.length === 0) return [];

    // Filter out columns we don't want to display
    const filteredHeaders = header.filter((h) => h !== 'Transaction ID' && h !== 'Attachments' && h !== 'Inserted By');

    const dynamicColumns = filteredHeaders.map((headerName) => ({
      field: headerName,
      headerName: headerName,
      width: 150,
      flex: 1,
      minWidth: 120
    }));

    // Add the "View" column for the "eye" icon
    dynamicColumns.push({
      field: 'view',
      headerName: 'View Image',
      width: 100,
      renderCell: (params) => {
        const attachments = params.row['Attachments'];
        if (attachments && attachments.length > 0) {
          return (
            <IconButton onClick={() => handleOpenImage(attachments[0])} color="primary">
              <VisibilityIcon />
            </IconButton>
          );
        }
        return null;
      }
    });

    return dynamicColumns;
  }, [header]);

  // Create rows with proper IDs
  const rows = useMemo(() => {
    if (!records || records.length === 0) return [];

    return records.map((item, index) => ({
      id: index + 1,
      ...item
    }));
  }, [records]);

  // Filter rows based on category
  const filteredRows = useMemo(() => {
    if (categoryFilter === 'all') return rows;
    return rows.filter((row) => row.Category === categoryFilter);
  }, [rows, categoryFilter]);

  // Function to open the image in a new popup/modal
  const handleOpenImage = (url) => {
    setImageUrl(url);
    setOpenImagePopup(true);
    setLoadingImage(true);

    // Simulate loading time
    setTimeout(() => {
      setLoadingImage(false);
    }, 1000);
  };

  const handleCloseImagePopup = () => {
    setOpenImagePopup(false);
    setImageUrl('');
    setLoadingImage(true);
  };

  const handleImageLoad = () => {
    setLoadingImage(false);
  };

  return (
    <Box sx={{ height: 'calc(100vh - 300px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={loading || wrongDeviceDetailLoading}
        rows={filteredRows}
        columns={columns}
        hideFooter={true}
        // sx={{
        //   '& .MuiDataGrid-cell': {
        //     borderBottom: '1px solid #ddd',
        //     borderRight: '1px solid #ddd'
        //   },
        //   '& .MuiDataGrid-columnHeaders': {
        //     borderBottom: '1px solid #ddd',
        //     background: '#1976d2 !important'
        //   },
        //   '& .MuiDataGrid-footerContainer': {
        //     borderTop: '1px solid #ddd'
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
        // pageSizeOptions={[20]}
        // disableRowSelectionOnClick
      />

      <Dialog open={openImagePopup} onClose={handleCloseImagePopup} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center' }}>Image Preview</DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {loadingImage ? (
            <CircularProgress color="primary" />
          ) : (
            <img
              src={imageUrl}
              alt="Attachment"
              style={{ width: '100%', maxWidth: '500px', height: 'auto', objectFit: 'contain' }}
              onLoad={handleImageLoad}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <button
            onClick={handleCloseImagePopup}
            style={{ padding: '8px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

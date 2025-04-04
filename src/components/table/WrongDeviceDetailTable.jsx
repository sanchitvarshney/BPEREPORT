import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@mui/material';

export default function WrongDeviceDetailTable({ categoryFilter }) {
  const { wrongDeviceDetail, wrongDeviceDetailLoading } = useSelector((state) => state.report);

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [openImagePopup, setOpenImagePopup] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loadingImage, setLoadingImage] = useState(true);

  // Effect to handle dynamic columns and rows based on backend response
  useEffect(() => {
    if (wrongDeviceDetail?.data) {
      // Filter out the 'Transaction ID' and 'Attchments' columns
      const dynamicColumns = wrongDeviceDetail?.header
        ?.map((header) => ({
          field: header,
          headerName: header,
          width: 150
        }))
        .filter((column) => column.field !== 'Transaction ID' && column.field !== 'Attchments' && column.field !== 'Inserted By');

      // Add the "View" column for the "eye" icon
      dynamicColumns.push({
        field: 'view',
        headerName: 'View Image',
        width: 100,
        renderCell: (params) => {
          const attachments = params.row['Attchments'];
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

      const dynamicRows = wrongDeviceDetail.data?.map((item, index) => ({
        id: index + 1,
        ...item
      }));

      setColumns(dynamicColumns);
      setRows(dynamicRows);
      setFilteredRows(dynamicRows);
    }
  }, [wrongDeviceDetail]);

  // Effect to handle category filtering
  useEffect(() => {
    if (categoryFilter === 'all') {
      setFilteredRows(rows);
    } else {
      const filtered = rows.filter((row) => row.Category === categoryFilter);
      setFilteredRows(filtered);
    }
  }, [categoryFilter, rows]);

  // Function to open the image in a new popup/modal
  const handleOpenImage = (url) => {
    setImageUrl(url);
    setOpenImagePopup(true);
    setLoadingImage(true);

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
    <Box sx={{ height: 'calc(100vh - 240px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={wrongDeviceDetailLoading}
        rows={filteredRows}
        columns={columns}
        sx={{
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #ddd',
            borderRight: '1px solid #ddd'
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '1px solid #ddd',
            background: '#1976d2 !important'
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #ddd'
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

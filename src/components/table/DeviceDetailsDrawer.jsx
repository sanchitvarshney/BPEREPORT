import * as React from 'react';
import { Modal, Box, Button, CircularProgress, Typography } from '@mui/material';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';
import { DataGrid } from '@mui/x-data-grid';
import { Download } from '@mui/icons-material';
import { exportToExcel } from 'helper/excelExport';

const DeviceDetailsModal = ({ open, data, onClose, loading }) => {
  // Check if data exists and is not empty before rendering the DataGrid
  const rows =
    data?.map((item, index) => ({
      id: index + 1,
      imei_no: item.imei_no,
      serial_no: item.serial_no
    })) || [];

  const columns = [
    { field: 'id', headerName: '#', flex: 1 },
    { field: 'imei_no', headerName: 'IMEI No', flex: 1 },
    { field: 'serial_no', headerName: 'Serial No', flex: 1 }
  ];

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="device-details-modal" aria-describedby="device-details-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4
        }}
      >
         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3" id="device-details-modal">
            Device Details
          </Typography>
          
          <Button
            disabled={!data}
            variant="contained"
            color="success"
            onClick={() => {
              if (data) {
                exportToExcel(data, 'Device_Details');
              }
            }}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Download fontSize={'small'} sx={{ mr: '10px' }} />
            Download
          </Button>
        </Box>
        {/* Only show the DataGrid if data exists */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : data && data.length > 0 ? (
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={rows || []}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
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
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>No data available</div>
          </Box>
        )}
        <Button onClick={onClose} variant="contained" sx={{ mb: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default DeviceDetailsModal;

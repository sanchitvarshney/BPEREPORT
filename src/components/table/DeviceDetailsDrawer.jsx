import * as React from 'react';
import { Modal, Box, Button,CircularProgress,Typography  } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const DeviceDetailsModal = ({ open, data, onClose,loading }) => {
  // Check if data exists and is not empty before rendering the DataGrid
  const rows = data?.map((item, index) => ({
    id: index + 1,
    imei_no: item.imei_no,
    serial_no: item.serial_no
  }));

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
        <Typography variant="h3" id="device-details-modal">Device Details</Typography>
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

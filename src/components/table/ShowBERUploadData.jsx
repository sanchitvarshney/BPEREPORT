import * as React from 'react';
import { Modal, Box, Button, CircularProgress, Typography } from '@mui/material';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';
import { DataGrid } from '@mui/x-data-grid';
import { Download } from '@mui/icons-material';
import { exportToExcel } from 'helper/excelExport';

const ShowBERUploadData = ({ open, data, onClose, loading ,onSubmitData }) => {
  // Dynamically create rows based on the data
  const rows = data?.map((item, index) => ({
    id: index + 1,
    ...item, // Spread the data fields into the row
  })) || [];

  // Dynamically create columns based on the keys of the first item in data
  const columns = data && data.length > 0 ? 
    Object.keys(data[0]).map(key => ({
      field: key,
      headerName: key.replace(/_/g, ' ').toUpperCase(), // Display field names in a readable format (snake_case to Title Case)
      flex: 1,
    }))
    : [];


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
            disabled={!data || data.length === 0}
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

        {/* Show CircularProgress if loading */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : data && data.length > 0 ? (
          // Display DataGrid if data exists
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              sx={{
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #ddd',
                  borderRight: '1px solid #ddd',
                },
                '& .MuiDataGrid-columnHeaders': {
                  borderBottom: '1px solid #ddd',
                  background: '#1976d2 !important',
                },
                '& .MuiDataGrid-footerContainer': {
                  borderTop: '1px solid #ddd',
                },
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 30,
                  },
                },
              }}
              slots={{
                noRowsOverlay: CustomNoRowsOverlay,
              }}
              pageSizeOptions={[20]}
            />
          </Box>
        ) : (
          // No data available message
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>No data available</div>
          </Box>
        )}

        {/* Button container */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose} variant="outlined" sx={{ mb: 2 }}>
            Close
          </Button>
          <Button onClick={onSubmitData} variant="contained" sx={{ mb: 2 }} >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ShowBERUploadData;

import * as React from 'react';
import { Drawer, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


const DeviceDetailsDrawer= ({ open, data, onClose }) => {
  // Check if data exists and is not empty before rendering the DataGrid
  const rows = data?.map((item, index) => ({
    id: index + 1,
    imei_no: item.imei_no,
    serial_no: item.serial_no,
    loc_in: item.loc_in,
    loc_out: item.loc_out || 'N/A',
    transaction_id: item.transaction_id
  }));

  const columns = [
    { field: 'id', headerName: '#', width: 90 },
    { field: 'imei_no', headerName: 'IMEI No', width: 200 },
    { field: 'serial_no', headerName: 'Serial No', width: 200 },
    { field: 'loc_in', headerName: 'Location In', width: 200 },
    { field: 'loc_out', headerName: 'Location Out', width: 200 },
    { field: 'transaction_id', headerName: 'Transaction ID', width: 200 }
  ];

  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={{ width: '50%',height: '100%' }}>
      <Box sx={{ width: '100%', padding: 2 }}>
        <Button onClick={onClose} variant="contained" sx={{ mb: 2 }}>
          Close
        </Button>

        {/* Only show the DataGrid if data exists */}
        {data && data.length > 0 ? (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows || []}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>
        ) : (
          <div>No data available</div>
        )}
      </Box>
    </Drawer>
  );
};

export default DeviceDetailsDrawer;

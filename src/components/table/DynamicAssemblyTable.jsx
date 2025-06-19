import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';

const DynamicAssemblyTable = ({ data, components,loading }) => {
  // Create dynamic columns based on the `components` array
  const columns = [
    { field: 'IMEI No', headerName: 'IMEI No', width: 150 },
    { field: 'Serial No', headerName: 'Serial No', width: 150 },
    ...components?.map((component) => ({
      field: component['Part No'],
      headerName: component['Part Name']+' ('+component['Part No']+')',
      width: 200,
      renderCell: (params) => {
        // Find the quantity for this component
        const componentData = params.row.Components.find((comp) => comp['Part No'] === component['Part No']);
        return componentData ? componentData.Quantity : '0';
      }
    }))
  ];
  const isSwipe = window.location.pathname.includes('swipe');

  // Prepare rows where each row corresponds to a device and its components
  const rows = data?.map((device, index) => ({
    id: index + 1,
    'IMEI No': device['IMEI No'],
    'Serial No': device['Serial No'],
    Components: device.Components || []
  }));

  return (
    <Box sx={{ height: isSwipe ? 'calc(100vh - 235px)' : 'calc(100vh - 300px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
      loading={loading}
        rows={rows || []}
        columns={columns}
        // pageSize={5}
        // rowsPerPageOptions={[5]}
        disableSelectionOnClick
        slots={{
          noRowsOverlay: CustomNoRowsOverlay
        }}
        // sx={{
        //   '& .MuiDataGrid-cell': {
        //     borderBottom: '1px solid #ddd', // Horizontal row borders
        //     borderRight: '1px solid #ddd' // Vertical column borders
        //   },
        //   '& .MuiDataGrid-columnHeaders': {
        //     borderBottom: '1px solid #ddd', // Header separator
        //     background: '#1976d2 !important'
        //   },
        //   '& .MuiDataGrid-footerContainer': {
        //     borderTop: '1px solid #ddd' // Add a top border
        //   }
        // }}
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: rows.length || 100
        //     }
        //   }
        // }}
        // pageSizeOptions={[rows.length || 100]}
        hideFooter={true}
      />
    </Box>
  );
};

export default DynamicAssemblyTable;

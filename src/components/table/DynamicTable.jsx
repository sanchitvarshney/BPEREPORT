import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function DynamicTable({rowdata}) {

  // Dynamically generate columns based on keys of the first object in the array
  const columns = rowdata?.length
    ? Object.keys(rowdata[0]).map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize column headers
        width: 150, // Default width for all columns
        type: typeof rowdata[0][key] === 'number' ? 'number' : 'string' // Set type based on data
      }))
    : [];

  // Map rows, adding a unique `id` field for DataGrid
  const rows = rowdata?.map((item, index) => ({
    id: index + 1, // Add an ID field for DataGrid
    ...item // Spread the rest of the object
  }));

  return (
    <Box sx={{ height: 500, width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={productsLoading}
        rows={rows || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 30
            }
          }
        }}
        pageSizeOptions={[30, 50, 70, 100]}
        pagination
      />
    </Box>
  );
}

import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';

export default function ComponentSummaryTable() {
  const { componentSummary, componentSummaryLoading } = useSelector((state) => state.report);
  
  const rows = componentSummary?.map((item, index) => ({
    id: index + 1,
    partNo: item.partNo,
    componentName: item.component,
    totalQuantiity: item.total_quantity,
    category: item.category,
  }));

  const columns = [
    { field: 'id', headerName: '#', width: 90 },
    { field: 'partNo', headerName: 'Part No', width: 150 },
    { field: 'componentName', headerName: 'Component Name', width: 200 },
    { field: 'totalQuantiity', headerName: 'Total Quantity', width: 130 },
    { field: 'category', headerName: 'Category', type: 'number', width: 130 },
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 170px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={componentSummaryLoading}
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
        slots={{
          noRowsOverlay: CustomNoRowsOverlay
        }}
        pageSizeOptions={[20]}
      />
    </Box>
  );
}

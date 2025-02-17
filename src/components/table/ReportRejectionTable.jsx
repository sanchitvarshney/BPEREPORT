import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';

export default function () {
  const { rejectionReport, rejectionReportLoading } = useSelector((state) => state.report);
  const rows = rejectionReport?.map((item, index) => ({
    id: index + 1,
    opening: item.OpeningBalance,
    inward: item.TotalIn,
    outward: item.TotalOut,
    issue_label: item.issue_label,
    closing:item.ClosingBalance,
  }))||[];

  const columns = [
    { field: 'id', headerName: '#', width: 90 },
    { field: 'issue_label', headerName: 'Issue', width: 230 },
    { field: 'opening', headerName: 'Opening', type: 'number', width: 130 },
    { field: 'inward', headerName: 'Inward', type: 'number', width: 130 },
    { field: 'outward', headerName: 'Outward', type: 'number', width: 130 },
    { field: 'closing', headerName: 'Closing', type: 'number', width: 130 },
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 170px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={rejectionReportLoading}
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

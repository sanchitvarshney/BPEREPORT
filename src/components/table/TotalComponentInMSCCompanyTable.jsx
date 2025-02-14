import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';

const columns = [
  { field: 'id', headerName: '#', width: 90 },
  { field: 'partNo', headerName: 'Component No', width: 150 },
  { field: 'componentName', headerName: 'Component Name', width: 400 },
  { field: 'opening', headerName: 'Opening', type: 'number', width: 130 },
  { field: 'inward', headerName: 'Inward', type: 'number', width: 130 },
  { field: 'outward', headerName: 'Outward', type: 'number', width: 130 },
  { field: 'balance', headerName: 'Balance', type: 'number', width: 130 }
];

export default function TotalComponentInMSCCompanyTable() {
  const { totalComponentInMSC, totalComponentInMSCLoading } = useSelector((state) => state.report);

  // Map the rows to match the new data structure
  const rows = totalComponentInMSC?.map((item, index) => ({
    id: index + 1,
    partNo: item['Part No'],
    componentName: item['Component Name'],
    opening: item.Opening,
    inward: item.Inward,
    outward: item.Outward,
    balance: item.Balance
  }))||[];

  return (
    <Box sx={{ height: 'calc(100vh - 170px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={totalComponentInMSCLoading}
        rows={rows}
        columns={columns}
        sx={{
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #ddd', // Horizontal row borders
            borderRight: '1px solid #ddd' // Vertical column borders
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '1px solid #ddd', // Header separator
            borderRight: '1px solid #ddd', // Vertical column borders
            backgroundColor: '#f2f2f2'
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

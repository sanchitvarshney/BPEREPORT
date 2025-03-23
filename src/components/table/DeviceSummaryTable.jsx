import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';

const columns = [
  { field: 'id', headerName: '#', width: 90 },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'txnId', headerName: 'Transaction Id', width: 400 },
  { field: 'method', headerName: 'Method',  width: 130 },
  { field: 'locationIn', headerName: 'Location In',  width: 130 },
  { field: 'locationOut', headerName: 'Location Out',width: 130 },
  { field: 'transactionType', headerName: 'Transaction Type', width: 130 },
  { field: 'remark', headerName: 'Remark', width: 130 },
];

export default function TotalComponentInBPECompanyTable() {
  const { deviceSummaryLoading, deviceSummary } = useSelector((state) => state.report);

  // Map the rows to match the new data structure
  const rows = deviceSummary?.map((item, index) => ({
    id: index + 1,
    date: item.time,
    txnId: item.refId,
    method: item.method,
    locationIn: item.location,
    locationOut: item.locationOut,
    transactionType: item.transactionType
  }))||[];

  return (
    <Box sx={{ height: "calc(100vh - 170px)",  width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={deviceSummaryLoading}
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

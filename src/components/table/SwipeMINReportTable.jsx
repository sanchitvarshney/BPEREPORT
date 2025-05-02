import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';

export default function SwipeMINReportTable() {
  const { swipeMachineReport, swipeMachineReportLoading } = useSelector((state) => state.report);

  const columns = [
    { field: 'inwardLoc', headerName: 'Inward Location', width: 150 },
    { field: 'partnerName', headerName: 'Partner Name', width: 150 },
    { field: 'method', headerName: 'Method', width: 100 },
    { field: 'skuName', headerName: 'SKU Name', width: 150 },
    { field: 'deviceSKU', headerName: 'Device SKU', width: 120 },
    { field: 'model', headerName: 'Model', width: 120 },
    { field: 'serialNo', headerName: 'Serial No', width: 150 },
    { field: 'imeiNo1', headerName: 'IMEI No 1', width: 150 },
    { field: 'imeiNo2', headerName: 'IMEI No 2', width: 150 },
    { field: 'txnID', headerName: 'Transaction ID', width: 200 },
    { field: 'remark', headerName: 'Remark', width: 150 },
    { field: 'insertData', headerName: 'Insert Date', width: 150 }
  ];

  const rows =
    swipeMachineReport?.map((item, index) => ({
      id: index + 1,
      ...item
    })) || [];

  return (
    <Box sx={{ height: 'calc(100vh - 240px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={swipeMachineReportLoading}
        rows={rows}
        columns={columns}
        sx={{
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #ddd',
            borderRight: '1px solid #ddd'
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '1px solid #ddd',
            background: '#1976d2 !important'
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #ddd'
          }
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          }
        }}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

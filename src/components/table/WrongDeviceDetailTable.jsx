import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';
import { useSocketContext } from '../../contexts/SocketContext';

export default function TotalDeviceInCompanyTable() {
  const { wrongDeviceDetail, wrongDeviceDetailLoading } = useSelector((state) => state.report);

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  console.log(wrongDeviceDetail, "wrongDeviceDetail");

  // Effect to handle dynamic columns and rows based on backend response
  useEffect(() => {
    if (wrongDeviceDetail?.data) {
      const dynamicColumns = wrongDeviceDetail?.header?.map((header) => ({
        field: header,
        headerName: header,
        width: 150,
      }));

      // Filter out the 'Transaction Id' column
      const filteredColumns = dynamicColumns.filter((column) => column.field !== 'Transaction ID');

      const dynamicRows = wrongDeviceDetail.data?.map((item, index) => ({
        id: index + 1,
        ...item,
      }));

      setColumns(filteredColumns); // Set filtered columns
      setRows(dynamicRows); // Set rows
    }
  }, [wrongDeviceDetail]);

  return (
    <Box sx={{ height: "calc(100vh - 240px)", width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={wrongDeviceDetailLoading}
        rows={rows}
        columns={columns} // Dynamically filtered columns
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
  );
}

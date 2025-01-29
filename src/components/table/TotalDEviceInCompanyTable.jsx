import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'SKU', headerName: 'SKU', width: 150 },
  { field: 'productName', headerName: 'Product Name', width: 200 },
  { field: 'opening', headerName: 'Opening', type: 'number', width: 130 },
  { field: 'inward', headerName: 'Inward', type: 'number', width: 130 },
  { field: 'outward', headerName: 'Outward', type: 'number', width: 130 },
  { field: 'balance', headerName: 'Balance', type: 'number', width: 130 }
];

export default function TotalDeviceInCompanyTable() {
  const { totalProduct, totalProductLoading } = useSelector((state) => state.report);
  const rows = totalProduct?.map((item, index) => ({
    id: index + 1,
    SKU: item.SKU,
    productName: item['Product Name'],
    opening: item.Opening,
    inward: item.Inward,
    outward: item.Outward,
    balance: item.Balance
  }));

  return (
    <Box sx={{ height: 500, width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={totalProductLoading}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 30
            }
          }
        }}
        pageSizeOptions={[20]}
      />
    </Box>
  );
}

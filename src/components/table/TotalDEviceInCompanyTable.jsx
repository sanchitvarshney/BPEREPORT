import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';
import { getDeviceSerialNoForCompany } from 'features/reports/reportSlice';
import dayjs from 'dayjs';
import { showToast } from 'utils/ToastProvider';
import DeviceDetailsDrawer from 'components/table/DeviceDetailsDrawer';

export default function TotalDeviceInCompanyTable({ dateRange,type }) {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData(null);
  }
  const { totalProduct, totalProductLoading,serialNoForCompanyData,serialNoForCompanyDataLoading } = useSelector((state) => state.report);
  const rows = totalProduct?.map((item, index) => ({
    id: index + 1,
    SKU: item.SKU,
    productName: item['Product Name'],
    opening: item.Opening,
    inward: item.Inward,
    outward: item.Outward,
    balance: item.Balance,
    key:item.SKUKEY,
  }));
  const columns = [
    { field: 'id', headerName: '#', width: 90 },
    { field: 'SKU', headerName: 'SKU', width: 150 },
    { field: 'productName', headerName: 'Product Name', width: 200 },
    { field: 'opening', headerName: 'Opening', type: 'number', width: 130 },
    { field: 'inward', headerName: 'Inward', type: 'number', width: 130 },
    { field: 'outward', headerName: 'Outward', type: 'number', width: 130 },
    { field: 'balance', headerName: 'Balance', type: 'number', width: 130 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            onClick={() => {
              setOpenModal(true);
              if (!dateRange.from || !dateRange.to) {
                showToast('Please select a date range', 'error');
              } else {
                dispatch(
                  getDeviceSerialNoForCompany({
                    from: dayjs(dateRange.from).format('DD-MM-YYYY'),
                    to: dayjs(dateRange.to).format('DD-MM-YYYY'),
                    deviceKey: params?.row?.key,
                    type:type
                  })
                );
              }
            }}
            size="small"
          >
            View Details
          </Button>
        );
      }
    }
  ];
  return (
    <Box sx={{ height: 'calc(100vh - 170px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={totalProductLoading}
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
      <DeviceDetailsDrawer open={openModal} onClose={handleCloseModal} data={serialNoForCompanyData} />
    </Box>
  );
}

import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';
import { Button } from '@mui/material';
import DeviceDetailsDrawer from 'components/table/DeviceDetailsDrawer';
import dayjs from 'dayjs';
import { showToast } from 'utils/ToastProvider';
import { getDispatchDeviceSerialNo } from 'features/reports/reportSlice';

export default function TotalDispatchDEviceTable({ dateRange }) {
  const { dispatchDataReportLoading, dispatchDataReport,totalDispatchDevicesLoading, totalDispatchDevices } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const rows = dispatchDataReport?.map((item, index) => ({
    id: index + 1,
    SKU: item.SKU,
    productName: item['Product Name'],
    opening: item.Opening,
    inward: item.Inward,
    outward: item.Outward,
    balance: item.Balance,
    key: item.SKUKEY
  }))||[];

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

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
                  getDispatchDeviceSerialNo({
                    from: dayjs(dateRange.from).format('DD-MM-YYYY'),
                    to: dayjs(dateRange.to).format('DD-MM-YYYY'),
                    deviceKey: params?.row?.key
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

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData(null);
  };

  return (
    <Box sx={{ height: 'calc(100vh - 170px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={dispatchDataReportLoading}
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
      <DeviceDetailsDrawer open={openModal} onClose={handleCloseModal} data={totalDispatchDevices} loading={totalDispatchDevicesLoading} />
    </Box>
  );
}

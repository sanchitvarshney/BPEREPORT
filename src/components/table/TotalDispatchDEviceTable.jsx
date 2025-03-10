import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';
import { Download } from '@mui/icons-material';
import DeviceDetailsDrawer from 'components/table/DeviceDetailsDrawer';
import dayjs from 'dayjs';
import { showToast } from 'utils/ToastProvider';
import { useSocketContext } from '../../contexts/SocketContext';

export default function TotalDispatchDEviceTable({ dateRange }) {
  const { dispatchDataReportLoading, dispatchDataReport,totalDispatchDevicesLoading, totalDispatchDevices } = useSelector((state) => state.report);
  const { emitFGDispatch,onDownloadReport } = useSocketContext();

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

    useEffect(() => {
      onDownloadReport(() => {
        showToast("Report downloaded successfully", "success");
      });
    }, [onDownloadReport]);

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const columns = [
    { field: 'id', headerName: '#', width: 90 },
    { field: 'SKU', headerName: 'SKU', width: 150 },
    { field: 'productName', headerName: 'Product Name', width: 200 },
    { 
      field: 'opening', 
      headerName: 'Opening', 
      type: 'number', 
      width: 130 
    },
    { 
      field: 'inward', 
      type: 'number', 
      width: 130,
      headerName: 'Inward',
      renderHeader: () => (
        <div style={{ textAlign: 'center' }}>
          <span>Inward</span>
          <br />
          <small style={{ color: 'darkgray', fontSize: '12px' }}>(FG Location)</small>
        </div>
      )
    },
    { 
      field: 'outward', 
      type: 'number', 
      width: 130,
      headerName: 'Outward',
      renderHeader: () => (
        <div style={{ textAlign: 'center' }}>
          <span>Outward</span>
          <br />
          <small style={{ color: 'darkgray', fontSize: '12px' }}>(Dispatched)</small>
        </div>
      )
    },
    { 
      field: 'balance', 
      headerName: 'Balance', 
      type: 'number', 
      width: 130 
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              // setOpenModal(true);
              if (!dateRange.from || !dateRange.to) {
                showToast('Please select a date range', 'error');
              } else {
                emitFGDispatch({
                  startDate: dayjs(dateRange.from).format('DD-MM-YYYY'),
                  endDate: dayjs(dateRange.to).format('DD-MM-YYYY'),
                  device_key: params?.row?.key,
                  type: "both"
                });
                showToast('Download started', 'success');
              }
            }}
            color="primary"
          >
            <Download />
          </IconButton>
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

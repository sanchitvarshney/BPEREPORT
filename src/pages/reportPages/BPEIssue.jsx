import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { CustomNoRowsOverlay } from '../../components/table/CustomNoRowsOverlay';
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import dayjs from 'dayjs';
import { showToast } from 'utils/ToastProvider';
import { getBERDeviceSerialNo } from 'features/reports/reportSlice';
import {getBpeIssue} from 'features/reports/reportSlice';

export default function TotalDispatchDEviceTable({ dateRange }) {
  const { bpeIssue, bpeIssueLoading } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const rows = bpeIssue?.map((item, index) => ({
    id: index + 1,
    imei: item.imei,
    serialNo: item.serial,
    issue: item.issue
  }))||[];

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const columns = [
    { field: 'id', headerName: '#', },
    { field: 'imei', headerName: 'IMEI', flex:1 },
    { field: 'serialNo', headerName: 'Serial No', flex:1 },
    { field: 'issue', headerName: 'Issue', flex:1 },
    {
      field: 'action',
      headerName: 'Action',
      width: 250,  // Increased width to accommodate both buttons
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="success"  // Green color for approve button
              onClick={() => {
                // Handle approve action
                console.log('Approved:', params?.row?.key);
                // Add additional logic for approval, if necessary
              }}
              size="medium"
              style={{ marginRight: '8px' }} // Add some space between buttons
              startIcon={<CheckIcon />}
            >
              Approve
            </Button>
            
            <Button
              variant="contained"
              color="error"  // Red color for reject button
              onClick={() => {
                // Handle reject action
                console.log('Rejected:', params?.row?.key);
                // Add additional logic for rejection, if necessary
              }}
              size="medium"
              startIcon={<CancelIcon />} 
            >
              Reject
            </Button>
          </>
        );
      }
    }
  ];
  

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData(null);
  };

  useEffect(() => {
    dispatch(getBpeIssue())
  }, []);
 
  return (
    <Box sx={{ height: 'calc(100vh - 170px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={bpeIssueLoading}
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
      {/* <DeviceDetailsModal open={openModal} onClose={handleCloseModal} data={totalBERDevices} loading={bpeIssueLoading}/> */}
    </Box>
  );
}

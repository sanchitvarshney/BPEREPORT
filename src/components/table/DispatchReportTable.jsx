import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';
import { IconButton } from '@mui/material';
import { Download } from '@mui/icons-material';
import {useSocketContext} from '../../contexts/SocketContext';


export default function DispatchReportTable() {
  const { dispatchreport, dispatchreportLoading } = useSelector((state) => state.report);
  const { emitDownloadr5Report, emitDownloadWrongDeviceReport, emitDownloadSwipeReport } =
  useSocketContext();
  const columns = [
        { field: 'id', headerName: '#', width: 90 },
  
  
    { headerName: "SKU", field: "sku", sortable: true, filter: true, flex: 1 },
    {
      headerName: "SKU Name",
      field: "skuName",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Dispatch Date",
      field: "dispatchDate",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Dispatch Qty",
      field: "dispatchQty",
      sortable: true,
      filter: true,
      flex: 1,
    },
    // {
    //   headerName: "Insert By",
    //   field: "inserby",
    //   sortable: true,
    //   filter: true,
    //   flex: 1,
    // },
    // {
    //   headerName: "TXN ID",
    //   field: "txnId",
    //   sortable: false,
    //   filter: true,
    //   flex: 1,
    //   hide: true,
    // },
    {
      headerName: "Warehouse",
      field: "warehouse",
      sortable: true,
      filter: true,
      flex: 1,
      hide: true,
    },
  
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <IconButton
          onClick={() => {
            console.log(params)
            const id = params?.row?.txnId;
            const type = params?.row?.deviceType;
            if (type === "wrongDevices") {
              emitDownloadWrongDeviceReport({ txnId: id });
            }else if(type === "swipedevice"){
              emitDownloadSwipeReport({ txnId: id });
            }  else {
              emitDownloadr5Report({ txnId: id });
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

  // Map the rows to match the new data structure
  const rows = dispatchreport?.map((item, index) => ({
    id: index + 1,
    sku: item.sku,
    skuName: item.skuName,
    dispatchDate: item.dispatchDate,
    dispatchQty: item.dispatchQty,
    inserby: item.inserby,
    balance: item.Balance,
    txnId: item.txnId,
    warehouse: item.warehouse,
    deviceType: item.deviceType,
  }))||[];

  return (
    <Box sx={{ height: 'calc(100vh - 170px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={dispatchreportLoading}
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

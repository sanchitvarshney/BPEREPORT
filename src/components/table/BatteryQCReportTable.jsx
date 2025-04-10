import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';


export default function BatteryQCReportTable() {
  const { batteryQcData, batteryQcLoading } = useSelector((state) => state.report);

  const columns = [
    { headerName: "#", field: "id", sortable: true, filter: true, width: 50 },
    { headerName: "IMEI", field: "imeiNo", sortable: true, filter: true, flex: 1 },
    { headerName: "IR (Internal Resistance)", field: "ir", sortable: true, filter: true, flex: 1 },
    { headerName: "Voltage", field: "volt", sortable: true, filter: true, flex: 1 },
    { headerName: "Battary ID", field: "batteryId", sortable: true, filter: true, flex: 1 },
    { headerName: "Status", field: "status", sortable: true, filter: true, flex: 1 },
    { headerName: "Insert Date", field: "insertDate", sortable: true, filter: true, flex: 1 },
    { headerName: "Insert By", field: "insertBy", sortable: true, filter: true,flex:1 },
    { headerName: "Remark", field: "remark", sortable: true, filter: true, flex: 1 },
  ];

  // Map the rows to match the new data structure
  const rows = batteryQcData?.map((item, index) => ({
    id: index + 1,
    imeiNo:item.imeiNo,
    txnId:item.txnId,
    ir:item.ir,
    volt:item.volt,
    batteryId:item.batteryId,
    insertDate:item.insertDate,
    status:item.status,
    insertBy:item.insertBy,
    remark:item.remark,
  }))||[];

  return (
    <Box sx={{ height: 'calc(100vh - 170px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={batteryQcLoading}
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

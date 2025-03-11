import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';

const columnDefs= [
  { headerName: "IMEI", field: "IMEI", sortable: true, filter: true, width: 150 },
  { headerName: "Serial", field: "serialNo", sortable: true, filter: true },
  { headerName: "Model", field: "modelNo", sortable: true, filter: true },
  { headerName: "Qc Status", field: "QcStatus", sortable: true, filter: true },
  {headerName:"Sim Testing",field:"simTesting",sortable:true,filter:true},
  {headerName:"Sim Pairing",field:"simPairing",sortable:true,filter:true},
  {headerName:"Mono Cartoon SN Match",field:"monoCartonSNMatch",sortable:true,filter:true},
  {headerName:"Charging Cable and Adaptor Check",field:"chargingCableTest",sortable:true,filter:true},
  {headerName:"Key Function",field:"keyFn",sortable:true,filter:true},
  {headerName:"Visual Condition",field:"VisualCondition",sortable:true,filter:true},
  {headerName:"Charging Testing",field:"ChargingTest",sortable:true,filter:true},
  { headerName: "Insert Date and Time", field: "insertDateAndTime", sortable: true, filter: true },
  { headerName: "Insert By", field: "insertByName", sortable: true, filter: true },
  { headerName: "Analysis Remark", field: "analytcisRemark", sortable: true, filter: true },
];

export default function DeviceAnalysisTable() {
  const { deviceAnalysisReport, deviceAnalysisReportLoading } = useSelector((state) => state.report);
  // Map the rows to match the new data structure
  const rows = deviceAnalysisReport?.map((item, index) => ({
    id: index + 1,
    IMEI:item.imei,
    serialNo: item.serial,
    modelNo: item.model,
    QcStatus: item.qcStatus,
    simTesting: item.simTest,
    simPairing: item.simPair,
    monoCartonSNMatch: item.monoCarton,
    chargingCableTest: item.chargingCable,
    keyFn: item.keyFunction,
    VisualCondition: item.visualCondition,
    ChargingTest: item.chargingTest,
    insertDateAndTime: item.insertDate,
    insertByName: item.insertBy,
    analytcisRemark: item.analytisRemark,
  }))||[];

  return (
    <Box sx={{ height: 'calc(100vh - 170px)', minHeight: 300, width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={deviceAnalysisReportLoading}
        rows={rows}
        columns={columnDefs}
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

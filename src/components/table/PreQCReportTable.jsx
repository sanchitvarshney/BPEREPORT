import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';
import { useMemo } from 'react';

export default function PreQCReportTable() {
  const { preQcData, preQcLoading } = useSelector((state) => state.report);

  // 1. Find all unique QA keys
  const qaKeys = useMemo(() => {
    const keys = new Set();
    (preQcData?.data?.data || preQcData?.data || []).forEach((row) => {
      (row.qA || []).forEach((qaObj) => {
        Object.keys(qaObj).forEach((key) => keys.add(key));
      });
    });
    return Array.from(keys);
  }, [preQcData]);

  // 2. Columns definition
  const columns = useMemo(
    () => [
      { field: 'id', headerName: '#', width: 90 },
      {
        field: 'imei',
        headerName: 'IMEI',
        minWidth: 180
      },
      {
        field: 'serial',
        headerName: 'Serial No.',
        minWidth: 180
      },
      {
        field: 'insert_dt',
        headerName: 'Insert Date',
        minWidth: 180
      },
      {
        field: 'insert_by',
        headerName: 'Insert By',
        minWidth: 200
      },
      {
        field: 'remark',
        headerName: 'Remark',
        minWidth: 180
      },
      {
        field: 'txnId',
        headerName: 'Txn ID',
        minWidth: 180
      },
      // Add dynamic QA columns
      ...(qaKeys || []).map((qaKey) => ({
        field: `qa_${qaKey}`,
        headerName: qaKey,
        minWidth: 170,
        renderCell: (params) => {
          if (!params || !params.row || !Array.isArray(params.row.qA)) return 'No';
          const qA = params.row.qA;
          const found = qA.find((qaObj) => Object.prototype.hasOwnProperty.call(qaObj, qaKey));
          return found ? found[qaKey] : 'No';
        }
      }))
    ],
    [qaKeys]
  );

  // 3. Rows mapping (keep original qA array for renderCell)
  const rows = useMemo(
    () =>
      (preQcData?.data?.data || preQcData?.data || []).map((item, index) => ({
        id: item.id || index,
        imei: item.imei,
        serial: item.serial,
        insert_dt: item.insert_dt,
        insert_by: item.insert_by,
        remark: item.remark,
        txnId: item.txnId,
        qA: item.qA || []
      })),
    [preQcData]
  );

  return (
    <Box sx={{ height: 'calc(100vh - 230px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={preQcLoading}
        rows={rows}
        columns={columns}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay
        }}
        hideFooter={true}
        getRowId={(row) => row.id}
      />
    </Box>
  );
}

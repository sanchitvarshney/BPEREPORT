import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';

export default function SwipeFunctionalReportTable() {
  const { swipeFunctionalReport, swipeFunctionalReportLoading } = useSelector((state) => state.report);

  const columns = React.useMemo(() => {
    const baseColumns = [
      {
        field: 'id',
        headerName: '#',
        width: 70
      },
      { field: 'productName', headerName: 'Product Name', width: 200 },
      { field: 'productCode', headerName: 'Product Code', width: 150 },
      { field: 'serial', headerName: 'Serial Number', width: 150 },
      { field: 'imei_no1', headerName: 'IMEI 1', width: 150 },
      { field: 'imei_no2', headerName: 'IMEI 2', width: 150 },
      { field: 'date', headerName: 'Date', width: 150 }
    ];

    // Get questions from the first row
    const firstRow = swipeFunctionalReport?.[0];

    const questionColumns =
      firstRow?.questions?.map((q) => ({
        field: `question_${q.questionId}`,
        headerName: q.question,
        width: 200,
        renderCell: (params) => {
          const question = params.row.questions?.find((q2) => String(q2.questionId) === String(q.questionId));
          return question?.answer || '--';
        }
      })) || [];

    return [...baseColumns, ...questionColumns];
  }, [swipeFunctionalReport]);

  const rows = React.useMemo(() => {
    if (!Array.isArray(swipeFunctionalReport)) {
      return [];
    }

    const processedRows = swipeFunctionalReport.map((item, index) => ({
      id: index + 1,
      ...item,
      questions: item.questions || []
    }));

    return processedRows;
  }, [swipeFunctionalReport]);

  const rowCount = swipeFunctionalReport?.length || 0;

  return (
    <Box sx={{ height: 'calc(100vh - 250px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={swipeFunctionalReportLoading}
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          }
        }}
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
        slots={{
          noRowsOverlay: CustomNoRowsOverlay
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

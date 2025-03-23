import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "components/ui/sheet";

export default function ({ partner }) {
  const { minReportLoading, getMINReportData } = useSelector((state) => state.report);
  const rows =
    getMINReportData?.map((item, index) => ({
      id: index + 1,
      vendorCode: item.vendorCode, // Ensure field names match the data
      vendorName: item.vendorName,
      inDate: item.inDate,
      vendorAddress: item.vendorAddress,
      awbNo: item.awbNo,
      serial: item.serial,
      imei: item.imei,
      quantity: item.quantity,
      product: item.product,
      totalDebit: item.totalDebit,
      issues: item.issues, // Assuming "issues" is part of the data
      opening: item.OpeningBalance, // Example additional field from your previous code
      inward: item.TotalIn,
      outward: item.TotalOut,
      closing: item.ClosingBalance,
      partner: item.partner
    })) || [];

  const [openModal, setOpenModal] = useState(false); // Modal visibility state
  const [selectedIssues, setSelectedIssues] = useState(null);
  const handleOpenModal = (issues) => {
    setSelectedIssues(issues); // Set issues data for modal
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    setSelectedIssues(null); // Clear selected issues
  };

  const issuesColumns = [
    { field: 'item', headerName: 'Item', minWidth: 200 },
    { field: 'status', headerName: 'Status', minWidth: 150 }
  ];

  // Transform the issues object into an array of objects for the DataGrid
  const issuesRows = selectedIssues
    ? Object.entries(selectedIssues).map(([key, value]) => ({
        id: key,
        item: key,
        status: String(value)
      }))
    : [];
  console.log(partner);

  const baseColumns = [
    { headerName: 'Vendor Code', field: 'vendorCode' },
    { headerName: 'Vendor Name', field: 'vendorName', minWidth: 300 },
    { headerName: 'In Date', field: 'inDate', minWidth: 200 },
    { headerName: 'Vendor Address', field: 'vendorAddress', minWidth: 400 },
    { headerName: 'AWB No', field: 'awbNo' },
    { headerName: 'Serial', field: 'serial' },
    { headerName: 'IMEI', field: 'imei' },
    { headerName: 'Quantity', field: 'quantity' },
    { headerName: 'Product', field: 'product' },
    { headerName: 'Total Debit', field: 'totalDebit' },
    {
      headerName: 'Issues',
      field: 'issues',
      renderCell: (params) => (
        <IconButton onClick={() => handleOpenModal(params.value)} color="primary">
          <VisibilityIcon />
        </IconButton>
      )
    }
  ];

  // Conditionally include the "Partner" column based on the "partner" value
  const columns = partner === 'ALL' ? [...baseColumns, { headerName: 'Partner', field: 'partner', minWidth: 150 }] : baseColumns;

  return (
    <Box sx={{ height: 'calc(100vh - 240px)', width: '100%', border: '1px solid #e0e0e0', mt: '10px' }}>
      <DataGrid
        loading={minReportLoading}
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
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Device Issues</DialogTitle>
        <DialogContent>
          <div className="issues-table">
            <DataGrid
              rows={issuesRows}
              columns={issuesColumns}
              pageSize={5}
              autoHeight
              hideFooterPagination
              disableSelectionOnClick
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
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            color="primary"
            style={{ padding: '8px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

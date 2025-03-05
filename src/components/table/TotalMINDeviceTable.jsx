import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "components/ui/sheet";

export default function () {
  const { minReportLoading, getMINReportData } = useSelector((state) => state.report);
  const rows = getMINReportData?.map((item, index) => ({
    id: index + 1,
    vendorCode: item.vendorCode,  // Ensure field names match the data
    vendorName: item.vendorName,
    inDate: item.inDate,
    vendorAddress: item.vendorAddress,
    awbNo: item.awbNo,
    serial: item.serial,
    imei: item.imei,
    quantity: item.quantity,
    product: item.product,
    totalDebit: item.totalDebit,
    issues: item.issues,  // Assuming "issues" is part of the data
    opening: item.OpeningBalance,  // Example additional field from your previous code
    inward: item.TotalIn,
    outward: item.TotalOut,
    closing: item.ClosingBalance
  }))||[];

  const columns = [
    // { headerName: "#", field: "id", valueGetter: "node.rowIndex+1", maxWidth: 100 },
    { headerName: "Vendor Code", field: "vendorCode" },
    { headerName: "Vendor Name", field: "vendorName", minWidth: 300 },
    { headerName: "In Date", field: "inDate", minWidth: 200 },
    { headerName: "Vendor Address", field: "vendorAddress", minWidth: 400 },
    { headerName: "AWB No", field: "awbNo" },
    { headerName: "Serial", field: "serial" },
    { headerName: "IMEI", field: "imei" },
    { headerName: "Quantity", field: "quantity" },
    { headerName: "Product", field: "product" },
    { headerName: "Total Debit", field: "totalDebit" },
    // {
    //   headerName: "",
    //   field: "issues",
    //   pinned: "right",
    //   cellRenderer: (params) => {
    //     return (
    //       <div className="flex items-center h-full gap-2">
    //         <Sheet>
    //           <SheetTrigger asChild>
    //             <Button startIcon={<Icons.documentDetail />} className="btn-primary">
    //               Item Detail
    //             </Button>
    //           </SheetTrigger>
    //           <SheetContent className="p-0 min-w-[40%]">
    //             <SheetHeader className="h-[50px] flex flex-row items-center px-[10px] bg-hbg border-b border-neutral-300">
    //               <SheetTitle>Item Detail</SheetTitle>
    //             </SheetHeader>
    //             <div className="h-[calc(100vh-50px)] ag-theme-quartz p-[20px] space-y-2">
    //               <table className="w-full text-left border border-collapse border-gray-300">
    //               <thead>
    //                     <tr>
    //                       <th className="border border-gray-300 p-2  text-[17px] font-bold">Items</th>
    //                       <th className="border border-gray-300 p-2  text-[17px] font-bold">Status</th>
    //                     </tr>
    //                   </thead>
    //                 <tbody>
                     
    //                   {Object.entries(params.value).map(([key, value]) => (
    //                     <tr key={key}>
    //                       <td className="border border-gray-300 p-2 text-[17px] font-[500]">{key}</td>
    //                       <td className="border border-gray-300 p-2 text-[17px] font-[500]"> {String(value)}</td>
    //                     </tr>
    //                   ))}
    //                 </tbody>
    //               </table>
    //             </div>
    //           </SheetContent>
    //         </Sheet>
    //       </div>
    //     );
    //   },
    // },
  ];

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
    </Box>
  );
}

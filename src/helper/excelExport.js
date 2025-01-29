import * as XLSX from 'xlsx';

// Utility function to export data to Excel
export const exportToExcel = (data, fileName) => {
  // Create a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Write the workbook and trigger the download
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

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

export const exportDynamicDataToExcel = (data, fileName) => {
  if (!data || !Array.isArray(data?.data) || data?.data?.length === 0) {
    console.error('Invalid data for export');
    return;
  }

  // Directly use the 'header' array for the columns
  const headers = data?.header; // Header is already an array, no need for Object.keys()

  // Create a worksheet with dynamic headers
  const worksheet = XLSX.utils.json_to_sheet(data?.data, { header: headers });

  // Create a workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Write the workbook and trigger the download
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
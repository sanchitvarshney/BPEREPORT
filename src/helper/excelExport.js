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
  let headers = [...data?.header]; 
  const dataRows = [...data?.data];
  const filteredHeaders = headers.filter(header => header !== 'Attchments');
  
  const filteredData = dataRows?.map(row => {
    const { Attchments, ...rest } = row;
    return rest; 
  });
  const worksheet = XLSX.utils.json_to_sheet(filteredData, { header: filteredHeaders });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

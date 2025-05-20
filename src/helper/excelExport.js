import { showToast } from 'utils/ToastProvider';
import * as XLSX from 'xlsx';

// Utility function to export data to Excel
export const exportToExcel = (data, fileName,partner) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    showToast('Invalid data for export',"error");
    return;
  }

  // Define a mapping of old column names to new ones
  const columnNameMapping = {
    'vendorCode': 'Vendor Code',
    'vendorName': 'Vendor Name',
    'vendorAddress': 'Vendor Address',
    'awbNo': 'AWB No',
    'serial': 'Serial',
    'imei':'IMEI',
    'quantity':"Quantity",
    'product':"Product",
    'totalDebit':'Total Debit',
    'inDate':"In Date",
    'issues':'Issues',
    'sequenceNumber':'Index',
    'model':'Model',
    'qcStatus':'QC Status',
    'simTest':'Sim Test',
    'simPair':'Sim Pair',
    'monoCarton':'Mono Carton',
    'chargingCable':'Charging Cable',
    'keyFunction':'Key Function',
    'visualCondition':'Visual Condition',
    'chargingTest':'Charging Test',
    'insertDate':'Insert Date',
    'insertBy':'Insert By',
    'analytisRemark':'Analysis Remark',
    "total_quantity":"Total Quantity",
    "component":"Component",
    "partNo":"Part No",
    "category":"Category",
    "txnID":"Txn ID",
    "issue":"Issue",
    "submitDt":"Submit Date",
    "submitRemark":"Submit Remark",
    "resolveStatus":"Resolve Status",
    "resRemark":"Resolve Remark",
    "resDt":"Resolve Date",
    "user_name":"User Name",
    "method":"Method",
    "name":"Name",
    "skuCode":"Sku Code",
    "qty":"Qty",
    "transactionType":"Transaction Type",
    "refId":"Ref ID",
    "minNo":"Min No",
    "time":"Time",
    "location":"Location",
    "locationOut":"Location Out",
    "user":"User",
  };

  // Modify column names in the data
  const modifiedData = data.map(row => {
    const newRow = {};
    Object.keys(row).forEach((key) => {
      if (key === 'issues' && row[key]) {
        // Flatten the issues object into separate columns
        Object.keys(row[key]).forEach((issueKey) => {
          if (issueKey !== '[[Prototype]]') {
            newRow[`Issue - ${issueKey}`] = row[key][issueKey];
          }
        });
      } else {
        // If the column has a mapping, replace it; otherwise, keep the original key
        newRow[columnNameMapping[key] || key] = row[key];
      }
    });
    return newRow;
  });

  // Create a worksheet with the modified data
  const worksheet = XLSX.utils.json_to_sheet(modifiedData);

  // Create a workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  const sheetName = partner ? partner : 'Sheet1';
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

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
  const filteredHeaders = headers.filter(header => header !== 'Attchments'&& header !== 'Inserted By');
  
  const filteredData = dataRows?.map(row => {
    const { Attchments, ...rest } = row;
    return rest; 
  });
  const worksheet = XLSX.utils.json_to_sheet(filteredData, { header: filteredHeaders });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

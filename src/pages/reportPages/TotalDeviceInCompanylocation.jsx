import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getdeviceOnLocation } from 'features/reports/reportSlice';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import { CustomNoRowsOverlay } from 'components/table/CustomNoRowsOverlay';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Download } from '@mui/icons-material';

export const exportToExcel = (jsonData) => {
  let worksheetData = [];

  jsonData.forEach((location) => {
    worksheetData.push([{ Location: location.locationName }]);
    worksheetData.push([
      { Location: 'Location', SKU: 'SKU', Name: 'Name', Opening: 'Opening', Inward: 'Inward', Outward: 'Outward', Closing: 'Closing' }
    ]);
    location.products.forEach((product) => {
      worksheetData.push([
        {
          Location: location.locationName,
          SKU: product.SKU,
          Name: product.Name,
          Opening: product.Opening,
          Inward: product.Inward,
          Outward: product.Outward,
          Closing: product.Closing
        }
      ]);
    });
    worksheetData.push([]);
  });
  const ws = XLSX.utils.json_to_sheet(worksheetData.flat(1), { skipHeader: true });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Stock Report');
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(data, 'Stock_Report.xlsx');
};

const DynamicTable = ({ rowdata }) => {
  const columns = rowdata?.length
    ? Object.keys(rowdata[0]).map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),

        flex: 1,
        type: typeof rowdata[0][key] === 'number' ? 'number' : 'string'
      }))
    : [];
  const rows = rowdata?.map((item, index) => ({
    id: index + 1,
    ...item
  }));

  return (
    <Box sx={{ minHeight: 200, maxHeight: 500, width: '100%', mt: 2, border: '1px solid #ddd' }}>
      <DataGrid
        sx={{
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #ddd',
            borderRight: '1px solid #ddd'
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '1px solid #ddd',
            borderRight: '1px solid #ddd'
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #ddd'
          }
        }}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay
        }}
        rows={rows || []}
        columns={columns}
        pageSizeOptions={[10, 20, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          }
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

// Main component to map data into accordions with tables
export function LocationAccordion({ data }) {
  return (
    <div>
      {data.map((location, i) => (
        <Accordion key={location.locationCode} defaultExpanded={i === 0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${location.locationCode}-content`}
            id={`panel-${location.locationCode}-header`}
          >
            <Typography component="h5" fontWeight={700}>
              {location.locationName}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DynamicTable rowdata={location.products} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

const TotalDeviceInCompanylocation = () => {
  const { deviceOnLocationLoading, deviceOnLocation } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [value, setValue] = useState(null); // From Date
  const [value1, setValue1] = useState(null); // To Date

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        {/* From Date Picker */}
        <DatePicker
          label="From Date"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />

        {/* To Date Picker */}
        <DatePicker label="To Date" value={value1} onChange={(newValue) => setValue1(newValue)}  />

        <LoadingButton
          loading={deviceOnLocationLoading}
          onClick={() => {
            if (value && value1) {
              dispatch(
                getdeviceOnLocation({
                  from: dayjs(value).format('DD-MM-YYYY'),
                  to: dayjs(value1).format('DD-MM-YYYY')
                })
              );
            } else {
              showToast('Please select date', 'error');
            }
          }}
          variant="contained"
        >
          <FilterAltOutlinedIcon fontSize={'small'} sx={{ mr: '10px' }} />
          Search
        </LoadingButton>
        <Button
          disabled={!deviceOnLocation}
          variant="contained"
          color="success"
          onClick={() => {
            if (deviceOnLocation) {
              if (Array.isArray(deviceOnLocation) && deviceOnLocation.length > 0) {
                exportToExcel(deviceOnLocation, 'deviceOnLocation');
              }
            }
          }}
        >
          <Download fontSize={'small'} sx={{ mr: '10px' }} />
          Download
        </Button>
      </Box>

      <Box sx={{ mt: '10px' }}>
        {Array.isArray(deviceOnLocation) && deviceOnLocation.length > 0 ? (
          <LocationAccordion data={deviceOnLocation} />
        ) : (
          <Box
            sx={{
              height: '500px'
            }}
          >
            <CustomNoRowsOverlay />
          </Box>
        )}
      </Box>
      {/* <TotalComponentInCompanyTable /> */}
    </LocalizationProvider>
  );
};

export default TotalDeviceInCompanylocation;

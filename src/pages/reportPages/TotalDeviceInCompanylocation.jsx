import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Download } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';


export const exportToExcel = (jsonData) => {
  const wb = XLSX.utils.book_new();
  const wsData = [];

  // Define the order of locations
  const locationsOrder = ['Inward Store (MsC)', 'Total Repairing Centre (TRC)- MSC', 'Assembly-MsC', 'Finish Goods store-MsC'];

  // Create a copy of the data array to avoid mutating the prop directly
  const sortedData = [...jsonData].sort((a, b) => {
    const aIndex = locationsOrder.indexOf(a?.locationName || ''); // Safe access with optional chaining
    const bIndex = locationsOrder.indexOf(b?.locationName || ''); // Safe access with optional chaining

    // If the location is not in the predefined order, assign it a large index value
    const defaultIndex = 999; // You can adjust this value if needed

    // Return the sorted result, places unknown locations after known ones
    return (aIndex !== -1 ? aIndex : defaultIndex) - (bIndex !== -1 ? bIndex : defaultIndex);
  });

  // Loop through the sorted data to build the Excel sheet data
  sortedData.forEach((location) => {
    wsData.push([location?.locationName || 'Unknown Location']); // Push location name
    wsData.push(['SKU', 'Name', 'Opening', 'Inward', 'Outward', 'Closing']); // Add column headers

    // Loop through products of each location
    location?.products?.forEach((product) => {
      wsData.push([product?.SKU, product?.Name, product?.Opening, product?.Inward, product?.Outward, product?.Closing]);
    });

    wsData.push([]); // Add an empty row after each location
  });

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, 'Stock Report'); // Append sheet to workbook
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' }); // Generate Excel file
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(data, 'Stock_Report.xlsx'); // Save as Excel file
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
  
  const { deviceOnLocationLoading } = useSelector((state) => state.report);

  return (
    <Box sx={{ minHeight: 200, maxHeight: 500, width: '100%', mt: 2, border: '1px solid #ddd' }}>
      <DataGrid
        loading={deviceOnLocationLoading}
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
export function LocationAccordion({ data }) {
  // Define the order of locations
  const locationsOrder = ['Inward Store (MsC)', 'Total Repairing Centre (TRC)- MSC', 'Assembly-MsC', 'Finish Goods store-MsC'];

  // If 'data' is not provided or is empty, return nothing
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null; // Or return some fallback UI (e.g., "No Data Available")
  }

  // Create a copy of the data array to avoid mutating the prop directly
  const sortedData = [...data].sort((a, b) => {
    const aIndex = locationsOrder.indexOf(a?.locationName || ''); // Safe access with optional chaining
    const bIndex = locationsOrder.indexOf(b?.locationName || ''); // Safe access with optional chaining

    // If the location is not in the predefined order, assign it a large index value
    const defaultIndex = 999; // You can adjust this value if needed

    // Return the sorted result, places unknown locations after known ones
    return (aIndex !== -1 ? aIndex : defaultIndex) - (bIndex !== -1 ? bIndex : defaultIndex);
  });

  return (
    <div>
      {sortedData?.map((location, i) => (
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
            <DynamicTable rowdata={location?.products?.map(({ SKUKEY, ...product }) => product)} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

const TotalDeviceInCompanylocation = () => {
  const { deviceOnLocationLoading, deviceOnLocation } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <RangePicker
          format={'DD/MM/YYYY'}
          value={dateRange.from && dateRange.to ? [dateRange.from, dateRange.to] : null}
          onChange={(range) => {
            if (range) {
              setDateRange({ from: range[0], to: range[1] });
            } else {
              setDateRange({ from: null, to: null });
            }
          }}
          presets={[
            { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
            { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
            { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
            { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] }
          ]}
        />

        <LoadingButton
          loading={deviceOnLocationLoading}
          onClick={() => {
            if (dateRange.from && dateRange.to) {
              dispatch(
                getdeviceOnLocation({ from: dayjs(dateRange.from).format('DD-MM-YYYY'), to: dayjs(dateRange.to).format('DD-MM-YYYY') })
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
        {deviceOnLocationLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
            <CircularProgress />
          </Box>
        ) : Array.isArray(deviceOnLocation) && deviceOnLocation.length > 0 ? (
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
    </LocalizationProvider>
  );
};

export default TotalDeviceInCompanylocation;

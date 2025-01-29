import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'utils/ToastProvider';
import { getdeviceOnLocation } from 'features/reports/reportSlice';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';


// Dynamic table component
const DynamicTable = ({ rowdata }) => {
  // Dynamically generate columns based on keys of the first object in the row data
  const columns = rowdata?.length
    ? Object.keys(rowdata[0]).map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
       
        flex: 1,
        type: typeof rowdata[0][key] === 'number' ? 'number' : 'string'
      }))
    : [];

  // Map rows, adding a unique `id` field for DataGrid
  const rows = rowdata?.map((item, index) => ({
    id: index + 1, // Add an ID field for DataGrid
    ...item
  }));

  return (
    <Box sx={{ minHeight: 200,maxHeight: 500, width: '100%', mt: 2 }}>
      <DataGrid
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
      {data.map((location,i) => (
        <Accordion key={location.locationCode} defaultExpanded={i===0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${location.locationCode}-content`}
            id={`panel-${location.locationCode}-header`}
          >
            <Typography component="h5" fontWeight={700}>{location.locationName}</Typography>
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
          maxDate={dayjs()} // Disable future dates for From Date
        />

        {/* To Date Picker */}
        <DatePicker label="To Date" value={value1} onChange={(newValue) => setValue1(newValue)} maxDate={value ? dayjs(value) : dayjs()} />

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
          button
        </LoadingButton>
      </Box>

      <Box sx={{ mt: '10px' }}>
  {Array.isArray(deviceOnLocation) && deviceOnLocation.length > 0 ? (
    <LocationAccordion data={deviceOnLocation} />
  ) : (
    <Typography>No data available</Typography>
  )}
</Box>
      {/* <TotalComponentInCompanyTable /> */}
    </LocalizationProvider>
  );
};

export default TotalDeviceInCompanylocation;

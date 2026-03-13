import React, { useEffect, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import useDebounce from './useDebounce';
import axiosInstance from 'features/api/axioInstance';

const SelectSku = ({
  value,
  onChange,
  label = 'Search Device',
  width = '100%',
  error,
  helperText,
  varient = 'outlined',
  required = false,
  size = 'small',
  disabled = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, 300);
  const [loading, setLoading] = useState(false);
  const [deviceList, setDeviceList] = useState([]);

  // Fetch devices based on SKU query
  const fetchDevices = async (query) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/product/bySku/${query}`);
      setDeviceList(response.data.data);
    } catch (error) {
      console.error('Error fetching devices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedInputValue) {
      fetchDevices(debouncedInputValue);
    }
  }, [debouncedInputValue]);

  return (
    <Autocomplete
      disabled={disabled}
      onFocus={() => fetchDevices(null)}
      value={value || null}
      size={size}
      options={deviceList || []}
      getOptionLabel={(option) => (option && option.text ? String(option.text) : '')}
      filterSelectedOptions
      onChange={(_, value) => {
        onChange(value);
      }}
      loading={loading}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      onInputChange={(_, newInputValue, reason) => {
        (reason === 'input' || reason === 'clear') && setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          required={required}
          error={error}
          helperText={helperText}
          {...params}
          label={label}
          variant={varient}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
          sx={{ width: '100%' }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <div>
            <p className="text-[13px]">{option?.text ?? ''}</p>
          </div>
        </li>
      )}
      sx={{ width }}
    />
  );
};

export default SelectSku;

import React, { useEffect, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import useDebounce from "./useDebounce";
import axiosInstance from "features/api/axioInstance";

const SelectComponent = ({ value, onChange, label = "Search Item", width = "100%", error, helperText, required = false, varient = "outlined", size = "medium" }) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 300);
  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]);

  // Fetch items based on search query
  const fetchItems = async (query) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/backend/search/item/${query}`);
      setItemList(response.data.data); // Assuming response follows the LocationApiresponse format
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedInputValue) {
      fetchItems(debouncedInputValue);
    }
  }, [debouncedInputValue]);
  useEffect(() => {
    fetchItems(null);
  }, []);
  return (
    <Autocomplete
      onFocus={() => fetchItems(null)}
      value={value}
      size={size}
      options={itemList || []}
      getOptionLabel={(option) => `(${option.part_code})-${option.text}`}
      filterSelectedOptions
      onChange={(_, value) => {
        onChange(value);
      }}
      loading={loading}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      onInputChange={(_, newInputValue, reason) => {
        (reason === "input" || reason === "clear") && setInputValue(newInputValue);
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
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <div>
            <p className="text-[13px]">{`(${option.part_code})-${option.text}`}</p>
          </div>
        </li>
      )}
      sx={{ width }}
    />
  );
};

export default SelectComponent;

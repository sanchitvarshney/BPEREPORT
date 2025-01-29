import React, { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "./style.css"
dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const RangeSelect = ({
  value,
  onChange,
  disabledDate,
  format = "DD/MM/YYYY",
  className = "",
  placeholder = ["Start date", "End date"],
  presets
}) => {
  const [internalValue, setInternalValue] = useState({
    from: null,
    to: null
  });

  const handleDateChange = (dates) => {
    const updatedValue = {
      from: dates ? dates[0] : null,
      to: dates ? dates[1] : null
    };
    setInternalValue(updatedValue);
    if (onChange) onChange(updatedValue);
  };

  const computedValue = value || internalValue;

  return (
    <RangePicker
      className={`range-picker ${className}`}
      presets={presets}
      onChange={handleDateChange}
      disabledDate={disabledDate}
      placeholder={placeholder}
      value={computedValue.from && computedValue.to ? [computedValue.from, computedValue.to] : null}
      format={format}
    />
  );
};

export default RangeSelect;

// @ts-nocheck
import * as React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './common.css';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
export const CustomDatePicker = (props) => {
  const { control, name, label } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label}
            control={control}
            inputFormat="DD-MMM-YYYY"
            value={value}
            onChange={(event) => {
              onChange(event);
            }}
            sx={{ width: 250 }}
            disableMaskedInput
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ width: 250 }}
                ref={ref}
                error={error?.message ? true : false}
                helperText={error?.message}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
};
export default CustomDatePicker;

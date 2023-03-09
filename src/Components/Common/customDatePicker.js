/* eslint-disable no-unused-vars */
// @ts-nocheck
import * as React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './common.css';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Button } from '@mui/material';
export const CustomDatePicker = (props) => {
  const { control, name, label } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    console.log(this);
    setAnchorEl(this);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        console.log(ref);
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={label}
              control={control}
              inputFormat="DD-MMM-YYYY"
              value={value}
              onChange={(event) => {
                onChange(event);
              }}
              popperPlacement="bottom-end"
              onOpen={handleOpen}
              sx={{ width: 200 }}
              disableMaskedInput
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: 200 }}
                  inputRef={ref}
                  error={error?.message ? true : false}
                  helperText={error?.message}
                />
              )}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};
export default CustomDatePicker;

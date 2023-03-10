// @ts-nocheck
import * as React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './common.css';

export const CustomAutoComplete = (props) => {
  const { control, options, name } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: 'this field is requried'
      }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <div style={{ width: props.width ?? 250 }}>
            <Autocomplete
              value={
                value
                  ? options.find((option) => {
                      return value[props.optionId] === option[props.optionId];
                    }) ?? null
                  : null
              }
              sx={{ width: props.width ?? 250 }}
              getOptionLabel={(option) => {
                return props.optionCode
                  ? `${option[props.optionCode]} - ${option[props.optionLabel]}`
                  : option[props.optionLabel];
              }}
              onChange={(event, newValue) => {
                onChange(newValue);
                if (props.onChange) props.onChange(newValue);
              }}
              id="controllable-states-demo"
              options={options}
              renderInput={(params) => (
                <TextField
                  autoFocus={props.autoFocus}
                  {...params}
                  error={error?.message ? true : false}
                  label={props.placeholder}
                  ref={ref}
                  sx={{ width: props.width ?? 250 }}
                  helperText={error?.message ?? ''}
                />
              )}
            />
            {/* {error ? <span style={{ color: 'red' }}>{error.message}</span> : null} */}
          </div>
        );
      }}
    />
  );
};

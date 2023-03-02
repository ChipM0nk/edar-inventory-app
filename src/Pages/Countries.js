// @ts-nocheck
import * as React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const RHFAutocompleteField = (props) => {
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
          <>
            <Autocomplete
              value={
                value
                  ? options.find((option) => {
                      return value === option['categoryId'];
                    }) ?? null
                  : null
              }
              getOptionLabel={(option) => {
                return option['categoryName'];
              }}
              onChange={(event, newValue) => {
                onChange(newValue ? newValue['categoryId'] : null);
              }}
              id="controllable-states-demo"
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={props.placeholder}
                  inputRef={ref}
                  sx={{ width: 300, padding: 0 }}
                />
              )}
            />
            {error ? <span style={{ color: 'red' }}>{error.message}</span> : null}
          </>
        );
      }}
    />
  );
};
